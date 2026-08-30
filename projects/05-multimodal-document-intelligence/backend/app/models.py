"""
Data models and Pydantic schemas for Multimodal Document Intelligence.
"""

from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field


class DocumentMetadata(BaseModel):
    title: Optional[str] = "Untitled"
    author: Optional[str] = "Unknown"
    page_count: int = 0
    file_size_bytes: int = 0
    creation_date: Optional[str] = None
    producer: Optional[str] = None
    is_encrypted: bool = False


class DocumentChunk(BaseModel):
    chunk_id: str
    page_number: int
    content: str
    token_count: int
    bounding_box: Optional[Dict[str, float]] = None
    metadata: Dict[str, Any] = Field(default_factory=dict)


class ChunkingOptions(BaseModel):
    strategy: str = Field(
        default="token_sliding_window",
        description="Chunking strategy: 'token_sliding_window', 'semantic_paragraphs', or 'page_boundary'",
    )
    chunk_size: int = Field(default=512, ge=64, le=4096)
    chunk_overlap: int = Field(default=64, ge=0, le=512)
    strip_headers_footers: bool = True


class DocumentChunkResponse(BaseModel):
    document_id: str
    filename: str
    total_pages: int
    total_chunks: int
    total_tokens: int
    strategy: str
    chunks: List[DocumentChunk]


class RedactionRule(BaseModel):
    pattern_type: str = Field(
        description="Type of entity to redact: 'email', 'phone', 'ssn', 'credit_card', 'custom'"
    )
    custom_regex: Optional[str] = None
    mask_character: str = "[REDACTED]"


class RedactionRequest(BaseModel):
    text: str
    rules: List[RedactionRule] = Field(
        default_factory=lambda: [
            RedactionRule(pattern_type="email"),
            RedactionRule(pattern_type="phone"),
            RedactionRule(pattern_type="ssn"),
            RedactionRule(pattern_type="credit_card"),
        ]
    )


class RedactionResponse(BaseModel):
    original_length: int
    redacted_length: int
    redactions_count: int
    redacted_text: str
    entities_found: List[Dict[str, Any]]


class MergeResultSummary(BaseModel):
    output_filename: str
    total_files_merged: int
    total_pages: int
    total_size_bytes: int
    processing_time_ms: float
    bookmarks_created: int


class ExtractionResponse(BaseModel):
    filename: str
    metadata: DocumentMetadata
    full_text: str
    word_count: int
    character_count: int
    preview_snippet: str
