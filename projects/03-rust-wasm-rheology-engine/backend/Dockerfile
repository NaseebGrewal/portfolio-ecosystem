# ==============================================================================
# Multi-Stage Dockerfile for High-Performance Rust + FastAPI Rheology Engine
# Stage 1: Compiles the Native Rust SIMD & Invariant Crate
# Stage 2: Packages Python 3.12 Runtime with Native Compiled Rust Library
# ==============================================================================

# --- Stage 1: Build Native Rust Core ---
FROM rust:1.80-slim AS rust-builder

WORKDIR /build

# Copy Cargo configuration and Rust source code
COPY Cargo.toml ./
COPY crates ./crates

# Run Rust unit tests & build release shared library (.so)
RUN cargo test --release --all && \
    cargo build --release --all

# --- Stage 2: Python 3.12 Serverless & API Runtime ---
FROM python:3.12-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONPATH=/app \
    LD_LIBRARY_PATH=/usr/local/lib:$LD_LIBRARY_PATH

RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy compiled Rust library from builder stage into system library path
COPY --from=rust-builder /build/target/release/librheology_core.so /usr/local/lib/librheology_core.so
RUN ldconfig || true

COPY backend/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ .

EXPOSE 8002

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8002", "--reload"]
