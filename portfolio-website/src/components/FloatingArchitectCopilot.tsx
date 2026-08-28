"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  Send,
  Bot,
  X,
  Maximize2,
  Minimize2,
  Trash2,
  Copy,
  Check,
  Zap,
  Sliders,
  ChevronDown,
  Clock,
  ShieldAlert,
  ArrowRight
} from "lucide-react";
import { AVAILABLE_MODELS, DEFAULT_MODEL, ModelSpec } from "@/config/models";

interface ChatMessage {
  id: string;
  role: "assistant" | "user";
  content: string;
  engine?: string;
  latencyMs?: number;
  timestamp: string;
  isFallback?: boolean;
}

const QUICK_PROMPTS = [
  {
    label: "Spar on VP / Architect Role",
    query: "How does your experience leading €1.2M+ R&D cloud migrations and multi-agent platforms position you for a Senior AI Solutions Architect or Product Owner leadership role?"
  },
  {
    label: "0% SDS Compliance Swarm",
    query: "How does the ChemAgent multi-agent swarm guarantee 0% hallucination on strict REACH SVHC 0.1% w/w chemical thresholds?"
  },
  {
    label: "Rust / WASM 1.8ms Engine",
    query: "Why compile Rust to client-side WebAssembly for ISO 527 tensile curves instead of running Python SciPy APIs on the server?"
  },
  {
    label: "FinOps Token Quotas (42% Saved)",
    query: "How does the Enterprise AI Gateway use Redis SHA256 semantic caching and departmental token quotas to cut LLM costs by 42%?"
  },
  {
    label: "Monolith to Microservices",
    query: "What is your architectural blueprint for migrating a monolithic laboratory system to event-driven FastAPI microservices with zero downtime?"
  }
];

function FormattedMarkdown({ content }: { content: string }) {
  const lines = content.split("\n");

  const parseInline = (text: string) => {
    // Process inline code `code`
    const codeSplit = text.split(/(`[^`]+`)/g);
    return codeSplit.map((codeSegment, ci) => {
      if (codeSegment.startsWith("`") && codeSegment.endsWith("`") && codeSegment.length > 2) {
        return (
          <code
            key={`c-${ci}`}
            className="px-1.5 py-0.5 rounded-md bg-slate-200/80 dark:bg-slate-800 font-mono text-[11px] text-blue-700 dark:text-cyan-300 font-semibold"
          >
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
    <div className="space-y-2 text-xs sm:text-[13px] leading-relaxed">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={idx} className="h-1" />;

        // Header check
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
              className="text-xs sm:text-sm font-extrabold text-blue-700 dark:text-cyan-300 pt-1 pb-0.5 border-b border-slate-200/60 dark:border-slate-800 flex items-center gap-1.5"
            >
              <span className="w-1.5 h-3.5 rounded-full bg-blue-600 dark:bg-cyan-400 flex-shrink-0" />
              <span>{titleText}</span>
            </div>
          );
        }

        // Numbered list item
        const listMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
        if (listMatch) {
          const num = listMatch[1];
          const rest = listMatch[2];
          return (
            <div key={idx} className="flex items-start gap-2 pl-1">
              <span className="font-mono text-[11px] font-bold text-blue-600 dark:text-cyan-400 bg-blue-50 dark:bg-blue-950/80 px-1.5 py-0.5 rounded border border-blue-200 dark:border-blue-800/80 flex-shrink-0 mt-0.5">
                {num}
              </span>
              <div className="flex-1 text-slate-800 dark:text-slate-200">
                {parseInline(rest)}
              </div>
            </div>
          );
        }

        // Bullet list item
        if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
          const rest = trimmed.slice(2);
          return (
            <div key={idx} className="flex items-start gap-2 pl-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-cyan-400 flex-shrink-0 mt-1.5" />
              <div className="flex-1 text-slate-800 dark:text-slate-200">
                {parseInline(rest)}
              </div>
            </div>
          );
        }

        return (
          <p key={idx} className="text-slate-800 dark:text-slate-200 font-light">
            {parseInline(trimmed)}
          </p>
        );
      })}
    </div>
  );
}

export default function FloatingArchitectCopilot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>(DEFAULT_MODEL);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [hasOpened, setHasOpened] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-msg",
      role: "assistant",
      content: `### Welcome to the Executive AI Systems Copilot 👋

I am your interactive architectural advisor and technical sparring partner. Live model streaming is enabled — choose between verified free models (**MiniMax M3 Free** @ 154 TPS, **Poolside Laguna** for code, **InclusionAI Ling** for FinOps) or Google's **Gemini 3.7 Flash / 3.5 Flash Lite**.

Ask me about:
1. **Multi-Agent Systems**: LangGraph / CrewAI deterministic compliance swarms.
2. **High-Performance Physics**: Client-side Rust & WebAssembly vs server Python.
3. **Cloud FinOps**: Redis SHA256 semantic caching and €1.2M+ vendor cost elimination.
4. **Leadership Fit**: R&D Digitalization Lead, Principal Architect, and Technical Product Owner.`,
      engine: "Executive AI Systems Copilot • Ready",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }
  ]);

  const activeSpec: ModelSpec =
    AVAILABLE_MODELS.find((m) => m.id === selectedModel) || AVAILABLE_MODELS[0];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      if (!hasOpened) {
        setHasOpened(true);
      }
    }
  }, [messages, isOpen, hasOpened]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearHistory = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setLoading(false);
    setMessages([
      {
        id: "cleared-msg-" + Date.now(),
        role: "assistant",
        content: "Chat cleared. What technical architecture or strategic leadership topic would you like to explore?",
        engine: "Executive AI Systems Copilot",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      }
    ]);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const prompt = (textToSend || input).trim();
    if (!prompt || loading) return;

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    const userMsgId = "user-" + Date.now();
    const assistantMsgId = "bot-" + Date.now();
    const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const newUserMsg: ChatMessage = {
      id: userMsgId,
      role: "user",
      content: prompt,
      timestamp: timeStr
    };

    // Add placeholder message for streaming tokens
    const placeholderBotMsg: ChatMessage = {
      id: assistantMsgId,
      role: "assistant",
      content: "",
      engine: `${activeSpec.providerLabel} (${selectedModel}) • Streaming`,
      timestamp: timeStr
    };

    setMessages((prev) => [...prev, newUserMsg, placeholderBotMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/genai-assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "text/event-stream"
        },
        signal: controller.signal,
        body: JSON.stringify({
          prompt,
          domain: "Executive AI Architecture Advisory",
          model: selectedModel,
          stream: true
        })
      });

      const contentType = res.headers.get("content-type") || "";

      if (contentType.includes("text/event-stream") && res.body) {
        const reader = res.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let buffer = "";
        let accumulatedContent = "";
        let activeEngine = `${activeSpec.providerLabel} (${selectedModel}) • Live Stream`;
        let isFallback = false;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

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
                isFallback = eventData.isFallback || false;
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantMsgId
                      ? { ...m, engine: activeEngine, isFallback }
                      : m
                  )
                );
              } else if (eventData.type === "delta" && eventData.text) {
                accumulatedContent += eventData.text;
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantMsgId
                      ? { ...m, content: accumulatedContent, engine: activeEngine }
                      : m
                  )
                );
              } else if (eventData.type === "done") {
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantMsgId
                      ? { ...m, latencyMs: eventData.latencyMs }
                      : m
                  )
                );
              }
            } catch {
              // skip unparseable SSE line
            }
          }
        }
      } else {
        // Non-streaming fallback
        const data = await res.json();
        if (res.ok && data.reply) {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMsgId
                ? {
                    ...m,
                    content: data.reply,
                    engine: data.engine || `${activeSpec.providerLabel} (${selectedModel})`,
                    latencyMs: data.latencyMs,
                    isFallback: data.fallbackTriggered
                  }
                : m
            )
          );
        } else {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMsgId
                ? {
                    ...m,
                    content: data.error || "Unable to generate architectural response. Please try again or switch model.",
                    engine: "System Alert"
                  }
                : m
            )
          );
        }
      }
    } catch (err: any) {
      if (err?.name !== "AbortError") {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsgId
              ? {
                  ...m,
                  content: "Network error: Connection to the AI Systems Copilot endpoint failed.",
                  engine: "Connection Error"
                }
              : m
          )
        );
      }
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <aside aria-label="Executive AI Systems Copilot" className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      {/* Collapsed Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-3 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full bg-slate-900/95 dark:bg-[#0c1220]/95 hover:bg-slate-800 dark:hover:bg-blue-950 text-white border border-blue-500/40 dark:border-cyan-500/40 shadow-2xl shadow-blue-600/30 backdrop-blur-xl transition-all duration-300 hover:scale-105 active:scale-95"
          title="Open Executive AI Systems Copilot"
        >
          {/* Animated Glow Halo */}
          <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 opacity-60 blur-xs group-hover:opacity-100 transition duration-300 -z-10 animate-pulse" />

          <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white shadow-inner flex-shrink-0">
            <Sparkles className="w-4 h-4 text-white animate-spin-slow" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-900 animate-ping" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-slate-900" />
          </div>

          <div className="text-left">
            <div className="text-xs font-bold tracking-tight text-white flex items-center gap-1.5">
              <span>AI Systems Copilot</span>
              <span className="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                154 TPS Free
              </span>
            </div>
            <div className="text-[10px] font-mono text-slate-300 dark:text-cyan-200 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Spar with Architecture AI</span>
            </div>
          </div>
        </button>
      )}

      {/* Expanded Floating Chatbot Window */}
      {isOpen && (
        <div
          className={`flex flex-col bg-white/95 dark:bg-[#090e1a]/95 backdrop-blur-2xl border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl transition-all duration-300 overflow-hidden ${
            isExpanded
              ? "w-[94vw] sm:w-[560px] md:w-[620px] h-[720px] max-h-[90vh]"
              : "w-[94vw] sm:w-[460px] md:w-[480px] h-[580px] max-h-[85vh]"
          }`}
        >
          {/* Header */}
          <div className="p-3.5 sm:p-4 bg-slate-900 dark:bg-[#070b14] text-white border-b border-slate-800 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-2xl bg-blue-600 flex items-center justify-center text-white flex-shrink-0 shadow-md">
                <Bot className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight truncate">
                    Executive AI Copilot
                  </h3>
                  <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Live
                  </span>
                </div>
                <div className="text-[11px] font-mono text-slate-400 truncate">
                  Architecture & Leadership Advisory
                </div>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-1 flex-shrink-0">
              <button
                onClick={handleClearHistory}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="Clear Chat History"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors hidden sm:block"
                title={isExpanded ? "Collapse View" : "Expand View"}
              >
                {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="Close Window"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Model Control Strip (Requested User Feature) */}
          <div className="px-3.5 py-2 bg-slate-100/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1.5 min-w-0 flex-1">
              <Sliders className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400 flex-shrink-0" />
              <div className="relative flex-1 min-w-0">
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg px-2 py-1 text-[11px] font-mono font-semibold text-slate-900 dark:text-cyan-300 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer truncate"
                  title="Select AI Model"
                >
                  <optgroup label="⚡ Google Gemini Tier (Free Default Workhorse)">
                    {AVAILABLE_MODELS.filter((m) => m.provider === "google-gemini").map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="✨ Vercel AI Gateway (Free Tier Models)">
                    {AVAILABLE_MODELS.filter((m) => m.provider === "vercel-ai-gateway").map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>
            </div>

            <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1 flex-shrink-0 bg-white dark:bg-slate-950 px-2 py-1 rounded-md border border-slate-200 dark:border-slate-800">
              <Zap className="w-3 h-3 text-amber-500" />
              <span>{activeSpec.speed || activeSpec.tpm || "Ready"}</span>
            </div>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[90%] sm:max-w-[85%] rounded-2xl p-3 sm:p-3.5 text-xs sm:text-[13px] shadow-xs ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-slate-100 dark:bg-slate-900/90 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 rounded-bl-none"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <FormattedMarkdown content={msg.content} />
                  ) : (
                    <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                  )}
                </div>

                {/* Message Meta / Telemetry */}
                <div className="flex items-center gap-2 mt-1 px-1 text-[10px] font-mono text-slate-500 dark:text-slate-400">
                  {msg.engine && (
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>{msg.engine}</span>
                    </span>
                  )}
                  {msg.latencyMs !== undefined && (
                    <span className="text-blue-600 dark:text-cyan-400">
                      • {msg.latencyMs}ms
                    </span>
                  )}
                  <span>• {msg.timestamp}</span>

                  {msg.role === "assistant" && (
                    <button
                      onClick={() => handleCopy(msg.id, msg.content)}
                      className="ml-1 hover:text-slate-900 dark:hover:text-white transition-colors"
                      title="Copy Answer"
                    >
                      {copiedId === msg.id ? (
                        <Check className="w-3 h-3 text-emerald-500" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Loading / Thinking State */}
            {loading && (
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 max-w-[80%]">
                <div className="w-5 h-5 rounded-full bg-blue-600/20 text-blue-600 dark:text-cyan-400 flex items-center justify-center animate-spin">
                  <Sparkles className="w-3 h-3" />
                </div>
                <div className="text-xs font-mono text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <span>Generating architectural analysis with {activeSpec.name.split(" ")[0]}...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick-Prompt Carousel Pills */}
          <div className="px-3 py-2 bg-slate-50/90 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800 overflow-x-auto no-scrollbar flex items-center gap-1.5">
            <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase font-bold flex-shrink-0 mr-1">
              Quick Spar:
            </span>
            {QUICK_PROMPTS.map((qp, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(qp.query)}
                disabled={loading}
                className="flex-shrink-0 px-2.5 py-1 rounded-full text-[11px] font-medium bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-300 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-cyan-500/50 transition-all shadow-xs"
              >
                {qp.label}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <div className="p-3 bg-white dark:bg-[#070b14] border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 rounded-2xl p-1.5 border border-slate-200 dark:border-slate-800 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Ask ${activeSpec.name.split(" ")[0]} anything (e.g. system design, ROI, tech stack)...`}
                rows={1}
                className="flex-1 bg-transparent px-2.5 py-1 text-xs sm:text-[13px] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none resize-none max-h-24"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!input.trim() || loading}
                className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white transition-all shadow-sm flex-shrink-0"
                title="Send Message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400 mt-1.5 px-1">
              <span>Press <kbd className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200">Enter</kbd> to send</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Zero Data Retention on Upstream APIs</span>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
