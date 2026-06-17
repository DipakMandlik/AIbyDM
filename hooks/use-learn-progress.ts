"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  LEARN_PROGRESS_STORAGE_KEY,
  getAifsLessonHref,
  getContinueLesson,
  type LearnProgressState,
} from "@/lib/learning-index";

const emptyState = (): LearnProgressState => ({
  version: 1,
  lessons: {},
  updatedAt: 0,
});

function readProgress(): LearnProgressState {
  if (typeof window === "undefined") return emptyState();
  try {
    const raw = window.localStorage.getItem(LEARN_PROGRESS_STORAGE_KEY);
    if (!raw) return emptyState();
    const parsed = JSON.parse(raw) as Partial<LearnProgressState>;
    if (parsed.version !== 1 || !parsed.lessons || typeof parsed.lessons !== "object") {
      return emptyState();
    }
    return {
      version: 1,
      lessons: parsed.lessons,
      lastVisitedLessonId: parsed.lastVisitedLessonId,
      updatedAt: typeof parsed.updatedAt === "number" ? parsed.updatedAt : 0,
    };
  } catch {
    return emptyState();
  }
}

function writeProgress(next: LearnProgressState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LEARN_PROGRESS_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage may be disabled or full. The UI still works for the current render.
  }
}

export function useLearnProgress() {
  const [ready, setReady] = useState(false);
  const [state, setState] = useState<LearnProgressState>(emptyState);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setState(readProgress());
      setReady(true);
    });

    function onStorage(event: StorageEvent) {
      if (event.key === LEARN_PROGRESS_STORAGE_KEY) setState(readProgress());
    }

    window.addEventListener("storage", onStorage);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const update = useCallback((updater: (current: LearnProgressState) => LearnProgressState) => {
    setState((current) => {
      const base = current.updatedAt ? current : readProgress();
      const next = { ...updater(base), updatedAt: Date.now() };
      writeProgress(next);
      return next;
    });
  }, []);

  const recordVisit = useCallback(
    (lessonId: string) => {
      update((current) => ({
        ...current,
        lastVisitedLessonId: lessonId,
        lessons: {
          ...current.lessons,
          [lessonId]: {
            ...current.lessons[lessonId],
            visitedAt: Date.now(),
          },
        },
      }));
    },
    [update],
  );

  const toggleLessonComplete = useCallback(
    (lessonId: string) => {
      update((current) => {
        const existing = current.lessons[lessonId] ?? {};
        const nextLesson = existing.completedAt
          ? { ...existing, completedAt: undefined }
          : { ...existing, visitedAt: existing.visitedAt ?? Date.now(), completedAt: Date.now() };
        return {
          ...current,
          lastVisitedLessonId: lessonId,
          lessons: {
            ...current.lessons,
            [lessonId]: nextLesson,
          },
        };
      });
    },
    [update],
  );

  const isLessonComplete = useCallback(
    (lessonId: string) => Boolean(state.lessons[lessonId]?.completedAt),
    [state.lessons],
  );

  const getContinueTarget = useCallback(() => {
    const entry = getContinueLesson(state);
    return entry ? getAifsLessonHref(entry.phase.slug, entry.lesson.slug) : "/learn/ai-from-scratch";
  }, [state]);

  const resetProgress = useCallback(() => {
    const next = emptyState();
    setState(next);
    if (typeof window === "undefined") return;
    try {
      window.localStorage.removeItem(LEARN_PROGRESS_STORAGE_KEY);
    } catch {
      // Ignore storage failures.
    }
  }, []);

  return useMemo(
    () => ({
      state,
      ready,
      recordVisit,
      toggleLessonComplete,
      isLessonComplete,
      getContinueTarget,
      resetProgress,
    }),
    [getContinueTarget, isLessonComplete, ready, recordVisit, resetProgress, state, toggleLessonComplete],
  );
}
