# Content System

AIByDM content is stored as typed TypeScript data in `lib/content.ts` so routes, search, and discovery stay static-export compatible.

## Content Areas

| Area | Types | Routes |
| --- | --- | --- |
| Learn | `Track`, `Module`, `Lesson`, `Project` | `/learn/`, lesson pages, project pages |
| Tools | `ToolCategory`, `Tool` | `/tools/`, `/tools/[slug]/` |
| Games | `Game` | `/games/`, `/games/[slug]/` |
| Exams | `Exam` | `/exams/`, `/exams/[slug]/` |
| Newsletter | `Issue` | `/newsletter/`, `/newsletter/[slug]/` |
| Search | `SearchItem` | `/search/`, Command-K |

## Authoring Rules

- Use explicit `slug` values for every routable object.
- Do not derive production URLs from display titles.
- Keep lessons small enough to support clear next actions.
- Give projects milestones, deliverables, and related lesson slugs.
- Keep search keywords useful and specific.
- Prefer practical AI workflows over abstract summaries.

## Route Helpers

Use the existing route helpers instead of hand-building URLs:

- `getTrackHref`
- `getLessonHref`
- `getProjectHref`
- `getToolHref`
- `getGameHref`
- `getExamHref`
- `getIssueHref`

## Learn V1 Scope

The primary Learn catalog intentionally stays focused on four reference-led tracks:

- AI Foundations
- Prompt Engineering
- Building With LLMs
- AI Product Design

Additional tracks can be added later, but new content should preserve the track, module, lesson, and project hierarchy.

## Related Docs

- [ARCHITECTURE.md](../../ARCHITECTURE.md)
- [CONTRIBUTING.md](../../CONTRIBUTING.md)
