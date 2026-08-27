# Step-by-Step Implementation Plan: Enterprise AI Gateway & FinOps

Roadmap for autonomous development with **GitHub Copilot** or **Claude Code**.

---

## 📋 Milestones & Agent Prompts

### Step 1: Gateway Proxy & OpenAI-Compatible Spec
**Agent Prompt:**
> *"Build the OpenAI-compatible completion router in `backend/app/routers/completions.py` supporting `/v1/chat/completions`. Implement model fallback hierarchy: primary provider `azure/gpt-4o`, secondary `aws/claude-3-5-sonnet`, tertiary `local/llama-3`."*

### Step 2: Redis Semantic Cache & Sliding Window Rate Limiter
**Agent Prompt:**
> *"Implement the caching layer in `backend/app/gateway.py` using Redis hashes and exact SHA256 prompt hashing with TTL expiration. Add sliding-window rate limiting per API key (e.g., 60 requests/min, 50,000 tokens/min)."*

### Step 3: FinOps Token Accounting & Budget Hard Limits
**Agent Prompt:**
> *"Create a FinOps token ledger in `backend/app/finops.py` that parses prompt and completion tokens, looks up pricing per 1k tokens from a pricing table, and increments departmental counters in Redis. If the monthly euro ceiling is breached, reject requests with HTTP 429 and informative budget alert JSON."*

### Step 4: Add Pytest Test Suite
**Agent Prompt:**
> *"Write a Pytest suite in `tests/test_gateway_api.py` testing cache hits, budget threshold enforcement, PII masking, and multi-cloud fallback simulation."*
