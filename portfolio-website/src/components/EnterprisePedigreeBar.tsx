"use client";

import React, { useState } from "react";
import { ENTERPRISE_PEDIGREE, EnterpriseCompany } from "@/data/portfolio_data";
import {
  Building2,
  CheckCircle2,
  Sparkles,
  Award,
  Globe2,
  Factory,
  Car,
  FlaskConical,
  Cpu,
  Layers,
  ShoppingBag
} from "lucide-react";

export default function EnterprisePedigreeBar() {
  const [activeCompany, setActiveCompany] = useState<EnterpriseCompany | null>(null);

  const getCompanyIcon = (id: string) => {
    switch (id) {
      case "heidelberg-materials":
        return <Building2 className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      case "continental":
        return <Car className="w-5 h-5 text-orange-600 dark:text-orange-400" />;
      case "iff-pharma":
        return <FlaskConical className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case "sap":
        return <Cpu className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case "wongdoody":
        return <Globe2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      case "meesho":
        return <ShoppingBag className="w-5 h-5 text-pink-600 dark:text-pink-400" />;
      case "iit-roorkee":
        return <Award className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
      default:
        return <Factory className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
    }
  };

  return (
    <section className="py-10 px-6 max-w-7xl mx-auto border-t border-gray-200 dark:border-surfaceBorder">
      <div className="rounded-3xl bg-white dark:bg-surface border border-gray-200 dark:border-surfaceBorder shadow-md p-6 sm:p-8">
        {/* Header Eyebrow */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-blue-600 dark:text-blue-400 uppercase tracking-wider font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Enterprise Pedigree & Track Record</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight mt-0.5">
              Organizations & Institutions Where I've Built, Scaled & Innovated
            </h3>
          </div>
          <div className="text-xs font-mono text-gray-500 dark:text-gray-400">
            7 Organizations • Cross-Sector Leadership
          </div>
        </div>

        {/* Brand Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 mb-6">
          {ENTERPRISE_PEDIGREE.map((company) => {
            const isSelected = activeCompany?.id === company.id;
            return (
              <button
                key={company.id}
                onClick={() => setActiveCompany(isSelected ? null : company)}
                onMouseEnter={() => setActiveCompany(company)}
                className={`group p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? "bg-blue-50 dark:bg-blue-950/60 border-blue-500 shadow-md shadow-blue-500/10 scale-[1.02]"
                    : "bg-gray-50/80 dark:bg-gray-900/60 hover:bg-gray-100 dark:hover:bg-gray-800/80 border-gray-200 dark:border-gray-800"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="p-2 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700">
                      {getCompanyIcon(company.id)}
                    </div>
                    <span className="text-[10px] font-mono font-bold text-gray-400 dark:text-gray-500 uppercase">
                      {company.shortCode}
                    </span>
                  </div>

                  <div className="font-bold text-sm text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors tracking-tight">
                    {company.name}
                  </div>
                  <div className="text-[11px] text-gray-500 dark:text-gray-400 leading-tight mt-0.5 font-light line-clamp-1">
                    {company.subtitle}
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-gray-200/60 dark:border-gray-800/80">
                  <span className="text-[10px] font-mono font-medium text-blue-700 dark:text-blue-300">
                    {company.badge}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Impact Callout */}
        {activeCompany ? (
          <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fadeIn">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-xs font-bold text-gray-900 dark:text-white">
                  {activeCompany.name} <span className="font-normal text-gray-500 dark:text-gray-400 font-mono text-[11px]">({activeCompany.industry})</span>
                </div>
                <div className="text-xs text-gray-700 dark:text-gray-300 font-light mt-0.5">
                  {activeCompany.impactHighlight}
                </div>
              </div>
            </div>
            <span className="text-[11px] font-mono text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/50 px-2.5 py-1 rounded-lg flex-shrink-0">
              Verified Experience
            </span>
          </div>
        ) : (
          <div className="text-center text-xs text-gray-500 dark:text-gray-400 font-mono py-1">
            Hover or click any organization above to view specific architectural contributions & impact.
          </div>
        )}
      </div>
    </section>
  );
}
