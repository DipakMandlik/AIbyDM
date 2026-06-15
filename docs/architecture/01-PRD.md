# AIByDM — Product Requirement Document (PRD)

**Version:** 1.0
**Date:** 2026-06-15
**Author:** AIByDM Core Team
**Status:** Draft

---

## 1. Executive Summary

AIByDM ("Learn AI. Build AI. Master AI.") is a free, open-source, community-driven AI Engineering learning platform. It provides structured learning paths, curated tool directories, interactive games, exam preparation, and newsletters — all deployed as a static site on GitHub Pages with zero backend dependency.

The platform targets the growing demand for accessible, production-grade AI engineering education — from fundamentals through enterprise deployment.

---

## 2. Problem Statement

| Problem                                                          | Impact                                                 |
| ---------------------------------------------------------------- | ------------------------------------------------------ |
| AI learning resources are fragmented across YouTube, blogs, docs | Learners waste time finding quality content            |
| Most platforms are paid or proprietary                           | Barrier to entry for students and developing countries |
| Theory-heavy courses lack build-from-scratch experience          | Engineers can't translate knowledge to production      |
| No single platform covers the full AI engineering stack          | Gaps between ML, LLM, RAG, Agents, Governance          |
| AI tool ecosystem is overwhelming (1000+ tools)                  | Engineers can't evaluate what to use                   |
| Interview prep is scattered and outdated                         | Job seekers lack structured preparation                |

---

## 3. Target Users

### Primary Personas

| Persona                   | Description                          | Key Needs                                                |
| ------------------------- | ------------------------------------ | -------------------------------------------------------- |
| **AI Learner**            | Students, career switchers (0-2 yrs) | Structured paths, visual explanations, hands-on projects |
| **AI Engineer**           | Working engineers (2-5 yrs)          | Tool comparisons, production patterns, advanced topics   |
| **AI Architect**          | Senior engineers, leads (5+ yrs)     | Governance, enterprise patterns, system design           |
| **Interviewer/Candidate** | Job seekers and hiring managers      | Exam prep, interview banks, flashcards                   |
| **Contributor**           | OSS enthusiasts, educators           | Easy contribution workflow, recognition                  |

### Secondary Personas

- **Educators** — use content in courses
- **Enterprises** — evaluate tools for teams
- **Researchers** — discover emerging tools and techniques

---

## 4. Product Modules

### Module 1: LEARN

**Purpose:** Structured AI engineering education from fundamentals to production.

**Topics (16 tracks):**

1. Fundamentals (Math, Stats, Python, Data Structures)
2. Machine Learning
3. Deep Learning
4. Computer Vision
5. Natural Language Processing (NLP)
6. Transformers
7. LLM Engineering
8. RAG Engineering
9. Agent Engineering
10. AI Security
11. AI Governance
12. Data Lineage
13. Metadata Management
14. LLMOps
15. Production AI
16. Enterprise AI

**Per-topic content structure:**

| Section                    | Description                               |
| -------------------------- | ----------------------------------------- |
| Overview                   | What, why, where it fits in the AI stack  |
| Visual Explanation         | Diagrams, animations, visual walkthroughs |
| Theory                     | Core concepts, math, algorithms           |
| Build From Scratch         | Implement from zero (no libraries)        |
| Open Source Implementation | Using real OSS libraries                  |
| Projects                   | End-to-end project walkthroughs           |
| Exercises                  | Practice problems with solutions          |
| Interview Questions        | Topic-specific interview prep             |
| Resources                  | Curated links, papers, videos             |
| Further Reading            | Advanced materials                        |

**Success Metrics:**

- 16 tracks with at least 5 topics each at launch
- Average time-on-page > 4 minutes
- Return visitor rate > 30%

---

### Module 2: TOOLS

**Purpose:** Curated directory of free and open-source AI tools.

**Categories (22):**

| Category           | Example Tools                    |
| ------------------ | -------------------------------- |
| LLMs               | Ollama, LiteLLM, vLLM            |
| Agents             | CrewAI, LangGraph, AutoGen       |
| RAG                | LlamaIndex, LangChain, Haystack  |
| Vector Databases   | Qdrant, Weaviate, Chroma, Milvus |
| Prompt Engineering | PromptFoo, Guidance, DSPy        |
| Fine Tuning        | Unsloth, Axolotl, PEFT           |
| Evaluation         | Ragas, DeepEval, Phoenix         |
| AI Governance      | OpenMetadata, Apache Atlas       |
| Metadata           | DataHub, Amundsen                |
| Lineage            | Marquez, OpenLineage             |
| MLOps              | MLflow, Kubeflow, Metaflow       |
| Data Engineering   | Airflow, dbt, Dagster            |
| Coding Assistants  | Continue, Aider, OpenHands       |
| Research Tools     | Semantic Scholar, Elicit         |
| Image Generation   | Stable Diffusion, ComfyUI        |
| Video Generation   | Open-Sora, AnimateDiff           |
| Audio Generation   | Bark, Coqui TTS                  |
| Automation         | n8n, Activepieces                |
| Productivity       | Flowise, Dify                    |
| Development        | Open WebUI, Jan, LM Studio       |
| Security           | Garak, Rebuff                    |
| Observability      | Langfuse, Phoenix                |
| Cloud              | LocalAI, Ollama                  |

**Tool Card Schema:**

```
- name: string
- logo: image_url
- description: string (max 200 chars)
- long_description: markdown
- category: enum
- subcategory: string[]
- open_source: boolean
- github_url: url
- website_url: url
- license: string (MIT, Apache-2.0, etc.)
- difficulty: enum (beginner, intermediate, advanced)
- use_cases: string[]
- alternatives: string[] (tool names)
- tags: string[]
- learning_resources: url[]
- last_updated: date
- stars: number (optional, fetched)
```

**Success Metrics:**

- 100+ tools cataloged at launch
- Tool pages rank in top 20 for "[tool name] alternatives"
- Monthly unique visitors > 5,000 within 6 months

---

### Module 3: GAME ZONE

**Purpose:** Learn AI through interactive challenges and games.

**Constraint:** All games must be client-side only (no backend). Use localStorage for state.

**Games at Launch:**

| Game                     | Type        | Description                               |
| ------------------------ | ----------- | ----------------------------------------- |
| Prompt Challenge         | Interactive | Craft prompts to achieve target outputs   |
| Guess The Model          | Quiz        | Identify which LLM generated a response   |
| AI Terminology Quiz      | Quiz        | MCQ on AI terms and concepts              |
| RAG Challenge            | Interactive | Build a retrieval pipeline visually       |
| Agent Design Challenge   | Puzzle      | Design multi-agent architectures          |
| Vector Search Puzzle     | Visual      | Understand similarity search through play |
| Architecture Matching    | Drag-drop   | Match components to architecture patterns |
| ML Algorithm Game        | Quiz        | Guess the right algorithm for a scenario  |
| Transformer Game         | Visual      | Build attention mechanisms step-by-step   |
| Prompt Injection Defense | Interactive | Defend against adversarial prompts        |
| Interview Flashcards     | Flashcard   | Spaced repetition for AI interview prep   |
| Memory Matching          | Game        | Match AI concepts to definitions          |

**Gamification Features:**

- Local leaderboard (localStorage)
- Progress tracking (localStorage)
- Achievement badges
- Daily challenges (date-based seed)
- Streak tracking

**Success Metrics:**

- 6+ games at launch
- Average session > 5 minutes
- Return game player rate > 40%

---

### Module 4: NEWSLETTER

**Purpose:** Curated AI engineering updates.

**Categories:**

- Weekly AI News
- Open Source Releases
- Tool Spotlights
- Learning Resources
- AI Engineering Updates
- Career Tips
- Interview Preparation

**MVP Scope:**

- Static archive pages (markdown-based)
- Newsletter issue template
- RSS feed generation
- Future integration hooks for Substack/Beehiiv/Mailchimp

**Success Metrics:**

- Bi-weekly publishing cadence
- 50+ archived issues within year 1
- Newsletter signup conversion > 5%

---

### Module 5: EXAMS

**Purpose:** Free AI certification and interview preparation.

**Exam Tracks (12):**

1. Python for AI
2. Machine Learning
3. Deep Learning
4. Generative AI
5. Prompt Engineering
6. LLM Engineering
7. AI Governance
8. MLOps
9. Data Engineering
10. System Design for AI
11. Interview Questions Bank
12. Certification Preparation

**Per-track content:**

| Content Type      | Description                          |
| ----------------- | ------------------------------------ |
| MCQs              | Multiple choice with explanations    |
| Mock Tests        | Timed, randomized from question pool |
| Revision Sheets   | One-page topic summaries             |
| Cheat Sheets      | Quick reference cards                |
| Flashcards        | Spaced repetition cards              |
| Difficulty Levels | Easy, Medium, Hard filtering         |
| Topic Filters     | Granular topic selection             |

**Technical Constraint:** All exam logic runs client-side. Question banks stored as JSON/MDX. Randomization uses deterministic seeding.

**Success Metrics:**

- 500+ questions at launch
- 12 mock tests available
- Completion rate > 60%

---

## 5. Non-Functional Requirements

| Requirement       | Target                                               |
| ----------------- | ---------------------------------------------------- |
| **Performance**   | Lighthouse score > 90 on all pages                   |
| **SEO**           | Structured data, sitemap, OG tags, meta descriptions |
| **Accessibility** | WCAG 2.1 AA compliance                               |
| **Mobile**        | Fully responsive, mobile-first design                |
| **Offline**       | Service worker for key pages (future)                |
| **i18n**          | Architecture supports future localization            |
| **Analytics**     | Privacy-respecting (Plausible or similar)            |
| **Security**      | No user data collection, CSP headers, SRI            |
| **Availability**  | 99.9% (GitHub Pages SLA)                             |
| **Build Time**    | < 5 minutes for full site build                      |
| **Page Load**     | < 2s First Contentful Paint                          |

---

## 6. Out of Scope (v1)

- User accounts / authentication
- Backend API / database
- Real-time collaboration
- Paid content or subscriptions
- AI-powered features (tutor, code execution)
- Mobile native apps
- Certification issuance
- Enterprise SSO

---

## 7. Success Metrics (Platform Level)

| Metric           | 3 Month | 6 Month | 12 Month |
| ---------------- | ------- | ------- | -------- |
| GitHub Stars     | 500     | 2,000   | 10,000   |
| Monthly Visitors | 5,000   | 20,000  | 100,000  |
| Contributors     | 10      | 30      | 100      |
| Content Pages    | 200     | 500     | 1,500    |
| Tools Cataloged  | 100     | 200     | 500      |

---

## 8. Constraints

- **No backend**: Everything static, deployed on GitHub Pages
- **No paid services**: All infrastructure must be free-tier compatible
- **Markdown-first**: All content authored in Markdown/MDX
- **Git-based workflow**: Content review via PRs
- **Open source**: MIT or Apache-2.0 license
- **Single repo**: Monorepo for v1 (evaluated in architecture doc)
