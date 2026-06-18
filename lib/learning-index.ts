import aifsIndexData from "@/lib/generated/aifs-index.json";

export type LearnProgressState = {
  version: 1;
  lessons: Record<string, { visitedAt?: number; completedAt?: number }>;
  lastVisitedLessonId?: string;
  updatedAt: number;
};

export type AifsLessonIndex = {
  id: string;
  slug: string;
  phaseSlug: string;
  number: string;
  title: string;
  summary: string;
  type: string;
  languages: string[];
  prerequisites: string[];
  duration: string;
  status: string;
  topics: string[];
  sourcePath: string;
};

export type AifsPhaseIndex = {
  id: string;
  slug: string;
  number: string;
  title: string;
  description: string;
  duration: string;
  status: string;
  lessonCount: number;
  lessons: AifsLessonIndex[];
};

export type AifsLearningPathIndex = {
  schemaVersion: number;
  slug: string;
  number: string;
  title: string;
  tagline: string;
  level: string;
  duration: string;
  description: string;
  source: {
    name: string;
    repository: string;
    ref: string;
    license: string;
    importedAt: string;
    upstream?: {
      name: string;
      repository: string;
      ref: string;
      commit: string;
      license: string;
    };
  };
  totalPhases: number;
  totalLessons: number;
  phases: AifsPhaseIndex[];
};

export const AIFS_PATH_SLUG = "ai-from-scratch";
export const LEARN_PROGRESS_STORAGE_KEY = "aibydm:learn-progress:v1";

export const aifsLearningPathIndex = aifsIndexData as AifsLearningPathIndex;

export function getLearningPathHref(pathSlug: string) {
  return "/learn/" + pathSlug;
}

export function getPhaseHref(pathSlug: string, phaseSlug: string) {
  return "/learn/" + pathSlug + "/phases/" + phaseSlug;
}

export function getAifsLessonHref(phaseSlug: string, lessonSlug: string) {
  return "/learn/" + AIFS_PATH_SLUG + "/phases/" + phaseSlug + "/lessons/" + lessonSlug;
}

export function getAifsPhase(phaseSlug: string) {
  return aifsLearningPathIndex.phases.find((phase) => phase.slug === phaseSlug);
}

export function getAifsLessonIndex(phaseSlug: string, lessonSlug: string) {
  const phase = getAifsPhase(phaseSlug);
  if (!phase) return undefined;
  const lesson = phase.lessons.find((entry) => entry.slug === lessonSlug);
  return lesson ? { phase, lesson } : undefined;
}

export function getAllAifsLessons() {
  return aifsLearningPathIndex.phases.flatMap((phase) =>
    phase.lessons.map((lesson) => ({ phase, lesson })),
  );
}

export function getNextLesson(phaseSlug: string, lessonSlug: string) {
  const lessons = getAllAifsLessons();
  const currentIndex = lessons.findIndex(
    (entry) => entry.phase.slug === phaseSlug && entry.lesson.slug === lessonSlug,
  );
  return currentIndex >= 0 && currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : undefined;
}

export function getPreviousLesson(phaseSlug: string, lessonSlug: string) {
  const lessons = getAllAifsLessons();
  const currentIndex = lessons.findIndex(
    (entry) => entry.phase.slug === phaseSlug && entry.lesson.slug === lessonSlug,
  );
  return currentIndex > 0 ? lessons[currentIndex - 1] : undefined;
}

export function getLessonById(lessonId?: string) {
  if (!lessonId) return undefined;
  return getAllAifsLessons().find((entry) => entry.lesson.id === lessonId);
}

export function getFirstAifsLesson() {
  const phase = aifsLearningPathIndex.phases[0];
  const lesson = phase?.lessons[0];
  return phase && lesson ? { phase, lesson } : undefined;
}

export function getPhaseProgress(progressState: LearnProgressState | undefined, phase: AifsPhaseIndex) {
  const completed = phase.lessons.filter((lesson) => progressState?.lessons[lesson.id]?.completedAt).length;
  const total = phase.lessons.length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  return { completed, total, percentage };
}

export function getLearningPathProgress(
  progressState: LearnProgressState | undefined,
  path: AifsLearningPathIndex = aifsLearningPathIndex,
) {
  const lessons = path.phases.flatMap((phase) => phase.lessons);
  const completed = lessons.filter((lesson) => progressState?.lessons[lesson.id]?.completedAt).length;
  const visited = lessons.filter((lesson) => progressState?.lessons[lesson.id]?.visitedAt).length;
  const total = lessons.length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  return { completed, visited, total, percentage };
}

export function getNextIncompleteLesson(progressState?: LearnProgressState) {
  return getAllAifsLessons().find((entry) => !progressState?.lessons[entry.lesson.id]?.completedAt);
}

export function getContinueLesson(progressState?: LearnProgressState) {
  const lastVisited = getLessonById(progressState?.lastVisitedLessonId);
  if (lastVisited) return lastVisited;
  return getNextIncompleteLesson(progressState) ?? getFirstAifsLesson();
}
