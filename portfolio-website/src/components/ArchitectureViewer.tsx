"use client";

import React, { useState } from "react";
import {
  Server,
  Database,
  Cloud,
  Lock,
  Cpu,
  Sparkles,
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap,
  ChevronDown,
  ChevronUp
} from "lucide-react";

export default function ArchitectureViewer() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<"ecosystem" | "aws" | "langgraph" | "rust" | "finops" | "datalake">("ecosystem");
  const [selectedNode, setSelectedNode] = useState<string>("gateway");

  return (
    <section id="architecture" className="py-10 px-4 sm:px-6 lg:px-8 xl:px-12 max-w-[1440px] mx-auto border-t border-slate-200 dark:border-surfaceBorder">
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-surface border border-slate-200 dark:border-surfaceBorder shadow-md">
        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          aria-expanded={isExpanded}
          className="w-full text-left flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer group"
        >
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 mb-2 shadow-xs">
              <Layers className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
              Interactive System Topologies & Latency Budgets
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight group-hover:text-blue-700 dark:group-hover:text-cyan-300 transition-colors">
              Production Cloud & AI Architectures
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-light mt-1 max-w-2xl">
              Optional technical deep-dive: six topology views covering the same systems proven above, for reviewers who want the infrastructure detail.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-blue-700 dark:text-cyan-300 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 px-3.5 py-2 rounded-xl self-start sm:self-auto flex-shrink-0 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/60 transition-colors">
            <span>{isExpanded ? "Hide topologies" : "Expand deep-dive"}</span>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {/* Collapsed summary strip: one-line proof per topology, no scroll cost */}
        {!isExpanded && (
          <div className="mt-5 flex flex-wrap gap-2">
            {["Ecosystem Interlock", "AWS ECS Fargate", "LangGraph Determinism", "Rust/WASM 1.8 ms", "Redis FinOps 42%", "S3 Data Lake"].map((chip) => (
              <span
                key={chip}
                className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
              >
                {chip}
              </span>
            ))}
          </div>
        )}

        {isExpanded && (
        <div className="mt-6 animate-fadeIn">
        {/* Tab Buttons — own full-width row, parallel to heading edge */}
        <div className="mb-3 w-full overflow-x-auto no-scrollbar">
          <div className="flex flex-nowrap sm:flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-max sm:w-full">
          <button
            onClick={() => setActiveTab("ecosystem")}
            className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              activeTab === "ecosystem" ? "bg-blue-600 text-white shadow-sm font-semibold" : "text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white"
            }`}
          >
            ★ Ecosystem Interconnect
          </button>
          <button
            onClick={() => setActiveTab("aws")}
            className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              activeTab === "aws" ? "bg-blue-600 text-white shadow-sm font-semibold" : "text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white"
            }`}
          >
            AWS ECS R&D Platform
          </button>
          <button
            onClick={() => setActiveTab("langgraph")}
            className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              activeTab === "langgraph" ? "bg-blue-600 text-white shadow-sm font-semibold" : "text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white"
            }`}
          >
            Multi-Agent LangGraph
          </button>
          <button
            onClick={() => setActiveTab("rust")}
            className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              activeTab === "rust" ? "bg-blue-600 text-white shadow-sm font-semibold" : "text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white"
            }`}
          >
            Rust / WASM Engine
          </button>
          <button
            onClick={() => setActiveTab("finops")}
            className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              activeTab === "finops" ? "bg-blue-600 text-white shadow-sm font-semibold" : "text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white"
            }`}
          >
            AI FinOps Gateway
          </button>
          <button
            onClick={() => setActiveTab("datalake")}
            className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              activeTab === "datalake" ? "bg-blue-600 text-white shadow-sm font-semibold" : "text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white"
            }`}
          >
            AWS S3 Data Lake
          </button>
          </div>
        </div>

        {/* Business-constraint caption for the active tab */}
        <div className="mb-6 text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-cyan-400 flex-shrink-0" />
          <span>
            {activeTab === "ecosystem" && "Rationale: a single governed ingress point enforces cost and safety policy before any domain or AI service executes."}
            {activeTab === "aws" && "Rationale: replacing €1.2M+/year in vendor licenses with an owned, autoscaling AWS ECS platform."}
            {activeTab === "langgraph" && "Rationale: statutory chemical limits are enforced as deterministic rules with a full audit trail, never as model inference."}
            {activeTab === "rust" && "Rationale: curve-fitting executes client-side via WebAssembly, eliminating server round-trips entirely."}
            {activeTab === "finops" && "Rationale: caching repeated prompts and enforcing departmental budgets prevents uncontrolled LLM expenditure."}
            {activeTab === "datalake" && "Rationale: plant sensor telemetry remains inexpensive to store and fast to query on S3 with Glue/Athena."}
          </span>
        </div>

      {/* Diagram Render Box */}
      <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 font-mono text-xs shadow-inner transition-colors">

        
        {/* TAB 0: MONOREPO ECOSYSTEM TOPOLOGY */}
        {activeTab === "ecosystem" && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="text-slate-700 dark:text-slate-300 font-medium flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-semibold text-slate-900 dark:text-white">Live Monorepo Microservices Interlock</span>
                <span className="text-[11px] text-slate-500">| Next.js 15 + 4 FastAPI Services + Redis</span>
              </div>
              <div className="text-[11px] text-blue-600 dark:text-cyan-400 font-mono">
                Click any tier or microservice below to inspect specs &rarr;
              </div>
            </div>

            {/* Visual Interconnected Flow Chart */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-stretch">
              
              {/* 1. Client Presentation Tier */}
              <div
                onClick={() => setSelectedNode("client")}
                className={`md:col-span-3 p-4 rounded-xl border transition-all cursor-pointer ${
                  selectedNode === "client"
                    ? "bg-blue-50/80 dark:bg-blue-950/60 border-blue-500 shadow-md ring-1 ring-blue-500"
                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-blue-400"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
                    TIER 1 • INGRESS
                  </span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">&lt;45ms P99</span>
                </div>
                <div className="text-sm font-bold text-slate-900 dark:text-white mb-1 font-sans">
                  Next.js 15 Web Platform
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
                  App Router, React 19/18, Tailwind CSS, Vitest test harness & client-side WASM bindings.
                </div>
                <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-800 text-[10px] text-slate-500 font-mono">
                  Port: 3000 | Container: portfolio_website
                </div>
              </div>

              {/* Arrow 1 */}
              <div className="hidden md:flex md:col-span-1 items-center justify-center text-blue-500">
                <ArrowRight className="w-5 h-5 animate-pulse" />
              </div>

              {/* 2. Governance Gateway & Caching Tier */}
              <div
                onClick={() => setSelectedNode("gateway")}
                className={`md:col-span-4 p-4 rounded-xl border transition-all cursor-pointer ${
                  selectedNode === "gateway"
                    ? "bg-purple-50/80 dark:bg-purple-950/60 border-purple-500 shadow-md ring-1 ring-purple-500"
                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-purple-400"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300">
                    TIER 2 • GOVERNANCE
                  </span>
                  <span className="text-[10px] text-purple-600 dark:text-purple-400 font-bold">&lt;4ms Cache</span>
                </div>
                <div className="text-sm font-bold text-slate-900 dark:text-white mb-1 font-sans">
                  Enterprise AI FinOps Gateway
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
                  FastAPI Async Core + Redis SHA256 semantic cache + LiteLLM multi-provider fallback & token quotas.
                </div>
                <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-800 text-[10px] text-slate-500 font-mono">
                  Port: 8004 | Container: gateway_backend
                </div>
              </div>

              {/* Arrow 2 */}
              <div className="hidden md:flex md:col-span-1 items-center justify-center text-purple-500">
                <ArrowRight className="w-5 h-5 animate-pulse" />
              </div>

              {/* 3. Specialized Compute & AI Cluster */}
              <div
                onClick={() => setSelectedNode("microservices")}
                className={`md:col-span-3 p-4 rounded-xl border transition-all cursor-pointer ${
                  selectedNode === "microservices"
                    ? "bg-emerald-50/80 dark:bg-emerald-950/60 border-emerald-500 shadow-md ring-1 ring-emerald-500"
                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-emerald-400"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300">
                    TIER 3 • CORE AI / R&D
                  </span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">1.8ms WASM</span>
                </div>
                <div className="text-sm font-bold text-slate-900 dark:text-white mb-1 font-sans">
                  Domain Microservice Cluster
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
                  • 01 Materials ML (FastAPI :8001)<br />
                  • 02 ChemAgent SDS (LangGraph :8002)<br />
                  • 03 Rust/WASM Engine (:8003)
                </div>
                <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-800 text-[10px] text-slate-500 font-mono">
                  Isolated Docker Network & 100% Tests
                </div>
              </div>
            </div>

            {/* Detailed Selected Node Inspector */}
            <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                <span className="font-sans font-bold text-xs uppercase tracking-wide text-slate-900 dark:text-white">
                  Architectural Node Specifications: {selectedNode.toUpperCase()}
                </span>
              </div>
              
              {selectedNode === "client" && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-sans text-xs">
                  <div className="p-3 bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
                    <div className="font-bold text-blue-600 dark:text-blue-400 mb-1">Modern React 19 / Next.js 15</div>
                    <div className="text-slate-600 dark:text-slate-300 text-[11px]">Zero-bundle server components, streaming SSR, and sub-45ms TTFB.</div>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
                    <div className="font-bold text-blue-600 dark:text-blue-400 mb-1">Client WASM Acceleration</div>
                    <div className="text-slate-600 dark:text-slate-300 text-[11px]">Direct execution of compiled Rust bytecode without round-trip network hops.</div>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
                    <div className="font-bold text-blue-600 dark:text-blue-400 mb-1">Dockerized Vitest Harness</div>
                    <div className="text-slate-600 dark:text-slate-300 text-[11px]">100% test pass rate with isolated DOM and component contract validation.</div>
                  </div>
                </div>
              )}

              {selectedNode === "gateway" && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-sans text-xs">
                  <div className="p-3 bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
                    <div className="font-bold text-purple-600 dark:text-purple-400 mb-1">Redis SHA-256 Cache</div>
                    <div className="text-slate-600 dark:text-slate-300 text-[11px]">Identical prompt queries served in &lt; 4ms with 100% token cost elimination.</div>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
                    <div className="font-bold text-purple-600 dark:text-purple-400 mb-1">42% LLM FinOps Savings</div>
                    <div className="text-slate-600 dark:text-slate-300 text-[11px]">Departmental quota throttling, token budgets, and fallback orchestration.</div>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
                    <div className="font-bold text-purple-600 dark:text-purple-400 mb-1">Multi-Cloud Circuit Breaker</div>
                    <div className="text-slate-600 dark:text-slate-300 text-[11px]">Azure OpenAI &rarr; AWS Bedrock &rarr; local vLLM automatic failover.</div>
                  </div>
                </div>
              )}

              {selectedNode === "microservices" && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-sans text-xs">
                  <div className="p-3 bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
                    <div className="font-bold text-emerald-600 dark:text-emerald-400 mb-1">01 Materials Platform</div>
                    <div className="text-slate-600 dark:text-slate-300 text-[11px]">FastAPI + MongoDB Atlas + XGBoost ML formulation predictions (&lt;30ms).</div>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
                    <div className="font-bold text-amber-600 dark:text-amber-400 mb-1">02 ChemAgent SDS Engine</div>
                    <div className="text-slate-600 dark:text-slate-300 text-[11px]">LangGraph multi-agent deterministic supervisor for REACH SVHC 0.1% w/w checks.</div>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
                    <div className="font-bold text-cyan-600 dark:text-cyan-400 mb-1">03 Rust/WASM Rheology</div>
                    <div className="text-slate-600 dark:text-slate-300 text-[11px]">High-performance numerical constitutive polynomial fitting in 1.8ms.</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 1: AWS ECS R&D PLATFORM */}
        {activeTab === "aws" && (
          <div className="space-y-4">
            <div className="text-slate-600 dark:text-slate-400 mb-2 flex items-center gap-2 font-medium">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span>€1.2M+ saved: owned AWS platform, not a vendor license</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-blue-900/50 shadow-xs">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold mb-2 font-sans">
                  <Cloud className="w-4 h-4" /> Ingress & Security Tier
                </div>
                <div className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed font-sans font-light">
                  Route 53 DNS &rarr; AWS ALB with TLS 1.3 termination &rarr; OIDC SSO authentication middleware & WAF IP rate limiting.
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-emerald-900/50 shadow-xs">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold mb-2 font-sans">
                  <Server className="w-4 h-4" /> Compute & Microservices Tier
                </div>
                <div className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed font-sans font-light">
                  FastAPI Async Core on AWS ECS Fargate (autoscale 2-10 tasks) with Redis cluster caching (P99 &lt; 45ms) and Rust/WASM calculation worker.
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-cyan-900/50 shadow-xs">
                <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold mb-2 font-sans">
                  <Database className="w-4 h-4" /> Storage & Persistence Tier
                </div>
                <div className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed font-sans font-light">
                  MongoDB Atlas / DocumentDB for schema-flexible polymer formulations + S3 for raw SDS/TDS binary docs + Automated daily backups.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: LANGGRAPH MULTI-AGENT PIPELINE */}
        {activeTab === "langgraph" && (
          <div className="space-y-4">
            <div className="text-slate-600 dark:text-slate-400 mb-2 flex items-center gap-2 font-medium">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>Legal limits are rules with an audit trail, not model guesses</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                <div className="text-orange-600 dark:text-orange-400 font-bold mb-1 font-sans text-xs">1. Extractor Node</div>
                <div className="text-slate-600 dark:text-slate-300 text-[11px] font-sans font-light">Parses unstructured SDS PDF into structured chemical composition & CAS registry tags.</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                <div className="text-amber-600 dark:text-yellow-400 font-bold mb-1 font-sans text-xs">2. CAS Normalizer</div>
                <div className="text-slate-600 dark:text-slate-300 text-[11px] font-sans font-light">Cross-checks substance nomenclature against live IUPAC, PubChem & ECHA registries.</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                <div className="text-emerald-600 dark:text-emerald-400 font-bold mb-1 font-sans text-xs">3. REACH Auditor</div>
                <div className="text-slate-600 dark:text-slate-300 text-[11px] font-sans font-light">Deterministic rule engine checks SVHC lists with 0% LLM hallucination on legal thresholds.</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                <div className="text-cyan-600 dark:text-cyan-400 font-bold mb-1 font-sans text-xs">4. Human-in-Loop</div>
                <div className="text-slate-600 dark:text-slate-300 text-[11px] font-sans font-light">Automated escalation router for CMR (H350/H360) chemicals requiring safety officer sign-off.</div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: RUST / WASM ENGINE */}
        {activeTab === "rust" && (
          <div className="space-y-4">
            <div className="text-slate-600 dark:text-slate-400 mb-2 flex items-center gap-2 font-medium">
              <span className="w-2 h-2 rounded-full bg-cyan-500" />
              <span>Lab curve-fitting in the browser: 1.8 ms, no server wait</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-cyan-900/50 shadow-xs">
                <div className="text-cyan-600 dark:text-cyan-400 font-bold mb-2 flex items-center gap-1.5 font-sans">
                  <Cpu className="w-4 h-4" /> SIMD-Accelerated Rust Core
                </div>
                <div className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed font-sans font-light">
                  Polynomial regression & constitutive mechanical models compiled with wasm-pack to WebAssembly bytecode.
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-blue-900/50 shadow-xs">
                <div className="text-blue-600 dark:text-blue-400 font-bold mb-2 flex items-center gap-1.5 font-sans">
                  <Zap className="w-4 h-4" /> Zero Network Round-Trip
                </div>
                <div className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed font-sans font-light">
                  Runs directly inside the browser thread in 1.8ms over 100k+ stress-strain datapoints with zero cloud API latency.
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-emerald-900/50 shadow-xs">
                <div className="text-emerald-600 dark:text-emerald-400 font-bold mb-2 flex items-center gap-1.5 font-sans">
                  <ShieldCheck className="w-4 h-4" /> Memory & Security Boundary
                </div>
                <div className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed font-sans font-light">
                  Zero memory leaks, memory footprint under 4.2 MB, and strict type safety across the JS &lt;-&gt; Rust boundary.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: ENTERPRISE AI FINOPS */}
        {activeTab === "finops" && (
          <div className="space-y-4">
            <div className="text-slate-600 dark:text-slate-400 mb-2 flex items-center gap-2 font-medium">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              <span>42% lower AI spend: cache repeats, cap departments</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-purple-900/50 shadow-xs">
                <div className="text-purple-600 dark:text-purple-400 font-bold mb-2 flex items-center gap-1.5 font-sans">
                  <Zap className="w-4 h-4" /> Semantic Caching Layer
                </div>
                <div className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed font-sans font-light">
                  Redis SHA256 prompt hash indexing serves duplicate chemical literature queries in &lt; 4ms with 0 LLM API token cost.
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-blue-900/50 shadow-xs">
                <div className="text-blue-600 dark:text-blue-400 font-bold mb-2 flex items-center gap-1.5 font-sans">
                  <Lock className="w-4 h-4" /> Departmental Quotas & Guardrails
                </div>
                <div className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed font-sans font-light">
                  Real-time budget tracking per R&D cost-center with automated circuit breaking and PII/IP redaction filters.
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-emerald-900/50 shadow-xs">
                <div className="text-emerald-600 dark:text-emerald-400 font-bold mb-2 flex items-center gap-1.5 font-sans">
                  <ShieldCheck className="w-4 h-4" /> Multi-Cloud Resilient Fallback
                </div>
                <div className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed font-sans font-light">
                  Transparent dynamic routing: Azure OpenAI (primary) &rarr; AWS Bedrock (secondary) &rarr; Local vLLM with 99.99% uptime.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: AWS S3 DATA LAKE */}
        {activeTab === "datalake" && (
          <div className="space-y-4">
            <div className="text-slate-600 dark:text-slate-400 mb-2 flex items-center gap-2 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Plant sensor data cheap to store, fast to query. 80% less lab overhead.</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-indigo-900/50 shadow-xs">
                <div className="text-indigo-600 dark:text-indigo-400 font-bold mb-2 font-sans">Ingestion & Sensor Streaming</div>
                <div className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed font-sans font-light">
                  Lab sensor telemetry streaming via AWS Lambda & S3 buckets with automated schema validation on arrival.
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-cyan-900/50 shadow-xs">
                <div className="text-cyan-600 dark:text-cyan-400 font-bold mb-2 font-sans">AWS Glue ETL & Athena Querying</div>
                <div className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed font-sans font-light">
                  Automated Glue crawlers and cataloging converting raw CSV/JSON to optimized Parquet format for fast serverless queries.
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-emerald-900/50 shadow-xs">
                <div className="text-emerald-600 dark:text-emerald-400 font-bold mb-2 font-sans">Semantic Research Search</div>
                <div className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed font-sans font-light">
                  Vector indexing over historical experimental records accelerating cross-departmental scientific discovery by 40%.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
        </div>
        )}
      </div>
    </section>
  );
}
