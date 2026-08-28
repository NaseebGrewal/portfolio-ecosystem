"use client";

import React, { useState, useMemo } from "react";
import { ENTERPRISE_SYSTEMS_CATALOG, CatalogProject } from "@/data/portfolio_data";
import {
  Layers,
  Search,
  Filter,
  CheckCircle2,
  ExternalLink,
  Github,
  Sparkles,
  Zap,
  FolderGit2,
  Building2,
  Award,
  ShieldCheck,
  Cpu
} from "lucide-react";

type CategoryFilter = "All" | "GenAI & Multi-Agent" | "Full-Stack Cloud & R&D OS" | "High-Performance & ML" | "Enterprise Infrastructure";
type DomainFilter = "All" | "Chemicals & Materials" | "Automotive & Industrial" | "Life Sciences & Pharma" | "FinTech & Compliance";

export default function EnterpriseProjectCatalog() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("All");
  const [selectedDomain, setSelectedDomain] = useState<DomainFilter>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories: CategoryFilter[] = [
    "All",
    "GenAI & Multi-Agent",
    "Full-Stack Cloud & R&D OS",
    "High-Performance & ML",
    "Enterprise Infrastructure"
  ];

  const domains: DomainFilter[] = [
    "All",
    "Chemicals & Materials",
    "Automotive & Industrial",
    "Life Sciences & Pharma",
    "FinTech & Compliance"
  ];

  const filteredProjects = useMemo(() => {
    return ENTERPRISE_SYSTEMS_CATALOG.filter((project) => {
      const matchesCategory =
        selectedCategory === "All" || project.category === selectedCategory;
      const matchesDomain =
        selectedDomain === "All" || project.domain === selectedDomain;
      const matchesSearch =
        searchQuery === "" ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.problemSolved.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.stack.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesDomain && matchesSearch;
    });
  }, [selectedCategory, selectedDomain, searchQuery]);

  const getDisciplineBadgeStyle = (category: CatalogProject["category"]) => {
    switch (category) {
      case "GenAI & Multi-Agent":
        return "bg-blue-50 dark:bg-blue-950/80 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-cyan-300";
      case "Full-Stack Cloud & R&D OS":
        return "bg-emerald-50 dark:bg-emerald-950/80 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300";
      case "High-Performance & ML":
        return "bg-purple-50 dark:bg-purple-950/80 border-purple-200 dark:border-purple-800 text-purple-800 dark:text-purple-300";
      case "Enterprise Infrastructure":
        return "bg-amber-50 dark:bg-amber-950/80 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300";
      default:
        return "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-300";
    }
  };

  return (
    <section id="catalog" className="py-16 px-6 max-w-7xl mx-auto border-t border-slate-200 dark:border-surfaceBorder">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 mb-3 shadow-xs">
          <Layers className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          Enterprise Systems & Delivery Portfolio
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight mb-3">
          Complete Systems & Engineering Catalog
        </h2>
        <p className="text-slate-600 dark:text-gray-400 text-sm max-w-3xl font-light">
          A comprehensive catalog of production systems, research breakthroughs, and enterprise tools architected across <strong>Chemicals, Automotive Plants, Cement, and Life Sciences</strong>, categorized with architectural discipline tags.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-5 rounded-3xl bg-white dark:bg-surface border border-slate-200 dark:border-surfaceBorder shadow-md mb-8 space-y-4">
        {/* Category Tabs */}
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2 block font-bold">
            Category Architecture Filter:
          </span>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white shadow-sm font-semibold"
                    : "bg-slate-100 dark:bg-gray-900 hover:bg-slate-200 dark:hover:bg-gray-800 text-slate-700 dark:text-gray-300 border border-slate-200 dark:border-gray-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Domain Filter + Search */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-gray-800/80">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-slate-500 dark:text-gray-400 font-mono mr-1">Domain:</span>
            {domains.map((dom) => (
              <button
                key={dom}
                onClick={() => setSelectedDomain(dom)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all ${
                  selectedDomain === dom
                    ? "bg-slate-950 dark:bg-slate-100 text-white dark:text-slate-950 font-bold"
                    : "bg-transparent text-slate-600 dark:text-gray-400 hover:text-slate-950 dark:hover:text-white"
                }`}
              >
                {dom}
              </button>
            ))}
          </div>

          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tech stack, problem, or title..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-gray-950 border border-slate-200 dark:border-gray-800 text-slate-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-xs"
            />
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="rounded-3xl bg-white dark:bg-surface border border-slate-200 dark:border-surfaceBorder p-6 flex flex-col justify-between hover:border-blue-500/50 hover:shadow-xl dark:hover:shadow-blue-900/10 transition-all duration-200"
          >
            <div>
              {/* Discipline Badge & Domain */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold border ${getDisciplineBadgeStyle(
                    project.category
                  )}`}
                >
                  {project.disciplineBadge}
                </span>
                <span className="text-[11px] font-mono text-slate-500 dark:text-gray-400 font-medium">
                  {project.domain}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-2 tracking-tight">
                {project.title}
              </h3>

              {/* Problem Solved */}
              <p className="text-xs text-slate-600 dark:text-gray-300 mb-4 leading-relaxed font-light">
                {project.problemSolved}
              </p>

              {/* Architecture Highlights */}
              <div className="space-y-1.5 mb-5 p-3.5 rounded-2xl bg-slate-50 dark:bg-gray-950 border border-slate-100 dark:border-gray-800">
                <span className="text-[10px] font-mono uppercase font-bold text-slate-500 dark:text-gray-400 tracking-wider block mb-1">
                  Key System Architecture
                </span>
                {project.architectureHighlights.map((hl, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-800 dark:text-gray-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>

              {/* Executive Business ROI */}
              <div className="mb-4 text-xs font-light text-emerald-900 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 p-3 rounded-2xl">
                <strong className="font-semibold text-emerald-950 dark:text-emerald-200">Impact: </strong>
                {project.businessImpact}
              </div>
            </div>

            <div>
              {/* Tech Stack Chips */}
              <div className="flex flex-wrap gap-1 mb-5">
                {project.stack.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-100 dark:bg-gray-800 text-slate-700 dark:text-gray-300 border border-slate-200 dark:border-gray-700 font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Action Links */}
              <div className="pt-3 border-t border-slate-100 dark:border-gray-800 flex items-center justify-between gap-2">
                {project.sourcePath ? (
                  <span className="text-[10px] font-mono text-slate-500 dark:text-gray-400 truncate flex items-center gap-1" title={project.sourcePath}>
                    <FolderGit2 className="w-3 h-3 text-slate-400" />
                    {project.sourcePath}
                  </span>
                ) : (
                  <span className="text-[10px] font-mono text-slate-400 dark:text-gray-500 font-medium">Enterprise Solution</span>
                )}

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {project.isInteractive && (
                    <a
                      href="#interactive-demo"
                      className="px-3 py-1 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-semibold flex items-center gap-1 transition-colors shadow-xs"
                    >
                      <Cpu className="w-3 h-3" />
                      <span>Live Sandbox</span>
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-xl bg-slate-100 dark:bg-gray-800 hover:bg-slate-200 dark:hover:bg-gray-700 text-slate-700 dark:text-gray-300 transition-colors border border-slate-200 dark:border-gray-700"
                      title="View GitHub Repository / Subdirectory"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12 text-slate-500 dark:text-gray-400 font-mono text-xs">
          No projects matching your search criteria. Try adjusting the category or domain filters.
        </div>
      )}
    </section>
  );
}
