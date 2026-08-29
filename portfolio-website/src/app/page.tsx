"use client";

import React, { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import EnterprisePedigreeMarquee from "@/components/EnterprisePedigreeMarquee";
import StrategicValueMatrix from "@/components/StrategicValueMatrix";
import InteractiveDemoSuite from "@/components/InteractiveDemoSuite";
import GenAiArchitectCopilot from "@/components/GenAiArchitectCopilot";
import EnterpriseProjectCatalog from "@/components/EnterpriseProjectCatalog";
import AiSolutionMatchmaker from "@/components/AiSolutionMatchmaker";
import ProjectCard from "@/components/ProjectCard";
import SkillsMatrix from "@/components/SkillsMatrix";
import ArchitectureViewer from "@/components/ArchitectureViewer";
import ExecutiveCredentialsBar from "@/components/ExecutiveCredentialsBar";
import ContactModal from "@/components/ContactModal";
import ContactForm from "@/components/ContactForm";
import { ThemeToggle } from "@/components/ThemeToggle";
import { FLAGSHIP_PROJECTS, CANDIDATE_PROFILE } from "@/data/portfolio_data";
import {
  Mail,
  Github,
  Linkedin,
  Sparkles,
  Cpu,
  Layers,
  ArrowUpRight,
  Compass
} from "lucide-react";

const NAV_ITEMS = [
  { id: "pedigree", label: "Experience", href: "#pedigree" },
  { id: "core-systems", label: "Core Systems", href: "#core-systems" },
  { id: "interactive-demo", label: "Live Sandboxes", href: "#interactive-demo" },
  { id: "catalog", label: "Systems Catalog", href: "#catalog" },
  { id: "skills", label: "Skills & Architecture", href: "#skills" },
  { id: "credentials", label: "Credentials", href: "#credentials" },
  { id: "contact", label: "Contact", href: "#contact" },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>("pedigree");
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactModalTopic, setContactModalTopic] = useState<string | undefined>(undefined);

  const handleOpenContactModal = (topic?: string) => {
    setContactModalTopic(topic);
    setIsContactModalOpen(true);
  };

  useEffect(() => {
    let ticking = false;

    const updateActiveSection = () => {
      const scrollPos = window.scrollY + 220;
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const item = NAV_ITEMS[i];
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection((prev) => (prev !== item.id ? item.id : prev));
            break;
          }
        }
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateActiveSection);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-blue-600 selection:text-white transition-colors duration-200">
      {/* Sticky Executive Top Bar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/95 dark:bg-[#090d16]/95 border-b border-slate-200 dark:border-[#1f2937] shadow-xs transition-colors">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-3 flex items-center justify-between gap-4">
          {/* Brand & Title */}
          <a href="#" className="flex items-center gap-2.5 font-mono text-sm tracking-tight text-slate-950 dark:text-white group flex-shrink-0">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="font-extrabold text-slate-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
              {CANDIDATE_PROFILE.name}
            </span>
            <span className="hidden md:inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-cyan-300 border border-blue-200 dark:border-blue-800/80">
              Senior AI Solutions Architect
            </span>
          </a>

          {/* Desktop Direct Nav */}
          <nav className="hidden xl:flex items-center gap-1 text-xs font-semibold text-slate-700 dark:text-slate-300">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={`px-2.5 py-1.5 rounded-lg transition-all text-[12px] font-medium tracking-tight ${
                    isActive
                      ? "bg-blue-600 text-white font-bold shadow-xs"
                      : "text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-cyan-300 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Action Controls */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <ThemeToggle />

            {CANDIDATE_PROFILE.githubUrl && (
              <a
                href={CANDIDATE_PROFILE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 transition-all shadow-xs"
                title="GitHub Profile & Projects"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {CANDIDATE_PROFILE.linkedinUrl && (
              <a
                href={CANDIDATE_PROFILE.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 transition-all shadow-xs"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            <button
              type="button"
              onClick={() => handleOpenContactModal()}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-semibold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer ring-1 ring-white/15 hover:scale-[1.02]"
              title="Open Executive Contact Portal"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
              <span className="hidden sm:inline">Get in Touch</span>
              <span className="sm:hidden">Contact</span>
            </button>
          </div>
        </div>

        {/* Responsive Content Navigation Ribbon for XL and below or quick jump */}
        <div className="xl:hidden border-t border-slate-200/80 dark:border-slate-800/80 px-4 sm:px-6 lg:px-8 xl:px-12 py-1.5 bg-slate-50/90 dark:bg-[#0c1220]/90 overflow-x-auto no-scrollbar flex items-center gap-1.5">
          <div className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-blue-700 dark:text-cyan-400 mr-2 flex-shrink-0">
            <Compass className="w-3.5 h-3.5" />
            <span>JUMP:</span>
          </div>
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                className={`flex-shrink-0 px-2.5 py-1 rounded-md text-[11px] font-mono transition-all ${
                  isActive
                    ? "bg-blue-600 text-white font-bold shadow-xs"
                    : "bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 hover:border-blue-400"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      </header>

      {/* Hero Section */}
      <Hero onOpenContactModal={handleOpenContactModal} />

      {/* Moving Companies & Institutes Experience Marquee Strip */}
      <div id="pedigree">
        <EnterprisePedigreeMarquee />
      </div>

      {/* Core Production Microservices (Flagship Projects front and center) */}
      <section id="core-systems" className="py-16 px-4 sm:px-6 lg:px-8 xl:px-12 max-w-[1440px] mx-auto border-t border-slate-200 dark:border-surfaceBorder">
        <div className="mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 mb-3 shadow-xs">
            <Cpu className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            Core Production Microservices & Systems
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight mb-3">
            Production Microservice Systems
          </h2>
          <p className="text-slate-700 dark:text-slate-300 text-sm max-w-2xl font-light">
            Engineered systems demonstrating the union of physical domain science, full-stack microservices, deterministic multi-agent workflows, and containerized cloud DevOps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FLAGSHIP_PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* Strategic Value Matrix (Architectural Differentiator) */}
      <div id="value-matrix">
        <StrategicValueMatrix />
      </div>

      {/* Interactive Live Demo Suite (Proof of Work) */}
      <InteractiveDemoSuite />

      {/* Live Recruiter AI Copilot (Powered by Gemini API) */}
      <GenAiArchitectCopilot />

      {/* Interactive AI Architecture Matchmaker */}
      <AiSolutionMatchmaker onOpenContactModal={handleOpenContactModal} />

      {/* Full Filterable Systems Catalog (14 Systems) */}
      <EnterpriseProjectCatalog />

      {/* Technical Architecture & Skills Matrix */}
      <SkillsMatrix />

      {/* Architecture Viewer */}
      <ArchitectureViewer />

      {/* Sleek Executive Credentials & Trust Bar */}
      <ExecutiveCredentialsBar />

      {/* Executive Contact & CTA Footer */}
      <footer id="contact" className="py-16 px-4 sm:px-6 lg:px-8 xl:px-12 bg-slate-100 dark:bg-[#0c1220] border-t border-slate-200 dark:border-surfaceBorder transition-colors">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/90 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-cyan-300 text-xs font-mono mb-4 shadow-xs">
              <Mail className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
              Direct Communication
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white mb-2 tracking-tight">
              Get in Touch
            </h3>
            <p className="text-slate-700 dark:text-slate-300 text-sm max-w-xl mx-auto font-light leading-relaxed">
              Available for Senior AI Solutions Architect, R&D Digitalization Lead, and Staff/Principal Engineering leadership roles across Germany, EU, and Remote worldwide.
            </p>
          </div>

          {/* Inline Always-Visible Contact Box (No popup required in footer) */}
          <div className="bg-white dark:bg-[#080d1a] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl mb-10 ring-1 ring-slate-900/5 dark:ring-white/5">
            <ContactForm isModal={false} />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            {CANDIDATE_PROFILE.linkedinUrl && (
              <a
                href={CANDIDATE_PROFILE.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 text-xs font-medium flex items-center gap-2 shadow-xs transition-all"
              >
                <Linkedin className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                <span>LinkedIn Profile</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
              </a>
            )}

            {CANDIDATE_PROFILE.githubUrl && (
              <a
                href={CANDIDATE_PROFILE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 text-xs font-medium flex items-center gap-2 shadow-xs transition-all"
              >
                <Github className="w-4 h-4 text-slate-900 dark:text-white" />
                <span>GitHub Repositories</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
              </a>
            )}
          </div>

          <div className="text-center text-xs text-slate-600 dark:text-slate-400 font-mono">
            © {new Date().getFullYear()} {CANDIDATE_PROFILE.name} • Built with Next.js 15, TypeScript & Tailwind CSS
          </div>
        </div>
      </footer>

      {/* Unicorn-Grade Executive Contact Popup Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        initialTopic={contactModalTopic}
      />
    </main>
  );
}
