# AIByDM — Content Architecture

**Version:** 1.0
**Date:** 2026-06-15
**Status:** Draft

---

## 1. Content Collections (Astro)

Astro Content Collections provide type-safe content with Zod schema validation at build time.

### Collection Definitions

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const learnCollection = defineCollection({
  type: 'content', // MDX files
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    track: z.enum([
      'foundations',
      'machine-learning',
      'deep-learning',
      'computer-vision',
      'nlp',
      'transformers',
      'llm-engineering',
      'rag',
      'agents',
      'ai-security',
      'governance',
      'lineage',
      'metadata',
      'llmops',
      'production-ai',
      'enterprise-ai',
    ]),
    order: z.number(), // Sort order within track
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
    tags: z.array(z.string()),
    prerequisites: z.array(z.string()).optional(),
    related_tools: z.array(z.string()).optional(),
    related_exams: z.array(z.string()).optional(),
    author: z.string().optional(),
    last_updated: z.date(),
    estimated_time: z.string(), // "15 min", "1 hour"
    draft: z.boolean().default(false),
  }),
});

const toolCollection = defineCollection({
  type: 'data', // YAML files
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    logo: z.string(), // Path to logo in public/logos/
    description: z.string().max(200),
    long_description: z.string(),
    category: z.enum([
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
    ]),
    subcategories: z.array(z.string()).optional(),
    open_source: z.boolean(),
    github_url: z.string().url().optional(),
    website_url: z.string().url(),
    license: z.string(),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
    use_cases: z.array(z.string()),
    alternatives: z.array(z.string()),
    tags: z.array(z.string()),
    learning_resources: z.array(z.string().url()).optional(),
    last_updated: z.date(),
    featured: z.boolean().default(false),
  }),
});

const examCollection = defineCollection({
  type: 'data', // JSON files
  schema: z.object({
    track: z.string(),
    title: z.string(),
    description: z.string(),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
    time_limit: z.number().optional(), // minutes
    questions: z.array(
      z.object({
        id: z.string(),
        question: z.string(),
        type: z.enum(['mcq', 'true-false', 'multi-select']),
        options: z.array(
          z.object({
            label: z.string(),
            value: z.string(),
          }),
        ),
        correct: z.union([z.string(), z.array(z.string())]),
        explanation: z.string(),
        difficulty: z.enum(['easy', 'medium', 'hard']),
        topic: z.string(),
        tags: z.array(z.string()),
      }),
    ),
  }),
});

const gameCollection = defineCollection({
  type: 'data', // YAML files
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    description: z.string(),
    type: z.enum(['quiz', 'interactive', 'puzzle', 'flashcard', 'game']),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
    estimated_time: z.string(),
    component: z.string(), // React component name
    related_topics: z.array(z.string()),
    thumbnail: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

const newsletterCollection = defineCollection({
  type: 'content', // MDX files
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    issue_number: z.number(),
    date: z.date(),
    categories: z.array(
      z.enum([
        'weekly-news',
        'oss-releases',
        'tool-spotlight',
        'learning',
        'career',
        'interview-prep',
      ]),
    ),
    featured: z.boolean().default(false),
    author: z.string(),
  }),
});

export const collections = {
  learn: learnCollection,
  tools: toolCollection,
  exams: examCollection,
  games: gameCollection,
  newsletter: newsletterCollection,
};
```

---

## 2. Content Templates

### Learn Topic Template (`templates/learn-topic.mdx`)

````mdx
---
title: 'Topic Title'
description: 'One sentence description for SEO (max 160 chars)'
track: 'machine-learning'
order: 1
difficulty: 'intermediate'
tags: ['supervised-learning', 'classification']
prerequisites: ['foundations/python-basics']
related_tools: ['scikit-learn']
related_exams: ['ml']
author: 'contributor-name'
last_updated: 2026-06-15
estimated_time: '30 min'
draft: false
---

import { Callout, CodeBlock, Quiz, Diagram } from '../../components/content';

## Overview

What is this topic? Why does it matter? Where does it fit in the AI stack?

## Visual Explanation

<Diagram src="./diagrams/topic-overview.mermaid" />

Key concepts explained visually. Use diagrams, flowcharts, comparisons.

## Theory

Core concepts, mathematics, algorithms. Explain clearly.

### Key Concepts

- **Concept 1:** Definition and explanation
- **Concept 2:** Definition and explanation

### Mathematical Foundation

$$
f(x) = \frac{1}{1 + e^{-x}}
$$

## Build From Scratch

Implement the core idea from zero — no libraries.

```python
# Pure Python implementation
class SimpleModel:
    def __init__(self):
        pass

    def fit(self, X, y):
        pass

    def predict(self, X):
        pass
```
````

## Open Source Implementation

Now use real libraries to do it properly.

```python
from sklearn.linear_model import LogisticRegression

model = LogisticRegression()
model.fit(X_train, y_train)
predictions = model.predict(X_test)
```

<Callout type="tip">
Pro tip: Always scale your features before fitting.
</Callout>

## Projects

### Project 1: Title

**Objective:** What you'll build
**Dataset:** Where to get the data
**Steps:**

1. Step one
2. Step two
3. Step three

## Exercises

1. **Easy:** Exercise description
2. **Medium:** Exercise description
3. **Hard:** Exercise description

<Quiz
question="Which algorithm is best for linearly separable data?"
options={["Decision Tree", "Logistic Regression", "K-Means", "DBSCAN"]}
correct={1}
explanation="Logistic Regression works best with linearly separable data."
/>

## Interview Questions

1. **Q:** What is the difference between X and Y?
   **A:** Explanation...

2. **Q:** When would you use X over Y?
   **A:** Explanation...

## Resources

- [Resource 1](https://example.com) — Brief description
- [Resource 2](https://example.com) — Brief description

## Further Reading

- [Paper: Title](https://arxiv.org/...)
- [Book: Title by Author](https://...)
- [Course: Title on Platform](https://...)

````

### Tool Entry Template (`templates/tool-entry.yaml`)

```yaml
name: "Tool Name"
slug: "tool-name"
logo: "/logos/tool-name.svg"
description: "One sentence description (max 200 chars)"
long_description: |
  Two to three paragraphs describing the tool,
  its purpose, key features, and why it matters.
category: "rag"
subcategories: ["framework", "python"]
open_source: true
github_url: "https://github.com/org/repo"
website_url: "https://tool-website.com"
license: "MIT"
difficulty: "intermediate"
use_cases:
  - "Build RAG pipelines"
  - "Document Q&A systems"
  - "Knowledge base search"
alternatives:
  - "langchain"
  - "haystack"
tags:
  - "rag"
  - "retrieval"
  - "python"
  - "llm"
learning_resources:
  - "https://docs.tool.com/quickstart"
  - "https://youtube.com/watch?v=..."
last_updated: 2026-06-15
featured: false
````

### Exam Question Template (`templates/exam-question.json`)

```json
{
  "track": "python",
  "title": "Python Basics Quiz",
  "description": "Test your Python fundamentals",
  "difficulty": "beginner",
  "time_limit": 30,
  "questions": [
    {
      "id": "py-001",
      "question": "What is the output of `print(type([]))`?",
      "type": "mcq",
      "options": [
        { "label": "<class 'list'>", "value": "a" },
        { "label": "<class 'tuple'>", "value": "b" },
        { "label": "<class 'dict'>", "value": "c" },
        { "label": "<class 'set'>", "value": "d" }
      ],
      "correct": "a",
      "explanation": "An empty `[]` creates a list object in Python.",
      "difficulty": "easy",
      "topic": "data-types",
      "tags": ["python", "basics", "types"]
    }
  ]
}
```

---

## 3. Content Lifecycle

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│  Author   │ →  │  Submit  │ →  │  Review  │ →  │  Merge   │ →  │  Deploy  │
│ (markdown)│    │  (PR)    │    │ (checks) │    │ (main)   │    │ (Pages)  │
└──────────┘    └──────────┘    └──────────┘    └──────────┘    └──────────┘
                     │               │
                     ↓               ↓
                  CI checks      Reviewer checks
                  - Schema        - Accuracy
                  - Links         - Completeness
                  - Formatting    - Quality
                  - Spelling      - Follows template
```

### Content States

| State         | Mechanism                    | Behavior                         |
| ------------- | ---------------------------- | -------------------------------- |
| **Draft**     | `draft: true` in frontmatter | Not rendered in production build |
| **Published** | `draft: false`               | Rendered and indexed             |
| **Updated**   | `last_updated` field change  | Timestamped, visible to readers  |
| **Archived**  | Moved to `_archive/` folder  | Excluded from collections        |

---

## 4. Content Quality Gates (CI)

| Check              | Tool                            | Purpose                                |
| ------------------ | ------------------------------- | -------------------------------------- |
| Schema validation  | Astro Content Collections + Zod | Required fields, correct types         |
| Markdown lint      | markdownlint                    | Consistent formatting                  |
| Prose style        | Vale + custom rules             | Writing quality, jargon check          |
| Broken links       | lychee                          | No dead links                          |
| Image optimization | Astro image check               | Images < 500KB, alt text present       |
| Spelling           | cspell                          | Technical term dictionary              |
| Code blocks        | Custom script                   | Syntax validity for Python/JS examples |

### Vale Style Rules (`.vale/styles/AIByDM/`)

```yaml
# Avoid jargon without explanation
AIByDM.Jargon:
  message: "'%s' may need explanation for beginners."
  level: suggestion
  scope: text
  tokens:
    - embeddings
    - tokenizer
    - backpropagation
    - attention mechanism

# Enforce active voice
AIByDM.ActiveVoice:
  message: 'Prefer active voice.'
  level: warning
```

---

## 5. Image & Asset Strategy

| Asset Type    | Format                           | Location                       | Max Size  |
| ------------- | -------------------------------- | ------------------------------ | --------- |
| Tool logos    | SVG (preferred), PNG             | `public/logos/`                | 50KB      |
| Diagrams      | Mermaid (source), SVG (rendered) | Co-located `_images/`          | Generated |
| Screenshots   | WebP                             | Co-located `_images/`          | 200KB     |
| Illustrations | SVG                              | `public/illustrations/`        | 100KB     |
| OG images     | PNG 1200x630                     | Auto-generated or `public/og/` | 100KB     |

### Image Pipeline

```
Source image → Astro <Image> component → Optimized at build time
                                         ├── WebP (primary)
                                         ├── AVIF (modern browsers)
                                         └── Multiple sizes (responsive)
```
