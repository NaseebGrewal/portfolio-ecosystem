import json
import os
import logging
from pathlib import Path
from typing import List, Optional, Dict, Any

logger = logging.getLogger("materials_db")
DATA_PATH = Path(__file__).parent / "data" / "seed_materials.json"

_in_memory_materials: List[dict] = []
_motor_client = None
_db = None

def load_seed_data() -> List[dict]:
    global _in_memory_materials
    if not _in_memory_materials and DATA_PATH.exists():
        with open(DATA_PATH, "r") as f:
            _in_memory_materials = json.load(f)
    return _in_memory_materials

async def init_db():
    global _motor_client, _db
    # Always ensure in-memory materials are loaded
    load_seed_data()
    mongodb_uri = os.getenv("MONGODB_URI", "")
    if mongodb_uri:
        try:
            import motor.motor_asyncio
            _motor_client = motor.motor_asyncio.AsyncIOMotorClient(
                mongodb_uri,
                serverSelectionTimeoutMS=2000
            )
            db_name = "materials_db"
            _db = _motor_client[db_name]
            
            await _db.command("ping")
            logger.info("Connected to external MongoDB.")
            
            # Auto-seed if collection is empty
            count = await _db.materials.count_documents({})
            if count == 0:
                seeds = load_seed_data()
                if seeds:
                    await _db.materials.insert_many([dict(s) for s in seeds])
                    logger.info(f"Auto-seeded {len(seeds)} material documents into MongoDB.")
        except Exception as e:
            logger.warning(f"MongoDB connection skipped or failed ({e}). Using embedded JSON database.")
            _db = None
    else:
        logger.info("Using high-performance embedded JSON material database.")

async def get_materials(
    polymer_family: Optional[str] = None,
    min_tensile_modulus: Optional[float] = None,
    max_tensile_modulus: Optional[float] = None,
    search: Optional[str] = None
) -> List[dict]:
    global _db
    if _db is not None:
        try:
            query: Dict[str, Any] = {}
            if polymer_family:
                query["polymer_family"] = {"$regex": polymer_family, "$options": "i"}
            
            modulus_query = {}
            if min_tensile_modulus is not None:
                modulus_query["$gte"] = min_tensile_modulus
            if max_tensile_modulus is not None:
                modulus_query["$lte"] = max_tensile_modulus
            if modulus_query:
                query["mechanical.tensile_modulus_mpa"] = modulus_query

            if search:
                query["$or"] = [
                    {"trade_name": {"$regex": search, "$options": "i"}},
                    {"applications": {"$regex": search, "$options": "i"}}
                ]

            cursor = _db.materials.find(query, {"_id": 0})
            results = await cursor.to_list(length=100)
            if results:
                return results
        except Exception as e:
            logger.warning(f"MongoDB query failed: {e}. Falling back to in-memory.")

    materials = load_seed_data()
    results = []
    for mat in materials:
        if polymer_family and polymer_family.lower() not in mat["polymer_family"].lower():
            continue
        if min_tensile_modulus is not None and mat["mechanical"]["tensile_modulus_mpa"] < min_tensile_modulus:
            continue
        if max_tensile_modulus is not None and mat["mechanical"]["tensile_modulus_mpa"] > max_tensile_modulus:
            continue
        if search:
            q = search.lower()
            name_match = q in mat["trade_name"].lower()
            app_match = any(q in app.lower() for app in mat.get("applications", []))
            if not (name_match or app_match):
                continue
        results.append(mat)
    return results

async def get_material_by_id_from_db(material_id: str) -> Optional[dict]:
    global _db
    if _db is not None:
        try:
            doc = await _db.materials.find_one({"id": {"$regex": f"^{material_id}$", "$options": "i"}}, {"_id": 0})
            if doc:
                return doc
        except Exception:
            pass

    materials = load_seed_data()
    for mat in materials:
        if mat["id"].lower() == material_id.lower():
            return mat
    return None
