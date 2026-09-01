"use client";

import React, { useState } from "react";
import { CANDIDATE_PROFILE } from "@/data/portfolio_data";
import { Bot, Code2, Cloud, Database, FlaskConical, Sparkles, Info, X } from "lucide-react";

// Compact, uniform proof codes so every skill chip stays the same visual weight.
// Full project name remains available as hover tooltip on the chip.
const PROOF_CODE_MAP: Record<string, string> = {
  "01 Materials": "P1",
  "02 ChemAgent": "P2",
  "03 Rheology": "P3",
  "04 AI Gateway": "P4",
  "05 Doc Intelligence": "P5",
  "All backends": "All",
  "All services": "All",
  "Portfolio site": "Web",
  "Plant RCFA": "RCFA",
  "Patent search": "IP",
  "Monorepo": "Mono",
  "Lab Orders": "Lab",
  "Data Lake tab": "Lake",
  "Predictive Maint.": "PdM",
  "Cement ML": "Cem",
  "Leadership": "Lead"
};

const PROOF_LEGEND: Array<{ code: string; meaning: string }> = [
  { code: "P1", meaning: "Materials Intelligence Platform" },
  { code: "P2", meaning: "ChemAgent SDS Compliance" },
  { code: "P3", meaning: "Rust/WASM Rheology Engine" },
  { code: "P4", meaning: "Enterprise AI Gateway (FinOps)" },
  { code: "P5", meaning: "Multimodal Document Intelligence" },
  { code: "All", meaning: "Every service in the monorepo" },
  { code: "Web", meaning: "This portfolio website" },
  { code: "RCFA", meaning: "Plant Root-Cause Failure Analysis" },
  { code: "IP", meaning: "Patent & ontology search (MarkLogic)" },
  { code: "Mono", meaning: "Monorepo CI/CD pipelines" },
  { code: "Lab", meaning: "Lab Orders platform (Continental)" },
  { code: "Lake", meaning: "AWS data lake (Glue, Athena, S3)" },
  { code: "PdM", meaning: "Predictive maintenance pipelines" },
  { code: "Cem", meaning: "Cement compressive-strength models" },
  { code: "Lead", meaning: "Cross-functional leadership programs" }
];

export default function SkillsMatrix() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [showLegend, setShowLegend] = useState(false);

  const categoryIcons: Record<string, React.ReactNode> = {
    "Enterprise AI & Multi-Agent Systems": <Bot className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
    "Full-Stack & High-Performance Engineering": <Code2 className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />,
    "Cloud Architecture, DevOps & Infrastructure": <Cloud className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
    "Data Engineering & Enterprise Databases": <Database className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    "Industrial Domain Science & Digitalization": <FlaskConical className="w-5 h-5 text-amber-600 dark:text-amber-400" />
  };

  const filteredCategories =
    selectedCategory === "ALL"
      ? CANDIDATE_PROFILE.skillCategories
      : CANDIDATE_PROFILE.skillCategories.filter((cat) => cat.category === selectedCategory);

  return (
    <section id="skills" className="py-16 px-4 sm:px-6 lg:px-8 xl:px-12 max-w-[1440px] mx-auto border-t border-slate-200 dark:border-surfaceBorder">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
            Core Competencies & Architecture Matrix
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Technical Skills & Architecture Matrix
          </h2>
          <p className="text-slate-700 dark:text-slate-300 text-sm max-w-2xl font-light mt-1">
            Proven mastery across the full digital lifecycle, from polymer physics and plant telemetry to multi-agent LLM systems and distributed cloud infrastructure. Every chip maps to a shipped system; acronyms are expanded at first use: LangGraph (multi-agent graphs), FAISS (vector search), RAG (retrieval-augmented generation).
          </p>
        </div>

        {/* Filter Pills + Badge Legend — full-width stacked row on mobile */}
        <div className="relative flex flex-wrap items-center gap-2 max-md:w-full max-md:justify-start">
          <button
            onClick={() => setSelectedCategory("ALL")}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              selectedCategory === "ALL"
                ? "bg-blue-600 text-white shadow-sm font-semibold"
                : "bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800"
            }`}
          >
            All Disciplines
          </button>
          {CANDIDATE_PROFILE.skillCategories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(cat.category)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedCategory === cat.category
                  ? "bg-blue-600 text-white shadow-sm font-semibold"
                  : "bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800"
              }`}
            >
              {cat.category.split(" ")[0]}
            </button>
          ))}

          {/* Legend info toggle — explains the compact P1-P5 / context codes on each chip */}
          <button
            type="button"
            onClick={() => setShowLegend((prev) => !prev)}
            className={`p-1.5 rounded-lg transition-all ${
              showLegend
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800"
            }`}
            title="What do the P1-P5 and short codes on each chip mean?"
            aria-label="Toggle proof badge legend"
            aria-expanded={showLegend}
          >
            <Info className="w-3.5 h-3.5" />
          </button>

          {showLegend && (
            <div className="absolute right-0 top-full mt-2 z-30 w-72 sm:w-80 rounded-2xl bg-white dark:bg-[#0a1120] border border-slate-200 dark:border-slate-800 shadow-2xl p-4">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-blue-700 dark:text-cyan-300">
                  Badge legend
                </span>
                <button
                  type="button"
                  onClick={() => setShowLegend(false)}
                  className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
                  aria-label="Close legend"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="grid grid-cols-1 gap-1 max-h-64 overflow-y-auto pr-1">
                {PROOF_LEGEND.map((item, lIdx) => (
                  <div key={lIdx} className="flex items-center gap-2.5 px-2 py-1 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900/60">
                    <span className="inline-flex items-center justify-center min-w-[2.4rem] px-1 py-0.5 rounded text-[9px] font-mono font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 flex-shrink-0">
                      {item.code}
                    </span>
                    <span className="text-[11px] text-slate-700 dark:text-slate-300 font-light leading-snug">
                      {item.meaning}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((cat, idx) => (
          <div
            key={idx}
            className="rounded-3xl bg-white dark:bg-surface border border-slate-200 dark:border-surfaceBorder shadow-md p-6 sm:p-7 hover:border-blue-500/40 hover:shadow-lg dark:hover:shadow-blue-900/10 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                  {categoryIcons[cat.category] || <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-950 dark:text-white tracking-tight leading-snug">
                    {cat.category}
                  </h3>
                </div>
              </div>

              {/* Full-width rows: text flexes, badge pins right on desktop and wraps below on very small screens */}
              <div className="flex flex-col gap-1.5">
                {cat.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className={`flex w-full flex-wrap sm:flex-nowrap items-center justify-between gap-x-2 gap-y-1 px-2.5 py-1.5 rounded-lg text-[11px] font-medium border ${
                      skill.highlight
                        ? "bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900/60 text-blue-950 dark:text-blue-200"
                        : "bg-slate-50 dark:bg-slate-900/50 border-slate-100 dark:border-slate-800/80 text-slate-800 dark:text-slate-200"
                    }`}
                    title={skill.proof ? `Proven in: ${skill.proof}` : skill.name}
                  >
                    <span className="flex-1 min-w-0 basis-full sm:basis-auto leading-snug">{skill.name}</span>
                    {skill.proof && (
                      <span className="inline-flex w-auto sm:w-[3.2rem] flex-shrink-0 items-center justify-center px-1.5 sm:px-1 py-0.5 rounded text-[9px] font-mono font-semibold text-center bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
                        {PROOF_CODE_MAP[skill.proof] ?? skill.proof}
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
