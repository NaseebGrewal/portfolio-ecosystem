"use client";

import React from "react";
import { CANDIDATE_PROFILE } from "@/data/portfolio_data";
import {
  GraduationCap,
  Award,
  CheckCircle,
  ExternalLink,
  ShieldCheck,
  Users2,
  Code2
} from "lucide-react";

export default function ExecutiveCredentialsBar() {
  return (
    <section id="credentials" className="py-12 px-4 sm:px-6 lg:px-8 xl:px-12 max-w-[1440px] mx-auto border-t border-slate-200 dark:border-surfaceBorder">
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-surface border border-slate-200 dark:border-surfaceBorder shadow-md">
        {/* Title Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <span className="text-[11px] font-mono text-blue-700 dark:text-cyan-400 uppercase tracking-wider font-semibold">
              Academic & Industry Credentials
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Academic Foundations, Certifications & Engineering Practices
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 px-3 py-1.5 rounded-xl w-fit">
            <ShieldCheck className="w-4 h-4" />
            <span>Verified Qualifications</span>
          </div>
        </div>

        {/* 3-Column Compact Executive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Column 1: Academic Degrees */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-slate-600 dark:text-slate-400 mb-3 uppercase tracking-wider">
              <GraduationCap className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span>Academic Foundations</span>
            </div>
            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-gray-950 border border-slate-200 dark:border-gray-800">
                <div className="text-xs font-bold text-slate-950 dark:text-white mb-0.5">
                  M.Sc. in Applied Computer Science
                </div>
                <div className="text-[11px] text-blue-700 dark:text-blue-300 font-medium">
                  Generative AI & Cloud Distributed Systems
                </div>
                <div className="text-[10px] text-slate-600 dark:text-slate-400 font-light mt-1">
                  Specialization: Multi-Modal LLMs & Code Quality Verification
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-gray-950 border border-slate-200 dark:border-gray-800">
                <div className="text-xs font-bold text-slate-950 dark:text-white mb-0.5">
                  B.Tech. in Polymer Science & Chemical Tech
                </div>
                <div className="text-[11px] text-cyan-700 dark:text-cyan-300 font-medium">
                  Polymer Chemistry, Rheology & Chemical Plants
                </div>
                <div className="text-[10px] text-slate-600 dark:text-slate-400 font-light mt-1">
                  Core Foundations: Thermodynamics & Physical Science
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Certifications */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">
              <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Cloud & AI Certifications</span>
            </div>
            <div className="space-y-2">
              {CANDIDATE_PROFILE.certifications.map((cert, idx) => (
                <a
                  key={idx}
                  href={cert.badgeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 hover:border-emerald-500/50 flex items-center justify-between text-xs text-gray-700 dark:text-gray-300 transition-all group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                    <span className="truncate font-medium text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">
                      {cert.name}
                    </span>
                  </div>
                  <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 flex-shrink-0 ml-1.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 3: Engineering Leadership & Modern Delivery */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">
              <Users2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Engineering Leadership & Culture</span>
            </div>
            <div className="space-y-2.5">
              {CANDIDATE_PROFILE.leadershipPractices.slice(0, 3).map((lp, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800"
                >
                  <div className="text-xs font-bold text-gray-900 dark:text-white mb-0.5">
                    {lp.title}
                  </div>
                  <div className="text-[11px] text-gray-600 dark:text-gray-400 font-light leading-relaxed">
                    {lp.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
