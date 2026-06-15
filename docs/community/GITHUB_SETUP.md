# GitHub Setup Checklist

Use this checklist after pushing the repository to GitHub. Some collaboration
settings cannot be configured from repository files, so they must be enabled in
the GitHub UI.

## Repository Basics

1. Create the repository at `github.com/DipakMandlik/AIbyDM`.
2. Set the default branch to `main`.
3. Enable Issues, Discussions, Projects, and Wiki only if the team plans to use
   them.
4. Add the repository description: `Free open-source AI engineering learning platform.`
5. Add topics such as `ai`, `machine-learning`, `astro`, `education`,
   `open-source`, `llm`, and `rag`.

## GitHub Pages

1. Go to Settings -> Pages.
2. Set Source to `GitHub Actions`.
3. Confirm the `Deploy to GitHub Pages` workflow runs after pushes to `main`.

## Branch Protection

Create a branch protection rule or ruleset for `main`:

- Require a pull request before merging.
- Require at least 1 approval.
- Require review from Code Owners.
- Require status checks to pass before merging.
- Required checks:
  - `Validate / validate`
  - `CodeQL / Analyze JavaScript and TypeScript`
  - `Dependency Review / dependency-review`
- Require branches to be up to date before merging.
- Restrict force pushes and deletions.
- Allow squash merge as the default merge strategy.

## Collaborators and Code Owners

The current CODEOWNERS file routes all reviews to `@DipakMandlik` so it works in
a personal GitHub account. As the project grows, invite collaborators in
Settings -> Collaborators and update `.github/CODEOWNERS` with their usernames.

If AIByDM later moves into a GitHub organization, create teams such as:

- `maintainers`
- `content-reviewers`
- `tools-curators`
- `exam-reviewers`
- `game-developers`
- `newsletter-editors`
- `frontend-maintainers`

Then update `.github/CODEOWNERS` to use those teams and confirm GitHub resolves
all owners without warnings.

## Labels

Create labels for triage and automation:

- `status:needs-triage`
- `status:blocked`
- `status:ready-for-review`
- `good first issue`
- `help wanted`
- `type:bug`
- `type:feature`
- `type:content`
- `type:docs`
- `type:tool`
- `type:exam`
- `type:game`
- `dependencies`
- `github-actions`
- `security`

## Security

1. Enable Dependabot alerts.
2. Enable Dependabot security updates.
3. Enable private vulnerability reporting.
4. Confirm CodeQL analysis appears under Security -> Code scanning.

## Discussions

Enable GitHub Discussions and create starter categories:

- Announcements
- Ideas
- Q&A
- Show and Tell
- Contributor Help

## First Maintainer Tasks

1. Open a `good first issue` for a small content task.
2. Open a `help wanted` issue for a larger module task.
3. Pin `CONTRIBUTING.md`, `SUPPORT.md`, and the roadmap in Discussions or the
   repository sidebar.
4. Confirm a test PR triggers validation, CodeQL, dependency review, and
   CODEOWNERS review requests.
