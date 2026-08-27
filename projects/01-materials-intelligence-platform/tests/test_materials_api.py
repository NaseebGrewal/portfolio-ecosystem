import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app

@pytest.mark.asyncio
async def test_healthcheck():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["service"] == "materials-intelligence-api"

@pytest.mark.asyncio
async def test_list_materials():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.get("/api/v1/materials")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 3
    assert data[0]["id"] == "MAT-PC-101"

@pytest.mark.asyncio
async def test_filter_materials_by_family():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.get("/api/v1/materials?polymer_family=Polycarbonate")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 1
    assert all("Polycarbonate" in item["polymer_family"] for item in data)

@pytest.mark.asyncio
async def test_analytics_stats():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.get("/api/v1/analytics/stats")
    assert response.status_code == 200
    stats = response.json()
    assert stats["total_formulations"] >= 10
    assert stats["polymer_families_count"] >= 5

@pytest.mark.asyncio
async def test_get_material_by_id_found():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.get("/api/v1/materials/MAT-PC-101")
    assert response.status_code == 200
    assert response.json()["trade_name"] == "Makroblend Polycarb High-Flow"

@pytest.mark.asyncio
async def test_get_material_by_id_not_found():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.get("/api/v1/materials/NONEXISTENT-999")
    assert response.status_code == 404
