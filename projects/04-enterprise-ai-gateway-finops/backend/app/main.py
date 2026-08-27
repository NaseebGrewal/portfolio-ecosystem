from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from app.gateway import init_redis, hash_prompt, check_cache, store_cache, track_token_spend, get_finops_summary

@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_redis()
    yield

app = FastAPI(
    title="Enterprise AI Gateway & FinOps Proxy API",
    description="LLM Semantic Caching, Departmental Budget Controls & Model Routing",
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

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatCompletionRequest(BaseModel):
    model: str = "azure/gpt-4o"
    messages: List[ChatMessage]
    department: str = "Polymer_RD"
    temperature: float = 0.7

@app.get("/health")
async def health():
    return {
        "status": "healthy",
        "service": "enterprise-ai-gateway",
        "semantic_cache": "online",
        "finops_ledger": "active"
    }

@app.get("/api/v1/finops/report")
async def finops_report():
    return await get_finops_summary()

@app.get("/api/v1/finops/departments")
async def list_departments():
    summary = await get_finops_summary()
    return summary["departments"]

@app.post("/api/v1/chat/completions")
async def chat_completions(req: ChatCompletionRequest):
    prompt_text = "".join(m.content for m in req.messages)
    p_hash = hash_prompt(prompt_text, req.model)
    
    # 1. Check Semantic Cache (Redis with in-memory fallback)
    cached_content = await check_cache(p_hash)
    if cached_content:
        return {
            "id": "chatcmpl-cached",
            "model": req.model,
            "cached": True,
            "latency_ms": 3.2,
            "choices": [{"message": {"role": "assistant", "content": cached_content}}],
            "usage": {"prompt_tokens": 0, "completion_tokens": 0, "total_tokens": 0, "cost_eur": 0.0}
        }

    # 2. Simulated Model Completion
    simulated_reply = f"[Gateway Proxy Completion via {req.model}]: Analyzed prompt successfully with zero data leakage."
    await store_cache(p_hash, simulated_reply)

    # 3. Track FinOps Spend
    prompt_tokens = len(prompt_text) // 4 + 10
    comp_tokens = len(simulated_reply) // 4 + 10
    total_tokens = prompt_tokens + comp_tokens
    
    finops_record = await track_token_spend(req.department, total_tokens)

    return {
        "id": "chatcmpl-live",
        "model": req.model,
        "cached": False,
        "latency_ms": 142.8,
        "choices": [{"message": {"role": "assistant", "content": simulated_reply}}],
        "usage": {
            "prompt_tokens": prompt_tokens,
            "completion_tokens": comp_tokens,
            "total_tokens": total_tokens,
            "cost_eur": finops_record["cost_eur"]
        },
        "finops": finops_record
    }
