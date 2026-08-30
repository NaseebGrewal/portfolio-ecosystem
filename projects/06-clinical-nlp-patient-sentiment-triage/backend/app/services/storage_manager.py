"""
In-memory and Redis/MongoDB-compatible persistence store for Clinical Triage tickets.
"""

from typing import List, Dict, Optional
from app.models import TriageTicket, HospitalAnalytics, Department


class StorageManager:
    def __init__(self):
        self.tickets: Dict[str, TriageTicket] = {}
        self._seed_default_data()

    def _seed_default_data(self):
        """Seeds representative hospital clinical feedback."""
        seeds = [
            TriageTicket(
                ticket_id="TRG-8821A",
                timestamp="2026-08-30 09:15:00 UTC",
                priority="CRITICAL",  # type: ignore
                department=Department.EMERGENCY,
                sla_target_hours=0.25,
                sentiment={  # type: ignore
                    "compound_score": -0.88,
                    "sentiment_label": "SEVERELY_CRITICAL",
                    "clinical_risk_detected": True,
                    "risk_factors": ["allergic reaction", "shortness of breath"]
                },
                sanitized_comments="Patient in [PHI-ROOM-REDACTED] experienced sudden shortness of breath after IV infusion. Nurse arrived after 35 minutes.",
                original_rating=1,
                dimension_scores={
                    "doctor_care": 2,
                    "nurse_promptness": 1,
                    "cleanliness": 4,
                    "medication_clarity": 1,
                    "food_quality": 3,
                },
                ai_suggested_intervention="IMMEDIATE CLINICAL ALERT: Flagged for Chief Medical Officer & Charge Nurse. Risk factors: allergic reaction. Bedside check required.",
                is_resolved=False,
            ),
            TriageTicket(
                ticket_id="TRG-4419B",
                timestamp="2026-08-30 10:20:00 UTC",
                priority="HIGH",  # type: ignore
                department=Department.CARDIOLOGY,
                sla_target_hours=1.0,
                sentiment={  # type: ignore
                    "compound_score": -0.52,
                    "sentiment_label": "NEGATIVE",
                    "clinical_risk_detected": False,
                    "risk_factors": []
                },
                sanitized_comments="Waited over 3 hours for post-op discharge papers. Medication instructions were completely unclear.",
                original_rating=2,
                dimension_scores={
                    "doctor_care": 4,
                    "nurse_promptness": 2,
                    "cleanliness": 4,
                    "medication_clarity": 2,
                    "food_quality": 3,
                },
                ai_suggested_intervention="DEPARTMENT HEAD ESCALATION: Patient Relations Lead assigned to review cardiology discharge bottleneck.",
                is_resolved=False,
            ),
            TriageTicket(
                ticket_id="TRG-1029C",
                timestamp="2026-08-30 11:00:00 UTC",
                priority="ROUTINE",  # type: ignore
                department=Department.NURSING_CARE,
                sla_target_hours=24.0,
                sentiment={  # type: ignore
                    "compound_score": 0.92,
                    "sentiment_label": "POSITIVE",
                    "clinical_risk_detected": False,
                    "risk_factors": ["compassionate", "kind", "excellent"]
                },
                sanitized_comments="The entire night nursing team in 4th floor oncology was compassionate, prompt, and truly saved my spirits.",
                original_rating=5,
                dimension_scores={
                    "doctor_care": 5,
                    "nurse_promptness": 5,
                    "cleanliness": 5,
                    "medication_clarity": 5,
                    "food_quality": 4,
                },
                ai_suggested_intervention="POSITIVE COMMENDATION: Forward patient appreciation to Departmental Nurse Manager & Staff Recognition Board.",
                is_resolved=True,
                resolution_notes="Shared in morning clinical huddle.",
            ),
        ]
        for t in seeds:
            self.tickets[t.ticket_id] = t

    def add_ticket(self, ticket: TriageTicket):
        self.tickets[ticket.ticket_id] = ticket

    def get_all(self) -> List[TriageTicket]:
        return list(self.tickets.values())

    def get_ticket(self, ticket_id: str) -> Optional[TriageTicket]:
        return self.tickets.get(ticket_id)

    def resolve_ticket(self, ticket_id: str, notes: str) -> Optional[TriageTicket]:
        if ticket_id in self.tickets:
            self.tickets[ticket_id].is_resolved = True
            self.tickets[ticket_id].resolution_notes = notes
            return self.tickets[ticket_id]
        return None

    def calculate_analytics(self) -> HospitalAnalytics:
        all_t = list(self.tickets.values())
        if not all_t:
            return HospitalAnalytics(
                total_feedback_count=0,
                net_promoter_score=0,
                satisfaction_rate_pct=100.0,
                average_ratings={},
                priority_breakdown={},
                department_heatmaps={},
                critical_alerts_count=0,
            )

        promoters = sum(1 for t in all_t if t.original_rating >= 4)
        detractors = sum(1 for t in all_t if t.original_rating <= 2)
        nps = int(((promoters - detractors) / len(all_t)) * 100)

        critical_count = sum(1 for t in all_t if t.priority == "CRITICAL" and not t.is_resolved)

        priority_breakdown = {
            "CRITICAL": sum(1 for t in all_t if t.priority == "CRITICAL"),
            "HIGH": sum(1 for t in all_t if t.priority == "HIGH"),
            "MODERATE": sum(1 for t in all_t if t.priority == "MODERATE"),
            "ROUTINE": sum(1 for t in all_t if t.priority == "ROUTINE"),
        }

        dim_sums: Dict[str, float] = {
            "doctor_care": 0.0,
            "nurse_promptness": 0.0,
            "cleanliness": 0.0,
            "medication_clarity": 0.0,
            "food_quality": 0.0,
        }
        for t in all_t:
            for k in dim_sums:
                dim_sums[k] += t.dimension_scores.get(k, 3)

        avg_ratings = {k: round(v / len(all_t), 2) for k, v in dim_sums.items()}

        dept_counts: Dict[str, List[int]] = {}
        for t in all_t:
            dept_name = str(t.department.value if hasattr(t.department, "value") else t.department)
            dept_counts.setdefault(dept_name, []).append(t.original_rating)

        dept_heatmaps = {
            d: round(sum(scores) / len(scores), 2) for d, scores in dept_counts.items()
        }

        satisfaction_pct = round((promoters / len(all_t)) * 100.0, 1)

        return HospitalAnalytics(
            total_feedback_count=len(all_t),
            net_promoter_score=nps,
            satisfaction_rate_pct=satisfaction_pct,
            average_ratings=avg_ratings,
            priority_breakdown=priority_breakdown,
            department_heatmaps=dept_heatmaps,
            critical_alerts_count=critical_count,
        )


storage = StorageManager()
