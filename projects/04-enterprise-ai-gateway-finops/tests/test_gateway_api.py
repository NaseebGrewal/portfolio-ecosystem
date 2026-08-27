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
async def test_finops_report():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.get("/api/v1/finops/report")
    assert response.status_code == 200
    data = response.json()
    assert "total_spend_eur" in data
    assert "Polymer_RD" in data["departments"]

@pytest.mark.asyncio
async def test_finops_departments():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.get("/api/v1/finops/departments")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 5
    assert "Polymer_RD" in data

@pytest.mark.asyncio
async def test_chat_completion_and_cache_hit():
    transport = ASGITransport(app=app)
    payload = {
        "model": "azure/gpt-4o",
        "messages": [{"role": "user", "content": "What is the tensile strength of PEEK?"}],
        "department": "Polymer_RD"
    }
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        # First call: Live proxy
        res1 = await ac.post("/api/v1/chat/completions", json=payload)
        assert res1.status_code == 200
        data1 = res1.json()
        assert data1["cached"] is False
        assert data1["usage"]["cost_eur"] > 0

        # Second call: Cache hit (0 cost, < 10ms)
        res2 = await ac.post("/api/v1/chat/completions", json=payload)
        assert res2.status_code == 200
        data2 = res2.json()
        assert data2["cached"] is True
        assert data2["usage"]["cost_eur"] == 0.0
