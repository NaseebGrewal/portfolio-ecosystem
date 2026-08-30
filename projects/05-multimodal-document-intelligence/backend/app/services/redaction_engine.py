"""
Autonomous PII/PHI Redaction Engine.
Detects sensitive healthcare, financial, and personal identifiable information.
"""

import re
from typing import List, Dict, Any, Tuple
from app.models import RedactionRule, RedactionResponse


class RedactionEngine:
    REGEX_PATTERNS = {
        "email": r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b",
        "phone": r"\b(\+?[0-9]{1,3}[-.\s]?)?(\(?\d{2,4}\)?[-.\s]?)?\d{3,4}[-.\s]?\d{3,4}\b",
        "ssn": r"\b\d{3}-\d{2}-\d{4}\b",
        "credit_card": r"\b(?:\d{4}[-\s]?){3}\d{4}\b",
        "date_of_birth": r"\b(0[1-9]|1[0-2])[\/\-\.](0[1-9]|[12]\d|3[01])[\/\-\.](19|20)\d{2}\b",
    }

    @classmethod
    def redact_text(cls, text: str, rules: List[RedactionRule]) -> RedactionResponse:
        """
        Scans text for sensitive patterns and applies structured redaction masks.
        """
        redacted_text = text
        entities_found: List[Dict[str, Any]] = []
        total_redactions = 0

        for rule in rules:
            pattern = ""
            if rule.pattern_type == "custom" and rule.custom_regex:
                pattern = rule.custom_regex
            elif rule.pattern_type in cls.REGEX_PATTERNS:
                pattern = cls.REGEX_PATTERNS[rule.pattern_type]
            else:
                continue

            try:
                matches = list(re.finditer(pattern, redacted_text))
                for m in reversed(matches):
                    val = m.group(0)
                    start, end = m.start(), m.end()
                    entities_found.append({
                        "entity_type": rule.pattern_type,
                        "raw_value": val[:3] + "***" + val[-2:] if len(val) > 5 else "***",
                        "start_char": start,
                        "end_char": end,
                    })
                    redacted_text = redacted_text[:start] + rule.mask_character + redacted_text[end:]
                    total_redactions += 1
            except Exception:
                continue

        return RedactionResponse(
            original_length=len(text),
            redacted_length=len(redacted_text),
            redactions_count=total_redactions,
            redacted_text=redacted_text,
            entities_found=entities_found,
        )
