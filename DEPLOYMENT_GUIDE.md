# Enterprise Production Deployment & Live Showcase Guide

This guide provides the complete blueprint for deploying your **Executive Portfolio Website** and all **4 Flagship Projects** to production with **Zero Cloud Costs ($0.00 / month)**, enterprise SSL/TLS encryption, and continuous integration/continuous deployment (CI/CD) under your personal brand.

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
    end

    subgraph Local Development & Testing Tier (Docker Compose)
        LocalDev[docker compose up --build] --> Cont1[Portfolio Web :3000]
        LocalDev --> Cont2[Materials Frontend :3001]
        LocalDev --> Cont3[Materials API :8000]
        LocalDev --> Cont4[ChemAgent API :8001]
        LocalDev --> Cont5[Rheology API :8002]
        LocalDev --> Cont6[AI Gateway :8003]
        LocalDev --> Cont7[Shared Redis :6379]
    end
```

---

## ⚡ Part 1: Local Full-Stack Orchestration (Docker Compose)

The monorepo contains a unified [docker-compose.yml](docker-compose.yml) in the workspace root that spins up all 5 microservices simultaneously with pre-seeded datasets.

### Running all services locally:
```bash
# 1. Navigate to the repository root
cd portfolio-ecosystem

# 2. Build and launch all 5 containers
docker compose up --build
```

### Local Endpoint Map:
| Service | Local URL | Swagger / Docs | Description |
| :--- | :--- | :--- | :--- |
| **Portfolio Website** | `http://localhost:3000` | N/A | Executive portfolio with live interactive sandbox |
| **Project 01 (Frontend)** | `http://localhost:3001` | N/A | Next.js 15 Materials Explorer dashboard |
| **Project 01 (Backend)** | `http://localhost:8000` | `http://localhost:8000/docs` | FastAPI Materials Intelligence & Analytics API |
| **Project 02 (ChemAgent)** | `http://localhost:8001` | `http://localhost:8001/docs` | Autonomous Multi-Agent SDS & REACH Auditor |
| **Project 03 (Rheology)** | `http://localhost:8002` | `http://localhost:8002/docs` | High-speed tensile mechanics & ISO 527 invariant solver |
| **Project 04 (AI Gateway)** | `http://localhost:8003` | `http://localhost:8003/docs` | LLM FinOps proxy with Redis semantic prompt caching |
| **Shared Redis** | `localhost:6379` | N/A | High-speed cache for Gateway and microservices |

---

## 🚀 Part 2: Pushing the Monorepo to GitHub

```bash
# 1. Initialize git in the root folder
git init
git add .
git commit -m "feat: complete portfolio ecosystem monorepo with live interactive suites"
git branch -M main

# 2. Connect to your GitHub repository
git remote add origin https://github.com/<your-github-username>/portfolio-ecosystem.git
git push -u origin main
```

---

## ☁️ Part 3: Deploying All 5 Applications to Vercel (Native FastAPI & Next.js)

Vercel natively supports **FastAPI** as a backend preset alongside **Next.js**. You can deploy all 5 services from the single `portfolio-ecosystem` GitHub repository.

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
  * Contact variables: `NEXT_PUBLIC_CANDIDATE_NAME`, `NEXT_PUBLIC_CANDIDATE_EMAIL`, etc.

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

---

## 🧪 Part 4: Automated Testing Verification

Each project includes a dedicated Pytest/Vitest suite. You can run tests inside Docker containers without installing dependencies locally:

```bash
# Run Project 01 backend tests
docker compose run --rm materials_backend pytest tests/ -v

# Run Project 02 compliance agent tests
docker compose run --rm chemagent_backend pytest tests/ -v

# Run Project 03 rheology engine tests
docker compose run --rm rheology_backend pytest tests/ -v

# Run Project 04 AI gateway & FinOps tests
docker compose run --rm gateway_backend pytest tests/ -v

# Run Portfolio Website frontend tests
docker compose run --rm portfolio_website npm test
```

---

## 🎯 Part 5: Interview Demonstration Guide

When showcasing your portfolio to hiring managers, executive recruiters, and CTOs:

1. **Open the Live Portfolio Website:** Demonstrate the interactive sandbox tabs (Materials Explorer, ChemAgent SDS verification, Rheology curve analysis, and AI Gateway FinOps token budgeting).
2. **Demonstrate Real-Time Microservice Interconnect:** The portfolio detects active FastAPI microservices and switches dynamically from in-browser engines to live microservice API calls with sub-millisecond response latency.
3. **Open Interactive Swagger Documentation:** Walk through the API contract at `/docs` for each flagship project, highlighting clean Pydantic schemas, ISO standardization compliance, and LangGraph multi-agent governance.
