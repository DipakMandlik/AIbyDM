import { startTransition, useDeferredValue, useMemo, useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  BookMarked,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Circle,
  Clock3,
  Compass,
  ExternalLink,
  Layers3,
  LockKeyhole,
  Search,
  Sparkles,
} from 'lucide-react';

import {
  getLessonHref,
  getProjectHref,
  getTrackHref,
  learningStageGroups,
  type LearningStage,
  type LearningTrack,
  type ResourceKind,
} from '@data/learn/catalog';
import {
  learnCatalogEntries,
  learnGlossaryEntries,
  learnResourceEntries,
  type LearnGlossaryKind,
} from '@data/learn/discovery';
import {
  getModuleProgress,
  getTrackProgress,
  isLessonCompleted,
  isModuleCompleted,
  type LearnProgressState,
} from '@data/learn/progress';
import { getTrackStatus } from '@data/learn/recommendations';

import { useLearnProgressState } from '@components/learn/useLearnProgress';

type AtlasView = 'catalog' | 'contents' | 'roadmap' | 'resources' | 'glossary';
type AtlasStatusFilter = 'all' | 'ready' | 'in-progress' | 'complete' | 'locked';
type StageFilter = 'all' | LearningStage;
type ResourceFilter = 'all' | ResourceKind;
type GlossaryFilter = 'all' | LearnGlossaryKind;

interface Props {
  initialView?: AtlasView;
  initialQuery?: string;
}

interface TrackInsight {
  status: ReturnType<typeof getTrackStatus>;
  progress: ReturnType<typeof getTrackProgress>;
  actionHref: string;
  actionLabel: string;
  nextCheckpoint?: {
    title: string;
    moduleTitle: string;
  };
}

const atlasTabs: Array<{ id: AtlasView; label: string; icon: typeof Layers3 }> = [
  { id: 'catalog', label: 'Tracks', icon: Layers3 },
  { id: 'contents', label: 'Contents', icon: BookOpen },
  { id: 'roadmap', label: 'Roadmap', icon: Compass },
  { id: 'resources', label: 'Resources', icon: BookMarked },
  { id: 'glossary', label: 'Glossary', icon: BookOpen },
];

const stageFilters: Array<{ id: StageFilter; label: string }> = [
  { id: 'all', label: 'All stages' },
  ...learningStageGroups.map((group) => ({ id: group.stage, label: group.title })),
];

const statusFilters: Array<{ id: AtlasStatusFilter; label: string }> = [
  { id: 'all', label: 'All statuses' },
  { id: 'ready', label: 'Ready' },
  { id: 'in-progress', label: 'In progress' },
  { id: 'complete', label: 'Complete' },
  { id: 'locked', label: 'Locked' },
];

const resourceFilters: Array<{ id: ResourceFilter; label: string }> = [
  { id: 'all', label: 'All resource types' },
  { id: 'Guide', label: 'Guides' },
  { id: 'Docs', label: 'Docs' },
  { id: 'Tool', label: 'Tools' },
  { id: 'Paper', label: 'Papers' },
];

const glossaryFilters: Array<{ id: GlossaryFilter; label: string }> = [
  { id: 'all', label: 'All glossary terms' },
  { id: 'Concept', label: 'Concepts' },
  { id: 'Tool', label: 'Tools' },
  { id: 'Technology', label: 'Technologies' },
  { id: 'Skill', label: 'Skills' },
];

function splitQuery(query: string): string[] {
  return query.trim().toLowerCase().split(/\s+/).filter(Boolean);
}

function matchesTokens(tokens: string[], fields: string[]): boolean {
  if (tokens.length === 0) return true;
  const haystack = fields.join(' ').toLowerCase();
  return tokens.every((token) => haystack.includes(token));
}

function statusLabel(status: ReturnType<typeof getTrackStatus>): string {
  switch (status) {
    case 'complete':
      return 'Complete';
    case 'in-progress':
      return 'In progress';
    case 'ready':
      return 'Ready';
    case 'locked':
      return 'Locked';
    default:
      return 'Not started';
  }
}

function buildTrackInsight(
  trackEntry: LearningTrack,
  progressState: LearnProgressState,
): TrackInsight {
  const progress = getTrackProgress(progressState, trackEntry.slug);
  const status = getTrackStatus(progressState, trackEntry);
  const nextLesson = trackEntry.modules
    .flatMap((moduleEntry) =>
      moduleEntry.lessons.map((lessonEntry) => ({ moduleEntry, lessonEntry })),
    )
    .find((entry) => !isLessonCompleted(progressState, trackEntry.slug, entry.lessonEntry.slug));

  if (status === 'locked') {
    const firstPrerequisite = trackEntry.prerequisites[0];
    return {
      status,
      progress,
      actionHref: firstPrerequisite
        ? getTrackHref(firstPrerequisite)
        : getTrackHref(trackEntry.slug),
      actionLabel: 'Review prerequisites',
    };
  }

  if (nextLesson) {
    return {
      status,
      progress,
      actionHref: getLessonHref(trackEntry.slug, nextLesson.lessonEntry.slug),
      actionLabel: progress.completed > 0 ? 'Continue track' : 'Start track',
      nextCheckpoint: {
        title: nextLesson.lessonEntry.title,
        moduleTitle: nextLesson.moduleEntry.title,
      },
    };
  }

  return {
    status,
    progress,
    actionHref: getTrackHref(trackEntry.slug),
    actionLabel: 'Review capstone',
  };
}

function FilterPill({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={
        'inline-flex min-h-11 items-center rounded-full border px-4 text-sm transition ' +
        (active
          ? 'border-[var(--color-learn)] bg-[rgba(56,189,248,0.12)] text-[var(--color-text-primary)]'
          : 'border-[var(--color-border)] bg-[var(--color-bg-panel)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-hover)] hover:bg-[var(--color-bg-hover)]')
      }
    >
      {label}
    </button>
  );
}

function CatalogCard({
  entry,
  insight,
}: {
  entry: (typeof learnCatalogEntries)[number];
  insight: TrackInsight;
}) {
  return (
    <article className="rounded-[24px] border border-[var(--color-border)] bg-[var(--color-bg-panel)] p-5 shadow-[0_16px_40px_rgba(2,8,23,0.14)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs text-[var(--color-text-secondary)]">
              {statusLabel(insight.status)}
            </span>
            <span className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs text-[var(--color-text-secondary)]">
              {entry.track.difficulty}
            </span>
            <span className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs text-[var(--color-text-secondary)]">
              {entry.track.stage}
            </span>
          </div>
          <h3 className="mt-3 text-2xl font-semibold text-[var(--color-text-primary)]">
            {entry.track.title}
          </h3>
          <p className="mt-2 text-sm leading-7 text-[var(--color-text-secondary)]">
            {entry.track.strapline}
          </p>
        </div>
        <Sparkles className="mt-1 h-6 w-6 text-[var(--color-learn)]" aria-hidden="true" />
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-4">
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-3">
          <p className="text-xs tracking-[0.18em] text-[var(--color-text-tertiary)] uppercase">
            Modules
          </p>
          <p className="mt-2 text-xl font-semibold text-[var(--color-text-primary)]">
            {entry.moduleCount}
          </p>
        </div>
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-3">
          <p className="text-xs tracking-[0.18em] text-[var(--color-text-tertiary)] uppercase">
            Lessons
          </p>
          <p className="mt-2 text-xl font-semibold text-[var(--color-text-primary)]">
            {entry.lessonCount}
          </p>
        </div>
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-3">
          <p className="text-xs tracking-[0.18em] text-[var(--color-text-tertiary)] uppercase">
            Projects
          </p>
          <p className="mt-2 text-xl font-semibold text-[var(--color-text-primary)]">
            {entry.projectCount}
          </p>
        </div>
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-3">
          <p className="text-xs tracking-[0.18em] text-[var(--color-text-tertiary)] uppercase">
            Time
          </p>
          <p className="mt-2 text-xl font-semibold text-[var(--color-text-primary)]">
            {Math.round(entry.minutes / 60)}h
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-4">
        <div className="flex items-center justify-between gap-3 text-sm text-[var(--color-text-secondary)]">
          <span>Local progress</span>
          <span>
            {insight.progress.completed}/{insight.progress.total}
          </span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-[rgba(148,163,184,0.16)]">
          <div
            className="h-full rounded-full bg-[linear-gradient(90deg,var(--color-learn),var(--color-accent))]"
            style={{ width: insight.progress.percentage + '%' }}
          />
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="font-mono text-xs tracking-[0.24em] text-[var(--color-text-tertiary)] uppercase">
            Prerequisites
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {entry.prerequisites.length > 0 ? (
              entry.prerequisites.map((prerequisite) => (
                <a
                  key={prerequisite.slug}
                  href={prerequisite.href}
                  className="rounded-full border border-[var(--color-border)] px-3 py-1 text-sm text-[var(--color-text-secondary)] transition hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-primary)]"
                >
                  {prerequisite.title}
                </a>
              ))
            ) : (
              <span className="rounded-full border border-[var(--color-border)] px-3 py-1 text-sm text-[var(--color-text-secondary)]">
                Start here
              </span>
            )}
          </div>
        </div>
        <div>
          <p className="font-mono text-xs tracking-[0.24em] text-[var(--color-text-tertiary)] uppercase">
            Technologies
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {entry.technologies.slice(0, 5).map((technology) => (
              <span
                key={technology}
                className="rounded-full border border-[var(--color-border)] px-3 py-1 text-sm text-[var(--color-text-secondary)]"
              >
                {technology}
              </span>
            ))}
          </div>
        </div>
      </div>

      {insight.nextCheckpoint && (
        <div className="mt-5 rounded-2xl border border-[var(--color-border)] bg-[rgba(56,189,248,0.08)] p-4">
          <p className="font-mono text-xs tracking-[0.24em] text-[var(--color-text-tertiary)] uppercase">
            Next checkpoint
          </p>
          <p className="mt-2 text-base font-semibold text-[var(--color-text-primary)]">
            {insight.nextCheckpoint.title}
          </p>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            {insight.nextCheckpoint.moduleTitle}
          </p>
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <a
          href={insight.actionHref}
          className="command-button border border-transparent bg-[var(--color-accent)] text-[var(--color-accent-contrast)] hover:bg-[var(--color-accent-hover)]"
        >
          {insight.actionLabel}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
        <a
          href={entry.href}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--color-border)] px-4 text-sm text-[var(--color-text-secondary)] transition hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-primary)]"
        >
          <Compass className="h-4 w-4" aria-hidden="true" />
          Overview
        </a>
        <span className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--color-border)] px-4 text-sm text-[var(--color-text-secondary)]">
          <Clock3 className="h-4 w-4" aria-hidden="true" />
          {entry.track.weeklyRhythm}
        </span>
      </div>
    </article>
  );
}

function ContentsTrackCard({
  entry,
  insight,
  progressState,
  expanded,
  onToggle,
}: {
  entry: (typeof learnCatalogEntries)[number];
  insight: TrackInsight;
  progressState: LearnProgressState;
  expanded: boolean;
  onToggle: () => void;
}) {
  const firstIncompleteLesson = entry.track.modules
    .flatMap((moduleEntry) =>
      moduleEntry.lessons.map((lessonEntry) => ({ moduleEntry, lessonEntry })),
    )
    .find((item) => !isLessonCompleted(progressState, entry.track.slug, item.lessonEntry.slug));

  return (
    <article className="rounded-[26px] border border-[var(--color-border)] bg-[var(--color-bg-panel)] p-5 shadow-[0_18px_44px_rgba(2,8,23,0.14)]">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs text-[var(--color-text-secondary)]">
              {statusLabel(insight.status)}
            </span>
            <span className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs text-[var(--color-text-secondary)]">
              {entry.track.stage}
            </span>
            <span className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs text-[var(--color-text-secondary)]">
              {entry.track.difficulty}
            </span>
          </div>
          <h3 className="mt-4 text-2xl font-semibold text-[var(--color-text-primary)]">
            {entry.track.title}
          </h3>
          <p className="mt-2 text-sm leading-7 text-[var(--color-text-secondary)]">
            {entry.track.strapline}
          </p>
        </div>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={expanded}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-4 text-sm text-[var(--color-text-primary)] transition hover:border-[var(--color-border-hover)] hover:bg-[var(--color-bg-hover)]"
        >
          {expanded ? (
            <ChevronUp className="h-4 w-4" aria-hidden="true" />
          ) : (
            <ChevronDown className="h-4 w-4" aria-hidden="true" />
          )}
          {expanded ? 'Hide hierarchy' : 'Expand hierarchy'}
        </button>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-4">
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-3">
          <p className="text-xs tracking-[0.18em] text-[var(--color-text-tertiary)] uppercase">
            Modules
          </p>
          <p className="mt-2 text-xl font-semibold text-[var(--color-text-primary)]">
            {entry.moduleCount}
          </p>
        </div>
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-3">
          <p className="text-xs tracking-[0.18em] text-[var(--color-text-tertiary)] uppercase">
            Lessons
          </p>
          <p className="mt-2 text-xl font-semibold text-[var(--color-text-primary)]">
            {entry.lessonCount}
          </p>
        </div>
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-3">
          <p className="text-xs tracking-[0.18em] text-[var(--color-text-tertiary)] uppercase">
            Projects
          </p>
          <p className="mt-2 text-xl font-semibold text-[var(--color-text-primary)]">
            {entry.projectCount}
          </p>
        </div>
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-3">
          <p className="text-xs tracking-[0.18em] text-[var(--color-text-tertiary)] uppercase">
            Time
          </p>
          <p className="mt-2 text-xl font-semibold text-[var(--color-text-primary)]">
            {Math.round(entry.minutes / 60)}h
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-4">
        <div className="flex items-center justify-between gap-3 text-sm text-[var(--color-text-secondary)]">
          <span>Track progress</span>
          <span>
            {insight.progress.completed}/{insight.progress.total}
          </span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-[rgba(148,163,184,0.16)]">
          <div
            className="h-full rounded-full bg-[linear-gradient(90deg,var(--color-learn),var(--color-accent))]"
            style={{ width: insight.progress.percentage + '%' }}
          />
        </div>
      </div>

      {firstIncompleteLesson && (
        <div className="mt-5 rounded-2xl border border-[var(--color-border)] bg-[rgba(56,189,248,0.08)] p-4">
          <p className="font-mono text-xs tracking-[0.24em] text-[var(--color-text-tertiary)] uppercase">
            Next checkpoint
          </p>
          <p className="mt-2 text-base font-semibold text-[var(--color-text-primary)]">
            {firstIncompleteLesson.lessonEntry.title}
          </p>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            {firstIncompleteLesson.moduleEntry.title}
          </p>
        </div>
      )}

      {expanded && (
        <div className="mt-6 space-y-4">
          {entry.track.modules.map((moduleEntry, moduleIndex) => {
            const moduleProgress = getModuleProgress(
              progressState,
              entry.track.slug,
              moduleEntry.slug,
            );
            const moduleCompleted = isModuleCompleted(
              progressState,
              entry.track.slug,
              moduleEntry.slug,
            );

            return (
              <section
                key={moduleEntry.slug}
                className="rounded-[24px] border border-[var(--color-border)] bg-[rgba(2,6,23,0.36)] p-4"
              >
                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs text-[var(--color-text-secondary)]">
                        Module {String(moduleIndex + 1).padStart(2, '0')}
                      </span>
                      {moduleCompleted && (
                        <span className="rounded-full border border-[rgba(34,197,94,0.28)] bg-[rgba(34,197,94,0.12)] px-3 py-1 text-xs text-[var(--color-text-primary)]">
                          Cleared
                        </span>
                      )}
                    </div>
                    <h4 className="mt-3 text-xl font-semibold text-[var(--color-text-primary)]">
                      {moduleEntry.title}
                    </h4>
                    <p className="mt-2 text-sm leading-7 text-[var(--color-text-secondary)]">
                      {moduleEntry.summary}
                    </p>
                  </div>
                  <div className="min-w-[14rem] rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-3">
                    <div className="flex items-center justify-between gap-3 text-sm text-[var(--color-text-secondary)]">
                      <span>Module progress</span>
                      <span>
                        {moduleProgress.completed}/{moduleProgress.total}
                      </span>
                    </div>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-[rgba(148,163,184,0.16)]">
                      <div
                        className="h-full rounded-full bg-[linear-gradient(90deg,var(--color-learn),var(--color-accent))]"
                        style={{ width: moduleProgress.percentage + '%' }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  {moduleEntry.lessons.map((lessonEntry) => {
                    const completed = isLessonCompleted(
                      progressState,
                      entry.track.slug,
                      lessonEntry.slug,
                    );
                    const isNextLesson =
                      firstIncompleteLesson?.lessonEntry.slug === lessonEntry.slug;

                    return (
                      <a
                        key={lessonEntry.slug}
                        href={getLessonHref(entry.track.slug, lessonEntry.slug)}
                        className="block rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-4 transition hover:border-[var(--color-border-hover)] hover:bg-[var(--color-bg-hover)]"
                      >
                        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                          <div className="flex items-start gap-3">
                            {completed ? (
                              <CheckCircle2
                                className="mt-1 h-5 w-5 text-[var(--color-accent)]"
                                aria-hidden="true"
                              />
                            ) : isNextLesson ? (
                              <Compass
                                className="mt-1 h-5 w-5 text-[var(--color-learn)]"
                                aria-hidden="true"
                              />
                            ) : (
                              <Circle
                                className="mt-1 h-5 w-5 text-[var(--color-text-tertiary)]"
                                aria-hidden="true"
                              />
                            )}
                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <p className="text-base font-semibold text-[var(--color-text-primary)]">
                                  {lessonEntry.title}
                                </p>
                                {isNextLesson && (
                                  <span className="rounded-full border border-[rgba(56,189,248,0.28)] bg-[rgba(56,189,248,0.12)] px-2 py-1 text-[11px] text-[var(--color-text-primary)]">
                                    Up next
                                  </span>
                                )}
                              </div>
                              <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                                {lessonEntry.format} / {lessonEntry.duration}
                              </p>
                            </div>
                          </div>
                          <span className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[var(--color-border)] px-3 text-sm text-[var(--color-text-secondary)]">
                            <Clock3 className="h-4 w-4" aria-hidden="true" />
                            {lessonEntry.output.kind}
                          </span>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <a
          href={insight.actionHref}
          className="command-button border border-transparent bg-[var(--color-accent)] text-[var(--color-accent-contrast)] hover:bg-[var(--color-accent-hover)]"
        >
          {insight.actionLabel}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
        <a
          href={entry.href}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--color-border)] px-4 text-sm text-[var(--color-text-secondary)] transition hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-primary)]"
        >
          {insight.status === 'locked' ? (
            <LockKeyhole className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Compass className="h-4 w-4" aria-hidden="true" />
          )}
          Overview
        </a>
        <a
          href={getProjectHref(entry.track.slug, entry.track.projects[0].slug)}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--color-border)] px-4 text-sm text-[var(--color-text-secondary)] transition hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-primary)]"
        >
          <Clock3 className="h-4 w-4" aria-hidden="true" />
          Project ladder
        </a>
      </div>
    </article>
  );
}

export default function LearningAtlas({ initialView = 'contents', initialQuery = '' }: Props) {
  const progressState = useLearnProgressState();
  const [view, setView] = useState<AtlasView>(initialView);
  const [query, setQuery] = useState(initialQuery);
  const [stageFilter, setStageFilter] = useState<StageFilter>('all');
  const [statusFilter, setStatusFilter] = useState<AtlasStatusFilter>('all');
  const [resourceFilter, setResourceFilter] = useState<ResourceFilter>('all');
  const [glossaryFilter, setGlossaryFilter] = useState<GlossaryFilter>('all');
  const [expandedTrackSlugs, setExpandedTrackSlugs] = useState<string[]>([]);
  const deferredQuery = useDeferredValue(query);

  const trackInsights = useMemo(
    () =>
      new Map(
        learnCatalogEntries.map((entry) => [
          entry.track.slug,
          buildTrackInsight(entry.track, progressState),
        ]),
      ),
    [progressState],
  );

  const queryTokens = useMemo(() => splitQuery(deferredQuery), [deferredQuery]);

  const filteredCatalogEntries = useMemo(
    () =>
      learnCatalogEntries.filter((entry) => {
        const insight = trackInsights.get(entry.track.slug);
        if (!insight) return false;
        if (stageFilter !== 'all' && entry.stage !== stageFilter) return false;
        if (statusFilter !== 'all' && insight.status !== statusFilter) return false;

        return matchesTokens(queryTokens, [
          entry.track.title,
          entry.track.strapline,
          entry.track.summary,
          entry.track.weeklyRhythm,
          ...entry.track.modules.map((moduleEntry) => moduleEntry.title),
          ...entry.track.modules.map((moduleEntry) => moduleEntry.summary),
          ...entry.track.modules.flatMap((moduleEntry) =>
            moduleEntry.lessons.map((lessonEntry) => lessonEntry.title),
          ),
          ...entry.track.modules.flatMap((moduleEntry) =>
            moduleEntry.lessons.flatMap((lessonEntry) => lessonEntry.concepts),
          ),
          ...entry.track.projects.map((projectEntry) => projectEntry.title),
          ...entry.track.projects.flatMap((projectEntry) => projectEntry.skills),
          ...entry.technologies,
          ...entry.track.outcomes,
          ...entry.prerequisites.map((prerequisite) => prerequisite.title),
          ...entry.nextTracks.map((trackEntry) => trackEntry.title),
        ]);
      }),
    [queryTokens, stageFilter, statusFilter, trackInsights],
  );

  const filteredRoadmapGroups = useMemo(() => {
    const allowedTrackSlugs = new Set(filteredCatalogEntries.map((entry) => entry.track.slug));

    return learningStageGroups
      .map((group) => ({
        ...group,
        entries: learnCatalogEntries.filter(
          (entry) => entry.stage === group.stage && allowedTrackSlugs.has(entry.track.slug),
        ),
      }))
      .filter((group) => group.entries.length > 0);
  }, [filteredCatalogEntries]);

  const filteredResourceEntries = useMemo(
    () =>
      learnResourceEntries.filter((entry) => {
        if (resourceFilter !== 'all' && entry.kind !== resourceFilter) return false;

        return matchesTokens(queryTokens, [
          entry.label,
          entry.kind,
          ...entry.trackTitles,
          ...entry.concepts,
          ...entry.relatedLessons.map((lessonEntry) => lessonEntry.lessonTitle),
        ]);
      }),
    [queryTokens, resourceFilter],
  );

  const filteredGlossaryEntries = useMemo(
    () =>
      learnGlossaryEntries.filter((entry) => {
        if (glossaryFilter !== 'all' && entry.kind !== glossaryFilter) return false;

        return matchesTokens(queryTokens, [
          entry.term,
          entry.kind,
          ...entry.trackTitles,
          ...entry.sampleLocations.map((location) => location.label),
        ]);
      }),
    [queryTokens, glossaryFilter],
  );

  const visibleResources = filteredResourceEntries.slice(0, 12);
  const visibleGlossaryEntries = filteredGlossaryEntries.slice(0, 16);
  const unlockedTrackCount = Array.from(trackInsights.values()).filter(
    (entry) => entry.status !== 'locked',
  ).length;
  const visibleTrackSlugs = filteredCatalogEntries.map((entry) => entry.track.slug);
  const allVisibleExpanded =
    visibleTrackSlugs.length > 0 &&
    visibleTrackSlugs.every((slug) => expandedTrackSlugs.includes(slug));

  return (
    <section
      id="learn-atlas"
      className="mt-8 rounded-[32px] border border-[var(--color-border)] bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.14),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent),var(--color-bg-surface)] p-6 shadow-[0_24px_90px_rgba(2,8,23,0.24)] sm:p-8"
    >
      <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
        <div className="max-w-3xl">
          <p className="font-mono text-xs tracking-[0.24em] text-[var(--color-text-tertiary)] uppercase">
            Learning atlas
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
            Browse the curriculum like a product, not a folder tree.
          </h2>
          <p className="mt-4 text-sm leading-8 text-[var(--color-text-secondary)] sm:text-base">
            Move between a dense catalog, milestone roadmap, resource library, and generated
            glossary without leaving the Learn experience.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {atlasTabs.map((tab) => {
            const Icon = tab.icon;
            const active = view === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  startTransition(() => {
                    setView(tab.id);
                  });
                }}
                aria-pressed={active}
                className={
                  'inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm transition ' +
                  (active
                    ? 'border-[var(--color-learn)] bg-[rgba(56,189,248,0.12)] text-[var(--color-text-primary)]'
                    : 'border-[var(--color-border)] bg-[var(--color-bg-panel)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-hover)] hover:bg-[var(--color-bg-hover)]')
                }
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-panel)] p-4">
          <p className="text-xs tracking-[0.18em] text-[var(--color-text-tertiary)] uppercase">
            Tracks
          </p>
          <p className="mt-3 text-3xl font-semibold text-[var(--color-text-primary)]">
            {learnCatalogEntries.length}
          </p>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            One connected curriculum map.
          </p>
        </div>
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-panel)] p-4">
          <p className="text-xs tracking-[0.18em] text-[var(--color-text-tertiary)] uppercase">
            Unlocked now
          </p>
          <p className="mt-3 text-3xl font-semibold text-[var(--color-text-primary)]">
            {unlockedTrackCount}
          </p>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            Tracks you can start or continue locally.
          </p>
        </div>
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-panel)] p-4">
          <p className="text-xs tracking-[0.18em] text-[var(--color-text-tertiary)] uppercase">
            Resources
          </p>
          <p className="mt-3 text-3xl font-semibold text-[var(--color-text-primary)]">
            {learnResourceEntries.length}
          </p>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            Guides, docs, tools, and papers.
          </p>
        </div>
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-panel)] p-4">
          <p className="text-xs tracking-[0.18em] text-[var(--color-text-tertiary)] uppercase">
            Glossary terms
          </p>
          <p className="mt-3 text-3xl font-semibold text-[var(--color-text-primary)]">
            {learnGlossaryEntries.length}
          </p>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            Concepts, tools, technologies, and skills.
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-[28px] border border-[var(--color-border)] bg-[rgba(2,6,23,0.44)] p-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <label className="flex min-h-14 items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-4 text-[var(--color-text-secondary)] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] xl:min-w-[28rem]">
            <Search className="h-5 w-5" aria-hidden="true" />
            <input
              value={query}
              onChange={(event) => {
                const value = event.target.value;
                startTransition(() => {
                  setQuery(value);
                });
              }}
              placeholder="Search track names, concepts, tools, projects, and resources..."
              aria-label="Search the learning atlas"
              className="w-full bg-transparent text-base text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-tertiary)]"
            />
          </label>
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-4 py-3 text-sm text-[var(--color-text-secondary)]">
            {view === 'catalog' && filteredCatalogEntries.length + ' tracks shown'}
            {view === 'contents' && filteredCatalogEntries.length + ' track hierarchies shown'}
            {view === 'roadmap' && filteredCatalogEntries.length + ' roadmap milestones shown'}
            {view === 'resources' &&
              visibleResources.length +
                ' of ' +
                filteredResourceEntries.length +
                ' resources shown'}
            {view === 'glossary' &&
              visibleGlossaryEntries.length +
                ' of ' +
                filteredGlossaryEntries.length +
                ' terms shown'}
          </div>
        </div>

        {(view === 'catalog' || view === 'contents' || view === 'roadmap') && (
          <>
            <div className="mt-4 flex flex-wrap gap-2">
              {stageFilters.map((filterEntry) => (
                <FilterPill
                  key={filterEntry.id}
                  active={stageFilter === filterEntry.id}
                  label={filterEntry.label}
                  onClick={() => {
                    startTransition(() => {
                      setStageFilter(filterEntry.id);
                    });
                  }}
                />
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {statusFilters.map((filterEntry) => (
                <FilterPill
                  key={filterEntry.id}
                  active={statusFilter === filterEntry.id}
                  label={filterEntry.label}
                  onClick={() => {
                    startTransition(() => {
                      setStatusFilter(filterEntry.id);
                    });
                  }}
                />
              ))}
            </div>
            {view === 'contents' && filteredCatalogEntries.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    startTransition(() => {
                      setExpandedTrackSlugs((current) =>
                        allVisibleExpanded
                          ? current.filter((slug) => !visibleTrackSlugs.includes(slug))
                          : Array.from(new Set([...current, ...visibleTrackSlugs])),
                      );
                    });
                  }}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-panel)] px-4 text-sm text-[var(--color-text-primary)] transition hover:border-[var(--color-border-hover)] hover:bg-[var(--color-bg-hover)]"
                >
                  {allVisibleExpanded ? (
                    <ChevronUp className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <ChevronDown className="h-4 w-4" aria-hidden="true" />
                  )}
                  {allVisibleExpanded ? 'Collapse visible tracks' : 'Expand visible tracks'}
                </button>
              </div>
            )}
          </>
        )}
        {view === 'resources' && (
          <div className="mt-4 flex flex-wrap gap-2">
            {resourceFilters.map((filterEntry) => (
              <FilterPill
                key={filterEntry.id}
                active={resourceFilter === filterEntry.id}
                label={filterEntry.label}
                onClick={() => {
                  startTransition(() => {
                    setResourceFilter(filterEntry.id);
                  });
                }}
              />
            ))}
          </div>
        )}
        {view === 'glossary' && (
          <div className="mt-4 flex flex-wrap gap-2">
            {glossaryFilters.map((filterEntry) => (
              <FilterPill
                key={filterEntry.id}
                active={glossaryFilter === filterEntry.id}
                label={filterEntry.label}
                onClick={() => {
                  startTransition(() => {
                    setGlossaryFilter(filterEntry.id);
                  });
                }}
              />
            ))}
          </div>
        )}
      </div>

      {view === 'catalog' && (
        <div className="mt-6 grid gap-4 xl:grid-cols-2">
          {filteredCatalogEntries.length > 0 ? (
            filteredCatalogEntries.map((entry) => {
              const insight = trackInsights.get(entry.track.slug);
              return insight ? (
                <CatalogCard key={entry.track.slug} entry={entry} insight={insight} />
              ) : null;
            })
          ) : (
            <div className="rounded-[24px] border border-dashed border-[var(--color-border)] bg-[var(--color-bg-panel)] p-6 text-sm leading-7 text-[var(--color-text-secondary)] xl:col-span-2">
              No tracks matched those filters. Try searching by concept, technology, or track name.
            </div>
          )}
        </div>
      )}

      {view === 'contents' && (
        <div className="mt-6 space-y-4">
          {filteredCatalogEntries.length > 0 ? (
            filteredCatalogEntries.map((entry) => {
              const insight = trackInsights.get(entry.track.slug);
              return insight ? (
                <ContentsTrackCard
                  key={entry.track.slug}
                  entry={entry}
                  insight={insight}
                  progressState={progressState}
                  expanded={expandedTrackSlugs.includes(entry.track.slug)}
                  onToggle={() => {
                    startTransition(() => {
                      setExpandedTrackSlugs((current) =>
                        current.includes(entry.track.slug)
                          ? current.filter((slug) => slug !== entry.track.slug)
                          : [...current, entry.track.slug],
                      );
                    });
                  }}
                />
              ) : null;
            })
          ) : (
            <div className="rounded-[24px] border border-dashed border-[var(--color-border)] bg-[var(--color-bg-panel)] p-6 text-sm leading-7 text-[var(--color-text-secondary)]">
              No track contents matched those filters. Try searching by module name, lesson title,
              concept, or project.
            </div>
          )}
        </div>
      )}

      {view === 'roadmap' && (
        <div className="mt-6 grid gap-4 xl:grid-cols-4 xl:items-start">
          {filteredRoadmapGroups.length > 0 ? (
            filteredRoadmapGroups.map((group) => (
              <div
                key={group.stage}
                className="rounded-[24px] border border-[var(--color-border)] bg-[var(--color-bg-panel)] p-4"
              >
                <p className="font-mono text-xs tracking-[0.24em] text-[var(--color-text-tertiary)] uppercase">
                  {group.eyebrow}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-[var(--color-text-primary)]">
                  {group.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-[var(--color-text-secondary)]">
                  {group.summary}
                </p>
                <div className="mt-5 space-y-3">
                  {group.entries.map((entry) => {
                    const insight = trackInsights.get(entry.track.slug);
                    if (!insight) return null;
                    return (
                      <article
                        key={entry.track.slug}
                        className="rounded-[24px] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-4"
                      >
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs text-[var(--color-text-secondary)]">
                            {statusLabel(insight.status)}
                          </span>
                          <span className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs text-[var(--color-text-secondary)]">
                            {entry.track.estimatedWeeks}
                          </span>
                        </div>
                        <h4 className="mt-3 text-lg font-semibold text-[var(--color-text-primary)]">
                          {entry.track.title}
                        </h4>
                        <p className="mt-2 text-sm leading-7 text-[var(--color-text-secondary)]">
                          {entry.track.summary}
                        </p>
                        <div className="mt-4 text-sm text-[var(--color-text-secondary)]">
                          <p>
                            <span className="font-medium text-[var(--color-text-primary)]">
                              Prerequisites:
                            </span>{' '}
                            {entry.prerequisites.length > 0
                              ? entry.prerequisites
                                  .map((prerequisite) => prerequisite.title)
                                  .join(' / ')
                              : 'None'}
                          </p>
                          <p className="mt-2">
                            <span className="font-medium text-[var(--color-text-primary)]">
                              Unlocks:
                            </span>{' '}
                            {entry.nextTracks.length > 0
                              ? entry.nextTracks.map((trackEntry) => trackEntry.title).join(' / ')
                              : 'Capstone and applied delivery'}
                          </p>
                        </div>
                        <div className="mt-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-panel)] p-3">
                          <div className="flex items-center justify-between gap-3 text-sm text-[var(--color-text-secondary)]">
                            <span>Progress</span>
                            <span>{insight.progress.percentage}%</span>
                          </div>
                          <div className="mt-3 h-2 overflow-hidden rounded-full bg-[rgba(148,163,184,0.16)]">
                            <div
                              className="h-full rounded-full bg-[linear-gradient(90deg,var(--color-learn),var(--color-accent))]"
                              style={{ width: insight.progress.percentage + '%' }}
                            />
                          </div>
                        </div>
                        <div className="mt-4 flex flex-wrap items-center gap-3">
                          <a
                            href={insight.actionHref}
                            className="command-button border border-transparent bg-[var(--color-accent)] text-[var(--color-accent-contrast)] hover:bg-[var(--color-accent-hover)]"
                          >
                            {insight.actionLabel}
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                          </a>
                          <a
                            href={entry.href}
                            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--color-border)] px-4 text-sm text-[var(--color-text-secondary)] transition hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-primary)]"
                          >
                            View track
                          </a>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-[24px] border border-dashed border-[var(--color-border)] bg-[var(--color-bg-panel)] p-6 text-sm leading-7 text-[var(--color-text-secondary)] xl:col-span-4">
              No roadmap milestones matched those filters. Try a broader stage or status selection.
            </div>
          )}
        </div>
      )}

      {view === 'resources' && (
        <div className="mt-6 grid gap-4 xl:grid-cols-3">
          {visibleResources.length > 0 ? (
            visibleResources.map((entry) => (
              <article
                key={entry.id}
                className="rounded-[24px] border border-[var(--color-border)] bg-[var(--color-bg-panel)] p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs text-[var(--color-text-secondary)]">
                        {entry.kind}
                      </span>
                      <span className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs text-[var(--color-text-secondary)]">
                        {entry.trackCount} tracks
                      </span>
                    </div>
                    <h3 className="mt-3 text-xl font-semibold text-[var(--color-text-primary)]">
                      {entry.label}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-[var(--color-text-secondary)]">
                      Used across {entry.lessonCount} lessons in the current curriculum.
                    </p>
                  </div>
                  <a
                    href={entry.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center justify-center rounded-full border border-[var(--color-border)] px-3 text-[var(--color-text-secondary)] transition hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-primary)]"
                    aria-label={entry.label + ' external resource'}
                  >
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {entry.trackTitles.slice(0, 4).map((trackTitle) => (
                    <span
                      key={trackTitle}
                      className="rounded-full border border-[var(--color-border)] px-3 py-1 text-sm text-[var(--color-text-secondary)]"
                    >
                      {trackTitle}
                    </span>
                  ))}
                </div>
                <div className="mt-5 space-y-2">
                  {entry.relatedLessons.slice(0, 3).map((lessonEntry) => (
                    <a
                      key={lessonEntry.href}
                      href={lessonEntry.href}
                      className="flex items-center justify-between gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-4 py-3 text-sm text-[var(--color-text-secondary)] transition hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-primary)]"
                    >
                      <span>
                        <span className="block font-medium text-[var(--color-text-primary)]">
                          {lessonEntry.lessonTitle}
                        </span>
                        <span className="mt-1 block text-xs text-[var(--color-text-tertiary)]">
                          {lessonEntry.trackTitle}
                        </span>
                      </span>
                      <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </article>
            ))
          ) : (
            <div className="rounded-[24px] border border-dashed border-[var(--color-border)] bg-[var(--color-bg-panel)] p-6 text-sm leading-7 text-[var(--color-text-secondary)] xl:col-span-3">
              No resources matched those filters. Try a different concept, track, or resource type.
            </div>
          )}
        </div>
      )}

      {view === 'glossary' && (
        <div className="mt-6 grid gap-4 xl:grid-cols-4">
          {visibleGlossaryEntries.length > 0 ? (
            visibleGlossaryEntries.map((entry) => (
              <article
                key={entry.id}
                className="rounded-[24px] border border-[var(--color-border)] bg-[var(--color-bg-panel)] p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs text-[var(--color-text-secondary)]">
                        {entry.kind}
                      </span>
                      <span className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs text-[var(--color-text-secondary)]">
                        {entry.trackCount} tracks
                      </span>
                    </div>
                    <h3 className="mt-3 text-2xl font-semibold text-[var(--color-text-primary)]">
                      {entry.term}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-[var(--color-text-secondary)]">
                      Shows up in {entry.locationCount} learning checkpoints across the current
                      roadmap.
                    </p>
                  </div>
                  <BookOpen className="mt-1 h-5 w-5 text-[var(--color-learn)]" aria-hidden="true" />
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {entry.trackTitles.slice(0, 4).map((trackTitle) => (
                    <span
                      key={trackTitle}
                      className="rounded-full border border-[var(--color-border)] px-3 py-1 text-sm text-[var(--color-text-secondary)]"
                    >
                      {trackTitle}
                    </span>
                  ))}
                </div>
                <div className="mt-5 space-y-2">
                  {entry.sampleLocations.slice(0, 3).map((location) => (
                    <a
                      key={location.href + location.label}
                      href={location.href}
                      className="flex items-center justify-between gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-4 py-3 text-sm text-[var(--color-text-secondary)] transition hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-primary)]"
                    >
                      <span>
                        <span className="block font-medium text-[var(--color-text-primary)]">
                          {location.label}
                        </span>
                        <span className="mt-1 block text-xs text-[var(--color-text-tertiary)]">
                          {location.trackTitle}
                        </span>
                      </span>
                      <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </article>
            ))
          ) : (
            <div className="rounded-[24px] border border-dashed border-[var(--color-border)] bg-[var(--color-bg-panel)] p-6 text-sm leading-7 text-[var(--color-text-secondary)] xl:col-span-4">
              No glossary entries matched that search yet. Try searching by concept, tool, or
              project skill.
            </div>
          )}
        </div>
      )}
    </section>
  );
}
