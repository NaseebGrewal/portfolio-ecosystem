import json
from pathlib import Path
from typing import List, Dict, Any

REGISTRY_PATH = Path(__file__).parent.parent / "data" / "reach_svhc_registry.json"

def get_reach_svhc_database() -> List[Dict[str, Any]]:
    if REGISTRY_PATH.exists():
        with open(REGISTRY_PATH, "r") as f:
            return json.load(f)
    return []

def audit_chemical_composition(composition: List[Dict[str, Any]]) -> Dict[str, Any]:
    registry = get_reach_svhc_database()
    svhc_map = {item["cas_number"]: item for item in registry}
    
    flagged_substances = []
    is_compliant = True
    requires_authorization = False

    for item in composition:
        cas = item.get("cas_number")
        pct = item.get("weight_percentage", 0.0)
        
        if cas in svhc_map:
            svhc_rule = svhc_map[cas]
            if pct >= svhc_rule["threshold_pct"]:
                is_compliant = False
                if svhc_rule["annex_xiv"]:
                    requires_authorization = True
                flagged_substances.append({
                    "cas_number": cas,
                    "substance_name": svhc_rule["substance_name"],
                    "detected_percentage": pct,
                    "threshold_limit": svhc_rule["threshold_pct"],
                    "hazard_category": svhc_rule["hazard_category"],
                    "annex_xiv_authorization_required": svhc_rule["annex_xiv"]
                })
                
    return {
        "is_compliant": is_compliant,
        "requires_authorization": requires_authorization,
        "flagged_substances_count": len(flagged_substances),
        "flagged_substances": flagged_substances,
        "audit_decision": "PASSED" if is_compliant else "REJECTED_SVHC_DETECTED"
    }
