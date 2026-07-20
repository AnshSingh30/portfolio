export const BIO = "Graduating May 2026 — building LLM-powered applications, RAG pipelines, and multi-agent orchestration systems. Focused on building production-grade Agentic AI workflows, resolving latency constraints, and developing scalable distributed backends.";

export const CONTACT_LINKS = [
  { icon: "MapPin", text: "Lucknow, India", href: null, type: "location" },
  { icon: "Mail", text: "sansh3030@gmail.com", href: "mailto:sansh3030@gmail.com" },
  { icon: "Github", text: "github.com/AnshSingh30", href: "https://github.com/AnshSingh30" },
  { icon: "Linkedin", text: "linkedin.com/in/ansh-singh", href: "https://linkedin.com/in/ansh-singh" }
];

export const SKILLS = [
  { 
    category: "Agentic AI & LLMs", 
    items: ["LangChain", "LlamaIndex", "OpenAI API", "Anthropic API", "Hugging Face", "RAG Pipelines", "Prompt Engineering", "Multi-Agent Orchestration", "Tool Use", "Memory Components", "Model Evaluation"] 
  },
  { 
    category: "Languages", 
    items: ["Python (Expert)", "C++", "JavaScript", "SQL", "Dart"] 
  },
  { 
    category: "ML / Deep Learning", 
    items: ["PyTorch", "TensorFlow", "scikit-learn", "CNN", "Feature Engineering", "NumPy", "Pandas"] 
  },
  { 
    category: "Backend & APIs", 
    items: ["Flask", "FastAPI", "REST APIs", "SQLAlchemy", "PostgreSQL", "Supabase", "FAISS / Vector Search"] 
  },
  { 
    category: "Cloud & Infra", 
    items: ["AWS (ECS/EC2/S3)", "Docker", "Git", "Linux", "CI/CD"] 
  },
  { 
    category: "Frontend & Mobile", 
    items: ["React", "Flutter", "WebSockets", "Real-time Data Sync"] 
  },
  { 
    category: "Auth & Security", 
    items: ["OAuth 2.0", "JWT", "RBAC", "Row-Level Security"] 
  },
  { 
    category: "Core CS", 
    items: ["DSA", "OOP", "OS", "DBMS", "Computer Networks", "SDLC/Agile"] 
  }
];

// JUITConnect is intentionally listed first — it's the flagship university app and should
// lead the Selected Work reel. The Projects section numbers slides by array order.
export const PROJECTS = [
  {
    id: 4,
    number: "01",
    title: "JUITConnect",
    badge: "UNIVERSITY APP · REAL-TIME",
    tagline: "Real-time university ecosystem serving thousands of students",
    tech_tags: ["Flutter", "Supabase", "PostgreSQL", "Dart", "Real-time APIs", "RBAC", "RLS"],
    description: "Designed and shipped a cross-platform mobile app for my university, syncing live data via Supabase Realtime for university-wide student/faculty roles. Enforced RBAC using PostgreSQL Row-Level Security and optimized cold-start load times via selective subscription queries.",
    github_url: "https://github.com/AnshSingh30/JUITConnect",
    highlight_stat: { value: "RLS", label: "Row-Level Security" }
  },
  {
    id: 1,
    number: "02",
    title: "Multi-Source RAG Pipeline (Multi-RAG)",
    badge: "AGENTIC AI · PRODUCTION RAG",
    tagline: "Multi-agent RAG system with tool use, planner, and memory components",
    tech_tags: ["Python", "LangChain", "FAISS", "OpenAI API", "Flask", "PostgreSQL"],
    description: "Built a multi-agent RAG system that ingests PDFs, web URLs, and databases into a unified FAISS vector store. Configured hybrid (dense/sparse) retrieval strategies with dynamic context window management, achieving sub-200ms query response times and reducing LLM hallucinations by 60% vs. vanilla API baseline.",
    github_url: "https://github.com/AnshSingh30/Multi-RAG",
    highlight_stat: { value: "60%", label: "Hallucination reduction" }
  },
  {
    id: 2,
    number: "03",
    title: "SyncBoard — Real-Time Platform",
    badge: "DISTRIBUTED SYSTEMS · REAL-TIME",
    tagline: "Real-time collaboration platform with WebSocket-driven live sync",
    tech_tags: ["React", "Node.js", "WebSockets", "PostgreSQL", "Docker"],
    description: "Developed a real-time collaboration workspace using WebSockets, RBAC, and JWT authentication. Integrated queue-based async event processing to manage concurrent user sessions under load. Containerized via Docker with environment-isolated configurations.",
    github_url: "https://github.com/AnshSingh30/SyncBoard",
    highlight_stat: { value: "Queue", label: "Async Event Processing" }
  },
  {
    id: 3,
    number: "04",
    title: "RAG-Powered Web Chatbot",
    badge: "AI CHATBOT · WEB INTELLIGENCE",
    tagline: "RAG pipeline with live web scraping and chunking",
    tech_tags: ["Python", "Flask", "RAG", "OpenAI API", "BeautifulSoup", "PostgreSQL"],
    description: "Created a web-intelligence chatbot compiling real-time search context. Integrates automated live web scraping, document chunking, embedding generation, and context-aware response generation. Engineered as decoupled modular service layers.",
    github_url: "https://github.com/AnshSingh30/ChatBot-WebScrapper",
    highlight_stat: { value: "Modular", label: "Service Layer Architecture" }
  }
];

export const EXPERIENCE = [
  {
    role: "AI/ML Engineering Intern",
    company: "Hindalco Industries, Aditya Birla Group",
    company_short: "Hindalco · Aditya Birla Group",
    period: "Jun 2025 – Jul 2025",
    location: "Lucknow, India",
    type: "Internship",
    impact_stats: [
      { value: "40", unit: "%", label: "Manual Effort Reduction", description: "Autonomously triaged anomalies" },
      { value: "50,000", unit: "+", label: "Records Ingested", description: "Built scalable data pipelines" }
    ],
    bullets: [
      "Designed and deployed ML-based anomaly detection integrated into live operational monitoring — a production Agentic AI workflow that autonomously classified and triaged anomalies, reducing manual effort by 40%.",
      "Built scalable Python data pipelines processing 50,000+ records with structured ingestion, preprocessing, and embedding.",
      "Audited LLM responses and system logs to eliminate false positives in automated alerting, improving detection precision through iterative model evaluation and prompt tuning.",
      "Deployed predictive models on AWS infrastructure, resolving critical bottlenecks in automated analysis workflows."
    ]
  },
  {
    role: "Machine Learning Trainee",
    company: "Teachnook (IIT Roorkee Collaboration)",
    company_short: "Teachnook · IIT Roorkee",
    period: "Jul 2024",
    location: "Lucknow, India (Remote)",
    type: "Training Program",
    impact_stats: null,
    bullets: [
      "Applied advanced ML algorithms with targeted feature engineering to classification and regression tasks.",
      "Validated ML model deployments against training datasets, identifying and mitigating performance regressions pre-release."
    ]
  }
];

export const EDUCATION = [
  {
    degree: "B.Tech, Computer Science & Engineering (AI/ML Specialization)",
    institution: "Jaypee University of Information Technology",
    institution_short: "JUIT, Solan, India",
    period: "Aug 2022 – May 2026",
    location: "Solan, HP, India",
    status: "ongoing",
    note: "Optimized database query speed by 20% via a custom-designed algorithm.",
    prominence: "primary"
  },
  {
    degree: "Intermediate School Certificate",
    institution: "Vishwanath Academy",
    period: "2022",
    location: "Lucknow, India",
    grade: "93.8%",
    prominence: "secondary"
  },
  {
    degree: "Secondary School Certificate",
    institution: "City Montessori School",
    period: "2020",
    location: "Lucknow, India",
    grade: "90%",
    prominence: "secondary"
  }
];

export const PATENTS = [
  {
    title: "Patent Applications",
    description: "2 patent applications filed (April 2026) — currently pending. Details available on request."
  }
];

export const NAV_SECTIONS = [
  { id: 'hero', label: 'Chapter I — Who Am I' },
  { id: 'dolly', label: 'Chapter II — What I Build' },
  { id: 'skills', label: 'Chapter III — The Toolkit' },
  { id: 'projects', label: 'Chapter IV — Selected Work' },
  { id: 'experience', label: 'Chapter V — The Field Notes' },
  { id: 'education', label: 'Chapter VI — Ground Truth' },
  { id: 'contact', label: 'Chapter VII — The Grid' },
];
