# AIByDM Architecture

AIByDM is a static-first open-source platform designed for learner clarity, contributor velocity,
and low-friction deployment.

## Architecture Principles

- Prefer static delivery for reliability and simplicity.
- Use interactivity where it improves learning, not by default.
- Keep content in-repo so contributors can improve it through normal Git workflows.
- Treat documentation and community operations as part of the system architecture.

## System Overview

```mermaid
flowchart LR
    Contributors[Contributors] --> GitHub[GitHub Repository]
    GitHub --> Issues[Issues and Discussions]
    GitHub --> PRs[Pull Requests]
    GitHub --> Actions[GitHub Actions]
    Content[MDX, YAML, JSON, TS Catalogs] --> Astro[Astro App]
    React[React Islands] --> Astro
    Astro --> Build[Static Build]
    Actions --> Validate[Validate and Security Checks]
    Actions --> Deploy[Pages Deployment]
    Build --> Pages[GitHub Pages]
    Deploy --> Pages
```

## Current Implementation Snapshot

As of 2026-06-16, the Learn platform is the most mature module in the repo and is implemented as
a hybrid Astro, React, and TypeScript catalog system.

| Area           | Current repo state                                                                                                                                                                                                   |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Curriculum     | `src/data/learn/catalog.ts` defines 17 tracks across core, builder, systems, and enterprise stages.                                                                                                                  |
| Routes         | Learn currently ships `/learn/`, `/learn/catalog/`, `/learn/roadmap/`, `/learn/resources/`, `/learn/glossary/`, `/learn/[track]/`, `/learn/[track]/[lesson]/`, `/learn/[track]/projects/[project]/`, and `/search/`. |
| Learning UI    | `src/components/learn/` contains the dashboard, control center, roadmap, lesson rail, progress panel, and search experience.                                                                                         |
| Progress state | `src/data/learn/progress.ts` stores lesson completion, module completion, streaks, recents, and last-visited state in local storage.                                                                                 |
| Scale          | The current Learn catalog generates 136 lesson routes and 68 project routes inside a 234-page static build.                                                                                                          |

Authored MDX content in `src/content/learn/` is still supported, but it now acts as an enrichment
layer for selected lessons rather than the only Learn source of truth.

## Core Layers

| Layer               | Responsibility                                                    |
| ------------------- | ----------------------------------------------------------------- |
| Astro routes        | Static shell, page composition, metadata, and route generation    |
| React islands       | Search, progress tracking, and interactive product surfaces       |
| Content collections | Learning lessons, tools, exams, games, and newsletter entries     |
| TypeScript catalogs | Structured learning roadmaps, stage metadata, and search indexes  |
| GitHub workflows    | Validation, deployment, security scanning, and release automation |
| Community docs      | Contribution flow, support, governance, and roadmap communication |

## Repository Map

| Path              | Role                                                  |
| ----------------- | ----------------------------------------------------- |
| `src/pages/`      | User-facing routes                                    |
| `src/components/` | Astro and React UI building blocks                    |
| `src/content/`    | Authored platform content                             |
| `src/data/`       | Structured catalog and search data                    |
| `src/styles/`     | Global tokens and styling primitives                  |
| `.github/`        | Automation, templates, and repository operations      |
| `docs/`           | Public documentation for contributors and maintainers |

## Detailed Architecture Docs

The long-form architecture pack lives in [docs/architecture/README.md](./docs/architecture/README.md).
It includes product requirements, information architecture, design system notes, deployment, search,
content architecture, and implementation planning.
