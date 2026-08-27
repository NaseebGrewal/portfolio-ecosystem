"use client";

import React, { useState } from "react";
import Hero from "@/components/Hero";
import StrategicValueMatrix from "@/components/StrategicValueMatrix";
import InteractiveDemoSuite from "@/components/InteractiveDemoSuite";
import AiSolutionMatchmaker from "@/components/AiSolutionMatchmaker";
import ProjectCard from "@/components/ProjectCard";
import ArchitectureViewer from "@/components/ArchitectureViewer";
import ExecutiveCredentialsBar from "@/components/ExecutiveCredentialsBar";
import { FLAGSHIP_PROJECTS, CANDIDATE_PROFILE } from "@/data/portfolio_data";
import {
  Mail,
  Copy,
  Check,
  Github,
  Linkedin,
  Sparkles,
  Cpu,
  Layers,
  ArrowUpRight
} from "lucide-react";

export default function Home() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CANDIDATE_PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/90 border-b border-surfaceBorder px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 font-mono text-sm tracking-tight text-white group">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 group-hover:scale-125 transition-transform" />
            <span className="font-bold text-white group-hover:text-blue-400 transition-colors">
              {CANDIDATE_PROFILE.name}
            </span>
            <span className="hidden sm:inline text-xs text-gray-500">|</span>
            <span className="hidden sm:inline text-xs text-blue-300 font-sans">
              Senior AI Solutions Architect
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-gray-400">
            <a href="#value-matrix" className="hover:text-white transition-colors">Strategic Value</a>
            <a href="#interactive-demo" className="hover:text-white transition-colors">Live Demos</a>
            <a href="#ai-advisor" className="hover:text-white transition-colors">AI Matchmaker</a>
            <a href="#projects" className="hover:text-white transition-colors">Flagship Projects</a>
            <a href="#architecture" className="hover:text-white transition-colors">Architecture</a>
            <a href="#credentials" className="hover:text-white transition-colors">Credentials</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </nav>

          <div className="flex items-center gap-3">
            {CANDIDATE_PROFILE.githubUrl && (
              <a
                href={CANDIDATE_PROFILE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-900 border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700 transition-all"
                title="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {CANDIDATE_PROFILE.linkedinUrl && (
              <a
                href={CANDIDATE_PROFILE.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-900 border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700 transition-all"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            <a
              href={`mailto:${CANDIDATE_PROFILE.email}?subject=Inquiry:%20Senior%20AI%20Solutions%20Architect%20Role`}
              className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition-all shadow-sm flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Get in Touch</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <Hero />

      {/* Strategic Value Matrix (Executive Differentiator) */}
      <div id="value-matrix">
        <StrategicValueMatrix />
      </div>

      {/* Interactive Live Demo Suite (Proof of Work) */}
      <InteractiveDemoSuite />

      {/* Interactive AI Architecture Matchmaker */}
      <AiSolutionMatchmaker />

      {/* Flagship Enterprise Projects */}
      <section id="projects" className="py-16 px-6 max-w-7xl mx-auto border-t border-surfaceBorder">
        <div className="mb-12">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-mono font-medium bg-blue-950/70 border border-blue-800 text-blue-300 mb-2">
            <Cpu className="w-3.5 h-3.5 text-blue-400" />
            Flagship Engineering Systems
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            Production-Grade Flagship Projects
          </h2>
          <p className="text-gray-400 text-sm max-w-2xl font-light">
            Engineered systems demonstrating the union of chemical engineering domain science, full-stack microservices, agentic workflows, and cloud DevOps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FLAGSHIP_PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* Architecture Viewer */}
      <ArchitectureViewer />

      {/* Sleek Executive Credentials & Trust Bar */}
      <ExecutiveCredentialsBar />

      {/* Executive Contact & CTA Footer */}
      <footer id="contact" className="py-16 px-6 bg-surface/90 border-t border-surfaceBorder text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950 border border-blue-800 text-blue-300 text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            Executive Recruitment & Leadership Inquiries
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
            Let's Discuss Senior AI & R&D Solutions Architecture
          </h3>
          <p className="text-gray-400 text-sm mb-8 font-light leading-relaxed max-w-xl mx-auto">
            Available for Senior AI Solutions Architect, R&D Digitalization Lead, and Technical Product Ownership roles (Hybrid in Germany/EU or Remote).
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <a
              href={`mailto:${CANDIDATE_PROFILE.email}?subject=Opportunity:%20Senior%20AI%20Solutions%20Architect%20/%20R%26D%20Lead`}
              className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs flex items-center gap-2 shadow-lg transition-all"
            >
              <Mail className="w-4 h-4" />
              <span>Send Email</span>
            </a>

            <button
              onClick={handleCopyEmail}
              className="px-5 py-3.5 rounded-xl bg-gray-900 hover:bg-gray-800 text-gray-200 border border-gray-700 text-xs font-mono flex items-center gap-2 transition-all shadow"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300">Email Copied to Clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-gray-400" />
                  <span>Copy Email Address</span>
                </>
              )}
            </button>

            {CANDIDATE_PROFILE.linkedinUrl && (
              <a
                href={CANDIDATE_PROFILE.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-xl bg-gray-900 hover:bg-gray-800 text-gray-200 border border-gray-700 text-xs font-medium flex items-center gap-2 shadow transition-all"
              >
                <Linkedin className="w-4 h-4 text-blue-400" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-gray-500" />
              </a>
            )}

            {CANDIDATE_PROFILE.githubUrl && (
              <a
                href={CANDIDATE_PROFILE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-xl bg-gray-900 hover:bg-gray-800 text-gray-200 border border-gray-700 text-xs font-medium flex items-center gap-2 shadow transition-all"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-gray-500" />
              </a>
            )}
          </div>

          <div className="text-xs text-gray-500 font-mono">
            © {new Date().getFullYear()} {CANDIDATE_PROFILE.name} • Built with Next.js 15, TypeScript & Tailwind CSS
          </div>
        </div>
      </footer>
    </main>
  );
}
