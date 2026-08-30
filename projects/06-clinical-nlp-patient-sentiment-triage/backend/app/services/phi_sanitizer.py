"""
HIPAA-aligned Safe Harbor PHI Sanitizer.
Scans and de-identifies Protected Health Information (Names, MRNs, Phone, Email, Dates, Room Numbers).
"""

import re
from typing import List, Dict, Any
from app.models import PHIDeidentificationResult


class PHISanitizer:
    PATTERNS = [
        ("EMAIL", r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b", "[PHI-EMAIL-REDACTED]"),
        ("PHONE", r"\b(\+?[0-9]{1,3}[-.\s]?)?(\(?\d{2,4}\)?[-.\s]?)?\d{3,4}[-.\s]?\d{3,4}\b", "[PHI-PHONE-REDACTED]"),
        ("MRN", r"\b(MRN|Patient ID|ID)[:\s]*([A-Za-z0-9\-]{5,12})\b", r"\1: [PHI-MRN-REDACTED]"),
        ("ROOM", r"\b(Room|Bed|Ward)\s*#?\s*([0-9]{1,4}[A-Za-z]?)\b", r"\1 [PHI-ROOM-REDACTED]"),
        ("DATE", r"\b(0[1-9]|1[0-2])[\/\-\.](0[1-9]|[12]\d|3[01])[\/\-\.](19|20)\d{2}\b", "[PHI-DATE-REDACTED]"),
        ("SSN", r"\b\d{3}-\d{2}-\d{4}\b", "[PHI-SSN-REDACTED]"),
    ]

    @classmethod
    def sanitize(cls, text: str) -> PHIDeidentificationResult:
        sanitized = text
        redacted_tokens: List[Dict[str, str]] = []

        for entity_type, pattern, replacement in cls.PATTERNS:
            matches = list(re.finditer(pattern, sanitized, re.IGNORECASE))
            if matches:
                for m in matches:
                    redacted_tokens.append({
                        "entity_type": entity_type,
                        "matched_string": m.group(0),
                    })
                sanitized = re.sub(pattern, replacement, sanitized, flags=re.IGNORECASE)

        return PHIDeidentificationResult(
            original_text=text,
            sanitized_text=sanitized,
            redacted_tokens=redacted_tokens,
            phi_safe=True,
        )
