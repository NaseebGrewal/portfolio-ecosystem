"""
Enterprise Semantic Chunker with token-aware sliding windows,
paragraph preservation, and page coordinate awareness.
"""

import re
import uuid
from typing import List
from app.models import DocumentChunk, ChunkingOptions


class SemanticChunker:
    @staticmethod
    def estimate_tokens(text: str) -> int:
        """
        Fast token estimator (~0.75 words per token rule-of-thumb).
        """
        words = len(text.split())
        return max(1, int(words * 1.33))

    @classmethod
    def chunk_document(
        cls,
        text_by_page: List[str],
        options: ChunkingOptions
    ) -> List[DocumentChunk]:
        """
        Splits multi-page text into structured semantic chunks based on selected strategy.
        """
        chunks: List[DocumentChunk] = []
        
        if options.strategy == "page_boundary":
            for page_idx, page_text in enumerate(text_by_page, start=1):
                clean_text = page_text.strip()
                if not clean_text:
                    continue
                chunks.append(
                    DocumentChunk(
                        chunk_id=f"chk_{uuid.uuid4().hex[:8]}",
                        page_number=page_idx,
                        content=clean_text,
                        token_count=cls.estimate_tokens(clean_text),
                        metadata={"strategy": "page_boundary", "page_index": page_idx}
                    )
                )
            return chunks

        if options.strategy == "semantic_paragraphs":
            for page_idx, page_text in enumerate(text_by_page, start=1):
                paragraphs = [p.strip() for p in re.split(r"\n\s*\n+", page_text) if p.strip()]
                for p_idx, para in enumerate(paragraphs):
                    chunks.append(
                        DocumentChunk(
                            chunk_id=f"chk_{uuid.uuid4().hex[:8]}",
                            page_number=page_idx,
                            content=para,
                            token_count=cls.estimate_tokens(para),
                            metadata={"strategy": "semantic_paragraphs", "paragraph_index": p_idx}
                        )
                    )
            return chunks

        # Default: token_sliding_window with overlap
        full_text = "\n\n".join(text_by_page)
        words = full_text.split()
        if not words:
            return chunks

        step = max(1, options.chunk_size - options.chunk_overlap)
        for i in range(0, len(words), step):
            chunk_words = words[i:i + options.chunk_size]
            chunk_text = " ".join(chunk_words)
            
            # Approximate page assignment based on character index
            page_estimate = min(len(text_by_page), max(1, int((i / max(1, len(words))) * len(text_by_page)) + 1))
            
            chunks.append(
                DocumentChunk(
                    chunk_id=f"chk_{uuid.uuid4().hex[:8]}",
                    page_number=page_estimate,
                    content=chunk_text,
                    token_count=cls.estimate_tokens(chunk_text),
                    metadata={
                        "strategy": "token_sliding_window",
                        "start_word_index": i,
                        "end_word_index": i + len(chunk_words),
                    }
                )
            )
            
        return chunks
