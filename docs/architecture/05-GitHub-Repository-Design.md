# AIByDM — GitHub Repository Design

**Version:** 1.0
**Date:** 2026-06-15
**Status:** Draft

---

## 1. Monorepo vs Multi-Repo Decision

### Evaluation

| Factor                   | Monorepo                               | Multi-Repo                               |
| ------------------------ | -------------------------------------- | ---------------------------------------- |
| **Setup complexity**     | Low — one repo, one CI                 | High — 7+ repos, cross-repo CI           |
| **Contributor DX**       | Easy — clone once, contribute anything | Hard — find right repo, different setups |
| **Cross-module changes** | Easy — single PR                       | Hard — coordinated PRs                   |
| **Build pipeline**       | Single pipeline with caching           | Independent pipelines                    |
| **Code sharing**         | Direct imports                         | Package publishing                       |
| **Issue tracking**       | Centralized                            | Fragmented                               |
| **GitHub Pages**         | One deployment                         | Complex multi-site                       |
| **At current scale**     | Ideal (0-50 contributors)              | Overhead not justified                   |
| **Future scale**         | Extract when needed                    | Already split                            |

### Decision: **Monorepo** (for v1)

**Rationale:** At the current stage, monorepo eliminates coordination overhead. Content, components, and configuration live together. Contributors clone once. GitHub Pages deploys from one branch. Extraction to multi-repo can happen when specific modules have independent release cadences (Phase 5+).

**Future extraction triggers:**

- Module gets 10+ active contributors who only touch that module
- Build time exceeds 10 minutes and module isolation would help
- Independent versioning needed (e.g., games become a standalone product)

---

## 2. Repository Structure

```
aibydm/
├── .github/
│   ├── workflows/
│   │   ├── deploy.yml             # Build + deploy to GitHub Pages
│   │   ├── preview.yml            # PR preview builds
│   │   ├── validate.yml           # Lint, type-check, broken links
│   │   ├── content-check.yml      # Markdown lint, Vale style check
│   │   └── dependabot.yml         # Dependency updates
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.yml
│   │   ├── feature_request.yml
│   │   ├── content_request.yml
│   │   ├── tool_submission.yml
│   │   └── config.yml
│   ├── PULL_REQUEST_TEMPLATE.md
│   ├── CODEOWNERS
│   └── FUNDING.yml
│
├── src/
│   ├── components/
│   │   ├── layout/                # Header, Footer, Sidebar, Nav
│   │   ├── content/               # TopicCard, ToolCard, CodeBlock
│   │   ├── interactive/           # SearchBar, QuizEngine, ThemeToggle
│   │   ├── games/                 # Game-specific React components
│   │   └── ui/                    # Button, Badge, Card, Tabs
│   │
│   ├── content/                   # Astro Content Collections
│   │   ├── learn/                 # Learning content (MDX)
│   │   │   ├── foundations/
│   │   │   │   ├── python-basics.mdx
│   │   │   │   ├── math-for-ai.mdx
│   │   │   │   └── _images/       # Co-located images
│   │   │   ├── machine-learning/
│   │   │   ├── deep-learning/
│   │   │   ├── computer-vision/
│   │   │   ├── nlp/
│   │   │   ├── transformers/
│   │   │   ├── llm-engineering/
│   │   │   ├── rag/
│   │   │   ├── agents/
│   │   │   ├── ai-security/
│   │   │   ├── governance/
│   │   │   ├── lineage/
│   │   │   ├── metadata/
│   │   │   ├── llmops/
│   │   │   ├── production-ai/
│   │   │   └── enterprise-ai/
│   │   │
│   │   ├── tools/                 # Tool entries (YAML + MDX)
│   │   │   ├── ollama.yaml
│   │   │   ├── langchain.yaml
│   │   │   └── ...
│   │   │
│   │   ├── exams/                 # Exam question banks (JSON + MDX)
│   │   │   ├── python/
│   │   │   │   ├── _meta.yaml     # Track metadata
│   │   │   │   ├── questions.json  # Question bank
│   │   │   │   ├── mock-test-1.json
│   │   │   │   ├── revision-sheet.mdx
│   │   │   │   └── cheat-sheet.mdx
│   │   │   ├── ml/
│   │   │   └── ...
│   │   │
│   │   ├── games/                 # Game configurations (YAML)
│   │   │   ├── prompt-challenge.yaml
│   │   │   ├── ai-quiz.yaml
│   │   │   └── ...
│   │   │
│   │   └── newsletter/            # Newsletter issues (MDX)
│   │       ├── 2026-01-15-week-3.mdx
│   │       └── ...
│   │
│   ├── data/
│   │   ├── schemas/               # Zod content schemas
│   │   │   ├── learn.ts
│   │   │   ├── tool.ts
│   │   │   ├── exam.ts
│   │   │   ├── game.ts
│   │   │   └── newsletter.ts
│   │   ├── constants/
│   │   │   ├── navigation.ts
│   │   │   ├── categories.ts
│   │   │   └── seo.ts
│   │   └── utils/
│   │       ├── search.ts
│   │       ├── quiz-engine.ts
│   │       ├── local-storage.ts
│   │       └── helpers.ts
│   │
│   ├── layouts/
│   │   ├── BaseLayout.astro       # HTML shell, meta, scripts
│   │   ├── DocsLayout.astro       # Sidebar + content + ToC
│   │   ├── GridLayout.astro       # Card grid pages
│   │   ├── NarrowLayout.astro     # Newsletter, about
│   │   └── GameLayout.astro       # Full-width game container
│   │
│   ├── pages/
│   │   ├── index.astro            # Homepage
│   │   ├── learn/
│   │   │   ├── index.astro
│   │   │   └── [...slug].astro
│   │   ├── tools/
│   │   │   ├── index.astro
│   │   │   ├── [category].astro
│   │   │   └── [tool].astro
│   │   ├── games/
│   │   │   ├── index.astro
│   │   │   └── [game].astro
│   │   ├── exams/
│   │   │   ├── index.astro
│   │   │   └── [...slug].astro
│   │   ├── newsletter/
│   │   │   ├── index.astro
│   │   │   └── [...slug].astro
│   │   ├── about.astro
│   │   ├── roadmap.astro
│   │   ├── contributing.astro
│   │   ├── 404.astro
│   │   ├── rss.xml.ts
│   │   └── robots.txt.ts
│   │
│   ├── styles/
│   │   ├── global.css             # Tailwind imports + custom properties
│   │   ├── typography.css         # Prose styles
│   │   └── code.css               # Code block styles
│   │
│   └── env.d.ts                   # Astro type declarations
│
├── public/
│   ├── favicon.svg
│   ├── og-image.png               # Default Open Graph image
│   ├── fonts/
│   │   ├── inter-variable.woff2
│   │   └── jetbrains-mono.woff2
│   ├── logos/                      # Tool logos
│   │   ├── ollama.svg
│   │   └── ...
│   ├── _headers                   # Security headers for GitHub Pages
│   └── CNAME                      # Custom domain (if applicable)
│
├── scripts/
│   ├── validate-content.ts        # Content validation script
│   ├── generate-search-index.ts   # Search index generation
│   ├── check-links.ts             # Broken link checker
│   └── new-content.ts             # Content scaffolding CLI
│
├── templates/
│   ├── learn-topic.mdx            # Template for new learn topics
│   ├── tool-entry.yaml            # Template for new tool entries
│   ├── exam-question.json         # Template for exam questions
│   ├── newsletter-issue.mdx       # Template for newsletter issues
│   └── game-config.yaml           # Template for game configurations
│
├── docs/
│   └── architecture/              # Architecture documents (this folder)
│       ├── 01-PRD.md
│       ├── 02-Technical-Architecture.md
│       └── ...
│
├── .vscode/
│   ├── settings.json              # Workspace settings
│   ├── extensions.json            # Recommended extensions
│   └── snippets.code-snippets     # Content authoring snippets
│
├── astro.config.mjs               # Astro configuration
├── tailwind.config.mjs            # Tailwind configuration
├── tsconfig.json                  # TypeScript configuration
├── package.json                   # Dependencies
├── pnpm-lock.yaml                 # Lock file
├── .prettierrc                    # Prettier config
├── .eslintrc.cjs                  # ESLint config
├── .markdownlintrc                # Markdown lint config
├── .gitignore
├── LICENSE                        # MIT License
├── README.md                      # Project README
├── CONTRIBUTING.md                # Contribution guide
├── CODE_OF_CONDUCT.md             # Community standards
├── SECURITY.md                    # Security policy
└── CHANGELOG.md                   # Release notes
```

---

## 3. Folder Explanation

| Folder            | Purpose                                                        |
| ----------------- | -------------------------------------------------------------- |
| `.github/`        | CI/CD workflows, issue templates, PR templates, CODEOWNERS     |
| `src/components/` | All UI components — static Astro and interactive React islands |
| `src/content/`    | Astro Content Collections — all authored content lives here    |
| `src/data/`       | Schemas, constants, utilities — the data layer                 |
| `src/layouts/`    | Page layout wrappers (nav, sidebar, footer shells)             |
| `src/pages/`      | Astro file-based routing — each file becomes a URL             |
| `src/styles/`     | Global CSS, Tailwind setup, typography                         |
| `public/`         | Static assets served as-is (fonts, logos, headers)             |
| `scripts/`        | Build-time and development utility scripts                     |
| `templates/`      | Scaffolding templates for contributors                         |
| `docs/`           | Architecture and planning documents                            |
| `.vscode/`        | Editor configuration for consistent contributor experience     |

---

## 4. Branch Strategy

```
main (protected)
├── develop                 # Integration branch
├── feature/learn-ml        # Feature branches
├── content/add-rag-topic   # Content additions
├── fix/tool-card-layout    # Bug fixes
└── release/v1.0            # Release branches
```

### Branch Rules

| Branch      | Protection                                         | Merge Strategy    |
| ----------- | -------------------------------------------------- | ----------------- |
| `main`      | Required reviews (1), status checks, no force push | Squash merge      |
| `develop`   | Status checks                                      | Merge commit      |
| `feature/*` | None                                               | Squash to develop |
| `content/*` | None (lightweight for content PRs)                 | Squash to develop |

### Naming Convention

```
<type>/<short-description>

Types: feature, content, fix, docs, chore, game, exam, tool
Examples: content/add-transformer-basics, feature/quiz-engine, fix/mobile-nav
```

---

## 5. Labels

| Category        | Labels                                                                                |
| --------------- | ------------------------------------------------------------------------------------- |
| **Type**        | `type:bug`, `type:feature`, `type:content`, `type:enhancement`                        |
| **Module**      | `module:learn`, `module:tools`, `module:games`, `module:exams`, `module:newsletter`   |
| **Priority**    | `priority:critical`, `priority:high`, `priority:medium`, `priority:low`               |
| **Status**      | `status:needs-triage`, `status:in-progress`, `status:review-needed`, `status:blocked` |
| **Contributor** | `good-first-issue`, `help-wanted`, `content-needed`, `mentor-available`               |
| **Skill**       | `skill:writing`, `skill:design`, `skill:frontend`, `skill:react`, `skill:devops`      |

---

## 6. CODEOWNERS

```
# Global
*                       @aibydm/core-maintainers

# Content
src/content/learn/      @aibydm/content-reviewers
src/content/tools/      @aibydm/tools-curators
src/content/exams/      @aibydm/exam-reviewers
src/content/newsletter/ @aibydm/newsletter-editors

# Components
src/components/         @aibydm/frontend-team
src/components/games/   @aibydm/game-developers

# Infrastructure
.github/                @aibydm/devops
astro.config.mjs        @aibydm/core-maintainers
```

---

## 7. Future Multi-Repo Extraction Plan

When the project scales beyond 50+ active contributors:

| Repository          | Content                             | Trigger                          |
| ------------------- | ----------------------------------- | -------------------------------- |
| `aibydm`            | Core framework, components, layouts | Always the main repo             |
| `aibydm-content`    | Learn module content only           | When content team > 15           |
| `aibydm-tools-data` | Tool YAML entries                   | When tool submissions > 20/month |
| `aibydm-games`      | Game components                     | When games become standalone     |
| `aibydm-exam-bank`  | Exam questions                      | When questions > 5,000           |
| `aibydm-assets`     | Logos, images, diagrams             | When assets > 500MB              |

Extraction uses git subtree or git submodules. Build pipeline pulls all repos.
