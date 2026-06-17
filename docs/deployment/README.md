# Deployment

AIByDM deploys as a static Next.js export on GitHub Pages.

## Hosting Model

- Host: GitHub Pages
- Source: GitHub Actions
- Live URL: <https://dipakmandlik.github.io/AIByDM/>
- Build output: `out/`

## Environment Variables

| Variable | Purpose | Default |
| --- | --- | --- |
| `BASE_PATH` | GitHub Pages route base | `/AIByDM` |

## Workflow

1. Push to `main`.
2. `validate.yml` runs `npm ci`, `npm run typecheck`, `npm run lint`, and `npm run build`.
3. `deploy.yml` repeats the quality gates and uploads `out/` to GitHub Pages.
4. GitHub Pages publishes the generated static files.

## Manual Verification

After deployment, verify the representative production routes listed in [README.md](../../README.md#smoke-routes). Also check mobile navigation, Command-K search, visible focus states, and reduced-motion behavior.

## Release Workflow

- `release.yml` publishes GitHub releases from semantic version tags.
- `.github/release.yml` controls generated release note categories.
