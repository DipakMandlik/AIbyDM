# Architecture Documentation

This directory is the architecture hub for AIByDM. The top-level [ARCHITECTURE.md](../../ARCHITECTURE.md) gives the concise system overview; this page maps the major platform areas for contributors.

## Frontend

- Next.js App Router static export.
- Shared navigation, footer, hero, command search, and page shell components.
- Tailwind CSS 4 design tokens in `app/globals.css`.
- Static routes generated from typed content and route helpers.

## Content System

- Core platform catalogs live in `lib/content.ts`.
- AI From Scratch generated lesson data lives in `lib/generated/`.
- Route slugs are explicit and stable.
- Search data is derived from content metadata instead of a server-side index.

## Learning System

- Learning routes live under `app/learn/`.
- Track, phase, lesson, and project UI lives in `components/learn/`.
- AI From Scratch uses dedicated phase and lesson components for a deeper curriculum experience.

## Progress Tracking

- Progress is client-side and privacy-friendly.
- `hooks/use-learn-progress.ts` owns local learner state.
- Future synced progress should preserve static export compatibility or be introduced behind a clear architecture decision.

## Exam Engine

- Exam routes live under `app/exams/`.
- Exam content should remain reviewable, explainable, and tied to roles or learning outcomes.
- Future scoring should keep question metadata separated from UI presentation.

## Tools Platform

- Tool directory routes live under `app/tools/`.
- Tool discovery UI lives in `components/tools/`.
- New tool entries should include category, use case, pricing or license context, and alternatives where useful.

## Search System

- Search is client-side for GitHub Pages compatibility.
- Command search and `/search/` use the same content-driven index.
- Future search improvements should not require a hosted backend unless the roadmap explicitly changes.

## Deployment and GitHub Pages

- `next.config.mjs` exports static output to `out/`.
- `.github/workflows/validate.yml` runs quality gates.
- `.github/workflows/deploy.yml` publishes to GitHub Pages.
- Production URL: `https://dipakmandlik.github.io/AIByDM/`.

## Architecture Decision Rules

- Keep public routes static-export safe.
- Prefer typed content contracts over ad hoc string parsing.
- Keep contributor workflows GitHub-native.
- Document any future server, auth, or database dependency before adopting it.
