"""
Unit and integration tests for Autonomous AST Code Review Agent backend.
"""

from fastapi.testclient import TestClient
from app.main import app
from app.services.ast_scanner import ASTScanner
from app.services.patch_generator import PatchGenerator
from app.services.rag_knowledge_base import RAGKnowledgeBase

client = TestClient(app)


def test_health():
    resp = client.get("/health")
    assert resp.status_code == 200
    assert resp.json()["status"] == "healthy"
    assert resp.json()["service"] == "autonomous-ast-code-review-agent"


def test_ast_syntax_error_detection():
    # Broken code with missing colon and unindent
    broken_code = """
def check_number(num)
    if num % 2 == 0:
        print("even")
    else:
        print("odd")
"""
    valid, metrics, issues = ASTScanner.scan_code(broken_code, "test.py")
    assert valid is False
    assert metrics.syntax_valid is False
    assert any(i.rule_code == "E999" for i in issues)


def test_security_cwe_detection():
    risky_code = """
def process_user_input(raw_str, query):
    api_key = "sk-proj-992384729182374982734"
    result = eval(raw_str)
    sql = f"SELECT * FROM users WHERE email = '{query}'"
    cursor.execute(sql)
    return result
"""
    valid, metrics, issues = ASTScanner.scan_code(risky_code, "risky.py")
    assert valid is True
    cwe_rules = [i.cwe_id for i in issues if i.cwe_id]
    assert "CWE-95" in cwe_rules
    assert "CWE-798" in cwe_rules
    assert "CWE-89" in cwe_rules


def test_patch_generator_unified_diff():
    broken_code = """def add_item(item, items=[]):
    items.append(item)
    return items

main
"""
    patch = PatchGenerator.generate_patch(broken_code, "sample.py")
    assert "--- a/sample.py" in patch.unified_diff
    assert "+++ b/sample.py" in patch.unified_diff
    assert "if __name__ == '__main__':" in patch.corrected_code
    assert "items=None" in patch.corrected_code


def test_api_review_and_rag_endpoints():
    review_resp = client.post(
        "/api/v1/review/analyze",
        json={"filename": "demo.py", "language": "python", "code": "print('hello world')"},
    )
    assert review_resp.status_code == 200
    data = review_resp.json()
    assert data["syntax_valid"] is True
    assert data["overall_quality_score"] == 100

    # Test RAG semantic search
    rag_resp = client.post(
        "/api/v1/rag/search",
        json={"query": "SQL injection parameterization", "top_k": 2},
    )
    assert rag_resp.status_code == 200
    rag_data = rag_resp.json()
    assert len(rag_data["results"]) >= 1
    assert rag_data["results"][0]["rule_code"] == "CWE-89"
