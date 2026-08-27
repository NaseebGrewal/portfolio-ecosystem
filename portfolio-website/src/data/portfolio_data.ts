export interface Project {
  id: string;
  title: string;
  category: "Full-Stack & Cloud" | "Multi-Agent AI" | "High-Perf Engineering" | "AI Governance";
  tagline: string;
  businessImpact: string;
  vendorCostSaved?: string;
  stack: string[];
  githubUrl: string;
  liveDemoUrl?: string;
  architectureHighlights: string[];
  metrics: { label: string; value: string }[];
}

export interface Certification {
  name: string;
  issuer: string;
  badgeUrl: string;
  date?: string;
}

export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  badge?: string;
  highlights: string[];
  technologies: string[];
}

export interface Degree {
  title: string;
  institution: string;
  location: string;
  period: string;
  specialization: string;
  thesis?: string;
  coreSubjects: string[];
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: { name: string; highlight?: boolean }[];
}

export const CANDIDATE_PROFILE = {
  name: process.env.NEXT_PUBLIC_CANDIDATE_NAME || "Naseeb Grewal, M.Sc.",
  title: process.env.NEXT_PUBLIC_CANDIDATE_TITLE || "Senior AI Solutions Architect | R&D Digitalization & Full-Stack Lead",
  tagline: "Bridging Chemical & Materials Domain Science with Enterprise Cloud AI Architecture",
  executiveSummary:
    "Strategic, results-oriented Senior AI & Full-Stack Digitalization Architect with 7+ years of experience bridging chemical/materials domain science with enterprise-grade cloud architecture, generative AI, and modern web applications. Proven track record of spearheading digital transformation for global R&D and manufacturing plants, eliminating €1.2M+ in third-party vendor licensing costs, and accelerating MVP-to-production lifecycles by 50%.",
  location: process.env.NEXT_PUBLIC_CANDIDATE_LOCATION || "Germany (Open to Hybrid & Remote)",
  email: process.env.NEXT_PUBLIC_CANDIDATE_EMAIL || "contact@yourdomain.com",
  phone: process.env.NEXT_PUBLIC_CANDIDATE_PHONE || "+49 XXXXXXXXXX",
  githubUrl: process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/NaseebGrewal",
  linkedinUrl: process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://linkedin.com/in/naseeb-grewal",
  portfolioUrl: process.env.NEXT_PUBLIC_PORTFOLIO_URL || "https://yourportfolio.dev",
  status: "Open to Strategic Senior AI & Solutions Architecture Opportunities",
  experienceYears: "7+",
  languages: [
    { language: "English", proficiency: "Fluent / Professional (C2)" },
    { language: "German", proficiency: "Conversational / Working Proficiency (B1–B2)" }
  ],
  headlineStats: [
    { label: "Vendor Costs Saved", value: "€1.2M+" },
    { label: "Global R&D Users", value: "150+" },
    { label: "Cloud SLA Availability", value: "99.95%" },
    { label: "Discovery Acceleration", value: "60%" }
  ],
  skillCategories: [
    {
      category: "Enterprise AI & LLM Systems",
      description: "Autonomous Agent swarms, RAG architectures, model evaluation & guardrails",
      skills: [
        { name: "Multi-Agent Systems (LangGraph, CrewAI)", highlight: true },
        { name: "Generative AI & LLMs (GPT-4o, Claude 3.5)", highlight: true },
        { name: "RAG & Vector Search (MongoDB Vector, Qdrant)", highlight: true },
        { name: "Azure AI Foundry & AWS Bedrock", highlight: true },
        { name: "LLM Guardrails, LiteLLM & FinOps", highlight: false },
        { name: "Knowledge Graphs (Neo4j)", highlight: false }
      ]
    },
    {
      category: "Full-Stack & High-Performance Engineering",
      description: "Reactive web platforms, ultra-low latency compute engines, and modern microservices",
      skills: [
        { name: "Python (FastAPI, AsyncIO, PyDantic)", highlight: true },
        { name: "TypeScript & Next.js 15 (React 19/18)", highlight: true },
        { name: "Rust & WebAssembly (WASM / Axum)", highlight: true },
        { name: "Tailwind CSS & Modern UI/UX", highlight: false },
        { name: "C# / .NET & REST / GraphQL APIs", highlight: false },
        { name: "Test-Driven Development (Pytest, Vitest)", highlight: false }
      ]
    },
    {
      category: "Cloud, DevOps & Production Infrastructure",
      description: "Resilient containerized deployments, zero-downtime pipelines & FinOps cost engineering",
      skills: [
        { name: "AWS (ECS Fargate, ECR, S3, RDS, Lambda)", highlight: true },
        { name: "Microsoft Azure (Container Apps, Functions)", highlight: true },
        { name: "Docker & Container Orchestration", highlight: true },
        { name: "CI/CD (GitHub Actions, GitLab CI)", highlight: true },
        { name: "Infrastructure as Code (Terraform, Bicep)", highlight: false },
        { name: "Observability (OpenTelemetry, Prometheus)", highlight: false }
      ]
    },
    {
      category: "Data Engineering & Modern Databases",
      description: "Multi-terabyte telemetry, distributed caching, schema design & time-series data",
      skills: [
        { name: "MongoDB Atlas & Aggregation Pipelines", highlight: true },
        { name: "Redis In-Memory Semantic Caching", highlight: true },
        { name: "PostgreSQL & Relational Modeling", highlight: false },
        { name: "AWS Glue, Athena & S3 Data Lakes", highlight: false },
        { name: "Azure Databricks & Apache Spark", highlight: false },
        { name: "Time-Series & Sensor Telemetry", highlight: false }
      ]
    },
    {
      category: "Domain Science & Regulatory Digitalization",
      description: "Bridging physical materials R&D, chemical thermodynamics & automated regulatory compliance",
      skills: [
        { name: "Polymer Physics & Formulation Science", highlight: true },
        { name: "Rheology & ISO 527 Tensile Modeling", highlight: true },
        { name: "REACH & ECHA SVHC Compliance Automation", highlight: true },
        { name: "SDS & TDS Automated Intelligence", highlight: false },
        { name: "Chemical Plant Operations & ESH Digitalization", highlight: false },
        { name: "Agile/Scrum Technical Product Ownership", highlight: false }
      ]
    }
  ] as SkillCategory[],
  experiences: [
    {
      role: "Lead Digital Process & Cloud Infrastructure Engineer",
      company: "Enterprise Specialty Materials & Chemicals Leader",
      location: "Germany",
      period: "Jul 2025 – Present",
      badge: "Current Leadership Role",
      highlights: [
        "Architected and delivered the enterprise R&D Material Intelligence Platform end-to-end using Next.js, FastAPI, and MongoDB on AWS ECS, serving 150+ chemical researchers and material scientists across global plants.",
        "Eliminated over €1,200,000 in recurring external vendor licensing costs by engineering in-house material testing and formulation software tailored to specific lab workflows.",
        "Integrated Agentic AI workflows (LangGraph, OpenAI, Claude) to automate polymer property predictions, SDS safety reviews, and formulation optimization, cutting manual discovery time by 60%.",
        "Engineered high-throughput testing microservices utilizing Python and Rust/WASM to replace legacy desktop tools, reducing curve-fitting latency from minutes to sub-second execution.",
        "Designed production AWS infrastructure (ECS Fargate, ALB, Route53, S3, MongoDB Atlas) with automated GitHub Actions CI/CD pipelines, maintaining 99.95% service availability.",
        "Spearheaded technical governance and agile standards, conducting workshops on clean code, Git practices, and automated testing, boosting team delivery velocity by 2X."
      ],
      technologies: ["Next.js 15", "FastAPI", "Python", "Rust/WASM", "AWS ECS", "MongoDB", "Redis", "LangGraph", "Docker", "CI/CD"]
    },
    {
      role: "Digital Scientist II / AI Product Owner",
      company: "Global Life Sciences & Pharma Corporation",
      location: "Germany",
      period: "Oct 2024 – Mar 2025",
      badge: "Product & Data Leadership",
      highlights: [
        "Served as Technical Product Owner for internal AI initiatives, translating complex scientific laboratory requirements into scalable machine learning systems.",
        "Architected multi-terabyte data pipelines on AWS (S3, Glue, Lambda, Athena) for experiment telemetry, reducing manual data munging and laboratory overhead by 80%.",
        "Directed a cross-functional team of 3 engineers/technicians to build and deploy an internal enterprise Semantic Search engine across laboratory documentation, accelerating cross-departmental research discovery by 40%.",
        "Instituted internal engineering mentorship programs, increasing junior developer test-driven development proficiency by 30%."
      ],
      technologies: ["AWS (S3, Glue, Athena, Lambda)", "Python", "Semantic Search", "NLP", "Agile/Scrum", "FastAPI"]
    },
    {
      role: "Data Science & AI Development Specialist",
      company: "Enterprise AI Solutions Consultancy",
      location: "Global / Remote",
      period: "Jan 2023 – Present",
      highlights: [
        "Built personalized enterprise customer support systems using LLMs, Microsoft Copilot Studio, and knowledge graphs (Neo4j).",
        "Engineered OCR pipeline for handwriting and document digitizing using OpenCV and TensorFlow, achieving >96% extraction accuracy.",
        "Designed and deployed predictive maintenance and fraud detection ML pipelines using GANs and Random Forest models."
      ],
      technologies: ["LLMs", "Copilot Studio", "Neo4j", "OpenCV", "TensorFlow", "Scikit-Learn"]
    },
    {
      role: "AI Engineer",
      company: "Industrial Technology & Automation Group",
      location: "Germany",
      period: "Aug 2024 – Sep 2024",
      highlights: [
        "Created multi-modal conversational AI agents using LangChain, AWS, and modern image/document models.",
        "Optimized model inference pipelines (Fooocus, ComfyUI, vLLM), increasing system uptime by 25%."
      ],
      technologies: ["LangChain", "AWS", "vLLM", "Python", "FastAPI"]
    },
    {
      role: "Generative AI & Software Engineer (Specialist / Working Student)",
      company: "Global Enterprise Cloud Systems",
      location: "Germany",
      period: "May 2023 – Apr 2024",
      highlights: [
        "Lead developer for Generative AI-driven internal support and predictive maintenance use cases.",
        "Built multilingual RAG applications on Azure Cloud (Azure OpenAI, AI Search, Azure Functions), improving internal query response speed by 100%.",
        "Managed Azure cloud infrastructure and token optimization strategies, reducing operational expenses by 50%."
      ],
      technologies: ["Azure OpenAI", "Azure AI Search", "Azure Functions", "RAG", "Python", "FinOps"]
    }
  ] as Experience[],
  degrees: [
    {
      title: "M.Sc. in Applied Computer Science",
      institution: "Renowned German Technical University",
      location: "Germany",
      period: "Apr 2022 – Mar 2024",
      specialization: "Specialization: Generative AI & Cloud Distributed Systems",
      thesis: "Master's Thesis: Multi-Modal LLM Systems & Automated Intelligent Code Quality Verification",
      coreSubjects: [
        "Generative AI & Foundation Models",
        "Cloud Distributed Systems & Microservices",
        "Advanced Software Architecture & Design",
        "Information Retrieval & Vector Embeddings"
      ]
    },
    {
      title: "B.Tech. in Polymer Science & Chemical Engineering",
      institution: "Premier Technology Institute",
      location: "India",
      period: "Jul 2016 – May 2020",
      specialization: "Core Foundations: Polymer Chemistry, Rheology, Thermodynamics & Chemical Plant Operations",
      coreSubjects: [
        "Polymer Physics & Rheological Behavior",
        "Chemical Reaction Engineering & Plant Operations",
        "Materials Characterization & Mechanical Testing (ISO/ASTM)",
        "Process Optimization & Thermodynamics"
      ]
    }
  ] as Degree[],
  certifications: [
    {
      name: "AWS Certified Solutions Architect / DevOps Specialist",
      issuer: "Amazon Web Services (AWS)",
      badgeUrl: process.env.NEXT_PUBLIC_CERT_AWS_URL || "https://www.credly.com/org/amazon-web-services"
    },
    {
      name: "Microsoft Certified: Azure AI Engineer Associate",
      issuer: "Microsoft Azure",
      badgeUrl: process.env.NEXT_PUBLIC_CERT_AZURE_URL || "https://learn.microsoft.com/credentials"
    },
    {
      name: "Generative AI & LLM Systems Specialization",
      issuer: "DeepLearning.AI",
      badgeUrl: process.env.NEXT_PUBLIC_CERT_GAN_URL || "https://www.deeplearning.ai"
    },
    {
      name: "Natural Language Processing Specialization",
      issuer: "DeepLearning.AI",
      badgeUrl: process.env.NEXT_PUBLIC_CERT_NLP_URL || "https://www.deeplearning.ai"
    }
  ] as Certification[]
};

export const FLAGSHIP_PROJECTS: Project[] = [
  {
    id: "materials-intelligence-platform",
    title: "Enterprise Materials Intelligence Platform",
    category: "Full-Stack & Cloud",
    tagline: "End-to-End Polymer Formulation, Mechanical Property Analytics & Cloud Architecture",
    businessImpact: "Replaced high-cost proprietary vendor software with a scalable in-house platform, saving €1.2M+ in recurring license expenses for 150+ global researchers.",
    vendorCostSaved: "€1.2M+",
    stack: ["FastAPI", "Next.js 15", "MongoDB", "Redis", "AWS ECS Fargate", "Docker", "GitHub Actions"],
    githubUrl: process.env.NEXT_PUBLIC_PROJECT_1_GITHUB_URL || (process.env.NEXT_PUBLIC_GITHUB_URL ? `${process.env.NEXT_PUBLIC_GITHUB_URL}/materials-intelligence-platform` : "https://github.com/NaseebGrewal/materials-intelligence-platform"),
    liveDemoUrl: process.env.NEXT_PUBLIC_PROJECT_1_DEMO_URL || undefined,
    architectureHighlights: [
      "Optimistic concurrency control for chemical formulation versioning and strict audit trails",
      "Dynamic multi-variable filtering over mechanical, thermal, and regulatory property records",
      "AWS ECS Fargate deployment with automated zero-downtime rolling releases and 99.95% SLA"
    ],
    metrics: [
      { label: "Query Latency", value: "< 45ms" },
      { label: "Lab Efficiency", value: "+60%" },
      { label: "Test Coverage", value: "94%" }
    ]
  },
  {
    id: "chemagent-sds-compliance",
    title: "ChemAgent-Gov: Multi-Agent REACH Auditor",
    category: "Multi-Agent AI",
    tagline: "Autonomous Agentic SDS Parsing, ECHA SVHC Cross-Referencing & OESL Auditing",
    businessImpact: "Accelerated chemical safety compliance verification from hours to seconds per supplier SDS with zero hallucination rate on regulated limits.",
    stack: ["Python 3.12", "LangGraph", "Azure OpenAI", "FastAPI", "ChromaDB", "Docker"],
    githubUrl: process.env.NEXT_PUBLIC_PROJECT_2_GITHUB_URL || (process.env.NEXT_PUBLIC_GITHUB_URL ? `${process.env.NEXT_PUBLIC_GITHUB_URL}/chemagent-sds-compliance` : "https://github.com/NaseebGrewal/chemagent-sds-compliance"),
    liveDemoUrl: process.env.NEXT_PUBLIC_PROJECT_2_DEMO_URL || undefined,
    architectureHighlights: [
      "Supervisor-Worker multi-agent LangGraph workflow with deterministic verification",
      "Deterministic rule evaluation over live ECHA REACH SVHC chemical registries",
      "Automated human-in-the-loop alerts for carcinogenic (H350/H360) hazard statements"
    ],
    metrics: [
      { label: "Audit Latency", value: "11.4 ms" },
      { label: "Regulatory Accuracy", value: "100%" },
      { label: "SVHC Database", value: "ECHA List" }
    ]
  },
  {
    id: "rust-wasm-rheology-engine",
    title: "Ultra-Fast Lab Rheology & Mechanics Engine",
    category: "High-Perf Engineering",
    tagline: "Sub-Millisecond Tensile Curve-Fitting & Mechanical Invariant Calculation",
    businessImpact: "Achieved significant computation speedups over legacy laboratory desktop tooling with instant client-side WebAssembly execution.",
    stack: ["Rust", "WebAssembly (WASM)", "Axum", "FastAPI", "Next.js 15", "Plotly"],
    githubUrl: process.env.NEXT_PUBLIC_PROJECT_3_GITHUB_URL || (process.env.NEXT_PUBLIC_GITHUB_URL ? `${process.env.NEXT_PUBLIC_GITHUB_URL}/rust-wasm-rheology-engine` : "https://github.com/NaseebGrewal/rust-wasm-rheology-engine"),
    liveDemoUrl: process.env.NEXT_PUBLIC_PROJECT_3_DEMO_URL || undefined,
    architectureHighlights: [
      "Zero-latency client-side polynomial regression via compiled WebAssembly",
      "ISO 527-1 Young's Modulus and 0.2% offset yield stress mathematical solvers",
      "Memory footprint under 4.2 MB per 100,000 sensor telemetry points"
    ],
    metrics: [
      { label: "Regression Time", value: "1.8 ms" },
      { label: "Execution Speed", value: "WASM Native" },
      { label: "Memory Footprint", value: "< 4.2 MB" }
    ]
  },
  {
    id: "enterprise-ai-gateway-finops",
    title: "Enterprise AI Gateway & FinOps Controller",
    category: "AI Governance",
    tagline: "Semantic Caching, Departmental Token Quotas & Multi-Cloud Fallback",
    businessImpact: "Reduced enterprise LLM operational costs by 42% through semantic caching while enforcing strict data privacy and EU AI Act guardrails.",
    stack: ["FastAPI", "Redis", "LiteLLM", "OpenTelemetry", "Docker", "Prometheus"],
    githubUrl: process.env.NEXT_PUBLIC_PROJECT_4_GITHUB_URL || (process.env.NEXT_PUBLIC_GITHUB_URL ? `${process.env.NEXT_PUBLIC_GITHUB_URL}/enterprise-ai-gateway-finops` : "https://github.com/NaseebGrewal/enterprise-ai-gateway-finops"),
    liveDemoUrl: process.env.NEXT_PUBLIC_PROJECT_4_DEMO_URL || undefined,
    architectureHighlights: [
      "Sub-5ms semantic prompt cache hits using Redis SHA256 and exact prompt indexing",
      "Departmental budget controls preventing unintended token consumption across R&D",
      "Transparent multi-cloud failover across Azure OpenAI and AWS Bedrock with 99.99% uptime"
    ],
    metrics: [
      { label: "Cache Hit Latency", value: "3.2 ms" },
      { label: "Cost Reduction", value: "42%" },
      { label: "Model Uptime", value: "99.99%" }
    ]
  }
];
