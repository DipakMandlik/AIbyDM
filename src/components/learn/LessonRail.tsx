import { CheckCircle2, Circle, PlayCircle } from 'lucide-react';

import { getLearningTrack, getLessonHref } from '@data/learn/catalog';
import { getModuleProgress, isLessonCompleted } from '@data/learn/progress';

import { useLearnProgressState } from '@components/learn/useLearnProgress';

interface Props {
  trackSlug: string;
  currentLessonSlug: string;
}

export default function LessonRail({ trackSlug, currentLessonSlug }: Props) {
  const progressState = useLearnProgressState();
  const trackEntry = getLearningTrack(trackSlug);

  if (!trackEntry) return null;

  return (
    <div className="space-y-4">
      {trackEntry.modules.map((moduleEntry) => {
        const moduleProgress = getModuleProgress(progressState, trackSlug, moduleEntry.slug);
        return (
          <div
            key={moduleEntry.slug}
            className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-panel)] p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-base font-semibold text-[var(--color-text-primary)]">
                  {moduleEntry.title}
                </p>
                <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                  {moduleProgress.completed} / {moduleProgress.total} complete
                </p>
              </div>
              <div className="h-2 w-16 overflow-hidden rounded-full bg-[rgba(148,163,184,0.16)]">
                <div
                  className="h-full rounded-full bg-[linear-gradient(90deg,var(--color-learn),var(--color-accent))]"
                  style={{ width: moduleProgress.percentage + '%' }}
                />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              {moduleEntry.lessons.map((lessonEntry) => {
                const completed = isLessonCompleted(progressState, trackSlug, lessonEntry.slug);
                const current = lessonEntry.slug === currentLessonSlug;
                return (
                  <a
                    key={lessonEntry.slug}
                    href={getLessonHref(trackSlug, lessonEntry.slug)}
                    className={
                      'flex items-start gap-3 rounded-2xl border px-3 py-3 text-sm transition ' +
                      (current
                        ? 'border-[var(--color-learn)] bg-[rgba(56,189,248,0.08)] text-[var(--color-text-primary)]'
                        : 'border-[var(--color-border)] bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-hover)] hover:bg-[var(--color-bg-hover)]')
                    }
                  >
                    {completed ? (
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent)]"
                        aria-hidden="true"
                      />
                    ) : current ? (
                      <PlayCircle
                        className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-learn)]"
                        aria-hidden="true"
                      />
                    ) : (
                      <Circle
                        className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-text-tertiary)]"
                        aria-hidden="true"
                      />
                    )}
                    <span>
                      <span className="block font-medium text-[var(--color-text-primary)]">
                        {lessonEntry.title}
                      </span>
                      <span className="mt-1 block text-xs text-[var(--color-text-tertiary)]">
                        {lessonEntry.format} / {lessonEntry.duration}
                      </span>
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
