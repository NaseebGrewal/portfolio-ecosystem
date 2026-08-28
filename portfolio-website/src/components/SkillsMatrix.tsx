"use client";

import React, { useState } from "react";
import { CANDIDATE_PROFILE } from "@/data/portfolio_data";
import { Bot, Code2, Cloud, Database, FlaskConical, CheckCircle2, Sparkles } from "lucide-react";

export default function SkillsMatrix() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

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
    <section id="skills" className="py-16 px-6 max-w-7xl mx-auto border-t border-slate-200 dark:border-surfaceBorder">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
            Core Competencies & Architecture Matrix
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Technical Architecture & Skills Matrix
          </h2>
          <p className="text-slate-700 dark:text-slate-300 text-sm max-w-2xl font-light mt-1">
            Proven mastery across the entire digital lifecycle: from polymer physics and plant telemetry to multi-agent LLM systems and distributed cloud infrastructure.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
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

              <p className="text-xs text-slate-700 dark:text-slate-300 mb-5 leading-relaxed font-light">
                {cat.description}
              </p>

              {/* Skills List */}
              <div className="space-y-2">
                {cat.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className={`flex items-center gap-2 p-2.5 rounded-xl text-xs transition-colors ${
                      skill.highlight
                        ? "bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-blue-950 dark:text-blue-200 font-medium shadow-xs"
                        : "bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800/80 text-slate-800 dark:text-slate-200"
                    }`}
                  >
                    <CheckCircle2
                      className={`w-3.5 h-3.5 flex-shrink-0 ${
                        skill.highlight ? "text-blue-600 dark:text-cyan-400" : "text-slate-400 dark:text-slate-500"
                      }`}
                    />
                    <span className="truncate font-medium">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
