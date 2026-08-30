"""
Autonomous AST Code Review Agent & RAG Assistant FastAPI Backend (Project 07)
Tree-Sitter / AST static analysis, Ruff rule scanning, CWE security auditing, and automated unified diff patching.
"""

from typing import List, Dict, Any
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware

from app.models import (
    CodeReviewRequest,
    CodeReviewResponse,
    PatchRequest,
    PatchResponse,
    RAGKnowledgeEntry,
    RAGQueryRequest,
    RAGQueryResponse,
)
from app.services.ast_scanner import ASTScanner
from app.services.patch_generator import PatchGenerator
from app.services.rag_knowledge_base import RAGKnowledgeBase

app = FastAPI(
    title="Autonomous AST Code Review Agent API",
    description="AST Static Analysis, CWE Security Auditing, Automated Patch Refactoring & RAG Review Assistant",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health", tags=["Health"])
@app.get("/api/v1/health", tags=["Health"])
def health_check():
    return {
        "status": "healthy",
        "service": "autonomous-ast-code-review-agent",
        "version": "1.0.0",
        "rag_rules_indexed": len(RAGKnowledgeBase.ENTRIES),
    }


@app.post("/api/v1/review/analyze", response_model=CodeReviewResponse, tags=["Code Review"])
def review_code_snippet(request: CodeReviewRequest):
    """
    Parses code through Python AST and security pattern analyzers,
    computing quality, security, and maintainability scores.
    """
    if not request.code.strip():
        raise HTTPException(status_code=400, detail="Code body cannot be empty.")

    syntax_valid, metrics, issues = ASTScanner.scan_code(request.code, filename=request.filename)

    # Calculate overall quality score (0-100)
    critical_issues = sum(1 for i in issues if i.severity.value == "CRITICAL")
    high_issues = sum(1 for i in issues if i.severity.value == "HIGH")
    medium_issues = sum(1 for i in issues if i.severity.value == "MEDIUM")

    security_flaws = sum(1 for i in issues if i.cwe_id is not None)
    security_score = max(0, 100 - (security_flaws * 35))

    quality_score = max(0, int(100 - (critical_issues * 30) - (high_issues * 15) - (medium_issues * 5)))
    maintainability_score = int(metrics.maintainability_index)

    if not syntax_valid:
        summary = f"Syntax Error detected in {request.filename}. AST parsing failed at line {issues[0].line_number}."
    elif len(issues) == 0:
        summary = f"Clean code! {request.filename} passed all AST, Ruff, and security CWE audit rules with 100% compliance."
    else:
        summary = f"Found {len(issues)} code issues ({critical_issues} critical, {high_issues} high, {security_flaws} security risks). Quality score: {quality_score}/100."

    return CodeReviewResponse(
        filename=request.filename,
        language=request.language,
        syntax_valid=syntax_valid,
        metrics=metrics,
        overall_quality_score=quality_score,
        security_score=security_score,
        maintainability_score=maintainability_score,
        issues=issues,
        executive_summary=summary,
    )


@app.post("/api/v1/review/patch", response_model=PatchResponse, tags=["Code Review"])
def generate_code_patch(request: PatchRequest):
    """
    Generates deterministic AST-guided refactoring fixes and outputs a unified git diff.
    """
    if not request.code.strip():
        raise HTTPException(status_code=400, detail="Code cannot be empty.")
    return PatchGenerator.generate_patch(request.code, filename=request.filename)


@app.get("/api/v1/review/rules", response_model=List[RAGKnowledgeEntry], tags=["Knowledge Base"])
def list_rules():
    """
    Returns all standard static analysis and CWE security rules indexed in the knowledge base.
    """
    return RAGKnowledgeBase.ENTRIES


@app.post("/api/v1/rag/search", response_model=RAGQueryResponse, tags=["RAG Assistant"])
def search_rag_knowledge(req: RAGQueryRequest):
    """
    Semantic search across indexed code quality rules and refactoring guidelines.
    """
    results = RAGKnowledgeBase.search(req.query, top_k=req.top_k)
    return RAGQueryResponse(query=req.query, results=results)
