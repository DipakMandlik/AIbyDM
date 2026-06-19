// AIByDM platform content. The data is intentionally typed and explicit so the
// static export can generate every primary and detail route without runtime IO.

import {
  AIFS_PATH_SLUG,
  aifsLearningPathIndex,
  getAifsLessonHref,
  getLearningPathHref,
  getPhaseHref,
} from "@/lib/learning-index";
import { issues, newsletterTopics } from "@/lib/newsletter-data";

export type Level = 'Beginner' | 'Intermediate' | 'Advanced';
export type Pricing = 'Free' | 'Freemium' | 'Paid' | 'Open Source';
export type SearchKind =
  | 'track'
  | 'phase'
  | 'module'
  | 'lesson'
  | 'topic'
  | 'project'
  | 'tool'
  | 'game'
  | 'exam'
  | 'newsletter'
  | 'community';

export type LessonResource = {
  label: string;
  href: string;
  kind: 'Guide' | 'Docs' | 'Tool' | 'Paper' | 'Template';
};

export type Lesson = {
  slug: string;
  title: string;
  summary: string;
  duration: string;
  objectives: string[];
  concepts: string[];
  body: string[];
  practice: string[];
  resources: LessonResource[];
  nextAction: string;
};

export type Module = {
  slug: string;
  title: string;
  summary: string;
  lessons: Lesson[];
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  duration: string;
  difficulty: Level;
  scope: string;
  milestones: string[];
  deliverables: string[];
  relatedLessonSlugs: string[];
};

export type Track = {
  slug: string;
  number: string;
  title: string;
  level: Level;
  duration: string;
  description: string;
  tagline: string;
  modules: Module[];
  projects: Project[];
  outcomes: string[];
  progress: number;
};

export type ToolCategory = {
  slug: string;
  name: string;
  count: number;
  description: string;
};

export type Tool = {
  slug: string;
  name: string;
  category: string;
  pricing: Pricing;
  description: string;
  useCases: string[];
  alternatives: string[];
  links: { label: string; href: string }[];
  featured?: boolean;
};

export type Game = {
  slug: string;
  title: string;
  type: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: string;
  description: string;
  plays: string;
  rules: string[];
  relatedLessons: string[];
  featured?: boolean;
  questionCount?: number;
  xpReward?: number;
  completionRate?: string;
  ctaLabel?: string;
};

export type Exam = {
  slug: string;
  title: string;
  role: string;
  questions: number;
  duration: string;
  description: string;
  stages: string[];
  sampleQuestions: string[];
  sampleExamQuestions: ExamQuestion[];
};

export type ExamQuestion = {
  id: string;
  prompt: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  stage: string;
  topic?: string;
};

export type Issue = {
  slug: string;
  number: number;
  title: string;
  date: string;
  topic: string;
  category: NewsletterCategory;
  excerpt: string;
  sourceTitle: string;
  sourceUrl: string;
  sourceDomain: string;
  publishedAt: string;
  summary: string;
  sections: string[];
  citations?: { label: string; href: string }[];
  featured?: boolean;
};

export type NewsletterCategory =
  | 'Models'
  | 'Agents'
  | 'Tools'
  | 'Research'
  | 'Product'
  | 'Safety'
  | 'Engineering'
  | 'Open Source'
  | 'Business'
  | 'Learning';

export type SearchItem = {
  kind: SearchKind;
  title: string;
  href: string;
  excerpt: string;
  meta: string;
  keywords: string[];
};

export function getTrackHref(trackSlug: string) {
  return `/learn/${trackSlug}`;
}

export function getLessonHref(trackSlug: string, lessonSlug: string) {
  return `/learn/${trackSlug}/${lessonSlug}`;
}

export function getProjectHref(trackSlug: string, projectSlug: string) {
  return `/learn/${trackSlug}/projects/${projectSlug}`;
}

export function getToolHref(toolSlug: string) {
  return `/tools/${toolSlug}`;
}

export function getGameHref(gameSlug: string) {
  return `/games/${gameSlug}`;
}

export function getExamHref(examSlug: string) {
  return `/exams/${examSlug}`;
}

export function getExamTakeHref(examSlug: string) {
  return `/exams/${examSlug}/take`;
}

export function getIssueHref(issueSlug: string) {
  return `/newsletter/${issueSlug}`;
}

const aiFoundationLessons: Lesson[] = [
  {
    slug: 'tokens-and-context',
    title: 'Tokens and Context Windows',
    summary:
      'Understand how models read text, why context windows matter, and what gets lost when prompts grow too large.',
    duration: '25 min',
    objectives: [
      'Explain tokens in plain language.',
      'Estimate how context windows shape model behavior.',
      'Write prompts that keep important context close to the task.',
    ],
    concepts: ['tokens', 'context windows', 'prompt budgeting'],
    body: [
      'A language model does not read words the way humans do. It reads chunks called tokens, then predicts useful continuations from the visible context.',
      'Context windows are the working memory of a model call. Once the useful facts, examples, and instructions no longer fit, quality drops before the model ever becomes less capable.',
      'Good AI builders design context deliberately. They keep goals, constraints, examples, and source facts compact enough that the model can use them at the same time.',
    ],
    practice: [
      'Rewrite a long task brief into a compact prompt under 1,000 words.',
      'Mark which facts are required, optional, or distracting.',
      'Compare two prompts and identify which one wastes context.',
    ],
    resources: [
      { label: 'Tokenizer playground', href: 'https://tiktokenizer.vercel.app/', kind: 'Tool' },
      { label: 'Prompt budget worksheet', href: '/tools/promptly', kind: 'Template' },
    ],
    nextAction: 'Create a one-page context budget for a model-powered feature.',
  },
  {
    slug: 'embeddings-explained',
    title: 'Embeddings Explained',
    summary:
      'Learn how AI systems turn meaning into vectors and why embeddings power search, recommendations, clustering, and RAG.',
    duration: '30 min',
    objectives: [
      'Describe embeddings without math jargon.',
      'Choose when vector similarity is useful.',
      'Recognize common embedding failure modes.',
    ],
    concepts: ['vectors', 'semantic similarity', 'retrieval'],
    body: [
      'Embeddings place content into a mathematical space where related ideas land near each other. That makes meaning searchable by distance instead of exact words.',
      'This is why a query for "refund policy" can find a paragraph that says "money-back guarantee". The system is matching intent, not just text.',
      'Embeddings are powerful but imperfect. They need chunking, metadata, and evaluation to avoid returning plausible but irrelevant matches.',
    ],
    practice: [
      'Group ten product-support questions by likely embedding similarity.',
      'Write metadata fields that would help retrieval for those questions.',
      'List two cases where exact keyword search should still be used.',
    ],
    resources: [
      { label: 'Qdrant concepts', href: 'https://qdrant.tech/documentation/concepts/', kind: 'Docs' },
      { label: 'Vector database guide', href: '/tools/qdrant', kind: 'Guide' },
    ],
    nextAction: 'Sketch a retrieval flow for a small knowledge base.',
  },
  {
    slug: 'attention-mechanism',
    title: 'The Attention Mechanism',
    summary:
      'Build the mental model behind attention and why it lets models connect relevant words, instructions, and examples.',
    duration: '35 min',
    objectives: [
      'Explain attention as weighted relevance.',
      'Identify why examples influence nearby outputs.',
      'Use formatting to make important context easier to attend to.',
    ],
    concepts: ['attention', 'transformers', 'instruction hierarchy'],
    body: [
      'Attention lets a model decide which parts of the context matter for each next token. It is one reason transformer models handle long, mixed inputs better than older approaches.',
      'The practical takeaway is simple: structure matters. Headings, examples, delimiters, and explicit constraints help the model locate what matters.',
      'Attention is not magic memory. It can still over-focus on distracting text or recent instructions when the prompt is messy.',
    ],
    practice: [
      'Turn an unstructured prompt into sections with clear headings.',
      'Move the key task instruction to the end and compare expected behavior.',
      'Write one anti-example that should be ignored by the model.',
    ],
    resources: [
      { label: 'Illustrated transformer', href: 'https://jalammar.github.io/illustrated-transformer/', kind: 'Guide' },
    ],
    nextAction: 'Refactor a prompt using headings, examples, and a final instruction block.',
  },
  {
    slug: 'evaluating-model-outputs',
    title: 'Evaluating Model Outputs',
    summary:
      'Move past vibes by defining useful checks for accuracy, helpfulness, safety, latency, and cost.',
    duration: '40 min',
    objectives: [
      'Define evaluation criteria before testing outputs.',
      'Separate subjective quality from measurable behavior.',
      'Create a lightweight eval table for repeated prompts.',
    ],
    concepts: ['evaluation', 'rubrics', 'regression tests'],
    body: [
      'AI quality improves when teams evaluate behavior consistently. A single impressive answer does not prove a feature is ready.',
      'Good evaluation starts with a task, expected behavior, unacceptable failures, and a repeatable score. It should include edge cases, not only happy paths.',
      'Even a small spreadsheet of examples can catch regressions when prompts, models, or retrieval sources change.',
    ],
    practice: [
      'Write five test cases for a support-answering assistant.',
      'Score each case on factuality, completeness, tone, and citation quality.',
      'Choose one failure that should block release.',
    ],
    resources: [
      { label: 'Evaluation checklist', href: '/exams/ai-engineer', kind: 'Template' },
    ],
    nextAction: 'Build a five-row eval sheet for a model comparison.',
  },
];

const promptLessons: Lesson[] = [
  {
    slug: 'role-task-context',
    title: 'Role, Task, and Context Framing',
    summary:
      'Frame prompts so the model knows the job, the audience, the input, and the expected shape of the answer.',
    duration: '25 min',
    objectives: ['Write role and task statements.', 'Separate context from instructions.', 'Specify outputs clearly.'],
    concepts: ['role prompts', 'task framing', 'output contracts'],
    body: [
      'Reliable prompts start by removing ambiguity. The model needs to know what it is doing, who it is helping, and what counts as done.',
      'Context should support the task without burying the instruction. A clean prompt makes it easy to tell facts from commands.',
    ],
    practice: ['Rewrite a vague prompt into role, task, context, and output sections.', 'Define a one-sentence success criterion.'],
    resources: [{ label: 'Promptly', href: '/tools/promptly', kind: 'Tool' }],
    nextAction: 'Create a reusable prompt template for a repeated workflow.',
  },
  {
    slug: 'examples-and-constraints',
    title: 'Examples and Constraints',
    summary:
      'Use few-shot examples and constraints to make outputs repeatable without overfitting the prompt to one case.',
    duration: '30 min',
    objectives: ['Choose effective examples.', 'Write constraints that prevent failure.', 'Avoid contradictory examples.'],
    concepts: ['few-shot prompting', 'constraints', 'style transfer'],
    body: [
      'Examples teach by demonstration. Constraints define the boundaries. Together, they help the model produce consistent outputs.',
      'The best examples are short, representative, and labelled. They show the pattern without flooding the context.',
    ],
    practice: ['Add two examples to a classification prompt.', 'Write three constraints for tone, length, and forbidden claims.'],
    resources: [{ label: 'Prompt pattern library', href: '/tools/promptly', kind: 'Template' }],
    nextAction: 'Build a few-shot prompt for a content-review task.',
  },
  {
    slug: 'prompt-chaining',
    title: 'Prompt Chaining',
    summary:
      'Break large tasks into smaller calls so each step can be inspected, reused, and tested.',
    duration: '35 min',
    objectives: ['Split a task into stages.', 'Pass structured outputs between stages.', 'Find where a chain can fail.'],
    concepts: ['chains', 'intermediate outputs', 'inspection points'],
    body: [
      'Prompt chains turn one risky giant prompt into a sequence of smaller decisions. Each step has a clear input, output, and quality check.',
      'Chains are easier to debug because you can see where the system misunderstood, hallucinated, or lost important context.',
    ],
    practice: ['Map a research-to-summary workflow into three model calls.', 'Define the output schema for each step.'],
    resources: [{ label: 'LangChain expression language', href: '/tools/langchain', kind: 'Docs' }],
    nextAction: 'Design a three-step chain for summarizing meeting notes.',
  },
  {
    slug: 'injection-defense',
    title: 'Prompt Injection Defense',
    summary:
      'Learn practical guardrails for untrusted input, tool calls, and instructions hidden inside retrieved content.',
    duration: '40 min',
    objectives: ['Identify injection risk.', 'Separate trusted and untrusted text.', 'Write refusal and escalation rules.'],
    concepts: ['prompt injection', 'trusted context', 'guardrails'],
    body: [
      'Prompt injection happens when untrusted text tries to override the intended task. It is common in RAG, browsing, email, and tool-using agents.',
      'Defenses are layered: isolate untrusted content, constrain tools, validate outputs, and make dangerous actions require confirmation.',
    ],
    practice: ['Mark trusted and untrusted regions in a RAG prompt.', 'Write rules for ignoring instructions found inside source documents.'],
    resources: [{ label: 'AI security prep', href: '/exams/ai-engineer', kind: 'Guide' }],
    nextAction: 'Add a threat checklist to a prompt-powered feature.',
  },
];

const llmLessons: Lesson[] = [
  {
    slug: 'rag-blueprint',
    title: 'RAG Blueprint',
    summary:
      'Design a retrieval-augmented generation system with ingestion, chunking, retrieval, synthesis, and evaluation.',
    duration: '45 min',
    objectives: ['Describe the RAG pipeline.', 'Choose chunking and metadata fields.', 'Define citation quality checks.'],
    concepts: ['RAG', 'chunking', 'citations'],
    body: [
      'RAG systems connect models to external knowledge. The model answers with help from retrieved source material instead of relying only on pretraining.',
      'The best RAG systems are product systems, not just vector searches. They include ingestion quality, metadata, ranking, synthesis, and evaluation.',
    ],
    practice: ['Draw an end-to-end RAG flow.', 'Pick metadata for a documentation corpus.', 'Write a citation quality rubric.'],
    resources: [{ label: 'Qdrant', href: '/tools/qdrant', kind: 'Tool' }],
    nextAction: 'Create a RAG architecture sketch for one knowledge base.',
  },
  {
    slug: 'function-calling',
    title: 'Function Calling',
    summary:
      'Teach models to request structured tool calls instead of pretending to complete actions in natural language.',
    duration: '35 min',
    objectives: ['Design a tool schema.', 'Explain tool-call validation.', 'Handle tool errors safely.'],
    concepts: ['tools', 'schemas', 'validation'],
    body: [
      'Function calling lets a model choose a structured action. The application executes the action, validates inputs, and returns results.',
      'The model should never be the source of authority for side effects. Your system owns permissions, validation, and audit logs.',
    ],
    practice: ['Write a schema for a calendar-booking tool.', 'List validation checks before execution.'],
    resources: [{ label: 'AgentKit', href: '/tools/agentkit', kind: 'Tool' }],
    nextAction: 'Define one safe tool schema for an assistant.',
  },
  {
    slug: 'streaming-ux',
    title: 'Streaming UX',
    summary:
      'Design interfaces that feel fast while making partial, uncertain, or long-running AI output understandable.',
    duration: '30 min',
    objectives: ['Explain why streaming improves perceived speed.', 'Design useful intermediate states.', 'Avoid misleading partial output.'],
    concepts: ['streaming', 'latency', 'progressive disclosure'],
    body: [
      'Streaming changes the waiting experience. Users see movement quickly, but they also need confidence that the system is still working correctly.',
      'Good streaming UX pairs partial text with stable controls, recovery paths, and clear completion states.',
    ],
    practice: ['Sketch a loading state for a long AI answer.', 'Define when users can interrupt, retry, or copy.'],
    resources: [{ label: 'AI product design prep', href: '/learn/ai-product-design', kind: 'Guide' }],
    nextAction: 'Prototype the states for a streaming answer card.',
  },
  {
    slug: 'cost-and-observability',
    title: 'Cost and Observability',
    summary:
      'Track the signals that make AI features operational: cost, latency, quality, errors, and user feedback.',
    duration: '40 min',
    objectives: ['Choose core AI metrics.', 'Connect metrics to product risk.', 'Create a launch monitoring checklist.'],
    concepts: ['observability', 'cost control', 'feedback loops'],
    body: [
      'AI systems need product telemetry and model telemetry. A feature can be technically online and still fail users through slow, expensive, or low-quality outputs.',
      'Teams should monitor cost per task, latency, fallback rates, evaluation scores, and user feedback from day one.',
    ],
    practice: ['Create a dashboard outline for an AI feature.', 'Define alerts for cost, latency, and failed tool calls.'],
    resources: [{ label: 'AI engineer prep', href: '/exams/ai-engineer', kind: 'Guide' }],
    nextAction: 'Write a launch-readiness checklist for a small LLM app.',
  },
];

const productLessons: Lesson[] = [
  {
    slug: 'designing-for-uncertainty',
    title: 'Designing for Uncertainty',
    summary:
      'Create interfaces that acknowledge AI uncertainty without making users do all the verification work.',
    duration: '30 min',
    objectives: ['Name uncertainty states.', 'Design confidence cues.', 'Add correction paths.'],
    concepts: ['uncertainty', 'confidence cues', 'human review'],
    body: [
      'AI products need to communicate confidence, limits, and evidence. The goal is not to apologize for AI, but to make uncertainty usable.',
      'Great interfaces show sources, let users correct output, and make risky actions reviewable.',
    ],
    practice: ['Mark uncertainty points in an AI workflow.', 'Design one correction path for a bad answer.'],
    resources: [{ label: 'Trust audit project', href: '/learn/ai-product-design/projects/trust-audit', kind: 'Template' }],
    nextAction: 'Add confidence and correction states to an AI feature sketch.',
  },
  {
    slug: 'human-in-the-loop',
    title: 'Human in the Loop',
    summary:
      'Decide when AI should act autonomously, when it should suggest, and when a person must approve.',
    duration: '35 min',
    objectives: ['Classify automation risk.', 'Place approval checkpoints.', 'Design escalation paths.'],
    concepts: ['approval', 'automation risk', 'escalation'],
    body: [
      'Human-in-the-loop design is not a generic safety sticker. It is a product decision about risk, reversibility, and user control.',
      'The higher the stakes and the harder the action is to undo, the more explicit review should be.',
    ],
    practice: ['Classify five AI actions by risk.', 'Choose which actions need review before execution.'],
    resources: [{ label: 'AI PM prep', href: '/exams/ai-pm', kind: 'Guide' }],
    nextAction: 'Add an approval model to an agent workflow.',
  },
  {
    slug: 'feedback-loops',
    title: 'Feedback Loops',
    summary:
      'Turn user feedback into a system that improves prompts, retrieval, evaluations, and product decisions.',
    duration: '25 min',
    objectives: ['Collect actionable feedback.', 'Separate rating from diagnosis.', 'Route feedback into evaluation updates.'],
    concepts: ['feedback', 'eval updates', 'product telemetry'],
    body: [
      'A thumbs-down is only a signal. Useful feedback captures what went wrong, the input context, and the expected better behavior.',
      'Feedback should flow back into prompts, retrieval sources, examples, and tests. Otherwise the product learns nothing.',
    ],
    practice: ['Design a feedback widget for generated answers.', 'Define three feedback labels that lead to action.'],
    resources: [{ label: 'AI From Scratch', href: '/learn/ai-from-scratch', kind: 'Guide' }],
    nextAction: 'Create a feedback taxonomy for an AI answer surface.',
  },
  {
    slug: 'ai-feature-launch',
    title: 'AI Feature Launch Checklist',
    summary:
      'Prepare an AI product slice for release with quality gates, fallback behavior, monitoring, and communication.',
    duration: '45 min',
    objectives: ['Define release gates.', 'Plan fallbacks.', 'Create a post-launch monitoring loop.'],
    concepts: ['launch readiness', 'fallbacks', 'monitoring'],
    body: [
      'AI features should not launch because the demo works once. They launch when the team understands expected behavior, failure behavior, and monitoring.',
      'A good launch checklist includes eval thresholds, safety checks, latency targets, rollback plans, user messaging, and feedback review.',
    ],
    practice: ['Write five release gates for an AI feature.', 'Define a fallback for unavailable model or retrieval service.'],
    resources: [{ label: 'Launch review exam', href: '/exams/ai-pm', kind: 'Template' }],
    nextAction: 'Write a one-page launch plan for an AI feature.',
  },
];

export const tracks: Track[] = [
  {
    slug: 'ai-foundations',
    number: '01',
    title: 'AI Foundations',
    level: 'Beginner',
    duration: '6 hours',
    tagline: 'Start here',
    description:
      'Build the mental models behind modern AI. From tokens to transformers, understand how the systems you use every day actually work.',
    modules: [
      { slug: 'how-models-think', title: 'How models think', summary: 'Tokens, context, and attention.', lessons: aiFoundationLessons.slice(0, 3) },
      { slug: 'working-with-models', title: 'Working with models', summary: 'Outputs, evaluation, and tradeoffs.', lessons: aiFoundationLessons.slice(3) },
    ],
    projects: [
      {
        slug: 'model-comparison-sheet',
        title: 'Build a model comparison sheet',
        summary: 'Compare two model outputs against cost, latency, quality, and safety criteria.',
        duration: '90 min',
        difficulty: 'Beginner',
        scope: 'Small scoped sprint',
        milestones: ['Choose a repeatable task.', 'Run the task through two models.', 'Score each result with a simple rubric.', 'Summarize the tradeoffs.'],
        deliverables: ['Model comparison table', 'Quality rubric', 'Recommendation note'],
        relatedLessonSlugs: ['tokens-and-context', 'evaluating-model-outputs'],
      },
      {
        slug: 'first-system-prompt',
        title: 'Write your first system prompt',
        summary: 'Create a compact instruction set for a helpful AI tutor and test it against edge cases.',
        duration: '60 min',
        difficulty: 'Beginner',
        scope: 'Reusable prompt asset',
        milestones: ['Define the assistant role.', 'Write behavior constraints.', 'Test three learner questions.', 'Revise for clarity.'],
        deliverables: ['System prompt', 'Test prompts', 'Revision notes'],
        relatedLessonSlugs: ['attention-mechanism', 'evaluating-model-outputs'],
      },
    ],
    outcomes: ['Explain core AI concepts clearly.', 'Evaluate outputs with a rubric.', 'Choose prompts and models more deliberately.'],
    progress: 60,
  },
  {
    slug: 'prompt-engineering',
    number: '02',
    title: 'Prompt Engineering',
    level: 'Intermediate',
    duration: '8 hours',
    tagline: 'Most popular',
    description:
      'Move from prompting by luck to prompting by design. Structured techniques for reliable, repeatable results across any model.',
    modules: [
      { slug: 'core-techniques', title: 'Core techniques', summary: 'Frame, constrain, and demonstrate.', lessons: promptLessons.slice(0, 2) },
      { slug: 'advanced-patterns', title: 'Advanced patterns', summary: 'Chain prompts and defend them.', lessons: promptLessons.slice(2) },
    ],
    projects: [
      {
        slug: 'prompt-library',
        title: 'Build a reusable prompt library',
        summary: 'Create versioned prompt templates for repeated workflows.',
        duration: '2 hours',
        difficulty: 'Intermediate',
        scope: 'Applied build',
        milestones: ['Pick three workflows.', 'Write reusable templates.', 'Add examples and constraints.', 'Document when to use each prompt.'],
        deliverables: ['Prompt library', 'Usage notes', 'Test cases'],
        relatedLessonSlugs: ['role-task-context', 'examples-and-constraints'],
      },
      {
        slug: 'prompt-powered-tool',
        title: 'Ship a prompt-powered tool',
        summary: 'Turn one prompt chain into a small product workflow.',
        duration: '3 hours',
        difficulty: 'Intermediate',
        scope: 'Product slice',
        milestones: ['Design the chain.', 'Define output schemas.', 'Add injection checks.', 'Write a release note.'],
        deliverables: ['Workflow map', 'Prompt chain', 'Safety checklist'],
        relatedLessonSlugs: ['prompt-chaining', 'injection-defense'],
      },
    ],
    outcomes: ['Write durable prompts.', 'Use examples and constraints well.', 'Defend prompts against common attacks.'],
    progress: 25,
  },
  {
    slug: 'building-with-llms',
    number: '03',
    title: 'Building With LLMs',
    level: 'Intermediate',
    duration: '12 hours',
    tagline: 'Project-based',
    description:
      'Go from notebook to product. Learn the engineering patterns for shipping reliable AI features: RAG, function calling, streaming, and monitoring.',
    modules: [
      { slug: 'retrieval', title: 'Retrieval', summary: 'RAG, chunks, and citations.', lessons: llmLessons.slice(0, 1) },
      { slug: 'tools-and-agents', title: 'Tools and agents', summary: 'Function calls and tool design.', lessons: llmLessons.slice(1, 2) },
      { slug: 'production', title: 'Production', summary: 'Streaming, cost, and observability.', lessons: llmLessons.slice(2) },
    ],
    projects: [
      {
        slug: 'rag-chatbot',
        title: 'Build a RAG chatbot',
        summary: 'Design a source-grounded chatbot with citations and quality checks.',
        duration: '4 hours',
        difficulty: 'Intermediate',
        scope: 'Portfolio-ready prototype',
        milestones: ['Choose a document set.', 'Define chunking and metadata.', 'Sketch retrieval and synthesis.', 'Create an eval plan.'],
        deliverables: ['RAG architecture', 'Citation rubric', 'Eval examples'],
        relatedLessonSlugs: ['rag-blueprint', 'cost-and-observability'],
      },
      {
        slug: 'tool-using-agent',
        title: 'Ship an agent that uses tools',
        summary: 'Design a safe tool-using assistant with validation and fallback behavior.',
        duration: '5 hours',
        difficulty: 'Advanced',
        scope: 'Production-shaped drill',
        milestones: ['Pick one useful action.', 'Define tool schema.', 'Add validation.', 'Plan monitoring and rollback.'],
        deliverables: ['Tool schema', 'Agent flow', 'Risk checklist'],
        relatedLessonSlugs: ['function-calling', 'cost-and-observability'],
      },
    ],
    outcomes: ['Design RAG flows.', 'Use tools safely.', 'Prepare AI features for production signals.'],
    progress: 0,
  },
  {
    slug: 'ai-product-design',
    number: '04',
    title: 'AI Product Design',
    level: 'Advanced',
    duration: '9 hours',
    tagline: 'For builders',
    description:
      'Design AI experiences people trust. Patterns for handling uncertainty, latency, errors, and the new interaction models AI unlocks.',
    modules: [
      { slug: 'designing-for-trust', title: 'Designing for trust', summary: 'Uncertainty, review, and feedback.', lessons: productLessons.slice(0, 3) },
      { slug: 'launching-ai-features', title: 'Launching AI features', summary: 'Release quality and monitoring.', lessons: productLessons.slice(3) },
    ],
    projects: [
      {
        slug: 'trust-audit',
        title: 'Run a trust audit',
        summary: 'Audit an AI workflow for uncertainty, evidence, user control, and recovery paths.',
        duration: '2 hours',
        difficulty: 'Advanced',
        scope: 'Review sprint',
        milestones: ['Map the workflow.', 'Mark uncertainty points.', 'Review controls and fallbacks.', 'Write prioritized fixes.'],
        deliverables: ['Trust audit', 'Risk map', 'Improvement backlog'],
        relatedLessonSlugs: ['designing-for-uncertainty', 'human-in-the-loop'],
      },
      {
        slug: 'launch-plan',
        title: 'Write an AI feature launch plan',
        summary: 'Prepare a model-powered product slice for launch with gates, fallbacks, and monitoring.',
        duration: '3 hours',
        difficulty: 'Advanced',
        scope: 'Launch memo',
        milestones: ['Define release gates.', 'Specify fallbacks.', 'Set monitoring metrics.', 'Draft user messaging.'],
        deliverables: ['Launch checklist', 'Monitoring plan', 'Rollout note'],
        relatedLessonSlugs: ['feedback-loops', 'ai-feature-launch'],
      },
    ],
    outcomes: ['Design trustworthy AI workflows.', 'Add human review where it matters.', 'Launch with quality gates.'],
    progress: 0,
  },
];

export const toolCategories: ToolCategory[] = [
  { slug: 'writing', name: 'Writing and Content', count: 48, description: 'Drafting, editing, citations, and publication workflows.' },
  { slug: 'coding', name: 'Coding and Dev', count: 62, description: 'AI engineering, code generation, testing, and developer workflows.' },
  { slug: 'image', name: 'Image and Design', count: 54, description: 'Image generation, product design, and creative iteration.' },
  { slug: 'research', name: 'Research and Data', count: 39, description: 'Search, analysis, datasets, and source-grounded answers.' },
  { slug: 'agents', name: 'Agents and Automation', count: 44, description: 'Tool-using agents, workflow automation, and orchestration.' },
  { slug: 'productivity', name: 'Productivity', count: 58, description: 'Everyday AI workflows for individuals and teams.' },
];

export const tools: Tool[] = [
  {
    slug: 'qdrant',
    name: 'Qdrant',
    category: 'Research and Data',
    pricing: 'Open Source',
    description: 'Vector database for semantic search, recommendations, and RAG retrieval.',
    useCases: ['Build source-grounded assistants.', 'Store embeddings with metadata.', 'Prototype hybrid search.'],
    alternatives: ['Weaviate', 'Milvus', 'Pinecone'],
    links: [{ label: 'Website', href: 'https://qdrant.tech/' }],
    featured: true,
  },
  {
    slug: 'langchain',
    name: 'LangChain',
    category: 'Agents and Automation',
    pricing: 'Open Source',
    description: 'Framework for composing LLM applications, chains, retrieval, and tool calls.',
    useCases: ['Prototype prompt chains.', 'Connect models to tools.', 'Evaluate agent workflows.'],
    alternatives: ['LlamaIndex', 'Semantic Kernel', 'Haystack'],
    links: [{ label: 'Docs', href: 'https://python.langchain.com/' }],
    featured: true,
  },
  {
    slug: 'ollama',
    name: 'Ollama',
    category: 'Coding and Dev',
    pricing: 'Free',
    description: 'Run local language models for private experiments and offline AI workflows.',
    useCases: ['Experiment locally.', 'Compare small models.', 'Build private demos.'],
    alternatives: ['LM Studio', 'llama.cpp', 'vLLM'],
    links: [{ label: 'Website', href: 'https://ollama.com/' }],
    featured: true,
  },
  {
    slug: 'promptly',
    name: 'Promptly',
    category: 'Productivity',
    pricing: 'Freemium',
    description: 'Version, test, and share prompts across repeatable team workflows.',
    useCases: ['Build prompt libraries.', 'Run prompt reviews.', 'Track prompt changes.'],
    alternatives: ['PromptLayer', 'Humanloop', 'LangSmith'],
    links: [{ label: 'Learn prompt systems', href: '/learn/prompt-engineering' }],
  },
  {
    slug: 'agentkit',
    name: 'AgentKit',
    category: 'Agents and Automation',
    pricing: 'Open Source',
    description: 'Composable patterns for building tool-using agents with validation and monitoring.',
    useCases: ['Design tool schemas.', 'Create agent workflows.', 'Test autonomous actions.'],
    alternatives: ['AutoGen', 'CrewAI', 'LangGraph'],
    links: [{ label: 'Agent lesson', href: '/learn/building-with-llms/function-calling' }],
  },
  {
    slug: 'datalens',
    name: 'DataLens',
    category: 'Research and Data',
    pricing: 'Paid',
    description: 'Ask structured questions of datasets and produce plain-language analysis.',
    useCases: ['Analyze survey data.', 'Generate first-pass reports.', 'Explore metrics.'],
    alternatives: ['Julius', 'ChatGPT Advanced Data Analysis', 'Hex'],
    links: [{ label: 'Research workflow', href: '/learn/ai-from-scratch' }],
  },
];

export const games: Game[] = [
  {
    slug: 'claude-certified-architect',
    title: 'Claude Certified Architect Challenge',
    type: 'Certification Challenge',
    difficulty: 'Hard',
    duration: '20 min',
    description: 'Clear 10 AI architecture floors covering Claude agents, MCP tools, Claude Code workflows, prompt reliability, and context management.',
    plays: 'Flagship',
    rules: ['Choose a mode: challenge, practice, single question, or review.', 'Clear each floor by answering 4 of 6 questions correctly.', 'Earn XP, badges, streaks, and local leaderboard ranks.'],
    relatedLessons: ['agent-engineering', 'model-context-protocol', 'prompt-engineering', 'context-management'],
    featured: true,
    questionCount: 60,
    xpReward: 1000,
    completionRate: 'Local',
    ctaLabel: 'Start Challenge',
  },
  {
    slug: 'prompt-golf',
    title: 'Prompt Golf',
    type: 'Challenge',
    difficulty: 'Medium',
    duration: '5 min',
    description: 'Reach the target output in the fewest tokens possible.',
    plays: '24.1k',
    rules: ['Read the target behavior.', 'Write the shortest prompt that works.', 'Compare token count and reliability.'],
    relatedLessons: ['role-task-context', 'examples-and-constraints'],
  },
  {
    slug: 'hallucination-hunt',
    title: 'Hallucination Hunt',
    type: 'Quiz',
    difficulty: 'Easy',
    duration: '3 min',
    description: 'Spot the fabricated fact in AI-generated answers.',
    plays: '38.6k',
    rules: ['Review each answer.', 'Identify unsupported claims.', 'Choose what evidence would verify the output.'],
    relatedLessons: ['evaluating-model-outputs', 'rag-blueprint'],
  },
  {
    slug: 'embedding-match',
    title: 'Embedding Match',
    type: 'Puzzle',
    difficulty: 'Medium',
    duration: '7 min',
    description: 'Group concepts by semantic similarity before the clock runs out.',
    plays: '9.4k',
    rules: ['Sort cards by meaning.', 'Explain near misses.', 'Review why similar text can still be wrong.'],
    relatedLessons: ['embeddings-explained', 'rag-blueprint'],
  },
  {
    slug: 'agent-arena',
    title: 'Agent Arena',
    type: 'Sandbox',
    difficulty: 'Hard',
    duration: '20 min',
    description: 'Design an agent and watch it tackle live tasks against constraints.',
    plays: '6.2k',
    rules: ['Pick a goal.', 'Choose tools and limits.', 'Score the agent on outcome, safety, and cost.'],
    relatedLessons: ['function-calling', 'cost-and-observability'],
  },
];

export const exams: Exam[] = [
  {
    slug: 'ai-engineer',
    title: 'AI Engineer Prep',
    role: 'AI / LLM Engineer',
    questions: 180,
    duration: 'Self-paced',
    description: 'A progressive interview path around LLMs, RAG, agents, evaluations, and production readiness.',
    stages: ['LLM fundamentals', 'RAG and retrieval', 'Agents and tools', 'Evaluation and safety', 'Live system design'],
    sampleQuestions: ['How would you evaluate a RAG answer?', 'Where should tool-call validation happen?', 'What metrics matter after launch?'],
    sampleExamQuestions: [
      {
        id: 'ai-engineer-q1',
        prompt: 'How would you evaluate whether a RAG answer is production-ready?',
        options: [
          'Check whether the answer is long enough and uses confident language.',
          'Measure groundedness against retrieved sources, answer completeness, citation quality, and failure handling on a held-out set.',
          'Ask the model to grade its own response after every answer.',
          'Track only thumbs-up and thumbs-down feedback after launch.',
        ],
        correctOptionIndex: 1,
        explanation: 'A production RAG eval needs source-grounded checks, completeness, citation quality, and edge cases. User feedback helps later, but it is not a release gate by itself.',
        stage: 'RAG and retrieval',
        topic: 'RAG evaluation',
      },
      {
        id: 'ai-engineer-q2',
        prompt: 'Where should tool-call validation happen in an LLM application?',
        options: [
          'Inside the model prompt, because the model understands the user intent best.',
          'Only in the frontend, before the request reaches the model.',
          'In application code before execution, using schemas, permissions, and business rules.',
          'After the tool executes, by asking the model whether the result looks safe.',
        ],
        correctOptionIndex: 2,
        explanation: 'The application owns validation and side effects. The model may request a tool call, but code must validate arguments, permissions, and policy before execution.',
        stage: 'Agents and tools',
        topic: 'Tool safety',
      },
      {
        id: 'ai-engineer-q3',
        prompt: 'Which metrics matter most after launching an AI feature?',
        options: [
          'Only model accuracy, because product metrics are downstream effects.',
          'Latency, cost per task, fallback rate, quality/eval score, error rate, and user success signals.',
          'The number of generated tokens, because longer answers are usually better.',
          'Daily active users only, because adoption summarizes every technical concern.',
        ],
        correctOptionIndex: 1,
        explanation: 'AI launch monitoring needs both model and product signals: quality, speed, cost, failures, fallbacks, and whether users actually complete the job.',
        stage: 'Evaluation and safety',
        topic: 'Production monitoring',
      },
    ],
  },
  {
    slug: 'ml-engineer',
    title: 'ML Engineer Prep',
    role: 'Machine Learning Engineer',
    questions: 240,
    duration: 'Self-paced',
    description: 'Fundamentals through ML system design, with practical checks for model quality and deployment tradeoffs.',
    stages: ['Math and statistics', 'Classic ML', 'Deep learning', 'ML system design', 'Behavioral'],
    sampleQuestions: ['How do you handle data leakage?', 'When does a simpler model win?', 'What monitoring catches drift?'],
    sampleExamQuestions: [
      {
        id: 'ml-engineer-q1',
        prompt: 'How should you handle suspected data leakage in a training pipeline?',
        options: [
          'Keep the model if offline accuracy is high enough.',
          'Remove features created after the prediction point, rebuild splits by time/entity, and rerun validation.',
          'Reduce model complexity until validation accuracy drops to a realistic number.',
          'Add regularization so the model cannot memorize leaked signals.',
        ],
        correctOptionIndex: 1,
        explanation: 'Leakage is a data and split problem. The fix is to remove future/invalid signals and validate using splits that match production reality.',
        stage: 'Classic ML',
        topic: 'Data leakage',
      },
      {
        id: 'ml-engineer-q2',
        prompt: 'When does a simpler model win over a more complex model?',
        options: [
          'When it is easier to explain, cheaper to serve, robust on validation data, and meets the product quality bar.',
          'Never; complex models always learn more signal.',
          'Only when the dataset has fewer than one thousand rows.',
          'When stakeholders do not care about accuracy.',
        ],
        correctOptionIndex: 0,
        explanation: 'A simpler model often wins when it meets the required quality with better reliability, latency, cost, debuggability, or interpretability.',
        stage: 'ML system design',
        topic: 'Model selection',
      },
      {
        id: 'ml-engineer-q3',
        prompt: 'What monitoring best catches model drift after deployment?',
        options: [
          'CPU utilization only, because drift usually appears as slower inference.',
          'Input distribution shifts, prediction distribution shifts, segment-level quality, calibration, and delayed ground-truth metrics.',
          'Training loss from the original experiment.',
          'The number of model versions deployed per month.',
        ],
        correctOptionIndex: 1,
        explanation: 'Drift shows up in data, predictions, calibration, and real-world outcome quality. Infrastructure metrics are useful but do not prove model behavior is stable.',
        stage: 'ML system design',
        topic: 'Drift monitoring',
      },
    ],
  },
  {
    slug: 'data-scientist',
    title: 'Data Scientist Prep',
    role: 'Data Scientist',
    questions: 210,
    duration: 'Self-paced',
    description: 'Statistics, experimentation, modeling, and narrative thinking for data science loops.',
    stages: ['Probability', 'Experimentation', 'Modeling', 'SQL and analytics', 'Case studies'],
    sampleQuestions: ['How would you design an experiment?', 'What makes an A/B test invalid?', 'How do you explain model uncertainty?'],
    sampleExamQuestions: [
      {
        id: 'data-scientist-q1',
        prompt: 'What is the strongest first step when designing an experiment?',
        options: [
          'Pick the dashboard chart before defining the metric.',
          'Define the hypothesis, primary metric, unit of randomization, guardrails, and decision rule before launch.',
          'Run the test to everyone so the sample size is as large as possible.',
          'Choose the winning variant after the first day of data.',
        ],
        correctOptionIndex: 1,
        explanation: 'Good experiments start with a predeclared hypothesis, metric, randomization unit, guardrails, sample plan, and decision rule.',
        stage: 'Experimentation',
        topic: 'Experiment design',
      },
      {
        id: 'data-scientist-q2',
        prompt: 'What can make an A/B test invalid?',
        options: [
          'Using a control group.',
          'Random assignment at the user level.',
          'Peeking repeatedly without correction, sample-ratio mismatch, interference between groups, or changing the metric mid-test.',
          'Running the test for more than one day.',
        ],
        correctOptionIndex: 2,
        explanation: 'Invalid tests usually fail through design or analysis problems: broken randomization, interference, unplanned peeking, metric changes, or sample-ratio mismatch.',
        stage: 'Experimentation',
        topic: 'A/B testing',
      },
      {
        id: 'data-scientist-q3',
        prompt: 'How should you explain model uncertainty to a non-technical stakeholder?',
        options: [
          'Avoid uncertainty because it reduces confidence in the model.',
          'Use probability ranges, examples of likely errors, confidence intervals where appropriate, and the decision impact of being wrong.',
          'Show the full training notebook so they can inspect every assumption.',
          'Report only the single best estimate and hide edge cases.',
        ],
        correctOptionIndex: 1,
        explanation: 'Useful uncertainty communication ties ranges and error modes to decisions. It makes risk actionable without burying stakeholders in implementation details.',
        stage: 'Modeling',
        topic: 'Uncertainty',
      },
    ],
  },
  {
    slug: 'ai-pm',
    title: 'AI Product Manager Prep',
    role: 'AI Product Manager',
    questions: 120,
    duration: 'Self-paced',
    description: 'Strategy, metrics, user trust, prioritization, and responsible AI launch decisions.',
    stages: ['AI strategy', 'Metrics and evals', 'Prioritization', 'Trust and ethics', 'Execution'],
    sampleQuestions: ['What quality bar would you set before launch?', 'How do you measure AI feature success?', 'When should a human approve an AI action?'],
    sampleExamQuestions: [
      {
        id: 'ai-pm-q1',
        prompt: 'What quality bar should an AI PM set before launch?',
        options: [
          'The demo works on the happy path and the team is excited.',
          'The feature passes representative evals, handles known failure modes, has rollback/fallback paths, and meets latency/cost constraints.',
          'The model vendor publishes a high benchmark score.',
          'The interface includes a disclaimer that the answer may be wrong.',
        ],
        correctOptionIndex: 1,
        explanation: 'A launch quality bar combines representative evals, failure handling, operational constraints, and recovery paths. A disclaimer is not a substitute for product readiness.',
        stage: 'Metrics and evals',
        topic: 'Launch quality',
      },
      {
        id: 'ai-pm-q2',
        prompt: 'How should you measure AI feature success?',
        options: [
          'Only by model accuracy on a public benchmark.',
          'By user task completion, quality/eval scores, trust signals, latency, cost, adoption, and support/escalation impact.',
          'Only by how many users try the feature once.',
          'By the number of AI-generated outputs per user.',
        ],
        correctOptionIndex: 1,
        explanation: 'AI feature success is product success plus model quality. The key is whether users complete the task reliably, quickly, safely, and economically.',
        stage: 'AI strategy',
        topic: 'Success metrics',
      },
      {
        id: 'ai-pm-q3',
        prompt: 'When should a human approve an AI action?',
        options: [
          'When the action is high-stakes, hard to undo, legally sensitive, financially meaningful, or affects user trust.',
          'Only when the model says it is uncertain.',
          'Never, because approval slows down automation.',
          'Only after a customer complains.',
        ],
        correctOptionIndex: 0,
        explanation: 'Human approval belongs where risk, reversibility, compliance, or trust stakes are high. Self-reported model uncertainty is not enough by itself.',
        stage: 'Trust and ethics',
        topic: 'Human approval',
      },
    ],
  },
];

export { issues, newsletterTopics };

export function getTrack(slug: string) {
  return tracks.find((track) => track.slug === slug);
}

export function getLesson(trackSlug: string, lessonSlug: string) {
  const track = getTrack(trackSlug);
  if (!track) return undefined;

  for (const trackModule of track.modules) {
    const lesson = trackModule.lessons.find((entry) => entry.slug === lessonSlug);
    if (lesson) return { track, module: trackModule, lesson };
  }

  return undefined;
}

export function getProject(trackSlug: string, projectSlug: string) {
  const track = getTrack(trackSlug);
  if (!track) return undefined;
  const project = track.projects.find((entry) => entry.slug === projectSlug);
  return project ? { track, project } : undefined;
}

export function getAllLessons() {
  return tracks.flatMap((track) =>
    track.modules.flatMap((trackModule) =>
      trackModule.lessons.map((lesson) => ({ track, module: trackModule, lesson })),
    ),
  );
}

export function getAllProjects() {
  return tracks.flatMap((track) => track.projects.map((project) => ({ track, project })));
}

export function getTool(slug: string) {
  return tools.find((tool) => tool.slug === slug);
}

export function getGame(slug: string) {
  return games.find((game) => game.slug === slug);
}

export function getExam(slug: string) {
  return exams.find((exam) => exam.slug === slug);
}

export function getIssue(slug: string) {
  return issues.find((issue) => issue.slug === slug);
}

export function getTrackLessonCount(track: Track) {
  return track.modules.reduce((total, trackModule) => total + trackModule.lessons.length, 0);
}

export function getSearchItems(): SearchItem[] {
  const secondarySearchTracks = tracks.filter((track) => track.slug !== 'ai-foundations');
  const trackItems = secondarySearchTracks.map((track) => ({
    kind: 'track' as const,
    title: track.title,
    href: getTrackHref(track.slug),
    excerpt: track.description,
    meta: `${track.level} / ${getTrackLessonCount(track)} lessons`,
    keywords: [track.slug, track.title, track.level, ...track.outcomes],
  }));

  const aifsTrackItem = {
    kind: 'track' as const,
    title: aifsLearningPathIndex.title,
    href: getLearningPathHref(aifsLearningPathIndex.slug),
    excerpt: aifsLearningPathIndex.description,
    meta: `${aifsLearningPathIndex.totalPhases} phases / ${aifsLearningPathIndex.totalLessons} lessons`,
    keywords: [
      aifsLearningPathIndex.slug,
      aifsLearningPathIndex.title,
      aifsLearningPathIndex.level,
      'from scratch',
      'curriculum',
      'phases',
    ],
  };

  const aifsPhaseItems = aifsLearningPathIndex.phases.map((phase) => ({
    kind: 'phase' as const,
    title: `Phase ${phase.number}: ${phase.title}`,
    href: getPhaseHref(AIFS_PATH_SLUG, phase.slug),
    excerpt: phase.description,
    meta: `${phase.lessonCount} lessons / ${phase.duration}`,
    keywords: [phase.slug, phase.title, phase.description, ...phase.lessons.map((lesson) => lesson.title)],
  }));

  const aifsLessonItems = aifsLearningPathIndex.phases.flatMap((phase) =>
    phase.lessons.map((lesson) => ({
      kind: 'lesson' as const,
      title: lesson.title,
      href: getAifsLessonHref(phase.slug, lesson.slug),
      excerpt: lesson.summary,
      meta: `Phase ${phase.number}: ${phase.title} / ${lesson.duration}`,
      keywords: [
        aifsLearningPathIndex.title,
        phase.title,
        lesson.title,
        lesson.type,
        ...lesson.languages,
        ...lesson.topics,
      ],
    })),
  );

  const topicMap = new Map<string, { count: number; phaseTitle: string; lessonTitle: string }>();
  for (const phase of aifsLearningPathIndex.phases) {
    for (const lesson of phase.lessons) {
      for (const topic of lesson.topics) {
        const key = topic.trim();
        if (!key || key.length < 3) continue;
        const current = topicMap.get(key);
        topicMap.set(key, {
          count: (current?.count ?? 0) + 1,
          phaseTitle: current?.phaseTitle ?? phase.title,
          lessonTitle: current?.lessonTitle ?? lesson.title,
        });
      }
    }
  }

  const topicItems = [...topicMap.entries()]
    .sort((a, b) => b[1].count - a[1].count || a[0].localeCompare(b[0]))
    .slice(0, 120)
    .map(([topic, detail]) => ({
      kind: 'topic' as const,
      title: topic,
      href: `/search?q=${encodeURIComponent(topic)}`,
      excerpt: `Explore ${detail.count} AI From Scratch lessons related to ${topic}.`,
      meta: `${detail.count} lessons / starts near ${detail.phaseTitle}`,
      keywords: [topic, detail.phaseTitle, detail.lessonTitle, aifsLearningPathIndex.title],
    }));

  const moduleItems = secondarySearchTracks.flatMap((track) =>
    track.modules.map((trackModule) => ({
      kind: 'module' as const,
      title: trackModule.title,
      href: getTrackHref(track.slug) + `#${trackModule.slug}`,
      excerpt: trackModule.summary,
      meta: track.title,
      keywords: [track.title, trackModule.title, trackModule.summary],
    })),
  );

  const lessonItems = secondarySearchTracks.flatMap((track) =>
    track.modules.flatMap((trackModule) =>
      trackModule.lessons.map((lesson) => ({
        kind: 'lesson' as const,
        title: lesson.title,
        href: getLessonHref(track.slug, lesson.slug),
        excerpt: lesson.summary,
        meta: `${track.title} / ${trackModule.title}`,
        keywords: [track.title, trackModule.title, lesson.title, ...lesson.concepts],
      })),
    ),
  );

  const projectItems = secondarySearchTracks.flatMap((track) =>
    track.projects.map((project) => ({
      kind: 'project' as const,
      title: project.title,
      href: getProjectHref(track.slug, project.slug),
      excerpt: project.summary,
      meta: `${track.title} / ${project.difficulty}`,
      keywords: [track.title, project.title, project.scope, ...project.deliverables],
    })),
  );

  const toolItems = tools.map((tool) => ({
    kind: 'tool' as const,
    title: tool.name,
    href: getToolHref(tool.slug),
    excerpt: tool.description,
    meta: `${tool.category} / ${tool.pricing}`,
    keywords: [tool.name, tool.category, tool.pricing, ...tool.useCases, ...tool.alternatives],
  }));

  const gameItems = games.map((game) => ({
    kind: 'game' as const,
    title: game.title,
    href: getGameHref(game.slug),
    excerpt: game.description,
    meta: `${game.type} / ${game.duration}`,
    keywords: [game.title, game.type, game.difficulty, ...game.relatedLessons],
  }));

  const examItems = exams.map((exam) => ({
    kind: 'exam' as const,
    title: exam.title,
    href: getExamHref(exam.slug),
    excerpt: exam.description,
    meta: `${exam.role} / ${exam.questions} questions`,
    keywords: [exam.title, exam.role, ...exam.stages, ...exam.sampleQuestions],
  }));

  const issueItems = issues.map((issue) => ({
    kind: 'newsletter' as const,
    title: issue.title,
    href: getIssueHref(issue.slug),
    excerpt: issue.excerpt,
    meta: `Issue ${issue.number} / ${issue.category}`,
    keywords: [issue.title, issue.topic, issue.category, issue.sourceDomain, issue.sourceTitle, ...issue.sections],
  }));

  return [
    aifsTrackItem,
    ...aifsPhaseItems,
    ...aifsLessonItems,
    ...topicItems,
    ...trackItems,
    ...moduleItems,
    ...lessonItems,
    ...projectItems,
    ...toolItems,
    ...gameItems,
    ...examItems,
    ...issueItems,
    {
      kind: 'community',
      title: 'Community',
      href: '/community',
      excerpt: 'Contribute lessons, product polish, tools, exams, and open-source improvements.',
      meta: 'Open source',
      keywords: ['community', 'contribute', 'github', 'open source'],
    },
  ];
}





