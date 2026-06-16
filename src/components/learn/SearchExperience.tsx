import { startTransition, useDeferredValue, useEffect, useMemo, useState } from 'react';
import { ArrowRight, Clock3, Compass, History, Search } from 'lucide-react';

import { learningStageGroups, type LearnSearchItem } from '@data/learn/catalog';
import { getRecentLessons } from '@data/learn/progress';
import { searchLearnCatalog } from '@data/learn/search';

import { useLearnProgressState } from '@components/learn/useLearnProgress';

interface Props {
  initialQuery?: string;
}

function kindLabel(item: LearnSearchItem): string {
  switch (item.kind) {
    case 'track':
      return 'Track';
    case 'module':
      return 'Module';
    case 'lesson':
      return 'Lesson';
    case 'project':
      return 'Project';
    case 'resource':
      return 'Resource';
    case 'glossary':
      return 'Glossary';
    default:
      return 'Result';
  }
}

function stageLabel(stage: LearnSearchItem['stage']): string {
  return stage === 'cross-track' ? 'Cross-track' : stage;
}

export default function SearchExperience({ initialQuery = '' }: Props) {
  const progressState = useLearnProgressState();
  const [query, setQuery] = useState(initialQuery);
  const deferredQuery = useDeferredValue(query);
  const recentItems = getRecentLessons(progressState, 5);

  const results = useMemo(() => searchLearnCatalog(deferredQuery, 36), [deferredQuery]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const baseUrl = import.meta.env.BASE_URL ?? '/';
    const nextUrl = query.trim()
      ? baseUrl + 'search/?q=' + encodeURIComponent(query.trim())
      : baseUrl + 'search/';
    window.history.replaceState({}, '', nextUrl);
  }, [query]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <section className="rounded-[32px] border border-[var(--color-border)] bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent),var(--color-bg-surface)] p-6 shadow-[0_24px_90px_rgba(2,8,23,0.28)] sm:p-8 lg:p-10">
        <p className="font-mono text-xs tracking-[0.24em] text-[var(--color-text-tertiary)] uppercase">
          Search
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-5xl">
          Find tracks, lessons, modules, and projects fast.
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--color-text-secondary)]">
          Search across the AIByDM curriculum by topic, concept, system pattern, project goal,
          resource, or glossary term.
        </p>
        <label className="mt-8 flex min-h-14 items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[rgba(2,6,23,0.64)] px-4 text-[var(--color-text-secondary)] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
          <Search className="h-5 w-5" aria-hidden="true" />
          <input
            value={query}
            onChange={(event) => {
              const value = event.target.value;
              startTransition(() => {
                setQuery(value);
              });
            }}
            placeholder="Search retrieval, transformers, MLOps, governance, capstone..."
            aria-label="Search the learn catalog"
            className="w-full bg-transparent text-base text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-tertiary)]"
          />
        </label>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="space-y-6">
          <div className="rounded-[28px] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-6 shadow-[0_18px_50px_rgba(2,8,23,0.16)]">
            <div className="flex items-center gap-3">
              <Compass className="h-5 w-5 text-[var(--color-learn)]" aria-hidden="true" />
              <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
                Browse by stage
              </h2>
            </div>
            <div className="mt-5 space-y-3">
              {learningStageGroups.map((group) => (
                <div
                  key={group.stage}
                  className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-panel)] p-4"
                >
                  <p className="font-mono text-xs tracking-[0.24em] text-[var(--color-text-tertiary)] uppercase">
                    {group.eyebrow}
                  </p>
                  <p className="mt-2 text-base font-semibold text-[var(--color-text-primary)]">
                    {group.title}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[var(--color-text-secondary)]">
                    {group.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[28px] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-6 shadow-[0_18px_50px_rgba(2,8,23,0.16)]">
            <div className="flex items-center gap-3">
              <History className="h-5 w-5 text-[var(--color-learn)]" aria-hidden="true" />
              <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
                Recent lessons
              </h2>
            </div>
            {recentItems.length > 0 ? (
              <div className="mt-5 space-y-3">
                {recentItems.map((item) => (
                  <a
                    key={item.lessonKey}
                    href={item.href}
                    className="block rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-panel)] p-4 transition hover:border-[var(--color-border-hover)] hover:bg-[var(--color-bg-hover)]"
                  >
                    <p className="font-mono text-xs tracking-[0.24em] text-[var(--color-text-tertiary)] uppercase">
                      {item.trackTitle}
                    </p>
                    <p className="mt-2 text-base font-semibold text-[var(--color-text-primary)]">
                      {item.lessonTitle}
                    </p>
                    <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                      {item.moduleTitle}
                    </p>
                  </a>
                ))}
              </div>
            ) : (
              <p className="mt-5 text-sm leading-7 text-[var(--color-text-secondary)]">
                Visit a few lessons and your local learning trail will show up here.
              </p>
            )}
          </div>
        </aside>

        <div className="rounded-[28px] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-6 shadow-[0_18px_50px_rgba(2,8,23,0.16)]">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-xs tracking-[0.24em] text-[var(--color-text-tertiary)] uppercase">
                Results
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-[var(--color-text-primary)]">
                {deferredQuery.trim()
                  ? 'Matches for "' + deferredQuery.trim() + '"'
                  : 'Popular curriculum entry points'}
              </h2>
            </div>
            <p className="text-sm text-[var(--color-text-secondary)]">
              {results.length} results shown
            </p>
          </div>
          <div className="mt-6 space-y-3">
            {results.length > 0 ? (
              results.map((item) => (
                <a
                  key={item.kind + item.href + item.title}
                  href={item.href}
                  className="block rounded-[24px] border border-[var(--color-border)] bg-[var(--color-bg-panel)] p-5 transition hover:border-[var(--color-border-hover)] hover:bg-[var(--color-bg-hover)]"
                >
                  <div className="flex flex-wrap items-center gap-2 text-xs tracking-[0.2em] text-[var(--color-text-tertiary)] uppercase">
                    <span>{kindLabel(item)}</span>
                    <span
                      className="h-1 w-1 rounded-full bg-[var(--color-text-tertiary)]"
                      aria-hidden="true"
                    />
                    <span>{item.trackTitle}</span>
                    {item.moduleTitle && (
                      <>
                        <span
                          className="h-1 w-1 rounded-full bg-[var(--color-text-tertiary)]"
                          aria-hidden="true"
                        />
                        <span>{item.moduleTitle}</span>
                      </>
                    )}
                  </div>
                  <div className="mt-3 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">
                        {item.title}
                      </h3>
                      <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--color-text-secondary)]">
                        {item.excerpt}
                      </p>
                    </div>
                    <ArrowRight
                      className="mt-1 h-5 w-5 shrink-0 text-[var(--color-text-tertiary)]"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full border border-[var(--color-border)] px-3 py-1 text-sm text-[var(--color-text-secondary)]">
                      {stageLabel(item.stage)}
                    </span>
                    {item.projectLevel && (
                      <span className="rounded-full border border-[var(--color-border)] px-3 py-1 text-sm text-[var(--color-text-secondary)]">
                        {item.projectLevel}
                      </span>
                    )}
                    {item.resourceKind && (
                      <span className="rounded-full border border-[var(--color-border)] px-3 py-1 text-sm text-[var(--color-text-secondary)]">
                        {item.resourceKind}
                      </span>
                    )}
                    {item.trackCount && (
                      <span className="rounded-full border border-[var(--color-border)] px-3 py-1 text-sm text-[var(--color-text-secondary)]">
                        {item.trackCount} tracks
                      </span>
                    )}
                    {item.duration && (
                      <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-3 py-1 text-sm text-[var(--color-text-secondary)]">
                        <Clock3 className="h-4 w-4" aria-hidden="true" />
                        {item.duration}
                      </span>
                    )}
                  </div>
                </a>
              ))
            ) : (
              <div className="rounded-[24px] border border-dashed border-[var(--color-border)] bg-[var(--color-bg-panel)] p-6 text-sm leading-7 text-[var(--color-text-secondary)]">
                No results matched that query yet. Try searching by track name, concept, or system
                pattern such as "retrieval", "governance", or "latency".
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
