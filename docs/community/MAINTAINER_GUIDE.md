# Maintainer Guide

This guide keeps AIByDM operating like a mature open-source platform.

## Weekly Routine

- Triage new issues and pull requests.
- Keep labels accurate and remove stale ambiguity.
- Answer unanswered GitHub Discussions or route them to issues.
- Check GitHub Actions for validation, deployment, CodeQL, and dependency review health.
- Review good first issues for clarity.

## Release Routine

1. Confirm `main` passes typecheck, lint, and build.
2. Update `CHANGELOG.md` and `RELEASES.md`.
3. Confirm screenshots and README links are current.
4. Tag semantic versions from a clean release commit.
5. Let `.github/workflows/release.yml` publish the GitHub release.
6. Post a Discussion announcement with contributor thanks.

## Review Standards

- Keep pull requests focused.
- Ask for screenshots for visual changes.
- Ask for docs updates when behavior or workflow changes.
- Prefer contributor coaching over silent rewrites.
- Protect static export compatibility unless the roadmap intentionally changes.

## Repository Settings

Repository metadata, topics, homepage, social preview, Pages settings, branch protection, and labels are tracked in [GITHUB_SETUP.md](./GITHUB_SETUP.md).
