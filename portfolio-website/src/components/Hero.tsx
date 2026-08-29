"use client";

import React, { useState } from "react";
import { CANDIDATE_PROFILE } from "@/data/portfolio_data";
import {
  Cpu,
  Mail,
  Sparkles,
  Layers,
  Award,
  MapPin
} from "lucide-react";

export interface HeroProps {
  onOpenContactModal?: () => void;
}

export default function Hero({ onOpenContactModal }: HeroProps) {
  const [imageError, setImageError] = useState(false);
  const imageUrl = CANDIDATE_PROFILE.profileImageUrl;

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
    <section className="relative pt-6 sm:pt-10 pb-16 px-4 sm:px-6 lg:px-8 xl:px-12 max-w-[1440px] mx-auto">
      {/* Background Atmosphere: Sub-Pixel Grid & Sapphire/Cyan Aurora Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none -z-20" />
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-r from-blue-600/10 via-cyan-500/10 to-indigo-600/10 dark:from-blue-600/15 dark:via-cyan-400/15 dark:to-indigo-500/15 blur-[140px] rounded-full -z-10 pointer-events-none" />

      {/* Main 2-Column Responsive Layout with Top Alignment & Full-Height Balance */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-14 items-stretch">
        
        {/* Left Column: Narrative, Badges & Headline Metrics (7 cols) */}
        <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-between space-y-6">
          
          <div>
            {/* Top Eyebrow & Status Indicators */}
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/60 text-blue-800 dark:text-cyan-300 text-xs font-mono backdrop-blur-md shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{CANDIDATE_PROFILE.status}</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs font-mono">
                <Award className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                <span>7+ Years Multi-Industry Leadership</span>
              </div>
            </div>

            {/* Candidate Name & Dual-Domain Specialization */}
            <div className="mb-4">
              <div className="text-xs sm:text-sm font-mono uppercase tracking-widest text-blue-700 dark:text-cyan-400 mb-1.5 flex items-center gap-2 font-bold">
                <Sparkles className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                <span>{CANDIDATE_PROFILE.tagline}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-[1.1] mb-2.5">
                {CANDIDATE_PROFILE.name}
              </h1>
              <div className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-700 via-cyan-600 to-emerald-600 dark:from-blue-400 dark:via-cyan-300 dark:to-emerald-400 bg-clip-text text-transparent leading-snug">
                {CANDIDATE_PROFILE.title}
              </div>
            </div>

            {/* Cross-Industry Vertical Badges */}
            <div className="flex flex-wrap items-center gap-1.5 mb-5">
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
            <div className="space-y-3.5 text-slate-800 dark:text-slate-200 text-sm sm:text-base leading-relaxed font-light mb-5">
              <p>
                I architect enterprise AI systems, high-throughput microservices, and specialized R&D platforms across <strong className="text-slate-950 dark:text-white font-semibold">Specialty Chemicals, Tier-1 Automotive, E-Commerce, Enterprise IT, and Life Sciences</strong>. Over 7+ years of delivering software platforms across global organizations (including <strong className="text-slate-950 dark:text-white font-semibold">Continental, IFF, Wongdoody (An Infosys Company), Heidelberg Materials, SAP, and Meesho</strong>), I specialize in eliminating legacy operational friction and engineering high-ROI systems.
              </p>

              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50/90 via-slate-50 to-cyan-50/60 dark:from-blue-950/40 dark:via-slate-900/50 dark:to-cyan-950/30 border border-blue-200/80 dark:border-blue-900/50 shadow-xs">
                <div className="flex items-center gap-2 mb-1.5">
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
          </div>

          <div>
            {/* Key Headline Stat Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {CANDIDATE_PROFILE.headlineStats.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-white dark:bg-surface border border-slate-200 dark:border-surfaceBorder/90 shadow-xs hover:border-blue-500/50 transition-all"
                >
                  <div className="text-xl sm:text-2xl font-extrabold text-blue-600 dark:text-blue-400 mb-0.5 font-mono tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-900 dark:text-slate-200 font-semibold mb-0.5">
                    {stat.label}
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-light leading-tight">
                    {stat.context}
                  </div>
                </div>
              ))}
            </div>

            {/* Action CTA Buttons */}
            <div className="flex flex-wrap items-center gap-2.5">
              <a
                href="#core-systems"
                className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md shadow-blue-600/25 hover:shadow-blue-600/40"
              >
                <Cpu className="w-4 h-4" />
                <span>Explore Core Systems</span>
              </a>

              <a
                href="#interactive-demo"
                className="px-4 py-3 rounded-xl bg-cyan-50 dark:bg-cyan-950/80 hover:bg-cyan-100 dark:hover:bg-cyan-900/80 border border-cyan-200 dark:border-cyan-700/60 text-cyan-900 dark:text-cyan-200 font-medium text-xs sm:text-sm flex items-center gap-2 transition-all"
              >
                <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span>Live Sandboxes</span>
              </a>

              <a
                href="#catalog"
                className="px-4 py-3 rounded-xl bg-white dark:bg-surface hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-surfaceBorder font-medium text-xs sm:text-sm flex items-center gap-2 transition-all"
              >
                <Layers className="w-4 h-4" />
                <span>Catalog (14)</span>
              </a>

              <button
                onClick={handleContactClick}
                className="px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-medium text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md shadow-blue-600/20 cursor-pointer ring-1 ring-white/20 hover:scale-[1.02]"
                title="Get in Touch"
              >
                <Mail className="w-4 h-4" />
                <span>Get in Touch</span>
                <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Executive Portrait Card - Full Vertical Parity & Minimalist Unicorn Standard (5 cols) */}
        <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-stretch">
          <div className="relative w-full h-full min-h-[500px] sm:min-h-[560px] lg:min-h-full group flex flex-col">
            
            {/* Ambient Background Glow Behind Portrait */}
            <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-b from-blue-600/20 via-cyan-500/15 to-indigo-600/20 blur-2xl opacity-60 group-hover:opacity-85 transition-opacity duration-700 -z-10" />

            {/* Single Continuous Squircle Glass Frame with Full-Bleed Studio Image */}
            <div className="relative w-full h-full flex-1 rounded-3xl overflow-hidden bg-slate-900 dark:bg-slate-950 border border-slate-200/80 dark:border-white/10 dark:ring-1 dark:ring-cyan-500/20 shadow-2xl shadow-blue-900/10 dark:shadow-cyan-950/40 backdrop-blur-xl flex flex-col justify-end">
              {!imageError && imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imageUrl}
                  alt={`${CANDIDATE_PROFILE.name} - Senior AI Solutions Architect`}
                  onError={() => setImageError(true)}
                  className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
              ) : (
                // Sleek Fallback Architectural Avatar
                <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-b from-slate-900 via-[#0a1124] to-slate-950 text-center overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
                  <div className="relative w-32 h-32 rounded-2xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-indigo-600 p-0.5 shadow-2xl mb-4 flex items-center justify-center">
                    <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                      <span className="text-4xl font-bold font-mono text-cyan-400">NG</span>
                    </div>
                  </div>
                  <div className="relative text-lg font-bold text-white font-mono">{CANDIDATE_PROFILE.name}</div>
                  <div className="relative text-sm text-cyan-300 font-sans mt-1">Senior AI Solutions Architect</div>
                </div>
              )}

              {/* Subtle Studio Bottom Gradient Scrim for Contrast */}
              <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-transparent pointer-events-none" />

              {/* Single Minimalist Float Chip Anchored at Bottom */}
              <div className="relative z-10 p-5 sm:p-6 flex items-center justify-center pointer-events-none">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-950/80 dark:bg-slate-950/85 backdrop-blur-md border border-white/15 text-slate-100 text-xs font-mono shadow-xl shadow-black/50">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                  <span>Germany • Hybrid / Remote Worldwide</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
