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

export interface CatalogProject {
  id: string;
  title: string;
  category: "GenAI & Multi-Agent" | "Full-Stack Cloud & R&D OS" | "High-Performance & ML" | "Enterprise Infrastructure";
  disciplineBadge: string;
  domain: "Chemicals & Materials" | "Automotive & Industrial" | "Cement & Building Materials" | "Life Sciences & Pharma" | "FinTech & Compliance";
  problemSolved: string;
  architectureHighlights: string[];
  businessImpact: string;
  stack: string[];
  sourcePath?: string;
  githubUrl?: string;
  liveDemoUrl?: string;
  isInteractive?: boolean;
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
  location?: string;
  period?: string;
  specialization: string;
  thesis?: string;
  coreSubjects: string[];
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: { name: string; highlight?: boolean }[];
}

export interface EnterpriseCompany {
  id: string;
  name: string;
  subtitle: string;
  industry: string;
  badge: string;
  shortCode: string;
  logoPath: string;
  period?: string;
  impactHighlight: string;
}

export const ENTERPRISE_PEDIGREE: EnterpriseCompany[] = [
  {
    id: "continental",
    name: "Continental",
    subtitle: "Tier-1 Automotive & Industrial Systems",
    industry: "Automotive & Manufacturing",
    badge: "€1.2M+ Vendor Licensing Saved",
    shortCode: "CON",
    logoPath: "/logos/continental.svg",
    impactHighlight: "Architected the in-house Enterprise Material Database & Lab Test Order Management Platform, eliminating €1.2M+ in third-party vendor licensing and automating test turnaround across global facilities."
  },
  {
    id: "heidelberg-materials",
    name: "Heidelberg Materials",
    subtitle: "Global Building Materials & Cement",
    industry: "Heavy Industrial & Plants",
    badge: "GenAI RCFA & Support Acceleration",
    shortCode: "HEI",
    logoPath: "/logos/heidelberg-materials.svg",
    impactHighlight: "Engineered GenAI Customer Support automation and Plant Root Cause Failure Analysis (RCFA) pipelines, accelerating customer issue turnaround and dramatically boosting internal engineering productivity."
  },
  {
    id: "wongdoody",
    name: "WONGDOODY",
    subtitle: "An Infosys Company",
    industry: "Enterprise AI & Cloud Consulting",
    badge: "GenAI Bots & Server Infrastructure",
    shortCode: "WDY",
    logoPath: "/logos/wongdoody.svg",
    impactHighlight: "Built real-time MS Teams AI meeting transcription & summarization bots, managed on-premise Linux server infrastructure & security patching, and deployed Fooocus / ComfyUI generative image pipelines."
  },
  {
    id: "iff-pharma",
    name: "IFF Pharma (now Roquette)",
    subtitle: "Specialty Pharma & Life Sciences",
    industry: "Life Sciences & Pharma Solutions",
    badge: "ODIS & RDDR Scientific Search",
    shortCode: "IFF",
    logoPath: "/logos/iff.png",
    impactHighlight: "Led core maintenance, feature enhancements, and system optimization for enterprise R&D platforms (RDDR & ODIS Ontology Search), structuring high-throughput pharmaceutical formulations and compliance verification across global research teams."
  },
  {
    id: "meesho",
    name: "Meesho",
    subtitle: "High-Scale E-Commerce Platform",
    industry: "Consumer Tech & Distributed Data",
    badge: "Sales Intelligence & Dynamic Pricing",
    shortCode: "MSH",
    logoPath: "/logos/meesho.png",
    impactHighlight: "Empowered sales leadership with deep buyer requirement intelligence, unlocked high-growth product category pipelines, reduced duplicate product competition, and optimized dynamic e-commerce pricing."
  },
  {
    id: "sap",
    name: "SAP",
    subtitle: "Enterprise Cloud Software",
    industry: "Global Cloud Ecosystems",
    badge: "openSAP MOOC Analytics",
    shortCode: "SAP",
    logoPath: "/logos/sap.svg",
    impactHighlight: "Served as Business Content Associate auditing and optimizing technical course architectures on the openSAP MOOC platform, driving higher learner completion rates and ecosystem adoption."
  },
  {
    id: "iit-roorkee",
    name: "IIT Roorkee",
    subtitle: "Premier Engineering Institute",
    industry: "Academic Foundations & Chemical Eng.",
    badge: "B.Tech Polymer Science & Tech",
    shortCode: "IITR",
    logoPath: "/logos/iit-roorkee.png",
    impactHighlight: "B.Tech in Polymer Science & Technology (Dept. of Chemical Engineering) with deep academic specializations in chemical thermodynamics, Database Management Systems, and Computer Science."
  }
];

export const CANDIDATE_PROFILE = {
  name: process.env.NEXT_PUBLIC_CANDIDATE_NAME || "Naseeb Grewal, M.Sc.",
  title: process.env.NEXT_PUBLIC_CANDIDATE_TITLE || "Senior AI Solutions Architect | R&D Digitalization & Full-Stack Lead",
  headline: "Senior AI Solutions Architect & Lead Systems Engineer",
  tagline: "Enterprise AI Architecture • Industrial R&D Digitalization • Multi-Agent Systems",
  executiveSummary:
    "Cross-industry Senior AI Solutions Architect with 7+ years of experience leading digitalization across Specialty Chemicals, Automotive Tier-1 Plants, Cement & Building Materials, and Life Sciences. Proven record of eliminating €1.2M+ in recurring third-party vendor licensing by architecting customized in-house R&D Operating Systems, multi-agent compliance swarms (LangGraph), and sub-millisecond Rust/WASM simulation engines on AWS ECS and Azure.",
  location: process.env.NEXT_PUBLIC_CANDIDATE_LOCATION || "Germany (Open to Hybrid & Remote Worldwide)",
  email: process.env.NEXT_PUBLIC_CANDIDATE_EMAIL || "contact@yourdomain.com",
  phone: process.env.NEXT_PUBLIC_CANDIDATE_PHONE || "+49 XXXXXXXXXX",
  githubUrl: process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/NaseebGrewal",
  linkedinUrl: process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://linkedin.com/in/naseeb-grewal",
  portfolioUrl: process.env.NEXT_PUBLIC_PORTFOLIO_URL || "https://yourportfolio.dev",
  status: "Available for Senior AI & Solutions Architecture Leadership Roles",
  experienceYears: "7+",
  targetIndustries: [
    "Specialty Chemicals & Advanced Materials",
    "Automotive Tier-1 & Plant Manufacturing",
    "Cement & Building Materials Digitalization",
    "Life Sciences & Pharma Laboratory AI"
  ],
  languages: [
    { language: "English", proficiency: "Fluent / Professional (C2)" },
    { language: "German", proficiency: "Conversational / Working Proficiency (B1–B2)" }
  ],
  leadershipPractices: [
    {
      title: "Team Upskilling & Engineering Workshops",
      description: "Mentored lab scientists and junior developers in Test-Driven Development (TDD), Git flow, clean code, and API contracts."
    },
    {
      title: "R&D Technical Product Ownership",
      description: "Bridged complex physical/chemical lab requirements with Agile sprint planning, technical roadmaps, and stakeholder alignment."
    },
    {
      title: "Enterprise Architecture & FinOps",
      description: "Designed multi-AZ cloud deployments (AWS ECS/ALB, Azure Container Apps) with semantic caching to slash AI operational costs."
    },
    {
      title: "Zero-Downtime DevOps Culture",
      description: "Instituted containerized CI/CD pipelines with automated security audits, Pytest/Vitest suites, and 99.95% production SLAs."
    }
  ],
  headlineStats: [
    { label: "Vendor Costs Saved", value: "€1.2M+", context: "Replaced commercial vendor database & testing licenses with in-house R&D OS" },
    { label: "Active Enterprise Users", value: "150+", context: "Scientists, lab technicians & compliance officers across multi-site production" },
    { label: "Cloud SLA Availability", value: "99.95%", context: "Containerized AWS ECS Fargate & ALB multi-AZ architecture" },
    { label: "Discovery Acceleration", value: "60%", context: "Sub-second prediction APIs & automated regulatory screening" }
  ],
  skillCategories: [
    {
      category: "Enterprise AI & Multi-Agent Systems",
      description: "Autonomous Agent swarms, RAG architectures, model evaluation & FinOps guardrails",
      skills: [
        { name: "Multi-Agent Orchestration (LangGraph, CrewAI)", highlight: true },
        { name: "Generative AI & LLM APIs (GPT-4o, Claude 3.5, Gemini 2.0)", highlight: true },
        { name: "RAG & Vector Search (MongoDB Vector, FAISS, Qdrant)", highlight: true },
        { name: "Azure AI Search & Foundry, AWS Bedrock", highlight: true },
        { name: "Semantic Caching & FinOps Token Quotas (LiteLLM)", highlight: true },
        { name: "Root Cause Failure Analysis (RCFA) AI Systems", highlight: false },
        { name: "Knowledge Graphs & Ontology Modeling (Neo4j, MarkLogic)", highlight: false }
      ]
    },
    {
      category: "Full-Stack & High-Performance Engineering",
      description: "Reactive web platforms, sub-millisecond compute engines & microservices",
      skills: [
        { name: "Python (FastAPI, AsyncIO, Pydantic v2)", highlight: true },
        { name: "TypeScript & Next.js 15 (React 19/18)", highlight: true },
        { name: "Rust & WebAssembly (WASM / Axum)", highlight: true },
        { name: "High-Density Data Grids & Excel-Grade Filtering", highlight: true },
        { name: "Tailwind CSS & Modern Accessible UI/UX", highlight: false },
        { name: "Test-Driven Development (Pytest, Vitest, 100% Pass Rate)", highlight: true }
      ]
    },
    {
      category: "Cloud Architecture, DevOps & Infrastructure",
      description: "Resilient containerized deployments, zero-downtime pipelines & infrastructure as code",
      skills: [
        { name: "AWS (ECS Fargate, ECR, S3, RDS, Lambda, ALB, Route 53)", highlight: true },
        { name: "Microsoft Azure (Container Apps, Azure Functions, Blob)", highlight: true },
        { name: "Docker & Multi-Stage Production Builds", highlight: true },
        { name: "Automated CI/CD (GitHub Actions, GitLab CI)", highlight: true },
        { name: "Monitoring & Observability (OpenTelemetry, Prometheus)", highlight: false },
        { name: "FinOps Cost Optimization & Resource Rightsizing", highlight: false }
      ]
    },
    {
      category: "Data Engineering & Enterprise Databases",
      description: "Multi-terabyte telemetry, distributed caching, schema design & time-series data",
      skills: [
        { name: "MongoDB Atlas & Complex Aggregation Pipelines", highlight: true },
        { name: "Redis In-Memory Semantic Caching", highlight: true },
        { name: "PostgreSQL & Relational Data Modeling", highlight: true },
        { name: "AWS Glue, Athena & S3 Data Lakes", highlight: false },
        { name: "MarkLogic & Ontology-Driven Search Engines", highlight: false },
        { name: "Time-Series Telemetry & Sensor Ingestion", highlight: false }
      ]
    },
    {
      category: "Industrial Domain Science & Digitalization",
      description: "Bridging physical science R&D, chemical thermodynamics & automated regulatory compliance",
      skills: [
        { name: "Polymer Physics & Recipe Formulation Lifecycle", highlight: true },
        { name: "Rheology & ISO 527 Tensile Mechanical Modeling", highlight: true },
        { name: "Automated REACH SVHC & SDS Safety Gates", highlight: true },
        { name: "Automotive Plant Root Cause Failure Analysis (RCFA)", highlight: true },
        { name: "Cement & Concrete Compressive Strength Prediction", highlight: false },
        { name: "Cross-Functional IT/Lab Stakeholder Alignment", highlight: true }
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
        "Architected and delivered the enterprise in-house R&D Operating System (Next.js 15 + FastAPI + MongoDB on AWS ECS Fargate), serving 150+ chemical researchers and engineers across multi-site production facilities.",
        "Eliminated over €1,200,000 in recurring third-party vendor licensing fees by building customized formulation lifecycle management, high-density lab property grids, and automated ESH compliance gates.",
        "Integrated Agentic AI workflows (LangGraph, OpenAI, Claude) to automate polymer property predictions, SDS safety reviews, and formulation optimization, cutting manual discovery cycles by 60%.",
        "Engineered high-throughput testing microservices utilizing Python and Rust/WASM to replace legacy desktop tools, reducing mechanical curve-fitting latency from minutes to sub-second execution.",
        "Designed production AWS infrastructure (ECS Fargate, ALB, Route53, S3, MongoDB Atlas) with automated GitHub Actions CI/CD pipelines, maintaining 99.95% service availability.",
        "Spearheaded engineering culture transformation and agile standards, conducting workshops on clean code, Git practices, and automated testing, doubling team delivery velocity."
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
      specialization: "Specialization: Generative AI, Multi-Modal Systems & Cloud Distributed Architecture",
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
    tagline: "In-House R&D Operating System: Formulation Lifecycle, High-Density Grids & ESH Gates",
    businessImpact: "Replaced high-cost third-party vendor platforms with an in-house R&D Operating System, saving €1.2M+ in recurring licenses for 150+ researchers across global plants.",
    vendorCostSaved: "€1.2M+",
    stack: ["FastAPI", "Next.js 15", "MongoDB", "Redis", "AWS ECS Fargate", "Docker", "GitHub Actions"],
    githubUrl: process.env.NEXT_PUBLIC_PROJECT_1_GITHUB_URL || (process.env.NEXT_PUBLIC_GITHUB_URL ? `${process.env.NEXT_PUBLIC_GITHUB_URL}/tree/main/projects/01-materials-intelligence-platform` : "https://github.com/NaseebGrewal/portfolio-ecosystem/tree/main/projects/01-materials-intelligence-platform"),
    liveDemoUrl: process.env.NEXT_PUBLIC_PROJECT_1_DEMO_URL || undefined,
    architectureHighlights: [
      "Full Recipe & Formulation Lifecycle: multi-ingredient stoichiometry, batch versioning & parent-child trees",
      "Excel-Grade Master Filtering: high-density property grids with multi-column filters & real-time statistics",
      "Automated ESH & SVHC Compliance Gates: real-time hazard screening and role-based sign-off workflows"
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
    githubUrl: process.env.NEXT_PUBLIC_PROJECT_2_GITHUB_URL || (process.env.NEXT_PUBLIC_GITHUB_URL ? `${process.env.NEXT_PUBLIC_GITHUB_URL}/tree/main/projects/02-chemagent-sds-compliance` : "https://github.com/NaseebGrewal/portfolio-ecosystem/tree/main/projects/02-chemagent-sds-compliance"),
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
    githubUrl: process.env.NEXT_PUBLIC_PROJECT_3_GITHUB_URL || (process.env.NEXT_PUBLIC_GITHUB_URL ? `${process.env.NEXT_PUBLIC_GITHUB_URL}/tree/main/projects/03-rust-wasm-rheology-engine` : "https://github.com/NaseebGrewal/portfolio-ecosystem/tree/main/projects/03-rust-wasm-rheology-engine"),
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
    githubUrl: process.env.NEXT_PUBLIC_PROJECT_4_GITHUB_URL || (process.env.NEXT_PUBLIC_GITHUB_URL ? `${process.env.NEXT_PUBLIC_GITHUB_URL}/tree/main/projects/04-enterprise-ai-gateway-finops` : "https://github.com/NaseebGrewal/portfolio-ecosystem/tree/main/projects/04-enterprise-ai-gateway-finops"),
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

export const ENTERPRISE_SYSTEMS_CATALOG: CatalogProject[] = [
  {
    id: "material-database-platform",
    title: "Enterprise Material Database & R&D OS",
    category: "Full-Stack Cloud & R&D OS",
    disciplineBadge: "Enterprise R&D OS • Full-Stack AWS",
    domain: "Chemicals & Materials",
    problemSolved: "Eliminated fragmented legacy spreadsheets and €1.2M+ in third-party vendor fees by centralizing all recipe lifecycles, ingredients, and compliance gates into one high-performance system.",
    architectureHighlights: [
      "Full Recipe Lifecycle: Stoichiometric balance, formula trees, and parent/child batch versioning",
      "Excel-Grade Master Grids: High-density multi-attribute filtering, pivot statistics, and inline edits",
      "Automated ESH & SVHC Compliance: Real-time hazard classification with strict RBAC approval chains",
      "AWS Multi-AZ Infrastructure: ECS Fargate, ALB, Route 53, S3, and MongoDB Atlas with 99.95% SLA"
    ],
    businessImpact: "€1.2M+ direct vendor costs saved; adopted by 150+ researchers & plant technicians across global facilities.",
    stack: ["Next.js 15", "FastAPI", "MongoDB", "Redis", "AWS ECS", "ALB", "Docker", "GitHub Actions"],
    sourcePath: "projects/01-materials-intelligence-platform",
    githubUrl: process.env.NEXT_PUBLIC_PROJECT_1_GITHUB_URL || "https://github.com/NaseebGrewal/portfolio-ecosystem/tree/main/projects/01-materials-intelligence-platform",
    isInteractive: true
  },
  {
    id: "chemagent-sds-compliance",
    title: "ChemAgent-Gov: Multi-Agent REACH & SDS Auditor",
    category: "GenAI & Multi-Agent",
    disciplineBadge: "Multi-Agent Swarm • LangGraph",
    domain: "Chemicals & Materials",
    problemSolved: "Automated the tedious, error-prone manual review of chemical Safety Data Sheets against strict ECHA SVHC lists with zero hallucination guarantee.",
    architectureHighlights: [
      "Supervisor-Worker multi-agent orchestration using LangGraph with deterministic state checkpoints",
      "Live ECHA SVHC candidate list cross-referencing and GHS hazard statement (H350/H360) parsing",
      "Deterministic verification gate that blocks unauthorized formulation recipes prior to plant production"
    ],
    businessImpact: "Reduced SDS auditing cycle time from 3 hours to 11.4ms with 100% regulatory boundary accuracy.",
    stack: ["Python 3.12", "LangGraph", "Azure OpenAI", "FastAPI", "ChromaDB", "Docker"],
    sourcePath: "projects/02-chemagent-sds-compliance",
    githubUrl: process.env.NEXT_PUBLIC_PROJECT_2_GITHUB_URL || "https://github.com/NaseebGrewal/portfolio-ecosystem/tree/main/projects/02-chemagent-sds-compliance",
    isInteractive: true
  },
  {
    id: "rust-wasm-rheology-engine",
    title: "Ultra-Fast Lab Rheology & Mechanics Engine",
    category: "High-Performance & ML",
    disciplineBadge: "High-Performance Computing • Rust & WASM",
    domain: "Automotive & Industrial",
    problemSolved: "Replaced sluggish legacy lab desktop tools with an in-browser WebAssembly engine for high-throughput ISO 527 tensile curve regression.",
    architectureHighlights: [
      "High-throughput polynomial regression solver compiled from Rust to client-side WebAssembly",
      "Calculates Young's Modulus, 0.2% offset yield stress, and strain-hardening exponents in sub-2ms",
      "Lightweight memory footprint under 4.2 MB per 100k data points with interactive Plotly visualization"
    ],
    businessImpact: "Sub-millisecond mathematical execution directly in the browser; eliminates local desktop installation overhead.",
    stack: ["Rust", "WebAssembly (WASM)", "Axum", "FastAPI", "Next.js 15", "Plotly"],
    sourcePath: "projects/03-rust-wasm-rheology-engine",
    githubUrl: process.env.NEXT_PUBLIC_PROJECT_3_GITHUB_URL || "https://github.com/NaseebGrewal/portfolio-ecosystem/tree/main/projects/03-rust-wasm-rheology-engine",
    isInteractive: true
  },
  {
    id: "enterprise-ai-gateway-finops",
    title: "Enterprise AI FinOps & Governance Gateway",
    category: "Enterprise Infrastructure",
    disciplineBadge: "Cloud AI FinOps • Redis Caching",
    domain: "FinTech & Compliance",
    problemSolved: "Solved unpredictable LLM operational costs and data leakage by routing all corporate AI requests through a centralized semantic cache and quota governor.",
    architectureHighlights: [
      "Redis SHA256 semantic caching engine with sub-5ms cache hit returns",
      "Departmental token quotas with automated throttling, failover, and PII masking",
      "Multi-provider failover routing between Azure OpenAI, AWS Bedrock, and Anthropic Claude"
    ],
    businessImpact: "Reduced enterprise AI API operational expenditure by 42% while enforcing EU AI Act governance.",
    stack: ["FastAPI", "Redis", "LiteLLM", "Docker", "Prometheus", "OpenTelemetry"],
    sourcePath: "projects/04-enterprise-ai-gateway-finops",
    githubUrl: process.env.NEXT_PUBLIC_PROJECT_4_GITHUB_URL || "https://github.com/NaseebGrewal/portfolio-ecosystem/tree/main/projects/04-enterprise-ai-gateway-finops",
    isInteractive: true
  },
  {
    id: "rcfa-genai-assistant",
    title: "Industrial Plant Root Cause Failure Analysis (RCFA) GenAI",
    category: "GenAI & Multi-Agent",
    disciplineBadge: "Industrial IoT AI • Azure AI Search",
    domain: "Automotive & Industrial",
    problemSolved: "Reduced downtime in manufacturing plants by using Generative AI to connect historical failure event nodes and telemetry to identify root causes faster.",
    architectureHighlights: [
      "RAG pipeline over plant maintenance logs, equipment telemetry, and RCFA fault tree nodes",
      "Azure AI Search hybrid semantic search indexed with plant equipment taxonomy",
      "Azure Function App backend triggering automated diagnostic summaries for plant technicians"
    ],
    businessImpact: "Accelerated critical plant failure root-cause identification time by 70%, minimizing production line stoppage.",
    stack: ["Azure OpenAI", "Azure AI Search", "Azure Functions", "Python", "FastAPI", "LangChain"]
  },
  {
    id: "master-thesis-rag-code-reviewer",
    title: "Multi-Modal RAG Data Assistant & Code Quality Reviewer",
    category: "GenAI & Multi-Agent",
    disciplineBadge: "Multi-Modal RAG • AST Code Analysis",
    domain: "Life Sciences & Pharma",
    problemSolved: "Master's thesis research project combining multi-modal document understanding with automated intelligent code quality verification and security guardrails.",
    architectureHighlights: [
      "Multi-modal document ingestion supporting technical PDFs, tabular scientific data, and codebases",
      "AST-level code quality scanning integrated with LLM verification to detect anti-patterns and vulnerabilities",
      "Context-aware RAG engine delivering source-cited explanations with verifiable evidence"
    ],
    businessImpact: "Academic research validated in production environments; rated with highest academic honors for novel multi-modal evaluation.",
    stack: ["Python", "LangChain", "Vector Embeddings", "FastAPI", "Pytest", "Docker"],
    sourcePath: "MastersThesisProject/Generative-AI-for-RAG-and-code-reviews"
  },
  {
    id: "test-order-management-platform",
    title: "Enterprise Lab Test Order Management Platform",
    category: "Full-Stack Cloud & R&D OS",
    disciplineBadge: "Laboratory Automation • Cloud Data Tracking",
    domain: "Chemicals & Materials",
    problemSolved: "Bridged the communication gap between research departments and physical testing laboratories, enabling structured test requests, result tracking, and file evaluation.",
    architectureHighlights: [
      "Interactive request portal for material scientists to commission mechanical and thermal tests",
      "Lab technician evaluation console for uploading raw test curves, notes, and approval status",
      "AWS ECS/ECR deployment with S3 secure artifact storage and MongoDB tracking database"
    ],
    businessImpact: "Eliminated email-based test tracking; increased test order turnaround transparency across 500+ monthly orders.",
    stack: ["Dash", "Flask", "AWS ECS", "ECR", "S3", "RDS PostgreSQL", "MongoDB"]
  },
  {
    id: "fintech-doc-extractor",
    title: "FinTech Multi-Format Document Information Extractor",
    category: "GenAI & Multi-Agent",
    disciplineBadge: "Structured LLM • Pydantic Schema Pipeline",
    domain: "FinTech & Compliance",
    problemSolved: "Automated extraction of financial statements, transaction metadata, and tax categories from unstructured multilingual PDF documents.",
    architectureHighlights: [
      "Deterministic Pydantic schema enforcement with structured JSON LLM output extraction",
      "Multilingual PDF parsing handling complex tabular statements, currency conversions, and headers",
      "FastAPI microservice with asynchronous batch document processing and validation pipelines"
    ],
    businessImpact: "Achieved >98% field extraction precision across English and German banking documents.",
    stack: ["FastAPI", "Python", "Pydantic v2", "LLM JSON Schema", "PDFMiner", "Docker"],
    sourcePath: "Bank_document_category_information_extractor_N26_GenAI_THA"
  },
  {
    id: "biomedical-ner-extractor",
    title: "Pharma Biomedical Data Extractor & Entity Pipeline",
    category: "High-Performance & ML",
    disciplineBadge: "Biomedical NLP • Named Entity Linking",
    domain: "Life Sciences & Pharma",
    problemSolved: "Extracted clinical symptoms, adverse drug events, and patient-reported outcomes from unstructured medical literature and trial reports.",
    architectureHighlights: [
      "Biomedical Named Entity Recognition (NER) pipeline linked with medical ontologies",
      "Automated extraction of drug-symptom co-occurrence matrices and dosage correlations",
      "Robust error handling and schema validation for ingestion into downstream research graphs"
    ],
    businessImpact: "Accelerated biomedical literature screening by 80% for pharmacological research teams.",
    stack: ["Python", "NLP / NER", "Pydantic", "FastAPI", "Pandas"],
    sourcePath: "Medical_Data_Extractor_Semalytix_THASub"
  },
  {
    id: "aml-compliance-rag",
    title: "AML Regulatory Compliance RAG Knowledge System",
    category: "GenAI & Multi-Agent",
    disciplineBadge: "FAISS Vector Index • Audit Retrieval",
    domain: "FinTech & Compliance",
    problemSolved: "Constructed an audit-proof retrieval system for compliance teams to query complex Anti-Money Laundering (AML) directives and regulatory changes.",
    architectureHighlights: [
      "FAISS dense vector index over legal and compliance framework documentation",
      "Exact regulatory reference citation with chunk-level attribution to prevent hallucinated advice",
      "Deterministic fallback for undefined compliance boundary questions"
    ],
    businessImpact: "Zero-latency compliance retrieval ensuring complete audit-trail verification.",
    stack: ["Python", "FAISS", "LangChain", "SQLite", "FastAPI"],
    sourcePath: "Simple_RAG_System_Hawk"
  },
  {
    id: "predictive-maintenance-telemetry",
    title: "Industrial Sensor Predictive Maintenance Pipeline",
    category: "High-Performance & ML",
    disciplineBadge: "Time-Series ML • Sensor Anomaly Detection",
    domain: "Automotive & Industrial",
    problemSolved: "Predicted equipment degradation and remaining useful life (RUL) from multi-sensor industrial telemetry streams before catastrophic breakdown.",
    architectureHighlights: [
      "Time-series feature engineering (vibration harmonics, temperature spikes, pressure decay)",
      "Random Forest & Ensemble anomaly classification with early failure window warnings",
      "Exportable ML pipelines for edge inference in plant operational environments"
    ],
    businessImpact: "Demonstrated early anomaly detection 48 hours prior to simulated mechanical bearing failure.",
    stack: ["Python", "Scikit-Learn", "Pandas", "NumPy", "Jupyter"],
    sourcePath: "Predictive Maintainence"
  },
  {
    id: "enterprise-copilot-customer-bot",
    title: "Multi-Modal Enterprise Assistant & Customer Support Bot",
    category: "GenAI & Multi-Agent",
    disciplineBadge: "Enterprise RAG • MS Copilot Studio",
    domain: "Automotive & Industrial",
    problemSolved: "Automated high-volume departmental inquiries and customer support responses using enterprise knowledge base integration.",
    architectureHighlights: [
      "Microsoft Copilot Studio integration orchestrated with Azure Function App microservices",
      "Azure Blob Storage & Azure AI Search index for synchronized enterprise documentation",
      "Secure role-scoped retrieval preventing unauthorized internal data exposure"
    ],
    businessImpact: "Handled 10,000+ monthly internal inquiries, slashing first-response turnaround by 85%.",
    stack: ["MS Copilot Studio", "Azure Functions", "Azure AI Search", "Azure Blob", "Python"]
  },
  {
    id: "rddr-odis-data-registry",
    title: "R&D Data Registry (RDDR) & ODIS Ontology Search",
    category: "Enterprise Infrastructure",
    disciplineBadge: "Ontology Modeling • MarkLogic & AWS",
    domain: "Chemicals & Materials",
    problemSolved: "Enterprise patent and scientific data registry enabling researchers across global business units to search, index, and correlate proprietary patent publications.",
    architectureHighlights: [
      "Ontology-driven document store indexing millions of technical records and patent classifications",
      "ReactJS frontends connected to Node.js / Python middle-tier microservices",
      "GitLab CI pipelines deploying containerized services into AWS cloud infrastructure"
    ],
    businessImpact: "Maintained mission-critical patent search engine supporting global IP strategy and enterprise IP newsletters.",
    stack: ["MarkLogic", "ReactJS", "NodeJS", "Docker", "Python", "AWS", "GitLab CI"]
  },
  {
    id: "patient-feedback-healthcare-system",
    title: "Patient Feedback Healthcare Analytics Platform",
    category: "Full-Stack Cloud & R&D OS",
    disciplineBadge: "Relational Modeling • Supabase & Flask",
    domain: "Life Sciences & Pharma",
    problemSolved: "Enabled hospitals to collect, analyze, and visualize patient feedback across medical staff, facilities, and stay experiences to drive clinical quality improvements.",
    architectureHighlights: [
      "Full-stack Flask application integrated with Supabase PostgreSQL cloud backend",
      "Role-based dashboards for hospital administration, nursing leads, and clinical heads",
      "Automated sentiment classification and department scoring metrics"
    ],
    businessImpact: "Completed with top academic marks in Advanced Database Systems; provided full CRUD lifecycle and audit history.",
    stack: ["Flask", "Supabase", "PostgreSQL", "Python", "HTML5/CSS3"],
    sourcePath: "Full_stack_Patient_feedback_system_Using_Flask_Framework"
  }
];
