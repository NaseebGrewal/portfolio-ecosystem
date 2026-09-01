/**
 * Email domain typo detection (Mailcheck-style).
 *
 * Pure, dependency-free utilities used by the contact form to catch
 * high-frequency domain misspellings (e.g. `gmal.com` -> `gmail.com`)
 * that still pass RFC 5322 syntax validation. The goal is error
 * PREVENTION (Nielsen heuristic #5): a syntactically valid but
 * misspelled domain silently breaks the confirmation-email loop.
 */

export const COMMON_EMAIL_DOMAINS: readonly string[] = [
  "gmail.com",
  "googlemail.com",
  "outlook.com",
  "hotmail.com",
  "live.com",
  "msn.com",
  "icloud.com",
  "me.com",
  "mac.com",
  "yahoo.com",
  "aol.com",
  "proton.me",
  "protonmail.com",
  "gmx.com",
  "gmx.de",
  "web.de",
  "t-online.de",
  "mail.com",
  "zoho.com",
  "fastmail.com",
];

/** Classic Levenshtein edit distance with an early-exit ceiling. */
export function levenshtein(a: string, b: string, maxDistance = 3): number {
  if (a === b) return 0;
  const la = a.length;
  const lb = b.length;
  if (la === 0) return lb;
  if (lb === 0) return la;
  if (Math.abs(la - lb) > maxDistance) return maxDistance + 1;

  let prev = new Array<number>(lb + 1);
  let curr = new Array<number>(lb + 1);
  for (let j = 0; j <= lb; j++) prev[j] = j;

  for (let i = 1; i <= la; i++) {
    curr[0] = i;
    let rowMin = curr[0];
    for (let j = 1; j <= lb; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost);
      if (curr[j] < rowMin) rowMin = curr[j];
    }
    if (rowMin > maxDistance) return maxDistance + 1;
    const tmp = prev;
    prev = curr;
    curr = tmp;
  }
  return prev[lb];
}

export interface EmailSuggestion {
  /** The corrected full email address, e.g. "sarah@gmail.com". */
  fullEmail: string;
  /** The corrected domain, e.g. "gmail.com". */
  suggestedDomain: string;
  /** The originally typed (suspicious) domain, e.g. "gmal.com". */
  originalDomain: string;
}

/**
 * Detect a likely domain typo and propose the closest well-known domain.
 *
 * Returns `null` when:
 *  - the input has no valid local@domain shape
 *  - the domain is already an exact known domain
 *  - the domain is a plausible corporate/institutional domain
 *    (2+ character TLD other than the typo-prone ones and far from every
 *    known domain — avoids false positives like "company.de")
 *  - the closest known domain is still more than `threshold` edits away
 */
export function suggestEmailDomain(
  email: string,
  threshold = 2,
  domains: readonly string[] = COMMON_EMAIL_DOMAINS
): EmailSuggestion | null {
  if (typeof email !== "string") return null;
  const trimmed = email.trim().toLowerCase();
  const atIndex = trimmed.lastIndexOf("@");
  if (atIndex <= 0 || atIndex === trimmed.length - 1) return null;

  const localPart = trimmed.slice(0, atIndex);
  const domain = trimmed.slice(atIndex + 1);
  if (localPart.length === 0 || domain.length < 3 || domain.indexOf(".") === -1) {
    return null;
  }

  // Exact match with a known domain — nothing to suggest.
  if (domains.includes(domain)) return null;

  let bestDomain: string | null = null;
  let bestDistance = Number.POSITIVE_INFINITY;
  for (const candidate of domains) {
    const d = levenshtein(domain, candidate, threshold);
    if (d < bestDistance) {
      bestDistance = d;
      bestDomain = candidate;
    }
  }

  if (bestDomain === null || bestDistance === 0 || bestDistance > threshold) {
    return null;
  }

  return {
    fullEmail: `${localPart}@${bestDomain}`,
    suggestedDomain: bestDomain,
    originalDomain: domain,
  };
}
