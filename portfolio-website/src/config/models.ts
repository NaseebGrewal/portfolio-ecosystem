export interface ModelSpec {
  id: string;
  name: string;
  badge: string;
  rpm: number | string; // Requests Per Minute
  rpd: number | string; // Requests Per Day
  tpm: string; // Tokens Per Minute
  description: string;
}

export const DEFAULT_MODEL = "gemini-3.5-flash-lite";

export const STABLE_CASCADE_CHAIN = [
  "gemini-3.5-flash-lite",
  "gemini-3.1-flash-lite",
  "gemini-3.6-flash",
  "gemini-3.5-flash",
  "gemini-3.7-flash"
];

export const AVAILABLE_MODELS: ModelSpec[] = [
  {
    id: "gemini-3.5-flash-lite",
    name: "Gemini 3.5 Flash Lite (High-Throughput / Default Workhorse)",
    badge: "15 RPM • 500 RPD (Default Workhorse)",
    rpm: 15,
    rpd: 500,
    tpm: "250K TPM",
    description: "Fast, high-throughput model with generous 500 RPD quota for seamless sparring"
  },
  {
    id: "gemini-3.1-flash-lite",
    name: "Gemini 3.1 Flash Lite (Frontier Lightweight)",
    badge: "15 RPM • 500 RPD (Frontier Lightweight)",
    rpm: 15,
    rpd: 500,
    tpm: "250K TPM",
    description: "Cost-efficient lightweight frontier model for ultra-low latency failover and fast Q&A"
  },
  {
    id: "gemini-3.7-flash",
    name: "Gemini 3.7 Flash (Hybrid Reasoning / Thinking Tokens)",
    badge: "5 RPM • 20 RPD (Flagship Reasoning)",
    rpm: 5,
    rpd: 20,
    tpm: "250K TPM",
    description: "Google flagship hybrid reasoning model with dynamic step-by-step thinking tokens"
  },
  {
    id: "gemini-3.6-flash",
    name: "Gemini 3.6 Flash (Primary Flash / Low-Latency)",
    badge: "5 RPM • 20 RPD (Primary Flash)",
    rpm: 5,
    rpd: 20,
    tpm: "250K TPM",
    description: "Ultra-fast multimodal reasoning engine officially recommended by Google AI Studio"
  },
  {
    id: "gemini-3.5-flash",
    name: "Gemini 3.5 Flash (Stable Multimodal Workhorse)",
    badge: "5 RPM • 20 RPD (Multimodal Baseline)",
    rpm: 5,
    rpd: 20,
    tpm: "250K TPM",
    description: "High-speed multimodal baseline for routine architectural Q&A and system reviews"
  }
];
