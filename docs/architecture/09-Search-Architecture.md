# AIByDM — Search Architecture

**Version:** 1.0
**Date:** 2026-06-15
**Status:** Draft

---

## 1. Search Solution Evaluation

| Criteria              | Algolia                             | Pagefind                      | Lunr.js             |
| --------------------- | ----------------------------------- | ----------------------------- | ------------------- |
| **Cost**              | Free (DocSearch) or $0+             | Free (OSS)                    | Free (OSS)          |
| **Backend Required**  | No (hosted)                         | No (static)                   | No (static)         |
| **Index Size**        | Unlimited (hosted)                  | ~1KB per page                 | Grows with content  |
| **Search Quality**    | Excellent (typo tolerance, ranking) | Very good (WASM-powered)      | Good (basic TF-IDF) |
| **Setup Complexity**  | Medium (apply for DocSearch)        | Low (Astro plugin)            | Medium (custom)     |
| **Offline Support**   | No                                  | Yes (index shipped with site) | Yes                 |
| **GitHub Pages**      | Yes                                 | Yes                           | Yes                 |
| **Faceted Search**    | Yes                                 | Yes (filters)                 | Manual              |
| **Highlighting**      | Yes                                 | Yes                           | Manual              |
| **Bundle Size**       | 35KB                                | 18KB (WASM)                   | 8KB                 |
| **Astro Integration** | Community plugin                    | Official support              | Manual              |
| **Maintenance**       | Algolia manages                     | Self-managed index            | Self-managed        |

### Decision: **Pagefind**

**Rationale:**

1. **Zero cost, zero backend** — index is generated at build time, served as static files
2. **WASM-powered** — searches 10,000+ pages in <50ms client-side
3. **Astro native** — first-class integration, used by Starlight
4. **Automatic indexing** — indexes all rendered HTML automatically
5. **Small bundle** — 18KB WASM + gzipped index
6. **Filtering** — supports faceted search by content type, category, difficulty
7. **Highlighting** — built-in result highlighting
8. **No external dependency** — no API keys, no quotas, no third-party

**When to reconsider Algolia:**

- If search quality feedback is consistently negative
- If we need AI-powered semantic search
- If content exceeds 50,000 pages

---

## 2. Search Implementation

### Build-Time Index Generation

```
Astro Build → HTML Output → Pagefind Indexer → Search Index Files
                                                ├── pagefind.js (WASM)
                                                ├── pagefind-ui.js
                                                ├── pagefind-ui.css
                                                └── index/ (chunked index)
```

### Astro Configuration

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Pagefind runs as a postbuild step
  // No config needed in astro.config — it indexes dist/ output
});
```

```json
// package.json scripts
{
  "scripts": {
    "build": "astro build",
    "postbuild": "pagefind --site dist --glob '**/*.html'"
  }
}
```

### Pagefind Configuration

```yaml
# pagefind.yml
site: dist
glob: '**/*.html'
exclude_selectors:
  - 'nav'
  - 'footer'
  - '.sidebar'
  - '.table-of-contents'
  - '[data-pagefind-ignore]'
root_selector: 'main'
```

---

## 3. Content Tagging for Search

### HTML Data Attributes

Pagefind uses `data-pagefind-*` attributes to control indexing:

```html
<!-- In Astro layouts -->
<main data-pagefind-body>
  <!-- This content gets indexed -->

  <h1 data-pagefind-meta="title">{title}</h1>

  <span data-pagefind-filter="type">{contentType}</span>
  <span data-pagefind-filter="category">{category}</span>
  <span data-pagefind-filter="difficulty">{difficulty}</span>
  <span data-pagefind-filter="track">{track}</span>

  <article>{content}</article>
</main>

<aside data-pagefind-ignore>
  <!-- Sidebar, ToC — not indexed -->
</aside>
```

### Content Type Mapping

| Content Type  | Filter Value      | Weight                               |
| ------------- | ----------------- | ------------------------------------ |
| Learn topic   | `type:learn`      | `data-pagefind-weight="2"` (boosted) |
| Tool entry    | `type:tool`       | `data-pagefind-weight="2"` (boosted) |
| Exam question | `type:exam`       | `data-pagefind-weight="1"`           |
| Newsletter    | `type:newsletter` | `data-pagefind-weight="0.5"`         |
| Game          | `type:game`       | `data-pagefind-weight="0.5"`         |

---

## 4. Search UI Component

### Command-K Modal (React Island)

```
Trigger: Ctrl+K / Cmd+K / Click search icon

┌─────────────────────────────────────────────┐
│ 🔍 Search AIByDM...                    ESC │
├─────────────────────────────────────────────┤
│ Filters: [All] [Learn] [Tools] [Exams]      │
├─────────────────────────────────────────────┤
│ 📚 Supervised Learning                       │
│    Learn > Machine Learning                  │
│    ...classification algorithms that learn...│
│                                              │
│ 🔧 Scikit-learn                              │
│    Tools > MLOps                             │
│    ...machine learning library for Python... │
│                                              │
│ 📝 ML Basics Quiz                            │
│    Exams > Machine Learning                  │
│    ...test your ML fundamentals...           │
│                                              │
│ ↑↓ Navigate  ↵ Open  ESC Close              │
└─────────────────────────────────────────────┘
```

### Features

| Feature             | Implementation                         |
| ------------------- | -------------------------------------- |
| Keyboard trigger    | `Cmd+K` / `Ctrl+K` global listener     |
| Type-ahead          | Debounced input (150ms)                |
| Faceted filters     | Pagefind filter API                    |
| Result preview      | Title + category + highlighted snippet |
| Keyboard navigation | Arrow keys + Enter                     |
| Recent searches     | localStorage (last 10)                 |
| No results          | Suggest browsing categories            |

### Accessibility

- Focus trap within modal
- `role="dialog"` + `aria-label`
- Results as `role="listbox"` with `aria-selected`
- `ESC` closes and restores focus
- Screen reader announces result count

---

## 5. Search Analytics (Client-Side)

Track search behavior in localStorage to understand content gaps:

```typescript
// Logged to localStorage, exported periodically via analytics
interface SearchEvent {
  query: string;
  results_count: number;
  selected_result: string | null;
  filters_used: string[];
  timestamp: number;
}
```

**Insights to derive:**

- Top searched terms → ensure content exists
- Zero-result queries → content gaps
- Searches that don't lead to clicks → improve result quality
- Filter usage patterns → most-used content types

---

## 6. Future: Algolia Migration Path

If Pagefind proves insufficient:

```
1. Apply for Algolia DocSearch (free for OSS)
2. Replace Pagefind UI component with Algolia InstantSearch
3. Configure Algolia crawler for aibydm.github.io
4. Keep Pagefind as offline fallback
5. A/B test search quality metrics
```

The search UI component is already isolated as a React island — swapping the search backend only requires changing the component internals, not the integration point.
