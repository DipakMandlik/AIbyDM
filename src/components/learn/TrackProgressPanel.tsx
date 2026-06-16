import { ArrowRight, Compass, Sparkles } from 'lucide-react';

import { getLearningTrack, getLessonHref } from '@data/learn/catalog';
import { getCurrentStreak, getTrackProgress, isLessonCompleted } from '@data/learn/progress';

import { useLearnProgressState } from '@components/learn/useLearnProgress';

interface Props {
  trackSlug: string;
}

export default function TrackProgressPanel({ trackSlug }: Props) {
  const progressState = useLearnProgressState();
  const trackEntry = getLearningTrack(trackSlug);

  if (!trackEntry) return null;

  const progress = getTrackProgress(progressState, trackSlug);
  const nextLesson = trackEntry.modules
    .flatMap((moduleEntry) =>
      moduleEntry.lessons.map((lessonEntry) => ({ moduleEntry, lessonEntry })),
    )
    .find((entry) => !isLessonCompleted(progressState, trackSlug, entry.lessonEntry.slug));

  return (
    <div className="rounded-[28px] border border-[var(--color-border)] bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.16),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent),var(--color-bg-surface)] p-5 shadow-[0_18px_50px_rgba(2,8,23,0.18)] sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-mono text-xs tracking-[0.24em] text-[var(--color-text-tertiary)] uppercase">
            Track Progress
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-[var(--color-text-primary)]">
            {progress.percentage}% complete
          </h2>
        </div>
        <Sparkles className="h-6 w-6 text-[var(--color-learn)]" aria-hidden="true" />
      </div>
      <div className="mt-5 h-2 overflow-hidden rounded-full bg-[rgba(148,163,184,0.16)]">
        <div
          className="h-full rounded-full bg-[linear-gradient(90deg,var(--color-learn),var(--color-accent))]"
          style={{ width: progress.percentage + '%' }}
        />
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-panel)] p-4">
          <p className="text-sm text-[var(--color-text-secondary)]">Lessons done</p>
          <p className="mt-2 text-3xl font-semibold text-[var(--color-text-primary)]">
            {progress.completed}
            <span className="ml-1 text-lg text-[var(--color-text-tertiary)]">
              / {progress.total}
            </span>
          </p>
        </div>
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-panel)] p-4">
          <p className="text-sm text-[var(--color-text-secondary)]">Current streak</p>
          <p className="mt-2 text-3xl font-semibold text-[var(--color-text-primary)]">
            {getCurrentStreak(progressState)} days
          </p>
        </div>
      </div>
      {nextLesson ? (
        <a
          href={getLessonHref(trackSlug, nextLesson.lessonEntry.slug)}
          className="mt-5 flex items-center justify-between gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-panel)] p-4 transition hover:border-[var(--color-border-hover)] hover:bg-[var(--color-bg-hover)]"
        >
          <div>
            <p className="font-mono text-xs tracking-[0.24em] text-[var(--color-text-tertiary)] uppercase">
              Next checkpoint
            </p>
            <p className="mt-2 text-lg font-semibold text-[var(--color-text-primary)]">
              {nextLesson.lessonEntry.title}
            </p>
            <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
              {nextLesson.moduleEntry.title}
            </p>
          </div>
          <span className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--color-border)] px-4 text-sm text-[var(--color-text-secondary)]">
            <Compass className="h-4 w-4" aria-hidden="true" />
            Resume
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </a>
      ) : (
        <div className="mt-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-panel)] p-4 text-sm leading-7 text-[var(--color-text-secondary)]">
          Every lesson in this track is marked complete locally. You can review the capstone, revise
          a lesson, or move to the next connected track.
        </div>
      )}
    </div>
  );
}
