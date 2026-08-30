# Enterprise Production Deployment & Live Showcase Guide

This guide provides the complete blueprint for deploying your **Executive Portfolio Website** and all **7 Flagship Projects** to production with **Zero Cloud Costs ($0.00 / month)**, enterprise SSL/TLS encryption, and continuous integration/continuous deployment (CI/CD) under your personal brand.

---

## 🏛️ Overall Deployment Architecture

```mermaid
graph TD
    Domain[Your Monorepo on GitHub: portfolio-ecosystem]
    
    subgraph Vercel Unified Cloud Platform (Zero Cold Starts - $0/mo)
        Domain -->|Root Dir: portfolio-website (Next.js Preset)| VercelWeb[Executive Portfolio Website: Next.js 15]
        Domain -->|Root Dir: projects/01.../frontend (Next.js Preset)| VercelP1Front[Project 01 Frontend: Next.js 15]
        Domain -->|Root Dir: projects/01.../backend (FastAPI Preset)| VercelP1API[Project 01 API: FastAPI Materials Core]
        Domain -->|Root Dir: projects/02.../backend (FastAPI Preset)| VercelP2API[Project 02 API: ChemAgent SDS Compliance]
        Domain -->|Root Dir: projects/03.../backend (FastAPI Preset)| VercelP3API[Project 03 API: Rust-WASM Rheology Engine]
        Domain -->|Root Dir: projects/04.../backend (FastAPI Preset)| VercelP4API[Project 04 API: Enterprise AI FinOps Gateway]
        Domain -->|Root Dir: projects/05.../backend (FastAPI Preset)| VercelP5API[Project 05 API: Multimodal Doc Intelligence]
        Domain -->|Root Dir: projects/06.../backend (FastAPI Preset)| VercelP6API[Project 06 API: Clinical NLP Sentiment Triage]
        Domain -->|Root Dir: projects/07.../backend (FastAPI Preset)| VercelP7API[Project 07 API: Master's Thesis AST & RAG Reviewer]
    end

    subgraph Local Development & Testing Tier (Docker Compose)
        LocalDev[docker compose up --build] --> Cont1[Portfolio Web :3000]
        LocalDev --> Cont2[Materials Frontend :3001]
        LocalDev --> Cont3[Materials API :8000]
        LocalDev --> Cont4[ChemAgent API :8001]
        LocalDev --> Cont5[Rheology API :8002]
        LocalDev --> Cont6[AI Gateway :8003]
        LocalDev --> Cont7[Doc Intelligence API :8004]
        LocalDev --> Cont8[Clinical Triage API :8005]
        LocalDev --> Cont9[Code Review AST API :8006]
        LocalDev --> Cont10[Shared Redis :6379]
    end
```

---

## ⚡ Part 1: Local Full-Stack Orchestration (Docker Compose)

The monorepo contains a unified [docker-compose.yml](docker-compose.yml) in the workspace root that spins up all microservices and frontend applications simultaneously with pre-seeded datasets and configuration.

### Running all services locally:
```bash
# 1. Navigate to the repository root
cd portfolio-ecosystem

# 2. Build and launch all containers
docker compose up -d --build
```

### Local Endpoint Map:
| Service | Local URL | Swagger / Docs | Description |
| :--- | :--- | :--- | :--- |
| **Executive Portfolio Website** | `http://localhost:3000` | N/A | Next.js 15 App Router portfolio with live interactive sandboxes |
| **Project 01 (Frontend)** | `http://localhost:3001` | N/A | Next.js 15 Materials Explorer dashboard |
| **Project 01 (Materials API)** | `http://localhost:8000` | `http://localhost:8000/docs` | FastAPI Materials Intelligence & Polymer Analytics API |
| **Project 02 (ChemAgent)** | `http://localhost:8001` | `http://localhost:8001/docs` | Autonomous Multi-Agent SDS & REACH Compliance Auditor |
| **Project 03 (Rheology Engine)** | `http://localhost:8002` | `http://localhost:8002/docs` | High-speed tensile mechanics & ISO 527 invariant solver |
| **Project 04 (AI Gateway & FinOps)** | `http://localhost:8003` | `http://localhost:8003/docs` | LLM FinOps proxy with Redis semantic prompt caching |
| **Project 05 (Doc Intelligence)** | `http://localhost:8004` | `http://localhost:8004/docs` | Multimodal document parsing, OCR, and semantic vector mesh |
| **Project 06 (Clinical Triage)** | `http://localhost:8005` | `http://localhost:8005/docs` | BioBERT clinical sentiment analysis, PHI de-identification & emergency triage |
| **Project 07 (Code Review & Thesis RAG)** | `http://localhost:8006` | `http://localhost:8006/docs` | Python AST static analyzer, CWE security scanner & FAISS vector RAG |
| **Shared Redis** | `localhost:6379` | N/A | High-speed in-memory cache for Gateway and microservices |

---

## 🚀 Part 2: Pushing the Monorepo to GitHub

```bash
# 1. Initialize git in the root folder (if not already done)
git init
git add .
git commit -m "feat: complete executive portfolio ecosystem with 7 microservices"
git branch -M main

# 2. Connect to your GitHub repository
git remote add origin https://github.com/<your-github-username>/portfolio-ecosystem.git
git push -u origin main
```

---

## ☁️ Part 3: Deploying All Applications to Vercel (Native FastAPI & Next.js)

Vercel natively supports **FastAPI** as a serverless backend preset alongside **Next.js 15**. You can deploy all services from the single `portfolio-ecosystem` GitHub repository.

### Deployment Matrix on Vercel:

#### 1. Main Portfolio Website
* **Import Repository:** `portfolio-ecosystem`
* **Project Name:** `portfolio-website`
* **Framework Preset:** `Next.js`
* **Root Directory:** Click **Edit** $\rightarrow$ select `portfolio-website`
* **Environment Variables:**
  * `NEXT_PUBLIC_MATERIALS_API_URL`: `<URL of Project 01 API>` (e.g., `https://materials-intelligence-api.vercel.app`)
  * `NEXT_PUBLIC_CHEMAGENT_API_URL`: `<URL of Project 02 API>` (e.g., `https://chemagent-sds-compliance-api.vercel.app`)
  * `NEXT_PUBLIC_RHEOLOGY_API_URL`: `<URL of Project 03 API>` (e.g., `https://rust-wasm-rheology-engine-api.vercel.app`)
  * `NEXT_PUBLIC_GATEWAY_API_URL`: `<URL of Project 04 API>` (e.g., `https://enterprise-ai-gateway-api.vercel.app`)
  * `NEXT_PUBLIC_DOC_INTELLIGENCE_API_URL`: `<URL of Project 05 API>` (e.g., `https://multimodal-doc-intelligence-api.vercel.app`)
  * `NEXT_PUBLIC_CLINICAL_TRIAGE_API_URL`: `<URL of Project 06 API>` (e.g., `https://clinical-sentiment-triage-api.vercel.app`)
  * `NEXT_PUBLIC_CODE_REVIEW_API_URL`: `<URL of Project 07 API>` (e.g., `https://autonomous-ast-code-review-api.vercel.app`)
  * `NEXT_PUBLIC_PROJECT_5_GITHUB_URL`: `<Optional GitHub Repo URL for Project 05>`
  * `NEXT_PUBLIC_PROJECT_6_GITHUB_URL`: `<Optional GitHub Repo URL for Project 06>`
  * `NEXT_PUBLIC_PROJECT_7_GITHUB_URL`: `<Optional GitHub Repo URL for Project 07>`
  * `GEMINI_API_KEY` / `NEXT_PUBLIC_GEMINI_AI_API_KEY`: `<Google Gemini API Key for Live Copilot Assistant>`

#### 2. Project 01: Materials Intelligence API (FastAPI)
* **Import Repository:** `portfolio-ecosystem`
* **Project Name:** `materials-intelligence-api`
* **Framework Preset:** `FastAPI` (Auto-detected from `app/main.py` and `requirements.txt`)
* **Root Directory:** `projects/01-materials-intelligence-platform/backend`
* **Swagger Docs:** `https://materials-intelligence-api.vercel.app/docs`

#### 3. Project 01: Materials Platform Frontend (Next.js)
* **Import Repository:** `portfolio-ecosystem`
* **Project Name:** `materials-intelligence-frontend`
* **Framework Preset:** `Next.js`
* **Root Directory:** `projects/01-materials-intelligence-platform/frontend`
* **Environment Variables:**
  * `NEXT_PUBLIC_API_URL`: `https://materials-intelligence-api.vercel.app`

#### 4. Project 02: ChemAgent SDS Compliance API (FastAPI)
* **Import Repository:** `portfolio-ecosystem`
* **Project Name:** `chemagent-sds-compliance-api`
* **Framework Preset:** `FastAPI`
* **Root Directory:** `projects/02-chemagent-sds-compliance/backend`
* **Swagger Docs:** `https://chemagent-sds-compliance-api.vercel.app/docs`
* **Environment Variables:**
  * `GEMINI_API_KEY`: `<Google Gemini API Key for Multi-Agent SDS reasoning>`

#### 5. Project 03: Lab Rheology & Mechanics Engine API (FastAPI)
* **Import Repository:** `portfolio-ecosystem`
* **Project Name:** `rust-wasm-rheology-engine-api`
* **Framework Preset:** `FastAPI`
* **Root Directory:** `projects/03-rust-wasm-rheology-engine/backend`
* **Swagger Docs:** `https://rust-wasm-rheology-engine-api.vercel.app/docs`

#### 6. Project 04: Enterprise AI Gateway & FinOps Controller (FastAPI)
* **Import Repository:** `portfolio-ecosystem`
* **Project Name:** `enterprise-ai-gateway-api`
* **Framework Preset:** `FastAPI`
* **Root Directory:** `projects/04-enterprise-ai-gateway-finops/backend`
* **Swagger Docs:** `https://enterprise-ai-gateway-api.vercel.app/docs`
* **Optional Environment Variable:**
  * `REDIS_URI`: Upstash Redis URI (`redis://default:xxx@xxx.upstash.io:6379`) for persistent distributed caching across edge serverless instances.

#### 7. Project 05: Multimodal Document Intelligence API (FastAPI)
* **Import Repository:** `portfolio-ecosystem`
* **Project Name:** `multimodal-doc-intelligence-api`
* **Framework Preset:** `FastAPI`
* **Root Directory:** `projects/05-multimodal-document-intelligence/backend`
* **Swagger Docs:** `https://multimodal-doc-intelligence-api.vercel.app/docs`

#### 8. Project 06: Clinical NLP Patient Sentiment & Triage API (FastAPI)
* **Import Repository:** `portfolio-ecosystem`
* **Project Name:** `clinical-sentiment-triage-api`
* **Framework Preset:** `FastAPI`
* **Root Directory:** `projects/06-clinical-nlp-patient-sentiment-triage/backend`
* **Swagger Docs:** `https://clinical-sentiment-triage-api.vercel.app/docs`

#### 9. Project 07: Autonomous AST Code Review & Master's Thesis RAG API (FastAPI)
* **Import Repository:** `portfolio-ecosystem`
* **Project Name:** `autonomous-ast-code-review-api`
* **Framework Preset:** `FastAPI`
* **Root Directory:** `projects/07-autonomous-ast-code-review-agent/backend`
* **Swagger Docs:** `https://autonomous-ast-code-review-api.vercel.app/docs`

---

## 🧪 Part 4: Automated Testing Verification (Docker-Only Protocol)

Each project includes a dedicated Pytest/Vitest test suite. You can run all test suites inside isolated Docker containers without installing host dependencies:

### Running all 8 test suites in one command:
```bash
./scripts/docker-test-all.sh
```

### Running individual test suites inside Docker:
```bash
# Project 01: Materials Intelligence Platform (FastAPI)
docker compose exec -T materials_backend pytest -v

# Project 02: ChemAgent SDS & REACH Compliance Auditor (FastAPI)
docker compose exec -T chemagent_backend pytest -v

# Project 03: High-Performance Rheology Engine (FastAPI)
docker compose exec -T rheology_backend pytest -v

# Project 04: Enterprise AI Gateway & FinOps Controller (FastAPI)
docker compose exec -T gateway_backend pytest -v

# Project 05: Multimodal Document Intelligence (FastAPI)
docker compose exec -T doc_intelligence_backend pytest -v

# Project 06: Clinical NLP Patient Sentiment & Triage (FastAPI)
docker compose exec -T clinical_triage_backend pytest -v

# Project 07: Autonomous AST Code Review Agent (FastAPI)
docker compose exec -T code_review_backend pytest -v

# Main Portfolio Website (Next.js 15 Vitest Suite)
docker compose exec -T portfolio_website npm run test
```

---

## 🎯 Part 5: Interview Demonstration Guide

When showcasing your portfolio to hiring managers, executive recruiters, and CTOs:

1. **Open the Live Portfolio Website (`http://localhost:3000` or production domain):**
   - Demonstrate the interactive sandbox tabs spanning materials exploration, SDS compliance auditing, rheology constitutive analysis, AI Gateway token budgeting, document intelligence, clinical sentiment triage, and Master's thesis multi-modal RAG.
2. **Master's Thesis Multi-Modal RAG & AST Code Reviewer:**
   - Demonstrate the **General Conversational AI** capability and **PDF Vector Ingestion** into FAISS.
   - Highlight the **Reset / Clear History** button to clean conversational state seamlessly.
   - Run live Python AST code audits across syntax errors, CWE-95 `eval` vulnerabilities, CWE-89 SQLi injection, and mutable defaults with 1-click unified git diff patching.
3. **Demonstrate Real-Time Microservice Interconnect:**
   - The portfolio website automatically probes all 7 microservice endpoints (`/health`) and switches dynamically from in-browser fallback engines to live microservice calls with sub-millisecond telemetry.
4. **Open Interactive Swagger Documentation:**
   - Walk through the OpenAPI/Swagger contracts at `/docs` (ports 8000–8006), highlighting clean Pydantic v2 schemas, strict type contracts, deterministic error handling, and LangGraph multi-agent governance.
