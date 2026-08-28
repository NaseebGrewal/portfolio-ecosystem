import { NextResponse } from "next/server";
import { DEFAULT_MODEL, STABLE_CASCADE_CHAIN } from "@/config/models";

const SYSTEM_ARCHITECT_CONTEXT = `You are the Executive AI Systems Copilot — an authoritative Principal AI Solutions Architect and Executive Technology Advisor representing Naseeb Grewal, M.Sc.'s portfolio ecosystem.

Guidelines for your responses:
1. Technical & Architectural Questions: Provide elite, production-grade system design breakdowns. Include:
   - ### Architectural Blueprint & System Strategy
   - ### Recommended Microservices Pipeline & Technology Stack (e.g., Next.js 15, FastAPI, LangGraph, Rust/WASM, Redis, AWS ECS/Azure)
   - ### Trade-offs, Latency Budgets & Concrete Business ROI (e.g., P99 latencies, €1.2M+ licensing elimination, 0% regulatory hallucination)
2. Creative & Problem-Solving Queries (e.g., coding challenges, migrations, scaling dilemmas): Give concrete, actionable engineering advice with clear architectural justification.
3. General, Lifestyle, Travel or Open Queries (e.g., "best way to spend time in dubai", "book recommendations", casual questions):
   - Answer the question conversationally, accurately, and with genuine insight first.
   - Then gracefully bridge back or offer to explore technical system designs, cloud architectures, or R&D digitalization when relevant.
4. Keep all responses formatted with clean Markdown, bold highlights, formatted numbered steps, and zero unparsed asterisks.`;

const DETERMINISTIC_KNOWLEDGE: Record<string, string> = {
  dubai: `### Top Recommendations for Spending Time in Dubai

1. **Iconic Architecture & Skyline**: Visit the **Burj Khalifa** observation deck (Level 124/148) and the stunning **Museum of the Future** for a futuristic look into technology and innovation.
2. **Heritage & Culture**: Explore the **Al Fahidi Historical Neighborhood**, take a traditional Abra ride across **Dubai Creek**, and wander through the vibrant Spice & Gold Souks.
3. **Desert & Adventure**: Experience an evening **Desert Safari** with dune bashing, falconry demonstrations, and authentic Arabian cuisine under the stars.
4. **Waterfront Dining & Leisure**: Spend an evening at **Dubai Marina Promenade** or **Palm Jumeirah / The Pointe** for fountain shows and world-class dining.

*Tip: If you'd also like to explore how to architect large-scale IoT or telemetry systems for smart city infrastructure like Dubai's, feel free to ask!*`,

  travel: `### Curated Travel & Exploration Insights

1. **Cultural Immersive Experiences**: Prioritize walking historic city quarters, visiting local marketplaces, and dining at authentic non-tourist neighborhood bistros.
2. **Architectural & Innovation Landmarks**: Explore cutting-edge engineering marvels, museum exhibitions, and civic masterplans that highlight regional ingenuity.
3. **Balanced Itineraries**: Pair active daytime exploration (hiking, historical tours) with relaxed evening waterfront or culinary experiences.

*Feel free to ask any technical or architectural question as well!*`,

  cement: `### Concrete Formulation & Compressive Strength ML Architecture

1. **System Design & Feature Ingestion**: High-throughput feature engineering pipeline ingesting Blaine fineness, water-to-binder ratio ($w/b$), silica modulus, and supplementary cementitious materials (slag/fly-ash) across 150+ global plant batches.
2. **Predictive Microservices Pipeline**: Gradient-boosted ensembles (XGBoost/LightGBM) trained on historical 28-day compressive break curves, served via containerized FastAPI microservices returning sub-30ms strength estimates.
3. **Business & Sustainability ROI**: Accelerates trial batch validation cycles by 65% and optimizes clinker substitution rates for low-carbon EN 197-1 cement blends, slashing raw material costs by €220k/yr.`,

  automotive: `### Automotive Plant Root Cause Failure Analysis (RCFA) GenAI Pipeline

1. **Event-Driven Telemetry Ingestion**: High-frequency streaming (Kafka/MQTT) ingesting motor vibration, thermal gradients, and torque sensors into Azure Blob Storage and Azure AI Search with custom equipment taxonomy embeddings.
2. **Multi-Agent Fault Diagnostics**: LangGraph supervisor orchestrates telemetry anomaly detectors, PLC log parsers, and historical maintenance trees to pinpoint failure modes automatically.
3. **Business Impact & Uptime**: Reduces critical plant production line stoppage diagnostics from 4 hours to under 8 minutes, avoiding an estimated €450k in unplanned factory downtime.`,

  chemical: `### ChemAgent-Gov: Multi-Agent Deterministic REACH & SDS Compliance

1. **Deterministic Multi-Agent Swarm**: Supervisor-worker LangGraph multi-agent swarm parses incoming supplier SDS PDFs into structured Pydantic v2 schemas with zero hallucination.
2. **Live ECHA Cross-Referencing**: Automated verification agent evaluates chemical CAS numbers against live ECHA SVHC candidate lists with strict 0.1% w/w regulatory boundary checks.
3. **Regulatory Governance**: 0% hallucination rate on legal compliance thresholds; flags carcinogenic H350/H360 hazard statements and enforces automated human-in-the-loop review.`,

  rust: `### High-Performance Rust + WebAssembly (WASM) Rheology Engine

1. **Client-Side WASM Execution**: Compiles high-performance Rust polynomial regression algorithms to client-side WebAssembly, executing ISO 527 tensile curve fitting directly in the browser in 1.8ms.
2. **Elimination of Server Latency**: Replaces multi-second server-side Python/SciPy API round-trips with zero-latency client compute over 100,000-point laboratory stress-strain datasets.
3. **Architectural ROI**: Zero cloud server compute costs, offline-capable analytics, memory footprint under 4.2 MB, and instant interactive visualization.`,

  finops: `### Enterprise AI Gateway & FinOps Token Governance

1. **Semantic Caching & Reverse Proxy**: FastAPI gateway running LiteLLM with Redis SHA256 semantic caching to intercept repeated corporate queries and eliminate duplicate inference costs.
2. **Multi-Cloud Intelligent Routing**: Dynamic failover routing across Azure OpenAI, AWS Bedrock, and Anthropic Claude with automated PII masking and EU AI Act compliance filters.
3. **FinOps Cost Savings**: Departmental token quotas and budget caps that reduced enterprise LLM operational expenditure by 42% while maintaining 99.99% model availability.`,

  telemetry: `### Event-Driven Telemetry Ingestion Architecture on AWS

1. **High-Throughput Ingestion**: Amazon API Gateway and AWS Kinesis Data Streams capture high-frequency plant sensor telemetry (100k+ events/sec) with sub-second buffering.
2. **Stream Processing & Storage**: AWS Lambda consumers process and validate time-series data, routing hot operational metrics to Amazon Timestream and raw archives to S3 Glacier.
3. **Real-Time AI Anomaly Detection**: Amazon ECS Fargate workers execute containerized anomaly detection models, streaming real-time alerts to Grafana and automated SCADA triggers.`,

  rag: `### Balancing RAG Latency vs. Hallucination Mitigation

1. **Hybrid Retrieval Strategy**: Combines dense vector embeddings (cosine similarity) with BM25 sparse keyword search via Azure AI Search to ensure 100% lexical precision on domain terminology.
2. **Deterministic Reranking & Guardrails**: FlashRank cross-encoder reranks top 5 chunks (<15ms overhead), followed by Pydantic JSON validation to verify citations against retrieved chunk IDs.
3. **Sub-200ms Latency Budget**: Semantic caching via Redis achieves sub-10ms response on 35% of queries, with streaming token output to minimize perceived user latency.`,

  microservices: `### Monolith to Event-Driven Microservices Migration Strategy

1. **Domain-Driven Strangler Pattern**: Incrementally decouple high-churn bounded contexts (e.g., Recipe Formulation, Inventory, Analytics) using reverse proxies (ALB/Envoy) to route traffic transparently.
2. **Event Bus & Data Sync**: Deploy Kafka / RabbitMQ with Transactional Outbox patterns to guarantee eventual consistency between legacy relational stores and new distributed NoSQL stores.
3. **Resilience & Observability**: Implement OpenTelemetry distributed tracing, circuit breakers (Resilience4j / Tenacity), and sub-50ms P99 health probes with zero downtime.`,

  career: `### Executive Technology Leadership & AI Career Advisory

1. **T-Shaped Mastery**: Deep domain grounding in systems engineering (distributed cloud, Rust/WASM, high-throughput streaming) combined with broad generative AI orchestration (LangGraph, semantic caching, FinOps).
2. **Measurable Business Value**: Anchor all AI initiatives to quantifiable ROI (€1.2M+ licensing cost elimination, 60% accelerated laboratory R&D cycles, 99.95% cloud SLAs).
3. **Strategic Portfolio Delivery**: Build production-grade, interactive reference implementations showcasing production readiness rather than mere notebook prototypes.`
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt, domain, model: requestedModel, customApiKey } = body;

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt is required and must be a string." },
        { status: 400 }
      );
    }

    // Configurable model ID from request, env var, or default to gemini-3.6-flash
    const rawModel =
      requestedModel ||
      process.env.NEXT_PUBLIC_GOOGLE_AI_MODEL_ID ||
      process.env.GOOGLE_AI_MODEL_ID ||
      DEFAULT_MODEL;
    
    // Strip 'models/' prefix if present for uniform REST API calls
    const cleanModel = rawModel.replace(/^models\//, "");

    // Discover API Key with high flexibility across common env variable conventions
    const apiKey =
      customApiKey ||
      process.env.NEXT_PUBLIC_GEMINI_AI_API_KEY ||
      process.env.GEMINI_API_KEY ||
      process.env.GOOGLE_API_KEY ||
      process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
      process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY;

    // Resilient Fallback Cascade Chain: prioritize requested model, followed by verified stable models
    const cascadeModels = [cleanModel, ...STABLE_CASCADE_CHAIN.filter((m) => m !== cleanModel)];

    if (apiKey) {
      for (const modelToTry of cascadeModels) {
        try {
          // Strict 6-second timeout per upstream model call to prevent infinite hanging
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 6000);

          const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${modelToTry}:generateContent?key=${apiKey}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              signal: controller.signal,
              body: JSON.stringify({
                contents: [
                  {
                    role: "user",
                    parts: [
                      {
                        text: `${SYSTEM_ARCHITECT_CONTEXT}\n\nContext/Category: ${domain || "Executive AI Architecture Advisory"}\nUser Inquiry: ${prompt}`
                      }
                    ]
                  }
                ],
                generationConfig: {
                  temperature: 0.4,
                  maxOutputTokens: 2048,
                  topP: 0.95
                }
              })
            }
          );

          clearTimeout(timeoutId);

          if (response.ok) {
            const data = await response.json();
            const replyText =
              data.candidates?.[0]?.content?.parts?.[0]?.text || null;
            if (replyText) {
              const wasFallback = modelToTry !== cleanModel;
              return NextResponse.json({
                reply: replyText,
                engine: `Google Gemini (${modelToTry}) • Live Inference`,
                modelId: modelToTry,
                fallbackTriggered: wasFallback,
                originalModel: cleanModel,
                fallbackReason: wasFallback
                  ? `Original model (${cleanModel}) unavailable or high demand. Auto-switched to verified model (${modelToTry}).`
                  : undefined,
                timestamp: new Date().toISOString()
              });
            }
          } else {
            const errText = await response.text();
            console.warn(`Gemini API model ${modelToTry} returned status ${response.status}:`, errText);
            // 404, 429, 500, 503 -> continue cascade to next model
          }
        } catch (geminiError: any) {
          console.warn(`Gemini API call to ${modelToTry} failed (${geminiError?.name || "Error"}):`, geminiError?.message);
          // Timeout or network error -> continue cascade to next model
        }
      }
    }

    // Fallback: Context-Aware Intelligent Deterministic Engine
    const lower = prompt.toLowerCase();
    let selectedReply: string;

    if (lower.includes("dubai") || lower.includes("uae") || lower.includes("burj")) {
      selectedReply = DETERMINISTIC_KNOWLEDGE.dubai;
    } else if (lower.includes("travel") || lower.includes("vacation") || lower.includes("visit") || lower.includes("trip")) {
      selectedReply = DETERMINISTIC_KNOWLEDGE.travel;
    } else if (lower.includes("career") || lower.includes("interview") || lower.includes("lead") || lower.includes("salary") || lower.includes("resume") || lower.includes("advice")) {
      selectedReply = DETERMINISTIC_KNOWLEDGE.career;
    } else if (lower.includes("telemetry") || lower.includes("kinesis") || lower.includes("stream") || lower.includes("sensor") || lower.includes("iot")) {
      selectedReply = DETERMINISTIC_KNOWLEDGE.telemetry;
    } else if (lower.includes("rag") || lower.includes("latency") || lower.includes("hallucination") || lower.includes("search") || lower.includes("vector")) {
      selectedReply = DETERMINISTIC_KNOWLEDGE.rag;
    } else if (lower.includes("cement") || lower.includes("concrete") || lower.includes("strength") || lower.includes("clinker")) {
      selectedReply = DETERMINISTIC_KNOWLEDGE.cement;
    } else if (lower.includes("auto") || lower.includes("plant") || lower.includes("rcfa") || lower.includes("failure") || lower.includes("maintenance")) {
      selectedReply = DETERMINISTIC_KNOWLEDGE.automotive;
    } else if (lower.includes("rust") || lower.includes("wasm") || lower.includes("rheolog") || lower.includes("speed") || lower.includes("tensile") || lower.includes("python")) {
      selectedReply = DETERMINISTIC_KNOWLEDGE.rust;
    } else if (lower.includes("finops") || lower.includes("cache") || lower.includes("cost") || lower.includes("gateway") || lower.includes("quota")) {
      selectedReply = DETERMINISTIC_KNOWLEDGE.finops;
    } else if (lower.includes("sds") || lower.includes("reach") || lower.includes("compliance") || lower.includes("echa")) {
      selectedReply = DETERMINISTIC_KNOWLEDGE.chemical;
    } else if (lower.includes("monolith") || lower.includes("microservice") || lower.includes("migration") || lower.includes("strangler")) {
      selectedReply = DETERMINISTIC_KNOWLEDGE.microservices;
    } else {
      selectedReply = `### Executive Architectural Advisory: "${prompt.slice(0, 60)}"

1. **Strategic Architecture Framing**: When tackling this technical domain, decouple high-throughput ingestion from stateful compute using asynchronous message brokers (e.g., AWS Kinesis or Redis Pub/Sub) to isolate traffic spikes.
2. **Recommended Technology Stack**:
   - **API & Middleware Tier**: Containerized FastAPI / Next.js 15 App Router running on AWS ECS Fargate or Azure Container Apps with automated ALB load balancing.
   - **Intelligence & Agentic Tier**: LangGraph supervisor-worker workflows with Redis SHA256 semantic caching for sub-10ms response on repetitive queries and zero hallucination guardrails.
   - **Storage & Ingestion**: MongoDB Atlas / DocumentDB for schema-flexible domain objects paired with Amazon S3 for immutable raw artifact logging.
3. **Measurable ROI & Resilience**:
   - **Latency SLA**: Sub-45ms P99 API response times with horizontal autoscaling (2–10 worker tasks).
   - **Financial Governance**: Up to 42% reduction in generative AI token burn via departmental FinOps quotas and cached prompt hits.
   - **Availability**: High-availability multi-AZ deployment with automated health check failovers.`;
    }

    return NextResponse.json({
      reply: selectedReply,
      engine: "Executive AI Systems Copilot (Deterministic Knowledge Engine)",
      modelId: cleanModel,
      fallbackTriggered: apiKey ? true : false,
      originalModel: cleanModel,
      fallbackReason: apiKey
        ? `Upstream Google API models reached quota or capacity limits. Served from resilient deterministic engine.`
        : undefined,
      timestamp: new Date().toISOString()
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Failed to process AI architect request.", details: err?.message },
      { status: 500 }
    );
  }
}
