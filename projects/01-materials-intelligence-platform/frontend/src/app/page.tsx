"use client";

import React, { useState, useEffect, useMemo } from "react";

interface Material {
  id: string;
  trade_name: string;
  polymer_family: string;
  density_g_cm3: number;
  mechanical: {
    tensile_modulus_mpa: number;
    tensile_strength_mpa: number;
    elongation_at_break_pct: number;
    charpy_impact_kj_m2?: number;
  };
  thermal: {
    melt_temperature_c: number;
    flammability_ul94?: string;
  };
  reach_compliant: boolean;
  applications: string[];
}

export default function Home() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [family, setFamily] = useState("ALL");
  const [minModulus, setMinModulus] = useState(0);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  useEffect(() => {
    fetch(`${apiUrl}/api/v1/materials`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setMaterials(data);
        }
      })
      .catch((err) => console.error("Fetch error:", err))
      .finally(() => setLoading(false));
  }, [apiUrl]);

  const filtered = useMemo(() => {
    return materials.filter((m) => {
      const matchFamily = family === "ALL" || m.polymer_family.toLowerCase().includes(family.toLowerCase());
      const matchModulus = m.mechanical.tensile_modulus_mpa >= minModulus;
      const matchSearch =
        search === "" ||
        m.trade_name.toLowerCase().includes(search.toLowerCase()) ||
        m.applications.some((a) => a.toLowerCase().includes(search.toLowerCase()));
      return matchFamily && matchModulus && matchSearch;
    });
  }, [materials, family, minModulus, search]);

  return (
    <main style={{ padding: "2.5rem 1.5rem", maxWidth: "1280px", margin: "0 auto", fontFamily: "system-ui, sans-serif" }}>
      {/* Header */}
      <div style={{ marginBottom: "2rem", borderBottom: "1px solid #334155", paddingBottom: "1.5rem" }}>
        <div style={{ display: "inline-block", padding: "0.25rem 0.75rem", borderRadius: "9999px", background: "rgba(14, 165, 233, 0.15)", color: "#38bdf8", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.75rem" }}>
          Production Materials Intelligence Platform
        </div>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 800, color: "#f8fafc", margin: "0 0 0.5rem 0" }}>
          Polymer Formulation & Mechanical Analytics
        </h1>
        <p style={{ color: "#94a3b8", fontSize: "1rem", margin: 0 }}>
          High-performance material database with dynamic ISO 527 tensile modulus filtering, thermal properties & REACH validation.
        </p>
      </div>

      {/* Connected API Status */}
      <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: "0.75rem", padding: "1rem 1.25rem", marginBottom: "2rem", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#10b981", display: "inline-block" }}></span>
          <span style={{ color: "#e2e8f0", fontSize: "0.9rem", fontWeight: 500 }}>Backend API: <code style={{ color: "#38bdf8", background: "#1e293b", padding: "0.2rem 0.5rem", borderRadius: "0.25rem" }}>{apiUrl}</code></span>
        </div>
        <a href={`${apiUrl}/docs`} target="_blank" rel="noopener noreferrer" style={{ color: "#38bdf8", textDecoration: "none", fontSize: "0.85rem", fontWeight: 600, padding: "0.4rem 0.8rem", borderRadius: "0.375rem", background: "rgba(56, 189, 248, 0.1)", border: "1px solid rgba(56, 189, 248, 0.3)" }}>
          View Swagger Docs &rarr;
        </a>
      </div>

      {/* Controls */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem", marginBottom: "2rem", background: "#1e293b", padding: "1.25rem", borderRadius: "0.75rem", border: "1px solid #334155" }}>
        <div>
          <label style={{ display: "block", color: "#94a3b8", fontSize: "0.8rem", marginBottom: "0.4rem" }}>Search Polymer or Application</label>
          <input
            type="text"
            placeholder="e.g. EV Battery, High-Flow..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "100%", padding: "0.6rem 0.75rem", borderRadius: "0.5rem", background: "#0f172a", border: "1px solid #475569", color: "#f8fafc", fontSize: "0.9rem", outline: "none", boxSizing: "border-box" }}
          />
        </div>

        <div>
          <label style={{ display: "block", color: "#94a3b8", fontSize: "0.8rem", marginBottom: "0.4rem" }}>Polymer Family</label>
          <select
            value={family}
            onChange={(e) => setFamily(e.target.value)}
            style={{ width: "100%", padding: "0.6rem 0.75rem", borderRadius: "0.5rem", background: "#0f172a", border: "1px solid #475569", color: "#f8fafc", fontSize: "0.9rem", outline: "none", boxSizing: "border-box" }}
          >
            <option value="ALL">All Polymer Families</option>
            <option value="Polycarbonate">Polycarbonate (PC)</option>
            <option value="Polyamide">Polyamide (PA66)</option>
            <option value="Polyurethane">Polyurethane (TPU)</option>
            <option value="PEEK">PEEK</option>
            <option value="Polyoxymethylene">Polyacetal (POM)</option>
            <option value="Polyester">Polyester (PBT)</option>
            <option value="ABS">ABS</option>
            <option value="PPS">PPS</option>
          </select>
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between", color: "#94a3b8", fontSize: "0.8rem", marginBottom: "0.4rem" }}>
            <span>Min Tensile Modulus</span>
            <span style={{ color: "#38bdf8", fontWeight: "bold" }}>{minModulus} MPa</span>
          </div>
          <input
            type="range"
            min="0"
            max="16000"
            step="250"
            value={minModulus}
            onChange={(e) => setMinModulus(Number(e.target.value))}
            style={{ width: "100%", accentColor: "#38bdf8", cursor: "pointer" }}
          />
        </div>
      </div>

      {/* Materials Cards Grid */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "4rem", color: "#94a3b8" }}>Loading formulation dataset...</div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.25rem" }}>
          {filtered.map((mat) => (
            <div key={mat.id} style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: "0.75rem", padding: "1.25rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                  <div>
                    <span style={{ color: "#64748b", fontSize: "0.75rem", fontFamily: "monospace" }}>{mat.id}</span>
                    <h3 style={{ color: "#f8fafc", fontSize: "1.05rem", fontWeight: 700, margin: "0.2rem 0" }}>{mat.trade_name}</h3>
                    <span style={{ color: "#38bdf8", fontSize: "0.8rem" }}>{mat.polymer_family}</span>
                  </div>
                  <span style={{ background: "rgba(16, 185, 129, 0.15)", color: "#10b981", border: "1px solid rgba(16, 185, 129, 0.3)", padding: "0.2rem 0.5rem", borderRadius: "0.25rem", fontSize: "0.75rem", fontWeight: 600 }}>
                    REACH
                  </span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.5rem", background: "#1e293b", padding: "0.6rem", borderRadius: "0.5rem", margin: "0.75rem 0" }}>
                  <div>
                    <div style={{ color: "#94a3b8", fontSize: "0.7rem" }}>Modulus</div>
                    <div style={{ color: "#38bdf8", fontWeight: 700, fontSize: "0.85rem", fontFamily: "monospace" }}>{mat.mechanical.tensile_modulus_mpa} MPa</div>
                  </div>
                  <div>
                    <div style={{ color: "#94a3b8", fontSize: "0.7rem" }}>Strength</div>
                    <div style={{ color: "#f8fafc", fontWeight: 700, fontSize: "0.85rem", fontFamily: "monospace" }}>{mat.mechanical.tensile_strength_mpa} MPa</div>
                  </div>
                  <div>
                    <div style={{ color: "#94a3b8", fontSize: "0.7rem" }}>UL94</div>
                    <div style={{ color: "#fbbf24", fontWeight: 700, fontSize: "0.85rem", fontFamily: "monospace" }}>{mat.thermal.flammability_ul94 || "V-0"}</div>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginTop: "0.5rem", borderTop: "1px solid #1e293b", paddingTop: "0.75rem" }}>
                {mat.applications.map((app, i) => (
                  <span key={i} style={{ background: "#1e293b", color: "#cbd5e1", fontSize: "0.7rem", padding: "0.2rem 0.5rem", borderRadius: "0.25rem" }}>
                    {app}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
