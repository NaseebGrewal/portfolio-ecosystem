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

### 2. Docker-Only Testing & Dependency Management Rule (NO HOST COMMANDS)
- **STRICT HOST EXECUTION PROHIBITION**: NEVER run package installation or build commands on the host machine (e.g., `npm install`, `pip install`, `cargo build`, `pip3`, `yarn`, `pnpm`). The host environment may lack node_modules, Python virtualenvs, or Rust toolchains by design.
- **Dependency Changes**: When new packages or dependencies are needed, simply declare and update them in the appropriate config file (`package.json`, `requirements.txt`, `Cargo.toml`).
- **Container Build & Execution**: Docker Compose will handle all dependency installations and compilation inside isolated Docker containers:
  ```bash
  docker compose up -d --build
  ```
- **Error Gate Invariant**: If there is ANY build error, compilation error, or startup failure when running `docker compose up -d --build` or starting any container:
  1. The agent MUST immediately inspect the build/container logs.
  2. The agent MUST resolve the underlying syntax, configuration, or dependency issue.
  3. The agent MUST re-run `docker compose up -d --build` to confirm clean exit code 0.
  4. The agent is STRICTLY FORBIDDEN from presenting a final sign-off or claiming completion while any Docker build, container startup, or test has failed.
- Run tests across all services inside their respective containers:
  - `docker compose exec -T materials_backend pytest`
  - `docker compose exec -T chemagent_backend pytest`
  - `docker compose exec -T rheology_backend pytest`
  - `docker compose exec -T gateway_backend pytest`
  - `docker compose exec -T doc_intelligence_backend pytest`
  - `docker compose exec -T clinical_triage_backend pytest`
  - `docker compose exec -T code_review_backend pytest`
  - `docker compose exec -T portfolio_website npm run test`
- Alternatively, run `./scripts/docker-test-all.sh`.
- All test suites must pass 100% with zero failures.

### 3. Comprehensive Edge-Case Analysis & Deep Verification Rule
- **Mandatory Edge-Case Discovery**: When analyzing, planning, or implementing any feature, the agent MUST systematically identify and address all operational and visual edge cases:
  1. **Visual Graphic Parity**: If a UI section claims to display visual graphics (e.g., "Bar Graphs & Pie Charts"), ensure actual visual charts (interactive SVG/Canvas elements with responsive scales, tooltips, and legends) are implemented rather than just numeric summary cards.
  2. **Conversational AI & Open-Domain Intelligence**: Chatbot agents must deliver rich responses for general knowledge, technical queries, math, coding, and web-scale questions when no document is loaded, leveraging active API routes (`/api/genai-assistant`) or pre-trained knowledge bases.
  3. **Semantic Query Intent Routing in RAG**: When querying indexed documents, distinguish between holistic queries (*"what is mentioned in this document"*, *"summarize this paper"*, *"overview"*)—which require synthesized multi-section executive overviews—and granular technical queries (*"ISO 527 modulus"*, *"Carreau-Yasuda equation"*, *"SVHC limit"*)—which require focused mathematical formulations and exact section citations.
  4. **Data Integrity & Form Lifecycle**: Validate duplicate records (e.g., blocking identical patient IDs/MRNs), provide clean reset mechanisms, handle empty/loading/error states defensively, and prevent UI state leakage.

### 4. Browser Visual, Responsive Form Factors & Live Update Verification Rule
- Once all Docker builds and tests pass, the agent MUST verify that the live application at `http://localhost:3000` (and `http://localhost:3001` if materials frontend was altered) displays the newly implemented updates (not a stale prior build).
- **Mandatory 3-Device Responsive Testing**:
  1. **Mobile Viewport (375px–430px)**: Verify navigation ribbon/drawer, stacked vertical layout, full-bleed images, touch target sizing, and zero horizontal overflow.
  2. **Laptop Viewport (1024px–1440px)**: Verify desktop top navigation, 2-column balanced Hero grid, 2-column project cards, and clean typography.
  3. **Large Monitors / Ultra-Wide Viewport (1440px–2560px+)**: Verify that content is elegantly constrained by maximum content width (`max-w-[1440px] mx-auto`) with balanced gutters, ensuring cards and text never stretch excessively or look distorted on 4K/retina monitors.
- Use local browser inspection tools to inspect `http://localhost:3000`.
- Verify interactive widgets, layout responsiveness, contrast, and console health.

### 5. Post-Execution Summary & Final Sign-Off Rule
- Only AFTER all Docker builds exit with code 0, all test suites pass 100%, and live updates are verified on `http://localhost:3000`, present a bulleted summary checklist of all completed work.
- Prompt the user for final sign-off with two explicit options:
  1. `Yes, approve and finalize`
  2. `Custom input from user`

---

## Code Quality & Engineering Standards
- **Strict Typing**: Full TypeScript coverage with strict mode; Pydantic models for all Python API contracts.
- **Defensive Error Handling**: Clear HTTP status codes, structured JSON error payloads, and resilient fallback states in UI components.
- **FAANG & Executive Level Standards**: Clean separation of concerns, high-density telemetry, low latency execution, and clear business metrics (€1.2M+ saved, 99.95% SLA, 60% acceleration).
