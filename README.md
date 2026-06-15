# AIByDM

**Learn AI. Build AI. Master AI.**

[![Validate](https://github.com/DipakMandlik/AIbyDM/actions/workflows/validate.yml/badge.svg)](https://github.com/DipakMandlik/AIbyDM/actions/workflows/validate.yml)
[![CodeQL](https://github.com/DipakMandlik/AIbyDM/actions/workflows/codeql.yml/badge.svg)](https://github.com/DipakMandlik/AIbyDM/actions/workflows/codeql.yml)
[![Deploy to GitHub Pages](https://github.com/DipakMandlik/AIbyDM/actions/workflows/deploy.yml/badge.svg)](https://github.com/DipakMandlik/AIbyDM/actions/workflows/deploy.yml)

AIByDM is a free, open-source, community-driven AI Engineering learning platform. From fundamentals to production — learn through structured tracks, curated tools, interactive games, exam preparation, and curated newsletters.

## Modules

| Module         | Description                                              |
| -------------- | -------------------------------------------------------- |
| **Learn**      | 16 structured tracks from Python basics to Enterprise AI |
| **Tools**      | Curated directory of 100+ open-source AI tools           |
| **Games**      | Interactive games and challenges to learn AI concepts    |
| **Exams**      | Free exam preparation with 500+ questions and mock tests |
| **Newsletter** | Curated AI engineering updates and resources             |

## Tech Stack

- [Astro](https://astro.build) — Static site generation with islands architecture
- [React](https://react.dev) — Interactive components (games, quizzes, search)
- [Tailwind CSS](https://tailwindcss.com) — Utility-first styling with dark mode
- [Pagefind](https://pagefind.app) — Client-side static search
- [MDX](https://mdxjs.com) — Markdown with components
- GitHub Pages — Free hosting

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) v22+
- [pnpm](https://pnpm.io) v10.33.0+

### Development

```bash
# Clone the repository
git clone https://github.com/DipakMandlik/AIbyDM.git
cd aibydm

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

### Available Scripts

| Command             | Description                          |
| ------------------- | ------------------------------------ |
| `pnpm dev`          | Start dev server at `localhost:4321` |
| `pnpm build`        | Build production site to `dist/`     |
| `pnpm preview`      | Preview production build locally     |
| `pnpm check`        | Run Astro type checking              |
| `pnpm lint`         | Run ESLint + Prettier checks         |
| `pnpm lint:content` | Lint markdown content                |
| `pnpm format`       | Format all files with Prettier       |

## Contributing

We welcome contributions from everyone! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Quick Start for Content Contributors

1. Fork this repository
2. Add your content in `src/content/`
3. Follow the templates in `templates/`
4. Submit a Pull Request

No coding required for content contributions — just write Markdown.

## Open Source & Community

- [Contribution Guide](CONTRIBUTING.md) — setup, branch naming, PR flow, and review process
- [Support](SUPPORT.md) — where to ask questions or report problems
- [Governance](GOVERNANCE.md) — maintainer roles and decision making
- [Maintainers](MAINTAINERS.md) — ownership areas and expected reviewer teams
- [Security Policy](SECURITY.md) — private vulnerability reporting process
- [GitHub Setup Checklist](docs/community/GITHUB_SETUP.md) — repository settings for maintainers
- [GitHub Discussions](https://github.com/DipakMandlik/AIbyDM/discussions) — ideas, questions, and community help

## Project Structure

```
src/
├── components/     # UI components (Astro + React islands)
├── content/        # All content (MDX, YAML, JSON)
│   ├── learn/      # Learning tracks and topics
│   ├── tools/      # Tool directory entries
│   ├── exams/      # Exam question banks
│   ├── games/      # Game configurations
│   └── newsletter/ # Newsletter issues
├── data/           # Schemas, constants, utilities
├── layouts/        # Page layout templates
├── pages/          # File-based routing
└── styles/         # Global CSS and Tailwind
```

## Roadmap

- [x] Phase 1: Learning Platform
- [x] Phase 2: Tool Directory
- [ ] Phase 3: Game Zone
- [ ] Phase 4: Exam Preparation
- [ ] Phase 5: Community & Newsletter
- [ ] Phase 6: AI Tutor (future)

## License

MIT License — see [LICENSE](LICENSE).

## Community

- [GitHub Discussions](https://github.com/DipakMandlik/AIbyDM/discussions)
- [Contributing Guide](CONTRIBUTING.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Support](SUPPORT.md)
- [Governance](GOVERNANCE.md)
- [Security Policy](SECURITY.md)

---

Built with love by the AIByDM community.
