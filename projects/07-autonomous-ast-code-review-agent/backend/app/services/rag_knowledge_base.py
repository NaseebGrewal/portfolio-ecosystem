"""
RAG Semantic Knowledge Base for Code Quality, Security CWE, and Refactoring Best Practices.
"""

from typing import List
from app.models import RAGKnowledgeEntry


class RAGKnowledgeBase:
    ENTRIES: List[RAGKnowledgeEntry] = [
        RAGKnowledgeEntry(
            entry_id="RAG-RULE-001",
            title="Safe SQL Parameterization vs String Interpolation",
            category="Security & CWE",
            rule_code="CWE-89",
            description="Never format raw user inputs directly into SQL query strings with f-strings or concatenation.",
            bad_example="cursor.execute(f'SELECT * FROM users WHERE id = {user_id}')",
            good_example="cursor.execute('SELECT * FROM users WHERE id = %s', (user_id,))",
            cwe_reference="CWE-89: SQL Injection",
        ),
        RAGKnowledgeEntry(
            entry_id="RAG-RULE-002",
            title="Avoid Mutable Default Arguments in Python Functions",
            category="Maintainability & Bugs",
            rule_code="B006",
            description="Default arguments in Python are evaluated once at module import. Mutable lists or dicts retain mutations across all invocations.",
            bad_example="def append_item(item, list_target=[]):\n    list_target.append(item)\n    return list_target",
            good_example="def append_item(item, list_target=None):\n    if list_target is None:\n        list_target = []\n    list_target.append(item)\n    return list_target",
            cwe_reference=None,
        ),
        RAGKnowledgeEntry(
            entry_id="RAG-RULE-003",
            title="Safe Parsing of Unstrusted JSON vs eval()",
            category="Security & CWE",
            rule_code="CWE-95",
            description="Calling eval() on user input allows arbitrary code execution and Remote Code Execution (RCE).",
            bad_example="data = eval(raw_json_string)",
            good_example="import json\ndata = json.loads(raw_json_string)",
            cwe_reference="CWE-95: Improper Neutralization of Directives in Dynamically Evaluated Code",
        ),
        RAGKnowledgeEntry(
            entry_id="RAG-RULE-004",
            title="Specific Exception Handling vs Bare Except Clauses",
            category="Robustness",
            rule_code="E722",
            description="Bare `except:` blocks catch KeyboardInterrupt and SystemExit, preventing clean daemon termination and hiding critical bugs.",
            bad_example="try:\n    compute()\nexcept:\n    pass",
            good_example="try:\n    compute()\nexcept (ValueError, KeyError) as err:\n    logger.warning('Failed compute: %s', err)",
            cwe_reference=None,
        ),
        RAGKnowledgeEntry(
            entry_id="RAG-RULE-005",
            title="Environment Variable Secret Ingestion vs Hardcoded Credentials",
            category="Security & CWE",
            rule_code="CWE-798",
            description="API keys, database passwords, and private tokens must never be committed to source repositories.",
            bad_example="OPENAI_API_KEY = 'sk-proj-992384729182374982734'",
            good_example="import os\nOPENAI_API_KEY = os.environ.get('OPENAI_API_KEY')",
            cwe_reference="CWE-798: Use of Hard-coded Credentials",
        ),
    ]

    @classmethod
    def search(cls, query: str, top_k: int = 3) -> List[RAGKnowledgeEntry]:
        """
        Calculates lexical/semantic keyword relevance over RAG knowledge base.
        """
        q_tokens = set(query.lower().split())
        scored_entries = []

        for entry in cls.ENTRIES:
            text = f"{entry.title} {entry.description} {entry.rule_code} {entry.category}".lower()
            score = sum(1 for token in q_tokens if token in text)
            scored_entries.append((score, entry))

        scored_entries.sort(key=lambda x: x[0], reverse=True)
        return [entry for score, entry in scored_entries[:top_k]]
