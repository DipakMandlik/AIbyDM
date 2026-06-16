# AIByDM Design System

This file is the product-level source of truth for how AIByDM should look, feel, and guide learners.

## Product Promise

AIByDM is a guided AI learning product.
It should not feel like a blog, a docs portal, a generic dashboard, or a personal side project.

Every primary screen should answer three questions immediately:

1. Where am I?
2. What can I do here?
3. What should I do next?

## Experience Principles

- Product over page collection: every surface should connect to the same learner journey.
- Progress over browsing: the interface should help learners move, not just explore.
- Clarity over density: strong hierarchy matters more than feature count.
- Open source over closed product language: contribution and collaboration should be visible.
- Static-first quality: GitHub Pages compatibility, speed, and portability are non-negotiable.

## Information Architecture

Top-level platform surfaces:

- Home
- Learn
- Tools
- Games
- Exams
- Newsletter
- Community
- Search

Navigation rules:

- `Learn` is the primary entry point.
- `Search` is global and should never feel hidden.
- `Community` is a first-class product area, not a buried repo link.
- Any deep learning page should preserve both local context and global context.

## Learning System Rules

Each track should surface:

- Overview
- Difficulty
- Duration
- Prerequisites
- Outcomes
- Modules
- Lessons
- Projects
- Next steps
- Progress state

Each lesson should surface:

- Why this lesson exists
- What to understand
- What to build or apply
- How to know it is done
- What comes next

## Visual Language

Typography:

- Display font: `Space Grotesk`
- Body font: `IBM Plex Sans`
- Mono font: `IBM Plex Mono`
- Headlines are compact, confident, and high contrast.
- Body copy should stay readable and calm, not overly compressed.

Color system:

- Base surfaces use deep navy or clean off-white variants.
- Accent color signals forward motion and completion.
- Section accents differentiate learning surfaces without fragmenting the brand.
- Borders should be visible but quiet.

Component direction:

- Rounded panels with measured depth.
- Pill buttons and chips for action clarity.
- Clear progress bars, not decorative metrics.
- Cards should feel substantial enough to be scanned as product units.

## Motion System

Motion should explain state, not decorate emptiness.

Use motion for:

- Hover lift on actionable cards
- Staggered section reveals
- Progress changes
- Search and command interactions
- Navigation state changes

Avoid:

- Long dramatic animations
- Motion without cause and effect
- Layout-shifting effects
- Hover-only affordances for important actions

## Page Intent

Home:

- Establish what AIByDM is
- Show where to start
- Show what unlocks next
- Prove that the platform is connected

Learn:

- Make the full curriculum legible
- Show progress and recommendations
- Encourage forward momentum

Track pages:

- Make prerequisites and next steps obvious
- Present the roadmap before details overwhelm the learner

Lesson pages:

- Keep the learner oriented within the track
- Balance reading, building, and shipping

Tools, Games, Exams, Newsletter:

- Feel like connected learning surfaces, not isolated catalogs

Community:

- Show how to contribute, where to talk, and how work is recognized

Search:

- Reduce navigation friction
- Preserve context in results

## Quality Bar

Before shipping major product changes, verify:

- Responsive behavior on mobile and desktop
- Accessible focus states and contrast
- Reduced-motion friendliness
- Meaningful empty states
- GitHub Pages compatibility
- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Anti-Patterns

Avoid these patterns in AIByDM:

- Generic SaaS dashboard framing for the homepage
- Fake or inflated product metrics
- Orphaned pages with no next step
- Visual inconsistency between major sections
- Repo-first language on the product surface
- Dense walls of cards with no hierarchy
- Search or progress hidden behind secondary navigation
