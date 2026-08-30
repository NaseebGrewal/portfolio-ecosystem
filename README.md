# Executive AI & Full-Stack Digitalization Ecosystem

> Comprehensive career suite, enterprise flagship portfolio projects, and interactive portfolio website engineered for **Senior AI Adoption Consultant**, **R&D AI Product Owner**, and **Senior Full-Stack AI Solutions Architect** roles (€100k–€150k bracket).

---

## 🗂️ Ecosystem Structure

```
portfolio-ecosystem/
├── README.md                                  # Complete ecosystem overview & quickstart
├── DEPLOYMENT_GUIDE.md                        # Zero-cost production deployment with custom domain
│
├── cv_cover_letter/
│   ├── README.md
│   ├── CV_EXECUTIVE_SENIOR_AI_ARCHITECT.md     # Fully ATS-compliant executive CV
│   ├── COVER_LETTER_SENIOR_AI_CONSULTANT.md   # Targeted Cover Letter (AI Adoption)
│   ├── COVER_LETTER_RD_AI_PRODUCT_OWNER.md    # Targeted Cover Letter (R&D AI Product Owner)
│   └── JOB_INTERVIEW_PREP_MASTER_QA.md        # 25+ Master Q&A (Tech, STAR, FinOps, Salary)
│
├── portfolio-website/                          # Next.js 15 + Tailwind + TypeScript
│   ├── README.md                              # Vercel deployment & features
│   ├── PLAN.md                                # Copilot prompts for expansion
│   ├── .env.example                           # Template environment variables for URLs & certificates
│   ├── .env.local                             # Local environment variables
│   ├── Dockerfile & docker-compose.yml        # Local standalone testing
│   ├── src/                                   # Hero, Live Sandbox, Architecture Viewer
│   └── tests/                                 # Vitest component test suites
│
└── projects/
    ├── 01-materials-intelligence-platform/    # FastAPI + Next.js + MongoDB + Redis + ECS
    ├── 02-chemagent-sds-compliance/           # LangGraph Multi-Agent ECHA/REACH Auditor
    ├── 03-rust-wasm-rheology-engine/          # Rust + WASM + Python Tensile Mechanics Engine
    ├── 04-enterprise-ai-gateway-finops/       # FastAPI + Redis Semantic Cache + FinOps Quotas
    ├── 05-multimodal-document-intelligence/   # FastAPI + OCR + Vision Transformer + Semantic Mesh
    ├── 06-clinical-nlp-patient-sentiment-triage/# BioBERT + PHI Redaction + Emergency Triage
    └── 07-autonomous-ast-code-review-agent/   # Python AST + CWE Security Gate + FAISS RAG
```

---

## 🚀 Docker Compose Execution Reference Guide

You can run any service either from its own directory (without `-f`) or from anywhere / workspace root (with `-f`).

### 1. Executive Portfolio Website (Next.js 15 + Tailwind + Demos)
* **Without `-f` (from folder):**
  ```bash
  cd portfolio-ecosystem/portfolio-website
  docker compose up --build
  ```
* **With `-f` (from workspace root):**
  ```bash
  docker compose -f portfolio-ecosystem/portfolio-website/docker-compose.yml up --build
  ```
* **Web UI URL:** `http://localhost:3000`

---

### 2. Project 01: Materials Intelligence Platform (FastAPI + Next.js + MongoDB + Redis)
* **Without `-f` (from folder):**
  ```bash
  cd portfolio-ecosystem/projects/01-materials-intelligence-platform
  docker compose up --build
  ```
* **With `-f` (from workspace root):**
  ```bash
  docker compose -f portfolio-ecosystem/projects/01-materials-intelligence-platform/docker-compose.yml up --build
  ```
* **Endpoints:** Frontend on `http://localhost:3001`, Swagger API on `http://localhost:8000/docs`, Health on `http://localhost:8000/health`

---

### 3. Project 02: ChemAgent-Gov (LangGraph Multi-Agent REACH Auditor)
* **Without `-f` (from folder):**
  ```bash
  cd portfolio-ecosystem/projects/02-chemagent-sds-compliance
  docker compose up --build
  ```
* **With `-f` (from workspace root):**
  ```bash
  docker compose -f portfolio-ecosystem/projects/02-chemagent-sds-compliance/docker-compose.yml up --build
  ```
* **Endpoints:** Swagger API on `http://localhost:8001/docs`, Health on `http://localhost:8001/health`

---

### 4. Project 03: Ultra-Fast Lab Rheology Engine (Rust-WASM + FastAPI)
* **Without `-f` (from folder):**
  ```bash
  cd portfolio-ecosystem/projects/03-rust-wasm-rheology-engine
  docker compose up --build
  ```
* **With `-f` (from workspace root):**
  ```bash
  docker compose -f portfolio-ecosystem/projects/03-rust-wasm-rheology-engine/docker-compose.yml up --build
  ```
* **Endpoints:** Swagger API on `http://localhost:8002/docs`, Health on `http://localhost:8002/health`

---

### 5. Project 04: Enterprise AI Gateway & FinOps (FastAPI + Redis Cache)
* **Without `-f` (from folder):**
  ```bash
  cd portfolio-ecosystem/projects/04-enterprise-ai-gateway-finops
  docker compose up --build
  ```
* **With `-f` (from workspace root):**
  ```bash
  docker compose -f portfolio-ecosystem/projects/04-enterprise-ai-gateway-finops/docker-compose.yml up --build
  ```
* **Endpoints:** Swagger API on `http://localhost:8003/docs`, FinOps Report on `http://localhost:8003/api/v1/finops/report`

---

### 🛠️ Common Useful Docker Compose Flags

| Command / Flag | Purpose | Example |
| :--- | :--- | :--- |
| `-d` | Run containers in background (detached) | `docker compose -f <path> up -d --build` |
| `--build` | Force rebuild of image before starting | `docker compose -f <path> up --build` |
| `logs -f` | Stream live container stdout/stderr logs | `docker compose -f <path> logs -f` |
| `down` | Stop and remove active containers | `docker compose -f <path> down` |
| `down -v` | Stop containers and wipe database volumes | `docker compose -f <path> down -v` |
