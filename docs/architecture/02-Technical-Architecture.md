# AIByDM — Technical Architecture

**Version:** 1.0
**Date:** 2026-06-15
**Status:** Draft

---

## 1. Tech Stack Evaluation

### Candidates

| Criteria (weight)            | Docusaurus (React)          | Nextra (Next.js)             | Astro                          | Next.js Static Export        |
| ---------------------------- | --------------------------- | ---------------------------- | ------------------------------ | ---------------------------- |
| **GitHub Pages** (10)        | 10 — native support         | 8 — works with config        | 10 — native support            | 7 — needs `output: export`   |
| **SEO** (10)                 | 8 — good OOB                | 8 — Next.js SSG              | 10 — zero JS default           | 9 — full control             |
| **Performance** (10)         | 7 — ships React runtime     | 7 — ships Next.js runtime    | 10 — zero JS default, islands  | 7 — ships React runtime      |
| **Contributor Friendly** (9) | 9 — docs-focused DX         | 7 — Next.js knowledge needed | 8 — markdown + components      | 6 — full framework knowledge |
| **Markdown/MDX** (9)         | 10 — first-class            | 9 — first-class via Nextra   | 10 — first-class               | 8 — needs setup              |
| **Search** (8)               | 9 — Algolia plugin built-in | 6 — manual                   | 8 — Pagefind integration       | 6 — manual                   |
| **Component System** (8)     | 8 — React components        | 8 — React components         | 9 — framework-agnostic islands | 10 — full React              |
| **Interactive Games** (8)    | 7 — React only              | 7 — React only               | 9 — React/Svelte/Vue islands   | 10 — full React SPA          |
| **Theming** (7)              | 8 — Infima CSS              | 7 — Tailwind                 | 10 — Tailwind native           | 9 — Tailwind                 |
| **Build Speed** (7)          | 7 — moderate                | 7 — moderate                 | 9 — fast                       | 6 — slower at scale          |
| **Plugin Ecosystem** (6)     | 9 — rich docs plugins       | 6 — limited                  | 7 — growing                    | 8 — npm ecosystem            |
| **Versioning** (5)           | 10 — built-in               | 3 — manual                   | 4 — manual                     | 3 — manual                   |

### Weighted Scores

| Framework      | Score (out of 970) |
| -------------- | ------------------ |
| **Astro**      | **892**            |
| Docusaurus     | 843                |
| Nextra         | 738                |
| Next.js Static | 739                |

### Decision: **Astro**

**Rationale:**

1. **Zero JS by default** — critical for a content-heavy learning platform. Pages load instantly.
2. **Islands Architecture** — interactive games and quizzes load as isolated React/Svelte components without hydrating the entire page.
3. **First-class Markdown/MDX** — contributors write content in Markdown, components in MDX when needed.
4. **Framework-agnostic** — games can use React, Svelte, or vanilla JS per component. Best tool for each game.
5. **GitHub Pages** — `astro build` outputs static HTML. Zero configuration needed.
6. **Tailwind CSS** — native integration for the design system.
7. **Pagefind** — the recommended search solution integrates seamlessly.
8. **Content Collections** — type-safe content schemas for tools, exams, newsletter issues.
9. **Build performance** — Vite-based, handles 1000+ pages in < 3 minutes.
10. **Growing ecosystem** — Starlight (docs theme) provides documentation patterns we can extend.

**Risk Mitigation:**

- Astro's ecosystem is younger than Docusaurus → mitigate by using Starlight as base theme and contributing back fixes
- Game interactivity needs client-side JS → mitigate with islands (React components hydrate independently)

---

## 2. Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        GitHub Pages                          │
│                     (Static Hosting)                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       │
│  │  LEARN   │ │  TOOLS   │ │  GAMES   │ │  EXAMS   │ ...   │
│  │ (Static  │ │ (Static  │ │ (Islands │ │ (Islands │       │
│  │  HTML)   │ │  HTML)   │ │  + React)│ │  + React)│       │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘       │
│                                                              │
│  ┌──────────────────────────────────────────────────┐       │
│  │              Astro Build Pipeline                 │       │
│  │  Markdown/MDX → Content Collections → HTML       │       │
│  │  Components  → Islands → Hydrated JS             │       │
│  │  Tailwind    → Optimized CSS                     │       │
│  │  Pagefind    → Search Index                      │       │
│  └──────────────────────────────────────────────────┘       │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                    GitHub Actions CI/CD                       │
│  Build → Test → Lint → Validate → Deploy                     │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Component Architecture

### 3.1 Content Layer

```
src/content/
├── learn/           # Content Collections (type-safe)
│   ├── foundations/
│   │   ├── python-basics.mdx
│   │   └── ...
│   ├── machine-learning/
│   └── ...
├── tools/           # Tool directory entries
│   ├── ollama.yaml
│   ├── langchain.yaml
│   └── ...
├── games/           # Game metadata & configurations
│   ├── prompt-challenge.yaml
│   └── ...
├── exams/           # Exam question banks
│   ├── python/
│   │   ├── questions.json
│   │   └── ...
│   └── ...
└── newsletter/      # Newsletter issues
    ├── 2026-01-15.mdx
    └── ...
```

**Content Collections** provide:

- Type-safe frontmatter validation via Zod schemas
- Automatic slug generation
- Query APIs for filtering, sorting, pagination
- Build-time validation (broken references caught at build)

### 3.2 Page Layer

```
src/pages/
├── index.astro              # Homepage
├── learn/
│   ├── index.astro          # Learning hub
│   └── [...slug].astro      # Dynamic route for all learn content
├── tools/
│   ├── index.astro          # Tool directory
│   ├── [category].astro     # Category pages
│   └── [tool].astro         # Individual tool pages
├── games/
│   ├── index.astro          # Game hub
│   └── [game].astro         # Individual game pages
├── exams/
│   ├── index.astro          # Exam hub
│   ├── [track].astro        # Exam track pages
│   └── [track]/[exam].astro # Individual exam pages
├── newsletter/
│   ├── index.astro          # Newsletter hub
│   └── [...slug].astro      # Individual issues
├── 404.astro
├── sitemap.xml.ts
├── robots.txt.ts
└── rss.xml.ts
```

### 3.3 Component Layer (Islands Architecture)

```
src/components/
├── layout/                  # Static (no JS shipped)
│   ├── Header.astro
│   ├── Footer.astro
│   ├── Sidebar.astro
│   └── Navigation.astro
├── content/                 # Static
│   ├── TopicCard.astro
│   ├── ToolCard.astro
│   ├── CodeBlock.astro
│   └── DiagramViewer.astro
├── interactive/             # Islands (hydrated React/Svelte)
│   ├── SearchBar.tsx        # client:load
│   ├── QuizEngine.tsx       # client:visible
│   ├── FlashcardDeck.tsx    # client:visible
│   ├── ExamRunner.tsx       # client:visible
│   ├── ToolFilter.tsx       # client:load
│   └── ThemeToggle.tsx      # client:load
├── games/                   # Islands (hydrated per game)
│   ├── PromptChallenge.tsx  # client:only="react"
│   ├── ModelGuessing.tsx    # client:only="react"
│   ├── ArchitectureMatch.tsx
│   └── ...
└── ui/                      # Shared UI primitives
    ├── Button.astro
    ├── Badge.astro
    ├── Card.astro
    ├── Tabs.astro
    └── ...
```

**Hydration Strategies:**

- `client:load` — loads immediately (search bar, theme toggle)
- `client:visible` — loads when scrolled into view (quizzes, flashcards)
- `client:only="react"` — never SSR'd, client-only (games with complex state)
- No directive — zero JS shipped (layout, static content)

### 3.4 Data Layer

```
src/data/
├── schemas/                 # Zod schemas for content validation
│   ├── learn.ts
│   ├── tool.ts
│   ├── game.ts
│   ├── exam.ts
│   └── newsletter.ts
├── constants/               # Static configuration
│   ├── categories.ts
│   ├── navigation.ts
│   └── seo.ts
└── utils/                   # Helper functions
    ├── search.ts
    ├── quiz-engine.ts
    ├── local-storage.ts
    └── analytics.ts
```

---

## 4. Technology Stack Summary

| Layer                 | Technology                       | Purpose                                |
| --------------------- | -------------------------------- | -------------------------------------- |
| **Framework**         | Astro 5.x                        | Static site generation, islands        |
| **UI Framework**      | React 19                         | Interactive islands (games, quizzes)   |
| **Styling**           | Tailwind CSS 4                   | Utility-first CSS, dark mode           |
| **Content**           | Markdown/MDX                     | Author-friendly content format         |
| **Validation**        | Zod                              | Content schema validation              |
| **Search**            | Pagefind                         | Client-side static search              |
| **Icons**             | Lucide React                     | Consistent iconography                 |
| **Diagrams**          | Mermaid                          | In-content architecture diagrams       |
| **Code Highlighting** | Shiki                            | Syntax highlighting (built into Astro) |
| **Analytics**         | Plausible (self-hosted) or Umami | Privacy-respecting analytics           |
| **CI/CD**             | GitHub Actions                   | Build, test, deploy                    |
| **Hosting**           | GitHub Pages                     | Free static hosting                    |
| **Package Manager**   | pnpm                             | Fast, disk-efficient                   |
| **Linting**           | ESLint + Prettier                | Code quality                           |
| **Content Linting**   | markdownlint + Vale              | Content quality                        |

---

## 5. Performance Architecture

### Target Metrics

| Metric      | Target               | Strategy                          |
| ----------- | -------------------- | --------------------------------- |
| FCP         | < 1.2s               | Zero JS default, static HTML      |
| LCP         | < 2.0s               | Optimized images, font subsetting |
| CLS         | < 0.05               | Fixed layout dimensions           |
| TTI         | < 2.5s               | Islands hydrate independently     |
| Bundle Size | < 50KB per page (JS) | Islands only load what's needed   |

### Optimization Strategies

1. **Image Optimization** — Astro's `<Image>` component: auto WebP/AVIF, responsive sizes, lazy loading
2. **Font Strategy** — System font stack + one variable font (Inter), subset to Latin
3. **CSS** — Tailwind purges unused styles; < 15KB compressed CSS
4. **JS** — Zero JS for content pages; islands load per-component
5. **Prefetching** — `prefetch` for visible links on hover
6. **Caching** — Immutable hashed assets, `Cache-Control` via `_headers`

---

## 6. Security Architecture

| Concern           | Mitigation                                          |
| ----------------- | --------------------------------------------------- |
| XSS               | No user input forms in v1; CSP headers              |
| Data Privacy      | No cookies, no tracking pixels, no PII collection   |
| Supply Chain      | Lockfile pinning, Dependabot, npm audit in CI       |
| Content Injection | All content reviewed via PR process                 |
| Secrets           | No secrets in repo; GitHub Pages has no server-side |

CSP Header (via `public/_headers`):

```
/*
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self'
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
```

---

## 7. Scalability Considerations

| Dimension             | Approach                                                           |
| --------------------- | ------------------------------------------------------------------ |
| **Content Scale**     | Content Collections handle 10,000+ pages efficiently               |
| **Build Scale**       | Astro incremental builds; content cache between builds             |
| **Contributor Scale** | Markdown-only contributions don't require dev setup                |
| **Module Scale**      | Each module is a self-contained content collection + page routes   |
| **Future Backend**    | Islands can call external APIs when needed (API layer added later) |
