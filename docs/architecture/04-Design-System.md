# AIByDM — Design System

**Version:** 1.0
**Date:** 2026-06-15
**Status:** Draft

---

## 1. Design Principles

| Principle                 | Description                                               |
| ------------------------- | --------------------------------------------------------- |
| **Dark-first**            | Design for dark mode first; light mode is the alternative |
| **Content-forward**       | UI recedes; content takes center stage                    |
| **Technical credibility** | Feels like a professional engineering tool, not a blog    |
| **Accessible**            | WCAG 2.1 AA minimum; high contrast ratios                 |
| **Fast**                  | No visual effects that compromise performance             |
| **Consistent**            | Shared component library across all 5 modules             |

### Visual Inspiration

| Platform       | What to borrow                                       |
| -------------- | ---------------------------------------------------- |
| GitHub         | Navigation patterns, dark theme, contribution graphs |
| Linear         | Clean typography, subtle animations, card design     |
| Vercel         | Landing page hero, gradient accents, speed aesthetic |
| OpenAI Docs    | Content layout, sidebar navigation, code blocks      |
| Anthropic Docs | Typography hierarchy, whitespace, reading experience |

---

## 2. Color System

### Dark Mode (Primary)

```css
/* Background layers */
--bg-base: #0a0a0b; /* Page background */
--bg-surface: #111113; /* Card backgrounds */
--bg-elevated: #1a1a1e; /* Modals, popovers */
--bg-hover: #222228; /* Interactive hover states */

/* Text */
--text-primary: #f0f0f3; /* Headings, primary content */
--text-secondary: #a0a0ab; /* Supporting text */
--text-tertiary: #6b6b76; /* Muted labels, timestamps */

/* Brand accent */
--accent-primary: #6366f1; /* Indigo-500 — primary actions, links */
--accent-hover: #818cf8; /* Indigo-400 — hover state */
--accent-subtle: #1e1b4b; /* Indigo-950 — accent backgrounds */

/* Semantic */
--success: #22c55e; /* Green-500 */
--warning: #f59e0b; /* Amber-500 */
--error: #ef4444; /* Red-500 */
--info: #3b82f6; /* Blue-500 */

/* Borders */
--border-default: #27272a; /* Zinc-800 */
--border-hover: #3f3f46; /* Zinc-700 */
--border-active: #6366f1; /* Accent */
```

### Light Mode

```css
--bg-base: #ffffff;
--bg-surface: #f9fafb;
--bg-elevated: #f3f4f6;
--bg-hover: #e5e7eb;

--text-primary: #111827;
--text-secondary: #4b5563;
--text-tertiary: #9ca3af;

--accent-primary: #4f46e5; /* Indigo-600 */
--accent-hover: #4338ca; /* Indigo-700 */
--accent-subtle: #eef2ff; /* Indigo-50 */

--border-default: #e5e7eb;
--border-hover: #d1d5db;
```

### Module Accent Colors

Each module gets a secondary accent for visual identity:

| Module     | Color   | Hex       | Usage                                |
| ---------- | ------- | --------- | ------------------------------------ |
| Learn      | Blue    | `#3b82f6` | Track badges, section highlights     |
| Tools      | Emerald | `#10b981` | Tool cards, category badges          |
| Games      | Amber   | `#f59e0b` | Achievement badges, score highlights |
| Exams      | Purple  | `#a855f7` | Difficulty badges, score indicators  |
| Newsletter | Rose    | `#f43f5e` | Issue badges, date highlights        |

---

## 3. Typography

### Font Stack

```css
--font-sans:
  'Inter Variable', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', ui-monospace, monospace;
```

**Why Inter:** Open source, variable font (size savings), excellent readability at small sizes, professional aesthetic. Used by Linear, Vercel, Raycast.

**Why JetBrains Mono:** Open source, ligatures for code, wide community adoption.

### Type Scale

| Token     | Size            | Weight | Line Height | Usage               |
| --------- | --------------- | ------ | ----------- | ------------------- |
| `display` | 48px / 3rem     | 700    | 1.1         | Hero headlines      |
| `h1`      | 36px / 2.25rem  | 700    | 1.2         | Page titles         |
| `h2`      | 28px / 1.75rem  | 600    | 1.3         | Section headings    |
| `h3`      | 22px / 1.375rem | 600    | 1.4         | Subsection headings |
| `h4`      | 18px / 1.125rem | 600    | 1.4         | Card titles         |
| `body`    | 16px / 1rem     | 400    | 1.65        | Body text           |
| `body-sm` | 14px / 0.875rem | 400    | 1.5         | Supporting text     |
| `caption` | 12px / 0.75rem  | 500    | 1.4         | Labels, badges      |
| `code`    | 14px / 0.875rem | 400    | 1.6         | Inline code         |

### Content Typography Rules

- **Max content width:** 720px (optimal reading length ~65-75 characters)
- **Paragraph spacing:** 1.5em
- **Heading spacing:** 2em top, 0.75em bottom
- **List item spacing:** 0.5em

---

## 4. Spacing System

Base unit: 4px

| Token      | Value | Usage                      |
| ---------- | ----- | -------------------------- |
| `space-1`  | 4px   | Tight gaps (icon-to-text)  |
| `space-2`  | 8px   | Compact spacing            |
| `space-3`  | 12px  | Default element gap        |
| `space-4`  | 16px  | Card padding, section gaps |
| `space-5`  | 20px  | Component separation       |
| `space-6`  | 24px  | Section padding            |
| `space-8`  | 32px  | Large section gaps         |
| `space-10` | 40px  | Major section separation   |
| `space-12` | 48px  | Page-level spacing         |
| `space-16` | 64px  | Hero sections              |
| `space-20` | 80px  | Landing page sections      |

---

## 5. Component Library

### 5.1 Cards

**Content Card (Learn/Newsletter)**

```
┌─────────────────────────────┐
│ [Category Badge]            │
│                             │
│ Title                       │
│ Description text that       │
│ wraps to two lines max...   │
│                             │
│ [Tag] [Tag] [Difficulty]    │
│                             │
│ Read More →                 │
└─────────────────────────────┘
```

**Tool Card**

```
┌─────────────────────────────┐
│ [Logo]  Tool Name           │
│         ★ 12.5k  [OSS]     │
│                             │
│ Short description text      │
│ max two lines...            │
│                             │
│ [Category]  [License]       │
│                             │
│ [View Tool] [GitHub →]      │
└─────────────────────────────┘
```

**Game Card**

```
┌─────────────────────────────┐
│                             │
│     [Game Illustration]     │
│                             │
│ Game Name                   │
│ Description...              │
│                             │
│ [Difficulty] [⏱ ~5 min]    │
│                             │
│ [Play Now →]                │
└─────────────────────────────┘
```

**Exam Card**

```
┌─────────────────────────────┐
│ [Icon]                      │
│                             │
│ Track Name                  │
│ XX Questions  •  Y Mock Tests│
│                             │
│ [■■■■□□] 60% Complete      │
│                             │
│ [Continue →]                │
└─────────────────────────────┘
```

### 5.2 Navigation Components

- **Top Bar:** Fixed, transparent on hero, solid on scroll
- **Sidebar:** Collapsible, sticky, scroll-synced with content
- **Breadcrumbs:** Compact, separator: `>`
- **Pagination:** Prev/Next with titles
- **Table of Contents:** Right rail, scroll-spy active state

### 5.3 Content Components

- **Code Block:** Shiki syntax highlighting, copy button, filename label, line highlighting
- **Callout Boxes:** Note (blue), Tip (green), Warning (amber), Danger (red)
- **Tabs:** For multi-language code examples or approach comparisons
- **Accordion:** FAQ sections, expandable content
- **Diagram:** Mermaid renderer with dark mode support
- **Quiz Inline:** Embedded MCQ within content flow
- **Progress Bar:** Linear, with percentage and label
- **Badge:** Difficulty (Easy/Medium/Hard), Category, Status

### 5.4 Interactive Components

- **Search Modal:** Command-K triggered, fuzzy search, keyboard navigation
- **Theme Toggle:** System/Light/Dark, persisted in localStorage
- **Tool Filter:** Multi-select categories, search within tools
- **Quiz Engine:** Question display, option selection, result reveal, explanation
- **Flashcard:** Flip animation, navigation, progress tracking

---

## 6. Layout System

### Breakpoints

| Name  | Min Width | Usage                  |
| ----- | --------- | ---------------------- |
| `sm`  | 640px     | Small phones landscape |
| `md`  | 768px     | Tablets                |
| `lg`  | 1024px    | Small laptops          |
| `xl`  | 1280px    | Desktops               |
| `2xl` | 1536px    | Large desktops         |

### Page Layouts

**Full Width** (Homepage, Game pages)

```
[Nav]
[Full-width content, max-w-7xl centered]
[Footer]
```

**Docs Layout** (Learn, individual content)

```
[Nav]
[Sidebar 256px] [Content 720px] [ToC 200px]
[Footer]
```

**Grid Layout** (Tool directory, Exam hub, Game hub)

```
[Nav]
[Filters] [Card Grid - responsive 1/2/3/4 columns]
[Footer]
```

**Narrow** (Newsletter issues, About)

```
[Nav]
[Content 680px centered]
[Footer]
```

---

## 7. Motion & Animation

| Element          | Animation               | Duration | Easing      |
| ---------------- | ----------------------- | -------- | ----------- |
| Page transitions | None (static site)      | —        | —           |
| Card hover       | Scale 1.02, shadow lift | 200ms    | ease-out    |
| Theme toggle     | Color crossfade         | 150ms    | ease        |
| Sidebar collapse | Width + opacity         | 200ms    | ease-in-out |
| Toast/Alert      | Slide in from top       | 300ms    | spring      |
| Flashcard flip   | 3D Y-axis rotation      | 400ms    | ease-in-out |
| Progress bar     | Width animation         | 500ms    | ease-out    |
| Search modal     | Fade + scale            | 150ms    | ease-out    |

**Rule:** `prefers-reduced-motion: reduce` disables all animations.

---

## 8. Accessibility Standards

| Requirement         | Implementation                                         |
| ------------------- | ------------------------------------------------------ |
| Color contrast      | Min 4.5:1 for text, 3:1 for large text                 |
| Keyboard navigation | All interactive elements focusable, visible focus ring |
| Screen readers      | Semantic HTML, ARIA labels where needed                |
| Skip links          | "Skip to content" link on every page                   |
| Alt text            | Required for all images                                |
| Focus management    | Trap focus in modals, restore on close                 |
| Reduced motion      | `prefers-reduced-motion` respected                     |
| Font scaling        | Rem-based, works up to 200% zoom                       |
