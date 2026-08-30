"""
High-throughput PDF manipulation engine supporting merging, splitting, metadata extraction,
and clean page serialization using pure-Python pypdf.
"""

import io
import time
from typing import List, Tuple, Dict, Any
from pypdf import PdfReader, PdfWriter
from app.models import DocumentMetadata, MergeResultSummary


class PDFEngine:
    @staticmethod
    def extract_metadata(file_bytes: bytes, filename: str = "document.pdf") -> Tuple[DocumentMetadata, str]:
        """
        Extracts structural metadata and full raw text from a PDF byte stream.
        """
        stream = io.BytesIO(file_bytes)
        reader = PdfReader(stream)
        
        info = reader.metadata or {}
        page_count = len(reader.pages)
        
        extracted_text_list = []
        for idx, page in enumerate(reader.pages):
            page_text = page.extract_text() or ""
            extracted_text_list.append(page_text)
            
        full_text = "\n\n".join(extracted_text_list)
        
        metadata = DocumentMetadata(
            title=str(info.get("/Title", filename.replace(".pdf", ""))),
            author=str(info.get("/Author", "Unknown")),
            page_count=page_count,
            file_size_bytes=len(file_bytes),
            creation_date=str(info.get("/CreationDate", "")),
            producer=str(info.get("/Producer", "DocumentIntelligenceEngine")),
            is_encrypted=reader.is_encrypted,
        )
        
        return metadata, full_text

    @staticmethod
    def merge_pdf_streams(
        files: List[Tuple[str, bytes]],
        output_filename: str = "merged_document.pdf",
        add_bookmarks: bool = True
    ) -> Tuple[bytes, MergeResultSummary]:
        """
        Merges multiple PDF byte streams into a unified optimized PDF.
        """
        start_time = time.perf_counter()
        writer = PdfWriter()
        total_pages = 0
        bookmarks_count = 0
        
        for filename, file_bytes in files:
            stream = io.BytesIO(file_bytes)
            reader = PdfReader(stream)
            start_page_index = total_pages
            
            for page in reader.pages:
                writer.add_page(page)
                total_pages += 1
                
            if add_bookmarks and len(reader.pages) > 0:
                clean_title = filename.replace(".pdf", "").replace("_", " ").title()
                writer.add_outline_item(title=clean_title, page_number=start_page_index)
                bookmarks_count += 1
                
        output_stream = io.BytesIO()
        writer.write(output_stream)
        merged_bytes = output_stream.getvalue()
        
        elapsed_ms = (time.perf_counter() - start_time) * 1000.0
        
        summary = MergeResultSummary(
            output_filename=output_filename if output_filename.endswith(".pdf") else f"{output_filename}.pdf",
            total_files_merged=len(files),
            total_pages=total_pages,
            total_size_bytes=len(merged_bytes),
            processing_time_ms=round(elapsed_ms, 2),
            bookmarks_created=bookmarks_count,
        )
        
        return merged_bytes, summary

    @staticmethod
    def create_sample_pdf(title: str, body_text: str) -> bytes:
        """
        Creates a valid readable PDF byte stream with title and content.
        """
        clean_title = title.replace("(", "").replace(")", "").replace("\\", "")
        clean_body = body_text.replace("(", "").replace(")", "").replace("\\", "")
        pdf_raw = f"""%PDF-1.4
%âãÏÓ
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>
endobj
4 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>
endobj
5 0 obj
<< /Length 260 >>
stream
BT
/F1 16 Tf
50 720 Td
({clean_title}) Tj
/F1 11 Tf
0 -30 Td
({clean_body}) Tj
ET
endstream
endobj
xref
0 6
0000000000 65535 f 
0000000015 00000 n 
0000000068 00000 n 
0000000125 00000 n 
0000000247 00000 n 
0000000325 00000 n 
trailer
<< /Root 1 0 R /Size 6 >>
startxref
640
%%EOF"""
        return pdf_raw.encode("latin1")
