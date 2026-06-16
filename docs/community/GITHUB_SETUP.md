# GitHub Setup Checklist

Use this checklist to keep AIByDM aligned with its flagship open-source positioning.

## Repository Identity

- Repository display name: `AIByDM`
- Tagline: `Learn AI. Build AI. Master AI.`
- Description:
  `Open-source AI learning platform featuring structured learning paths, projects, roadmaps, AI tools, challenges, exams, and community-driven learning.`
- Website URL: `https://dipakmandlik.github.io/AIByDM/`

## Topics

Apply these repository topics:

- `ai`
- `artificial-intelligence`
- `machine-learning`
- `deep-learning`
- `llm`
- `rag`
- `agents`
- `learning-platform`
- `education`
- `open-source`
- `developer-tools`
- `genai`
- `ai-engineering`
- `transformers`
- `prompt-engineering`
- `mlops`
- `roadmap`
- `career-development`
- `opensource-community`
- `github-pages`

## GitHub Pages

1. Keep the Pages source on `GitHub Actions`.
2. Confirm the live URL is `https://dipakmandlik.github.io/AIByDM/`.
3. Validate that the deploy workflow publishes after pushes to `main`.

## Repository Features

- Enable Issues.
- Enable Discussions.
- Enable Projects if the team wants roadmap boards in GitHub.
- Keep the wiki disabled unless the team is ready to maintain two documentation surfaces.

## Branch Protection

Apply protection to `main`:

- Require pull requests for normal community contributions.
- Require at least one approval.
- Require CODEOWNERS review when applicable.
- Require status checks:
  - `Validate / validate`
  - `CodeQL / Analyze JavaScript and TypeScript`
  - `Dependency Review / dependency-review`
- Prevent force pushes and branch deletion.

## Labels and Triage

Recommended labels:

- `good first issue`
- `help wanted`
- `status:needs-triage`
- `status:blocked`
- `status:ready-for-review`
- `type:bug`
- `type:feature`
- `type:docs`
- `type:content`
- `type:tool`
- `type:exam`
- `type:game`
- `dependencies`
- `security`

## Discussions Categories

Recommended categories:

- Announcements
- Ideas
- Q and A
- Show and Tell
- Contributor Help

## Release Operations

1. Keep `CHANGELOG.md` updated.
2. Tag semantic versions such as `v0.1.0`.
3. Let the release workflow publish GitHub releases from tags.
4. Review generated release notes before major announcements.

## Maintainer Routine

1. Keep the README screenshots and demo assets current.
2. Confirm About section, website, and topics stay accurate.
3. Pin contributor entry-point docs when useful.
4. Make contributor recognition part of release follow-up.
