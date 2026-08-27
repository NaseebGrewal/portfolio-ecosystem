# Step-by-Step Implementation Plan: Rust-WASM Rheology Engine

Roadmap for autonomous expansion with **GitHub Copilot** or **Claude Code**.

---

## 📋 Milestones & Agent Prompts

### Step 1: Rust Core Numeric Algorithms
**Agent Prompt:**
> *"Implement the Rust library in `rust_core/src/lib.rs` for tensile test mechanics. Include functions for: 1) linear regression between 0.05% and 0.25% strain to calculate Young's Modulus ($E$), 2) 0.2% offset yield stress detection, 3) numerical integration of energy-to-break using the trapezoidal rule. Expose both WASM bindings (`#[wasm_bindgen]`) and C-FFI / PyO3 bindings."*

### Step 2: FastAPI High-Performance Analytics Wrapper
**Agent Prompt:**
> *"Create a FastAPI router in `backend/app/routers/rheology.py` that accepts batch CSV/JSON uploads of tensile test runs (strain and stress columns), validates monotonic timestamps, computes mechanical invariants, and detects extruder shear-rate anomalies."*

### Step 3: WebAssembly Next.js Client Component
**Agent Prompt:**
> *"Build a Next.js client component `frontend/src/components/TensileCurvePlayer.tsx` that loads the compiled `.wasm` package. When a user drags a tensile test CSV into the browser, execute curve-fitting directly in WebAssembly and render real-time interactive Plotly/Canvas charts with 60 FPS performance."*

### Step 4: Add Benchmarks & Pytest Suite
**Agent Prompt:**
> *"Write benchmark tests in `tests/test_curve_fitting.py` comparing standard Python iteration vs vectorized Rust execution. Ensure numerical accuracy matches ISO 527 test tolerances within 0.001%."*
