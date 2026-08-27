# Step-by-Step Implementation Plan: ChemAgent-Gov

This roadmap is designed for **GitHub Copilot** or **Claude Code** to expand this multi-agent compliance auditor into a comprehensive enterprise platform.

---

## 📋 Milestones & Agent Prompts

### Step 1: LangGraph State Graph & Typed Blackboard
**Agent Prompt:**
> *"Implement the LangGraph StateGraph in `backend/app/agents/orchestrator.py` using `typing.TypedDict` for the `ComplianceState`. Define state nodes for: 1) `extract_sds_entities`, 2) `verify_cas_numbers`, 3) `query_reach_svhc`, 4) `evaluate_hazard_risk`. Add conditional edge routing to a `human_review_required` node if carcinogenic (H350) or mutagenic (H340) hazard codes are detected."*

### Step 2: Deterministic ECHA / REACH Validator
**Agent Prompt:**
> *"Create the regulatory verification engine in `backend/app/agents/regulator.py`. It should load the ECHA candidate list JSON database, perform fuzzy CAS and EC number matching, check concentration thresholds (e.g., >0.1% w/w for SVHC notification), and return a non-hallucinatory compliance status report."*

### Step 3: Fast SDS PDF Ingestion & OCR Preprocessor
**Agent Prompt:**
> *"Write an async PDF parser in `backend/app/agents/extractor.py` using `pypdf` and regular expressions to extract Section 2 (Hazards Identification), Section 3 (Composition/Information on Ingredients), and Section 8 (Exposure Controls/Personal Protection)."*

### Step 4: Add Pytest Evaluation Harness for Agents
**Agent Prompt:**
> *"Write a rigorous test suite in `tests/test_compliance_agents.py` with 5 golden SDS test cases (safe polymer, SVHC violation, incomplete CAS table, high vapor pressure solvent, and CMR hazard material). Verify deterministic graph transitions and 100% compliance detection accuracy."*

---

## 🔒 Verification & Quality Gates
* **Hallucination Rate:** 0% on regulated chemical concentrations (achieved via deterministic Python rules verifying LLM structured outputs).
* **Test Suite:** Automated evaluation benchmark with mock SDS fixtures running in under 5 seconds.
