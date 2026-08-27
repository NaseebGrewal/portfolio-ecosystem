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
async def test_get_sample_curves():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.get("/api/v1/rheology/samples")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 5
    assert data[0]["grade_id"] == "PC-MAKROLON-2805"

@pytest.mark.asyncio
async def test_analyze_tensile_curve():
    transport = ASGITransport(app=app)
    payload = {
        "sample_id": "TEST-SPECIMEN-1",
        "polymer_grade": "Polycarbonate Grade A",
        "strain_pct": [0.0, 0.05, 0.15, 0.25, 1.0, 5.0, 10.0, 20.0],
        "stress_mpa": [0.0, 1.2, 3.6, 6.0, 22.0, 65.0, 64.0, 58.0]
    }
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.post("/api/v1/rheology/analyze-curve", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["sample_id"] == "TEST-SPECIMEN-1"
    assert data["mechanical_invariants"]["youngs_modulus_mpa"] == 2400.0
    assert data["mechanical_invariants"]["tensile_strength_mpa"] == 65.0
    assert data["mechanical_invariants"]["elongation_at_break_pct"] == 20.0
