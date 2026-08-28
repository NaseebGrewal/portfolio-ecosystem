import React from "react";
import { Project } from "@/data/portfolio_data";
import { Github, ExternalLink, Cpu, CheckCircle2, DollarSign, FolderGit2 } from "lucide-react";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="rounded-3xl bg-white dark:bg-surface border border-gray-200 dark:border-surfaceBorder p-6 sm:p-8 flex flex-col justify-between hover:border-blue-500/50 hover:shadow-xl dark:hover:shadow-blue-900/10 transition-all duration-300">
      <div>
        {/* Category & Cost Badge */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800/60 text-blue-700 dark:text-blue-300">
            {project.category}
          </span>
          {project.vendorCostSaved && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300">
              <DollarSign className="w-3 h-3" />
              {project.vendorCostSaved} Saved
            </span>
          )}
        </div>

        {/* Title & Tagline */}
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
          {project.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 font-light leading-relaxed">
          {project.tagline}
        </p>

        {/* Business ROI Box */}
        <div className="p-3.5 rounded-2xl bg-emerald-50/50 dark:bg-gray-900/80 border border-emerald-100 dark:border-gray-800 text-xs text-gray-800 dark:text-gray-300 mb-5 leading-relaxed">
          <strong className="text-emerald-700 dark:text-emerald-400 font-semibold">Executive ROI: </strong>
          {project.businessImpact}
        </div>

        {/* Architecture Highlights */}
        <div className="space-y-2 mb-6">
          <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider font-mono">
            Key Architecture Highlights
          </div>
          {project.architectureHighlights.map((highlight, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <span>{highlight}</span>
            </div>
          ))}
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-2 mb-6 p-3 rounded-2xl bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800">
          {project.metrics.map((m, idx) => (
            <div key={idx} className="text-center">
              <div className="text-[11px] text-gray-500 dark:text-gray-400 mb-0.5">{m.label}</div>
              <div className="text-sm font-bold text-blue-700 dark:text-blue-300 font-mono">{m.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.stack.map((t, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 text-[11px] font-mono rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2 px-3 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-medium flex items-center justify-center gap-2 transition-all border border-gray-200 dark:border-gray-700"
          >
            <Github className="w-4 h-4" />
            <span>Monorepo Source</span>
          </a>
          {project.liveDemoUrl && (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 dark:bg-blue-600/20 dark:hover:bg-blue-600/30 border border-blue-200 dark:border-blue-500/30 text-blue-700 dark:text-blue-300 text-xs font-medium flex items-center justify-center gap-1.5 transition-all"
            >
              <span>Live Sandbox</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
