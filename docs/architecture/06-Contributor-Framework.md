# AIByDM — Contributor Framework

**Version:** 1.0
**Date:** 2026-06-15
**Status:** Draft

---

## 1. Contribution Types

| Type                 | Skill Required        | Complexity | Files Touched                       |
| -------------------- | --------------------- | ---------- | ----------------------------------- |
| **Content Writing**  | AI knowledge, writing | Low-Medium | `src/content/learn/*.mdx`           |
| **Tool Submission**  | Tool evaluation       | Low        | `src/content/tools/*.yaml`          |
| **Exam Questions**   | Subject expertise     | Low        | `src/content/exams/*.json`          |
| **Bug Fixes**        | Frontend dev          | Medium     | `src/components/**`                 |
| **New Features**     | React + Astro         | High       | Multiple directories                |
| **Game Development** | React, game design    | High       | `src/components/games/`             |
| **Design**           | UI/UX, CSS            | Medium     | `src/styles/`, `src/components/ui/` |
| **Translation**      | Language skills       | Low        | `src/content/` (future)             |
| **Documentation**    | Technical writing     | Low        | `docs/`, `README.md`                |
| **Review**           | Subject expertise     | Medium     | PR reviews                          |

---

## 2. Getting Started Guide

### For Content Contributors (No Code Required)

```
1. Fork the repository
2. Navigate to src/content/learn/<track>/
3. Copy templates/learn-topic.mdx
4. Write your content following the template structure
5. Submit a Pull Request
```

### For Tool Curators

```
1. Fork the repository
2. Copy templates/tool-entry.yaml
3. Fill in all fields for your tool
4. Add the tool logo to public/logos/ (SVG preferred)
5. Submit a Pull Request
```

### For Developers

```
1. Fork and clone the repository
2. pnpm install
3. pnpm dev (starts local dev server)
4. Make your changes
5. pnpm check (type check + lint)
6. Submit a Pull Request
```

---

## 3. Issue Templates

### Bug Report (`bug_report.yml`)

```yaml
name: Bug Report
description: Report a broken feature or display issue
labels: ['type:bug', 'status:needs-triage']
body:
  - type: dropdown
    attributes:
      label: Module
      options: [Learn, Tools, Games, Exams, Newsletter, Homepage, Other]
  - type: textarea
    attributes:
      label: What happened?
      description: Clear description of the bug
  - type: textarea
    attributes:
      label: Expected behavior
  - type: textarea
    attributes:
      label: Steps to reproduce
  - type: dropdown
    attributes:
      label: Browser
      options: [Chrome, Firefox, Safari, Edge, Mobile Safari, Mobile Chrome]
  - type: textarea
    attributes:
      label: Screenshots (if applicable)
```

### Content Request (`content_request.yml`)

```yaml
name: Content Request
description: Request a new learning topic, exam, or article
labels: ['type:content', 'status:needs-triage']
body:
  - type: dropdown
    attributes:
      label: Content Type
      options: [Learn Topic, Exam Questions, Newsletter Article, Game Idea]
  - type: input
    attributes:
      label: Topic/Title
  - type: dropdown
    attributes:
      label: Track (for Learn content)
      options:
        [
          Foundations,
          ML,
          DL,
          CV,
          NLP,
          Transformers,
          LLM,
          RAG,
          Agents,
          Security,
          Governance,
          Lineage,
          Metadata,
          LLMOps,
          Production AI,
          Enterprise AI,
        ]
  - type: textarea
    attributes:
      label: Description
      description: What should this content cover?
  - type: dropdown
    attributes:
      label: Difficulty
      options: [Beginner, Intermediate, Advanced]
```

### Tool Submission (`tool_submission.yml`)

```yaml
name: Tool Submission
description: Submit a new AI tool for the directory
labels: ['type:content', 'module:tools']
body:
  - type: input
    attributes:
      label: Tool Name
  - type: input
    attributes:
      label: GitHub Repository URL
  - type: input
    attributes:
      label: Official Website
  - type: dropdown
    attributes:
      label: Category
      options:
        [
          LLMs,
          Agents,
          RAG,
          Vector Databases,
          Prompt Engineering,
          Fine Tuning,
          Evaluation,
          Governance,
          Metadata,
          Lineage,
          MLOps,
          Data Engineering,
          Coding Assistants,
          Research,
          Image Gen,
          Video Gen,
          Audio Gen,
          Automation,
          Productivity,
          Development,
          Security,
          Observability,
        ]
  - type: textarea
    attributes:
      label: Description (1-2 sentences)
  - type: input
    attributes:
      label: License
  - type: checkboxes
    attributes:
      label: Checklist
      options:
        - label: Tool is open source or has a free tier
        - label: Tool is actively maintained (commits in last 6 months)
        - label: Tool is relevant to AI engineering
```

---

## 4. PR Template

```markdown
## What does this PR do?

<!-- Concise description of the change -->

## Type of Change

- [ ] Content (new topic, tool, exam questions)
- [ ] Bug fix
- [ ] New feature
- [ ] Enhancement
- [ ] Documentation
- [ ] Chore (CI, deps, config)

## Module

- [ ] Learn
- [ ] Tools
- [ ] Games
- [ ] Exams
- [ ] Newsletter
- [ ] Infrastructure / CI
- [ ] Other

## Checklist

- [ ] I've read the [Contributing Guide](CONTRIBUTING.md)
- [ ] Content follows the template structure
- [ ] No broken links (run `pnpm check:links`)
- [ ] Markdown passes linting (run `pnpm lint:content`)
- [ ] Code passes type checking (run `pnpm check`)
- [ ] Screenshots attached (for UI changes)

## Screenshots (if applicable)

<!-- Paste screenshots here -->
```

---

## 5. Review Process

### Content PRs

```
Contributor → Auto-checks (CI) → Content Reviewer → Merge
                                     ↓
                              Technical accuracy check
                              Formatting check
                              Link validation
                              1 approval required
```

### Code PRs

```
Contributor → Auto-checks (CI) → Code Reviewer → Core Maintainer → Merge
                                      ↓                  ↓
                               Code quality         Architecture
                               Tests pass           Performance
                               Type-safe            Security
                               2 approvals required
```

### Review SLAs

| PR Type         | First Response | Merge Target |
| --------------- | -------------- | ------------ |
| Content (small) | 48 hours       | 5 days       |
| Content (large) | 72 hours       | 10 days      |
| Bug fix         | 24 hours       | 3 days       |
| Feature         | 72 hours       | 14 days      |

---

## 6. Release Process

### Versioning: Calendar Versioning (CalVer)

Format: `YYYY.MM.PATCH` (e.g., `2026.06.1`)

**Rationale:** Content platforms don't have "breaking changes" in the SemVer sense. CalVer communicates recency, which matters more for a learning platform.

### Release Cadence

| Type            | Frequency | Trigger                        |
| --------------- | --------- | ------------------------------ |
| Content release | Weekly    | Accumulated content PRs        |
| Feature release | Bi-weekly | Feature branch merged          |
| Hotfix          | As needed | Critical bug or broken content |

### Release Process

```
1. develop passes all checks
2. Create release PR: develop → main
3. Update CHANGELOG.md
4. Tag with CalVer
5. GitHub Actions auto-deploys to Pages
6. Announce in GitHub Discussions
```

---

## 7. Contributor Recognition

### Levels

| Level           | Criteria                     | Badge                   | Perks                          |
| --------------- | ---------------------------- | ----------------------- | ------------------------------ |
| **Contributor** | 1+ merged PR                 | Bronze badge on profile | Listed in Contributors section |
| **Regular**     | 5+ merged PRs                | Silver badge            | Can review content PRs         |
| **Maintainer**  | 15+ PRs + consistent quality | Gold badge              | Write access, can merge        |
| **Core**        | Invited by team              | Platinum badge          | Admin access, roadmap input    |

### Recognition Methods

- **Contributors page** on the website (auto-generated from git history)
- **GitHub Discussions** shout-outs for notable contributions
- **README** all-contributors bot integration
- **Release notes** mention contributors per release
- **Annual** top contributor spotlight

---

## 8. Community Guidelines

### Code of Conduct

Adopt the [Contributor Covenant v2.1](https://www.contributor-covenant.org/version/2/1/code_of_conduct/).

### Communication Channels

| Channel            | Purpose                                         |
| ------------------ | ----------------------------------------------- |
| GitHub Issues      | Bug reports, feature requests, content requests |
| GitHub Discussions | Q&A, ideas, show & tell, announcements          |
| GitHub Projects    | Roadmap tracking, sprint boards                 |

### Decision Making

| Decision Type    | Process                                       |
| ---------------- | --------------------------------------------- |
| Content accuracy | Subject matter expert review                  |
| Architecture     | RFC in GitHub Discussions → Core team vote    |
| Tool inclusion   | Meets criteria checklist → 1 curator approval |
| Roadmap          | Core team + community input via Discussions   |

---

## 9. Maintainer Guide

### Daily

- Triage new issues (apply labels, assign)
- Review content PRs (aim for 48h first response)
- Monitor CI failures

### Weekly

- Review and merge accumulated content PRs
- Update project board
- Respond to Discussions threads

### Monthly

- Cut a release
- Update CHANGELOG
- Review contributor applications
- Audit open issues (close stale)

### Quarterly

- Roadmap review
- Dependency updates
- Performance audit
- Accessibility audit
