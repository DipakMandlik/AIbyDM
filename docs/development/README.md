# Development

## Commands

| Command             | Purpose                             |
| ------------------- | ----------------------------------- |
| `pnpm dev`          | Start local development             |
| `pnpm build`        | Create a production build           |
| `pnpm preview`      | Preview the production build        |
| `pnpm check`        | Run Astro checks                    |
| `pnpm lint`         | Run code formatting and lint checks |
| `pnpm lint:content` | Lint Markdown and MDX content       |
| `pnpm validate`     | Run the full validation pipeline    |

## Development Workflow

1. Work from `main`.
2. Create a focused branch.
3. Keep changes scoped and reviewable.
4. Validate locally.
5. Open a PR with context and screenshots.

## Quality Gates

- Astro checks must pass.
- ESLint and Prettier must pass.
- Markdown and MDX content should stay clean.
- GitHub Actions should remain green for validation, deployment, and security workflows.

## Release Management

- Update `CHANGELOG.md` for notable project changes.
- Tag releases with semantic version tags such as `v0.1.0`.
- GitHub release notes are grouped through `.github/release.yml`.
