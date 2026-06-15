# AIByDM — Sprint Breakdown

**Version:** 1.0
**Date:** 2026-06-15
**Status:** Draft

---

## Sprint Configuration

- **Sprint Length:** 2 weeks
- **Capacity:** ~40 hours per sprint (20h/week)
- **Total Sprints:** 7 sprints (14 weeks)
- **Buffer:** Built into each sprint for review cycles and unexpected work

---

## Sprint 0: Project Bootstrap (Week 0 — 1 week)

**Theme:** "Zero to deployable"

| #    | Task                                          | Type  | Hours   | Done When                                |
| ---- | --------------------------------------------- | ----- | ------- | ---------------------------------------- |
| 0.1  | Initialize Astro 5 + pnpm                     | Setup | 1       | `pnpm dev` starts                        |
| 0.2  | Tailwind CSS 4 + dark mode config             | Setup | 1       | Dark/light classes work                  |
| 0.3  | TypeScript config                             | Setup | 0.5     | `pnpm check` passes                      |
| 0.4  | ESLint + Prettier                             | Setup | 0.5     | `pnpm lint` passes                       |
| 0.5  | markdownlint + Vale                           | Setup | 1       | `pnpm lint:content` passes               |
| 0.6  | GitHub repo + branch protection               | Setup | 0.5     | Repo live, main protected                |
| 0.7  | GitHub Actions deploy pipeline                | CI/CD | 2       | Push to main → Pages deploy              |
| 0.8  | GitHub Actions validation pipeline            | CI/CD | 1       | PRs run lint + build                     |
| 0.9  | Issue templates (bug, feature, content, tool) | OSS   | 1       | Templates visible on GitHub              |
| 0.10 | PR template                                   | OSS   | 0.5     | Template loads on new PR                 |
| 0.11 | README.md                                     | Docs  | 1       | Project description, setup, contributing |
| 0.12 | CONTRIBUTING.md                               | Docs  | 1       | Clear contribution guide                 |
| 0.13 | LICENSE (MIT)                                 | Legal | 0.1     | MIT license in place                     |
| 0.14 | CODE_OF_CONDUCT.md                            | OSS   | 0.4     | Contributor Covenant adopted             |
|      | **Sprint Total**                              |       | **11h** |                                          |

**Deliverable:** Empty Astro site deployed to GitHub Pages with CI/CD.

---

## Sprint 1: Design System + Foundation (Weeks 1-2)

**Theme:** "The shell feels professional"

| #    | Task                                                              | Type      | Hours   | Done When                   |
| ---- | ----------------------------------------------------------------- | --------- | ------- | --------------------------- |
| 1.1  | CSS custom properties (colors, spacing, typography)               | Design    | 3       | Design tokens in global.css |
| 1.2  | Font setup (Inter Variable + JetBrains Mono)                      | Design    | 2       | Fonts load, subseted        |
| 1.3  | BaseLayout.astro (HTML shell, meta, slots)                        | Component | 3       | All pages use BaseLayout    |
| 1.4  | Header.astro (logo, nav links, search icon, theme toggle, GitHub) | Component | 3       | Header renders, responsive  |
| 1.5  | Footer.astro (links, copyright, social)                           | Component | 1       | Footer renders              |
| 1.6  | ThemeToggle.tsx (React island, localStorage)                      | Component | 2       | Dark/light toggle works     |
| 1.7  | Mobile navigation (hamburger menu, slide-out)                     | Component | 2       | Mobile nav works < 768px    |
| 1.8  | UI: Button variants (primary, secondary, ghost)                   | Component | 1       | Button component ready      |
| 1.9  | UI: Badge variants (category, difficulty, status)                 | Component | 1       | Badge component ready       |
| 1.10 | UI: Card component (base, hover effect)                           | Component | 1       | Card component ready        |
| 1.11 | UI: Tabs component                                                | Component | 1.5     | Tabs switch content         |
| 1.12 | 404 page                                                          | Page      | 0.5     | 404 renders with layout     |
| 1.13 | Homepage v1 (hero + module preview cards)                         | Page      | 5       | Homepage live               |
| 1.14 | SEO: Meta tags, OG defaults, JSON-LD                              | SEO       | 2       | Meta tags in page source    |
| 1.15 | sitemap.xml + robots.txt                                          | SEO       | 1       | /sitemap.xml accessible     |
|      | **Sprint Total**                                                  |           | **29h** |                             |

**Deliverable:** Professional-looking homepage with navigation, dark mode, and SEO basics.

---

## Sprint 2: Learn Module — Infrastructure (Weeks 3-4)

**Theme:** "Content creators can write"

| #    | Task                                              | Type      | Hours   | Done When                                   |
| ---- | ------------------------------------------------- | --------- | ------- | ------------------------------------------- |
| 2.1  | Learn content collection schema (Zod)             | Data      | 2       | Schema validates frontmatter                |
| 2.2  | Content collection config (all collections)       | Data      | 1       | `src/content/config.ts` complete            |
| 2.3  | DocsLayout.astro (sidebar + content + ToC)        | Layout    | 4       | 3-column layout renders                     |
| 2.4  | Sidebar.astro (collapsible, active state, scroll) | Component | 3       | Sidebar navigates tracks                    |
| 2.5  | TableOfContents.astro (scroll-spy, right rail)    | Component | 2       | ToC highlights current section              |
| 2.6  | Breadcrumbs.astro (with JSON-LD)                  | Component | 1       | Breadcrumbs render, structured data         |
| 2.7  | CodeBlock (Shiki, copy button, filename)          | Component | 2       | Code blocks render with syntax highlighting |
| 2.8  | Callout component (4 variants)                    | Component | 1       | Note/Tip/Warning/Danger render              |
| 2.9  | Mermaid diagram component                         | Component | 2       | Diagrams render in dark mode                |
| 2.10 | Learn hub page (/learn/)                          | Page      | 2       | Track cards listed, filterable              |
| 2.11 | Learn topic dynamic route ([...slug])             | Page      | 3       | Topics render with full layout              |
| 2.12 | Prev/Next navigation                              | Component | 1       | Navigate between topics                     |
| 2.13 | Content template: learn-topic.mdx                 | Template  | 1       | Template ready for contributors             |
| 2.14 | InlineQuiz.tsx (React island)                     | Component | 3       | Quiz embedded in content works              |
| 2.15 | Pagefind search integration                       | Feature   | 2       | Search indexes learn content                |
| 2.16 | SearchBar.tsx (Cmd+K modal)                       | Component | 4       | Search modal opens, finds content           |
|      | **Sprint Total**                                  |           | **34h** |                                             |

**Deliverable:** Complete Learn infrastructure — add a .mdx file and it appears with full layout.

---

## Sprint 3: Learn Content + Tools Start (Weeks 5-6)

**Theme:** "Real content, real value"

| #    | Task                                   | Type      | Hours   | Done When                     |
| ---- | -------------------------------------- | --------- | ------- | ----------------------------- |
| 3.1  | Content: Foundations — Python Basics   | Content   | 3       | Topic published               |
| 3.2  | Content: Foundations — Math for AI     | Content   | 3       | Topic published               |
| 3.3  | Content: Foundations — Statistics      | Content   | 3       | Topic published               |
| 3.4  | Content: Foundations — Data Structures | Content   | 3       | Topic published               |
| 3.5  | Content: Foundations — NumPy & Pandas  | Content   | 3       | Topic published               |
| 3.6  | Content: ML — Supervised Learning      | Content   | 3       | Topic published               |
| 3.7  | Content: ML — Unsupervised Learning    | Content   | 3       | Topic published               |
| 3.8  | Content: ML — Ensemble Methods         | Content   | 3       | Topic published               |
| 3.9  | Content: LLM — Introduction to LLMs    | Content   | 3       | Topic published               |
| 3.10 | Content: LLM — Prompt Engineering      | Content   | 3       | Topic published               |
| 3.11 | Tool collection schema (YAML)          | Data      | 1       | Schema validates tool entries |
| 3.12 | GridLayout.astro                       | Layout    | 2       | Card grid responsive          |
| 3.13 | ToolCard.astro                         | Component | 2       | Tool cards render             |
| 3.14 | Tool directory page (/tools/)          | Page      | 2       | Tool grid renders             |
|      | **Sprint Total**                       |           | **37h** |                               |

**Deliverable:** 10 learn topics published. Tool directory scaffolding ready.

---

## Sprint 4: Tools Module + More Content (Weeks 7-8)

**Theme:** "Tool directory goes live"

| #    | Task                                     | Type      | Hours     | Done When                        |
| ---- | ---------------------------------------- | --------- | --------- | -------------------------------- |
| 4.1  | ToolFilter.tsx (multi-select, search)    | Component | 4         | Filter tools by category, search |
| 4.2  | Tool category pages (/tools/[category]/) | Page      | 2         | Category pages render            |
| 4.3  | Tool detail page (/tools/[tool]/)        | Page      | 3         | Individual tool pages render     |
| 4.4  | Tool entry template (YAML)               | Template  | 0.5       | Template ready                   |
| 4.5  | Content: 25 tool entries (batch 1)       | Content   | 6         | 25 tools published               |
| 4.6  | Content: 25 tool entries (batch 2)       | Content   | 6         | 50 tools total                   |
| 4.7  | Tool logos (SVG collection)              | Asset     | 3         | Logos for all 50 tools           |
| 4.8  | Content: ML — Model Evaluation           | Content   | 3         | Topic published                  |
| 4.9  | Content: ML — Feature Engineering        | Content   | 3         | Topic published                  |
| 4.10 | Content: LLM — Fine-tuning Basics        | Content   | 3         | Topic published                  |
| 4.11 | Content: LLM — RAG Introduction          | Content   | 3         | Topic published                  |
| 4.12 | Content: LLM — Agent Architectures       | Content   | 3         | Topic published                  |
|      | **Sprint Total**                         |           | **39.5h** |                                  |

**Deliverable:** 50+ tools live. 15+ learn topics. Two fully functional modules.

---

## Sprint 5: Games Module (Weeks 9-10)

**Theme:** "Learning through play"

| #    | Task                                                  | Type    | Hours   | Done When                         |
| ---- | ----------------------------------------------------- | ------- | ------- | --------------------------------- |
| 5.1  | Game collection schema                                | Data    | 1       | Schema validates game config      |
| 5.2  | GameLayout.astro (full-width immersive)               | Layout  | 2       | Game pages full-screen            |
| 5.3  | Game hub page (/games/)                               | Page    | 2       | Game cards grid                   |
| 5.4  | Game dynamic page (/games/[game]/)                    | Page    | 2       | Games load per config             |
| 5.5  | localStorage utility (scores, progress, achievements) | Utility | 2       | CRUD for game state               |
| 5.6  | AI Terminology Quiz game                              | Game    | 6       | Quiz playable, 50+ questions      |
| 5.7  | Interview Flashcards (spaced repetition)              | Game    | 6       | Flashcards flip, progress tracked |
| 5.8  | Prompt Engineering Challenge                          | Game    | 8       | Prompt challenges with scoring    |
| 5.9  | Architecture Matching (drag-drop)                     | Game    | 6       | Drag-drop works, 10+ puzzles      |
| 5.10 | Progress tracking system                              | Feature | 2       | Progress bar on game hub          |
| 5.11 | Achievement badges (5 initial badges)                 | Feature | 3       | Badges unlock and display         |
|      | **Sprint Total**                                      |         | **40h** |                                   |

**Deliverable:** 4 playable games with progress tracking and achievements.

---

## Sprint 6: Exams Module + More Games (Weeks 11-12)

**Theme:** "Test your knowledge"

| #    | Task                                          | Type      | Hours   | Done When                     |
| ---- | --------------------------------------------- | --------- | ------- | ----------------------------- |
| 6.1  | Exam collection schema                        | Data      | 1       | Schema validates questions    |
| 6.2  | QuizEngine.tsx (answer, reveal, explain)      | Component | 6       | Quiz engine renders questions |
| 6.3  | Mock test runner (timer, random order, score) | Component | 4       | Timed tests work              |
| 6.4  | Exam hub page (/exams/)                       | Page      | 2       | Exam tracks listed            |
| 6.5  | Exam track page (/exams/[track]/)             | Page      | 2       | Track content renders         |
| 6.6  | FlashcardDeck.tsx (reusable)                  | Component | 3       | Flashcards for any topic      |
| 6.7  | Difficulty + topic filter for questions       | Component | 2       | Filter works on exam pages    |
| 6.8  | Content: Python questions (100+)              | Content   | 6       | 100+ questions published      |
| 6.9  | Content: ML questions (100+)                  | Content   | 6       | 100+ questions published      |
| 6.10 | Content: GenAI questions (50+)                | Content   | 4       | 50+ questions published       |
| 6.11 | ML Algorithm Guessing Game                    | Game      | 5       | Game playable                 |
| 6.12 | Memory Matching Game                          | Game      | 4       | Game playable                 |
|      | **Sprint Total**                              |           | **45h** |                               |

**Deliverable:** Exam engine live with 250+ questions. 6 games total.

---

## Sprint 7: Newsletter, Community, Polish (Weeks 13-14)

**Theme:** "Community-ready launch"

| #    | Task                                        | Type        | Hours     | Done When                  |
| ---- | ------------------------------------------- | ----------- | --------- | -------------------------- |
| 7.1  | Newsletter collection schema                | Data        | 1         | Schema validates issues    |
| 7.2  | NarrowLayout.astro                          | Layout      | 1         | Centered reading layout    |
| 7.3  | Newsletter hub + issue pages                | Page        | 3         | Newsletter archive renders |
| 7.4  | RSS feed generation                         | Feature     | 1         | /rss.xml valid             |
| 7.5  | Newsletter issue template                   | Template    | 0.5       | Template ready             |
| 7.6  | Content: 3 newsletter issues                | Content     | 3         | Issues published           |
| 7.7  | Contributors page (auto from git)           | Page        | 3         | Contributors listed        |
| 7.8  | About page                                  | Page        | 1         | About content live         |
| 7.9  | Public roadmap page                         | Page        | 2         | Roadmap visible            |
| 7.10 | Changelog page                              | Page        | 1         | Changelog live             |
| 7.11 | GitHub Discussions setup                    | Config      | 1         | Discussions enabled        |
| 7.12 | Content: 50+ more exam questions            | Content     | 3         | 300+ total questions       |
| 7.13 | Content: 5+ more learn topics               | Content     | 5         | 20+ total topics           |
| 7.14 | Cross-linking (learn ↔ tools ↔ exams)       | Enhancement | 3         | Related content appears    |
| 7.15 | Performance audit + fixes                   | QA          | 3         | Lighthouse > 90 all pages  |
| 7.16 | Accessibility audit + fixes                 | QA          | 3         | WCAG AA passed             |
| 7.17 | Final broken link check                     | QA          | 1         | Zero broken links          |
| 7.18 | Content: revision sheets + cheat sheets (3) | Content     | 3         | Sheets published           |
|      | **Sprint Total**                            |             | **38.5h** |                            |

**Deliverable:** All 5 modules live. Community infrastructure ready. Production quality.

---

## Post-Launch Cadence (Week 15+)

| Cadence   | Activity                             |
| --------- | ------------------------------------ |
| Weekly    | Content PRs reviewed and merged      |
| Weekly    | 2-3 new learn topics or tool entries |
| Bi-weekly | Newsletter issue published           |
| Bi-weekly | Sprint planning for next features    |
| Monthly   | Release cut + changelog              |
| Monthly   | Performance + accessibility audit    |
| Quarterly | Roadmap review + community check-in  |

---

## Sprint Summary

| Sprint | Weeks | Theme               | Key Output                                  |
| ------ | ----- | ------------------- | ------------------------------------------- |
| **S0** | 0     | Bootstrap           | Repo, CI/CD, deployed empty site            |
| **S1** | 1-2   | Foundation          | Design system, homepage, navigation         |
| **S2** | 3-4   | Learn Infra         | DocsLayout, sidebar, search, content system |
| **S3** | 5-6   | Learn + Tools       | 10 topics, tool directory scaffolding       |
| **S4** | 7-8   | Tools + Learn       | 50 tools, 15+ topics, tool filters          |
| **S5** | 9-10  | Games               | 4 games, achievements, progress             |
| **S6** | 11-12 | Exams + Games       | Quiz engine, 250+ questions, 6 games        |
| **S7** | 13-14 | Newsletter + Polish | All modules live, community ready           |

**Total: 14 weeks to full MVP launch.**
