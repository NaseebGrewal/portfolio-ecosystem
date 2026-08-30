"""
Unit and integration tests for Multimodal Document Intelligence backend.
"""

import io
from fastapi.testclient import TestClient
from app.main import app
from app.services.pdf_engine import PDFEngine
from app.services.redaction_engine import RedactionEngine
from app.services.semantic_chunker import SemanticChunker
from app.models import ChunkingOptions, RedactionRule

client = TestClient(app)


def test_health_endpoints():
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["service"] == "multimodal-document-intelligence"

    v1_resp = client.get("/api/v1/health")
    assert v1_resp.status_code == 200


def test_redaction_engine():
    text = "Contact doctor at john.doe@hospital.org or call +49-170-1234567 with SSN 123-45-6789."
    rules = [
        RedactionRule(pattern_type="email"),
        RedactionRule(pattern_type="phone"),
        RedactionRule(pattern_type="ssn"),
    ]
    result = RedactionEngine.redact_text(text, rules)
    assert result.redactions_count >= 3
    assert "[REDACTED]" in result.redacted_text
    assert "john.doe@hospital.org" not in result.redacted_text


def test_semantic_chunker():
    text = [
        "Paragraph 1 discusses polymer synthesis. High temperature curing improves modulus.\n\nParagraph 2 covers tensile testing at 23°C."
    ]
    options = ChunkingOptions(strategy="semantic_paragraphs", chunk_size=256, chunk_overlap=32)
    chunks = SemanticChunker.chunk_document(text, options)
    assert len(chunks) == 2
    assert chunks[0].page_number == 1
    assert chunks[0].token_count > 0


def test_api_chunk_endpoint():
    payload = {
        "text": "Chapter 1: Foundations of Microservices.\nChapter 2: Redis Caching.\nChapter 3: Rust WASM.",
        "filename": "thesis_outline.txt",
        "strategy": "token_sliding_window",
        "chunk_size": 100,
        "chunk_overlap": 10,
    }
    response = client.post("/api/v1/documents/chunk", data=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["total_chunks"] >= 1
    assert data["filename"] == "thesis_outline.txt"


def test_api_merge_and_extract_flow():
    # Generate 2 sample PDFs in memory
    pdf1 = PDFEngine.create_sample_pdf("Report 1", "Section A")
    pdf2 = PDFEngine.create_sample_pdf("Report 2", "Section B")

    files = [
        ("files", ("doc1.pdf", pdf1, "application/pdf")),
        ("files", ("doc2.pdf", pdf2, "application/pdf")),
    ]

    response = client.post(
        "/api/v1/documents/merge",
        files=files,
        data={"output_filename": "final_output.pdf", "add_bookmarks": "true", "return_binary": "false"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "success"
    assert data["summary"]["total_files_merged"] == 2
    assert data["summary"]["total_pages"] == 2
