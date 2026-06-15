# AIByDM — Information Architecture

**Version:** 1.0
**Date:** 2026-06-15
**Status:** Draft

---

## 1. Site Map

```
aibydm.github.io/
│
├── /                           # Homepage
│
├── /learn/                     # Learning Hub
│   ├── /learn/foundations/      # Track landing
│   │   ├── /learn/foundations/python-basics/
│   │   ├── /learn/foundations/math-for-ai/
│   │   ├── /learn/foundations/statistics/
│   │   └── /learn/foundations/data-structures/
│   ├── /learn/machine-learning/
│   │   ├── /learn/machine-learning/supervised-learning/
│   │   ├── /learn/machine-learning/unsupervised-learning/
│   │   ├── /learn/machine-learning/ensemble-methods/
│   │   └── ...
│   ├── /learn/deep-learning/
│   ├── /learn/computer-vision/
│   ├── /learn/nlp/
│   ├── /learn/transformers/
│   ├── /learn/llm-engineering/
│   ├── /learn/rag/
│   ├── /learn/agents/
│   ├── /learn/ai-security/
│   ├── /learn/governance/
│   ├── /learn/lineage/
│   ├── /learn/metadata/
│   ├── /learn/llmops/
│   ├── /learn/production-ai/
│   └── /learn/enterprise-ai/
│
├── /tools/                     # Tool Directory
│   ├── /tools/llms/
│   ├── /tools/agents/
│   ├── /tools/rag/
│   ├── /tools/vector-databases/
│   ├── /tools/prompt-engineering/
│   ├── /tools/fine-tuning/
│   ├── /tools/evaluation/
│   ├── /tools/governance/
│   ├── /tools/metadata/
│   ├── /tools/lineage/
│   ├── /tools/mlops/
│   ├── /tools/data-engineering/
│   ├── /tools/coding-assistants/
│   ├── /tools/research/
│   ├── /tools/image-generation/
│   ├── /tools/video-generation/
│   ├── /tools/audio-generation/
│   ├── /tools/automation/
│   ├── /tools/productivity/
│   ├── /tools/development/
│   ├── /tools/security/
│   └── /tools/observability/
│   └── /tools/[tool-slug]/     # Individual tool pages
│
├── /games/                     # Game Zone
│   ├── /games/prompt-challenge/
│   ├── /games/guess-the-model/
│   ├── /games/ai-quiz/
│   ├── /games/rag-challenge/
│   ├── /games/agent-design/
│   ├── /games/vector-search/
│   ├── /games/architecture-match/
│   ├── /games/ml-algorithm/
│   ├── /games/transformer-game/
│   ├── /games/prompt-injection/
│   ├── /games/interview-flashcards/
│   └── /games/memory-match/
│
├── /exams/                     # Exam Preparation
│   ├── /exams/python/
│   ├── /exams/ml/
│   ├── /exams/deep-learning/
│   ├── /exams/genai/
│   ├── /exams/prompt-engineering/
│   ├── /exams/llm-engineering/
│   ├── /exams/governance/
│   ├── /exams/mlops/
│   ├── /exams/data-engineering/
│   ├── /exams/system-design/
│   ├── /exams/interview-bank/
│   └── /exams/certification/
│
├── /newsletter/                # Newsletter
│   ├── /newsletter/archive/
│   └── /newsletter/issues/[slug]/
│
├── /about/                     # About the project
├── /roadmap/                   # Public roadmap
├── /contributing/              # How to contribute
├── /community/                 # Community links
└── /changelog/                 # Release notes
```

---

## 2. Navigation Structure

### Primary Navigation (Top Bar)

```
[Logo: AIByDM]  Learn  Tools  Games  Exams  Newsletter  [Search] [Theme] [GitHub]
```

### Mobile Navigation (Hamburger)

```
[Logo] [Search] [Menu ☰]
  └── Learn
  │     └── Foundations
  │     └── Machine Learning
  │     └── ... (all 16 tracks)
  └── Tools
  │     └── Categories...
  └── Games
  └── Exams
  └── Newsletter
  └── Community
  └── GitHub
```

### Module-Level Sidebar (Learn)

```
← Learn Hub

Foundations
  ├── Python Basics
  ├── Math for AI
  ├── Statistics
  └── Data Structures

Machine Learning
  ├── Supervised Learning
  ├── Unsupervised Learning
  └── ...

[Collapsible per track]
```

### Content Page Layout

```
┌──────────────────────────────────────────────────────┐
│ Header / Nav                                          │
├──────────┬───────────────────────────┬───────────────┤
│ Sidebar  │ Content                   │ Table of      │
│ (tracks  │ (main article)            │ Contents      │
│  & pages)│                           │ (right rail)  │
│          │                           │               │
├──────────┴───────────────────────────┴───────────────┤
│ Prev/Next Navigation                                  │
├──────────────────────────────────────────────────────┤
│ Footer                                                │
└──────────────────────────────────────────────────────┘
```

---

## 3. Content Hierarchy

### Learn Module (Per Topic)

```
Topic Title
├── 1. Overview              (anchor: #overview)
├── 2. Visual Explanation    (anchor: #visual-explanation)
├── 3. Theory                (anchor: #theory)
├── 4. Build From Scratch    (anchor: #build-from-scratch)
├── 5. OSS Implementation    (anchor: #oss-implementation)
├── 6. Projects              (anchor: #projects)
├── 7. Exercises             (anchor: #exercises)
├── 8. Interview Questions   (anchor: #interview-questions)
├── 9. Resources             (anchor: #resources)
└── 10. Further Reading      (anchor: #further-reading)
```

### Tool Page

```
Tool Name + Logo
├── Overview / Description
├── Key Features
├── Use Cases
├── Getting Started
├── Alternatives Comparison
├── Community & Resources
└── Metadata Sidebar (license, stars, links)
```

### Exam Track Page

```
Track Name
├── Overview
├── Topics Covered
├── MCQ Practice (filterable)
├── Mock Tests
├── Revision Sheets
├── Cheat Sheets
└── Flashcards
```

---

## 4. URL Conventions

| Pattern          | Example                                        | Rule                       |
| ---------------- | ---------------------------------------------- | -------------------------- |
| Module index     | `/learn/`                                      | Trailing slash, index page |
| Track landing    | `/learn/machine-learning/`                     | kebab-case                 |
| Topic page       | `/learn/machine-learning/supervised-learning/` | kebab-case                 |
| Tool category    | `/tools/vector-databases/`                     | kebab-case                 |
| Tool page        | `/tools/qdrant/`                               | Flat under /tools/         |
| Game page        | `/games/prompt-challenge/`                     | kebab-case                 |
| Exam track       | `/exams/python/`                               | kebab-case                 |
| Newsletter issue | `/newsletter/issues/2026-01-15-weekly/`        | date-slug                  |

### SEO URL Rules

- All URLs lowercase kebab-case
- No file extensions in URLs
- Trailing slash on all pages (Astro `trailingSlash: 'always'`)
- Canonical URLs set on every page
- No query parameters for content filtering (use JS client-side)

---

## 5. Breadcrumb Strategy

```
Home > Learn > Machine Learning > Supervised Learning
Home > Tools > Vector Databases
Home > Tools > Qdrant
Home > Games > Prompt Challenge
Home > Exams > Python > Mock Test 1
```

Breadcrumbs use `BreadcrumbList` structured data (JSON-LD) for SEO.

---

## 6. Cross-Linking Strategy

| Source                 | Target                    | Mechanism                         |
| ---------------------- | ------------------------- | --------------------------------- |
| Learn topic → Tools    | "Tools used" section      | Manual links in frontmatter       |
| Learn topic → Exams    | "Test your knowledge" CTA | Auto-generated from matching tags |
| Tool page → Learn      | "Learn more" section      | Bidirectional tag matching        |
| Game → Learn topic     | "Learn the concept" link  | Manual in game config             |
| Homepage → All modules | Featured sections         | Curated editorial picks           |

---

## 7. Search Information Architecture

### Searchable Content Types

| Type           | Fields Indexed                    | Weight |
| -------------- | --------------------------------- | ------ |
| Learn topics   | title, headings, body, tags       | High   |
| Tools          | name, description, category, tags | High   |
| Exam questions | question text, topic, difficulty  | Medium |
| Newsletter     | title, summary, body              | Low    |
| Games          | name, description                 | Low    |

### Search Results Display

```
[Icon] Result Title
Category > Subcategory
Snippet with **highlighted** match...
```

### Filter Facets

- Content type (Learn / Tools / Exams / Newsletter / Games)
- Difficulty level
- Category/Track
