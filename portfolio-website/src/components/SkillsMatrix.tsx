"use client";

import React, { useState } from "react";
import { CANDIDATE_PROFILE } from "@/data/portfolio_data";
import { Bot, Code2, Cloud, Database, FlaskConical, CheckCircle, Sparkles } from "lucide-react";

export default function SkillsMatrix() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const categoryIcons: Record<string, React.ReactNode> = {
    "Enterprise AI & LLM Systems": <Bot className="w-5 h-5 text-blue-400" />,
    "Full-Stack & High-Performance Engineering": <Code2 className="w-5 h-5 text-cyan-400" />,
    "Cloud, DevOps & Production Infrastructure": <Cloud className="w-5 h-5 text-indigo-400" />,
    "Data Engineering & Modern Databases": <Database className="w-5 h-5 text-emerald-400" />,
    "Domain Science & Regulatory Digitalization": <FlaskConical className="w-5 h-5 text-amber-400" />
  };

  const filteredCategories =
    selectedCategory === "ALL"
      ? CANDIDATE_PROFILE.skillCategories
      : CANDIDATE_PROFILE.skillCategories.filter((cat) => cat.category === selectedCategory);

  return (
    <section id="skills" className="py-16 px-6 max-w-7xl mx-auto border-t border-surfaceBorder">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-mono font-medium bg-blue-950/70 border border-blue-800 text-blue-300 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            Core Competencies & Proficiencies
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Technical Architecture & Skills Matrix
          </h2>
          <p className="text-gray-400 text-sm max-w-2xl font-light mt-1">
            Proven mastery across the entire digital lifecycle: from polymer chemistry and lab testing to multi-agent LLM systems and cloud infrastructure.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory("ALL")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              selectedCategory === "ALL"
                ? "bg-blue-600 text-white shadow"
                : "bg-surface border border-surfaceBorder text-gray-400 hover:text-white"
            }`}
          >
            All Disciplines
          </button>
          {CANDIDATE_PROFILE.skillCategories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(cat.category)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedCategory === cat.category
                  ? "bg-blue-600 text-white shadow"
                  : "bg-surface border border-surfaceBorder text-gray-400 hover:text-white"
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
            className="rounded-2xl bg-surface border border-surfaceBorder p-6 hover:border-blue-500/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-xl bg-gray-900 border border-gray-800">
                  {categoryIcons[cat.category] || <Sparkles className="w-5 h-5 text-blue-400" />}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight leading-snug">
                    {cat.category}
                  </h3>
                </div>
              </div>

              <p className="text-xs text-gray-400 mb-5 leading-relaxed font-light">
                {cat.description}
              </p>

              {/* Skills List */}
              <div className="space-y-2">
                {cat.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className={`flex items-center gap-2 p-2 rounded-lg text-xs transition-colors ${
                      skill.highlight
                        ? "bg-blue-950/40 border border-blue-900/60 text-blue-200 font-medium"
                        : "bg-gray-900/50 border border-gray-800/80 text-gray-300"
                    }`}
                  >
                    <CheckCircle
                      className={`w-3.5 h-3.5 flex-shrink-0 ${
                        skill.highlight ? "text-blue-400" : "text-gray-500"
                      }`}
                    />
                    <span className="truncate">{skill.name}</span>
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
