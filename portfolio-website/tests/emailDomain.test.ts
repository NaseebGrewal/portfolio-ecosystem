import { describe, it, expect } from "vitest";
import {
  suggestEmailDomain,
  levenshtein,
  COMMON_EMAIL_DOMAINS,
} from "../src/lib/emailDomain";

describe("levenshtein", () => {
  it("returns 0 for identical strings", () => {
    expect(levenshtein("gmail.com", "gmail.com")).toBe(0);
  });

  it("computes single-edit distances correctly", () => {
    expect(levenshtein("gmal.com", "gmail.com")).toBe(1);
    expect(levenshtein("gmial.com", "gmail.com")).toBe(2); // transposition = 2 edits
    expect(levenshtein("outlok.com", "outlook.com")).toBe(1);
  });

  it("respects the early-exit ceiling", () => {
    expect(levenshtein("aaaaaaaaaaaa.com", "gmail.com", 2)).toBeGreaterThan(2);
  });
});

describe("suggestEmailDomain — typo detection", () => {
  it("suggests gmail.com for gmal.com", () => {
    const s = suggestEmailDomain("sarah.jenkins@gmal.com");
    expect(s).not.toBeNull();
    expect(s?.suggestedDomain).toBe("gmail.com");
    expect(s?.fullEmail).toBe("sarah.jenkins@gmail.com");
    expect(s?.originalDomain).toBe("gmal.com");
  });

  it("suggests for common misspellings of major providers", () => {
    expect(suggestEmailDomain("alex@gmial.com")?.suggestedDomain).toBe("gmail.com");
    expect(suggestEmailDomain("alex@gmail.co")?.suggestedDomain).toBe("gmail.com");
    expect(suggestEmailDomain("alex@hotmial.com")?.suggestedDomain).toBe("hotmail.com");
    expect(suggestEmailDomain("alex@outlok.com")?.suggestedDomain).toBe("outlook.com");
    expect(suggestEmailDomain("alex@iclod.com")?.suggestedDomain).toBe("icloud.com");
    expect(suggestEmailDomain("alex@yaho.com")?.suggestedDomain).toBe("yahoo.com");
  });

  it("is case-insensitive and trims whitespace", () => {
    const s = suggestEmailDomain("  Sarah@GMAL.COM  ");
    expect(s?.fullEmail).toBe("sarah@gmail.com");
  });

  it("supports a custom domain list", () => {
    const s = suggestEmailDomain("dev@enterprse.io", 2, ["enterprise.io"]);
    expect(s?.suggestedDomain).toBe("enterprise.io");
  });
});

describe("suggestEmailDomain — negative cases (no false positives)", () => {
  it("returns null for exact known domains", () => {
    expect(suggestEmailDomain("user@gmail.com")).toBeNull();
    expect(suggestEmailDomain("user@outlook.com")).toBeNull();
    expect(suggestEmailDomain("user@proton.me")).toBeNull();
  });

  it("returns null for plausible corporate/institutional domains", () => {
    expect(suggestEmailDomain("a.miller@heidelberg-materials.com")).toBeNull();
    expect(suggestEmailDomain("dev@sap.de")).toBeNull();
    expect(suggestEmailDomain("prof@mpi-stuttgart.mpg.de")).toBeNull();
  });

  it("returns null for malformed input", () => {
    expect(suggestEmailDomain("")).toBeNull();
    expect(suggestEmailDomain("not-an-email")).toBeNull();
    expect(suggestEmailDomain("@gmal.com")).toBeNull();
    expect(suggestEmailDomain("user@")).toBeNull();
    expect(suggestEmailDomain("user@localhost")).toBeNull();
    expect(suggestEmailDomain(null as unknown as string)).toBeNull();
  });

  it("returns null when closest domain exceeds the threshold", () => {
    expect(suggestEmailDomain("user@xyzzy-mail-provider.net")).toBeNull();
  });
});

describe("COMMON_EMAIL_DOMAINS registry", () => {
  it("contains the major consumer providers", () => {
    expect(COMMON_EMAIL_DOMAINS).toContain("gmail.com");
    expect(COMMON_EMAIL_DOMAINS).toContain("outlook.com");
    expect(COMMON_EMAIL_DOMAINS).toContain("icloud.com");
    expect(COMMON_EMAIL_DOMAINS.length).toBeGreaterThanOrEqual(15);
  });
});
