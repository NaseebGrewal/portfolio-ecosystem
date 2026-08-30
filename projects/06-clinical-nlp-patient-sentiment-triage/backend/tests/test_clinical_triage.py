"""
Unit and integration tests for Clinical NLP Patient Sentiment & Triage.
"""

from fastapi.testclient import TestClient
from app.main import app
from app.services.phi_sanitizer import PHISanitizer
from app.services.triage_engine import ClinicalTriageEngine
from app.models import PatientFeedbackInput, Department, TriagePriority

client = TestClient(app)


def test_health():
    resp = client.get("/health")
    assert resp.status_code == 200
    assert resp.json()["status"] == "healthy"


def test_phi_sanitizer():
    raw_text = "Dr. Miller in Room 304 called patient at john.doe@email.com or 555-019-2834 on 05/12/2024."
    res = PHISanitizer.sanitize(raw_text)
    assert "[PHI-EMAIL-REDACTED]" in res.sanitized_text
    assert "[PHI-PHONE-REDACTED]" in res.sanitized_text
    assert "john.doe@email.com" not in res.sanitized_text


def test_critical_risk_triage_routing():
    feedback = PatientFeedbackInput(
        patient_name="John Doe",
        department=Department.EMERGENCY,
        overall_rating=1,
        doctor_care_rating=1,
        nurse_promptness_rating=1,
        cleanliness_rating=2,
        medication_clarity_rating=1,
        food_quality_rating=2,
        patient_comments="Patient suffered sudden allergic reaction and severe shortness of breath after wrong medication given.",
    )
    ticket = ClinicalTriageEngine.process_feedback(feedback)
    assert ticket.priority == TriagePriority.CRITICAL
    assert ticket.sla_target_hours == 0.25
    assert ticket.sentiment.clinical_risk_detected is True
    assert "allergic reaction" in ticket.sentiment.risk_factors


def test_api_ingest_and_analytics_flow():
    payload = {
        "patient_id": "P-TEST-101",
        "patient_name": "Test Patient",
        "department": "Cardiology",
        "overall_rating": 5,
        "doctor_care_rating": 5,
        "nurse_promptness_rating": 5,
        "cleanliness_rating": 5,
        "medication_clarity_rating": 5,
        "food_quality_rating": 5,
        "patient_comments": "Wonderful care, kind nurses, excellent treatment!",
    }
    resp = client.post("/api/v1/triage/ingest", json=payload)
    assert resp.status_code == 201
    ticket_data = resp.json()
    assert ticket_data["priority"] == "ROUTINE"
    assert ticket_data["sentiment"]["sentiment_label"] == "POSITIVE"

    # Verify queue contains tickets
    q_resp = client.get("/api/v1/triage/queue")
    assert q_resp.status_code == 200
    assert len(q_resp.json()) >= 1

    # Verify hospital analytics
    a_resp = client.get("/api/v1/triage/analytics")
    assert a_resp.status_code == 200
    analytics = a_resp.json()
    assert "net_promoter_score" in analytics
    assert "average_ratings" in analytics
