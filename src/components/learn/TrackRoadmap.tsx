import { CheckCircle2, Circle, Compass, LockKeyhole, PlayCircle } from 'lucide-react';

import { getLearningTrack, getLessonHref } from '@data/learn/catalog';
import { getModuleProgress, isLessonCompleted } from '@data/learn/progress';
import { getTrackStatus } from '@data/learn/recommendations';

import { useLearnProgressState } from '@components/learn/useLearnProgress';

interface Props {
  trackSlug: string;
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

export default function TrackRoadmap({ trackSlug }: Props) {
  const progressState = useLearnProgressState();
  const trackEntry = getLearningTrack(trackSlug);

  if (!trackEntry) return null;

  const trackStatus = getTrackStatus(progressState, trackEntry);

  return (
    <section className="rounded-[28px] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-6 shadow-[0_20px_60px_rgba(2,8,23,0.16)]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-xs tracking-[0.24em] text-[var(--color-text-tertiary)] uppercase">
            Track roadmap
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-[var(--color-text-primary)]">
            Follow the milestones in order
          </h2>
        </div>
        <span className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--color-border)] px-4 text-sm text-[var(--color-text-secondary)]">
          {trackStatus === 'locked' ? (
            <LockKeyhole className="h-4 w-4" aria-hidden="true" />
          ) : trackStatus === 'complete' ? (
            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
          ) : (
            <PlayCircle className="h-4 w-4" aria-hidden="true" />
          )}
          {statusLabel(trackStatus)}
        </span>
      </div>

      <div className="mt-6 grid gap-4">
        {trackEntry.modules.map((moduleEntry, moduleIndex) => {
          const progress = getModuleProgress(progressState, trackSlug, moduleEntry.slug);
          return (
            <div
              key={moduleEntry.slug}
              className="rounded-[24px] border border-[var(--color-border)] bg-[var(--color-bg-panel)] p-5"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="font-mono text-xs tracking-[0.24em] text-[var(--color-text-tertiary)] uppercase">
                    Module {String(moduleIndex + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-[var(--color-text-primary)]">
                    {moduleEntry.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--color-text-secondary)]">
                    {moduleEntry.summary}
                  </p>
                </div>
                <div className="min-w-[10rem] rounded-2xl border border-[var(--color-border)] px-4 py-3 text-sm text-[var(--color-text-secondary)]">
                  <p>
                    {progress.completed} / {progress.total} lessons complete
                  </p>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-[rgba(148,163,184,0.16)]">
                    <div
                      className="h-full rounded-full bg-[linear-gradient(90deg,var(--color-learn),var(--color-accent))]"
                      style={{ width: progress.percentage + '%' }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-3">
                {moduleEntry.lessons.map((lessonEntry) => {
                  const completed = isLessonCompleted(progressState, trackSlug, lessonEntry.slug);
                  return (
                    <a
                      key={lessonEntry.slug}
                      href={getLessonHref(trackSlug, lessonEntry.slug)}
                      className="flex items-center justify-between gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-4 transition hover:border-[var(--color-border-hover)] hover:bg-[var(--color-bg-hover)]"
                    >
                      <div className="flex items-start gap-3">
                        {completed ? (
                          <CheckCircle2
                            className="mt-1 h-5 w-5 text-[var(--color-accent)]"
                            aria-hidden="true"
                          />
                        ) : (
                          <Circle
                            className="mt-1 h-5 w-5 text-[var(--color-text-tertiary)]"
                            aria-hidden="true"
                          />
                        )}
                        <div>
                          <p className="text-base font-semibold text-[var(--color-text-primary)]">
                            {lessonEntry.title}
                          </p>
                          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                            {lessonEntry.format} / {lessonEntry.duration}
                          </p>
                        </div>
                      </div>
                      <span className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--color-border)] px-4 text-sm text-[var(--color-text-secondary)]">
                        <Compass className="h-4 w-4" aria-hidden="true" />
                        Open
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
