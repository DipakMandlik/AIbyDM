# Deployment

AIByDM deploys as a static site on GitHub Pages.

## Current Hosting Model

- Host: GitHub Pages
- Source: GitHub Actions workflow
- Live URL: <https://dipakmandlik.github.io/AIByDM/>

## Environment Variables

| Variable    | Purpose                        | Default                          |
| ----------- | ------------------------------ | -------------------------------- |
| `SITE_URL`  | Canonical site host            | `https://dipakmandlik.github.io` |
| `BASE_PATH` | Base path for Pages deployment | `/AIByDM`                        |

## Deployment Workflow

1. Push to `main`.
2. `validate.yml` checks build quality.
3. `deploy.yml` builds the site and publishes `dist/` to GitHub Pages.
4. The Pages environment exposes the live URL.

## Release Workflow

- `release.yml` creates GitHub releases from semantic version tags.
- `.github/release.yml` controls generated release note categories.

## Verification Checklist

- Confirm the live Pages URL responds.
- Confirm screenshots in the README still match the product.
- Confirm badges point to the correct repository workflows.
- Confirm docs links resolve on GitHub.
