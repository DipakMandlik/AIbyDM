# Design System

AIByDM uses a restrained editorial product system: neutral surfaces, thin borders, low-radius cards, strong type hierarchy, and focused actions.

## Foundations

- Typography: system sans for UI, serif display for hero and section titles, monospace for metadata.
- Color: warm neutral background, near-black foreground, subtle muted surfaces, semantic green/amber/red only where status matters.
- Shape: low-radius primitives; avoid oversized pill/card decoration except for clear buttons and badges.
- Layout: wide editorial sections, thin dividers, dense but readable grids, and simple detail-page sidebars.
- Motion: subtle reveal, marquee, and canvas motion with `prefers-reduced-motion` support.

## Shared Components

- `SiteNav` owns primary navigation, mobile menu, Command-K search, and the primary `Start learning` CTA.
- `SiteFooter` owns platform, resource, open-source, and legal links.
- `PageHero` standardizes platform landing headers.
- `Button` is the shared low-level action primitive.
- `SearchExperience` and `CommandSearch` share the static search index from `lib/content.ts`.

## Product Area Pattern

Every major area should have:

- Dedicated landing page.
- Dedicated detail pages where relevant.
- Clear primary action.
- Consistent metadata and discovery affordances.
- Mobile-first layout with no horizontal scroll.

## Accessibility Rules

- Keep one `h1` per route.
- Preserve the skip link and semantic page landmarks.
- Label icon-only buttons.
- Keep visible focus rings.
- Ensure Escape closes overlays.
- Respect reduced motion for decorative motion and canvas effects.

## Related Docs

- [ARCHITECTURE.md](../../ARCHITECTURE.md)
- [docs/development/README.md](../development/README.md)
