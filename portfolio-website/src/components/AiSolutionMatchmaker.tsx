"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Layers,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Bot,
  Zap,
  DollarSign,
  ShieldAlert,
  Server,
  FileCode,
  ExternalLink,
  MessageSquare
} from "lucide-react";
import { CANDIDATE_PROFILE } from "@/data/portfolio_data";

interface ChallengeScenario {
  id: string;
  industry: string;
  bottleneck: string;
  recommendedPattern: string;
  techStack: string[];
  projectedRoi: string;
  architectureBlueprint: string;
  matchingProject: string;
  projectGithub: string;
  interviewQuestion: string;
}

const SCENARIOS: ChallengeScenario[] = [
  {
    id: "sc-01",
    industry: "Chemical & Polymer R&D",
    bottleneck: "High €100k+ yearly licenses for legacy desktop formulation software & slow lab data ingestion",
    recommendedPattern: "In-House Materials Intelligence Microservices (FastAPI + Next.js 15 + MongoDB on AWS ECS)",
    techStack: ["FastAPI Async", "MongoDB Atlas", "Redis", "AWS ECS Fargate", "Next.js 15"],
    projectedRoi: "Eliminates 100% of 3rd-party vendor SaaS licensing (€1.2M+ cumulative savings) with sub-45ms P99 query latency.",
    architectureBlueprint: "AWS ECS Fargate autoscale cluster behind ALB with OIDC authentication and optimistic formulation versioning.",
    matchingProject: "Enterprise Materials Intelligence Platform",
    projectGithub: "https://github.com/NaseebGrewal/materials-intelligence-platform",
    interviewQuestion: "How did you design optimistic concurrency and data schema migrations for 150+ chemical researchers across global manufacturing plants?"
  },
  {
    id: "sc-02",
    industry: "ESH & Chemical Compliance",
    bottleneck: "Manual SDS / REACH safety document reviews taking hours with fear of LLM hallucinations on legal SVHC limits",
    recommendedPattern: "Deterministic Multi-Agent Swarm with Rule-Based Guardrails (LangGraph + Azure OpenAI)",
    techStack: ["LangGraph", "Python 3.12", "ECHA SVHC Registry", "Azure OpenAI", "Docker"],
    projectedRoi: "Accelerates compliance verification from 2 hours to 11.4 ms per SDS with a mathematically guaranteed 0% hallucination rate.",
    architectureBlueprint: "Supervisor-worker LangGraph pipeline with CAS normalizer, deterministic rule engine, and Human-in-the-Loop CMR escalation.",
    matchingProject: "ChemAgent-Gov: Multi-Agent REACH Auditor",
    projectGithub: "https://github.com/NaseebGrewal/chemagent-sds-compliance",
    interviewQuestion: "How do you architect multi-agent systems to ensure zero hallucinations when evaluating strict EU REACH Annex XVII thresholds?"
  },
  {
    id: "sc-03",
    industry: "Laboratory Testing & Automation",
    bottleneck: "Slow tensile, rheology, and mechanical curve-fitting algorithms freezing laboratory browser dashboards",
    recommendedPattern: "Client-Side Rust + WebAssembly (WASM) Real-Time Math Solver",
    techStack: ["Rust", "WebAssembly (WASM)", "Axum", "ISO 527-1", "FastAPI"],
    projectedRoi: "Sub-2ms client-side execution for 100,000+ data points without server roundtrip latency or cloud compute bills.",
    architectureBlueprint: "Compiled WASM binary executing directly in browser V8 engine for instant ISO 527 Young's Modulus and yield stress regression.",
    matchingProject: "Ultra-Fast Lab Rheology & Mechanics Engine",
    projectGithub: "https://github.com/NaseebGrewal/rust-wasm-rheology-engine",
    interviewQuestion: "Why did you choose Rust/WASM over standard Python server calculations for laboratory tensile curve regressions?"
  },
  {
    id: "sc-04",
    industry: "Enterprise AI & SaaS",
    bottleneck: "Uncontrolled LLM API token costs, rate limits, and lack of departmental token governance under EU AI Act",
    recommendedPattern: "Enterprise AI FinOps Gateway with Semantic Caching & Multi-Cloud Fallback",
    techStack: ["Redis SHA256", "LiteLLM", "OpenTelemetry", "Azure OpenAI", "AWS Bedrock"],
    projectedRoi: "Reduces enterprise LLM operational costs by 42% via exact & semantic prompt caching while enforcing departmental euro budgets.",
    architectureBlueprint: "Reverse-proxy gateway with Redis in-memory cache, automated rate limiter, PII scrubber, and multi-cloud transparent fallback.",
    matchingProject: "Enterprise AI Gateway & FinOps Controller",
    projectGithub: "https://github.com/NaseebGrewal/enterprise-ai-gateway-finops",
    interviewQuestion: "What caching strategies and multi-cloud fallback mechanisms did you implement to ensure 99.99% model uptime?"
  }
];

export default function AiSolutionMatchmaker() {
  const [selectedScenario, setSelectedScenario] = useState<ChallengeScenario>(SCENARIOS[0]);

  return (
    <section id="ai-advisor" className="py-16 px-6 max-w-7xl mx-auto border-t border-surfaceBorder">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-mono font-medium bg-cyan-950/70 border border-cyan-800 text-cyan-300 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          Interactive Architecture Matchmaker
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
          Solve Your Enterprise Bottleneck
        </h2>
        <p className="text-gray-400 text-sm max-w-2xl font-light">
          Select your engineering or R&D challenge below to see the recommended architecture pattern, projected business ROI, and how I've solved it before.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Challenge Selectors */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-mono text-gray-400 mb-2 uppercase tracking-wider">
            Select Your Challenge Context:
          </div>

          {SCENARIOS.map((sc) => (
            <button
              key={sc.id}
              onClick={() => setSelectedScenario(sc)}
              className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all ${
                selectedScenario.id === sc.id
                  ? "bg-blue-950/50 border-blue-500 text-white shadow-lg shadow-blue-500/10"
                  : "bg-surface border-surfaceBorder text-gray-300 hover:border-gray-700"
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-xs font-mono font-semibold text-blue-400">
                  {sc.industry}
                </span>
                {selectedScenario.id === sc.id && (
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                )}
              </div>
              <p className="text-xs text-gray-300 leading-relaxed font-light">
                {sc.bottleneck}
              </p>
            </button>
          ))}
        </div>

        {/* Right: Tailored Architecture Solution */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-surface border border-surfaceBorder flex flex-col justify-between">
          <div>
            {/* Blueprint Header */}
            <div className="flex items-start justify-between gap-4 mb-6 pb-4 border-b border-gray-800">
              <div>
                <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wide">
                  Architectural Recommendation
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
                  {selectedScenario.recommendedPattern}
                </h3>
              </div>
            </div>

            {/* Projected ROI Banner */}
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-900/60 mb-6">
              <div className="text-xs font-mono font-semibold text-emerald-300 mb-1 flex items-center gap-1.5">
                <DollarSign className="w-4 h-4" />
                <span>Executive ROI Impact:</span>
              </div>
              <div className="text-xs text-emerald-100/90 leading-relaxed">
                {selectedScenario.projectedRoi}
              </div>
            </div>

            {/* Architecture Details */}
            <div className="space-y-4 mb-6">
              <div>
                <div className="text-xs font-mono text-gray-400 mb-1.5 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-blue-400" />
                  <span>System Topology Blueprint:</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed font-light bg-gray-950 p-3.5 rounded-xl border border-gray-800 font-mono">
                  {selectedScenario.architectureBlueprint}
                </p>
              </div>

              {/* Tech Stack Chips */}
              <div>
                <div className="text-xs font-mono text-gray-400 mb-2">Validated Tech Stack:</div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedScenario.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono bg-gray-900 border border-gray-800 text-gray-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Ready Interview Topic */}
              <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-900/50">
                <div className="text-xs font-mono text-blue-300 mb-1 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Suggested Discussion Topic for Technical Interview:</span>
                </div>
                <div className="text-xs text-gray-300 italic font-light">
                  "{selectedScenario.interviewQuestion}"
                </div>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-800">
            <div className="text-xs text-gray-400">
              Matching System: <strong className="text-white">{selectedScenario.matchingProject}</strong>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={selectedScenario.projectGithub}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-lg bg-gray-900 hover:bg-gray-800 border border-gray-700 text-gray-200 text-xs font-medium flex items-center gap-1.5 transition-all"
              >
                <FileCode className="w-3.5 h-3.5 text-gray-400" />
                <span>Source Code</span>
                <ExternalLink className="w-3 h-3 text-gray-500" />
              </a>

              <a
                href={`mailto:${CANDIDATE_PROFILE.email}?subject=Discussion:%20${encodeURIComponent(selectedScenario.recommendedPattern)}`}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium flex items-center gap-1.5 transition-all shadow"
              >
                <span>Discuss Solution</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
