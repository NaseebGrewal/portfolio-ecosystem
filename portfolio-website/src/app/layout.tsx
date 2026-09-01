import type { Metadata } from "next";
import { CANDIDATE_PROFILE } from "@/data/portfolio_data";
import FloatingArchitectCopilot from "@/components/FloatingArchitectCopilot";
import "./globals.css";

export const metadata: Metadata = {
  title: `${CANDIDATE_PROFILE.name} | Senior AI Solutions Architect & R&D Digitalization Lead`,
  description: `${CANDIDATE_PROFILE.name}: Senior AI Solutions Architect. 7+ years delivering in-house R&D platforms (€1.2M+ vendor licenses eliminated), deterministic multi-agent chemical compliance, and client-side Rust/WASM compute on AWS and Azure.`,
  keywords: [
    "AI Solutions Architect",
    "R&D Digitalization",
    "Generative AI",
    "LangGraph",
    "Multi-Agent Systems",
    "Materials Intelligence",
    "FastAPI",
    "Next.js",
    "AWS ECS",
    "REACH Compliance"
  ],
  authors: [{ name: CANDIDATE_PROFILE.name, url: CANDIDATE_PROFILE.portfolioUrl }],
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.svg", type: "image/svg+xml" }
    ],
    shortcut: "/favicon.svg",
    apple: "/icon.svg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        <link rel="apple-touch-icon" href="/icon.svg" />
      </head>
      <body className="bg-background text-foreground antialiased min-h-screen selection:bg-blue-600 selection:text-white transition-colors duration-200">
        {children}
        <FloatingArchitectCopilot />
      </body>
    </html>
  );
}
