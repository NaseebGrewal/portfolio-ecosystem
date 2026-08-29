import pytest
import sys
from pathlib import Path
from httpx import AsyncClient, ASGITransport

backend_path = Path(__file__).parent.parent / "backend"
if str(backend_path) not in sys.path:
    sys.path.insert(0, str(backend_path))

from app.main import app

@pytest.mark.asyncio
async def test_healthcheck():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"
    assert "workflow_engine" in response.json()
    assert "llm_engine" in response.json()

@pytest.mark.asyncio
async def test_get_sample_sds():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.get("/api/v1/sds/samples")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 3

@pytest.mark.asyncio
async def test_audit_safe_sds():
    transport = ASGITransport(app=app)
    payload = {
        "product_name": "Safe Polymer Matrix",
        "supplier": "EcoPoly",
        "ghs_hazard_statements": [],
        "composition": [
            {"chemical_name": "Polycarbonate", "cas_number": "25037-45-0", "weight_percentage": 99.5}
        ]
    }
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.post("/api/v1/audit/sds", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["regulatory_audit"]["is_compliant"] is True
    assert data["regulatory_audit"]["audit_decision"] == "PASSED"
    assert "agents_invoked" in data["agent_pipeline_execution"]
    assert "SupervisorGatekeeperAgent" in data["agent_pipeline_execution"]["agents_invoked"]

@pytest.mark.asyncio
async def test_audit_svhc_violation_sds():
    transport = ASGITransport(app=app)
    payload = {
        "product_name": "High Risk Plasticizer Blend",
        "supplier": "NonCompliant Vendor",
        "ghs_hazard_statements": ["H360FD: May damage fertility"],
        "composition": [
            {"chemical_name": "Bis(2-ethylhexyl) phthalate (DEHP)", "cas_number": "117-81-7", "weight_percentage": 5.0}
        ]
    }
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.post("/api/v1/audit/sds", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["regulatory_audit"]["is_compliant"] is False
    assert data["regulatory_audit"]["audit_decision"] == "REJECTED_SVHC_DETECTED"
    assert len(data["regulatory_audit"]["flagged_substances"]) == 1
    assert data["regulatory_audit"]["flagged_substances"][0]["cas_number"] == "117-81-7"

@pytest.mark.asyncio
async def test_audit_unstructured_sds_extraction():
    transport = ASGITransport(app=app)
    payload = {
        "raw_sds_text": "SAFETY DATA SHEET - Product: Plasticized Compound with 4.5% Bis(2-ethylhexyl) phthalate DEHP (CAS 117-81-7). Hazard: H360FD May damage fertility."
    }
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.post("/api/v1/audit/sds-unstructured", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert len(data["extracted_composition"]) >= 1
    assert data["regulatory_audit"]["is_compliant"] is False
    assert data["regulatory_audit"]["audit_decision"] == "REJECTED_SVHC_DETECTED"
    assert "SDSExtractorAgent" in data["agent_pipeline_execution"]["agents_invoked"]

