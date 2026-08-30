"""
Pydantic schemas and models for Clinical NLP Patient Sentiment & Triage.
"""

from typing import List, Optional, Dict, Any
from enum import Enum
from pydantic import BaseModel, Field


class TriagePriority(str, Enum):
    CRITICAL = "CRITICAL"     # Immediate patient safety or adverse event (SLA: 15 mins)
    HIGH = "HIGH"             # Severe dissatisfaction or acute clinical concern (SLA: 1 hour)
    MODERATE = "MODERATE"     # Moderate operational complaint (SLA: 4 hours)
    ROUTINE = "ROUTINE"       # General positive or neutral feedback (SLA: 24 hours)


class Department(str, Enum):
    EMERGENCY = "Emergency Medicine"
    CARDIOLOGY = "Cardiology"
    NURSING_CARE = "Nursing & Inpatient"
    FACILITIES_CLEANLINESS = "Sanitation & Facilities"
    PHARMACY_MEDICATION = "Pharmacy & Medications"
    FOOD_NUTRITION = "Food & Dietary Services"
    ADMINISTRATION = "General Administration"


class PatientFeedbackInput(BaseModel):
    patient_id: Optional[str] = "P-9842"
    patient_name: Optional[str] = "Anonymous"
    age: Optional[int] = 45
    email: Optional[str] = "patient@hospital.org"
    department: Department = Department.EMERGENCY
    overall_rating: int = Field(default=3, ge=1, le=5)
    doctor_care_rating: int = Field(default=3, ge=1, le=5)
    nurse_promptness_rating: int = Field(default=3, ge=1, le=5)
    cleanliness_rating: int = Field(default=3, ge=1, le=5)
    medication_clarity_rating: int = Field(default=3, ge=1, le=5)
    food_quality_rating: int = Field(default=3, ge=1, le=5)
    patient_comments: str = Field(
        ...,
        description="Free-form clinical or facility feedback text.",
    )


class PHIDeidentificationResult(BaseModel):
    original_text: str
    sanitized_text: str
    redacted_tokens: List[Dict[str, str]]
    phi_safe: bool = True


class ClinicalSentimentScore(BaseModel):
    compound_score: float = Field(..., ge=-1.0, le=1.0)
    sentiment_label: str  # "POSITIVE", "NEUTRAL", "NEGATIVE", "SEVERELY_CRITICAL"
    clinical_risk_detected: bool = False
    risk_factors: List[str] = Field(default_factory=list)


class TriageTicket(BaseModel):
    ticket_id: str
    timestamp: str
    priority: TriagePriority
    department: Department
    sla_target_hours: float
    sentiment: ClinicalSentimentScore
    sanitized_comments: str
    original_rating: int
    dimension_scores: Dict[str, int]
    ai_suggested_intervention: str
    is_resolved: bool = False
    resolution_notes: Optional[str] = None


class HospitalAnalytics(BaseModel):
    total_feedback_count: int
    net_promoter_score: int
    satisfaction_rate_pct: float
    average_ratings: Dict[str, float]
    priority_breakdown: Dict[str, int]
    department_heatmaps: Dict[str, float]
    critical_alerts_count: int


class ResolutionRequest(BaseModel):
    ticket_id: str
    resolution_notes: str
    resolved_by: str = "Clinical Quality Lead"
