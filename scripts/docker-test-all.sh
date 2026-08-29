#!/usr/bin/env bash
# ==============================================================================
# Portfolio Ecosystem - Unified Docker Test Runner
# Runs all 5 test suites exclusively inside isolated Docker containers.
# ==============================================================================

set -euo pipefail

echo "======================================================================"
echo "  PORTFOLIO ECOSYSTEM: DOCKER CONTAINER TEST SUITE"
echo "======================================================================"

# Step 1: Ensure services are up and fresh
echo "--> Ensuring all Docker services are built and running..."
docker compose up -d --build

echo ""
echo "--> 1/5 Running Materials Intelligence Backend Tests (FastAPI)..."
docker compose exec -T materials_backend pytest -v

echo ""
echo "--> 2/5 Running ChemAgent SDS Compliance Tests (FastAPI)..."
docker compose exec -T chemagent_backend pytest -v

echo ""
echo "--> 3/5 Running Rheology Engine Tests (FastAPI + Mechanics)..."
docker compose exec -T rheology_backend pytest -v

echo ""
echo "--> 4/5 Running AI Gateway & FinOps Tests (FastAPI + Redis)..."
docker compose exec -T gateway_backend pytest -v

echo ""
echo "--> 5/5 Running Executive Portfolio Website Tests (Vitest)..."
docker compose exec -T portfolio_website npm run test

echo ""
echo "======================================================================"
echo "  ALL DOCKER CONTAINER TEST SUITES PASSED SUCCESSFULLY (100% GREEN)"
echo "======================================================================"
