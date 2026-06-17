# Development

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local Next dev server |
| `npm run lint` | Run ESLint against app, components, hooks, and content data |
| `npm run typecheck` | Run TypeScript with `tsc --noEmit` |
| `npm run build` | Build the static export into `out/` |

## Development Workflow

1. Work from `main` unless maintainers request a branch.
2. Keep changes scoped to one product area or shared system concern.
3. Update `lib/content.ts` when adding learning paths, lessons, projects, tools, games, exams, or issues.
4. Preserve explicit slugs and route helpers for stable URLs.
5. Validate locally before pushing.

## Quality Gates

- `npm run typecheck` must pass.
- `npm run lint` must pass.
- `npm run build` must produce `out/` successfully.
- UI changes should be checked at desktop, tablet, and 375px mobile widths.
- Command-K search, mobile navigation, Escape close behavior, focus rings, and reduced-motion behavior should remain working.

## Static Export Rules

Do not add server-only features unless the hosting model changes. Avoid server actions, database reads, dynamic API routes, middleware-only behavior, and Next image optimization. The app must keep working as static files on GitHub Pages.

## Release Management

- Update `CHANGELOG.md` for notable platform, content, or deployment changes.
- Pushes to `main` trigger validation and Pages deployment.
- Semantic version tags can be published through the release workflow.
