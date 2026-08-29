import json
from pathlib import Path
from typing import List, Dict, Any
from app.agents.graph import run_compliance_agent_pipeline, get_reach_svhc_database, ComplianceState

def audit_chemical_composition(composition: List[Dict[str, Any]]) -> Dict[str, Any]:
    registry = get_reach_svhc_database()
    svhc_map = {item["cas_number"]: item for item in registry}
    
    flagged_substances = []
    is_compliant = True
    requires_authorization = False

    for item in composition:
        cas = item.get("cas_number")
        pct = float(item.get("weight_percentage", 0.0))
        
        if cas in svhc_map:
            svhc_rule = svhc_map[cas]
            if pct >= svhc_rule["threshold_pct"]:
                is_compliant = False
                if svhc_rule.get("annex_xiv"):
                    requires_authorization = True
                flagged_substances.append({
                    "cas_number": cas,
                    "substance_name": svhc_rule.get("substance_name", item.get("chemical_name", "")),
                    "detected_percentage": pct,
                    "threshold_limit": svhc_rule["threshold_pct"],
                    "hazard_category": svhc_rule.get("hazard_category", "REACH SVHC Candidate"),
                    "annex_xiv_authorization_required": svhc_rule.get("annex_xiv", False)
                })
                
    return {
        "is_compliant": is_compliant,
        "requires_authorization": requires_authorization,
        "flagged_substances_count": len(flagged_substances),
        "flagged_substances": flagged_substances,
        "audit_decision": "PASSED" if is_compliant else "REJECTED_SVHC_DETECTED"
    }
