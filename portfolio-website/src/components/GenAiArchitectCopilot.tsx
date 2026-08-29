"use client";

import React, { useState, useRef } from "react";
import {
  Sparkles,
  Send,
  Cpu,
  RefreshCw,
  RotateCcw,
  Copy,
  Check,
  Bot,
  Zap,
  Building2,
  Car,
  FlaskConical,
  Flame,
  ShieldCheck,
  ArrowRight,
  Sliders,
  Gauge,
  Square,
  AlertTriangle,
  Trash2
} from "lucide-react";
import { AVAILABLE_MODELS, DEFAULT_MODEL, ModelSpec } from "@/config/models";

interface PromptScenario {
  id: string;
  label: string;
  icon: React.ReactNode;
  category: "cloud" | "agents" | "perf" | "industrial";
  domain: string;
  query: string;
}

const ARCHITECT_PROMPT_HUBS: { id: "all" | "cloud" | "agents" | "perf" | "industrial"; label: string }[] = [
  { id: "all", label: "All Architectural Domains" },
  { id: "cloud", label: "Cloud & Distributed Scale" },
  { id: "agents", label: "Multi-Agent AI & RAG" },
  { id: "perf", label: "High-Perf & FinOps" },
  { id: "industrial", label: "Industrial R&D Systems" }
];

const PRESET_SCENARIOS: PromptScenario[] = [
  {
    id: "telemetry",
    label: "AWS Event-Driven Telemetry (100k+ ev/s)",
    icon: <Cpu className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />,
    category: "cloud",
    domain: "Distributed Cloud Architecture",
    query: "How do you architect an event-driven telemetry ingestion pipeline on AWS Kinesis & Timestream handling 100k+ sensor events/sec?"
  },
  {
    id: "microservices",
    label: "Monolith to Event-Driven Microservices",
    icon: <ArrowRight className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />,
    category: "cloud",
    domain: "Enterprise Migration Strategy",
    query: "What is your step-by-step strategy to migrate a monolithic plant database to event-driven FastAPI microservices with zero downtime?"
  },
  {
    id: "rag",
    label: "Low-Latency RAG & Compliance Guardrails",
    icon: <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />,
    category: "agents",
    domain: "Applied AI Systems",
    query: "How do you achieve sub-200ms RAG retrieval while enforcing deterministic guardrails on strict compliance datasheets?"
  },
  {
    id: "chemical",
    label: "LangGraph Multi-Agent REACH Pipeline",
    icon: <FlaskConical className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />,
    category: "agents",
    domain: "Multi-Agent AI",
    query: "How does your LangGraph multi-agent pipeline enforce deterministic rules when auditing supplier SDS documents against live ECHA SVHC lists?"
  },
  {
    id: "rust",
    label: "Client-Side Rust / WASM vs. Server Python",
    icon: <Zap className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />,
    category: "perf",
    domain: "High-Performance Systems",
    query: "Why compile Rust to client-side WebAssembly for ISO 527 tensile curve regression rather than relying on server-side Python?"
  },
  {
    id: "finops",
    label: "FinOps Token Quotas & Redis Caching (42% Saved)",
    icon: <ShieldCheck className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />,
    category: "perf",
    domain: "Cloud AI FinOps",
    query: "How does the Enterprise AI Gateway combine Redis SHA256 semantic caching and departmental token quotas to cut LLM costs by 42%?"
  },
  {
    id: "cement",
    label: "Cement & Compressive Strength ML",
    icon: <Building2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />,
    category: "industrial",
    domain: "Materials & Cement R&D",
    query: "How do you architect an ML pipeline to predict 28-day concrete compressive strength and optimize low-carbon clinker substitution?"
  },
  {
    id: "automotive",
    label: "Automotive Plant RCFA GenAI Pipeline",
    icon: <Car className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />,
    category: "industrial",
    domain: "Automotive & Manufacturing",
    query: "How do you architect an industrial Root Cause Failure Analysis (RCFA) system connecting sensor telemetry with historical failure trees?"
  }
];

/**
 * Formatted Markdown Renderer to replace raw asterisks and markdown tokens with bold styled typography
 */
function MarkdownRenderer({ content }: { content: string }) {
  const lines = content.split("\n");

  const parseInline = (text: string) => {
    // Process inline code `code`
    const codeSplit = text.split(/(`[^`]+`)/g);
    return codeSplit.map((codeSegment, ci) => {
      if (codeSegment.startsWith("`") && codeSegment.endsWith("`") && codeSegment.length > 2) {
        return (
          <code key={`c-${ci}`} className="px-1.5 py-0.5 rounded-md bg-slate-200/80 dark:bg-slate-800 font-mono text-[11px] text-blue-700 dark:text-cyan-300 font-semibold">
            {codeSegment.slice(1, -1)}
          </code>
        );
      }
      
      // Process bold **text**
      const boldSplit = codeSegment.split(/(\*\*[^*]+\*\*)/g);
      return boldSplit.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
          const clean = part.slice(2, -2);
          return (
            <strong key={`b-${ci}-${i}`} className="font-bold text-slate-950 dark:text-white">
              {clean}
            </strong>
          );
        }
        return part;
      });
    });
  };

  return (
    <div className="space-y-3.5">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={idx} className="h-0.5" />;

        // Header Check (###, ##, #, or bolded title)
        if (
          trimmed.startsWith("###") ||
          trimmed.startsWith("##") ||
          trimmed.startsWith("#") ||
          (trimmed.startsWith("**") && trimmed.endsWith("**") && !trimmed.slice(2, -2).includes("**"))
        ) {
          const titleText = trimmed
            .replace(/^#+\s*/, "")
            .replace(/^\*\*/, "")
            .replace(/\*\*$/, "");
          return (
            <div
              key={idx}
              className="text-sm sm:text-base font-extrabold text-blue-700 dark:text-cyan-300 tracking-tight pt-2 pb-1 border-b border-slate-200/70 dark:border-slate-800/80 flex items-center gap-2"
            >
              <span className="w-1.5 h-4 rounded-full bg-blue-600 dark:bg-cyan-400" />
              <span>{titleText}</span>
            </div>
          );
        }

        // Numbered List Items (1., 2., etc.)
        const listMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
        if (listMatch) {
          const num = listMatch[1];
          const rest = listMatch[2];
          return (
            <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed pl-1">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-950/90 text-blue-800 dark:text-cyan-300 font-mono font-bold text-[11px] flex items-center justify-center border border-blue-200 dark:border-blue-800/80 mt-0.5 shadow-xs">
                {num}
              </span>
              <div className="flex-1 font-light">
                {parseInline(rest)}
              </div>
            </div>
          );
        }

        // Bullet Items (- or *)
        if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
          return (
            <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed pl-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-cyan-400 mt-2 flex-shrink-0" />
              <div className="flex-1 font-light">
                {parseInline(trimmed.slice(2))}
              </div>
            </div>
          );
        }

        // Standard Paragraph
        return (
          <p key={idx} className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-light">
            {parseInline(trimmed)}
          </p>
        );
      })}
    </div>
  );
}

export default function GenAiArchitectCopilot() {
  const defaultModel =
    process.env.NEXT_PUBLIC_GOOGLE_AI_MODEL_ID?.replace(/^models\//, "") ||
    DEFAULT_MODEL;

  const [selectedModel, setSelectedModel] = useState<string>(defaultModel);
  const [activeCategoryTab, setActiveCategoryTab] = useState<"all" | "cloud" | "agents" | "perf" | "industrial">("all");
  const [query, setQuery] = useState(PRESET_SCENARIOS[0].query);
  const [activeScenario, setActiveScenario] = useState<string>("telemetry");
  const [response, setResponse] = useState<string | null>(null);
  const [engine, setEngine] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [ttftWarning, setTtftWarning] = useState(false);
  const [fallbackInfo, setFallbackInfo] = useState<{
    triggered: boolean;
    originalModel?: string;
    modelId?: string;
    reason?: string;
  } | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  const activeSpec = AVAILABLE_MODELS.find((m) => m.id === selectedModel) || AVAILABLE_MODELS[0];

  const visibleScenarios =
    activeCategoryTab === "all"
      ? PRESET_SCENARIOS
      : PRESET_SCENARIOS.filter((s) => s.category === activeCategoryTab);

  const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setLoading(false);
    setTtftWarning(false);
    setResponse("Generation stopped by user.");
    setEngine(null);
    setFallbackInfo(null);
  };

  const handleAsk = async (promptToUse?: string, domainContext?: string) => {
    const textToSend = promptToUse || query;
    if (!textToSend.trim()) return;

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setTtftWarning(false);
    setResponse("");
    setFallbackInfo(null);

    const ttftTimer = setTimeout(() => {
      setTtftWarning(true);
    }, 12000);

    try {
      const res = await fetch("/api/genai-assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "text/event-stream"
        },
        signal: controller.signal,
        body: JSON.stringify({
          prompt: textToSend,
          domain: domainContext || "Executive AI Systems Architecture",
          model: selectedModel,
          stream: true
        })
      });

      const contentType = res.headers.get("content-type") || "";

      if (contentType.includes("text/event-stream") && res.body) {
        const reader = res.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let buffer = "";
        let accumulatedText = "";
        let activeEngine = `${activeSpec.providerLabel} (${selectedModel}) • Live Stream`;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          clearTimeout(ttftTimer);
          setTtftWarning(false);

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || !trimmed.startsWith("data:")) continue;
            const jsonStr = trimmed.slice(5).trim();

            try {
              const eventData = JSON.parse(jsonStr);

              if (eventData.type === "meta") {
                activeEngine = eventData.engine || activeEngine;
                setEngine(activeEngine);
                if (eventData.isFallback) {
                  setFallbackInfo({
                    triggered: true,
                    originalModel: eventData.originalModel,
                    modelId: eventData.modelId,
                    reason: eventData.fallbackReason
                  });
                }
              } else if (eventData.type === "delta" && eventData.text) {
                accumulatedText += eventData.text;
                setResponse(accumulatedText);
              }
            } catch {
              // skip unparseable SSE line
            }
          }
        }

        if (!accumulatedText) {
          setResponse("No response received from streaming endpoint.");
        }
      } else {
        clearTimeout(ttftTimer);
        setTtftWarning(false);

        const data = await res.json();
        if (res.ok && data.reply) {
          setResponse(data.reply);
          setEngine(data.engine || `${activeSpec.providerLabel} (${selectedModel})`);
          if (data.fallbackTriggered) {
            setFallbackInfo({
              triggered: true,
              originalModel: data.originalModel,
              modelId: data.modelId,
              reason: data.fallbackReason
            });
          } else {
            setFallbackInfo(null);
          }
        } else {
          setResponse(data.error || "Failed to generate architecture response.");
        }
      }
    } catch (err: any) {
      clearTimeout(ttftTimer);
      setTtftWarning(false);
      if (err?.name === "AbortError") {
        setResponse("Generation stopped by user.");
      } else {
        setResponse("Network error: Unable to connect to AI Systems Copilot API.");
      }
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleScenarioClick = (s: PromptScenario) => {
    setActiveScenario(s.id);
    setQuery(s.query);
    handleAsk(s.query, s.domain);
  };

  const handleClear = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setLoading(false);
    setTtftWarning(false);
    setResponse(null);
    setEngine(null);
    setFallbackInfo(null);
    setActiveScenario("");
    setQuery("");
  };

  const handleCopy = () => {
    if (!response) return;
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="ai-copilot" className="py-16 px-6 max-w-7xl mx-auto border-t border-slate-200 dark:border-surfaceBorder">
      <div className="rounded-3xl bg-white dark:bg-surface border border-slate-200 dark:border-surfaceBorder shadow-xl p-6 sm:p-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-cyan-300 mb-3 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
              Executive AI Systems Copilot & Architectural Advisory
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Executive AI Systems Copilot
            </h2>
            <p className="text-slate-600 dark:text-gray-400 text-sm mt-1 max-w-2xl font-light">
              Live interactive architectural sparring partner. Test complex system designs, multi-agent orchestration, cloud FinOps, sub-millisecond physics, or open-ended technical challenges.
            </p>
          </div>

          {/* Model Selector + Quota Info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-50 dark:bg-gray-950 border border-slate-200 dark:border-gray-800 px-3 py-2 rounded-2xl shadow-xs">
              <Sliders className="w-4 h-4 text-blue-600 dark:text-cyan-400 flex-shrink-0" />
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="bg-transparent text-xs font-mono font-semibold text-slate-900 dark:text-gray-100 focus:outline-none cursor-pointer"
                title="Select AI Model"
              >
                <optgroup label="⚡ Google Gemini Tier (Free Default Workhorse)">
                  {AVAILABLE_MODELS.filter((m) => m.provider === "google-gemini").map((m) => (
                    <option key={m.id} value={m.id} className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                      {m.name}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="✨ Vercel AI Gateway (Free Tier Models)">
                  {AVAILABLE_MODELS.filter((m) => m.provider === "vercel-ai-gateway").map((m) => (
                    <option key={m.id} value={m.id} className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                      {m.name}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 px-3 py-2 rounded-2xl shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{activeSpec.providerLabel} Ready</span>
            </div>
          </div>
        </div>

        {/* Live Quota Governance Banner (RPM, RPD & Speed Transparency) */}
        <div className="mb-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
            <Gauge className="w-4 h-4 text-blue-600 dark:text-cyan-400 flex-shrink-0" />
            <div>
              <strong className="font-bold text-slate-950 dark:text-white">
                {activeSpec.name.split(" ")[0]} {activeSpec.name.split(" ")[1]} ({activeSpec.providerLabel}):
              </strong>{" "}
              {activeSpec.speed && <span className="font-mono text-blue-700 dark:text-cyan-300 font-semibold">{activeSpec.speed} • </span>}
              {activeSpec.contextWindow && <span className="font-mono text-emerald-700 dark:text-emerald-400 font-semibold">{activeSpec.contextWindow} Context • </span>}
              {activeSpec.rpm && <span className="font-mono text-blue-700 dark:text-cyan-300 font-semibold">{activeSpec.rpm} RPM • </span>}
              {activeSpec.rpd && <span className="font-mono text-emerald-700 dark:text-emerald-400 font-semibold">{activeSpec.rpd.toLocaleString()} RPD • </span>}
              <span className="font-mono text-purple-700 dark:text-purple-300 font-semibold">{activeSpec.tpm || activeSpec.badge}</span>
            </div>
          </div>

          <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-950 px-2.5 py-1 rounded-xl border border-slate-200 dark:border-slate-800 flex-shrink-0">
            {activeSpec.description}
          </div>
        </div>

        {/* Categorized Architectural Hubs */}
        <div className="mb-6 space-y-3">
          <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
            <span className="text-[11px] font-mono uppercase font-bold text-slate-500 dark:text-slate-400 mr-1">
              Select Architectural Hub:
            </span>
            {ARCHITECT_PROMPT_HUBS.map((hub) => (
              <button
                key={hub.id}
                onClick={() => setActiveCategoryTab(hub.id)}
                className={`px-3 py-1 rounded-xl text-xs font-medium transition-all ${
                  activeCategoryTab === hub.id
                    ? "bg-slate-950 dark:bg-slate-100 text-white dark:text-slate-950 font-bold shadow-xs"
                    : "bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white border border-slate-200 dark:border-slate-800"
                }`}
              >
                {hub.label}
              </button>
            ))}
          </div>

          <div>
            <div className="flex flex-wrap gap-2 pt-1">
              {visibleScenarios.map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleScenarioClick(s)}
                  className={`px-3.5 py-2 rounded-2xl text-xs font-medium transition-all flex items-center gap-2 border ${
                    activeScenario === s.id
                      ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20 font-semibold"
                      : "bg-slate-50 dark:bg-gray-900/80 hover:bg-slate-100 dark:hover:bg-gray-800 text-slate-800 dark:text-gray-200 border-slate-200 dark:border-gray-800"
                  }`}
                >
                  {s.icon}
                  <span>{s.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* TTFT Timeout Warning Alert */}
        {ttftWarning && loading && (
          <div className="mb-4 p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs flex items-center justify-between gap-3 animate-pulse shadow-xs">
            <div className="flex items-center gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
              <span>
                Upstream model response is taking longer than 8s. Server-side auto-cascade is evaluating failovers. You can stop or wait.
              </span>
            </div>
            <button
              onClick={handleStop}
              className="px-3 py-1 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-500 shadow-xs cursor-pointer flex-shrink-0"
            >
              Stop Now
            </button>
          </div>
        )}

        {/* Custom Input Box + AbortController Stop Controller */}
        <div className="flex flex-col sm:flex-row gap-2.5 mb-6">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveScenario("");
            }}
            onKeyDown={(e) => e.key === "Enter" && !loading && handleAsk()}
            placeholder="Ask any question: system design, coding challenges, multi-agent RAG, or open-ended inquiries..."
            className="flex-1 px-4 py-3 rounded-2xl bg-slate-50 dark:bg-gray-950 border border-slate-200 dark:border-gray-800 text-slate-900 dark:text-gray-100 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
          />
          {loading ? (
            <div className="flex items-center gap-2">
              <button
                onClick={handleStop}
                className="px-5 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-lg shadow-rose-600/20 transition-all cursor-pointer"
                title="Stop generation immediately"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>Stop</span>
              </button>
              <button
                disabled
                className="px-5 py-3 rounded-2xl bg-blue-600/70 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-wait"
              >
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Synthesizing...</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleAsk()}
              disabled={!query.trim()}
              className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Ask AI Systems Copilot</span>
            </button>
          )}
        </div>

        {/* Live Auto-Fallback Alert Banner */}
        {fallbackInfo?.triggered && (
          <div className="mb-4 p-3.5 rounded-2xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs flex items-center justify-between gap-3 shadow-xs animate-fadeIn">
            <div className="flex items-center gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
              <div>
                <strong className="font-bold">Auto-Fallback Activated:</strong>{" "}
                <span className="font-mono font-bold text-amber-800 dark:text-amber-300">
                  {fallbackInfo.originalModel || selectedModel}
                </span>{" "}
                was experiencing high demand or quota limits. Zero-latency response was automatically served via{" "}
                <span className="font-mono font-bold text-amber-800 dark:text-amber-300">
                  {fallbackInfo.modelId || "fallback model"}
                </span>.
              </div>
            </div>
            <button
              onClick={() => setFallbackInfo(null)}
              className="text-amber-700 dark:text-amber-400 hover:text-amber-950 dark:hover:text-amber-100 p-1 font-bold text-sm cursor-pointer"
              title="Dismiss Notice"
            >
              ✕
            </button>
          </div>
        )}

        {/* Output Console Box with Formatted Markdown Typography */}
        {response ? (
          <div className="rounded-3xl bg-slate-50 dark:bg-[#0c1220] text-slate-900 dark:text-gray-100 border border-slate-200 dark:border-gray-800 p-6 sm:p-7 shadow-inner animate-fadeIn">
            <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-200 dark:border-gray-800">
              <div className="flex items-center gap-2 font-mono text-xs text-blue-700 dark:text-cyan-400 font-bold">
                <Bot className="w-4 h-4" />
                <span>Executive Architectural Synthesis</span>
                {engine && (
                  <span className="text-[10px] text-slate-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 px-2.5 py-0.5 rounded-lg ml-1 font-mono">
                    {engine}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleClear}
                  className="px-3 py-1.5 rounded-xl bg-white dark:bg-gray-800 hover:bg-slate-100 dark:hover:bg-gray-700 text-slate-800 dark:text-gray-300 text-xs font-mono flex items-center gap-1.5 transition-colors border border-slate-200 dark:border-gray-700 shadow-xs cursor-pointer"
                  title="Clear response & reset prompt without reloading"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                  <span className="text-[11px]">Clear / Reset</span>
                </button>
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 rounded-xl bg-white dark:bg-gray-800 hover:bg-slate-100 dark:hover:bg-gray-700 text-slate-800 dark:text-gray-300 text-xs font-mono flex items-center gap-1.5 transition-colors border border-slate-200 dark:border-gray-700 shadow-xs cursor-pointer"
                  title="Copy response text"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-emerald-700 dark:text-emerald-300 text-[11px] font-bold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="text-[11px]">Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Formatted Markdown Output without raw asterisks */}
            <MarkdownRenderer content={response} />
          </div>
        ) : (
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-gray-900/40 border border-dashed border-slate-200 dark:border-gray-800 text-center text-xs text-slate-600 dark:text-gray-400 font-mono">
            Click any scenario chip above or ask an arbitrary system design dilemma to trigger live architectural synthesis with your selected Gemini model.
          </div>
        )}
      </div>
    </section>
  );
}
