import { describe, it, expect } from "vitest";
import { FLAGSHIP_PROJECTS, CANDIDATE_PROFILE } from "../src/data/portfolio_data";

describe("Portfolio Data & Flagship Projects", () => {
  it("should contain candidate name and executive profile metadata", () => {
    expect(CANDIDATE_PROFILE.name).toBeDefined();
    expect(CANDIDATE_PROFILE.name.length).toBeGreaterThan(3);
    expect(CANDIDATE_PROFILE.title).toContain("Senior AI Solutions Architect");
    expect(CANDIDATE_PROFILE.location).toContain("Germany");
    expect(CANDIDATE_PROFILE.languages).toHaveLength(2);
  });

  it("should contain all 4 flagship projects with complete metadata", () => {
    expect(FLAGSHIP_PROJECTS).toHaveLength(4);
    const titles = FLAGSHIP_PROJECTS.map((p) => p.title);
    expect(titles).toContain("Enterprise Materials Intelligence Platform");
    expect(titles).toContain("ChemAgent-Gov: Multi-Agent REACH Auditor");
    expect(titles).toContain("Ultra-Fast Lab Rheology & Mechanics Engine");
    expect(titles).toContain("Enterprise AI Gateway & FinOps Controller");
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
});
