"use client";

import React, { useState } from "react";
import { BookOpen, X, Scale, BrainCircuit, Cloud, Wrench } from "lucide-react";

interface GlossaryEntry {
  abbr: string;
  full: string;
}

interface GlossaryGroup {
  title: string;
  icon: React.ReactNode;
  entries: GlossaryEntry[];
}

const GLOSSARY_GROUPS: GlossaryGroup[] = [
  {
    title: "Regulatory & Compliance",
    icon: <Scale className="w-4 h-4 text-blue-600 dark:text-blue-400" />,
    entries: [
      { abbr: "REACH", full: "Registration, Evaluation, Authorisation and Restriction of Chemicals (EU regulation)" },
      { abbr: "SVHC", full: "Substances of Very High Concern (ECHA Candidate List)" },
      { abbr: "SDS", full: "Safety Data Sheet" },
      { abbr: "ECHA", full: "European Chemicals Agency" },
      { abbr: "GHS", full: "Globally Harmonized System of Classification and Labelling of Chemicals" },
      { abbr: "PBT", full: "Persistent, Bioaccumulative and Toxic" },
      { abbr: "PFAS", full: "Per- and Polyfluoroalkyl Substances" },
      { abbr: "RoHS", full: "Restriction of Hazardous Substances (EU directive)" },
      { abbr: "CAS", full: "Chemical Abstracts Service registry number" },
      { abbr: "HIPAA", full: "Health Insurance Portability and Accountability Act (US health privacy law)" }
    ]
  },
  {
    title: "AI & Machine Learning",
    icon: <BrainCircuit className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />,
    entries: [
      { abbr: "LLM", full: "Large Language Model" },
      { abbr: "GPT", full: "Generative Pre-trained Transformer" },
      { abbr: "RAG", full: "Retrieval-Augmented Generation" },
      { abbr: "FAISS", full: "Facebook AI Similarity Search (vector search library)" },
      { abbr: "NLP", full: "Natural Language Processing" },
      { abbr: "NER", full: "Named Entity Recognition" },
      { abbr: "OCR", full: "Optical Character Recognition" },
      { abbr: "RCFA", full: "Root Cause Failure Analysis" }
    ]
  },
  {
    title: "Cloud & Infrastructure",
    icon: <Cloud className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />,
    entries: [
      { abbr: "ECS", full: "Amazon Elastic Container Service" },
      { abbr: "ECR", full: "Amazon Elastic Container Registry" },
      { abbr: "RDS", full: "Amazon Relational Database Service" },
      { abbr: "S3", full: "Amazon Simple Storage Service" },
      { abbr: "ALB", full: "Application Load Balancer" },
      { abbr: "SLA", full: "Service Level Agreement" },
      { abbr: "CI/CD", full: "Continuous Integration / Continuous Delivery" },
      { abbr: "API", full: "Application Programming Interface" }
    ]
  },
  {
    title: "Engineering & Standards",
    icon: <Wrench className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
    entries: [
      { abbr: "WASM", full: "WebAssembly (near-native code in the browser)" },
      { abbr: "ISO 527", full: "International standard for tensile testing of plastics" },
      { abbr: "ASTM", full: "American Society for Testing and Materials" },
      { abbr: "SKU", full: "Stock Keeping Unit" },
      { abbr: "RDDR", full: "R&D Data Registry (enterprise research data platform)" },
      { abbr: "ODIS", full: "Ontology-based enterprise search system" }
    ]
  }
];

export default function GlossaryModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-blue-700 dark:hover:text-cyan-300 hover:bg-slate-200/70 dark:hover:bg-slate-800 transition-colors"
        title="Full forms of every abbreviation used on this site"
        aria-label="Open abbreviations glossary"
      >
        <BookOpen className="w-3.5 h-3.5" />
        <span>Abbreviations &amp; Glossary</span>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Abbreviations and glossary"
        >
          <div
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl bg-white dark:bg-[#0a1120] border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 mb-2.5 shadow-xs">
                  <BookOpen className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                  Full transparency
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                  Abbreviations &amp; Glossary
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm font-light mt-1">
                  Every acronym used on this site, expanded in plain language.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 transition-colors flex-shrink-0"
                aria-label="Close glossary"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Groups */}
            <div className="space-y-6">
              {GLOSSARY_GROUPS.map((group, gIdx) => (
                <div key={gIdx}>
                  <div className="flex items-center gap-2 mb-2.5">
                    <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      {group.icon}
                    </div>
                    <h4 className="text-sm font-bold text-slate-950 dark:text-white tracking-tight">
                      {group.title}
                    </h4>
                  </div>
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                    {group.entries.map((entry, eIdx) => (
                      <div
                        key={eIdx}
                        className="flex items-baseline gap-2.5 px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800/80"
                      >
                        <dt className="text-[11px] font-mono font-bold text-blue-700 dark:text-cyan-300 flex-shrink-0 min-w-[3.2rem]">
                          {entry.abbr}
                        </dt>
                        <dd className="text-xs text-slate-700 dark:text-slate-300 font-light leading-snug">
                          {entry.full}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
