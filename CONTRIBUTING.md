# Contributing to AIByDM

Thank you for your interest in contributing to AIByDM! This guide will help you get started.

## Ways to Contribute

### Content (No Coding Required)

- **Learning Topics** — Write educational content for any track
- **Tool Entries** — Add or update AI tool listings
- **Exam Questions** — Create MCQs with explanations
- **Newsletter Issues** — Write curated AI updates

### Code

- **Bug Fixes** — Fix issues from the issue tracker
- **Features** — Implement new functionality
- **Games** — Build interactive learning games
- **UI/UX** — Improve design and accessibility

### Other

- **Review** — Review PRs for accuracy and quality
- **Triage** — Help categorize and prioritize issues
- **Documentation** — Improve guides and docs

## Getting Started

### Prerequisites

- Node.js v22+
- pnpm v10.33.0+

### Setup

```bash
git clone https://github.com/DipakMandlik/AIByDM.git
cd aibydm
pnpm install
pnpm dev
```

Before opening a pull request, run the local validation command:

```bash
pnpm validate
```

### Project Structure

```
src/content/    — All authored content (MDX, YAML, JSON)
src/components/ — UI components (Astro + React)
src/layouts/    — Page layout templates
src/pages/      — File-based routing
templates/      — Templates for new content
```

## Content Contribution Guide

### Adding a Learn Topic

1. Copy `templates/learn-topic.mdx` to `src/content/learn/<track>/`
2. Fill in all frontmatter fields
3. Write content following the section structure
4. Submit a PR

### Adding a Tool

1. Copy `templates/tool-entry.yaml` to `src/content/tools/`
2. Fill in all fields
3. Add tool logo (SVG preferred) to `public/logos/`
4. Submit a PR

### Adding Exam Questions

1. Add questions to the relevant JSON file in `src/content/exams/`
2. Follow the question schema (id, question, options, correct, explanation)
3. Submit a PR

## Code Contribution Guide

### Finding Work

1. Look for issues labeled `good first issue`, `help wanted`, or a module label
   such as `type:content`, `type:tool`, `type:game`, or `type:docs`.
2. Comment on the issue before starting larger work so maintainers can confirm
   the approach.
3. For major features or architecture changes, start with a GitHub Discussion or
   proposal issue before writing code.

### Branch Naming

```
<type>/<short-description>

Types: feature, content, fix, docs, chore, game, exam, tool
Example: content/add-transformer-basics
```

### Commit Messages

Write clear, concise commit messages:

```
feat: add quiz engine component
content: add supervised learning topic
fix: resolve mobile nav overflow
docs: update contributing guide
```

### Pull Request Process

1. Create a branch from `main`
2. Make your changes
3. Run `pnpm validate`
4. Submit a PR using the PR template
5. Wait for review (aim for 48h first response)

### Pull Request Expectations

- Keep PRs focused on one content area, bug, or feature when possible.
- Link the related issue with `Fixes #123` or `Refs #123`.
- Include screenshots for visual changes.
- Do not include secrets, private data, or generated build output.
- Be ready to make revisions after review.

## Code Style

- **TypeScript** — Strict mode, no `any`
- **Astro** — Prefer `.astro` components for static content
- **React** — Use for interactive islands only
- **CSS** — Tailwind utility classes, reference design tokens
- **Formatting** — Prettier handles this; run `pnpm format`

## Review Process

- Content PRs need 1 approval
- Code, CI, and architecture PRs need maintainer approval
- All PRs must pass CI checks
- CODEOWNERS will request reviewers by area once GitHub teams are configured

## Issue Triage

Maintainers and reviewers use these labels to route work:

- `status:needs-triage` for new issues that need review
- `good first issue` for beginner-friendly contribution tasks
- `help wanted` for community-ready work
- `type:bug`, `type:feature`, `type:content`, `type:docs`, `type:tool`,
  `type:exam`, and `type:game` for area classification

## Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## Questions?

Open a [GitHub Discussion](https://github.com/DipakMandlik/AIByDM/discussions) for questions or ideas.
