import time
from typing import Dict, Any, List, Optional, TypedDict
from pathlib import Path
import json
from app.agents.llm_client import extract_sds_with_gemini

REGISTRY_PATH = Path(__file__).parent.parent / "data" / "reach_svhc_registry.json"

def get_reach_svhc_database() -> List[Dict[str, Any]]:
    if REGISTRY_PATH.exists():
        with open(REGISTRY_PATH, "r") as f:
            return json.load(f)
    return []

class ComplianceState(TypedDict, total=False):
    # Input
    raw_sds_text: Optional[str]
    product_name: str
    supplier: str
    ghs_hazard_statements: List[str]
    composition: List[Dict[str, Any]]
    
    # Intermediate & Agent states
    extractor_metadata: Dict[str, Any]
    flagged_svhc_substances: List[Dict[str, Any]]
    detected_cmr_hazards: List[str]
    requires_annex_xiv_auth: bool
    is_compliant: bool
    audit_decision: str
    agents_invoked: List[str]
    execution_time_ms: float
    summary: str

# ------------------------------------------------------------------------------
# Agent Node 1: SDSExtractorAgent
# ------------------------------------------------------------------------------
async def sds_extractor_agent(state: ComplianceState) -> ComplianceState:
    invoked = list(state.get("agents_invoked", []))
    invoked.append("SDSExtractorAgent")
    
    raw_text = state.get("raw_sds_text")
    if raw_text and not state.get("composition"):
        extracted = await extract_sds_with_gemini(raw_text)
        return {
            **state,
            "product_name": state.get("product_name") or extracted.get("product_name", "Extracted Material"),
            "supplier": state.get("supplier") or extracted.get("supplier", "Extracted Supplier"),
            "ghs_hazard_statements": extracted.get("ghs_hazard_statements", []),
            "composition": extracted.get("composition", []),
            "extractor_metadata": {
                "model_used": extracted.get("_llm_model_used"),
                "mode": extracted.get("_extraction_mode")
            },
            "agents_invoked": invoked
        }
    
    return {
        **state,
        "extractor_metadata": {"mode": "structured_payload_validated"},
        "agents_invoked": invoked
    }

# ------------------------------------------------------------------------------
# Agent Node 2: ECHAReachAuditorAgent
# ------------------------------------------------------------------------------
async def reach_svhc_auditor_agent(state: ComplianceState) -> ComplianceState:
    invoked = list(state.get("agents_invoked", []))
    invoked.append("ECHAReachAuditorAgent")

    registry = get_reach_svhc_database()
    svhc_map = {item["cas_number"]: item for item in registry}
    
    composition = state.get("composition", [])
    flagged = []
    requires_auth = False
    is_compliant = True

    for comp in composition:
        cas = comp.get("cas_number")
        pct = float(comp.get("weight_percentage", 0.0))
        
        if cas in svhc_map:
            svhc_rule = svhc_map[cas]
            if pct >= svhc_rule["threshold_pct"]:
                is_compliant = False
                if svhc_rule.get("annex_xiv"):
                    requires_auth = True
                flagged.append({
                    "cas_number": cas,
                    "substance_name": svhc_rule.get("substance_name", comp.get("chemical_name", "")),
                    "detected_percentage": pct,
                    "threshold_limit": svhc_rule["threshold_pct"],
                    "hazard_category": svhc_rule.get("hazard_category", "Toxic for reproduction / Carcinogen"),
                    "annex_xiv_authorization_required": svhc_rule.get("annex_xiv", False)
                })

    return {
        **state,
        "flagged_svhc_substances": flagged,
        "requires_annex_xiv_auth": requires_auth,
        "is_compliant": is_compliant and (len(flagged) == 0),
        "agents_invoked": invoked
    }

# ------------------------------------------------------------------------------
# Agent Node 3: SupervisorGatekeeperAgent
# ------------------------------------------------------------------------------
async def supervisor_gatekeeper_agent(state: ComplianceState) -> ComplianceState:
    invoked = list(state.get("agents_invoked", []))
    invoked.append("SupervisorGatekeeperAgent")

    ghs = state.get("ghs_hazard_statements", [])
    cmr_hazards = [h for h in ghs if any(code in h for code in ["H340", "H350", "H360"])]
    
    flagged_svhc = state.get("flagged_svhc_substances", [])
    is_reach_compliant = state.get("is_compliant", True)
    requires_auth = state.get("requires_annex_xiv_auth", False)

    if not is_reach_compliant or requires_auth:
        decision = "REJECTED_SVHC_DETECTED"
        summary = f"REJECTED: {len(flagged_svhc)} EU REACH SVHC substance(s) exceed statutory threshold (0.1% w/w). Plant dispatch blocked."
    elif cmr_hazards:
        decision = "WARNING_CMR_HAZARDS"
        summary = f"CONDITIONAL APPROVAL: Acute CMR hazard statements detected ({', '.join(cmr_hazards)}). Requires secondary ESH officer sign-off."
    else:
        decision = "PASSED"
        summary = "PASSED: Full compliance with EU REACH SVHC Candidate List and statutory thresholds."

    return {
        **state,
        "detected_cmr_hazards": cmr_hazards,
        "audit_decision": decision,
        "summary": summary,
        "agents_invoked": invoked
    }

# ------------------------------------------------------------------------------
# Multi-Agent Workflow Runner (LangGraph Engine with Seamless Native Fallback)
# ------------------------------------------------------------------------------
async def run_compliance_agent_pipeline(initial_state: ComplianceState) -> ComplianceState:
    start_time = time.perf_counter()
    
    # Try running via official LangGraph StateGraph if package installed
    try:
        from langgraph.graph import StateGraph, START, END
        
        builder = StateGraph(ComplianceState)
        builder.add_node("extractor", sds_extractor_agent)
        builder.add_node("svhc_auditor", reach_svhc_auditor_agent)
        builder.add_node("supervisor", supervisor_gatekeeper_agent)
        
        builder.add_edge(START, "extractor")
        builder.add_edge("extractor", "svhc_auditor")
        builder.add_edge("svhc_auditor", "supervisor")
        builder.add_edge("supervisor", END)
        
        graph = builder.compile()
        result = await graph.ainvoke(initial_state)
    except Exception:
        # Resilient native execution of the 3-node agent workflow
        s1 = await sds_extractor_agent(initial_state)
        s2 = await reach_svhc_auditor_agent(s1)
        result = await supervisor_gatekeeper_agent(s2)

    elapsed_ms = round((time.perf_counter() - start_time) * 1000, 2)
    result["execution_time_ms"] = elapsed_ms
    return result
