# AIByDM Releases

AIByDM uses semantic versioning for public platform milestones. Pre-1.0 releases may still change content structure and contributor workflows, but release notes should make those changes clear.

## v0.1.0 - AIByDM Platform Foundation

Release date: 2026-06-17

### Summary

AIByDM v0.1.0 establishes the open-source platform foundation: a static Next.js learning platform, public documentation, GitHub Pages deployment, community workflows, and a repository presentation layer ready for learners and contributors.

### Highlights

- Next.js App Router platform configured for static export and GitHub Pages.
- Learning, tools, games, exams, newsletter, community, and search surfaces.
- AI From Scratch curriculum foundation with generated lesson data.
- Public roadmap with nine platform phases.
- Repository maturity assets: README, screenshots, demo directory, architecture docs, community docs, and release workflow.
- Open-source operations: issue templates, PR template, Code of Conduct, Security, Support, Governance, Maintainers, and GitHub setup checklist.

### Migration Notes

- Node.js `22.12.0+` is required.
- npm is the supported package manager for current workflows.
- Local routes use the `/AIByDM` base path by default.
- Builds export static output to `out/` for GitHub Pages.
- Contributors should run `npm run typecheck`, `npm run lint`, and `npm run build` before opening pull requests.

### Known Follow-Ups

- Keep screenshot assets current with the production site.
- Publish the first public demo video and preview GIF.
- Expand good first issues and contributor recognition after public launch.
- Continue deepening AI From Scratch lessons, tool coverage, games, and exams.

### Future Roadmap

The next milestones are tied to the public roadmap:

1. AI Learning Platform depth and progression.
2. Tools Directory curation and submission workflow.
3. Games Platform practice loops.
4. Certification Center readiness paths.
5. Newsletter release and learning signal.
6. Community rituals and contributor growth.
7. AI Tutor guidance layer.
8. Interactive Labs.
9. Enterprise Academy.

## Release Process

1. Update `CHANGELOG.md` and this file.
2. Verify the repository presentation assets and README links.
3. Run local validation.
4. Commit the release notes.
5. Tag with `vMAJOR.MINOR.PATCH`.
6. Push the tag to trigger `.github/workflows/release.yml`.
7. Review the generated GitHub release and publish any launch announcement.
