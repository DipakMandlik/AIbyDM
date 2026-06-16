# Architecture Docs Index

These documents capture the deeper planning and system thinking behind AIByDM.

## Current Repo Snapshot

The architecture pack started as a planning set on 2026-06-15. The repo has already moved ahead in
the Learn module, so read the implementation snapshot sections in these files first when you need
the current structure:

- [../../ARCHITECTURE.md](../../ARCHITECTURE.md)
- [01-PRD.md](./01-PRD.md)
- [02-Technical-Architecture.md](./02-Technical-Architecture.md)
- [03-Information-Architecture.md](./03-Information-Architecture.md)
- [05-GitHub-Repository-Design.md](./05-GitHub-Repository-Design.md)

Current Learn implementation highlights:

- `src/data/learn/catalog.ts` defines the live 17-track curriculum.
- `src/pages/learn/` contains dedicated dashboard, catalog, roadmap, resources, glossary, track,
  lesson, and project routes.
- `src/components/learn/` owns the progress, roadmap, dashboard, and search experiences.
- `src/data/learn/progress.ts` tracks lesson and module completion locally.

## Document Set

| File                                                               | Focus                             |
| ------------------------------------------------------------------ | --------------------------------- |
| [01-PRD.md](./01-PRD.md)                                           | Product requirements              |
| [02-Technical-Architecture.md](./02-Technical-Architecture.md)     | Technical system design           |
| [03-Information-Architecture.md](./03-Information-Architecture.md) | Information structure             |
| [04-Design-System.md](./04-Design-System.md)                       | Design system planning            |
| [05-GitHub-Repository-Design.md](./05-GitHub-Repository-Design.md) | Repository and open-source design |
| [06-Contributor-Framework.md](./06-Contributor-Framework.md)       | Contribution operations           |
| [07-Deployment-Architecture.md](./07-Deployment-Architecture.md)   | Deployment model                  |
| [08-Content-Architecture.md](./08-Content-Architecture.md)         | Content model                     |
| [09-Search-Architecture.md](./09-Search-Architecture.md)           | Search system                     |
| [10-Roadmap.md](./10-Roadmap.md)                                   | Product roadmap planning          |
| [11-Implementation-Plan.md](./11-Implementation-Plan.md)           | Execution sequencing              |
| [12-Sprint-Breakdown.md](./12-Sprint-Breakdown.md)                 | Sprint-level planning             |

## Start Here

- Want the short version: [../../ARCHITECTURE.md](../../ARCHITECTURE.md)
- Want to contribute code: [../development/README.md](../development/README.md)
- Want to contribute content: [../content-system/README.md](../content-system/README.md)
