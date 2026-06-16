# Contributing to AIByDM

AIByDM is built for contributors. Whether you write curriculum, add tool entries, improve the UI,
ship new workflows, or review pull requests, there is a clear path to help.

## Contribution Lanes

### Content

- Add or improve learning lessons.
- Expand tool entries and comparisons.
- Write exam questions and explanations.
- Draft newsletter issues and editorial summaries.

### Product and Code

- Improve Astro and React experiences.
- Build search, progress, and future lab workflows.
- Refine responsive layout, accessibility, and interactions.
- Strengthen CI, release, and deployment workflows.

### Community and Docs

- Improve onboarding docs.
- Triage issues and propose roadmap clarifications.
- Review screenshots, README polish, and release notes.
- Help shape contributor recognition and governance processes.

## Quick Start

```bash
git clone https://github.com/DipakMandlik/AIbyDM.git
cd AIbyDM
pnpm install
pnpm dev
```

Before you open a pull request, run:

```bash
pnpm validate
```

## Repository Workflow

1. Find or open an issue.
2. Comment before starting larger work so maintainers can confirm scope.
3. Create a focused branch from `main`.
4. Make the smallest complete change that solves the problem well.
5. Run validation locally.
6. Open a pull request with context, screenshots, and linked issues when relevant.

## Branch Naming

Use a short branch name that describes the work.

```text
feature/learn-search
fix/mobile-nav
docs/open-source-readme
content/add-rag-lesson
```

## Commit Messages

Use clear, scoped commit messages.

```text
feat: add exams repository landing page
fix: correct footer navigation links
docs: rewrite open source onboarding guides
content: add python foundations lesson
```

## What Good Contributions Look Like

### For Content

- Keep explanations practical and clear.
- Prefer examples that connect learning to real AI workflows.
- Include accurate metadata, tags, and summaries.
- Keep files small enough to review comfortably.

### For Code

- Preserve the static-first architecture unless interactivity is necessary.
- Use React only for interactive islands.
- Follow the existing design tokens and layout language.
- Keep accessibility and mobile behavior in scope.

### For Docs

- Write for first-time contributors as well as maintainers.
- Link to the exact file or workflow a contributor should read next.
- Prefer concrete steps over abstract guidance.

## Content System

If you are contributing platform content, start here:

- [docs/content-system/README.md](./docs/content-system/README.md)
- [docs/design-system/README.md](./docs/design-system/README.md)
- [docs/architecture/08-Content-Architecture.md](./docs/architecture/08-Content-Architecture.md)

## Pull Request Checklist

Before requesting review, make sure your change:

- Solves one clear problem or completes one clear slice of work.
- Includes screenshots for UI or README updates.
- Updates docs if behavior or workflow changed.
- Passes `pnpm validate`.
- Does not include secrets, local build output, or unrelated edits.

## Good First Issues

New contributors should look for:

- `good first issue`
- `help wanted`
- `type:docs`
- `type:content`

If you do not see a good fit yet, open a discussion in
[GitHub Discussions](https://github.com/DipakMandlik/AIbyDM/discussions).

## Review Expectations

- Focus on correctness, clarity, and contributor experience.
- Keep review comments actionable and respectful.
- Smaller PRs move faster than broad refactors.
- Maintainers aim to respond quickly, but AIByDM is still volunteer-led.

## Release and Changelog Process

- Update `CHANGELOG.md` whenever a change materially affects contributors, product surface, or deployment.
- Version tags follow semantic versioning, starting with `v0.1.0` for the first public release.
- GitHub release notes are grouped through `.github/release.yml`.

## Community Standards

By participating, you agree to follow the [Code of Conduct](./CODE_OF_CONDUCT.md).

If you need help, start with [SUPPORT.md](./SUPPORT.md) or [COMMUNITY.md](./COMMUNITY.md).
