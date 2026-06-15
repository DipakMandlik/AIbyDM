# AIByDM — Product Roadmap

**Version:** 1.0
**Date:** 2026-06-15
**Status:** Draft

---

## Roadmap Overview

```
Phase 1 ──── Phase 2 ──── Phase 3 ──── Phase 4 ──── Phase 5 ──── Phase 6+
Learning     Tool         Games        Exams        Community    AI Tutor
Platform     Directory                                           & Beyond
(Q3 2026)    (Q3 2026)    (Q4 2026)    (Q4 2026)    (Q1 2027)   (2027+)
```

---

## Phase 1: Learning Platform (Weeks 1-6)

**Goal:** Launch the Learn module with 3-4 tracks and the foundational website.

### Deliverables

| #    | Deliverable                                      | Priority |
| ---- | ------------------------------------------------ | -------- |
| 1.1  | Astro project scaffolding + Tailwind + dark mode | P0       |
| 1.2  | Base layout (header, footer, navigation)         | P0       |
| 1.3  | Docs layout (sidebar, content area, ToC)         | P0       |
| 1.4  | Homepage (hero, module previews, CTA)            | P0       |
| 1.5  | Content collection schemas (learn)               | P0       |
| 1.6  | Learn index page (track listing)                 | P0       |
| 1.7  | Learn topic page template                        | P0       |
| 1.8  | Content: Foundations track (5+ topics)           | P0       |
| 1.9  | Content: Machine Learning track (5+ topics)      | P1       |
| 1.10 | Content: LLM Engineering track (5+ topics)       | P1       |
| 1.11 | Pagefind search integration                      | P1       |
| 1.12 | GitHub Actions deploy pipeline                   | P0       |
| 1.13 | SEO (meta tags, sitemap, OG images)              | P1       |
| 1.14 | Mobile responsive design                         | P0       |
| 1.15 | README, CONTRIBUTING, LICENSE                    | P0       |

### Success Criteria

- Site live on GitHub Pages
- 3 tracks, 15+ topics published
- Lighthouse > 90 on all categories
- First 3 external contributors

---

## Phase 2: Tool Directory (Weeks 5-8, overlaps Phase 1)

**Goal:** Launch the Tools module with 50+ curated tools.

### Deliverables

| #    | Deliverable                           | Priority |
| ---- | ------------------------------------- | -------- |
| 2.1  | Tool content collection schema (YAML) | P0       |
| 2.2  | Tool directory grid page with filters | P0       |
| 2.3  | Tool category pages                   | P0       |
| 2.4  | Individual tool detail page           | P0       |
| 2.5  | Tool filter component (React island)  | P1       |
| 2.6  | Tool submission issue template        | P0       |
| 2.7  | Content: 50+ tool entries (YAML)      | P0       |
| 2.8  | Tool logos collection                 | P1       |
| 2.9  | Tool comparison tables                | P2       |
| 2.10 | "Alternatives" cross-linking          | P2       |

### Success Criteria

- 50+ tools published across 10+ categories
- Tool pages ranking for "[tool] alternatives" searches
- 5+ community tool submissions via issues

---

## Phase 3: Game Zone (Weeks 7-12)

**Goal:** Launch 6+ interactive games with gamification.

### Deliverables

| #    | Deliverable                              | Priority |
| ---- | ---------------------------------------- | -------- |
| 3.1  | Game layout (full-width, immersive)      | P0       |
| 3.2  | Game hub page (card grid)                | P0       |
| 3.3  | AI Terminology Quiz game                 | P0       |
| 3.4  | Interview Flashcards (spaced repetition) | P0       |
| 3.5  | Prompt Engineering Challenge             | P1       |
| 3.6  | Architecture Matching (drag-drop)        | P1       |
| 3.7  | ML Algorithm Guessing Game               | P1       |
| 3.8  | Memory Matching Game                     | P2       |
| 3.9  | Local leaderboard (localStorage)         | P1       |
| 3.10 | Achievement badges system                | P2       |
| 3.11 | Progress tracking (localStorage)         | P1       |
| 3.12 | Daily challenge system (date-seed)       | P2       |

### Success Criteria

- 6+ games playable
- Average session > 5 minutes
- Games shareable (URL-based state for challenges)

---

## Phase 4: Exam Preparation (Weeks 10-14)

**Goal:** Launch exam tracks with 500+ questions.

### Deliverables

| #    | Deliverable                             | Priority |
| ---- | --------------------------------------- | -------- |
| 4.1  | Exam collection schema                  | P0       |
| 4.2  | Exam hub page                           | P0       |
| 4.3  | Quiz engine component (React island)    | P0       |
| 4.4  | Mock test runner (timed, randomized)    | P0       |
| 4.5  | Revision sheet template                 | P1       |
| 4.6  | Cheat sheet template                    | P1       |
| 4.7  | Flashcard component (spaced repetition) | P1       |
| 4.8  | Content: Python questions (100+)        | P0       |
| 4.9  | Content: ML questions (100+)            | P0       |
| 4.10 | Content: GenAI questions (100+)         | P1       |
| 4.11 | Difficulty and topic filters            | P1       |
| 4.12 | Progress tracking                       | P1       |
| 4.13 | Score history (localStorage)            | P2       |

### Success Criteria

- 500+ questions across 5+ tracks
- Mock tests with timed mode
- 60%+ completion rate

---

## Phase 5: Community & Newsletter (Weeks 13-16)

**Goal:** Build community infrastructure and newsletter archive.

### Deliverables

| #    | Deliverable                           | Priority |
| ---- | ------------------------------------- | -------- |
| 5.1  | Newsletter collection schema          | P0       |
| 5.2  | Newsletter archive page               | P0       |
| 5.3  | Newsletter issue template             | P0       |
| 5.4  | RSS feed generation                   | P1       |
| 5.5  | Contributors page (auto-generated)    | P1       |
| 5.6  | Community page (links to Discussions) | P1       |
| 5.7  | Roadmap page (public)                 | P2       |
| 5.8  | Changelog page                        | P2       |
| 5.9  | GitHub Discussions setup              | P0       |
| 5.10 | Content: 5+ newsletter issues         | P1       |
| 5.11 | All-contributors bot setup            | P2       |

### Success Criteria

- Newsletter archive live
- RSS feed functional
- GitHub Discussions active with 20+ threads

---

## Phase 6-9: Future Vision (2027+)

| Phase                   | Feature                  | Description                                                |
| ----------------------- | ------------------------ | ---------------------------------------------------------- |
| **6: AI Tutor**         | AI-powered Q&A           | Embed an AI assistant that answers questions about content |
| **7: Certification**    | Achievement certificates | Verifiable completion certificates (on-chain or PDF)       |
| **8: Interactive Labs** | Code execution           | Browser-based Python/Jupyter environment (WebContainers)   |
| **9: Enterprise**       | Team features            | Custom learning paths, admin dashboard, SSO                |

### Phase 6 Prerequisites

- Significant community size (1,000+ monthly users)
- Content depth sufficient for AI training
- Sponsorship or sustainable funding

---

## Risk Register

| Risk                          | Likelihood | Impact | Mitigation                                     |
| ----------------------------- | ---------- | ------ | ---------------------------------------------- |
| Low contributor engagement    | Medium     | High   | Good-first-issue pipeline, recognition system  |
| Content quality inconsistency | Medium     | Medium | Templates, review process, Vale style checker  |
| Build time degradation        | Low        | Medium | Astro caching, content collection optimization |
| SEO competition               | High       | Medium | Niche long-tail keywords, original content     |
| Astro breaking changes        | Low        | Medium | Pin versions, test upgrades in preview         |
| Scope creep                   | High       | High   | Strict phase gates, MVP-first mentality        |
