# Multimodal Document Intelligence & Semantic Mesh

**Microservice ID**: `projects/05-multimodal-document-intelligence`  
**Tech Stack**: FastAPI, Python 3.12, PyPDF, Semantic Chunker, Regex PII Masking, Docker  
**Port**: `8004`  
**Original GitHub Repository**: `https://github.com/NaseebGrewal/merge-pdfs`

---

## Architectural Overview
A high-throughput document intelligence and semantic preprocessing engine capable of:
1. **Zero-Loss Document Assembly**: Merging, splitting, and reordering multi-gigabyte document streams with automated bookmark generation and outline indexing.
2. **Deterministic PII/PHI Redaction**: High-precision de-identification pipeline for GDPR/HIPAA compliance masking emails, phone numbers, SSNs, credit cards, and custom regular expressions.
3. **Multimodal Semantic Chunking**: Token-aware sliding windows, paragraph boundary recognition, and page coordinate extraction optimized for high-dimensional vector databases (Pinecone, Qdrant, MongoDB Vector).
4. **Real-time Pipeline Telemetry**: High-density throughput and latency metrics for enterprise ingestion pipelines.

---

## API Contract Endpoints

- `GET /health`: Health check and uptime status.
- `GET /api/v1/documents/metrics`: Live pipeline telemetry.
- `POST /api/v1/documents/merge`: Multi-file PDF merge with optional bookmark trees and metadata stripping.
- `POST /api/v1/documents/extract`: Structural metadata & full text extraction.
- `POST /api/v1/documents/chunk`: Vector-ready semantic text chunking.
- `POST /api/v1/documents/redact`: PII/PHI de-identification engine.

---

## Verification & Testing
Run containerized tests:
```bash
docker compose exec -T doc_intelligence_backend pytest -v
```
