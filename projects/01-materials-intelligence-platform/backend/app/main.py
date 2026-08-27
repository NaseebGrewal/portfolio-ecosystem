from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
from app.schemas import Material
from app.database import init_db, get_materials, get_material_by_id_from_db

@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield

app = FastAPI(
    title="Materials Intelligence & Formulation Platform API",
    description="Enterprise API for Polymer Formulation, Dynamic Mechanical Property Filtering & Compliance",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health", tags=["Monitoring"])
async def health_check():
    return {
        "status": "healthy",
        "service": "materials-intelligence-api",
        "version": "1.0.0",
        "database": "embedded-json-engine"
    }

@app.get("/api/v1/materials", response_model=List[Material], tags=["Materials"])
async def list_materials(
    polymer_family: Optional[str] = Query(None, description="Filter by polymer family e.g. Polycarbonate"),
    min_tensile_modulus: Optional[float] = Query(None, description="Minimum tensile modulus in MPa"),
    max_tensile_modulus: Optional[float] = Query(None, description="Maximum tensile modulus in MPa"),
    search: Optional[str] = Query(None, description="Keyword search in trade name or applications")
):
    results = await get_materials(
        polymer_family=polymer_family,
        min_tensile_modulus=min_tensile_modulus,
        max_tensile_modulus=max_tensile_modulus,
        search=search
    )
    return results

@app.get("/api/v1/materials/{material_id}", response_model=Material, tags=["Materials"])
async def get_material_by_id(material_id: str):
    mat = await get_material_by_id_from_db(material_id)
    if mat:
        return mat
    raise HTTPException(status_code=404, detail=f"Material with ID '{material_id}' not found")

@app.get("/api/v1/analytics/stats", tags=["Analytics"])
async def get_portfolio_stats():
    materials = await get_materials()
    total = len(materials)
    families = list(set(m["polymer_family"] for m in materials))
    avg_modulus = sum(m["mechanical"]["tensile_modulus_mpa"] for m in materials) / max(total, 1)
    
    return {
        "total_formulations": total,
        "polymer_families_count": len(families),
        "average_tensile_modulus_mpa": round(avg_modulus, 2),
        "annual_vendor_cost_savings_eur": 1200000,
        "active_rd_plants": ["Leverkusen", "Dormagen", "Shanghai", "Pittsburgh"]
    }
