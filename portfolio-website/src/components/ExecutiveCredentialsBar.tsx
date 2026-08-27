"use client";

import React from "react";
import { CANDIDATE_PROFILE } from "@/data/portfolio_data";
import {
  GraduationCap,
  Award,
  CheckCircle,
  ExternalLink,
  Languages,
  MapPin,
  ShieldCheck,
  Globe
} from "lucide-react";

export default function ExecutiveCredentialsBar() {
  return (
    <section id="credentials" className="py-12 px-6 max-w-7xl mx-auto border-t border-surfaceBorder">
      <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-surfaceBorder">
        {/* Title Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-gray-800">
          <div>
            <span className="text-[11px] font-mono text-blue-400 uppercase tracking-wider">
              Verified Professional Qualifications
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Academic Foundations & Industry Certifications
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1.5 rounded-lg w-fit">
            <ShieldCheck className="w-4 h-4" />
            <span>100% Verified Credentials</span>
          </div>
        </div>

        {/* 3-Column Compact Executive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Column 1: Degrees */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-gray-400 mb-3 uppercase tracking-wider">
              <GraduationCap className="w-4 h-4 text-purple-400" />
              <span>Academic Degrees</span>
            </div>
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-gray-950 border border-gray-800">
                <div className="text-xs font-bold text-white mb-0.5">
                  M.Sc. in Applied Computer Science
                </div>
                <div className="text-[11px] text-blue-300">
                  Generative AI & Cloud Distributed Systems
                </div>
                <div className="text-[10px] text-gray-500 font-mono mt-1">
                  Germany • 2022 – 2024
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-gray-950 border border-gray-800">
                <div className="text-xs font-bold text-white mb-0.5">
                  B.Tech. in Polymer Science & Chemical Tech
                </div>
                <div className="text-[11px] text-cyan-300">
                  Polymer Chemistry, Rheology & Chemical Plants
                </div>
                <div className="text-[10px] text-gray-500 font-mono mt-1">
                  India • 2016 – 2020
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Certifications */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-gray-400 mb-3 uppercase tracking-wider">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>Cloud & AI Certifications</span>
            </div>
            <div className="space-y-2">
              {CANDIDATE_PROFILE.certifications.map((cert, idx) => (
                <a
                  key={idx}
                  href={cert.badgeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-gray-950 border border-gray-800 hover:border-emerald-500/50 flex items-center justify-between text-xs text-gray-300 transition-all group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span className="truncate font-medium text-white group-hover:text-emerald-300 transition-colors">
                      {cert.name}
                    </span>
                  </div>
                  <ExternalLink className="w-3 h-3 text-gray-500 group-hover:text-emerald-400 flex-shrink-0 ml-1.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 3: Languages & Mobility */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-gray-400 mb-3 uppercase tracking-wider">
              <Globe className="w-4 h-4 text-indigo-400" />
              <span>Languages & Mobility</span>
            </div>
            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-gray-950 border border-gray-800 flex items-center justify-between text-xs">
                <span className="text-white font-medium">English</span>
                <span className="font-mono text-indigo-300 text-[11px] bg-indigo-950/60 border border-indigo-800/60 px-2 py-0.5 rounded">
                  Fluent (C2)
                </span>
              </div>

              <div className="p-3 rounded-xl bg-gray-950 border border-gray-800 flex items-center justify-between text-xs">
                <span className="text-white font-medium">German</span>
                <span className="font-mono text-indigo-300 text-[11px] bg-indigo-950/60 border border-indigo-800/60 px-2 py-0.5 rounded">
                  Working Proficiency (B1-B2)
                </span>
              </div>

              <div className="p-3 rounded-xl bg-gray-900/60 border border-gray-800 text-[11px] text-gray-400 leading-relaxed">
                <strong className="text-gray-200">Location:</strong> Germany. Open to Hybrid (Germany/EU) or Remote international leadership roles.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
