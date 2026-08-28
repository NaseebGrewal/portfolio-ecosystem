# Portfolio Ecosystem Monorepo Guidelines

## Architectural Overview
This monorepo is an Executive-grade AI & R&D Digitalization portfolio containing 4 production-grade flagship microservices and a Next.js 15 web application:
- **`portfolio-website`**: Next.js 15 (App Router, React 18/19, Tailwind CSS, TypeScript, Vitest).
- **`projects/01-materials-intelligence-platform`**: FastAPI + Next.js frontend for high-throughput polymer formulation intelligence.
- **`projects/02-chemagent-sds-compliance`**: FastAPI + Multi-Agent autonomous REACH SVHC regulatory compliance engine.
- **`projects/03-rust-wasm-rheology-engine`**: FastAPI + Rust/WASM high-performance mechanical & rheological constitutive model analytics.
- **`projects/04-enterprise-ai-gateway-finops`**: FastAPI + Redis semantic cache + LiteLLM FinOps cost tracking & token budgeting.

---

## Mandatory Lifecycle & Approval Protocol

### 1. Pre-Execution Plan & User Approval Rule (MANDATORY BEFORE ANY ACTION)
- Whenever the user gives a prompt, task, or request (investigation, review, implementation, or refactoring):
  1. The agent MUST FIRST present a concise, bullet-point action plan explaining exactly what it will do.
  2. The agent MUST ask the user: *"Do you approve of this plan?"* and present two explicit options:
     - `Yes, approve and proceed`
     - `Custom input from user`
  3. The agent MUST NOT proceed with editing files, running heavy investigations, or implementing changes until the user approves the plan.

### 2. Docker-Only Testing Rule
- **All tests MUST be run exclusively inside Docker containers.**
- Do NOT run tests in the host environment. Always bring up services via Docker Compose:
  ```bash
  docker compose up -d
  ```
- Run tests across all services inside their respective containers:
  - `docker compose exec -T materials_backend pytest`
  - `docker compose exec -T chemagent_backend pytest`
  - `docker compose exec -T rheology_backend pytest`
  - `docker compose exec -T gateway_backend pytest`
  - `docker compose exec -T portfolio_website npm run test`
- Alternatively, run `./scripts/docker-test-all.sh`.
- All 5 test suites must pass 100% with zero failures.

### 3. Browser Visual Verification Rule
- Once all Docker tests pass, the agent MUST use local browser tools (`open_browser_page`, `read_page`, `screenshot_page`) to inspect `http://localhost:3000` (and `http://localhost:3001` if materials frontend was altered).
- Verify interactive widgets, layout responsiveness, contrast, and console health.

### 4. Post-Execution Summary & Final Sign-Off Rule
- After completing tasks and validating via Docker tests and browser inspection, present a bulleted summary checklist of all completed work.
- Prompt the user for final sign-off with two explicit options:
  1. `Yes, approve and finalize`
  2. `Custom input from user`

---

## Code Quality & Engineering Standards
- **Strict Typing**: Full TypeScript coverage with strict mode; Pydantic models for all Python API contracts.
- **Defensive Error Handling**: Clear HTTP status codes, structured JSON error payloads, and resilient fallback states in UI components.
- **FAANG & Executive Level Standards**: Clean separation of concerns, high-density telemetry, low latency execution, and clear business metrics (€1.2M+ saved, 99.95% SLA, 60% acceleration).
