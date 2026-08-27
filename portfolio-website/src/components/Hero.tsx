"use client";

import React, { useState } from "react";
import { CANDIDATE_PROFILE } from "@/data/portfolio_data";
import {
  Cpu,
  ArrowDown,
  Mail,
  MapPin,
  CheckCircle,
  Sparkles,
  Copy,
  Check,
  Compass,
  ArrowRight
} from "lucide-react";

export default function Hero() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CANDIDATE_PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative pt-12 pb-16 px-6 max-w-7xl mx-auto">
      {/* Background radial glow */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-600/10 blur-[140px] rounded-full -z-10 pointer-events-none" />

      {/* Top Banner & Status Indicator */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-950/70 border border-blue-800/70 text-blue-300 text-xs font-mono backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{CANDIDATE_PROFILE.status}</span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-900/80 border border-gray-800 text-gray-300 text-xs font-mono">
          <MapPin className="w-3.5 h-3.5 text-blue-400" />
          <span>{CANDIDATE_PROFILE.location}</span>
        </div>
      </div>

      {/* Candidate Name & Dual-Domain Specialization */}
      <div className="mb-6">
        <div className="text-xs sm:text-sm font-mono uppercase tracking-widest text-blue-400 mb-2 flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          <span>Executive Portfolio • R&D Digitalization & AI Architecture</span>
        </div>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-none mb-4">
          {CANDIDATE_PROFILE.name}
        </h1>
        <div className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent leading-snug">
          {CANDIDATE_PROFILE.title}
        </div>
      </div>

      {/* Fresh Executive Narrative (Value Focused) */}
      <div className="max-w-3xl mb-8 space-y-3 text-gray-300 text-base sm:text-lg leading-relaxed font-light">
        <p>
          I bridge the gap between <strong className="text-white font-medium">Chemical & Materials Science</strong> and <strong className="text-white font-medium">Enterprise Cloud AI</strong>. Over 7+ years of leading digitalization for global R&D and manufacturing, I have specialized in turning complex laboratory pain points into high-ROI production platforms.
        </p>
        <p className="text-sm sm:text-base text-gray-400">
          Core Focus: Replacing expensive vendor SaaS (<strong className="text-emerald-400 font-medium">€1.2M+ saved</strong>), deploying zero-hallucination agentic compliance swarms (LangGraph / REACH SDS), and engineering sub-millisecond Rust/WASM simulation microservices on AWS & Azure.
        </p>
      </div>

      {/* Key Headline Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {CANDIDATE_PROFILE.headlineStats.map((stat, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-surface border border-surfaceBorder/90 backdrop-blur-sm hover:border-blue-500/40 transition-all"
          >
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-400 mb-1 font-mono tracking-tight">
              {stat.value}
            </div>
            <div className="text-xs text-gray-400 font-medium">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Action CTA Buttons */}
      <div className="flex flex-wrap items-center gap-3">
        <a
          href="#interactive-demo"
          className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm flex items-center gap-2 transition-all shadow-lg shadow-blue-600/25"
        >
          <Cpu className="w-4 h-4" />
          <span>Try Interactive AI Demos</span>
        </a>

        <a
          href="#ai-advisor"
          className="px-6 py-3.5 rounded-xl bg-cyan-950/80 hover:bg-cyan-900/80 border border-cyan-700/60 text-cyan-200 font-medium text-sm flex items-center gap-2 transition-all"
        >
          <Compass className="w-4 h-4 text-cyan-400" />
          <span>AI Architecture Matchmaker</span>
        </a>

        <a
          href="#projects"
          className="px-5 py-3.5 rounded-xl bg-surface hover:bg-gray-800 text-gray-200 border border-surfaceBorder font-medium text-sm flex items-center gap-2 transition-all"
        >
          <span>Flagship Systems</span>
          <ArrowDown className="w-4 h-4" />
        </a>

        {/* Copy Email Button */}
        <button
          onClick={handleCopyEmail}
          className="px-4 py-3.5 rounded-xl bg-gray-900 hover:bg-gray-800 text-gray-300 border border-gray-700 text-xs font-mono flex items-center gap-2 transition-all"
          title="Copy Email Address"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-300">Email Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-gray-400" />
              <span>Copy Email</span>
            </>
          )}
        </button>
      </div>
    </section>
  );
}
