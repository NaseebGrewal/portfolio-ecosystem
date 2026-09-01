"use client";

/**
 * UNMOUNTED ON PURPOSE. Do not import this on the homepage.
 * Roles, dates, and chronology live on LinkedIn (header icon) and the CV.
 * This site sells systems, demos, and skills — not a second résumé.
 */
import React from "react";
import { CANDIDATE_PROFILE } from "@/data/portfolio_data";
import { Briefcase, Calendar, MapPin } from "lucide-react";

export default function ExperienceTimeline() {
  return (
    <section className="pb-16 px-4 sm:px-6 lg:px-8 xl:px-12 max-w-[1440px] mx-auto">
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 mb-3">
          <Briefcase className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          Career Timeline
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
          Roles, dates, and one outcome per engagement
        </h2>
      </div>

      <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-3 md:ml-4 space-y-5">
        {CANDIDATE_PROFILE.experiences.map((exp, idx) => (
          <div key={idx} className="relative pl-6 md:pl-8">
            <div className="absolute -left-[7px] top-3 w-3 h-3 rounded-full bg-blue-600 dark:bg-cyan-400 border-2 border-white dark:border-surface" />

            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-surface border border-slate-200 dark:border-surfaceBorder">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-950 dark:text-white tracking-tight">
                    {exp.role}
                  </h3>
                  <div className="text-xs font-semibold text-blue-600 dark:text-cyan-400 mt-0.5">
                    {exp.company}
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400 font-mono flex-shrink-0">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {exp.period}
                  </span>
                  {exp.location && (
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {exp.location}
                    </span>
                  )}
                </div>
              </div>

              {exp.highlights[0] && (
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-light">
                  {exp.highlights[0]}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
