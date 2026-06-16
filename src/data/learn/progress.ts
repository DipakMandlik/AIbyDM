import {
  getAllLearningLessons,
  getLearningLesson,
  getLearningTrack,
  getLessonHref,
  getTrackLessonCount,
  getTrackModuleCount,
  learningTracks,
} from '@data/learn/catalog';

export const LEARN_PROGRESS_STORAGE_KEY = 'aibydm.learn.progress.v1';
export const LEARN_PROGRESS_EVENT = 'aibydm:learn-progress';

export interface LearnProgressState {
  completedLessonKeys: string[];
  completedModuleKeys: string[];
  recentLessonKeys: string[];
  lastLessonKey?: string;
  lastVisitedAtByLesson: Record<string, string>;
}

export interface LearnProgressSummary {
  completedLessons: number;
  totalLessons: number;
  completedModules: number;
  totalModules: number;
  completedTracks: number;
  streakDays: number;
}

export interface LearnProgressCard {
  lessonKey: string;
  href: string;
  trackSlug: string;
  trackTitle: string;
  lessonSlug: string;
  lessonTitle: string;
  moduleTitle: string;
  visitedAt: string;
  completed: boolean;
}

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}

function dedupe<T>(values: T[]): T[] {
  return Array.from(new Set(values));
}

function defaultProgressState(): LearnProgressState {
  return {
    completedLessonKeys: [],
    completedModuleKeys: [],
    recentLessonKeys: [],
    lastLessonKey: undefined,
    lastVisitedAtByLesson: {},
  };
}

function sanitizeProgressState(value: unknown): LearnProgressState {
  if (!value || typeof value !== 'object') return defaultProgressState();

  const record = value as Partial<LearnProgressState>;
  return {
    completedLessonKeys: Array.isArray(record.completedLessonKeys)
      ? record.completedLessonKeys.filter((item): item is string => typeof item === 'string')
      : [],
    completedModuleKeys: Array.isArray(record.completedModuleKeys)
      ? record.completedModuleKeys.filter((item): item is string => typeof item === 'string')
      : [],
    recentLessonKeys: Array.isArray(record.recentLessonKeys)
      ? record.recentLessonKeys.filter((item): item is string => typeof item === 'string')
      : [],
    lastLessonKey: typeof record.lastLessonKey === 'string' ? record.lastLessonKey : undefined,
    lastVisitedAtByLesson:
      record.lastVisitedAtByLesson && typeof record.lastVisitedAtByLesson === 'object'
        ? Object.fromEntries(
            Object.entries(record.lastVisitedAtByLesson).filter(
              (entry): entry is [string, string] =>
                typeof entry[0] === 'string' && typeof entry[1] === 'string',
            ),
          )
        : {},
  };
}

function emitProgressEvent(nextState: LearnProgressState): void {
  if (!isBrowser()) return;

  window.dispatchEvent(
    new CustomEvent<LearnProgressState>(LEARN_PROGRESS_EVENT, {
      detail: nextState,
    }),
  );
}

export function makeLessonKey(trackSlug: string, lessonSlug: string): string {
  return trackSlug + ':' + lessonSlug;
}

export function makeModuleKey(trackSlug: string, moduleSlug: string): string {
  return trackSlug + ':' + moduleSlug;
}

function syncDerivedProgressState(progressState: LearnProgressState): LearnProgressState {
  const validLessonKeys = new Set(
    getAllLearningLessons().map((entry) => makeLessonKey(entry.track.slug, entry.lesson.slug)),
  );
  const completedLessonKeys = dedupe(progressState.completedLessonKeys).filter((entry) =>
    validLessonKeys.has(entry),
  );
  const recentLessonKeys = dedupe(progressState.recentLessonKeys)
    .filter((entry) => validLessonKeys.has(entry))
    .slice(0, 12);
  const lastVisitedAtByLesson = Object.fromEntries(
    Object.entries(progressState.lastVisitedAtByLesson).filter(([lessonKey]) =>
      validLessonKeys.has(lessonKey),
    ),
  );
  const lastLessonKey =
    progressState.lastLessonKey && validLessonKeys.has(progressState.lastLessonKey)
      ? progressState.lastLessonKey
      : undefined;
  const completedLessonSet = new Set(completedLessonKeys);
  const completedModuleKeys = learningTracks.flatMap((trackEntry) =>
    trackEntry.modules
      .filter(
        (moduleEntry) =>
          moduleEntry.lessons.length > 0 &&
          moduleEntry.lessons.every((lessonEntry) =>
            completedLessonSet.has(makeLessonKey(trackEntry.slug, lessonEntry.slug)),
          ),
      )
      .map((moduleEntry) => makeModuleKey(trackEntry.slug, moduleEntry.slug)),
  );

  return {
    completedLessonKeys,
    completedModuleKeys,
    recentLessonKeys,
    lastLessonKey,
    lastVisitedAtByLesson,
  };
}

function splitLessonKey(lessonKey: string): { trackSlug: string; lessonSlug: string } | undefined {
  const [trackSlug, lessonSlug] = lessonKey.split(':');
  if (!trackSlug || !lessonSlug) return undefined;
  return { trackSlug, lessonSlug };
}

export function readLearnProgress(): LearnProgressState {
  if (!isBrowser()) return defaultProgressState();

  try {
    const raw = localStorage.getItem(LEARN_PROGRESS_STORAGE_KEY);
    if (!raw) return defaultProgressState();
    const parsed = sanitizeProgressState(JSON.parse(raw));
    const synced = syncDerivedProgressState(parsed);

    if (JSON.stringify(parsed) !== JSON.stringify(synced)) {
      localStorage.setItem(LEARN_PROGRESS_STORAGE_KEY, JSON.stringify(synced));
    }

    return synced;
  } catch {
    return defaultProgressState();
  }
}

export function writeLearnProgress(nextState: LearnProgressState): LearnProgressState {
  const cleanState = syncDerivedProgressState(sanitizeProgressState(nextState));

  if (isBrowser()) {
    localStorage.setItem(LEARN_PROGRESS_STORAGE_KEY, JSON.stringify(cleanState));
    emitProgressEvent(cleanState);
  }

  return cleanState;
}

export function updateLearnProgress(
  updater: (currentState: LearnProgressState) => LearnProgressState,
): LearnProgressState {
  const currentState = readLearnProgress();
  return writeLearnProgress(updater(currentState));
}

export function resetLearnProgress(): LearnProgressState {
  return writeLearnProgress(defaultProgressState());
}

export function recordLessonVisit(trackSlug: string, lessonSlug: string): LearnProgressState {
  const lessonKey = makeLessonKey(trackSlug, lessonSlug);
  const visitedAt = new Date().toISOString();

  return updateLearnProgress((currentState) => ({
    ...currentState,
    lastLessonKey: lessonKey,
    recentLessonKeys: dedupe([lessonKey, ...currentState.recentLessonKeys]).slice(0, 12),
    lastVisitedAtByLesson: {
      ...currentState.lastVisitedAtByLesson,
      [lessonKey]: visitedAt,
    },
  }));
}

export function toggleLessonCompletion(trackSlug: string, lessonSlug: string): LearnProgressState {
  const lessonKey = makeLessonKey(trackSlug, lessonSlug);

  return updateLearnProgress((currentState) => {
    const isCompleted = currentState.completedLessonKeys.includes(lessonKey);
    return {
      ...currentState,
      completedLessonKeys: isCompleted
        ? currentState.completedLessonKeys.filter((entry) => entry !== lessonKey)
        : dedupe([...currentState.completedLessonKeys, lessonKey]),
    };
  });
}

export function isLessonCompleted(
  progressState: LearnProgressState,
  trackSlug: string,
  lessonSlug: string,
): boolean {
  return progressState.completedLessonKeys.includes(makeLessonKey(trackSlug, lessonSlug));
}

export function isModuleCompleted(
  progressState: LearnProgressState,
  trackSlug: string,
  moduleSlug: string,
): boolean {
  return progressState.completedModuleKeys.includes(makeModuleKey(trackSlug, moduleSlug));
}

export function getTrackProgress(
  progressState: LearnProgressState,
  trackSlug: string,
): {
  completed: number;
  total: number;
  percentage: number;
} {
  const trackEntry = getLearningTrack(trackSlug);
  if (!trackEntry) return { completed: 0, total: 0, percentage: 0 };

  const total = getTrackLessonCount(trackEntry);
  const completed = trackEntry.modules.reduce(
    (sum, moduleEntry) =>
      sum +
      moduleEntry.lessons.filter((lessonEntry) =>
        isLessonCompleted(progressState, trackSlug, lessonEntry.slug),
      ).length,
    0,
  );

  return {
    completed,
    total,
    percentage: total === 0 ? 0 : Math.round((completed / total) * 100),
  };
}

export function getModuleProgress(
  progressState: LearnProgressState,
  trackSlug: string,
  moduleSlug: string,
): { completed: number; total: number; percentage: number } {
  const trackEntry = getLearningTrack(trackSlug);
  const moduleEntry = trackEntry?.modules.find((entry) => entry.slug === moduleSlug);
  if (!moduleEntry) return { completed: 0, total: 0, percentage: 0 };

  const total = moduleEntry.lessons.length;
  const completed = moduleEntry.lessons.filter((lessonEntry) =>
    isLessonCompleted(progressState, trackSlug, lessonEntry.slug),
  ).length;

  return {
    completed,
    total,
    percentage: total === 0 ? 0 : Math.round((completed / total) * 100),
  };
}

export function getTrackModuleProgress(
  progressState: LearnProgressState,
  trackSlug: string,
): { completed: number; total: number; percentage: number } {
  const trackEntry = getLearningTrack(trackSlug);
  if (!trackEntry) return { completed: 0, total: 0, percentage: 0 };

  const total = getTrackModuleCount(trackEntry);
  const completed = trackEntry.modules.filter((moduleEntry) =>
    isModuleCompleted(progressState, trackSlug, moduleEntry.slug),
  ).length;

  return {
    completed,
    total,
    percentage: total === 0 ? 0 : Math.round((completed / total) * 100),
  };
}

export function getProgressSummary(progressState: LearnProgressState): LearnProgressSummary {
  const totalLessons = getAllLearningLessons().length;
  const completedLessons = progressState.completedLessonKeys.length;
  const totalModules = learningTracks.reduce(
    (sum, trackEntry) => sum + getTrackModuleCount(trackEntry),
    0,
  );
  const completedModules = progressState.completedModuleKeys.length;
  const completedTracks = learningTracks.filter((trackEntry) => {
    const progress = getTrackProgress(progressState, trackEntry.slug);
    return progress.total > 0 && progress.completed === progress.total;
  }).length;

  return {
    completedLessons,
    totalLessons,
    completedModules,
    totalModules,
    completedTracks,
    streakDays: getCurrentStreak(progressState),
  };
}

export function getRecentLessons(
  progressState: LearnProgressState,
  limit = 6,
): LearnProgressCard[] {
  return progressState.recentLessonKeys
    .map((lessonKey) => {
      const keyParts = splitLessonKey(lessonKey);
      if (!keyParts) return undefined;

      const lessonMatch = getLearningLesson(keyParts.trackSlug, keyParts.lessonSlug);
      if (!lessonMatch) return undefined;

      return {
        lessonKey,
        href: getLessonHref(keyParts.trackSlug, keyParts.lessonSlug),
        trackSlug: keyParts.trackSlug,
        trackTitle: lessonMatch.track.title,
        lessonSlug: keyParts.lessonSlug,
        lessonTitle: lessonMatch.lesson.title,
        moduleTitle: lessonMatch.module.title,
        visitedAt: progressState.lastVisitedAtByLesson[lessonKey] ?? '',
        completed: progressState.completedLessonKeys.includes(lessonKey),
      } satisfies LearnProgressCard;
    })
    .filter((entry): entry is LearnProgressCard => Boolean(entry))
    .slice(0, limit);
}

export function getContinueLearning(
  progressState: LearnProgressState,
): LearnProgressCard | undefined {
  const recentItems = getRecentLessons(progressState, 12);
  const latestIncomplete = recentItems.find((entry) => !entry.completed);
  if (latestIncomplete) return latestIncomplete;

  for (const lessonMatch of getAllLearningLessons()) {
    if (!isLessonCompleted(progressState, lessonMatch.track.slug, lessonMatch.lesson.slug)) {
      const lessonKey = makeLessonKey(lessonMatch.track.slug, lessonMatch.lesson.slug);
      return {
        lessonKey,
        href: getLessonHref(lessonMatch.track.slug, lessonMatch.lesson.slug),
        trackSlug: lessonMatch.track.slug,
        trackTitle: lessonMatch.track.title,
        lessonSlug: lessonMatch.lesson.slug,
        lessonTitle: lessonMatch.lesson.title,
        moduleTitle: lessonMatch.module.title,
        visitedAt: progressState.lastVisitedAtByLesson[lessonKey] ?? '',
        completed: false,
      };
    }
  }

  return undefined;
}

function dayStamp(value: Date): string {
  return [
    value.getFullYear(),
    String(value.getMonth() + 1).padStart(2, '0'),
    String(value.getDate()).padStart(2, '0'),
  ].join('-');
}

export function getCurrentStreak(progressState: LearnProgressState): number {
  const visitedDays = dedupe(
    Object.values(progressState.lastVisitedAtByLesson)
      .map((value) => new Date(value))
      .filter((value) => !Number.isNaN(value.valueOf()))
      .map(dayStamp),
  ).sort();

  if (visitedDays.length === 0) return 0;

  const visitedSet = new Set(visitedDays);
  let streak = 0;
  const cursor = new Date();

  while (visitedSet.has(dayStamp(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}

export function subscribeToLearnProgress(
  onChange: (progressState: LearnProgressState) => void,
): () => void {
  if (!isBrowser()) return () => {};

  const handleStorage = (event: StorageEvent) => {
    if (event.key === LEARN_PROGRESS_STORAGE_KEY) {
      onChange(readLearnProgress());
    }
  };

  const handleProgress = (event: Event) => {
    const customEvent = event as CustomEvent<LearnProgressState>;
    onChange(customEvent.detail ?? readLearnProgress());
  };

  window.addEventListener('storage', handleStorage);
  window.addEventListener(LEARN_PROGRESS_EVENT, handleProgress as EventListener);

  return () => {
    window.removeEventListener('storage', handleStorage);
    window.removeEventListener(LEARN_PROGRESS_EVENT, handleProgress as EventListener);
  };
}
