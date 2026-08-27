import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app

@pytest.mark.asyncio
async def test_healthcheck():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

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
