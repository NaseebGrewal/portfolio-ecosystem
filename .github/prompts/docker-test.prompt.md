---
description: "Run all test suites strictly inside Docker containers across all microservices and the portfolio website"
name: "docker-test"
argument-hint: "Optional: specify specific service or run all"
agent: "Portfolio Ecosystem Architect"
tools: [execute, read, todo]
---
Execute the mandatory Docker-only testing suite:
1. Ensure containers are up via `docker compose up -d`.
2. Run pytest across all backend microservices:
   - `docker compose exec -T materials_backend pytest`
   - `docker compose exec -T chemagent_backend pytest`
   - `docker compose exec -T rheology_backend pytest`
   - `docker compose exec -T gateway_backend pytest`
3. Run Vitest on the portfolio website:
   - `docker compose exec -T portfolio_website npm run test`
4. Report pass/fail status and execution times for all test suites.
