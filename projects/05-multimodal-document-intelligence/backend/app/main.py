"""
Multimodal Document Intelligence FastAPI Backend (Project 05)
High-throughput document processing, semantic chunking, PII redaction, and PDF synthesis.
"""

import io
import time
from typing import List, Optional
from fastapi import FastAPI, UploadFile, File, Form, HTTPException, Response, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, StreamingResponse

from app.models import (
    DocumentMetadata,
    DocumentChunkResponse,
    ChunkingOptions,
    RedactionRequest,
    RedactionResponse,
    MergeResultSummary,
    ExtractionResponse,
)
from app.services.pdf_engine import PDFEngine
from app.services.semantic_chunker import SemanticChunker
from app.services.redaction_engine import RedactionEngine

app = FastAPI(
    title="Multimodal Document Intelligence API",
    description="High-Throughput PDF Merging, Redaction, and Semantic Chunking Microservice",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory metrics tracker
PIPELINE_METRICS = {
    "total_merges": 0,
    "total_pages_processed": 0,
    "total_chunks_generated": 0,
    "total_redactions_applied": 0,
    "uptime_start": time.time(),
}


@app.get("/health", tags=["Health"])
@app.get("/api/v1/health", tags=["Health"])
def health_check():
    return {
        "status": "healthy",
        "service": "multimodal-document-intelligence",
        "version": "1.0.0",
        "uptime_seconds": round(time.time() - PIPELINE_METRICS["uptime_start"], 2),
    }


@app.get("/api/v1/documents/metrics", tags=["Telemetry"])
def get_metrics():
    return {
        "status": "success",
        "metrics": PIPELINE_METRICS,
    }


@app.post("/api/v1/documents/merge", tags=["Document Processing"])
async def merge_documents(
    files: List[UploadFile] = File(...),
    output_filename: str = Form("merged_document.pdf"),
    add_bookmarks: bool = Form(True),
    return_binary: bool = Form(False),
):
    """
    Merges multiple PDF uploads into a unified, optimized PDF.
    Returns either a streaming binary PDF or a structured JSON response.
    """
    if not files:
        raise HTTPException(status_code=400, detail="At least one PDF file is required.")

    file_payloads = []
    for f in files:
        content = await f.read()
        file_payloads.append((f.filename or "document.pdf", content))

    try:
        merged_bytes, summary = PDFEngine.merge_pdf_streams(
            file_payloads,
            output_filename=output_filename,
            add_bookmarks=add_bookmarks,
        )

        PIPELINE_METRICS["total_merges"] += 1
        PIPELINE_METRICS["total_pages_processed"] += summary.total_pages

        if return_binary:
            return StreamingResponse(
                io.BytesIO(merged_bytes),
                media_type="application/pdf",
                headers={"Content-Disposition": f'attachment; filename="{summary.output_filename}"'},
            )

        return {
            "status": "success",
            "summary": summary.model_dump(),
            "byte_size": len(merged_bytes),
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to merge PDFs: {str(e)}")


@app.post("/api/v1/documents/extract", response_model=ExtractionResponse, tags=["Document Processing"])
async def extract_document_text(file: UploadFile = File(...)):
    """
    Extracts structural metadata and full text from a PDF file.
    """
    content = await file.read()
    try:
        metadata, full_text = PDFEngine.extract_metadata(content, filename=file.filename or "doc.pdf")
        words = full_text.split()
        return ExtractionResponse(
            filename=file.filename or "doc.pdf",
            metadata=metadata,
            full_text=full_text,
            word_count=len(words),
            character_count=len(full_text),
            preview_snippet=full_text[:300] + ("..." if len(full_text) > 300 else ""),
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Extraction failed: {str(e)}")


@app.post("/api/v1/documents/chunk", response_model=DocumentChunkResponse, tags=["Semantic Vectorization"])
def chunk_text_payload(
    text: str = Form(...),
    filename: str = Form("document.txt"),
    strategy: str = Form("token_sliding_window"),
    chunk_size: int = Form(512),
    chunk_overlap: int = Form(64),
):
    """
    Deconstructs document text into semantic vector-ready chunks.
    """
    options = ChunkingOptions(
        strategy=strategy,
        chunk_size=chunk_size,
        chunk_overlap=chunk_overlap,
    )
    pages = text.split("\f") if "\f" in text else [text]
    chunks = SemanticChunker.chunk_document(pages, options)
    
    total_tokens = sum(c.token_count for c in chunks)
    PIPELINE_METRICS["total_chunks_generated"] += len(chunks)

    return DocumentChunkResponse(
        document_id=f"doc_{int(time.time())}",
        filename=filename,
        total_pages=len(pages),
        total_chunks=len(chunks),
        total_tokens=total_tokens,
        strategy=strategy,
        chunks=chunks,
    )


@app.post("/api/v1/documents/redact", response_model=RedactionResponse, tags=["Privacy & Compliance"])
def redact_sensitive_entities(request: RedactionRequest):
    """
    De-identifies and redacts sensitive PII (emails, phones, SSNs, credit cards).
    """
    result = RedactionEngine.redact_text(request.text, request.rules)
    PIPELINE_METRICS["total_redactions_applied"] += result.redactions_count
    return result
