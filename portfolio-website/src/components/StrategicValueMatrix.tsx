"use client";

import React from "react";
import { Sparkles, Check, X, ShieldAlert, Cpu, FlaskConical, DollarSign, Award } from "lucide-react";

export default function StrategicValueMatrix() {
  const comparisonData = [
    {
      capability: "Chemical & Polymer Formulation Science",
      typicalDev: "No domain context (treats chemical data as generic text/strings)",
      typicalChemist: "Deep domain knowledge, but manual spreadsheet/desktop tooling",
      naseeb: "B.Tech in Polymer Science & Chemical Tech; models molecular & tensile physics natively in software"
    },
    {
      capability: "REACH & ECHA Regulatory Safety",
      typicalDev: "Prone to LLM hallucinations on strict legal substance limits",
      typicalChemist: "Manual SDS review taking hours per chemical consignment",
      naseeb: "Architects deterministic multi-agent guardrails with 0% hallucination on SVHC lists"
    },
    {
      capability: "Cloud Microservices & Web Platforms",
      typicalDev: "Strong full-stack skills, but disconnect from laboratory workflows",
      typicalChemist: "No microservices or modern distributed cloud architecture",
      naseeb: "Next.js 15 + FastAPI + Rust/WASM on AWS ECS Fargate with sub-45ms P99 latency"
    },
    {
      capability: "Cost Engineering & FinOps",
      typicalDev: "Often defaults to expensive proprietary third-party SaaS licenses",
      typicalChemist: "Dependent on legacy vendor subscriptions costing €100k+/year",
      naseeb: "Eliminated €1.2M+ in vendor fees by engineering high-performance in-house platforms"
    }
  ];

  const pillars = [
    {
      title: "Agentic AI & Deterministic Governance",
      desc: "LangGraph agent swarms for chemical SDS parsing, ISO compliance, and RAG search over multi-terabyte R&D data lakes.",
      stat: "0% Hallucination on SVHC limits",
      icon: <Cpu className="w-5 h-5 text-blue-400" />
    },
    {
      title: "Full-Stack & Sub-Millisecond Compute",
      desc: "Engineered responsive Next.js 15 web applications and Rust/WASM microservices for real-time rheology curve regression.",
      stat: "1.8 ms WASM Latency",
      icon: <FlaskConical className="w-5 h-5 text-cyan-400" />
    },
    {
      title: "Enterprise FinOps & Cloud Architecture",
      desc: "Architected AWS ECS Fargate and Azure cloud platforms with semantic caching, departmental quotas, and automated CI/CD.",
      stat: "€1.2M+ Direct Cost Saved",
      icon: <DollarSign className="w-5 h-5 text-emerald-400" />
    },
    {
      title: "Dual-Domain Technical Leadership",
      desc: "Combines M.Sc. in Applied Computer Science (GenAI) with B.Tech in Chemical Engineering to bridge R&D labs with IT.",
      stat: "150+ Global R&D Users",
      icon: <Award className="w-5 h-5 text-purple-400" />
    }
  ];

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto border-t border-surfaceBorder">
      <div className="mb-12">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-mono font-medium bg-blue-950/70 border border-blue-800 text-blue-300 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          The Strategic Advantage
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
          Why This Profile Delivers Immediate High-Impact ROI
        </h2>
        <p className="text-gray-400 text-sm max-w-2xl font-light">
          Senior leadership capable of speaking the exact language of laboratory chemists while architecting enterprise cloud and agentic AI systems.
        </p>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {pillars.map((pillar, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-surface border border-surfaceBorder hover:border-blue-500/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="p-3 rounded-xl bg-gray-900 border border-gray-800 w-fit mb-4">
                {pillar.icon}
              </div>
              <h3 className="text-base font-bold text-white mb-2 tracking-tight">
                {pillar.title}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed font-light mb-4">
                {pillar.desc}
              </p>
            </div>
            <div className="pt-3 border-t border-gray-800/80">
              <span className="text-xs font-mono font-semibold text-emerald-400">
                {pillar.stat}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Comparative Matrix */}
      <div className="overflow-x-auto rounded-2xl bg-surface border border-surfaceBorder">
        <table className="w-full text-left text-xs text-gray-300">
          <thead className="bg-gray-950/80 text-gray-400 uppercase font-mono text-[11px] border-b border-gray-800">
            <tr>
              <th className="p-4 sm:p-5">Engineering Dimension</th>
              <th className="p-4 sm:p-5 hidden md:table-cell text-gray-500">Standard Web Engineer</th>
              <th className="p-4 sm:p-5 hidden md:table-cell text-gray-500">Traditional Laboratory Scientist</th>
              <th className="p-4 sm:p-5 bg-blue-950/30 text-blue-300 font-bold border-l border-blue-900/50">
                Naseeb Grewal (AI Solutions Architect)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/80">
            {comparisonData.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-900/40 transition-colors">
                <td className="p-4 sm:p-5 font-semibold text-white">
                  {row.capability}
                </td>
                <td className="p-4 sm:p-5 hidden md:table-cell text-gray-400">
                  <div className="flex items-start gap-1.5">
                    <X className="w-3.5 h-3.5 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>{row.typicalDev}</span>
                  </div>
                </td>
                <td className="p-4 sm:p-5 hidden md:table-cell text-gray-400">
                  <div className="flex items-start gap-1.5">
                    <X className="w-3.5 h-3.5 text-amber-400 mt-0.5 flex-shrink-0" />
                    <span>{row.typicalChemist}</span>
                  </div>
                </td>
                <td className="p-4 sm:p-5 bg-blue-950/20 border-l border-blue-900/40 text-blue-200 font-medium">
                  <div className="flex items-start gap-1.5">
                    <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>{row.naseeb}</span>
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
