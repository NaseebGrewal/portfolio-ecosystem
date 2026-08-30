# Clinical NLP Patient Sentiment & Autonomous Triage

**Microservice ID**: `projects/06-clinical-nlp-patient-sentiment-triage`  
**Tech Stack**: FastAPI, Python 3.12, Redis, MongoDB, HIPAA PHI Sanitizer, Docker  
**Port**: `8005`  
**Original GitHub Repository**: `https://github.com/NaseebGrewal/Full_stack_Patient_feedback_system_Using_Flask_Framework`

---

## Architectural Overview
An autonomous healthcare feedback intelligence and emergency clinical triage pipeline featuring:
1. **HIPAA Safe Harbor PHI De-identification**: Real-time scrubbing of names, Medical Record Numbers (MRN), contact numbers, dates, and bed/room coordinates.
2. **Clinical Risk & Distress Classifier**: Pattern-matching and clinical sentiment analysis flagging acute adverse triggers (anaphylaxis, medication errors, sepsis indicators) directly to clinical leadership with strict SLA countdowns.
3. **Multi-Departmental Experience Radar**: Aggregates multi-dimensional quality metrics across Doctor Care, Nursing Promptness, Cleanliness, Medication Clarity, and Dietary Services.
4. **Autonomous Intervention Dispatcher**: Generates automated corrective interventions and escalates critical complaints to hospital administration.

---

## API Endpoints

- `GET /health`: Health and active ticket counts.
- `POST /api/v1/triage/ingest`: Ingests patient feedback, applies PHI sanitization, and routes ticket.
- `GET /api/v1/triage/queue`: Returns active prioritized triage queue.
- `POST /api/v1/triage/resolve`: Marks ticket resolved with clinical notes.
- `GET /api/v1/triage/analytics`: Hospital-wide NPS and departmental satisfaction radar data.
- `POST /api/v1/triage/deidentify`: Dedicated HIPAA PHI stripping tool.

---

## Verification & Testing
```bash
docker compose exec -T clinical_triage_backend pytest -v
```
