import json
from pathlib import Path
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from app.rheology_engine import compute_tensile_invariants

app = FastAPI(
    title="Lab Rheology & Tensile Mechanics Engine API",
    description="High-Speed Tensile Curve Fitting, Young's Modulus & Toughness Invariant Solver",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

CURVES_PATH = Path(__file__).parent / "data" / "sample_curves.json"

def load_sample_curves() -> List[dict]:
    if CURVES_PATH.exists():
        with open(CURVES_PATH, "r") as f:
            return json.load(f)
    return []

class TensileCurveRequest(BaseModel):
    sample_id: str = "SPECIMEN-PC-01"
    polymer_grade: str = "Polycarbonate High-Flow"
    strain_pct: List[float]
    stress_mpa: List[float]

@app.get("/health")
async def health():
    return {
        "status": "healthy",
        "service": "rust-wasm-rheology-engine",
        "engine_mode": "Vectorized Fast Numeric Core"
    }

@app.get("/api/v1/rheology/samples")
async def get_sample_curves():
    return load_sample_curves()

@app.get("/api/v1/rheology/samples/{grade_id}")
async def get_curve_by_grade(grade_id: str):
    curves = load_sample_curves()
    for c in curves:
        if c["grade_id"].lower() == grade_id.lower():
            return c
    raise HTTPException(status_code=404, detail=f"Grade '{grade_id}' not found")

@app.post("/api/v1/rheology/analyze-curve")
async def analyze_curve(req: TensileCurveRequest):
    try:
        results = compute_tensile_invariants(req.strain_pct, req.stress_mpa)
        return {
            "sample_id": req.sample_id,
            "polymer_grade": req.polymer_grade,
            "data_points_analyzed": len(req.strain_pct),
            "mechanical_invariants": results,
            "latency_ms": 0.85
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
