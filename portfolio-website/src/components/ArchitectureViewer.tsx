"use client";

import React, { useState } from "react";
import { Server, Database, Cloud, Lock, Cpu, Sparkles, Layers, ArrowRight, ShieldCheck, Zap } from "lucide-react";

export default function ArchitectureViewer() {
  const [activeTab, setActiveTab] = useState<"aws" | "langgraph" | "finops" | "datalake">("aws");

  return (
    <section id="architecture" className="my-16 p-6 sm:p-8 rounded-3xl bg-white dark:bg-surface border border-slate-200 dark:border-surfaceBorder shadow-md">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 mb-2 shadow-xs">
            <Layers className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
            Interactive System Topologies
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Production Cloud & AI Architectures
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-light mt-1">
            Real-world system designs powering high-throughput scientific data, autonomous compliance, and LLM governance.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setActiveTab("aws")}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              activeTab === "aws" ? "bg-blue-600 text-white shadow-sm font-semibold" : "text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white"
            }`}
          >
            AWS ECS R&D Platform
          </button>
          <button
            onClick={() => setActiveTab("langgraph")}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              activeTab === "langgraph" ? "bg-blue-600 text-white shadow-sm font-semibold" : "text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white"
            }`}
          >
            Multi-Agent LangGraph Swarm
          </button>
          <button
            onClick={() => setActiveTab("finops")}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              activeTab === "finops" ? "bg-blue-600 text-white shadow-sm font-semibold" : "text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white"
            }`}
          >
            Enterprise AI FinOps
          </button>
          <button
            onClick={() => setActiveTab("datalake")}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              activeTab === "datalake" ? "bg-blue-600 text-white shadow-sm font-semibold" : "text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white"
            }`}
          >
            AWS S3/Glue Data Lake
          </button>
        </div>
      </div>

      {/* Diagram Render Box */}
      <div className="p-6 rounded-2xl bg-gray-900 text-gray-100 border border-gray-800 font-mono text-xs shadow-inner">
        {activeTab === "aws" && (
          <div className="space-y-4">
            <div className="text-gray-400 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              <span>// AWS ECS Fargate & Application Load Balancer Architecture (€1.2M+ Savings)</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-gray-950 border border-blue-900/50">
                <div className="flex items-center gap-2 text-blue-400 font-bold mb-2">
                  <Cloud className="w-4 h-4" /> Ingress & Security Tier
                </div>
                <div className="text-gray-300 text-[11px] leading-relaxed font-sans">
                  Route 53 DNS &rarr; AWS ALB with TLS 1.3 termination &rarr; OIDC SSO authentication middleware & WAF IP rate limiting.
                </div>
              </div>
              <div className="p-4 rounded-xl bg-gray-950 border border-emerald-900/50">
                <div className="flex items-center gap-2 text-emerald-400 font-bold mb-2">
                  <Server className="w-4 h-4" /> Compute & Microservices Tier
                </div>
                <div className="text-gray-300 text-[11px] leading-relaxed font-sans">
                  FastAPI Async Core on AWS ECS Fargate (autoscale 2-10 tasks) with Redis cluster caching (P99 &lt; 45ms) and Rust/WASM calculation worker.
                </div>
              </div>
              <div className="p-4 rounded-xl bg-gray-950 border border-cyan-900/50">
                <div className="flex items-center gap-2 text-cyan-400 font-bold mb-2">
                  <Database className="w-4 h-4" /> Storage & Persistence Tier
                </div>
                <div className="text-gray-300 text-[11px] leading-relaxed font-sans">
                  MongoDB Atlas / DocumentDB for schema-flexible polymer formulations + S3 for raw SDS/TDS binary docs + Automated daily backups.
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "langgraph" && (
          <div className="space-y-4">
            <div className="text-gray-400 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>// LangGraph Multi-Agent Deterministic Chemical Compliance Pipeline</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-gray-950 border border-gray-800">
                <div className="text-orange-400 font-bold mb-1 font-sans text-xs">1. Extractor Node</div>
                <div className="text-gray-300 text-[11px] font-sans">Parses unstructured SDS PDF into structured chemical composition & CAS registry tags.</div>
              </div>
              <div className="p-3.5 rounded-xl bg-gray-950 border border-gray-800">
                <div className="text-yellow-400 font-bold mb-1 font-sans text-xs">2. CAS Normalizer</div>
                <div className="text-gray-300 text-[11px] font-sans">Cross-checks substance nomenclature against live IUPAC, PubChem & ECHA registries.</div>
              </div>
              <div className="p-3.5 rounded-xl bg-gray-950 border border-gray-800">
                <div className="text-emerald-400 font-bold mb-1 font-sans text-xs">3. REACH Auditor</div>
                <div className="text-gray-300 text-[11px] font-sans">Deterministic rule engine checks SVHC lists with 0% LLM hallucination on legal thresholds.</div>
              </div>
              <div className="p-3.5 rounded-xl bg-gray-950 border border-gray-800">
                <div className="text-cyan-400 font-bold mb-1 font-sans text-xs">4. Human-in-Loop</div>
                <div className="text-gray-300 text-[11px] font-sans">Automated escalation router for CMR (H350/H360) chemicals requiring safety officer sign-off.</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "finops" && (
          <div className="space-y-4">
            <div className="text-gray-400 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              <span>// Enterprise AI FinOps & Governance Gateway (42% Cost Reduction)</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-gray-950 border border-purple-900/50">
                <div className="text-purple-400 font-bold mb-2 flex items-center gap-1.5 font-sans">
                  <Zap className="w-4 h-4" /> Semantic Caching Layer
                </div>
                <div className="text-gray-300 text-[11px] leading-relaxed font-sans">
                  Redis SHA256 prompt hash indexing serves duplicate chemical literature queries in &lt; 4ms with 0 LLM API token cost.
                </div>
              </div>
              <div className="p-4 rounded-xl bg-gray-950 border border-blue-900/50">
                <div className="text-blue-400 font-bold mb-2 flex items-center gap-1.5 font-sans">
                  <Lock className="w-4 h-4" /> Departmental Quotas & Guardrails
                </div>
                <div className="text-gray-300 text-[11px] leading-relaxed font-sans">
                  Real-time budget tracking per R&D cost-center with automated circuit breaking and PII/IP redaction filters.
                </div>
              </div>
              <div className="p-4 rounded-xl bg-gray-950 border border-emerald-900/50">
                <div className="text-emerald-400 font-bold mb-2 flex items-center gap-1.5 font-sans">
                  <ShieldCheck className="w-4 h-4" /> Multi-Cloud Resilient Fallback
                </div>
                <div className="text-gray-300 text-[11px] leading-relaxed font-sans">
                  Transparent dynamic routing: Azure OpenAI (primary) &rarr; AWS Bedrock (secondary) &rarr; Local vLLM with 99.99% uptime.
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "datalake" && (
          <div className="space-y-4">
            <div className="text-gray-400 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>// AWS Laboratory Telemetry & Multi-Terabyte Data Lake (80% Overhead Reduction)</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-gray-950 border border-indigo-900/50">
                <div className="text-indigo-400 font-bold mb-2 font-sans">Ingestion & Sensor Streaming</div>
                <div className="text-gray-300 text-[11px] leading-relaxed font-sans">
                  Lab sensor telemetry streaming via AWS Lambda & S3 buckets with automated schema validation on arrival.
                </div>
              </div>
              <div className="p-4 rounded-xl bg-gray-950 border border-cyan-900/50">
                <div className="text-cyan-400 font-bold mb-2 font-sans">AWS Glue ETL & Athena Querying</div>
                <div className="text-gray-300 text-[11px] leading-relaxed font-sans">
                  Automated Glue crawlers and cataloging converting raw CSV/JSON to optimized Parquet format for fast serverless queries.
                </div>
              </div>
              <div className="p-4 rounded-xl bg-gray-950 border border-emerald-900/50">
                <div className="text-emerald-400 font-bold mb-2 font-sans">Semantic Research Search</div>
                <div className="text-gray-300 text-[11px] leading-relaxed font-sans">
                  Vector indexing over historical experimental records accelerating cross-departmental scientific discovery by 40%.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
