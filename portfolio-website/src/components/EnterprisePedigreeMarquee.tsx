"use client";

import React, { useState } from "react";
import { ENTERPRISE_PEDIGREE, EnterpriseCompany } from "@/data/portfolio_data";
import { Sparkles, CheckCircle2, Building2 } from "lucide-react";

export default function EnterprisePedigreeMarquee() {
  const [activeCompany, setActiveCompany] = useState<EnterpriseCompany | null>(null);

  // Duplicate items to ensure seamless infinite looping track
  const marqueeItems = [...ENTERPRISE_PEDIGREE, ...ENTERPRISE_PEDIGREE];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 xl:px-12 max-w-[1440px] mx-auto border-t border-slate-200 dark:border-surfaceBorder">
      <div className="rounded-3xl bg-white dark:bg-surface border border-slate-200 dark:border-surfaceBorder shadow-md p-6 sm:p-8 overflow-hidden">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-700 dark:text-blue-400 uppercase tracking-widest font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ORGANIZATIONS & TRACK RECORD</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight mt-1">
              Engineering Leadership & Industry Track Record
            </h3>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-xl self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>7 Organizations</span>
          </div>
        </div>

        {/* Continuous Moving Infinite Marquee Strip */}
        <div className="relative w-full overflow-hidden py-4 mask-gradient">
          {/* Subtle Left & Right Gradient Shadows for seamless fade edge */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-white dark:from-surface to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-white dark:from-surface to-transparent z-10" />

          {/* Marquee Track */}
          <div className="animate-marquee flex items-center gap-5 sm:gap-7 py-2">
            {marqueeItems.map((company, index) => {
              const isSelected = activeCompany?.id === company.id;
              return (
                <div
                  key={`${company.id}-${index}`}
                  onMouseEnter={() => setActiveCompany(company)}
                  onClick={() => setActiveCompany(company)}
                  className={`flex-shrink-0 cursor-pointer transition-all duration-300 flex items-center justify-center px-4 py-2 rounded-2xl border ${
                    isSelected
                      ? "bg-white dark:bg-slate-900 border-blue-500 shadow-md scale-105"
                      : "bg-white/95 dark:bg-slate-900/95 hover:bg-white dark:hover:bg-slate-900 border-slate-200/90 dark:border-slate-800 shadow-xs hover:border-blue-400 dark:hover:border-blue-500 hover:scale-105"
                  }`}
                  style={{ minWidth: "155px", height: "62px" }}
                  title={`${company.name} - ${company.subtitle}`}
                >
                  <img
                    src={company.logoPath}
                    alt={`${company.name} logo`}
                    className="h-8 sm:h-9 w-auto max-w-[135px] object-contain transition-transform"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = "none";
                      const fallback = target.parentElement?.querySelector(".logo-fallback");
                      if (fallback) (fallback as HTMLElement).style.display = "inline";
                    }}
                  />
                  <span className="logo-fallback hidden font-mono font-bold text-xs text-slate-900 dark:text-white">
                    {company.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive Impact Callout / Hover Details */}
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
          {activeCompany ? (
            <div className="p-4 rounded-2xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 animate-fadeIn">
              <div className="flex items-start md:items-center gap-3">
                <div className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex-shrink-0 flex items-center justify-center">
                  <img
                    src={activeCompany.logoPath}
                    alt={`${activeCompany.name} logo`}
                    className="h-6 w-auto max-w-[105px] object-contain"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-slate-950 dark:text-white">
                      {activeCompany.name}
                    </span>
                    <span className="text-[11px] font-mono font-medium text-blue-700 dark:text-cyan-300 bg-blue-100/70 dark:bg-blue-900/60 px-2 py-0.5 rounded-md">
                      {activeCompany.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-800 dark:text-slate-200 font-light mt-1 leading-relaxed">
                    {activeCompany.impactHighlight}
                  </p>
                </div>
              </div>

              <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-950 px-3 py-1 rounded-xl border border-slate-200 dark:border-slate-800 flex-shrink-0 self-start md:self-auto">
                {activeCompany.subtitle}
              </div>
            </div>
          ) : (
            <div className="text-center text-xs text-slate-500 dark:text-slate-400 font-mono py-1">
              Hover over or tap any organization above to inspect candidate role, technologies, and delivered business impact.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
