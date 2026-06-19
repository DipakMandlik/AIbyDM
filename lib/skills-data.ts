// Skills Marketplace content model and static data.
// All content is typed and pre-baked for static export compatibility.

export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
export type SkillCategory = 'Engineering' | 'Architecture' | 'Product' | 'Security' | 'Operations' | 'Research';

export type Skill = {
  slug: string;
  title: string;
  tagline: string;
  difficulty: Difficulty;
  xp: number;
  duration: string;
  description: string;
  learningPaths: number;
  projects: number;
  certifications: number;
  category: SkillCategory;
  trending?: boolean;
  featured?: boolean;
  relatedTrackSlugs?: string[];
  relatedGameSlugs?: string[];
  relatedExamSlugs?: string[];
};

export type CareerPath = {
  slug: string;
  title: string;
  role: string;
  salaryRange: string;
  tagline: string;
  description: string;
  overview: string;
  durationMonths: number;
  skills: string[];
  requiredSkills: string[];
  learningPaths: string[];
  projects: string[];
  certifications: string[];
  recommendedTools: string[];
  relatedGames: string[];
  relatedExams: string[];
  featured?: boolean;
};

export type Certification = {
  slug: string;
  title: string;
  difficulty: Difficulty;
  duration: string;
  questions: number;
  xp: number;
  passingScore: number;
  description: string;
  associatedSkills: string[];
  associatedCareerPath?: string;
  featured?: boolean;
};

// ─── Skills ──────────────────────────────────────────────────────────────────

export const skills: Skill[] = [
  {
    slug: 'ai-engineer',
    title: 'AI Engineer',
    tagline: 'Build production AI systems end-to-end',
    difficulty: 'Intermediate',
    xp: 2400,
    duration: '12 weeks',
    description: 'Master the full stack of AI engineering — from model selection and prompt architecture to deployment pipelines and observability.',
    learningPaths: 4,
    projects: 6,
    certifications: 2,
    category: 'Engineering',
    featured: true,
    trending: true,
    relatedTrackSlugs: ['llm-foundations', 'ai-engineering'],
    relatedGameSlugs: ['claude-certified-architect'],
    relatedExamSlugs: ['ai-engineer'],
  },
  {
    slug: 'llm-engineer',
    title: 'LLM Engineer',
    tagline: 'Fine-tune and deploy large language models',
    difficulty: 'Advanced',
    xp: 3200,
    duration: '16 weeks',
    description: 'Deep expertise in large language model internals — training, fine-tuning, RLHF, quantization, and scalable inference serving.',
    learningPaths: 5,
    projects: 8,
    certifications: 2,
    category: 'Engineering',
    featured: true,
    trending: true,
    relatedTrackSlugs: ['llm-foundations'],
    relatedExamSlugs: ['ml-engineer'],
  },
  {
    slug: 'agent-engineer',
    title: 'Agent Engineer',
    tagline: 'Design and ship autonomous AI agents',
    difficulty: 'Advanced',
    xp: 3600,
    duration: '14 weeks',
    description: 'Build reliable, observable AI agents using tool use, memory systems, multi-agent orchestration, and safety guardrails.',
    learningPaths: 4,
    projects: 7,
    certifications: 2,
    category: 'Engineering',
    featured: true,
    trending: true,
    relatedTrackSlugs: ['llm-foundations'],
    relatedGameSlugs: ['claude-certified-architect'],
    relatedExamSlugs: ['ai-engineer'],
  },
  {
    slug: 'rag-engineer',
    title: 'RAG Engineer',
    tagline: 'Ground language models in real-world knowledge',
    difficulty: 'Intermediate',
    xp: 2000,
    duration: '10 weeks',
    description: 'Design retrieval-augmented generation pipelines — from chunking and embedding strategies to hybrid search and re-ranking.',
    learningPaths: 3,
    projects: 5,
    certifications: 1,
    category: 'Engineering',
    featured: true,
    trending: true,
    relatedTrackSlugs: ['llm-foundations'],
  },
  {
    slug: 'ai-architect',
    title: 'AI Architect',
    tagline: 'Design enterprise-grade AI infrastructure',
    difficulty: 'Expert',
    xp: 4800,
    duration: '20 weeks',
    description: 'Architect scalable AI platforms — model serving, MLOps pipelines, multi-model systems, cost governance, and enterprise integration.',
    learningPaths: 6,
    projects: 10,
    certifications: 3,
    category: 'Architecture',
    featured: true,
    relatedGameSlugs: ['claude-certified-architect'],
    relatedExamSlugs: ['ai-engineer'],
  },
  {
    slug: 'mlops-engineer',
    title: 'MLOps Engineer',
    tagline: 'Automate ML lifecycle at production scale',
    difficulty: 'Advanced',
    xp: 3000,
    duration: '14 weeks',
    description: 'Own the full ML lifecycle — experiment tracking, model registry, CI/CD for models, monitoring, drift detection, and rollback strategies.',
    learningPaths: 4,
    projects: 6,
    certifications: 2,
    category: 'Operations',
    featured: true,
    relatedExamSlugs: ['ml-engineer'],
  },
  {
    slug: 'ai-product-manager',
    title: 'AI Product Manager',
    tagline: 'Ship AI products users actually want',
    difficulty: 'Intermediate',
    xp: 1800,
    duration: '8 weeks',
    description: 'Define and deliver AI-native products — opportunity discovery, capability mapping, user research for AI features, and outcome measurement.',
    learningPaths: 3,
    projects: 4,
    certifications: 1,
    category: 'Product',
    featured: true,
    relatedExamSlugs: ['ai-product-manager'],
  },
  {
    slug: 'prompt-engineer',
    title: 'Prompt Engineer',
    tagline: 'Craft prompts that reliably produce results',
    difficulty: 'Beginner',
    xp: 1200,
    duration: '6 weeks',
    description: 'Master systematic prompt design — chain-of-thought, few-shot patterns, structured output, evaluation frameworks, and iterative refinement.',
    learningPaths: 2,
    projects: 3,
    certifications: 1,
    category: 'Engineering',
    featured: true,
    trending: true,
  },
  {
    slug: 'ai-security-engineer',
    title: 'AI Security Engineer',
    tagline: 'Secure AI systems against adversarial threats',
    difficulty: 'Advanced',
    xp: 3400,
    duration: '16 weeks',
    description: 'Harden AI systems against prompt injection, jailbreaks, model extraction, data poisoning, and supply chain attacks.',
    learningPaths: 4,
    projects: 5,
    certifications: 1,
    category: 'Security',
    featured: true,
  },
];

// ─── Career Paths ─────────────────────────────────────────────────────────────

export const careerPaths: CareerPath[] = [
  {
    slug: 'ai-engineer',
    title: 'AI Engineer',
    role: 'Engineering',
    salaryRange: '$130k – $220k',
    tagline: 'The generalist who ships AI from prototype to production',
    description: 'AI Engineers bridge research and product — selecting models, building integrations, and shipping reliable AI features at scale.',
    overview: 'The AI Engineer role has emerged as one of the most in-demand positions in tech. Unlike ML researchers who push the frontier, AI Engineers apply existing models to real products. You will learn to evaluate and select foundation models, design prompt architectures, integrate APIs, build evaluation pipelines, and deploy systems that stay reliable in production.',
    durationMonths: 3,
    skills: ['ai-engineer', 'prompt-engineer', 'rag-engineer'],
    requiredSkills: ['Python fundamentals', 'REST APIs', 'Basic cloud (AWS/GCP/Azure)', 'Git'],
    learningPaths: ['llm-foundations', 'ai-engineering'],
    projects: ['Build a multi-tool AI assistant', 'RAG knowledge base with evaluation', 'Production prompt versioning system'],
    certifications: ['claude-certified-architect', 'agent-engineering'],
    recommendedTools: ['claude', 'langchain', 'pinecone', 'weights-and-biases'],
    relatedGames: ['claude-certified-architect'],
    relatedExams: ['ai-engineer'],
    featured: true,
  },
  {
    slug: 'llm-engineer',
    title: 'LLM Engineer',
    role: 'Engineering',
    salaryRange: '$150k – $250k',
    tagline: 'Specialist in training, fine-tuning, and serving language models',
    description: 'LLM Engineers go deeper than API integration — they understand model internals, run fine-tuning experiments, and optimize inference at scale.',
    overview: 'LLM Engineers work at the intersection of deep learning research and systems engineering. This path will take you through transformer architecture fundamentals, supervised fine-tuning, RLHF, quantization techniques (GPTQ, AWQ, GGUF), efficient inference serving, and production monitoring for model quality drift.',
    durationMonths: 4,
    skills: ['llm-engineer', 'ai-engineer'],
    requiredSkills: ['Python (advanced)', 'PyTorch basics', 'Linux/command line', 'Mathematics (linear algebra, probability)'],
    learningPaths: ['llm-foundations'],
    projects: ['Fine-tune a domain-specific model', 'Build an inference server with batching', 'Implement RLHF reward model'],
    certifications: ['agent-engineering', 'rag-specialist'],
    recommendedTools: ['huggingface', 'vllm', 'axolotl', 'weights-and-biases'],
    relatedGames: ['claude-certified-architect'],
    relatedExams: ['ml-engineer'],
    featured: true,
  },
  {
    slug: 'agent-engineer',
    title: 'Agent Engineer',
    role: 'Engineering',
    salaryRange: '$140k – $230k',
    tagline: 'Build AI agents that autonomously complete complex tasks',
    description: 'Agent Engineers design the architecture for autonomous AI systems — from single-agent loops to multi-agent orchestration with memory, tools, and safety constraints.',
    overview: 'AI agents represent the next frontier of software engineering. This career path teaches you to build reliable agents using the Model Context Protocol (MCP), design effective tool-use systems, implement memory architectures (short-term, long-term, episodic), orchestrate multi-agent workflows, and build safety guardrails that prevent runaway behavior in production.',
    durationMonths: 3,
    skills: ['agent-engineer', 'ai-engineer', 'prompt-engineer'],
    requiredSkills: ['Python (intermediate)', 'Async programming', 'REST APIs', 'Basic AI/LLM knowledge'],
    learningPaths: ['llm-foundations'],
    projects: ['Multi-step research agent', 'Code generation agent with tests', 'Multi-agent debate system'],
    certifications: ['agent-engineering', 'mcp-specialist'],
    recommendedTools: ['claude', 'langchain', 'langgraph', 'temporal'],
    relatedGames: ['claude-certified-architect'],
    relatedExams: ['ai-engineer'],
    featured: true,
  },
  {
    slug: 'ai-architect',
    title: 'AI Architect',
    role: 'Architecture',
    salaryRange: '$160k – $280k',
    tagline: 'Design enterprise AI infrastructure that scales and governs',
    description: 'AI Architects define the technical strategy for AI adoption — platform design, model governance, cost control, and cross-team enablement.',
    overview: 'Senior engineers who want to move into architecture roles will learn to design multi-model platforms, define AI governance frameworks, architect for cost efficiency, build internal developer tooling for AI, lead model evaluation programs, and communicate AI tradeoffs to business stakeholders. This is the most senior individual-contributor path in the AI space.',
    durationMonths: 5,
    skills: ['ai-architect', 'ai-engineer', 'ai-security-engineer', 'mlops-engineer'],
    requiredSkills: ['3+ years engineering experience', 'Cloud infrastructure', 'System design', 'LLM API experience'],
    learningPaths: ['llm-foundations', 'ai-engineering'],
    projects: ['Enterprise AI platform design doc', 'Model router with cost optimization', 'AI governance policy framework'],
    certifications: ['claude-certified-architect', 'agent-engineering', 'ai-security'],
    recommendedTools: ['claude', 'terraform', 'kubernetes', 'datadog'],
    relatedGames: ['claude-certified-architect'],
    relatedExams: ['ai-engineer'],
    featured: true,
  },
  {
    slug: 'mlops-engineer',
    title: 'MLOps Engineer',
    role: 'Operations',
    salaryRange: '$125k – $200k',
    tagline: 'Automate the ML lifecycle from experiment to production',
    description: 'MLOps Engineers own the infrastructure and tooling that makes ML reliable — CI/CD for models, feature stores, monitoring, and rollback systems.',
    overview: 'MLOps is the discipline that operationalizes machine learning. This path covers experiment tracking with MLflow and W&B, model registry patterns, automated retraining triggers, A/B testing for models, data drift detection, shadow deployments, and building the internal platform teams that enables data scientists to ship with confidence.',
    durationMonths: 3,
    skills: ['mlops-engineer', 'ai-engineer'],
    requiredSkills: ['Python (intermediate)', 'Docker/Kubernetes basics', 'CI/CD (GitHub Actions)', 'SQL'],
    learningPaths: ['llm-foundations'],
    projects: ['ML training pipeline with DVC', 'Model monitoring dashboard', 'Automated retraining trigger system'],
    certifications: ['agent-engineering', 'rag-specialist'],
    recommendedTools: ['mlflow', 'weights-and-biases', 'airflow', 'seldon'],
    relatedGames: [],
    relatedExams: ['ml-engineer'],
    featured: false,
  },
];

// ─── Certifications ──────────────────────────────────────────────────────────

export const certifications: Certification[] = [
  {
    slug: 'claude-certified-architect',
    title: 'Claude Certified Architect',
    difficulty: 'Expert',
    duration: '3–4 hours',
    questions: 85,
    xp: 5000,
    passingScore: 80,
    description: 'The flagship AIByDM certification. Demonstrate mastery of Claude API, MCP, multi-agent design, and production deployment patterns.',
    associatedSkills: ['ai-architect', 'agent-engineer', 'ai-engineer'],
    associatedCareerPath: 'ai-architect',
    featured: true,
  },
  {
    slug: 'agent-engineering',
    title: 'Agent Engineering Certification',
    difficulty: 'Advanced',
    duration: '2–3 hours',
    questions: 60,
    xp: 3500,
    passingScore: 75,
    description: 'Validate your ability to design, build, and evaluate autonomous AI agent systems using modern frameworks and best practices.',
    associatedSkills: ['agent-engineer', 'ai-engineer'],
    associatedCareerPath: 'agent-engineer',
    featured: true,
  },
  {
    slug: 'rag-specialist',
    title: 'RAG Specialist',
    difficulty: 'Intermediate',
    duration: '1.5–2 hours',
    questions: 45,
    xp: 2500,
    passingScore: 75,
    description: 'Prove expertise in retrieval-augmented generation — from vector stores and embedding models to hybrid search and re-ranking.',
    associatedSkills: ['rag-engineer', 'ai-engineer'],
    featured: true,
  },
  {
    slug: 'prompt-engineering',
    title: 'Prompt Engineering Certification',
    difficulty: 'Beginner',
    duration: '1 hour',
    questions: 30,
    xp: 1500,
    passingScore: 70,
    description: 'Demonstrate systematic prompt design skills — chain-of-thought, structured outputs, few-shot patterns, and evaluation methods.',
    associatedSkills: ['prompt-engineer'],
    featured: false,
  },
  {
    slug: 'mcp-specialist',
    title: 'MCP Specialist',
    difficulty: 'Intermediate',
    duration: '1.5 hours',
    questions: 40,
    xp: 2000,
    passingScore: 75,
    description: 'Certify your knowledge of the Model Context Protocol — server authoring, tool definitions, resource management, and security.',
    associatedSkills: ['agent-engineer', 'ai-engineer'],
    featured: false,
  },
  {
    slug: 'ai-security',
    title: 'AI Security Certification',
    difficulty: 'Advanced',
    duration: '2 hours',
    questions: 50,
    xp: 3000,
    passingScore: 80,
    description: 'Validate expertise in AI threat modeling, red-teaming, prompt injection defenses, and secure model deployment practices.',
    associatedSkills: ['ai-security-engineer'],
    associatedCareerPath: 'ai-architect',
    featured: false,
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getSkill(slug: string): Skill | undefined {
  return skills.find((s) => s.slug === slug);
}

export function getCareerPath(slug: string): CareerPath | undefined {
  return careerPaths.find((p) => p.slug === slug);
}

export function getCertification(slug: string): Certification | undefined {
  return certifications.find((c) => c.slug === slug);
}

export function getSkillHref(slug: string): string {
  return `/skills/${slug}`;
}

export function getCertificationHref(slug: string): string {
  return `/skills/certifications#${slug}`;
}

export const difficultyColors: Record<Difficulty, string> = {
  Beginner: '#16a34a',
  Intermediate: '#d97706',
  Advanced: '#dc2626',
  Expert: '#7c3aed',
};

export const trendingSkills = skills.filter((s) => s.trending);
export const featuredSkills = skills.filter((s) => s.featured);
export const featuredCareerPaths = careerPaths.filter((p) => p.featured);
export const featuredCertifications = certifications.filter((c) => c.featured);
