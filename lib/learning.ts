import fs from "node:fs";
import path from "node:path";
import {
  aifsLearningPathIndex,
  getAifsPhase,
  getAllAifsLessons,
  type AifsLessonIndex,
  type AifsPhaseIndex,
} from "@/lib/learning-index";
export { resolveAifsMarkdownHref } from "@/lib/learning-links";

export type AifsResource = {
  label: string;
  href: string;
  kind: string;
};

export type AifsQuizQuestion = {
  id: string;
  stage: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
};

export type AifsLessonSection = {
  key: string;
  title: string;
  markdown: string;
};

export type AifsLesson = AifsLessonIndex & {
  motto: string;
  objectives: string[];
  exercises: string[];
  sections: AifsLessonSection[];
  quiz: AifsQuizQuestion[];
  resources: AifsResource[];
};

export type AifsPhase = AifsPhaseIndex;

export type AifsLearningPath = typeof aifsLearningPathIndex;

export const aifsLearningPath = aifsLearningPathIndex as AifsLearningPath;

export function getAifsFullPhase(phaseSlug: string) {
  return getAifsPhase(phaseSlug);
}

export function getAifsFullLesson(phaseSlug: string, lessonSlug: string) {
  const phase = getAifsFullPhase(phaseSlug);
  if (!phase) return undefined;
  const lesson = readAifsLessonPayload(phaseSlug, lessonSlug);
  return lesson ? { phase, lesson } : undefined;
}

export function getAllAifsFullLessons() {
  return getAllAifsLessons();
}

function readAifsLessonPayload(phaseSlug: string, lessonSlug: string) {
  const filePath = path.join(
    process.cwd(),
    "lib",
    "generated",
    "aifs-lessons",
    phaseSlug,
    `${lessonSlug}.json`,
  );
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8")) as AifsLesson;
  } catch {
    return undefined;
  }
}
