"use client";

import React, { useEffect } from "react";
import { X, Sparkles, Shield, Mail } from "lucide-react";
import ContactForm from "./ContactForm";

export interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopic?: string;
}

export default function ContactModal({
  isOpen,
  onClose,
  initialTopic,
}: ContactModalProps) {
  // Lock body scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      // Note: Deliberately NO onClick on backdrop to enforce that modal can ONLY be closed by 'X' or 'Cancel'
    >
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-[#0c1220] border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden my-8 animate-in zoom-in-95 duration-200 ring-1 ring-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sleek Decorative Ambient Gradients */}
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-start justify-between pb-5 border-b border-slate-100 dark:border-slate-800/80 relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-cyan-300 text-xs font-mono mb-2">
              <Mail className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
              Direct Message
            </div>
            <h2
              id="contact-modal-title"
              className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight"
            >
              Get in Touch
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm font-light mt-1">
              Direct channel for technical leadership, Staff/Principal AI architecture, and consulting.
            </p>
          </div>

          {/* Close 'X' Button */}
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white border border-slate-200 dark:border-slate-800 transition-all cursor-pointer shadow-xs"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Contact Form */}
        <div className="pt-6 relative z-10">
          <ContactForm
            isModal={true}
            onCancel={onClose}
            initialTopic={initialTopic}
          />
        </div>
      </div>
    </div>
  );
}
