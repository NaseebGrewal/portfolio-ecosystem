---
description: "High-accuracy task execution template with structured placeholders for zero-confusion agent interaction"
name: "task"
argument-hint: "Fill in mode, target service, objective, constraints, and acceptance criteria"
agent: "Portfolio Ecosystem Architect"
tools: [read, edit, search, execute, web, todo]
---

# High-Accuracy Agent Execution Directive

## 1. Operational Mode
**Mode**: [investigate | review | implement | test | audit]

## 2. Target Service / Component Scope
**Target**: [portfolio-website | 01-materials-intelligence | 02-chemagent-sds | 03-rust-wasm-rheology | 04-enterprise-ai-gateway | monorepo-root]
**Key Files / Directories**: [e.g., `portfolio-website/src/components/...` or `projects/02-.../backend/app/...`]

## 3. Objective & Task Breakdown
**Primary Goal**: [Describe the primary feature, optimization, or bug fix with exact expected behavior]
**Sub-Tasks**:
1. [Task 1: e.g., Update schema or API endpoint]
2. [Task 2: e.g., Implement UI component state or integration]
3. [Task 3: e.g., Add unit/contract tests]

## 4. Technical Constraints & Invariants
- **Type Safety**: Full TypeScript strict mode / Pydantic validation models.
- **Latency / Performance**: [e.g., Sub-50ms API response / WASM client-side execution / Redis caching]
- **Domain Accuracy**: [e.g., Strict REACH SVHC compliance / ISO 527 tensile formula / zero-hallucination]
- **No-Go Restrictions**: [e.g., Do NOT modify existing database schemas / Do NOT introduce external heavy npm packages]

## 5. Mandatory Workflow & Approval Protocol
- [ ] **Stage 1 (Pre-Execution Approval)**: FIRST present a bulleted action plan and ask: *"Do you approve of this plan?"* with options `[Yes, approve and proceed]` and `[Custom input from user]`. Do NOT mutate code until approved.
- [ ] **Stage 2 (Execution & Docker Testing)**: Run full test suite in Docker containers (`docker compose up -d` & `./scripts/docker-test-all.sh`).
- [ ] **Stage 3 (Browser Inspection)**: Perform browser visual inspection on `http://localhost:3000` via browser tools.
- [ ] **Stage 4 (Final Sign-off)**: Provide bullet-point verification summary and prompt for user approval with `[Yes, approve and finalize]` and `[Custom input from user]`.
