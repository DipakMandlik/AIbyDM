# AIByDM

AIByDM is a free, open-source AI learning platform built around structured learning paths, practical AI tools, learning games, exam prep, newsletter issues, and community contribution paths.

Live site: <https://dipakmandlik.github.io/AIByDM/>

## Platform Areas

- **Learn**: four guided v1 tracks: AI Foundations, Prompt Engineering, Building With LLMs, and AI Product Design.
- **Tools**: searchable AI tool discovery with detail pages, use cases, pricing notes, alternatives, and links.
- **Games**: focused practice loops connected back to related lessons.
- **Exams**: role-based preparation pages with staged prep and sample questions.
- **Newsletter**: issue archive and individual editorial pages.
- **Community**: contributor lanes, support paths, discussions, and open-source project links.

## Architecture

AIByDM is now a Next.js App Router static export designed for GitHub Pages.

| Layer | Technology |
| --- | --- |
| Framework | Next.js App Router |
| UI | React 19, TypeScript, Tailwind CSS 4 |
| Content | Typed modules in `lib/content.ts` |
| Icons | Lucide React |
| Hosting | GitHub Pages static export from `out/` |
| Package manager | npm |

The app is intentionally static-export compatible. It does not require a backend, auth service, database, server actions, or server search service.

## Repository Map

| Path | Purpose |
| --- | --- |
| `app/` | App Router pages and static routes |
| `components/landing/` | Homepage sections and decorative canvases |
| `components/learn/` | Learn landing and track experience |
| `components/site/` | Shared navigation, footer, hero, and search |
| `components/tools/` | Tool discovery UI |
| `components/ui/` | Shared low-level UI primitives |
| `hooks/` | Client hooks such as reduced-motion support |
| `lib/content.ts` | Typed content, route helpers, and search index |
| `.github/workflows/` | Validation and GitHub Pages deployment |

## Local Development

Prerequisites:

- Node.js `22.12.0+`
- npm `10+`

```bash
npm install
npm run dev
```

The local app uses the same GitHub Pages base path by default, so open:

```text
http://localhost:3000/AIByDM/
```

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local Next dev server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript with `tsc --noEmit` |
| `npm run build` | Build the static export into `out/` |

## Static Export

`next.config.mjs` is configured for GitHub Pages:

- `output: 'export'`
- `trailingSlash: true`
- `basePath: process.env.BASE_PATH ?? '/AIByDM'`
- `images.unoptimized: true`

The deployment workflow runs `npm ci`, typecheck, lint, build, and uploads `out/` to GitHub Pages.

## Smoke Routes

After a build or deployment, verify these representative routes:

- `/AIByDM/`
- `/AIByDM/learn/`
- `/AIByDM/learn/ai-foundations/`
- `/AIByDM/learn/ai-foundations/tokens-and-context/`
- `/AIByDM/learn/ai-foundations/projects/model-comparison-sheet/`
- `/AIByDM/tools/` and `/AIByDM/tools/qdrant/`
- `/AIByDM/games/` and `/AIByDM/games/prompt-golf/`
- `/AIByDM/exams/` and `/AIByDM/exams/ai-engineer/`
- `/AIByDM/newsletter/` and `/AIByDM/newsletter/agents-mainstream/`
- `/AIByDM/community/`
- `/AIByDM/search/`

## Contributing

Start with [CONTRIBUTING.md](./CONTRIBUTING.md), [docs/getting-started/README.md](./docs/getting-started/README.md), and [docs/development/README.md](./docs/development/README.md).

Before opening a pull request, run:

```bash
npm run typecheck
npm run lint
npm run build
```

## License

AIByDM is released under the [MIT License](./LICENSE).
