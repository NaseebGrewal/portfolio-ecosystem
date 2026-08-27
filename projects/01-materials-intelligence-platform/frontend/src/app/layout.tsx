import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Materials Intelligence Platform",
  description: "Enterprise Material Formulation & Specification Engine",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, -apple-system, sans-serif", background: "#0f172a", color: "#f8fafc" }}>
        {children}
      </body>
    </html>
  );
}
