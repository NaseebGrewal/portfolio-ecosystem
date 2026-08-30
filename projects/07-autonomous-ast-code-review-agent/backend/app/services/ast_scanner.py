"""
AST (Abstract Syntax Tree) & Static Security Code Scanner.
Parses Python source trees, checks Ruff/PEP-8 rules, detects CWE vulnerabilities,
and calculates complexity metrics.
"""

import ast
import re
import uuid
from typing import List, Tuple
from app.models import CodeIssue, CodeMetrics, IssueSeverity


class ASTScanner:
    @classmethod
    def scan_code(cls, code: str, filename: str = "script.py") -> Tuple[bool, CodeMetrics, List[CodeIssue]]:
        issues: List[CodeIssue] = []
        loc = len([line for line in code.splitlines() if line.strip()])
        ast_nodes = 0
        complexity = 1
        syntax_valid = True

        # Check 1: Python AST Parsing (detects E999 Syntax Errors, unindent, missing colons)
        try:
            tree = ast.parse(code, filename=filename)
            syntax_valid = True
            
            # Count AST nodes and cyclomatic complexity
            for node in ast.walk(tree):
                ast_nodes += 1
                if isinstance(node, (ast.If, ast.For, ast.While, ast.ExceptHandler, ast.With, ast.Assert)):
                    complexity += 1
                elif isinstance(node, ast.BoolOp):
                    complexity += len(node.values) - 1

            # Traverse AST nodes for anti-patterns
            cls._inspect_ast_nodes(tree, issues)

        except SyntaxError as e:
            syntax_valid = False
            issues.append(
                CodeIssue(
                    issue_id=f"ISSUE-{uuid.uuid4().hex[:6].upper()}",
                    rule_code="E999",
                    severity=IssueSeverity.CRITICAL,
                    line_number=e.lineno or 1,
                    column_number=e.offset or 1,
                    message=f"SyntaxError: {e.msg}",
                    suggestion="Verify syntax, check for missing colons, parenthesis matching, or indentation mismatch.",
                )
            )

        # Check 2: Pattern-based security & common bug scanning (eval, SQLi, secrets, undefined references)
        cls._scan_patterns(code, issues)

        # Maintainability index calculation (approximated Halstead / Cyclomatic)
        raw_mi = max(0.0, 100.0 - (complexity * 3.5) - (len(issues) * 7.0) + (min(loc, 50) * 0.2))
        maintainability_index = round(min(100.0, raw_mi), 1)

        metrics = CodeMetrics(
            lines_of_code=loc,
            cyclomatic_complexity=complexity,
            maintainability_index=maintainability_index,
            syntax_valid=syntax_valid,
            ast_nodes_count=ast_nodes,
        )

        return syntax_valid, metrics, issues

    @classmethod
    def _inspect_ast_nodes(cls, tree: ast.AST, issues: List[CodeIssue]):
        """Traverses AST nodes to detect mutable defaults, bare excepts, eval usage."""
        for node in ast.walk(tree):
            # Anti-pattern: Mutable default argument in function def
            if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef)):
                for default in node.args.defaults:
                    if isinstance(default, (ast.List, ast.Dict, ast.Set)):
                        issues.append(
                            CodeIssue(
                                issue_id=f"ISSUE-{uuid.uuid4().hex[:6].upper()}",
                                rule_code="B006",
                                severity=IssueSeverity.HIGH,
                                line_number=node.lineno,
                                column_number=node.col_offset,
                                message=f"Mutable default argument `{type(default).__name__}` detected in `{node.name}`.",
                                suggestion="Use `None` as default argument and instantiate inside the function body.",
                            )
                        )

            # Anti-pattern: Bare except clause
            if isinstance(node, ast.ExceptHandler):
                if node.type is None:
                    issues.append(
                        CodeIssue(
                            issue_id=f"ISSUE-{uuid.uuid4().hex[:6].upper()}",
                            rule_code="E722",
                            severity=IssueSeverity.MEDIUM,
                            line_number=node.lineno,
                            column_number=node.col_offset,
                            message="Bare `except:` clause catches BaseException and masks system exit signals.",
                            suggestion="Catch specific exceptions like `except Exception:` or `except (ValueError, KeyError):`.",
                        )
                    )

            # Security: Call to eval or exec
            if isinstance(node, ast.Call):
                if isinstance(node.func, ast.Name) and node.func.id in ("eval", "exec"):
                    issues.append(
                        CodeIssue(
                            issue_id=f"ISSUE-{uuid.uuid4().hex[:6].upper()}",
                            rule_code="CWE-95",
                            severity=IssueSeverity.CRITICAL,
                            line_number=node.lineno,
                            column_number=node.col_offset,
                            message=f"Dangerous dynamic execution via `{node.func.id}()` detected.",
                            suggestion="Refactor using `ast.literal_eval` or safe domain-specific parsers.",
                            cwe_id="CWE-95",
                        )
                    )

    @classmethod
    def _scan_patterns(cls, code: str, issues: List[CodeIssue]):
        """Scans code text with regex patterns for security risks and style bugs."""
        lines = code.splitlines()
        for idx, line in enumerate(lines, start=1):
            # Check hardcoded secrets / API keys
            if re.search(r'(?i)(api[_-]?key|secret|password|bearer)\s*=\s*["\'][A-Za-z0-9_\-]{16,}["\']', line):
                issues.append(
                    CodeIssue(
                        issue_id=f"ISSUE-{uuid.uuid4().hex[:6].upper()}",
                        rule_code="CWE-798",
                        severity=IssueSeverity.CRITICAL,
                        line_number=idx,
                        column_number=1,
                        message="Hardcoded API secret or credential detected in source code.",
                        suggestion="Extract secret to environment variables via `os.getenv()` or secret vault.",
                        cwe_id="CWE-798",
                    )
                )

            # Check SQL Injection string formatting
            if re.search(r'(?i)(execute\s*\(\s*f?["\'].*?(SELECT|INSERT|UPDATE|DELETE)|f["\'].*?(SELECT|INSERT|UPDATE|DELETE|FROM|WHERE).*?\{)', line):
                issues.append(
                    CodeIssue(
                        issue_id=f"ISSUE-{uuid.uuid4().hex[:6].upper()}",
                        rule_code="CWE-89",
                        severity=IssueSeverity.CRITICAL,
                        line_number=idx,
                        column_number=1,
                        message="Potential SQL Injection via unparameterized string formatting.",
                        suggestion="Use parameterized query arguments (e.g. `cursor.execute(sql, (param,))`).",
                        cwe_id="CWE-89",
                    )
                )

            # Check missing main invocation pattern (common student/thesis bug)
            if line.strip() == "main":
                issues.append(
                    CodeIssue(
                        issue_id=f"ISSUE-{uuid.uuid4().hex[:6].upper()}",
                        rule_code="F821",
                        severity=IssueSeverity.HIGH,
                        line_number=idx,
                        column_number=1,
                        message="Expression `main` references function object without calling it `main()`.",
                        suggestion="Add parentheses: `if __name__ == '__main__': main()`.",
                    )
                )
