import { useEffect } from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

import { isLessonCompleted, recordLessonVisit, toggleLessonCompletion } from '@data/learn/progress';

import { useLearnProgressState } from '@components/learn/useLearnProgress';

interface Props {
  trackSlug: string;
  lessonSlug: string;
}

export default function LessonProgressButton({ trackSlug, lessonSlug }: Props) {
  const progressState = useLearnProgressState();
  const completed = isLessonCompleted(progressState, trackSlug, lessonSlug);

  useEffect(() => {
    recordLessonVisit(trackSlug, lessonSlug);
  }, [trackSlug, lessonSlug]);

  return (
    <button
      type="button"
      onClick={() => {
        toggleLessonCompletion(trackSlug, lessonSlug);
      }}
      className={
        'command-button border ' +
        (completed
          ? 'border-transparent bg-[var(--color-accent)] text-[var(--color-accent-contrast)] hover:bg-[var(--color-accent-hover)]'
          : 'border-[var(--color-border)] bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] hover:border-[var(--color-border-hover)] hover:bg-[var(--color-bg-hover)]')
      }
      aria-pressed={completed}
    >
      {completed ? (
        <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
      ) : (
        <Circle className="h-5 w-5" aria-hidden="true" />
      )}
      {completed ? 'Completed locally' : 'Mark lesson complete'}
    </button>
  );
}
