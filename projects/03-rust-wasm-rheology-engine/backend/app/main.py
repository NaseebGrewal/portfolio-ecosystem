import json
from pathlib import Path
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import time
from app.rheology_engine import compute_tensile_invariants, is_rust_native_active

app = FastAPI(
    title="Lab Rheology & Tensile Mechanics Engine API",
    description="High-Speed Tensile Curve Fitting, Young's Modulus & Toughness Invariant Solver with Native Rust Core",
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
    rust_active = is_rust_native_active()
    return {
        "status": "healthy",
        "service": "rust-wasm-rheology-engine",
        "engine_mode": "Native Compiled Rust Core (C-ABI SIMD)" if rust_active else "Vectorized Fast Numeric Core",
        "rust_native_active": rust_active,
        "iso_standards": ["ISO 527-1", "ISO 527-2"]
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
    start = time.perf_counter()
    try:
        results = compute_tensile_invariants(req.strain_pct, req.stress_mpa)
        elapsed_ms = round((time.perf_counter() - start) * 1000, 3)
        return {
            "sample_id": req.sample_id,
            "polymer_grade": req.polymer_grade,
            "data_points_analyzed": len(req.strain_pct),
            "mechanical_invariants": results,
            "latency_ms": max(elapsed_ms, 0.08),
            "engine": results.get("engine", "Fast Numeric Core")
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
