# Autonomous AST Code Review & RAG Assistant Agent

**Microservice ID**: `projects/07-autonomous-ast-code-review-agent`  
**Tech Stack**: FastAPI, Python 3.12, Abstract Syntax Tree (AST), CWE Security Scanner, RAG Knowledge Index, Docker  
**Port**: `8006`  
**Original GitHub Repository**: `https://github.com/NaseebGrewal/MastersThesisProject`

---

## Architectural Overview
An autonomous multi-agent code analysis and automated patch generation engine resulting from Master's Thesis research on generative AI code quality systems:
1. **AST Structural Tree Parsing**: Deep structural validation capable of pinpointing syntax parse failures, AST node depth, and cyclomatic complexity.
2. **CWE / OWASP Security Auditor**: Detects dangerous dynamic execution (`eval`/`exec`), SQL Injection vulnerabilities (CWE-89), and hardcoded credentials (CWE-798).
3. **Automated Unified Diff Patch Engine**: Deterministically refactors broken or anti-pattern code, fixing mutable defaults, bare exceptions, missing colons, and entrypoint calls while generating standard git unified diffs (`a/...` -> `b/...`).
4. **Vectorized RAG Knowledge Base**: High-speed retrieval over clean coding standards, PEP-8 guidelines, and security remediation patterns.

---

## API Contract Endpoints

- `GET /health`: Health status and indexed knowledge rules count.
- `POST /api/v1/review/analyze`: Comprehensive multi-dimensional code scan.
- `POST /api/v1/review/patch`: Automated patch and unified diff generator.
- `GET /api/v1/review/rules`: List all indexed security and static analysis rules.
- `POST /api/v1/rag/search`: Semantic query over refactoring best practices.

---

## Verification & Testing
```bash
docker compose exec -T code_review_backend pytest -v
```
