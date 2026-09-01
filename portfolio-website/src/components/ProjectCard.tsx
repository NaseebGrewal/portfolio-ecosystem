import React from "react";
import { Project } from "@/data/portfolio_data";
import { Github, ExternalLink, CheckCircle2, DollarSign, AlertTriangle } from "lucide-react";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="rounded-3xl bg-white dark:bg-surface border border-slate-200 dark:border-surfaceBorder p-6 sm:p-8 flex flex-col justify-between hover:border-blue-500/50 hover:shadow-xl dark:hover:shadow-blue-900/10 transition-all duration-300">
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
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white mb-2 tracking-tight">
          {project.title}
        </h3>
        <p className="text-sm text-slate-700 dark:text-slate-300 mb-4 font-light leading-relaxed">
          {project.tagline}
        </p>

        {/* Business Problem & ROI Box — leads the card (Problem → Cost → Result) */}
        <div className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-slate-900/80 border border-emerald-200/80 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 mb-5 leading-relaxed">
          <strong className="text-emerald-700 dark:text-emerald-400 font-semibold">Business Impact: </strong>
          {project.businessImpact}
        </div>

        {/* Architecture Highlights */}
        <div className="space-y-2 mb-5">
          <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider font-mono">
            How it works
          </div>
          {project.architectureHighlights.map((highlight, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-slate-800 dark:text-slate-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <span>{highlight}</span>
            </div>
          ))}
        </div>

        {/* Limitations & Failure Modes — senior-engineer signal */}
        {project.limitations && (
          <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-800/40 text-xs text-amber-900 dark:text-amber-200 mb-5 leading-relaxed">
            <div className="flex items-center gap-1.5 mb-1 font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider font-mono text-[10px]">
              <AlertTriangle className="w-3.5 h-3.5" />
              Limits
            </div>
            {project.limitations}
          </div>
        )}

        {/* Metrics Grid — stays 3-up on desktop, relaxes to stacked rows on very small screens */}
        <div className="grid grid-cols-3 max-[380px]:grid-cols-1 gap-2 mb-6 p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
          {project.metrics.map((m, idx) => (
            <div key={idx} className="text-center max-[380px]:flex max-[380px]:items-center max-[380px]:justify-between max-[380px]:px-2">
              <div className="text-[11px] text-slate-600 dark:text-slate-400 mb-0.5 max-[380px]:mb-0 font-medium">{m.label}</div>
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
              className="px-2 py-0.5 text-[11px] font-mono rounded-md bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-medium flex items-center justify-center gap-2 transition-all border border-slate-200 dark:border-slate-700 shadow-xs"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </a>
          {project.frontendUrl && (
            <a
              href={project.frontendUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-600/20 dark:hover:bg-emerald-600/30 border border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-medium flex items-center justify-center gap-1.5 transition-all shadow-xs"
            >
              <span>Live App</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          {project.liveDemoUrl && (
            <a
              href={project.liveDemoUrl}
              target={project.liveDemoUrl.startsWith("http") ? "_blank" : undefined}
              rel={project.liveDemoUrl.startsWith("http") ? "noopener noreferrer" : undefined}
              className="py-2 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 dark:bg-blue-600/20 dark:hover:bg-blue-600/30 border border-blue-200 dark:border-blue-500/30 text-blue-700 dark:text-blue-300 text-xs font-medium flex items-center justify-center gap-1.5 transition-all shadow-xs"
            >
              <span>{project.liveDemoUrl.startsWith("http") ? "Live API Docs" : "Live Sandbox"}</span>
              {project.liveDemoUrl.startsWith("http") && <ExternalLink className="w-3.5 h-3.5" />}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
