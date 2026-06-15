# AIByDM — Implementation Plan

**Version:** 1.0
**Date:** 2026-06-15
**Status:** Draft

---

## 1. Implementation Approach

**Methodology:** Iterative delivery with weekly releases
**Team Model:** Solo maintainer + community contributors
**Philosophy:** Ship early, ship often. Every week should have a deployable increment.

---

## 2. Technical Setup (Week 0 — Pre-Sprint)

| Task                                                 | Output                              | Est. Hours |
| ---------------------------------------------------- | ----------------------------------- | ---------- |
| Initialize Astro project with pnpm                   | `package.json`, `astro.config.mjs`  | 1h         |
| Configure Tailwind CSS 4 with dark mode              | `tailwind.config.mjs`, `global.css` | 1h         |
| Configure TypeScript                                 | `tsconfig.json`                     | 0.5h       |
| Setup ESLint + Prettier                              | `.eslintrc.cjs`, `.prettierrc`      | 0.5h       |
| Setup markdownlint + Vale                            | `.markdownlintrc`, `.vale.ini`      | 1h         |
| Create GitHub repo with branch protection            | GitHub settings                     | 0.5h       |
| Setup GitHub Actions (deploy + validate)             | `.github/workflows/`                | 2h         |
| Create issue templates + PR template                 | `.github/ISSUE_TEMPLATE/`           | 1h         |
| Write README, CONTRIBUTING, LICENSE, CODE_OF_CONDUCT | Root files                          | 2h         |
| Setup VS Code workspace settings                     | `.vscode/`                          | 0.5h       |
| **Total**                                            |                                     | **10h**    |

---

## 3. Foundation Layer (Week 1)

| Task                                             | Output                                       | Dependencies    | Est. Hours |
| ------------------------------------------------ | -------------------------------------------- | --------------- | ---------- |
| Design tokens → CSS custom properties            | `src/styles/global.css`                      | Tailwind config | 3h         |
| Typography system (Inter + JetBrains Mono)       | `src/styles/typography.css`                  | Font files      | 2h         |
| BaseLayout component (HTML shell, meta, scripts) | `src/layouts/BaseLayout.astro`               | Design tokens   | 3h         |
| Header component (logo, nav, search icon, theme) | `src/components/layout/Header.astro`         | BaseLayout      | 3h         |
| Footer component                                 | `src/components/layout/Footer.astro`         | BaseLayout      | 1h         |
| ThemeToggle (React island)                       | `src/components/interactive/ThemeToggle.tsx` | None            | 2h         |
| Mobile navigation (hamburger menu)               | Header extension                             | Header          | 2h         |
| UI primitives: Button, Badge, Card               | `src/components/ui/`                         | Design tokens   | 3h         |
| 404 page                                         | `src/pages/404.astro`                        | BaseLayout      | 0.5h       |
| **Total**                                        |                                              |                 | **19.5h**  |

---

## 4. Homepage (Week 2)

| Task                                                          | Output                    | Dependencies        | Est. Hours |
| ------------------------------------------------------------- | ------------------------- | ------------------- | ---------- |
| Hero section (headline, tagline, CTAs)                        | Homepage component        | BaseLayout          | 3h         |
| Module preview cards (Learn, Tools, Games, Exams, Newsletter) | Homepage sections         | Card component      | 3h         |
| Featured content section                                      | Homepage section          | Content collections | 2h         |
| Stats/social proof section                                    | Homepage section          | None                | 1h         |
| Open source CTA section                                       | Homepage section          | None                | 1h         |
| Community/contributors section                                | Homepage section          | None                | 1h         |
| SEO setup (meta tags, OG image, JSON-LD)                      | BaseLayout updates        | None                | 2h         |
| Robots.txt + Sitemap                                          | `src/pages/robots.txt.ts` | Astro sitemap       | 1h         |
| **Total**                                                     |                           |                     | **14h**    |

---

## 5. Learn Module (Weeks 2-5)

| Task                                           | Output                                        | Dependencies    | Est. Hours |
| ---------------------------------------------- | --------------------------------------------- | --------------- | ---------- |
| Learn content collection schema (Zod)          | `src/data/schemas/learn.ts`                   | None            | 2h         |
| Content collection config                      | `src/content/config.ts`                       | Schema          | 1h         |
| DocsLayout (sidebar + content + ToC)           | `src/layouts/DocsLayout.astro`                | BaseLayout      | 4h         |
| Sidebar component (collapsible, scroll-synced) | `src/components/layout/Sidebar.astro`         | DocsLayout      | 3h         |
| Table of Contents component (right rail)       | `src/components/layout/TableOfContents.astro` | DocsLayout      | 2h         |
| Learn hub page (track cards)                   | `src/pages/learn/index.astro`                 | Schema          | 2h         |
| Learn topic page (dynamic route)               | `src/pages/learn/[...slug].astro`             | DocsLayout      | 3h         |
| Code block component (Shiki, copy button)      | `src/components/content/CodeBlock.astro`      | Shiki           | 2h         |
| Callout component (Note, Tip, Warning, Danger) | `src/components/content/Callout.astro`        | None            | 1h         |
| Diagram component (Mermaid)                    | `src/components/content/Diagram.astro`        | Mermaid         | 2h         |
| Inline quiz component                          | `src/components/interactive/InlineQuiz.tsx`   | React           | 3h         |
| Prev/Next navigation                           | DocsLayout addition                           | Content queries | 1h         |
| Breadcrumbs component                          | `src/components/layout/Breadcrumbs.astro`     | None            | 1h         |
| Content templates                              | `templates/learn-topic.mdx`                   | Schema          | 1h         |
| **Content: Foundations track** (5 topics)      | `src/content/learn/foundations/`              | Template        | 15h        |
| **Content: Machine Learning track** (5 topics) | `src/content/learn/machine-learning/`         | Template        | 15h        |
| **Content: LLM Engineering track** (5 topics)  | `src/content/learn/llm-engineering/`          | Template        | 15h        |
| **Total**                                      |                                               |                 | **73h**    |

---

## 6. Search (Week 4)

| Task                              | Output                                     | Dependencies   | Est. Hours |
| --------------------------------- | ------------------------------------------ | -------------- | ---------- |
| Pagefind integration (postbuild)  | `package.json` scripts                     | Build pipeline | 1h         |
| Pagefind configuration            | `pagefind.yml`                             | Content pages  | 1h         |
| SearchBar component (Cmd+K modal) | `src/components/interactive/SearchBar.tsx` | Pagefind       | 4h         |
| Search result styling             | CSS                                        | SearchBar      | 1h         |
| Data attributes for filtering     | Layout updates                             | Pagefind       | 1h         |
| **Total**                         |                                            |                | **8h**     |

---

## 7. Tools Module (Weeks 5-7)

| Task                                | Output                                      | Dependencies | Est. Hours |
| ----------------------------------- | ------------------------------------------- | ------------ | ---------- |
| Tool content collection schema      | `src/data/schemas/tool.ts`                  | None         | 1h         |
| GridLayout (responsive card grid)   | `src/layouts/GridLayout.astro`              | BaseLayout   | 2h         |
| ToolCard component                  | `src/components/content/ToolCard.astro`     | Card, Badge  | 2h         |
| ToolFilter component (React island) | `src/components/interactive/ToolFilter.tsx` | React        | 4h         |
| Tool directory page                 | `src/pages/tools/index.astro`               | GridLayout   | 2h         |
| Tool category pages                 | `src/pages/tools/[category].astro`          | ToolCard     | 2h         |
| Tool detail page                    | `src/pages/tools/[tool].astro`              | Schema       | 3h         |
| Tool entry template                 | `templates/tool-entry.yaml`                 | Schema       | 0.5h       |
| Tool submission issue template      | `.github/ISSUE_TEMPLATE/`                   | None         | 0.5h       |
| **Content: 50+ tool entries**       | `src/content/tools/`                        | Template     | 12h        |
| Tool logo collection                | `public/logos/`                             | None         | 3h         |
| **Total**                           |                                             |              | **32h**    |

---

## 8. Games Module (Weeks 7-10)

| Task                      | Output                                       | Dependencies | Est. Hours |
| ------------------------- | -------------------------------------------- | ------------ | ---------- |
| Game collection schema    | `src/data/schemas/game.ts`                   | None         | 1h         |
| GameLayout (full-width)   | `src/layouts/GameLayout.astro`               | BaseLayout   | 2h         |
| Game hub page (card grid) | `src/pages/games/index.astro`                | GameLayout   | 2h         |
| Game page (dynamic)       | `src/pages/games/[game].astro`               | GameLayout   | 2h         |
| LocalStorage utility      | `src/data/utils/local-storage.ts`            | None         | 2h         |
| **AI Quiz Game**          | `src/components/games/AIQuiz.tsx`            | React        | 6h         |
| **Interview Flashcards**  | `src/components/games/Flashcards.tsx`        | React        | 6h         |
| **Prompt Challenge**      | `src/components/games/PromptChallenge.tsx`   | React        | 8h         |
| **Architecture Match**    | `src/components/games/ArchitectureMatch.tsx` | React        | 8h         |
| **ML Algorithm Game**     | `src/components/games/MLAlgorithm.tsx`       | React        | 6h         |
| **Memory Match**          | `src/components/games/MemoryMatch.tsx`       | React        | 6h         |
| Achievement badges system | Shared game utility                          | localStorage | 3h         |
| Progress tracking         | Shared game utility                          | localStorage | 2h         |
| Game data/questions       | JSON data files                              | Per game     | 8h         |
| **Total**                 |                                              |              | **62h**    |

---

## 9. Exams Module (Weeks 9-12)

| Task                                    | Output                                         | Dependencies | Est. Hours |
| --------------------------------------- | ---------------------------------------------- | ------------ | ---------- |
| Exam collection schema                  | `src/data/schemas/exam.ts`                     | None         | 1h         |
| Exam hub page                           | `src/pages/exams/index.astro`                  | Schema       | 2h         |
| Exam track page                         | `src/pages/exams/[track].astro`                | Schema       | 2h         |
| QuizEngine component                    | `src/components/interactive/QuizEngine.tsx`    | React        | 6h         |
| Mock test runner (timer, randomization) | QuizEngine extension                           | QuizEngine   | 4h         |
| FlashcardDeck component                 | `src/components/interactive/FlashcardDeck.tsx` | React        | 3h         |
| Difficulty/topic filter                 | Filter component                               | React        | 2h         |
| Revision sheet layout                   | DocsLayout variant                             | MDX          | 1h         |
| Cheat sheet layout                      | DocsLayout variant                             | MDX          | 1h         |
| **Content: Python questions (100+)**    | `src/content/exams/python/`                    | Template     | 8h         |
| **Content: ML questions (100+)**        | `src/content/exams/ml/`                        | Template     | 8h         |
| **Content: GenAI questions (100+)**     | `src/content/exams/genai/`                     | Template     | 8h         |
| **Content: 2 more tracks (60+ each)**   | `src/content/exams/`                           | Template     | 10h        |
| Score tracking (localStorage)           | Utility                                        | localStorage | 2h         |
| **Total**                               |                                                |              | **58h**    |

---

## 10. Newsletter & Community (Weeks 11-14)

| Task                               | Output                                 | Dependencies      | Est. Hours |
| ---------------------------------- | -------------------------------------- | ----------------- | ---------- |
| Newsletter collection schema       | `src/data/schemas/newsletter.ts`       | None              | 1h         |
| NarrowLayout                       | `src/layouts/NarrowLayout.astro`       | BaseLayout        | 1h         |
| Newsletter hub page                | `src/pages/newsletter/index.astro`     | Schema            | 2h         |
| Newsletter issue page              | `src/pages/newsletter/[...slug].astro` | NarrowLayout      | 2h         |
| RSS feed                           | `src/pages/rss.xml.ts`                 | Newsletter schema | 1h         |
| Newsletter issue template          | `templates/newsletter-issue.mdx`       | Schema            | 0.5h       |
| Contributors page (auto-generated) | `src/pages/community.astro`            | Git data          | 3h         |
| Roadmap page                       | `src/pages/roadmap.astro`              | None              | 2h         |
| About page                         | `src/pages/about.astro`                | None              | 1h         |
| Changelog page                     | `src/pages/changelog.astro`            | None              | 1h         |
| **Content: 5 newsletter issues**   | `src/content/newsletter/`              | Template          | 5h         |
| GitHub Discussions setup           | GitHub config                          | None              | 1h         |
| **Total**                          |                                        |                   | **20.5h**  |

---

## 11. Total Effort Summary

| Phase                  | Hours         | Weeks           |
| ---------------------- | ------------- | --------------- |
| Tech Setup             | 10            | 0.5             |
| Foundation             | 19.5          | 1               |
| Homepage               | 14            | 1               |
| Learn Module           | 73            | 3               |
| Search                 | 8             | 0.5             |
| Tools Module           | 32            | 2               |
| Games Module           | 62            | 3               |
| Exams Module           | 58            | 2.5             |
| Newsletter & Community | 20.5          | 1               |
| **Total**              | **297 hours** | **~14.5 weeks** |

Assumes ~20 hours/week of focused development time.
With community contributions on content, development time reduces to ~200 hours.
