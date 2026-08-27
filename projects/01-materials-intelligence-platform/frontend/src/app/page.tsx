export default function Home() {
  return (
    <main style={{ padding: "3rem", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "2.5rem", fontWeight: 800, color: "#38bdf8", marginBottom: "0.5rem" }}>
        Enterprise Materials Intelligence Platform
      </h1>
      <p style={{ color: "#94a3b8", fontSize: "1.1rem", marginBottom: "2rem" }}>
        Next.js 15 & FastAPI Material Formulation and Dynamic Mechanical Property Analytics.
      </p>
      <div style={{ background: "#1e293b", padding: "1.5rem", borderRadius: "0.75rem", border: "1px solid #334155" }}>
        <h3 style={{ margin: "0 0 1rem 0", color: "#f1f5f9" }}>Connected Microservices</h3>
        <p style={{ margin: "0.5rem 0", color: "#cbd5e1" }}>Backend API: <code style={{ background: "#0f172a", padding: "0.2rem 0.5rem", borderRadius: "0.25rem" }}>http://localhost:8000</code></p>
        <p style={{ margin: "0.5rem 0", color: "#cbd5e1" }}>Swagger Docs: <code style={{ background: "#0f172a", padding: "0.2rem 0.5rem", borderRadius: "0.25rem" }}>http://localhost:8000/docs</code></p>
      </div>
    </main>
  );
}
