"use client";

import React from "react";
import { CANDIDATE_PROFILE } from "@/data/portfolio_data";
import { Briefcase, Calendar, MapPin, CheckCircle2, Building } from "lucide-react";

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="py-16 px-4 sm:px-6 lg:px-8 xl:px-12 max-w-[1440px] mx-auto border-t border-gray-200 dark:border-surfaceBorder">
      <div className="mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 mb-3">
          <Briefcase className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          Executive Career Timeline
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Professional Leadership & Experience
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm max-w-2xl font-light mt-1">
          A proven track record of engineering high-impact digital platforms, orchestrating multi-agent AI systems, upskilling teams in TDD/Git flow, and delivering enterprise cloud architecture.
        </p>
      </div>

      <div className="relative border-l-2 border-gray-200 dark:border-gray-800 ml-4 md:ml-6 space-y-12">
        {CANDIDATE_PROFILE.experiences.map((exp, idx) => (
          <div key={idx} className="relative pl-6 md:pl-10">
            {/* Timeline node icon */}
            <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-white dark:bg-surface border-2 border-blue-500 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-md">
              <Building className="w-3.5 h-3.5" />
            </div>

            {/* Experience Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-surface border border-gray-200 dark:border-surfaceBorder shadow-md hover:border-blue-500/40 transition-all">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-4 pb-4 border-b border-gray-100 dark:border-gray-800">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                      {exp.role}
                    </h3>
                    {exp.badge && (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                        {exp.badge}
                      </span>
                    )}
                  </div>
                  <div className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                    {exp.company}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400 font-mono">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    <span>{exp.period}</span>
                  </div>
                </div>
              </div>

              {/* Highlights */}
              <div className="space-y-3 mb-6">
                {exp.highlights.map((hl, hIdx) => (
                  <div key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap items-center gap-1.5 pt-4 border-t border-gray-100 dark:border-gray-800/80">
                <span className="text-[11px] font-mono text-gray-500 mr-1">Key Tech:</span>
                {exp.technologies.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2 py-0.5 rounded text-[11px] font-mono bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300"
                  >
                    {tech}
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
