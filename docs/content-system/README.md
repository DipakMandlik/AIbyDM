# Content System

AIByDM content is meant to be contributor-friendly and version-controlled.

## Content Areas

| Area             | Location                  | Format     |
| ---------------- | ------------------------- | ---------- |
| Learn lessons    | `src/content/learn/`      | MDX        |
| Tools            | `src/content/tools/`      | YAML       |
| Exams            | `src/content/exams/`      | JSON       |
| Games            | `src/content/games/`      | YAML       |
| Newsletter       | `src/content/newsletter/` | MDX        |
| Learning catalog | `src/data/learn/`         | TypeScript |

## Authoring Rules

- Keep entries factual, specific, and reviewable.
- Include enough metadata for categorization and future search.
- Prefer small, composable content additions over giant drops.
- Link concepts back to practical AI workflows when possible.

## When to Edit Catalog Data

Use `src/data/learn/` when you are changing track structure, roadmap metadata, or search behavior.
Use `src/content/` when you are authoring learner-facing content.

## Related Docs

- [CONTRIBUTING.md](../../CONTRIBUTING.md)
- [docs/architecture/08-Content-Architecture.md](../architecture/08-Content-Architecture.md)
