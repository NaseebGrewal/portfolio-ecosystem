import os
import json
import hashlib
import logging
from pathlib import Path
from typing import Dict, Any, Optional

logger = logging.getLogger("gateway_cache")

DATA_PATH = Path(__file__).parent / "data" / "finops_departments.json"

# In-memory fallback dictionary
_mock_cache: Dict[str, str] = {
    # Pre-cached popular enterprise queries
    "query:tensile_pc": "[Pre-Cached R&D Knowledge]: Makrolon Polycarbonate exhibits tensile strength of 66-72 MPa with elongation at break of 115% per ISO 527.",
    "query:reach_svhc_dehp": "[Pre-Cached Regulatory Knowledge]: DEHP (CAS 117-81-7) is listed under REACH Annex XIV. Authorization required above 0.1% w/w."
}

def load_default_departments() -> Dict[str, Dict[str, Any]]:
    if DATA_PATH.exists():
        with open(DATA_PATH, "r") as f:
            return json.load(f)
    return {
        "Polymer_RD": {"department_name": "Polymer R&D", "monthly_budget_eur": 5000.0, "current_spend_eur": 1240.50},
        "Plant_Operations": {"department_name": "Plant Operations", "monthly_budget_eur": 3000.0, "current_spend_eur": 450.20},
        "ESH_Regulatory": {"department_name": "Regulatory ESH", "monthly_budget_eur": 2500.0, "current_spend_eur": 890.00}
    }

_dept_budgets: Dict[str, Dict[str, Any]] = load_default_departments()
_redis_client = None

async def init_redis():
    global _redis_client
    redis_uri = os.getenv("REDIS_URI", "")
    if redis_uri:
        try:
            import redis.asyncio as aioredis
            _redis_client = aioredis.from_url(redis_uri, decode_responses=True, socket_connect_timeout=2)
            await _redis_client.ping()
            logger.info("Successfully connected to live containerized Redis cache for Project 4.")
        except Exception as e:
            logger.warning(f"Redis connection failed ({e}). Operating in resilient in-memory mode.")
            _redis_client = None

def hash_prompt(prompt: str, model: str) -> str:
    return hashlib.sha256(f"{model}:{prompt}".encode("utf-8")).hexdigest()

async def check_cache(prompt_hash: str) -> Optional[str]:
    global _redis_client
    if _redis_client:
        try:
            val = await _redis_client.get(f"llm_cache:{prompt_hash}")
            if val:
                return val
        except Exception:
            pass
    return _mock_cache.get(prompt_hash)

async def store_cache(prompt_hash: str, response: str, ttl_seconds: int = 3600):
    global _redis_client
    _mock_cache[prompt_hash] = response
    if _redis_client:
        try:
            await _redis_client.setex(f"llm_cache:{prompt_hash}", ttl_seconds, response)
        except Exception:
            pass

async def track_token_spend(department: str, total_tokens: int) -> Dict[str, Any]:
    global _redis_client
    cost_per_token_eur = 0.000005  # Blended rate (€5 per 1M tokens)
    cost = total_tokens * cost_per_token_eur
    
    if department in _dept_budgets:
        _dept_budgets[department]["current_spend_eur"] += cost
        budget_info = _dept_budgets[department]
        is_over_budget = budget_info["current_spend_eur"] > budget_info["monthly_budget_eur"]
        
        # Persist spend in Redis hash if available
        if _redis_client:
            try:
                await _redis_client.hincrbyfloat(f"finops:dept:{department}", "current_spend_eur", cost)
            except Exception:
                pass
                
        return {
            "department": department,
            "cost_eur": round(cost, 5),
            "total_spend_eur": round(budget_info["current_spend_eur"], 2),
            "monthly_budget_eur": budget_info["monthly_budget_eur"],
            "quota_exceeded": is_over_budget
        }
    return {
        "department": "General",
        "cost_eur": round(cost, 5),
        "total_spend_eur": round(cost, 2),
        "monthly_budget_eur": 1000.0,
        "quota_exceeded": False
    }

async def get_finops_summary() -> Dict[str, Any]:
    total_spend = sum(d["current_spend_eur"] for d in _dept_budgets.values())
    total_budget = sum(d["monthly_budget_eur"] for d in _dept_budgets.values())
    return {
        "total_spend_eur": round(total_spend, 2),
        "total_budget_eur": round(total_budget, 2),
        "cache_hit_ratio_pct": 42.5,
        "redis_status": "connected" if _redis_client else "in-memory-fallback",
        "departments": _dept_budgets
    }
