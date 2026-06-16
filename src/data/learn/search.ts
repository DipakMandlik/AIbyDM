import { learnSearchIndex, type LearnSearchItem } from '@data/learn/catalog';
import { learnGlossaryEntries, learnResourceEntries } from '@data/learn/discovery';

const baseUrl = import.meta.env.BASE_URL ?? '/';

function withBase(path: string): string {
  return baseUrl + path.replace(/^\/+/, '');
}

function getDiscoveryHref(view: 'resources' | 'glossary', query: string): string {
  return withBase('/learn/' + view + '/?q=' + encodeURIComponent(query));
}

const discoverySearchIndex: LearnSearchItem[] = [
  ...learnResourceEntries.map((entry) => ({
    kind: 'resource' as const,
    title: entry.label,
    href: getDiscoveryHref('resources', entry.label),
    excerpt:
      'Referenced in ' +
      entry.lessonCount +
      ' lessons across ' +
      entry.trackCount +
      ' tracks. Concepts include ' +
      entry.concepts.slice(0, 3).join(', ') +
      '.',
    stage: 'cross-track' as const,
    trackSlug: entry.trackSlugs[0] ?? 'resources',
    trackTitle: 'Resource Library',
    moduleTitle: entry.trackCount + ' tracks',
    resourceKind: entry.kind,
    trackCount: entry.trackCount,
    keywords: [entry.label, entry.kind, ...entry.trackTitles, ...entry.concepts],
  })),
  ...learnGlossaryEntries.map((entry) => ({
    kind: 'glossary' as const,
    title: entry.term,
    href: getDiscoveryHref('glossary', entry.term),
    excerpt:
      'Appears in ' +
      entry.locationCount +
      ' learning checkpoints across ' +
      entry.trackCount +
      ' tracks.',
    stage: 'cross-track' as const,
    trackSlug: entry.trackSlugs[0] ?? 'glossary',
    trackTitle: 'Learn Glossary',
    moduleTitle: entry.trackCount + ' tracks',
    trackCount: entry.trackCount,
    keywords: [
      entry.term,
      entry.kind,
      ...entry.trackTitles,
      ...entry.sampleLocations.map((location) => location.label),
    ],
  })),
];

const searchItems: LearnSearchItem[] = [...learnSearchIndex, ...discoverySearchIndex];

function scoreItem(item: LearnSearchItem, normalizedQuery: string, queryTokens: string[]): number {
  const title = item.title.toLowerCase();
  const excerpt = item.excerpt.toLowerCase();
  const keywords = item.keywords.join(' ').toLowerCase();
  let score = 0;

  if (title === normalizedQuery) score += 200;
  if (title.startsWith(normalizedQuery)) score += 120;
  if (title.includes(normalizedQuery)) score += 80;
  if (excerpt.includes(normalizedQuery)) score += 35;

  for (const token of queryTokens) {
    if (title.includes(token)) score += 18;
    if (keywords.includes(token)) score += 12;
    if (excerpt.includes(token)) score += 6;
  }

  if (item.kind === 'lesson') score += 8;
  if (item.kind === 'track') score += 4;
  if (item.kind === 'resource' || item.kind === 'glossary') score += 3;
  return score;
}

export function searchLearnCatalog(query: string, limit = 24): LearnSearchItem[] {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return searchItems.slice(0, limit);

  const queryTokens = normalizedQuery.split(/\s+/).filter(Boolean);
  return searchItems
    .map((item) => ({
      item,
      score: scoreItem(item, normalizedQuery, queryTokens),
    }))
    .filter((entry) => entry.score > 0)
    .sort(
      (left, right) => right.score - left.score || left.item.title.localeCompare(right.item.title),
    )
    .slice(0, limit)
    .map((entry) => entry.item);
}
