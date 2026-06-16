import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/* ------------------------------------------------------------------ */
/*  Shared enums                                                       */
/* ------------------------------------------------------------------ */

const trackEnum = z.enum([
  // Legacy authored content buckets still present in src/content.
  'foundations',
  'rag',
  'agents',
  'governance',
  'lineage',
  'metadata',
  'llmops',
  'production-ai',
  // Current Learn catalog track slugs used by routed pages.
  'ai-foundations',
  'python-for-ai',
  'mathematics-for-ai',
  'machine-learning',
  'deep-learning',
  'computer-vision',
  'nlp',
  'transformers',
  'generative-ai',
  'llm-engineering',
  'rag-engineering',
  'agent-engineering',
  'ai-governance',
  'ai-security',
  'mlops',
  'production-ai-systems',
  'enterprise-ai',
]);

const difficultyEnum = z.enum(['beginner', 'intermediate', 'advanced']);

const toolCategoryEnum = z.enum([
  'llms',
  'agents',
  'rag',
  'vector-databases',
  'prompt-engineering',
  'fine-tuning',
  'evaluation',
  'governance',
  'metadata',
  'lineage',
  'mlops',
  'data-engineering',
  'coding-assistants',
  'research',
  'image-generation',
  'video-generation',
  'audio-generation',
  'automation',
  'productivity',
  'development',
  'security',
  'observability',
]);

const newsletterCategoryEnum = z.enum([
  'weekly-news',
  'oss-releases',
  'tool-spotlight',
  'learning',
  'career',
  'interview-prep',
]);

const gameTypeEnum = z.enum(['quiz', 'interactive', 'puzzle', 'flashcard', 'game']);

const questionDifficultyEnum = z.enum(['easy', 'medium', 'hard']);

const questionTypeEnum = z.enum(['mcq', 'true-false', 'multi-select']);

/* ------------------------------------------------------------------ */
/*  Collections                                                        */
/* ------------------------------------------------------------------ */

const learn = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/learn' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    track: trackEnum,
    order: z.number(),
    difficulty: difficultyEnum,
    tags: z.array(z.string()),
    prerequisites: z.array(z.string()).optional(),
    relatedTools: z.array(z.string()).optional(),
    author: z.string().optional(),
    lastUpdated: z.coerce.date(),
    estimatedTime: z.string(),
    draft: z.boolean().default(false),
  }),
});

const tools = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/tools' }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    logo: z.string(),
    description: z.string().max(200),
    category: toolCategoryEnum,
    openSource: z.boolean(),
    githubUrl: z.url().optional(),
    websiteUrl: z.url(),
    license: z.string(),
    difficulty: difficultyEnum,
    useCases: z.array(z.string()),
    alternatives: z.array(z.string()),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
  }),
});

const exams = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/exams' }),
  schema: z.object({
    track: trackEnum,
    title: z.string(),
    description: z.string(),
    difficulty: difficultyEnum,
    questions: z.array(
      z.object({
        id: z.string(),
        question: z.string(),
        type: questionTypeEnum,
        options: z.array(
          z.object({
            label: z.string(),
            value: z.string(),
          }),
        ),
        correct: z.union([z.string(), z.array(z.string())]),
        explanation: z.string(),
        difficulty: questionDifficultyEnum,
        topic: z.string(),
        tags: z.array(z.string()),
      }),
    ),
  }),
});

const newsletter = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/newsletter' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    issueNumber: z.number(),
    date: z.coerce.date(),
    categories: z.array(newsletterCategoryEnum),
    featured: z.boolean().default(false),
    author: z.string(),
  }),
});

const games = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/games' }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    description: z.string(),
    type: gameTypeEnum,
    difficulty: difficultyEnum,
    estimatedTime: z.string(),
    component: z.string(),
    relatedTopics: z.array(z.string()),
    featured: z.boolean().default(false),
  }),
});

/* ------------------------------------------------------------------ */
/*  Export                                                             */
/* ------------------------------------------------------------------ */

export const collections = { learn, tools, exams, newsletter, games };
