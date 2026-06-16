# AIByDM — Deployment Architecture

**Version:** 1.0
**Date:** 2026-06-15
**Status:** Draft

---

## 1. Deployment Target

**Primary:** GitHub Pages (free, reliable, CDN-backed)

**Custom Domain (future):** `aibydm.dev` or `aibydm.org`

---

## 2. CI/CD Pipeline

### Main Deployment Pipeline (`deploy.yml`)

```
Trigger: Push to main branch

┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│  Checkout │ →  │ Install  │ →  │  Build   │ →  │ Validate │ →  │  Deploy  │
│           │    │  (pnpm)  │    │ (astro)  │    │          │    │ (Pages)  │
└──────────┘    └──────────┘    └──────────┘    └──────────┘    └──────────┘
                                                     │
                                         ┌───────────┼───────────┐
                                         │           │           │
                                    Link Check   Lighthouse   HTML Valid
```

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm check # TypeScript + Astro checks
      - run: pnpm build # Astro static build
      - run: pnpm postbuild # Pagefind index, sitemap validation
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist/

  validate:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/download-artifact@v4
      - name: Check broken links
        uses: lycheeverse/lychee-action@v1
        with:
          args: '--no-progress dist/'
          fail: true
      - name: Lighthouse audit
        uses: treosh/lighthouse-ci-action@v11
        with:
          urls: |
            https://dipakmandlik.github.io/AIByDM/
            https://dipakmandlik.github.io/AIByDM/learn/
            https://dipakmandlik.github.io/AIByDM/tools/
          budgetPath: .github/lighthouse-budget.json

  deploy:
    needs: [build, validate]
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

### PR Preview Pipeline (`preview.yml`)

```yaml
# .github/workflows/preview.yml
name: PR Preview

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  preview:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
      - name: Deploy preview
        uses: rossjrw/pr-preview-action@v1
        with:
          source-dir: dist/
      - name: Comment preview URL
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: '🔗 Preview: https://dipakmandlik.github.io/AIByDM/pr-preview/pr-${{ github.event.number }}/'
            })
```

### Content Validation Pipeline (`validate.yml`)

```yaml
# .github/workflows/validate.yml
name: Validate

on:
  pull_request:
    paths:
      - 'src/content/**'
      - 'src/components/**'
      - 'src/pages/**'

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint # ESLint
      - run: pnpm lint:content # markdownlint + Vale
      - run: pnpm check # Astro type check
      - run: pnpm build # Ensure build succeeds
```

---

## 3. Build Optimization

| Strategy               | Implementation                                       | Impact                |
| ---------------------- | ---------------------------------------------------- | --------------------- |
| **Build caching**      | GitHub Actions cache for `node_modules` and `.astro` | 60% faster CI         |
| **Content caching**    | Astro content cache between builds                   | Incremental rebuilds  |
| **Asset hashing**      | Vite output hashing for immutable caching            | CDN cache hits        |
| **Image optimization** | Astro `<Image>` at build time → WebP/AVIF            | 50-80% smaller images |
| **CSS purging**        | Tailwind JIT removes unused classes                  | < 15KB CSS            |
| **Font subsetting**    | Latin subset only                                    | 70% smaller fonts     |

### Target Build Times

| Content Scale | Build Time | Strategy                          |
| ------------- | ---------- | --------------------------------- |
| 200 pages     | < 30s      | Default Astro build               |
| 500 pages     | < 90s      | Content caching                   |
| 1,500 pages   | < 3min     | Parallel content processing       |
| 5,000+ pages  | < 5min     | Consider Astro incremental builds |

---

## 4. SEO Implementation

### Per-Page SEO

```html
<!-- Generated by BaseLayout.astro -->
<title>{title} | AIByDM</title>
<meta name="description" content="{description}" />
<meta name="robots" content="index, follow" />
<link rel="canonical" href="{canonical_url}" />

<!-- Open Graph -->
<meta property="og:type" content="article" />
<meta property="og:title" content="{title}" />
<meta property="og:description" content="{description}" />
<meta property="og:image" content="{og_image}" />
<meta property="og:url" content="{url}" />
<meta property="og:site_name" content="AIByDM" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="{title}" />
<meta name="twitter:description" content="{description}" />
<meta name="twitter:image" content="{og_image}" />

<!-- Structured Data -->
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article", // or "Course", "SoftwareApplication" for tools
    "headline": "{title}",
    "author": { "@type": "Organization", "name": "AIByDM" },
    "datePublished": "{date}",
    "dateModified": "{modified}",
    "description": "{description}"
  }
</script>
```

### Sitewide SEO

| Asset         | Generation                           | Purpose                    |
| ------------- | ------------------------------------ | -------------------------- |
| `sitemap.xml` | Astro `@astrojs/sitemap`             | All page URLs for crawlers |
| `robots.txt`  | Static + dynamic                     | Crawl rules                |
| `rss.xml`     | Generated from newsletter collection | RSS feed                   |
| `_headers`    | Static file                          | Security + cache headers   |

### robots.txt

```
User-agent: *
Allow: /
Sitemap: https://dipakmandlik.github.io/AIByDM/sitemap.xml

# Block non-content paths
Disallow: /api/
Disallow: /_astro/
```

---

## 5. Analytics

### Recommended: Plausible Analytics (self-hosted or cloud)

| Feature     | Plausible                       | Google Analytics        |
| ----------- | ------------------------------- | ----------------------- |
| Privacy     | GDPR/CCPA compliant, no cookies | Requires cookie consent |
| Performance | 1KB script                      | 45KB script             |
| Open source | Yes                             | No                      |
| Real-time   | Yes                             | Yes                     |
| Cost        | Free (self-hosted) or $9/mo     | Free                    |

**Decision:** Start with Plausible Cloud ($9/month) or self-hosted. Fallback: Umami (fully free, self-hosted).

**For v1 (zero cost):** Use `@vercel/analytics` with Astro adapter, or skip analytics until traffic warrants it. GitHub Pages traffic can be estimated from GitHub repository insights.

### Key Metrics to Track

- Page views per module
- Popular learn topics
- Tool page views (signals demand)
- Game session duration
- Exam completion rates
- Search queries (logged client-side)

---

## 6. Performance Monitoring

### Lighthouse CI Budget

```json
{
  "ci": {
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "categories:accessibility": ["error", { "minScore": 0.9 }],
        "categories:best-practices": ["error", { "minScore": 0.9 }],
        "categories:seo": ["error", { "minScore": 0.95 }],
        "first-contentful-paint": ["error", { "maxNumericValue": 1500 }],
        "largest-contentful-paint": ["error", { "maxNumericValue": 2500 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.05 }]
      }
    }
  }
}
```

---

## 7. Environment Strategy

| Environment    | URL                                                | Deploy Trigger    | Purpose     |
| -------------- | -------------------------------------------------- | ----------------- | ----------- |
| **Production** | `dipakmandlik.github.io/AIByDM/`                   | Push to `main`    | Live site   |
| **Preview**    | `dipakmandlik.github.io/AIByDM/pr-preview/pr-{N}/` | PR opened/updated | PR review   |
| **Local**      | `localhost:4321`                                   | `pnpm dev`        | Development |
