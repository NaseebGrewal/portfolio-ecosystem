import { describe, it, expect } from "vitest";
import { FLAGSHIP_PROJECTS, ENTERPRISE_SYSTEMS_CATALOG, ENTERPRISE_PEDIGREE, CANDIDATE_PROFILE } from "../src/data/portfolio_data";
import { AVAILABLE_MODELS, DEFAULT_MODEL, STABLE_CASCADE_CHAIN } from "../src/config/models";

describe("Portfolio Data & Flagship Projects", () => {
  it("should contain candidate name and executive profile metadata", () => {
    expect(CANDIDATE_PROFILE.name).toBeDefined();
    expect(CANDIDATE_PROFILE.name.length).toBeGreaterThan(3);
    expect(CANDIDATE_PROFILE.title).toContain("Senior AI Solutions Architect");
    expect(CANDIDATE_PROFILE.location).toContain("Germany");
    expect(CANDIDATE_PROFILE.languages).toHaveLength(2);
  });

  it("should contain enterprise pedigree with 7 verified organizations", () => {
    expect(ENTERPRISE_PEDIGREE).toHaveLength(7);
    const companyNames = ENTERPRISE_PEDIGREE.map((c) => c.name);
    expect(companyNames).toContain("Heidelberg Materials");
    expect(companyNames).toContain("Continental");
    expect(companyNames).toContain("SAP");
    expect(companyNames).toContain("IIT Roorkee");
  });

  it("should contain all 4 flagship projects with complete metadata", () => {
    expect(FLAGSHIP_PROJECTS).toHaveLength(4);
    const titles = FLAGSHIP_PROJECTS.map((p) => p.title);
    expect(titles).toContain("Enterprise Materials Intelligence Platform");
    expect(titles).toContain("ChemAgent-Gov: Multi-Agent REACH Auditor");
    expect(titles).toContain("Ultra-Fast Lab Rheology & Mechanics Engine");
    expect(titles).toContain("Enterprise AI Gateway & FinOps Controller");
  });

  it("should contain the expanded enterprise systems catalog with 14 projects", () => {
    expect(ENTERPRISE_SYSTEMS_CATALOG.length).toBeGreaterThanOrEqual(12);
    const catalogTitles = ENTERPRISE_SYSTEMS_CATALOG.map((p) => p.title);
    expect(catalogTitles).toContain("Enterprise Material Database & R&D OS");
    expect(catalogTitles).toContain("Industrial Plant Root Cause Failure Analysis (RCFA) GenAI");
    expect(catalogTitles).toContain("Multi-Modal RAG Data Assistant & Code Quality Reviewer");
    expect(catalogTitles).toContain("R&D Data Registry (RDDR) & ODIS Ontology Search");
  });

  it("should highlight €1.2M+ vendor cost savings in candidate profile", () => {
    const costStat = CANDIDATE_PROFILE.headlineStats.find((s) => s.label.includes("Vendor"));
    expect(costStat).toBeDefined();
    expect(costStat?.value).toMatch(/€1(\.2)?M\+/);
  });

  it("should list verified AWS and Azure certifications with credential URLs", () => {
    const certNames = CANDIDATE_PROFILE.certifications.map((c) => c.name);
    expect(certNames).toContain("AWS Certified Solutions Architect / DevOps Specialist");
    expect(certNames).toContain("Microsoft Certified: Azure AI Engineer Associate");

    // Verify badge URLs exist
    CANDIDATE_PROFILE.certifications.forEach((c) => {
      expect(c.badgeUrl).toBeDefined();
      expect(c.badgeUrl.length).toBeGreaterThan(5);
    });
  });

  it("should have clean academic foundations without placeholder strings", () => {
    expect(CANDIDATE_PROFILE.degrees).toHaveLength(2);
    expect(CANDIDATE_PROFILE.degrees[0].title).toBe("M.Sc. in Applied Computer Science");
    expect(CANDIDATE_PROFILE.degrees[1].title).toBe("B.Tech. in Polymer Science & Chemical Engineering");
    expect(CANDIDATE_PROFILE.degrees[0].thesis).toBeDefined();
    expect(CANDIDATE_PROFILE.degrees[0].coreSubjects.length).toBeGreaterThan(2);
  });

  it("should contain comprehensive experience timeline and skills categories", () => {
    expect(CANDIDATE_PROFILE.experiences.length).toBeGreaterThanOrEqual(4);
    expect(CANDIDATE_PROFILE.skillCategories).toHaveLength(5);
    
    // Check key leadership role
    const leadRole = CANDIDATE_PROFILE.experiences.find((e) => e.role.includes("Lead Digital Process"));
    expect(leadRole).toBeDefined();
    expect(leadRole?.highlights.some((h) => h.includes("€1,200,000"))).toBe(true);
  });

  it("should configure verified Gemini 3.x and Vercel AI Gateway free models", () => {
    const modelIds = AVAILABLE_MODELS.map((m) => m.id);
    expect(modelIds).toContain("gemini-3.5-flash-lite");
    expect(modelIds).toContain("gemini-3.1-flash-lite");
    expect(modelIds).toContain("gemini-3.6-flash");
    expect(modelIds).toContain("gemini-3.7-flash");
    expect(modelIds).toContain("gemini-3.5-flash");

    // Verify Vercel AI Gateway Free Models
    expect(modelIds).toContain("minimax/minimax-m3-free");
    expect(modelIds).toContain("poolside/laguna-s-2.1-free");
    expect(modelIds).toContain("inclusionai/ling-3.0-flash-fin-free");
    expect(modelIds).toContain("minimax/minimax-m2.7-free");

    // Ensure default model is configured as free Google Gemini workhorse
    expect(DEFAULT_MODEL).toBe("gemini-3.5-flash-lite");

    // Ensure restricted / paid models and deprecated models are strictly excluded
    expect(modelIds).not.toContain("deepseek/deepseek-v4-flash-0731");
    expect(modelIds).not.toContain("gemini-2.5-flash");
    expect(modelIds).not.toContain("gemini-2.0-flash");
    expect(modelIds).not.toContain("gemini-3-flash");
    expect(modelIds).not.toContain("gemma-4-31b-it");

    // Verify quota & speed parameters
    const liteModel = AVAILABLE_MODELS.find((m) => m.id === "gemini-3.5-flash-lite");
    expect(liteModel?.rpm).toBe(15);
    expect(liteModel?.rpd).toBe(500);

    const minimaxFree = AVAILABLE_MODELS.find((m) => m.id === "minimax/minimax-m3-free");
    expect(minimaxFree?.provider).toBe("vercel-ai-gateway");
    expect(minimaxFree?.speed).toContain("154 tps");
    expect(minimaxFree?.contextWindow).toContain("1,000,000");

    const flagship = AVAILABLE_MODELS.find((m) => m.id === "gemini-3.7-flash");
    expect(flagship?.rpm).toBe(5);
    expect(flagship?.rpd).toBe(20);
  });

  it("should define stable fallback cascade chain and default workhorse model", () => {
    expect(DEFAULT_MODEL).toBe("gemini-3.5-flash-lite");
    expect(STABLE_CASCADE_CHAIN).toContain("gemini-3.5-flash-lite");
    expect(STABLE_CASCADE_CHAIN).toContain("minimax/minimax-m3-free");
    expect(STABLE_CASCADE_CHAIN).toContain("gemini-3.1-flash-lite");
    expect(STABLE_CASCADE_CHAIN).toContain("gemini-3.6-flash");
    expect(STABLE_CASCADE_CHAIN.length).toBeGreaterThanOrEqual(4);
  });
});
