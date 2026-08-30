"""
Clinical NLP Patient Sentiment & Autonomous Triage FastAPI Backend (Project 06)
HIPAA PHI de-identification, multi-dimensional sentiment scoring, and emergency triage routing.
"""

import time
from typing import List, Optional
from fastapi import FastAPI, HTTPException, status, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse

from app.models import (
    PatientFeedbackInput,
    TriageTicket,
    TriagePriority,
    HospitalAnalytics,
    ResolutionRequest,
    PHIDeidentificationResult,
)
from app.services.phi_sanitizer import PHISanitizer
from app.services.triage_engine import ClinicalTriageEngine
from app.services.storage_manager import storage

app = FastAPI(
    title="Clinical NLP Patient Sentiment & Triage API",
    description="HIPAA-Aligned Patient Feedback Intelligence & Automated Clinical Risk Triage",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", include_in_schema=False)
def root_redirect():
    return RedirectResponse(url="/docs")


@app.get("/health", tags=["Health"])
@app.get("/api/v1/health", tags=["Health"])
def health_check():
    return {
        "status": "healthy",
        "service": "clinical-nlp-patient-sentiment-triage",
        "version": "1.0.0",
        "active_tickets": len(storage.tickets),
    }


@app.post("/api/v1/triage/deidentify", response_model=PHIDeidentificationResult, tags=["HIPAA Compliance"])
def deidentify_phi(payload: dict):
    """
    Scans raw clinical notes or patient feedback and strips all HIPAA Safe Harbor identifiers.
    """
    text = payload.get("text", "")
    if not text:
        raise HTTPException(status_code=400, detail="Text payload required.")
    return PHISanitizer.sanitize(text)


@app.post("/api/v1/triage/ingest", response_model=TriageTicket, status_code=status.HTTP_201_CREATED, tags=["Clinical Triage"])
def ingest_patient_feedback(feedback: PatientFeedbackInput):
    """
    Ingests patient feedback, strips PHI, scores clinical sentiment, and assigns triage priority.
    """
    ticket = ClinicalTriageEngine.process_feedback(feedback)
    storage.add_ticket(ticket)
    return ticket


@app.get("/api/v1/triage/queue", response_model=List[TriageTicket], tags=["Clinical Triage"])
def get_triage_queue(
    priority: Optional[TriagePriority] = None,
    unresolved_only: bool = Query(True, description="Filter only unresolved tickets"),
):
    """
    Returns active clinical triage tickets sorted by urgency priority.
    """
    tickets = storage.get_all()
    if unresolved_only:
        tickets = [t for t in tickets if not t.is_resolved]
    if priority:
        tickets = [t for t in tickets if t.priority == priority]

    # Priority sorting: CRITICAL -> HIGH -> MODERATE -> ROUTINE
    order = {"CRITICAL": 0, "HIGH": 1, "MODERATE": 2, "ROUTINE": 3}
    tickets.sort(key=lambda t: order.get(str(t.priority.value if hasattr(t.priority, "value") else t.priority), 4))
    return tickets


@app.post("/api/v1/triage/resolve", response_model=TriageTicket, tags=["Clinical Triage"])
def resolve_ticket(req: ResolutionRequest):
    """
    Marks a clinical triage ticket as resolved with clinician action notes.
    """
    ticket = storage.resolve_ticket(req.ticket_id, req.resolution_notes)
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    return ticket


@app.get("/api/v1/triage/analytics", response_model=HospitalAnalytics, tags=["Hospital Analytics"])
def get_hospital_analytics():
    """
    Calculates Net Promoter Score, departmental satisfaction heatmaps, and priority breakdown.
    """
    return storage.calculate_analytics()
