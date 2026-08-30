"""
Data models and schemas for AST Code Review Agent & RAG Assistant.
"""

from typing import List, Optional, Dict, Any
from enum import Enum
from pydantic import BaseModel, Field


class IssueSeverity(str, Enum):
    CRITICAL = "CRITICAL"   # Security flaw, syntax failure, or crash
    HIGH = "HIGH"           # Logic bug or severe performance anti-pattern
    MEDIUM = "MEDIUM"       # Maintainability, type mismatch, or style violation
    LOW = "LOW"             # Formatting / docstring suggestion


class CodeIssue(BaseModel):
    issue_id: str
    rule_code: str          # e.g., "E999", "F821", "CWE-89", "PERF-101"
    severity: IssueSeverity
    line_number: int
    column_number: int
    message: str
    suggestion: str
    cwe_id: Optional[str] = None


class CodeMetrics(BaseModel):
    lines_of_code: int
    cyclomatic_complexity: int
    maintainability_index: float
    syntax_valid: bool
    ast_nodes_count: int


class CodeReviewRequest(BaseModel):
    filename: str = "script.py"
    language: str = "python"
    code: str
    strictness_level: str = "enterprise"  # "permissive", "standard", "enterprise"


class CodeReviewResponse(BaseModel):
    filename: str
    language: str
    syntax_valid: bool
    metrics: CodeMetrics
    overall_quality_score: int  # 0 to 100
    security_score: int         # 0 to 100
    maintainability_score: int  # 0 to 100
    issues: List[CodeIssue]
    executive_summary: str


class PatchRequest(BaseModel):
    filename: str = "script.py"
    code: str


class PatchResponse(BaseModel):
    filename: str
    original_code: str
    corrected_code: str
    unified_diff: str
    fixes_applied: List[str]
    improvement_metrics: Dict[str, Any]


class RAGKnowledgeEntry(BaseModel):
    entry_id: str
    title: str
    category: str
    rule_code: str
    description: str
    bad_example: str
    good_example: str
    cwe_reference: Optional[str] = None


class RAGQueryRequest(BaseModel):
    query: str
    top_k: int = 3


class RAGQueryResponse(BaseModel):
    query: str
    results: List[RAGKnowledgeEntry]
