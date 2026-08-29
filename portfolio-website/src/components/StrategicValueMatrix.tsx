"use client";

import React from "react";
import { CANDIDATE_PROFILE } from "@/data/portfolio_data";
import { Sparkles, Check, X, ShieldAlert, Cpu, FlaskConical, DollarSign, Award, Users2 } from "lucide-react";

export default function StrategicValueMatrix() {
  const comparisonData = [
    {
      capability: "Domain-Aware Telemetry & Physics",
      genericStack: "Treats chemical & mechanical sensor data as generic text or key-value logs",
      legacySilo: "Manual spreadsheets and siloed vendor desktop software",
      integratedArchitecture: "Native physical modeling (B.Tech Polymer Eng + M.Sc. CS) for high-throughput laboratory pipelines"
    },
    {
      capability: "Deterministic Regulatory Verification",
      genericStack: "Vulnerable to LLM hallucinations on statutory concentration thresholds",
      legacySilo: "Manual compliance reviews taking 2-3 hours per Safety Data Sheet (SDS)",
      integratedArchitecture: "Deterministic LangGraph multi-agent pipelines ensuring strict rule-based compliance against REACH SVHC thresholds"
    },
    {
      capability: "Production Latency & Microservice SLA",
      genericStack: "Standard server-side stacks with latency bottlenecks on complex math",
      legacySilo: "No distributed cloud architecture or containerized deployment",
      integratedArchitecture: "FastAPI + client-side Rust/WASM (1.8 ms ISO 527 solver) with 99.95% AWS ECS SLA"
    },
    {
      capability: "FinOps & Total Cost of Ownership (TCO)",
      genericStack: "Defaults to high-cost 3rd-party SaaS without token caching",
      legacySilo: "Locked into €100k+/year recurring commercial vendor software licenses",
      integratedArchitecture: "Saved €1.2M+ by architecting custom in-house R&D platforms with Redis semantic caching"
    },
    {
      capability: "Engineering Enablement & Mentorship",
      genericStack: "Isolated engineering without domain stakeholder coaching",
      legacySilo: "Limited exposure to modern agile practices, TDD, and CI/CD",
      integratedArchitecture: "Hands-on workshops in clean code, TDD, and Git workflows accelerating team velocity"
    }
  ];

  const pillars = [
    {
      title: "Agentic AI & Deterministic Governance",
      desc: "LangGraph multi-agent pipelines for SDS parsing, ECHA compliance, and RAG over multi-terabyte industrial data lakes.",
      stat: "Deterministic Rule Verification",
      icon: <Cpu className="w-5 h-5 text-blue-600 dark:text-blue-400" />
    },
    {
      title: "Full-Stack & Sub-Millisecond Compute",
      desc: "Engineered responsive Next.js 15 web applications and client-side Rust/WASM microservices for real-time physics curve regression.",
      stat: "1.8 ms WASM Latency",
      icon: <FlaskConical className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
    },
    {
      title: "Enterprise FinOps & Cloud Architecture",
      desc: "Architected AWS ECS Fargate and Azure cloud platforms with Redis semantic caching, departmental quotas, and automated CI/CD.",
      stat: "€1.2M+ Direct Cost Saved",
      icon: <DollarSign className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
    },
    {
      title: "Engineering Leadership & Enablement",
      desc: "Combines M.Sc. in Computer Science with B.Tech in Chemical Engineering to bridge physical science with agile engineering culture.",
      stat: "150+ Enterprise Users",
      icon: <Users2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 xl:px-12 max-w-[1440px] mx-auto border-t border-slate-200 dark:border-surfaceBorder">
      <div className="mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 mb-3 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
          Architectural Principles & Impact
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight mb-3">
          Strategic Architecture & Value Delivery
        </h2>
        <p className="text-slate-700 dark:text-slate-300 text-sm max-w-2xl font-light">
          Bridging physical science and industrial R&D with modern distributed systems, agentic automation, and cloud cost governance.
        </p>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {pillars.map((pillar, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl bg-white dark:bg-surface border border-slate-200 dark:border-surfaceBorder shadow-sm hover:border-blue-500/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-fit mb-4">
                {pillar.icon}
              </div>
              <h3 className="text-base font-bold text-slate-950 dark:text-white mb-2 tracking-tight">
                {pillar.title}
              </h3>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-light mb-4">
                {pillar.desc}
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80">
              <span className="text-xs font-mono font-semibold text-emerald-800 dark:text-emerald-400">
                {pillar.stat}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Comparative Matrix */}
      <div className="overflow-x-auto rounded-3xl bg-white dark:bg-surface border border-slate-200 dark:border-surfaceBorder shadow-md">
        <table className="w-full text-left text-xs text-slate-800 dark:text-slate-200">
          <thead className="bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-400 uppercase font-mono text-[11px] border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="p-4 sm:p-5 font-bold">Engineering Dimension</th>
              <th className="p-4 sm:p-5 hidden md:table-cell text-slate-600 dark:text-slate-400">Generic Software Stack</th>
              <th className="p-4 sm:p-5 hidden md:table-cell text-slate-600 dark:text-slate-400">Legacy Domain Silo</th>
              <th className="p-4 sm:p-5 bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 font-bold border-l border-blue-200 dark:border-blue-900/50">
                Integrated AI Systems Architecture
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {comparisonData.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50/60 dark:hover:bg-slate-900/40 transition-colors">
                <td className="p-4 sm:p-5 font-semibold text-slate-950 dark:text-white">
                  {row.capability}
                </td>
                <td className="p-4 sm:p-5 hidden md:table-cell text-slate-600 dark:text-slate-400">
                  <div className="flex items-start gap-1.5">
                    <X className="w-3.5 h-3.5 text-rose-500 dark:text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>{row.genericStack}</span>
                  </div>
                </td>
                <td className="p-4 sm:p-5 hidden md:table-cell text-slate-600 dark:text-slate-400">
                  <div className="flex items-start gap-1.5">
                    <X className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                    <span>{row.legacySilo}</span>
                  </div>
                </td>
                <td className="p-4 sm:p-5 bg-blue-50/40 dark:bg-blue-950/20 border-l border-blue-200 dark:border-blue-900/40 text-blue-950 dark:text-blue-200 font-medium">
                  <div className="flex items-start gap-1.5">
                    <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>{row.integratedArchitecture}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
