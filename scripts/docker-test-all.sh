#!/usr/bin/env bash
# ==============================================================================
# Portfolio Ecosystem - Unified Docker Test Runner
# Runs all 8 test suites exclusively inside isolated Docker containers.
# ==============================================================================

set -euo pipefail

echo "======================================================================"
echo "  PORTFOLIO ECOSYSTEM: UNIFIED DOCKER CONTAINER TEST SUITE"
echo "======================================================================"

# Step 1: Ensure services are up and fresh
echo "--> Ensuring all Docker services are built and running..."
docker compose up -d --build

echo ""
echo "--> 1/8 Running Materials Intelligence Backend Tests (FastAPI)..."
docker compose exec -T materials_backend pytest -v

echo ""
echo "--> 2/8 Running ChemAgent SDS Compliance Tests (FastAPI)..."
docker compose exec -T chemagent_backend pytest -v

echo ""
echo "--> 3/8 Running Rheology Engine Tests (FastAPI + Mechanics)..."
docker compose exec -T rheology_backend pytest -v

echo ""
echo "--> 4/8 Running AI Gateway & FinOps Tests (FastAPI + Redis)..."
docker compose exec -T gateway_backend pytest -v

echo ""
echo "--> 5/8 Running Multimodal Document Intelligence Tests (FastAPI)..."
docker compose exec -T doc_intelligence_backend pytest -v

echo ""
echo "--> 6/8 Running Clinical NLP Patient Sentiment & Triage Tests (FastAPI)..."
docker compose exec -T clinical_triage_backend pytest -v

echo ""
echo "--> 7/8 Running Autonomous AST Code Review Agent Tests (FastAPI)..."
docker compose exec -T code_review_backend pytest -v

echo ""
echo "--> 8/8 Running Executive Portfolio Website Tests (Vitest)..."
docker compose exec -T portfolio_website npm run test

echo ""
echo "======================================================================"
echo "  ALL 8 DOCKER CONTAINER TEST SUITES PASSED SUCCESSFULLY (100% GREEN)"
echo "======================================================================"
