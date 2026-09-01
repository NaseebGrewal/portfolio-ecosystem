"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Loader2,
  Mail,
  Tag,
  MessageSquare,
  ShieldCheck,
  RefreshCw,
  X,
  User,
  Building2,
  ArrowLeft,
  AlertTriangle,
  ClipboardCheck,
  Eye,
  PenLine
} from "lucide-react";
import { suggestEmailDomain } from "../lib/emailDomain";

/** Compact per-row "Edit" action used on the review screen (>=44px touch target on mobile). */
function ReviewEditButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Edit ${label}`}
      className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1.5 min-h-[44px] sm:min-h-[36px] rounded-lg text-[11px] font-semibold text-blue-700 dark:text-cyan-400 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/60 dark:hover:bg-blue-950 border border-blue-200 dark:border-blue-900 transition-colors cursor-pointer"
    >
      <PenLine className="w-3 h-3" />
      Edit
    </button>
  );
}

export interface ContactFormProps {
  onCancel?: () => void;
  isModal?: boolean;
  initialTopic?: string;
}

export const TOPIC_BADGES = [
  { id: "staff-role", label: "Staff / Lead AI Role", icon: "💼" },
  { id: "genai-agents", label: "Multi-Agent & GenAI Systems", icon: "🤖" },
  { id: "materials-rd", label: "R&D Digitalization & AI", icon: "🔬" },
  { id: "finops-cloud", label: "Cloud & AI cost control", icon: "⚡" },
  { id: "advisory", label: "Technical Advisory", icon: "📊" },
  { id: "custom", label: "Other / Custom Topic", icon: "✨" },
];

export const ROLE_OPTIONS = [
  "Recruiter / Talent Partner",
  "Hiring Manager / CTO",
  "Founder / Executive",
  "Engineering Peer",
  "Other",
];

export const BUDGET_OPTIONS = [
  "Full-time role (N/A)",
  "Under €10k",
  "€10k – €50k",
  "€50k – €150k",
  "€150k+",
  "To be scoped",
];

export const TIMELINE_OPTIONS = [
  "Immediate",
  "This quarter",
  "Next 6 months",
  "Exploring / no fixed date",
];

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export default function ContactForm({ onCancel, isModal = false, initialTopic }: ContactFormProps) {
  const [senderName, setSenderName] = useState("");
  const [organization, setOrganization] = useState("");
  // Untouched qualifier selects submit as undefined — no fabricated "Recruiter / Full-time / Immediate" context
  const [senderRole, setSenderRole] = useState("");
  const [budgetRange, setBudgetRange] = useState("");
  const [timeline, setTimeline] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [email, setEmail] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string>(
    initialTopic || "Technical Advisory"
  );
  const [customTopic, setCustomTopic] = useState("");
  const [message, setMessage] = useState("");

  const [touchedEmail, setTouchedEmail] = useState(false);
  const [touchedMessage, setTouchedMessage] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [submissionReceipt, setSubmissionReceipt] = useState<{
    referenceId: string;
    topic: string;
    timestamp: string;
  } | null>(null);

  // Two-step "Check your answers" flow: editing -> reviewing -> (confirmed) sending
  const [step, setStep] = useState<"editing" | "reviewing">("editing");
  const [suggestionDismissed, setSuggestionDismissed] = useState(false);
  const [focusTarget, setFocusTarget] = useState<string | null>(null);
  const reviewHeadingRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (initialTopic) {
      const matchedBadge = TOPIC_BADGES.find(
        (b) => b.label.toLowerCase() === initialTopic.toLowerCase() || b.id === initialTopic
      );
      if (matchedBadge) {
        setSelectedTopic(matchedBadge.label);
      } else {
        setSelectedTopic("Other / Custom Topic");
        setCustomTopic(initialTopic);
      }
    }
  }, [initialTopic]);

  // Focus management across steps: move focus to the review heading on enter,
  // and back to the originating field when jumping in via a per-row "Edit".
  useEffect(() => {
    if (step === "reviewing") {
      reviewHeadingRef.current?.focus();
    } else if (focusTarget) {
      document.getElementById(focusTarget)?.focus();
      setFocusTarget(null);
    }
  }, [step, focusTarget]);

  // Validation & Effective Topic Calculation
  const isEmailValid = useMemo(() => EMAIL_REGEX.test(email.trim()), [email]);
  const isCustomTopicNeeded = selectedTopic === "Other / Custom Topic" || selectedTopic === "custom";
  
  const effectiveTopic = useMemo(() => {
    if (isCustomTopicNeeded) {
      return customTopic.trim();
    }
    if (customTopic.trim().length > 0) {
      return `${selectedTopic}: ${customTopic.trim()}`;
    }
    return selectedTopic;
  }, [selectedTopic, customTopic, isCustomTopicNeeded]);

  const isTopicValid = useMemo(() => {
    if (isCustomTopicNeeded) {
      return customTopic.trim().length >= 2;
    }
    return Boolean(selectedTopic && selectedTopic.trim().length > 0);
  }, [selectedTopic, customTopic, isCustomTopicNeeded]);

  const isMessageValid = useMemo(() => message.trim().length >= 10, [message]);

  const isFormValid = isEmailValid && isTopicValid && isMessageValid;

  // "Did you mean ...?" typo guard — syntactically valid emails can still carry
  // misspelled domains (gmal.com), silently breaking the confirmation/reply loop.
  const emailSuggestion = useMemo(
    () => (isEmailValid && !suggestionDismissed ? suggestEmailDomain(email) : null),
    [email, isEmailValid, suggestionDismissed]
  );

  const applyEmailSuggestion = () => {
    if (!emailSuggestion) return;
    setEmail(emailSuggestion.fullEmail);
    setSuggestionDismissed(true);
  };

  const enterEditMode = (targetId?: string) => {
    setFocusTarget(targetId ?? null);
    setStep("editing");
  };

  const sendMessage = async () => {
    if (!isFormValid || isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderName: senderName.trim() || undefined,
          organization: organization.trim() || undefined,
          senderRole: senderRole || undefined,
          budgetRange: budgetRange || undefined,
          timeline: timeline || undefined,
          email: email.trim(),
          topic: selectedTopic,
          customTopic: customTopic.trim() || undefined,
          message: message.trim(),
          website: honeypot, // honeypot — always empty for humans
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to transmit inquiry.");
      }

      setSubmissionReceipt({
        referenceId: data.referenceId || `INQ-${Date.now().toString(36).toUpperCase()}`,
        topic: data.topic || effectiveTopic,
        timestamp: data.timestamp || new Date().toISOString(),
      });
      setStatus("success");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setErrorMessage(msg);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouchedEmail(true);
    setTouchedMessage(true);

    if (!isFormValid || isSubmitting) return;

    // Enterprise "Check your answers" gate: submitting the form only advances
    // to the review step; transmission happens on explicit confirmation there.
    if (step === "editing") {
      setStep("reviewing");
      return;
    }

    void sendMessage();
  };

  const handleReset = () => {
    setSenderName("");
    setOrganization("");
    setSenderRole("");
    setBudgetRange("");
    setTimeline("");
    setHoneypot("");
    setEmail("");
    setSelectedTopic("Technical Advisory");
    setCustomTopic("");
    setMessage("");
    setTouchedEmail(false);
    setTouchedMessage(false);
    setStatus("idle");
    setErrorMessage("");
    setSubmissionReceipt(null);
    setStep("editing");
    setSuggestionDismissed(false);
    setFocusTarget(null);
  };

  if (status === "success" && submissionReceipt) {
    return (
      <div className="p-6 sm:p-8 rounded-2xl bg-emerald-50/90 dark:bg-slate-900/90 border border-emerald-300 dark:border-emerald-500/30 text-center animate-in fade-in zoom-in-95 duration-300 shadow-xl shadow-emerald-500/5">
        <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-300 dark:border-emerald-400/40 mx-auto flex items-center justify-center mb-4 text-emerald-600 dark:text-emerald-400 shadow-md shadow-emerald-500/10">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
          Message sent
        </h3>

        <p className="text-slate-700 dark:text-slate-200 text-sm max-w-md mx-auto mb-6 leading-relaxed font-normal">
          Your message has been delivered and a confirmation is on its way to your inbox. I personally reply within 24 hours.
        </p>

        <div className="bg-white/95 dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800 rounded-xl p-4 max-w-sm mx-auto mb-6 text-left font-mono text-xs space-y-2.5 shadow-sm">
          <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
            <span className="font-medium">Reference ID:</span>
            <span className="text-emerald-700 dark:text-emerald-400 font-bold tracking-wider">{submissionReceipt.referenceId}</span>
          </div>
          <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
            <span className="font-medium">Subject / Topic:</span>
            <span className="text-slate-900 dark:text-slate-100 font-semibold truncate max-w-[190px]" title={submissionReceipt.topic}>{submissionReceipt.topic}</span>
          </div>
          <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
            <span className="font-medium">Status:</span>
            <span className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Delivered to Inbox
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center gap-2 border border-slate-300 dark:border-slate-700 transition-all shadow-xs cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Send another</span>
          </button>

          {isModal && onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
            >
              Close
            </button>
          )}
        </div>
      </div>
    );
  }

  // -- Step 2: "Check your answers" review gate (GOV.UK design pattern) ------
  if (step === "reviewing") {
    const contextRows = [
      { label: "Name", value: senderName.trim(), target: "cf-name" },
      { label: "Organization", value: organization.trim(), target: "cf-organization" },
      { label: "Your role", value: senderRole, target: "cf-role" },
      { label: "Budget", value: budgetRange, target: "cf-budget" },
      { label: "Timeline", value: timeline, target: "cf-timeline" },
    ];

    return (
      <div className="space-y-5 text-left animate-in fade-in slide-in-from-bottom-2 duration-300">
        <p className="sr-only" role="status">
          Review step: please verify all entered information before sending.
        </p>

        {/* Review header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-cyan-400 shrink-0">
            <ClipboardCheck className="w-5 h-5" />
          </div>
          <div>
            <h3
              ref={reviewHeadingRef}
              tabIndex={-1}
              className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight focus:outline-hidden"
            >
              Review your message
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
              One last check before this reaches my inbox — especially your email address.
            </p>
          </div>
        </div>

        {/* Email — visually emphasized, highest-risk field */}
        <div className="rounded-xl border-2 border-amber-300/80 dark:border-amber-500/40 bg-amber-50/80 dark:bg-amber-950/20 p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-[11px] font-mono font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                Email — confirmation goes here
              </div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white break-all">
                {email.trim()}
              </p>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                Your receipt and my reply are sent to this address — please double-check the spelling.
              </p>
              {emailSuggestion && (
                <div role="alert" className="mt-2 flex flex-wrap items-center gap-2 text-[11px]">
                  <span className="text-amber-800 dark:text-amber-300">
                    Did you mean <strong className="font-semibold">{emailSuggestion.fullEmail}</strong>?
                  </span>
                  <button
                    type="button"
                    onClick={applyEmailSuggestion}
                    className="px-2 py-1 rounded-md bg-amber-600 hover:bg-amber-500 text-white font-semibold transition-colors cursor-pointer"
                  >
                    Use suggestion
                  </button>
                </div>
              )}
            </div>
            <ReviewEditButton onClick={() => enterEditMode("cf-email")} label="email" />
          </div>
        </div>

        {/* Subject, context fields and message */}
        <dl className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 divide-y divide-slate-100 dark:divide-slate-800/80 overflow-hidden">
          <div className="flex items-start justify-between gap-3 px-4 py-3">
            <div className="min-w-0">
              <dt className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Subject
              </dt>
              <dd className="text-xs font-medium text-slate-900 dark:text-slate-100 mt-0.5 break-words">
                {effectiveTopic}
              </dd>
            </div>
            <ReviewEditButton onClick={() => enterEditMode("cf-custom-topic")} label="subject" />
          </div>

          {contextRows.map((row) => (
            <div key={row.label} className="flex items-start justify-between gap-3 px-4 py-3">
              <div className="min-w-0">
                <dt className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {row.label}
                </dt>
                <dd
                  className={`text-xs mt-0.5 break-words ${
                    row.value
                      ? "font-medium text-slate-900 dark:text-slate-100"
                      : "text-slate-400 dark:text-slate-500 italic"
                  }`}
                >
                  {row.value || "— Not provided"}
                </dd>
              </div>
              <ReviewEditButton onClick={() => enterEditMode(row.target)} label={row.label.toLowerCase()} />
            </div>
          ))}

          <div className="flex items-start justify-between gap-3 px-4 py-3">
            <div className="min-w-0 flex-1">
              <dt className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Message
              </dt>
              <dd className="text-xs text-slate-700 dark:text-slate-300 mt-0.5 whitespace-pre-wrap break-words max-h-40 overflow-y-auto leading-relaxed">
                {message.trim()}
              </dd>
            </div>
            <ReviewEditButton onClick={() => enterEditMode("cf-message")} label="message" />
          </div>
        </dl>

        {/* Error alert if transmission failed from the review step */}
        {status === "error" && errorMessage && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Review actions */}
        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-1">
          <button
            type="button"
            onClick={() => enterEditMode()}
            disabled={isSubmitting}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold border border-slate-200 dark:border-slate-700 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to edit</span>
          </button>

          <button
            type="button"
            onClick={() => void sendMessage()}
            disabled={isSubmitting}
            className={`px-6 py-2.5 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-md ${
              !isSubmitting
                ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-blue-600/25 cursor-pointer ring-1 ring-white/20 hover:scale-[1.01]"
                : "bg-slate-200 dark:bg-slate-800/80 text-slate-400 dark:text-slate-500 border border-slate-300 dark:border-slate-800 cursor-not-allowed opacity-70"
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                <span>Sending Message...</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Confirm &amp; Send</span>
                <Sparkles className="w-3 h-3 text-cyan-200" />
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-left">
      {/* Topic Badges Selection */}
      <div>
        <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
            Topic
          </span>
          <span className="text-[11px] text-slate-500 font-normal">Pick one, or type your own</span>
        </label>

        <div className="flex flex-wrap gap-2">
          {TOPIC_BADGES.map((badge) => {
            const isSelected = selectedTopic === badge.label;
            return (
              <button
                key={badge.id}
                type="button"
                onClick={() => setSelectedTopic(badge.label)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 border cursor-pointer ${
                  isSelected
                    ? "bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/20 font-semibold ring-2 ring-blue-400/30"
                    : "bg-white dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                <span>{badge.icon}</span>
                <span>{badge.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Free-text Topic / Subject Field */}
      <div>
        <label className="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300 mb-1.5 flex items-center justify-between">
          <span>
            {isCustomTopicNeeded ? "Custom topic *" : "Subject (optional)"}
          </span>
          {isCustomTopicNeeded && (
            <span className="text-[11px] text-amber-500 font-sans">Required for custom topic</span>
          )}
        </label>
        <div className="relative">
          <input
            id="cf-custom-topic"
            type="text"
            value={customTopic}
            onChange={(e) => setCustomTopic(e.target.value)}
            placeholder={
              isCustomTopicNeeded
                ? "e.g. Staff AI role, R&D platform, advisory"
                : "e.g. role title or project name"
            }
            className={`w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900/90 border text-slate-900 dark:text-slate-100 text-xs placeholder:text-slate-400 focus:outline-hidden focus:ring-2 transition-all ${
              isCustomTopicNeeded && customTopic.trim().length < 2
                ? "border-amber-400/80 focus:ring-amber-400/40"
                : "border-slate-200 dark:border-slate-800 focus:ring-blue-500/40 focus:border-blue-500"
            }`}
          />
        </div>

        {/* Live Subject Preview — always visible so users confirm the effective topic being sent */}
        {isTopicValid && (
          <div className="mt-2 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/50 border border-blue-200/80 dark:border-blue-900/60 flex items-center gap-2 text-xs">
            <span className="text-[11px] font-mono text-blue-700 dark:text-cyan-400 font-semibold uppercase shrink-0">
              Subject:
            </span>
            <span className="text-slate-800 dark:text-slate-200 font-medium truncate">
              {isCustomTopicNeeded
                ? customTopic.trim()
                : customTopic.trim().length > 0
                ? <>{selectedTopic} <span className="text-blue-500 dark:text-cyan-400">:</span> {customTopic.trim()}</>
                : selectedTopic}
            </span>
          </div>
        )}
      </div>

      {/* Smart Context Hybrid: Full Name & Organization / Institution (Optional) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
              Name
            </span>
            <span className="text-[11px] text-slate-400 font-sans font-normal">Optional</span>
          </label>
          <div className="relative">
            <input
              id="cf-name"
              type="text"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder="e.g. Dr. Alex Miller / Sarah Jenkins"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-xs placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
              Organization
            </span>
            <span className="text-[11px] text-slate-400 font-sans font-normal">Optional</span>
          </label>
          <div className="relative">
            <input
              id="cf-organization"
              type="text"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              placeholder="e.g. Google, Max Planck Institute"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-xs placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Enterprise Context: Your Role, Budget Range, Timeline (optional — omitted when untouched) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div>
          <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Your role
          </label>
          <select
            id="cf-role"
            value={senderRole}
            onChange={(e) => setSenderRole(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all cursor-pointer"
          >
            <option value="">Select (optional)</option>
            {ROLE_OPTIONS.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Budget
          </label>
          <select
            id="cf-budget"
            value={budgetRange}
            onChange={(e) => setBudgetRange(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all cursor-pointer"
          >
            <option value="">Select (optional)</option>
            {BUDGET_OPTIONS.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Timeline
          </label>
          <select
            id="cf-timeline"
            value={timeline}
            onChange={(e) => setTimeline(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all cursor-pointer"
          >
            <option value="">Select (optional)</option>
            {TIMELINE_OPTIONS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Honeypot — invisible to humans, traps bots that auto-fill every field */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-auto w-px h-px overflow-hidden">
        <label htmlFor="cf-website">Website</label>
        <input
          id="cf-website"
          type="text"
          name="website"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Work / Personal Email Input with Real-Time Validation */}
      <div>
        <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
            Email <span className="text-rose-500">*</span>
          </span>
          {touchedEmail && (
            <span
              className={`text-[11px] font-sans font-medium flex items-center gap-1 ${
                isEmailValid ? "text-emerald-500" : "text-rose-500"
              }`}
            >
              {isEmailValid ? (
                <>
                  <CheckCircle2 className="w-3 h-3" /> Valid email syntax
                </>
              ) : (
                <>
                  <AlertCircle className="w-3 h-3" /> Valid email required (e.g., name@company.com)
                </>
              )}
            </span>
          )}
        </label>
        <div className="relative">
          <input
            id="cf-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setSuggestionDismissed(false);
              if (!touchedEmail) setTouchedEmail(true);
            }}
            onBlur={() => setTouchedEmail(true)}
            placeholder="recruiter@enterprise.com or founder@startup.io"
            required
            className={`w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900/90 border text-slate-900 dark:text-slate-100 text-xs placeholder:text-slate-400 focus:outline-hidden focus:ring-2 transition-all ${
              touchedEmail && !isEmailValid
                ? "border-rose-400 focus:ring-rose-400/40"
                : touchedEmail && isEmailValid
                ? "border-emerald-500/70 focus:ring-emerald-500/30"
                : "border-slate-200 dark:border-slate-800 focus:ring-blue-500/40 focus:border-blue-500"
            }`}
          />
        </div>

        {/* Inline typo guard — "Did you mean ...?" (non-blocking, one-click apply) */}
        {emailSuggestion && (
          <div
            role="alert"
            className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1.5 px-3 py-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-300/70 dark:border-amber-500/40 text-[11px]"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
            <span className="text-amber-800 dark:text-amber-300">
              Did you mean <strong className="font-semibold">{emailSuggestion.fullEmail}</strong>?
            </span>
            <button
              type="button"
              onClick={applyEmailSuggestion}
              className="px-2 py-1 rounded-md bg-amber-600 hover:bg-amber-500 text-white font-semibold transition-colors cursor-pointer"
            >
              Use suggestion
            </button>
            <button
              type="button"
              onClick={() => setSuggestionDismissed(true)}
              aria-label="Dismiss email suggestion"
              className="p-1 rounded-md text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-colors cursor-pointer"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>

      {/* Message Body Input */}
      <div>
        <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
            Message Details: <span className="text-rose-500">*</span>
          </span>
          <span className="text-[11px] text-slate-500 font-mono">
            {message.length}/5000 {message.length < 10 && "(min 10 chars)"}
          </span>
        </label>
        <textarea
          id="cf-message"
          rows={isModal ? 4 : 5}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            if (!touchedMessage) setTouchedMessage(true);
          }}
          onBlur={() => setTouchedMessage(true)}
          placeholder="Describe your project, role specifications, technical objectives, or timeline..."
          required
          className={`w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900/90 border text-slate-900 dark:text-slate-100 text-xs placeholder:text-slate-400 focus:outline-hidden focus:ring-2 transition-all resize-none ${
            touchedMessage && !isMessageValid
              ? "border-rose-400 focus:ring-rose-400/40"
              : touchedMessage && isMessageValid
              ? "border-emerald-500/70 focus:ring-emerald-500/30"
              : "border-slate-200 dark:border-slate-800 focus:ring-blue-500/40 focus:border-blue-500"
          }`}
        />
      </div>

      {/* Confidentiality Guarantee */}
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400">
        <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
        <span>
          <strong>Confidential Communication:</strong> Direct inbox delivery. Your contact details are never shared or tracked.
        </span>
      </div>

      {/* Error alert if any */}
      {status === "error" && errorMessage && (
        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-2">
        {isModal && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
          >
            Cancel
          </button>
        )}

        <button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className={`px-6 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-2 transition-all shadow-md ${
            isFormValid && !isSubmitting
              ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-blue-600/25 cursor-pointer ring-1 ring-white/20 hover:scale-[1.01]"
              : "bg-slate-200 dark:bg-slate-800/80 text-slate-400 dark:text-slate-500 border border-slate-300 dark:border-slate-800 cursor-not-allowed opacity-70"
          }`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
              <span>Sending Message...</span>
            </>
          ) : (
            <>
              <Eye className="w-3.5 h-3.5" />
              <span>Review Message</span>
              <Sparkles className="w-3 h-3 text-cyan-200" />
            </>
          )}
        </button>
      </div>

      {/* Validation helper when disabled */}
      {!isFormValid && (
        <p className="text-[11px] text-slate-400 dark:text-slate-500 text-right italic font-light">
          {!isEmailValid
            ? "• Enter a valid email address"
            : !isTopicValid
            ? "• Specify custom topic name"
            : !isMessageValid
            ? `• Message requires at least ${10 - message.trim().length} more character(s)`
            : ""}
        </p>
      )}
    </form>
  );
}
