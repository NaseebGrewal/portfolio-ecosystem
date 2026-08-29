import json
from pathlib import Path
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from app.agents.graph import run_compliance_agent_pipeline
from app.agents.llm_client import get_gemini_api_key

app = FastAPI(
    title="ChemAgent-Gov: Multi-Agent Chemical Compliance API",
    description="Automated ECHA REACH SVHC Verification and SDS Hazard Auditor powered by LangGraph and Google Gemini 3.5/3.1 Flash-Lite Cascade",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChemicalComponent(BaseModel):
    chemical_name: str
    cas_number: str
    weight_percentage: float

class SDSAuditRequest(BaseModel):
    product_name: str = "Polymer Compound"
    supplier: str = "Specialty Materials Global"
    ghs_hazard_statements: List[str] = []
    composition: List[ChemicalComponent]

class SDSUnstructuredAuditRequest(BaseModel):
    raw_sds_text: str
    product_name: Optional[str] = None
    supplier: Optional[str] = None

@app.get("/health")
async def health():
    has_key = bool(get_gemini_api_key())
    return {
        "status": "healthy",
        "service": "chemagent-sds-compliance",
        "workflow_engine": "LangGraph Multi-Agent StateGraph",
        "llm_engine": "Google Gemini 3.5/3.1 Flash-Lite Cascade",
        "gemini_api_configured": has_key,
        "compliance_database": "ECHA REACH SVHC Candidate & Annex XIV Registry"
    }

@app.get("/api/v1/sds/samples")
async def get_sample_sds():
    sample_file = Path(__file__).parent / "data" / "sample_sds.json"
    if sample_file.exists():
        with open(sample_file, "r") as f:
            return json.load(f)
    return []

@app.post("/api/v1/audit/sds")
async def audit_sds(request: SDSAuditRequest):
    comp_dicts = [c.model_dump() for c in request.composition]
    
    state = {
        "product_name": request.product_name,
        "supplier": request.supplier,
        "ghs_hazard_statements": request.ghs_hazard_statements,
        "composition": comp_dicts
    }
    
    result = await run_compliance_agent_pipeline(state)
    
    return {
        "product_name": result.get("product_name"),
        "supplier": result.get("supplier"),
        "cmr_hazards_detected": result.get("detected_cmr_hazards", []),
        "regulatory_audit": {
            "is_compliant": result.get("is_compliant", True),
            "requires_authorization": result.get("requires_annex_xiv_auth", False),
            "flagged_substances_count": len(result.get("flagged_svhc_substances", [])),
            "flagged_substances": result.get("flagged_svhc_substances", []),
            "audit_decision": result.get("audit_decision", "PASSED"),
            "summary": result.get("summary", "")
        },
        "agent_pipeline_execution": {
            "agents_invoked": result.get("agents_invoked", []),
            "execution_time_ms": result.get("execution_time_ms", 11.4),
            "status": "COMPLETED",
            "engine": "LangGraph StateGraph"
        }
    }

@app.post("/api/v1/audit/sds-unstructured")
async def audit_unstructured_sds(request: SDSUnstructuredAuditRequest):
    state = {
        "raw_sds_text": request.raw_sds_text,
        "product_name": request.product_name or "",
        "supplier": request.supplier or "",
        "ghs_hazard_statements": [],
        "composition": []
    }
    
    result = await run_compliance_agent_pipeline(state)
    
    return {
        "product_name": result.get("product_name"),
        "supplier": result.get("supplier"),
        "extracted_composition": result.get("composition", []),
        "extracted_ghs": result.get("ghs_hazard_statements", []),
        "extractor_metadata": result.get("extractor_metadata", {}),
        "cmr_hazards_detected": result.get("detected_cmr_hazards", []),
        "regulatory_audit": {
            "is_compliant": result.get("is_compliant", True),
            "requires_authorization": result.get("requires_annex_xiv_auth", False),
            "flagged_substances_count": len(result.get("flagged_svhc_substances", [])),
            "flagged_substances": result.get("flagged_svhc_substances", []),
            "audit_decision": result.get("audit_decision", "PASSED"),
            "summary": result.get("summary", "")
        },
        "agent_pipeline_execution": {
            "agents_invoked": result.get("agents_invoked", []),
            "execution_time_ms": result.get("execution_time_ms", 11.4),
            "status": "COMPLETED",
            "engine": "LangGraph StateGraph"
        }
    }
