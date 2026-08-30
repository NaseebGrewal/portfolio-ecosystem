"""
Clinical Sentiment Analyzer & Autonomous Triage Classifier.
Detects medical risk indicators, patient distress, and operational breakdowns.
"""

import re
from typing import List, Tuple
from app.models import (
    PatientFeedbackInput,
    TriagePriority,
    ClinicalSentimentScore,
    TriageTicket,
    Department,
)
from app.services.phi_sanitizer import PHISanitizer
import time
import uuid


class ClinicalTriageEngine:
    # High-risk clinical distress triggers
    CRITICAL_RISK_KEYWORDS = [
        "allergic reaction", "anaphylaxis", "cannot breathe", "shortness of breath",
        "bleeding", "unresponsive", "sepsis", "wrong medication", "wrong dose",
        "chest pain", "heart attack", "collapsed", "severe pain", "choking",
        "infection", "vomiting blood", "suicidal", "negligence", "malpractice"
    ]

    HIGH_RISK_KEYWORDS = [
        "waited 5 hours", "waited 4 hours", "ignored by nurse", "rude doctor",
        "dirty needle", "uncleaned room", "fell out of bed", "fever spike",
        "blood spill", "no call button", "unbearable", "extremely delayed"
    ]

    POSITIVE_KEYWORDS = [
        "excellent", "compassionate", "kind", "fast", "wonderful", "saved my life",
        "caring", "attentive", "clean", "professional", "grateful", "smooth", "helpful"
    ]

    @classmethod
    def analyze_sentiment(cls, text: str, overall_rating: int) -> ClinicalSentimentScore:
        lower_text = text.lower()
        risk_factors: List[str] = []

        # Check critical triggers
        critical_found = [k for k in cls.CRITICAL_RISK_KEYWORDS if k in lower_text]
        high_found = [k for k in cls.HIGH_RISK_KEYWORDS if k in lower_text]
        pos_found = [k for k in cls.POSITIVE_KEYWORDS if k in lower_text]

        if critical_found:
            risk_factors.extend(critical_found)
            compound_score = -0.85
            sentiment_label = "SEVERELY_CRITICAL"
            clinical_risk_detected = True
        elif high_found or overall_rating <= 2:
            risk_factors.extend(high_found)
            compound_score = -0.55
            sentiment_label = "NEGATIVE"
            clinical_risk_detected = len(high_found) > 0
        elif overall_rating >= 4 or len(pos_found) >= 2:
            compound_score = 0.75 + min(0.2, len(pos_found) * 0.05)
            sentiment_label = "POSITIVE"
            clinical_risk_detected = False
        else:
            compound_score = 0.05
            sentiment_label = "NEUTRAL"
            clinical_risk_detected = False

        return ClinicalSentimentScore(
            compound_score=round(compound_score, 2),
            sentiment_label=sentiment_label,
            clinical_risk_detected=clinical_risk_detected,
            risk_factors=risk_factors,
        )

    @classmethod
    def determine_priority_and_sla(
        cls,
        sentiment: ClinicalSentimentScore,
        input_data: PatientFeedbackInput
    ) -> Tuple[TriagePriority, float, str]:
        """
        Determines routing priority, SLA target hours, and AI-suggested corrective intervention.
        """
        if sentiment.clinical_risk_detected or sentiment.sentiment_label == "SEVERELY_CRITICAL" or input_data.overall_rating == 1:
            priority = TriagePriority.CRITICAL
            sla_hours = 0.25  # 15 mins
            intervention = f"IMMEDIATE CLINICAL ALERT: Flagged for Chief Medical Officer & Charge Nurse. Risk factors: {', '.join(sentiment.risk_factors) if sentiment.risk_factors else 'Severe Rating (1/5)'}. Initiate bedside check immediately."
        elif sentiment.sentiment_label == "NEGATIVE" or input_data.overall_rating == 2:
            priority = TriagePriority.HIGH
            sla_hours = 1.0  # 1 hour
            intervention = "DEPARTMENT HEAD ESCALATION: Patient Relations Lead assigned to review service breakdown and contact patient/family within 60 minutes."
        elif input_data.overall_rating == 3:
            priority = TriagePriority.MODERATE
            sla_hours = 4.0  # 4 hours
            intervention = "OPERATIONAL REVIEW: Feedback aggregated into weekly departmental quality circle; nurse supervisor alerted."
        else:
            priority = TriagePriority.ROUTINE
            sla_hours = 24.0  # 24 hours
            intervention = "POSITIVE COMMENDATION: Automatically forward patient appreciation to Departmental Nurse Manager & Staff Recognition Board."

        return priority, sla_hours, intervention

    @classmethod
    def process_feedback(cls, feedback: PatientFeedbackInput) -> TriageTicket:
        # Step 1: HIPAA De-identification
        phi_res = PHISanitizer.sanitize(feedback.patient_comments)

        # Step 2: Clinical Sentiment & Risk Scan
        sentiment = cls.analyze_sentiment(feedback.patient_comments, feedback.overall_rating)

        # Step 3: Priority & SLA Determination
        priority, sla_hours, intervention = cls.determine_priority_and_sla(sentiment, feedback)

        ticket = TriageTicket(
            ticket_id=f"TRG-{uuid.uuid4().hex[:6].upper()}",
            timestamp=time.strftime("%Y-%m-%d %H:%M:%S UTC", time.gmtime()),
            priority=priority,
            department=feedback.department,
            sla_target_hours=sla_hours,
            sentiment=sentiment,
            sanitized_comments=phi_res.sanitized_text,
            original_rating=feedback.overall_rating,
            dimension_scores={
                "doctor_care": feedback.doctor_care_rating,
                "nurse_promptness": feedback.nurse_promptness_rating,
                "cleanliness": feedback.cleanliness_rating,
                "medication_clarity": feedback.medication_clarity_rating,
                "food_quality": feedback.food_quality_rating,
            },
            ai_suggested_intervention=intervention,
            is_resolved=False,
        )

        return ticket
