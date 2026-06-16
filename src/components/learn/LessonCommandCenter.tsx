import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Compass,
  Target,
  TrendingUp,
} from 'lucide-react';

import {
  getCurrentStreak,
  getModuleProgress,
  getTrackProgress,
  isLessonCompleted,
} from '@data/learn/progress';

import LessonProgressButton from '@components/learn/LessonProgressButton';
import { useLearnProgressState } from '@components/learn/useLearnProgress';

interface Props {
  trackSlug: string;
  trackTitle: string;
  trackHref: string;
  moduleSlug: string;
  moduleTitle: string;
  lessonSlug: string;
  lessonTitle: string;
  lessonDuration: string;
  lessonFormat: string;
  lessonChallenge: string;
  outputKind: string;
  outputTitle: string;
  lessonIndex: number;
  lessonCount: number;
  moduleIndex: number;
  moduleCount: number;
  moduleLessonIndex: number;
  moduleLessonCount: number;
  previousHref?: string;
  previousTitle?: string;
  nextHref?: string;
  nextTitle?: string;
}

export default function LessonCommandCenter({
  trackSlug,
  trackTitle,
  trackHref,
  moduleSlug,
  moduleTitle,
  lessonSlug,
  lessonTitle,
  lessonDuration,
  lessonFormat,
  lessonChallenge,
  outputKind,
  outputTitle,
  lessonIndex,
  lessonCount,
  moduleIndex,
  moduleCount,
  moduleLessonIndex,
  moduleLessonCount,
  previousHref,
  previousTitle,
  nextHref,
  nextTitle,
}: Props) {
  const progressState = useLearnProgressState();
  const trackProgress = getTrackProgress(progressState, trackSlug);
  const moduleProgress = getModuleProgress(progressState, trackSlug, moduleSlug);
  const completed = isLessonCompleted(progressState, trackSlug, lessonSlug);
  const currentStreak = getCurrentStreak(progressState);
  const nextActionHref = nextHref ?? trackHref;
  const nextActionTitle = nextTitle ?? trackTitle;
  const nextActionLabel = nextHref ? 'Open next lesson' : 'Review track';

  return (
    <section className="rounded-[28px] border border-[var(--color-border)] bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.14),transparent_22rem),linear-gradient(180deg,rgba(255,255,255,0.03),transparent),var(--color-bg-surface)] p-6 shadow-[0_20px_60px_rgba(2,8,23,0.18)]">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs tracking-[0.24em] text-[var(--color-text-tertiary)] uppercase">
            Learning command center
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-[var(--color-text-primary)]">
            {lessonTitle}
          </h2>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">Inside {moduleTitle}</p>
        </div>
        <span
          className={
            'inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm ' +
            (completed
              ? 'border-[rgba(34,197,94,0.28)] bg-[rgba(34,197,94,0.12)] text-[var(--color-text-primary)]'
              : 'border-[rgba(56,189,248,0.28)] bg-[rgba(56,189,248,0.12)] text-[var(--color-text-primary)]')
          }
        >
          {completed ? (
            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Target className="h-4 w-4" aria-hidden="true" />
          )}
          {completed ? 'Completed locally' : 'Current checkpoint'}
        </span>
      </div>

      <div className="mt-5 rounded-[24px] border border-[var(--color-border)] bg-[rgba(2,6,23,0.56)] p-4">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-[var(--color-border)] px-3 py-1 text-sm text-[var(--color-text-secondary)]">
            Lesson {lessonIndex} of {lessonCount}
          </span>
          <span className="rounded-full border border-[var(--color-border)] px-3 py-1 text-sm text-[var(--color-text-secondary)]">
            Module {moduleIndex} of {moduleCount}
          </span>
          <span className="rounded-full border border-[var(--color-border)] px-3 py-1 text-sm text-[var(--color-text-secondary)]">
            {lessonFormat}
          </span>
          <span className="rounded-full border border-[var(--color-border)] px-3 py-1 text-sm text-[var(--color-text-secondary)]">
            {lessonDuration}
          </span>
        </div>
        <p className="mt-3 text-sm leading-7 text-[var(--color-text-secondary)]">
          {lessonChallenge}
        </p>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-panel)] p-4">
          <p className="text-xs tracking-[0.18em] text-[var(--color-text-tertiary)] uppercase">
            Track progress
          </p>
          <p className="mt-2 text-3xl font-semibold text-[var(--color-text-primary)]">
            {trackProgress.percentage}%
          </p>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            {trackProgress.completed}/{trackProgress.total} lessons complete
          </p>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-[rgba(148,163,184,0.16)]">
            <div
              className="h-full rounded-full bg-[linear-gradient(90deg,var(--color-learn),var(--color-accent))]"
              style={{ width: trackProgress.percentage + '%' }}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-panel)] p-4">
          <p className="text-xs tracking-[0.18em] text-[var(--color-text-tertiary)] uppercase">
            In this module
          </p>
          <p className="mt-2 text-3xl font-semibold text-[var(--color-text-primary)]">
            {moduleProgress.completed}/{moduleProgress.total}
          </p>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            Lesson {moduleLessonIndex} of {moduleLessonCount} in {moduleTitle}
          </p>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-[rgba(148,163,184,0.16)]">
            <div
              className="h-full rounded-full bg-[linear-gradient(90deg,var(--color-learn),var(--color-accent))]"
              style={{ width: moduleProgress.percentage + '%' }}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-panel)] p-4">
          <p className="text-xs tracking-[0.18em] text-[var(--color-text-tertiary)] uppercase">
            Current streak
          </p>
          <p className="mt-2 text-3xl font-semibold text-[var(--color-text-primary)]">
            {currentStreak}d
          </p>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            Keep the learning rhythm warm between checkpoints.
          </p>
        </div>

        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-panel)] p-4">
          <p className="text-xs tracking-[0.18em] text-[var(--color-text-tertiary)] uppercase">
            Leave with
          </p>
          <p className="mt-2 text-lg font-semibold text-[var(--color-text-primary)]">
            {outputKind}
          </p>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{outputTitle}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <LessonProgressButton trackSlug={trackSlug} lessonSlug={lessonSlug} />
        <a
          href={trackHref}
          className="command-button border border-[var(--color-border)] bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] hover:border-[var(--color-border-hover)] hover:bg-[var(--color-bg-hover)]"
        >
          <BookOpen className="h-4 w-4" aria-hidden="true" />
          Track overview
        </a>
        {previousHref && previousTitle && (
          <a
            href={previousHref}
            className="command-button border border-[var(--color-border)] bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] hover:border-[var(--color-border-hover)] hover:bg-[var(--color-bg-hover)]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {previousTitle}
          </a>
        )}
      </div>

      <div className="mt-5 rounded-[24px] border border-[var(--color-border)] bg-[rgba(56,189,248,0.08)] p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-mono text-xs tracking-[0.24em] text-[var(--color-text-tertiary)] uppercase">
              {nextHref ? 'Up next' : 'Track review'}
            </p>
            <h3 className="mt-2 text-xl font-semibold text-[var(--color-text-primary)]">
              {nextActionTitle}
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--color-text-secondary)]">
              {nextHref
                ? 'Carry this checkpoint forward while the context is still fresh.'
                : 'You are at the edge of this lesson path. Review the wider track before branching further.'}
            </p>
          </div>
          <a
            href={nextActionHref}
            className="command-button border border-transparent bg-[var(--color-accent)] text-[var(--color-accent-contrast)] hover:bg-[var(--color-accent-hover)]"
          >
            {nextHref ? (
              <TrendingUp className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Compass className="h-4 w-4" aria-hidden="true" />
            )}
            {nextActionLabel}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
