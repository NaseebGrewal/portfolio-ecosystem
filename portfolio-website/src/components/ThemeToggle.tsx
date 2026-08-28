"use client";

import React, { useEffect, useState, useRef } from "react";
import { Sun, Moon, Laptop, ChevronDown, Check } from "lucide-react";

export type Theme = "dark" | "light" | "system";

const THEME_OPTIONS: { id: Theme; label: string; icon: React.ReactNode }[] = [
  { id: "light", label: "Light Mode", icon: <Sun className="w-3.5 h-3.5 text-amber-500" /> },
  { id: "dark", label: "Dark Mode", icon: <Moon className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" /> },
  { id: "system", label: "System Auto", icon: <Laptop className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> }
];

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const savedTheme = (localStorage.getItem("portfolio-theme") as Theme) || "light";
    setTheme(savedTheme);
    applyTheme(savedTheme);

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const applyTheme = (t: Theme) => {
    const root = document.documentElement;
    if (t === "system") {
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (systemDark) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    } else if (t === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  const selectTheme = (t: Theme) => {
    setTheme(t);
    localStorage.setItem("portfolio-theme", t);
    applyTheme(t);
    setIsOpen(false);
  };

  if (!mounted) {
    return (
      <div className="w-20 h-8 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 animate-pulse" />
    );
  }

  const currentOption = THEME_OPTIONS.find((o) => o.id === theme) || THEME_OPTIONS[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 transition-all flex items-center gap-1.5 text-xs font-mono shadow-xs"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        title="Toggle Light / Dark / System theme"
      >
        {currentOption.icon}
        <span className="capitalize font-semibold text-[11px]">{theme}</span>
        <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-1 z-50 animate-fadeIn">
          {THEME_OPTIONS.map((option) => {
            const isActive = theme === option.id;
            return (
              <button
                key={option.id}
                onClick={() => selectTheme(option.id)}
                className={`w-full px-3 py-1.5 text-xs font-mono flex items-center justify-between gap-2 transition-colors ${
                  isActive
                    ? "bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-cyan-300 font-bold"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                <div className="flex items-center gap-2">
                  {option.icon}
                  <span className="text-[11px]">{option.label}</span>
                </div>
                {isActive && <Check className="w-3 h-3 text-blue-600 dark:text-cyan-400" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

