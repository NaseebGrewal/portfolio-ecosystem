export type ModelProvider = "vercel-ai-gateway" | "google-gemini";

export interface ModelSpec {
  id: string;
  name: string;
  provider: ModelProvider;
  providerLabel: string;
  badge: string;
  rpm?: number | string; // Requests Per Minute
  rpd?: number | string; // Requests Per Day
  tpm?: string; // Tokens Per Minute or Tokens Per Sec
  speed?: string; // e.g. "154 tps"
  contextWindow?: string; // e.g. "1,000,000 tokens"
  description: string;
  isFree: boolean;
  tag?: string;
}

export const DEFAULT_MODEL = "gemini-3.5-flash-lite";

export const STABLE_CASCADE_CHAIN = [
  "gemini-3.5-flash-lite",
  "minimax/minimax-m3-free",
  "minimax/minimax-m3",
  "poolside/laguna-s-2.1-free",
  "inclusionai/ling-3.0-flash-fin-free",
  "gemini-3.1-flash-lite",
  "gemini-3.6-flash",
  "gemini-3.5-flash",
  "gemini-3.7-flash"
];

export const AVAILABLE_MODELS: ModelSpec[] = [
  // --- Vercel AI Gateway Free Models ---
  {
    id: "minimax/minimax-m3-free",
    name: "MiniMax M3 (Free • 1M Context • 154 TPS)",
    provider: "vercel-ai-gateway",
    providerLabel: "Vercel AI Gateway",
    badge: "154 tps • 1M Context (Flagship Free)",
    speed: "154 tps • 0.6s TTFT",
    contextWindow: "1,000,000 tokens (1M)",
    tpm: "Ultra High Throughput",
    isFree: true,
    tag: "Free Flagship",
    description: "Frontier multimodal reasoning with 1M context window and 154 tokens/sec throughput for instant executive answers"
  },
  {
    id: "poolside/laguna-s-2.1-free",
    name: "Poolside Laguna S-2.1 (Free • Code Specialist)",
    provider: "vercel-ai-gateway",
    providerLabel: "Vercel AI Gateway",
    badge: "68 tps • 256K Context (Code & Architecture)",
    speed: "68 tps • 1.5s TTFT",
    contextWindow: "256,000 tokens (256K)",
    tpm: "Code Generation Specialist",
    isFree: true,
    tag: "Code Specialist",
    description: "Specialized software engineering model trained on repository workflows, algorithmic refactoring, and strict typing"
  },
  {
    id: "inclusionai/ling-3.0-flash-fin-free",
    name: "InclusionAI Ling 3.0 Flash Fin (Free • FinOps & Compliance)",
    provider: "vercel-ai-gateway",
    providerLabel: "Vercel AI Gateway",
    badge: "145 tps • 256K Context (FinOps Specialist)",
    speed: "145 tps • 0.6s TTFT",
    contextWindow: "256,000 tokens (256K)",
    tpm: "High Throughput FinOps",
    isFree: true,
    tag: "FinOps & Regulatory",
    description: "Domain-tuned for financial token accounting, regulatory compliance metrics, and enterprise ROI analysis"
  },
  {
    id: "minimax/minimax-m2.7-free",
    name: "MiniMax M2.7 (Free • Balanced Workhorse)",
    provider: "vercel-ai-gateway",
    providerLabel: "Vercel AI Gateway",
    badge: "98 tps • 197K Context (Balanced Free)",
    speed: "98 tps • 0.9s TTFT",
    contextWindow: "197,000 tokens",
    tpm: "Standard Free",
    isFree: true,
    tag: "Balanced",
    description: "Reliable fallback model for general architecture sparring and rapid conversational interactions"
  },

  // --- Google Gemini Tier Models ---
  {
    id: "gemini-3.7-flash",
    name: "Gemini 3.7 Flash (Hybrid Reasoning / Thinking Tokens)",
    provider: "google-gemini",
    providerLabel: "Google AI Studio",
    badge: "5 RPM • 20 RPD (Flagship Reasoning)",
    rpm: 5,
    rpd: 20,
    tpm: "250K TPM",
    contextWindow: "1,000,000 tokens",
    isFree: true,
    tag: "Google Flagship",
    description: "Google flagship hybrid reasoning model with dynamic step-by-step thinking tokens"
  },
  {
    id: "gemini-3.5-flash-lite",
    name: "Gemini 3.5 Flash Lite (High-Throughput Workhorse)",
    provider: "google-gemini",
    providerLabel: "Google AI Studio",
    badge: "15 RPM • 500 RPD (High Quota)",
    rpm: 15,
    rpd: 500,
    tpm: "250K TPM",
    contextWindow: "1,000,000 tokens",
    isFree: true,
    tag: "Google Workhorse",
    description: "Fast, high-throughput model with generous 500 RPD quota for seamless sparring"
  },
  {
    id: "gemini-3.6-flash",
    name: "Gemini 3.6 Flash (Primary Flash / Low-Latency)",
    provider: "google-gemini",
    providerLabel: "Google AI Studio",
    badge: "5 RPM • 20 RPD (Primary Flash)",
    rpm: 5,
    rpd: 20,
    tpm: "250K TPM",
    contextWindow: "1,000,000 tokens",
    isFree: true,
    tag: "Google Flash",
    description: "Ultra-fast multimodal reasoning engine officially recommended by Google AI Studio"
  },
  {
    id: "gemini-3.1-flash-lite",
    name: "Gemini 3.1 Flash Lite (Frontier Lightweight)",
    provider: "google-gemini",
    providerLabel: "Google AI Studio",
    badge: "15 RPM • 500 RPD (Lightweight)",
    rpm: 15,
    rpd: 500,
    tpm: "250K TPM",
    contextWindow: "1,000,000 tokens",
    isFree: true,
    tag: "Google Lightweight",
    description: "Cost-efficient lightweight frontier model for ultra-low latency failover and fast Q&A"
  },
  {
    id: "gemini-3.5-flash",
    name: "Gemini 3.5 Flash (Stable Multimodal Workhorse)",
    provider: "google-gemini",
    providerLabel: "Google AI Studio",
    badge: "5 RPM • 20 RPD (Multimodal Baseline)",
    rpm: 5,
    rpd: 20,
    tpm: "250K TPM",
    contextWindow: "1,000,000 tokens",
    isFree: true,
    tag: "Google Multimodal",
    description: "High-speed multimodal baseline for routine architectural Q&A and system reviews"
  }
];
