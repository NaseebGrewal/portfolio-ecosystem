"use client";

import React from "react";
import { CANDIDATE_PROFILE } from "@/data/portfolio_data";
import {
  Cpu,
  ArrowDown,
  Mail,
  CheckCircle,
  Sparkles,
  Compass,
  ArrowRight,
  Layers,
  Award
} from "lucide-react";

export interface HeroProps {
  onOpenContactModal?: () => void;
}

export default function Hero({ onOpenContactModal }: HeroProps) {
  const handleContactClick = () => {
    if (onOpenContactModal) {
      onOpenContactModal();
    } else {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section className="relative pt-10 pb-16 px-6 max-w-7xl mx-auto">
      {/* Background radial glow */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-600/10 dark:bg-blue-600/15 blur-[140px] rounded-full -z-10 pointer-events-none" />

      {/* Top Banner & Status Indicator */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800/70 text-blue-800 dark:text-cyan-300 text-xs font-mono backdrop-blur-md shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{CANDIDATE_PROFILE.status}</span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs font-mono">
          <Award className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
          <span>7+ Years Multi-Industry Leadership</span>
        </div>
      </div>

      {/* Candidate Name & Dual-Domain Specialization */}
      <div className="mb-6">
        <div className="text-xs sm:text-sm font-mono uppercase tracking-widest text-blue-700 dark:text-cyan-400 mb-2 flex items-center gap-2 font-bold">
          <Sparkles className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
          <span>{CANDIDATE_PROFILE.tagline}</span>
        </div>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-none mb-4">
          {CANDIDATE_PROFILE.name}
        </h1>
        <div className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-700 via-cyan-600 to-emerald-600 dark:from-blue-400 dark:via-cyan-300 dark:to-emerald-400 bg-clip-text text-transparent leading-snug">
          {CANDIDATE_PROFILE.title}
        </div>
      </div>

      {/* Cross-Industry Vertical Badges */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {CANDIDATE_PROFILE.targetIndustries.map((ind, idx) => (
          <span
            key={idx}
            className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-medium"
          >
            • {ind}
          </span>
        ))}
      </div>

      {/* Executive Narrative */}
      <div className="max-w-3xl mb-8 space-y-4 text-slate-800 dark:text-slate-200 text-base sm:text-lg leading-relaxed font-light">
        <p>
          I architect enterprise AI systems, high-throughput microservices, and specialized R&D platforms across <strong className="text-slate-950 dark:text-white font-semibold">Specialty Chemicals, Tier-1 Automotive, E-Commerce, Enterprise IT, and Life Sciences</strong>. Over 7+ years of delivering software platforms across global organizations (including <strong className="text-slate-950 dark:text-white font-semibold">Continental, IFF, Wongdoody (An Infosys Company), Heidelberg Materials, SAP, and Meesho</strong>), I specialize in eliminating legacy operational friction and engineering high-ROI systems.
        </p>

        {/* Distinct Unicorn-Grade Core Focus Showcase */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-50/90 via-slate-50 to-cyan-50/60 dark:from-blue-950/40 dark:via-slate-900/50 dark:to-cyan-950/30 border border-blue-200/80 dark:border-blue-900/50 shadow-xs">
          <div className="flex items-center gap-2 mb-2">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 dark:bg-cyan-400" />
            <span className="text-xs font-mono uppercase tracking-wider font-bold text-blue-700 dark:text-cyan-300">
              Core Architectural Focus
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
            Engineering in-house R&D platforms (<strong className="text-emerald-700 dark:text-emerald-400 font-semibold">€1.2M+ vendor licensing eliminated</strong>), deterministic multi-agent compliance pipelines (LangGraph / REACH SDS validation), and client-side Rust/WASM numerical simulation engines deployed on AWS ECS and Azure.
          </p>
        </div>
      </div>

      {/* Key Headline Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {CANDIDATE_PROFILE.headlineStats.map((stat, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-white dark:bg-surface border border-gray-200 dark:border-surfaceBorder/90 shadow-sm hover:border-blue-500/50 transition-all"
          >
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400 mb-1 font-mono tracking-tight">
              {stat.value}
            </div>
            <div className="text-xs text-gray-900 dark:text-gray-200 font-semibold mb-1">
              {stat.label}
            </div>
            <div className="text-[11px] text-gray-500 dark:text-gray-400 font-light leading-tight">
              {stat.context}
            </div>
          </div>
        ))}
      </div>

      {/* Action CTA Buttons */}
      <div className="flex flex-wrap items-center gap-3">
        <a
          href="#core-systems"
          className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm flex items-center gap-2 transition-all shadow-lg shadow-blue-600/25"
        >
          <Cpu className="w-4 h-4" />
          <span>Explore Core Systems</span>
        </a>

        <a
          href="#interactive-demo"
          className="px-5 py-3.5 rounded-xl bg-cyan-50 dark:bg-cyan-950/80 hover:bg-cyan-100 dark:hover:bg-cyan-900/80 border border-cyan-200 dark:border-cyan-700/60 text-cyan-900 dark:text-cyan-200 font-medium text-sm flex items-center gap-2 transition-all"
        >
          <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          <span>Live Sandboxes</span>
        </a>

        <a
          href="#catalog"
          className="px-5 py-3.5 rounded-xl bg-white dark:bg-surface hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-surfaceBorder font-medium text-sm flex items-center gap-2 transition-all"
        >
          <Layers className="w-4 h-4" />
          <span>Systems Catalog (14)</span>
        </a>

        <button
          onClick={handleContactClick}
          className="px-5 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-medium text-sm flex items-center gap-2 transition-all shadow-lg shadow-blue-600/20 cursor-pointer ring-1 ring-white/20 hover:scale-[1.02]"
          title="Get in Touch"
        >
          <Mail className="w-4 h-4" />
          <span>Get in Touch</span>
          <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
        </button>
      </div>
    </section>
  );
}
