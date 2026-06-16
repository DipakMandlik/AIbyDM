import {
  ArrowRight,
  Compass,
  Layers3,
  LockKeyhole,
  Radar,
  RotateCcw,
  Sparkles,
  Target,
  TrendingUp,
} from 'lucide-react';

import {
  getTrackHref,
  getTrackLessonCount,
  getTrackProjectCount,
  learningStageGroups,
  type LearningTrack,
} from '@data/learn/catalog';
import { getContinueLearning, getProgressSummary, resetLearnProgress } from '@data/learn/progress';
import { getRecommendedTracks, getTrackStatus } from '@data/learn/recommendations';

import { useLearnProgressState } from '@components/learn/useLearnProgress';

function statusTone(status: ReturnType<typeof getTrackStatus>): string {
  switch (status) {
    case 'complete':
      return 'border-[rgba(34,197,94,0.28)] bg-[rgba(34,197,94,0.12)] text-[var(--color-text-primary)]';
    case 'in-progress':
      return 'border-[rgba(56,189,248,0.28)] bg-[rgba(56,189,248,0.12)] text-[var(--color-text-primary)]';
    case 'ready':
      return 'border-[rgba(250,204,21,0.28)] bg-[rgba(250,204,21,0.12)] text-[var(--color-text-primary)]';
    case 'locked':
      return 'border-[var(--color-border)] bg-[var(--color-bg-panel)] text-[var(--color-text-secondary)]';
    default:
      return 'border-[var(--color-border)] bg-[var(--color-bg-panel)] text-[var(--color-text-secondary)]';
  }
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

function stageActionLabel(status: ReturnType<typeof getTrackStatus>): string {
  switch (status) {
    case 'in-progress':
      return 'Continue stage';
    case 'ready':
      return 'Start stage';
    case 'complete':
      return 'Review stage';
    case 'locked':
      return 'See prerequisites';
    default:
      return 'Open stage';
  }
}

function fallbackTrack(groupTracks: LearningTrack[]): LearningTrack | undefined {
  return groupTracks[0];
}

export default function LearnControlCenter() {
  const progressState = useLearnProgressState();
  const progressSummary = getProgressSummary(progressState);
  const continueItem = getContinueLearning(progressState);
  const recommendedTracks = getRecommendedTracks(progressState, 12);
  const statusTotals = {
    'not-started': 0,
    complete: 0,
    'in-progress': 0,
    ready: 0,
    locked: 0,
  } as Record<ReturnType<typeof getTrackStatus>, number>;

  for (const group of learningStageGroups) {
    for (const track of group.tracks) {
      const status = getTrackStatus(progressState, track);
      statusTotals[status] += 1;
    }
  }

  const stageSummaries = learningStageGroups.map((group) => {
    const stageTrackStates = group.tracks.map((track) => ({
      track,
      status: getTrackStatus(progressState, track),
    }));
    const recommendedEntry = recommendedTracks.find((entry) => entry.track.stage === group.stage);
    const leadTrackState =
      (recommendedEntry &&
        stageTrackStates.find((entry) => entry.track.slug === recommendedEntry.track.slug)) ||
      stageTrackStates.find((entry) => entry.status === 'in-progress') ||
      stageTrackStates.find((entry) => entry.status === 'ready') ||
      stageTrackStates.find((entry) => entry.status === 'complete') ||
      (fallbackTrack(group.tracks)
        ? {
            track: fallbackTrack(group.tracks)!,
            status: getTrackStatus(progressState, fallbackTrack(group.tracks)!),
          }
        : undefined);

    return {
      ...group,
      trackCount: group.tracks.length,
      lessonCount: group.tracks.reduce((sum, track) => sum + getTrackLessonCount(track), 0),
      projectCount: group.tracks.reduce((sum, track) => sum + getTrackProjectCount(track), 0),
      completeCount: stageTrackStates.filter((entry) => entry.status === 'complete').length,
      inProgressCount: stageTrackStates.filter((entry) => entry.status === 'in-progress').length,
      readyCount: stageTrackStates.filter((entry) => entry.status === 'ready').length,
      lockedCount: stageTrackStates.filter((entry) => entry.status === 'locked').length,
      leadTrack: leadTrackState?.track,
      leadStatus: leadTrackState?.status,
      leadReason:
        recommendedEntry?.reason ||
        (leadTrackState?.status === 'in-progress'
          ? 'Keep the momentum going inside this stage.'
          : leadTrackState?.status === 'ready'
            ? 'This stage has a clean entry point waiting now.'
            : leadTrackState?.status === 'complete'
              ? 'Review the finished work or push into the next stage.'
              : 'Unlock prerequisites in the earlier stages first.'),
    };
  });

  const primaryHref =
    continueItem?.href ?? recommendedTracks[0]?.href ?? getTrackHref('ai-foundations');
  const primaryLabel = continueItem ? 'Continue current lesson' : 'Start the recommended path';

  return (
    <section className="mt-8 rounded-[32px] border border-[var(--color-border)] bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.14),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(56,189,248,0.14),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent),var(--color-bg-surface)] p-6 shadow-[0_24px_90px_rgba(2,8,23,0.24)] sm:p-8">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
        <div className="max-w-3xl">
          <div className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[rgba(148,163,184,0.22)] bg-[rgba(15,23,42,0.55)] px-4 text-sm text-[var(--color-text-secondary)]">
            <Radar className="h-4 w-4 text-[var(--color-learn)]" aria-hidden="true" />
            Browser-saved roadmap state
          </div>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
            See which parts of the curriculum are open right now.
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-8 text-[var(--color-text-secondary)] sm:text-base">
            Progress is saved locally in this browser only. Use this control center to track what is
            unlocked, what is active, what is complete, and where the next clean starting point
            lives.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {(['complete', 'in-progress', 'ready', 'locked'] as const).map((status) => (
              <span
                key={status}
                className={
                  'inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm ' +
                  statusTone(status)
                }
              >
                <span className="font-medium">{statusLabel(status)}</span>
                <span className="text-[var(--color-text-secondary)]">{statusTotals[status]}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:w-[25rem] xl:grid-cols-1">
          <a
            href={primaryHref}
            className="command-button border border-transparent bg-[var(--color-accent)] text-[var(--color-accent-contrast)] hover:bg-[var(--color-accent-hover)]"
          >
            <Target className="h-5 w-5" aria-hidden="true" />
            {primaryLabel}
          </a>
          <button
            type="button"
            onClick={() => {
              if (typeof window !== 'undefined') {
                const confirmed = window.confirm(
                  'Reset all AIByDM Learn progress saved in this browser? This only affects local progress on this device.',
                );
                if (!confirmed) return;
              }
              resetLearnProgress();
            }}
            className="command-button border border-[var(--color-border)] bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] hover:border-[var(--color-border-hover)] hover:bg-[var(--color-bg-hover)]"
          >
            <RotateCcw className="h-5 w-5" aria-hidden="true" />
            Reset progress
          </button>
          <a
            href={import.meta.env.BASE_URL + 'learn/roadmap/'}
            className="command-button border border-[var(--color-border)] bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] hover:border-[var(--color-border-hover)] hover:bg-[var(--color-bg-hover)]"
          >
            <Compass className="h-5 w-5" aria-hidden="true" />
            Open roadmap view
          </a>
          <a
            href={import.meta.env.BASE_URL + 'learn/catalog/'}
            className="command-button border border-[var(--color-border)] bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] hover:border-[var(--color-border-hover)] hover:bg-[var(--color-bg-hover)]"
          >
            <Layers3 className="h-5 w-5" aria-hidden="true" />
            Browse all tracks
          </a>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-panel)] p-4">
          <p className="text-xs tracking-[0.18em] text-[var(--color-text-tertiary)] uppercase">
            Lessons completed
          </p>
          <p className="mt-3 text-3xl font-semibold text-[var(--color-text-primary)]">
            {progressSummary.completedLessons}
          </p>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            Out of {progressSummary.totalLessons} local lesson checkpoints.
          </p>
        </div>
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-panel)] p-4">
          <p className="text-xs tracking-[0.18em] text-[var(--color-text-tertiary)] uppercase">
            Modules cleared
          </p>
          <p className="mt-3 text-3xl font-semibold text-[var(--color-text-primary)]">
            {progressSummary.completedModules}
          </p>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            Out of {progressSummary.totalModules} module milestones stored locally.
          </p>
        </div>
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-panel)] p-4">
          <p className="text-xs tracking-[0.18em] text-[var(--color-text-tertiary)] uppercase">
            Tracks finished
          </p>
          <p className="mt-3 text-3xl font-semibold text-[var(--color-text-primary)]">
            {progressSummary.completedTracks}
          </p>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            Full tracks marked complete in this browser.
          </p>
        </div>
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-panel)] p-4">
          <p className="text-xs tracking-[0.18em] text-[var(--color-text-tertiary)] uppercase">
            Unlocked now
          </p>
          <p className="mt-3 text-3xl font-semibold text-[var(--color-text-primary)]">
            {statusTotals.ready + statusTotals['in-progress'] + statusTotals.complete}
          </p>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            Tracks you can start, continue, or review immediately.
          </p>
        </div>
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-panel)] p-4">
          <p className="text-xs tracking-[0.18em] text-[var(--color-text-tertiary)] uppercase">
            Current streak
          </p>
          <p className="mt-3 text-3xl font-semibold text-[var(--color-text-primary)]">
            {progressSummary.streakDays} days
          </p>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            Keep the browser-open learning rhythm moving.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-4 xl:grid-cols-4 xl:items-start">
        {stageSummaries.map((group) => (
          <article
            key={group.stage}
            className="rounded-[24px] border border-[var(--color-border)] bg-[var(--color-bg-panel)] p-5 shadow-[0_16px_40px_rgba(2,8,23,0.14)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-xs tracking-[0.24em] text-[var(--color-text-tertiary)] uppercase">
                  {group.eyebrow}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-[var(--color-text-primary)]">
                  {group.title}
                </h3>
              </div>
              {group.lockedCount === group.trackCount ? (
                <LockKeyhole
                  className="mt-1 h-5 w-5 text-[var(--color-text-tertiary)]"
                  aria-hidden="true"
                />
              ) : group.inProgressCount > 0 ? (
                <TrendingUp className="mt-1 h-5 w-5 text-[var(--color-learn)]" aria-hidden="true" />
              ) : (
                <Sparkles className="mt-1 h-5 w-5 text-[var(--color-learn)]" aria-hidden="true" />
              )}
            </div>
            <p className="mt-3 text-sm leading-7 text-[var(--color-text-secondary)]">
              {group.summary}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-[var(--color-border)] px-3 py-1 text-sm text-[var(--color-text-secondary)]">
                {group.trackCount} tracks
              </span>
              <span className="rounded-full border border-[var(--color-border)] px-3 py-1 text-sm text-[var(--color-text-secondary)]">
                {group.lessonCount} lessons
              </span>
              <span className="rounded-full border border-[var(--color-border)] px-3 py-1 text-sm text-[var(--color-text-secondary)]">
                {group.projectCount} projects
              </span>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-2">
              <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-3">
                <p className="text-xs tracking-[0.18em] text-[var(--color-text-tertiary)] uppercase">
                  Active
                </p>
                <p className="mt-2 text-xl font-semibold text-[var(--color-text-primary)]">
                  {group.inProgressCount}
                </p>
              </div>
              <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-3">
                <p className="text-xs tracking-[0.18em] text-[var(--color-text-tertiary)] uppercase">
                  Ready
                </p>
                <p className="mt-2 text-xl font-semibold text-[var(--color-text-primary)]">
                  {group.readyCount}
                </p>
              </div>
              <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-3">
                <p className="text-xs tracking-[0.18em] text-[var(--color-text-tertiary)] uppercase">
                  Complete
                </p>
                <p className="mt-2 text-xl font-semibold text-[var(--color-text-primary)]">
                  {group.completeCount}
                </p>
              </div>
              <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-3">
                <p className="text-xs tracking-[0.18em] text-[var(--color-text-tertiary)] uppercase">
                  Locked
                </p>
                <p className="mt-2 text-xl font-semibold text-[var(--color-text-primary)]">
                  {group.lockedCount}
                </p>
              </div>
            </div>
            {group.leadTrack && group.leadStatus && (
              <div className="mt-4 rounded-2xl border border-[var(--color-border)] bg-[rgba(56,189,248,0.08)] p-4">
                <p className="font-mono text-xs tracking-[0.24em] text-[var(--color-text-tertiary)] uppercase">
                  Next opening
                </p>
                <p className="mt-2 text-base font-semibold text-[var(--color-text-primary)]">
                  {group.leadTrack.title}
                </p>
                <p className="mt-2 text-sm leading-7 text-[var(--color-text-secondary)]">
                  {group.leadReason}
                </p>
                <div className="mt-3 inline-flex min-h-10 items-center rounded-full border border-[var(--color-border)] px-3 text-sm text-[var(--color-text-secondary)]">
                  {statusLabel(group.leadStatus)}
                </div>
              </div>
            )}
            {group.leadTrack && group.leadStatus && (
              <a
                href={getTrackHref(group.leadTrack.slug)}
                className="command-button mt-5 border border-transparent bg-[var(--color-accent)] text-[var(--color-accent-contrast)] hover:bg-[var(--color-accent-hover)]"
              >
                {stageActionLabel(group.leadStatus)}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
