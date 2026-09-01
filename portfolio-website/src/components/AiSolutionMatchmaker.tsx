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
  MessageSquare,
  ShieldCheck
} from "lucide-react";
import { CANDIDATE_PROFILE, FLAGSHIP_PROJECTS } from "@/data/portfolio_data";

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
  architecturalPillar: string;
}

const SCENARIOS: ChallengeScenario[] = [
  {
    id: "sc-01",
    industry: "Chemical & Polymer R&D",
    bottleneck: "€100k+/year in legacy desktop formulation licenses and slow lab data ingestion",
    recommendedPattern: "In-House Materials Intelligence Platform (FastAPI + Next.js 15 + MongoDB on AWS ECS)",
    techStack: ["FastAPI", "MongoDB Atlas", "Redis", "AWS ECS Fargate", "Next.js 15"],
    projectedRoi: "Eliminates 100% of third-party vendor SaaS licensing (€1.2M+ cumulative savings) with sub-45 ms P99 query latency.",
    architectureBlueprint: "AWS ECS Fargate autoscaling behind an Application Load Balancer, with OIDC authentication and optimistic recipe versioning.",
    matchingProject: "Enterprise Materials Intelligence Platform",
    projectGithub: FLAGSHIP_PROJECTS[0]?.githubUrl || "https://github.com/your-username/portfolio-ecosystem/tree/main/projects/01-materials-intelligence-platform",
    architecturalPillar: "150+ researchers across global plants share one formulation system with optimistic concurrency, so no one overwrites another team's batches."
  },
  {
    id: "sc-02",
    industry: "Chemical Safety & Compliance",
    bottleneck: "Manual SDS (Safety Data Sheet) reviews take hours, and LLMs hallucinate on SVHC (Substances of Very High Concern) limits",
    recommendedPattern: "Deterministic Multi-Agent Pipeline with Rule-Based Guardrails (LangGraph + Azure OpenAI)",
    techStack: ["LangGraph", "Python 3.12", "ECHA SVHC Registry", "Azure OpenAI", "Docker"],
    projectedRoi: "Compliance verification drops from 2 hours to 11.4 ms per SDS, enforced against the statutory 0.1% w/w limit.",
    architectureBlueprint: "Supervisor-worker LangGraph agents: parse CAS numbers, apply deterministic rules, and escalate carcinogenic hazards (H350/H360) to a human safety officer.",
    matchingProject: "ChemAgent-Gov: Multi-Agent REACH Auditor",
    projectGithub: FLAGSHIP_PROJECTS[1]?.githubUrl || "https://github.com/your-username/portfolio-ecosystem/tree/main/projects/02-chemagent-sds-compliance",
    architecturalPillar: "Legal limits are enforced as rules with a full audit trail, with zero invented concentrations."
  },
  {
    id: "sc-03",
    industry: "Laboratory Testing & Automation",
    bottleneck: "Slow tensile and rheology curve-fitting freezes laboratory dashboards",
    recommendedPattern: "Client-Side Rust + WebAssembly (WASM) Math Engine",
    techStack: ["Rust", "WebAssembly (WASM)", "Axum", "ISO 527", "FastAPI"],
    projectedRoi: "Under 2 ms on 100,000+ data points, with no server round-trip and no additional cloud compute cost.",
    architectureBlueprint: "Compiled WASM executes in the browser for instant ISO 527 Young's modulus and 0.2% offset yield stress regression.",
    matchingProject: "Ultra-Fast Lab Rheology & Mechanics Engine",
    projectGithub: FLAGSHIP_PROJECTS[2]?.githubUrl || "https://github.com/your-username/portfolio-ecosystem/tree/main/projects/03-rust-wasm-rheology-engine",
    architecturalPillar: "Computation stays on the laboratory laptop: instant, offline-capable, and free of cloud latency."
  },
  {
    id: "sc-04",
    industry: "Enterprise AI Cost Governance",
    bottleneck: "Unbounded LLM bills, no departmental spend caps, and EU AI Act exposure",
    recommendedPattern: "Enterprise AI Gateway with Semantic Caching & Spend Governance",
    techStack: ["Redis", "LiteLLM", "OpenTelemetry", "Azure OpenAI", "AWS Bedrock"],
    projectedRoi: "42% lower LLM operational cost via Redis answer caching and departmental euro budgets.",
    architectureBlueprint: "Reverse-proxy gateway in front of all models: Redis cache, rate limiting, PII redaction, and Azure → AWS failover.",
    matchingProject: "Enterprise AI Gateway & FinOps Controller",
    projectGithub: FLAGSHIP_PROJECTS[3]?.githubUrl || "https://github.com/your-username/portfolio-ecosystem/tree/main/projects/04-enterprise-ai-gateway-finops",
    architecturalPillar: "Identical prompts return from cache in under 5 ms; multi-cloud failover sustains 99.99% model uptime."
  }
];

export interface AiSolutionMatchmakerProps {
  onOpenContactModal?: (topic?: string) => void;
}

export default function AiSolutionMatchmaker({ onOpenContactModal }: AiSolutionMatchmakerProps) {
  const [selectedScenario, setSelectedScenario] = useState<ChallengeScenario>(SCENARIOS[0]);

  const handleDiscussClick = () => {
    const topicLabel = `${selectedScenario.industry}: ${selectedScenario.recommendedPattern.split("(")[0].trim()}`;
    if (onOpenContactModal) {
      onOpenContactModal(topicLabel);
    } else {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section id="ai-advisor" className="py-16 px-4 sm:px-6 lg:px-8 xl:px-12 max-w-[1440px] mx-auto border-t border-slate-200 dark:border-surfaceBorder">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-cyan-50 dark:bg-cyan-950/70 border border-cyan-200 dark:border-cyan-800 text-cyan-700 dark:text-cyan-300 mb-3 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
          Architectural Solution Blueprints
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight mb-3">
          Solution Blueprints for Real Industrial Bottlenecks
        </h2>
        <p className="text-slate-700 dark:text-slate-300 text-sm max-w-2xl font-light">
          Four production bottlenecks, the systems that solved them, and the savings delivered. Select one to inspect the architecture, then Get in Touch.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Challenge Selectors */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-mono text-slate-600 dark:text-slate-400 mb-2 uppercase tracking-wider font-semibold">
            Select an Industrial Context:
          </div>

          {SCENARIOS.map((sc) => (
            <button
              key={sc.id}
              onClick={() => setSelectedScenario(sc)}
              className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                selectedScenario.id === sc.id
                  ? "bg-blue-50 dark:bg-blue-950/50 border-blue-500 text-slate-950 dark:text-white shadow-md shadow-blue-500/10 ring-1 ring-blue-400/30"
                  : "bg-white dark:bg-surface border-slate-200 dark:border-surfaceBorder text-slate-800 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/60"
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-xs font-mono font-semibold text-blue-600 dark:text-blue-400">
                  {sc.industry}
                </span>
                {selectedScenario.id === sc.id && (
                  <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
                )}
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-light">
                {sc.bottleneck}
              </p>
            </button>
          ))}
        </div>

        {/* Right: Tailored Architecture Solution */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white dark:bg-surface border border-slate-200 dark:border-surfaceBorder shadow-md flex flex-col justify-between">
          <div>
            {/* Blueprint Header */}
            <div className="flex items-start justify-between gap-4 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-[11px] font-mono text-cyan-700 dark:text-cyan-400 uppercase tracking-wide font-semibold">
                  Recommended Architecture
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight mt-1">
                  {selectedScenario.recommendedPattern}
                </h3>
              </div>
            </div>

            {/* Projected ROI Banner */}
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 mb-6">
              <div className="text-xs font-mono font-semibold text-emerald-800 dark:text-emerald-300 mb-1 flex items-center gap-1.5">
                <DollarSign className="w-4 h-4" />
                <span>Business Impact & ROI:</span>
              </div>
              <div className="text-xs text-emerald-950 dark:text-emerald-100/90 leading-relaxed font-light">
                {selectedScenario.projectedRoi}
              </div>
            </div>

            {/* Architecture Details */}
            <div className="space-y-4 mb-6">
              <div>
                <div className="text-xs font-mono text-slate-600 dark:text-slate-400 mb-1.5 flex items-center gap-1.5 font-semibold">
                  <Layers className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>System Topology Blueprint:</span>
                </div>
                <p className="text-xs text-slate-900 dark:text-slate-200 leading-relaxed font-light bg-slate-50 dark:bg-slate-950 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 font-mono">
                  {selectedScenario.architectureBlueprint}
                </p>
              </div>

              {/* Tech Stack Chips */}
              <div>
                <div className="text-xs font-mono text-slate-600 dark:text-slate-400 mb-2 font-semibold">Production Tech Stack:</div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedScenario.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Architectural Focus */}
              <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50">
                <div className="text-xs font-mono text-blue-800 dark:text-blue-300 mb-1 flex items-center gap-1.5 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Key Architectural Pillar:</span>
                </div>
                <div className="text-xs text-slate-800 dark:text-slate-300 font-light leading-relaxed">
                  {selectedScenario.architecturalPillar}
                </div>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="text-xs text-slate-700 dark:text-slate-300">
              Matching Production System: <strong className="text-slate-950 dark:text-white font-semibold">{selectedScenario.matchingProject}</strong>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={selectedScenario.projectGithub}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-all shadow-xs"
              >
                <FileCode className="w-3.5 h-3.5 text-slate-500" />
                <span>Monorepo Source</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>

              <button
                type="button"
                onClick={handleDiscussClick}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md cursor-pointer ring-1 ring-white/10"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
                <span>Get in Touch</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
