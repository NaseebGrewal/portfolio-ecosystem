"use client";

import React, { useState, useMemo } from "react";
import { Search, Filter, ShieldCheck, Zap, Activity, Info } from "lucide-react";

interface SampleMaterial {
  id: string;
  name: string;
  family: string;
  modulus: number; // MPa
  strength: number; // MPa
  density: number; // g/cm3
  flammability: string;
  reach: boolean;
  applications: string[];
}

const SAMPLE_DATA: SampleMaterial[] = [
  {
    id: "MAT-PC-101",
    name: "Makroblend High-Impact Polycarbonate",
    family: "Polycarbonate (PC)",
    modulus: 2400,
    strength: 66,
    density: 1.20,
    flammability: "V-0 (UL94)",
    reach: true,
    applications: ["Automotive Lighting", "EV Battery Enclosures"]
  },
  {
    id: "MAT-PA66-204",
    name: "Durethan Structural Polyamide GF30",
    family: "Polyamide (PA66)",
    modulus: 9500,
    strength: 175,
    density: 1.36,
    flammability: "HB (UL94)",
    reach: true,
    applications: ["Under-the-Hood Structural", "Gear Housings"]
  },
  {
    id: "MAT-TPU-309",
    name: "Desmopan Bio-Circular Thermoplastic",
    family: "Polyurethane (TPU)",
    modulus: 650,
    strength: 42,
    density: 1.18,
    flammability: "V-2 (UL94)",
    reach: true,
    applications: ["Wearables", "Industrial Gaskets"]
  },
  {
    id: "MAT-PEEK-500",
    name: "ThermaPeak Ultra-Heat Polymer",
    family: "Polyetheretherketone (PEEK)",
    modulus: 3800,
    strength: 100,
    density: 1.30,
    flammability: "V-0 (UL94)",
    reach: true,
    applications: ["Aerospace Insulators", "Medical Implants"]
  },
  {
    id: "MAT-PVDF-602",
    name: "Solef High-Purity Fluoropolymer",
    family: "Fluoropolymer (PVDF)",
    modulus: 2100,
    strength: 55,
    density: 1.78,
    flammability: "V-0 (UL94)",
    reach: true,
    applications: ["Semiconductor Tubing", "Lithium Battery Binders"]
  },
  {
    id: "MAT-PBT-405",
    name: "Pocan Hydrolysis-Resistant PBT",
    family: "Polyester (PBT)",
    modulus: 2800,
    strength: 75,
    density: 1.31,
    flammability: "V-0 (UL94)",
    reach: true,
    applications: ["High-Voltage Connectors", "Electronic Sensors"]
  }
];

export default function LiveMaterialPlayground() {
  const [search, setSearch] = useState("");
  const [minModulus, setMinModulus] = useState(0);
  const [selectedFamily, setSelectedFamily] = useState("ALL");

  const filteredMaterials = useMemo(() => {
    return SAMPLE_DATA.filter((mat) => {
      const matchSearch =
        mat.name.toLowerCase().includes(search.toLowerCase()) ||
        mat.family.toLowerCase().includes(search.toLowerCase()) ||
        mat.applications.some((app) => app.toLowerCase().includes(search.toLowerCase()));
      const matchModulus = mat.modulus >= minModulus;
      const matchFamily = selectedFamily === "ALL" || mat.family.includes(selectedFamily);
      return matchSearch && matchModulus && matchFamily;
    });
  }, [search, minModulus, selectedFamily]);

  return (
    <div id="interactive-demo" className="my-16 p-6 sm:p-8 rounded-2xl bg-surface border border-surfaceBorder">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-mono font-medium bg-cyan-950/70 border border-cyan-800 text-cyan-300 mb-2">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            Live Embedded Simulation
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Materials Intelligence Explorer Sandbox
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 font-light mt-1">
            Experience the real-time multi-variable filtering engine designed for R&D chemists & plant engineers.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-gray-900 border border-gray-800 text-emerald-400 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5" />
            Local WASM / Edge Engine: Ready
          </span>
        </div>
      </div>

      {/* Control Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search trade name or application (e.g. EV Battery)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-gray-900/90 border border-gray-700 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Family Selector */}
        <div>
          <select
            value={selectedFamily}
            onChange={(e) => setSelectedFamily(e.target.value)}
            className="w-full px-3 py-2.5 rounded-lg bg-gray-900/90 border border-gray-700 text-xs text-white focus:outline-none focus:border-blue-500"
          >
            <option value="ALL">All Polymer Families</option>
            <option value="Polycarbonate">Polycarbonate (PC)</option>
            <option value="Polyamide">Polyamide (PA66)</option>
            <option value="Polyurethane">Polyurethane (TPU)</option>
            <option value="PEEK">PEEK</option>
          </select>
        </div>

        {/* Tensile Modulus Slider */}
        <div className="p-2.5 rounded-lg bg-gray-900/90 border border-gray-700 flex flex-col justify-center">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Min Tensile Modulus</span>
            <span className="font-mono text-blue-400 font-semibold">{minModulus} MPa</span>
          </div>
          <input
            type="range"
            min="0"
            max="8000"
            step="200"
            value={minModulus}
            onChange={(e) => setMinModulus(Number(e.target.value))}
            className="w-full accent-blue-500 h-1.5 bg-gray-700 rounded-lg cursor-pointer"
          />
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMaterials.map((mat) => (
          <div
            key={mat.id}
            className="p-5 rounded-xl bg-gray-950 border border-gray-800 hover:border-blue-500/40 transition-all"
          >
            <div className="flex justify-between items-start gap-2 mb-2">
              <div>
                <span className="text-[10px] font-mono text-gray-500 uppercase">{mat.id}</span>
                <h4 className="text-base font-bold text-white tracking-tight">{mat.name}</h4>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800/60 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> REACH Pass
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 my-4 py-3 px-3 rounded-lg bg-gray-900/60 border border-gray-800/80">
              <div>
                <div className="text-[11px] text-gray-400">Tensile Modulus</div>
                <div className="text-sm font-bold text-blue-400 font-mono">{mat.modulus} MPa</div>
              </div>
              <div>
                <div className="text-[11px] text-gray-400">Tensile Strength</div>
                <div className="text-sm font-bold text-gray-200 font-mono">{mat.strength} MPa</div>
              </div>
              <div>
                <div className="text-[11px] text-gray-400">Density</div>
                <div className="text-sm font-bold text-gray-200 font-mono">{mat.density} g/cm³</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {mat.applications.map((app, i) => (
                <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-gray-800 text-gray-400">
                  {app}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
