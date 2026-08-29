# 🤖 Portfolio Ecosystem Agent Interaction Master Guide & Prompt Templates

This guide provides the optimal prompting architecture for interacting with the **Portfolio Ecosystem Architect** agent. Using these structured templates eliminates ambiguity, guarantees zero-hallucination execution, and enforces the mandatory two-stage approval workflow (Pre-Execution Plan Approval & Post-Execution Sign-Off), Docker-only testing, and browser visual inspection protocols.

---

## 🎯 Master Prompt Template (Copy & Paste for New Tasks)

Copy the markdown block below into your chat whenever you want the agent to execute a task with maximum precision:

```markdown
### 🎯 AGENT EXECUTION DIRECTIVE

**1. Mode**: [investigate | review | implement | test | audit]
**2. Target Service**: [portfolio-website | 01-materials | 02-chemagent | 03-rheology | 04-gateway | all]
**3. Affected Files / Scope**: [List known files or specify "Explore & identify dependencies"]

**4. Objective**:
[Describe in 1-3 clear sentences what you want to achieve, build, or fix]

**5. Detailed Requirements & Acceptance Criteria**:
- [ ] Requirement 1: [Specific behavior or schema definition]
- [ ] Requirement 2: [UI/UX, API, or state handling requirement]
- [ ] Requirement 3: [Edge cases to handle, e.g., error responses, empty states]

**6. Technical & Quality Invariants**:
- Type Safety: Strict TypeScript / Pydantic models (no `any`).
- Performance: [e.g., Sub-50ms latency / Sub-2ms WASM / Redis semantic caching].
- Testing: ALL tests must pass inside Docker containers (`./scripts/docker-test-all.sh`).
- Visual Validation: Agent must inspect running UI at `http://localhost:3000` via browser tools across 3 device form factors: Mobile (375px–430px), Laptop (1024px–1440px), and Large/Ultra-Wide Monitors (1440px–2560px+) with `max-w-[1440px] mx-auto` constraint.

**7. Mandatory Workflow & Approval Protocol**:
- 🚨 **Stage 1 (Pre-Execution Approval)**: FIRST present a bulleted action plan and ask: *"Do you approve of this plan?"* with options `[Yes, approve and proceed]` and `[Custom input from user]`. Do NOT mutate code until approved.
- ⚡ **Stage 2 (Execution & Docker Testing)**: Implement changes and verify 100% pass rate in Docker containers.
- 👁️ **Stage 3 (Browser Inspection across 3 Devices)**: Inspect `http://localhost:3000` with local browser tools across Mobile, Laptop, and Large Monitors.
- 🏁 **Stage 4 (Final Sign-Off)**: Provide a completed checklist and ask: *"Are all tasks finished and do you approve of this?"* with options `[Yes, approve and finalize]` and `[Custom input from user]`.
```

---

## 🛠️ Mode-Specific Prompt Recipes

### Recipe A: `investigate` Mode (System Discovery & Planning)
Use when exploring unfamiliar code, planning large refactors, or tracing data flows without making code changes.

```markdown
### 🔍 INVESTIGATE DIRECTIVE
**Mode**: investigate
**Target Service**: [e.g., 04-enterprise-ai-gateway-finops]
**Question / Scope**: [e.g., How does the Redis semantic cache key hashing work and how are rate limits enforced?]
**Expected Output**:
1. Architecture summary and file dependency map.
2. Formulate a structured to-do list using `manage_todo_list`.
3. Highlight potential edge cases or bottlenecks without modifying any files.
```

---

### Recipe B: `review` Mode (FAANG & Executive Engineering Audit)
Use when auditing code quality, API contracts, security compliance, or UI/UX polish.

```markdown
### 📋 REVIEW DIRECTIVE
**Mode**: review
**Target Service**: [e.g., portfolio-website and 02-chemagent-sds-compliance]
**Audit Focus**: [e.g., Check for executive-grade design, type safety, error boundaries, and P99 latency]
**Deliverable**:
- Categorized findings: Critical, High, Medium, and Strategic Value-Add.
- Specific recommendations with file and line references.
```

---

### Recipe C: `implement` Mode (Zero-Defect Code & Feature Implementation)
Use when adding a feature, building a new microservice, or fixing bugs.

```markdown
### ⚡ IMPLEMENT DIRECTIVE
**Mode**: implement
**Target Service**: [e.g., portfolio-website / components / LiveMaterialPlayground.tsx]
**Task**: [e.g., Add dynamic tensile curve comparison overlay to the Materials sandbox]
**Constraints**:
- Keep strictly 1 task in `in-progress` at a time using `manage_todo_list`.
- Maintain full TypeScript strict typing and Tailwind design system consistency.
- Run tests in Docker containers (`docker compose up -d` + `./scripts/docker-test-all.sh`).
- Visually inspect in browser at `http://localhost:3000`.
- Present checklist and ask for approval: `[Yes, approve and finalize]` or `[Custom input from user]`.
```

---

### Recipe D: `test` Mode (Docker-Only Verification)
Use when verifying the health and test suites across all monorepo containers.

```markdown
### 🧪 DOCKER TEST DIRECTIVE
**Mode**: test
**Scope**: All 5 monorepo services
**Instruction**:
1. Run `./scripts/docker-test-all.sh`.
2. Confirm 100% pass rate across:
   - `materials_backend` (pytest)
   - `chemagent_backend` (pytest)
   - `rheology_backend` (pytest)
   - `gateway_backend` (pytest)
   - `portfolio_website` (Vitest)
3. Report detailed results table with execution times.
```

---

### Recipe E: `audit` Mode (Browser Visual & Functional Inspection)
Use to visually inspect UI components, layouts, responsiveness, and interactive state transitions.

```markdown
### 👁️ BROWSER AUDIT DIRECTIVE
**Mode**: audit
**Target URL**: http://localhost:3000
**Items to Verify**:
- Header navigation sticky behavior and smooth anchor scrolling.
- Interactive Live Demo sandboxes (all 4 tabs: Materials, ChemAgent, Rheology, FinOps).
- Skills Matrix category filtering and Experience Timeline layout.
- Mobile/desktop viewport responsiveness and contrast ratios.
```

---

## 💡 Best Practices for Communicating with the Agent

1. **Specify the Operational Mode**: Prefixing your prompt with `Mode: implement` or `Mode: investigate` instantly aligns the agent's behavior and tool selection.
2. **Define Quantifiable Acceptance Criteria**: Give concrete assertions (e.g., "Must return HTTP 200 with JSON schema matching `MaterialResponse`").
3. **Reiterate the Docker Testing & Browser Rules**: The agent is pre-configured to test only in Docker containers and visually inspect via browser tools, but referencing the script `./scripts/docker-test-all.sh` reinforces compliance.
4. **Demand Structured Sign-Off**: The agent will always conclude with a bulleted verification summary and ask for your approval with the two predefined options.
