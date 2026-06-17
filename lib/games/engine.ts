import type {
  Achievement,
  ChallengeFloor,
  GameAttempt,
  GameChallenge,
  GameProgressState,
  LeaderboardEntry,
  QuestionResult,
} from "@/lib/games/types";

export const GLOBAL_GAMES_STORAGE_KEY = "aibydm:games:v1";
export const CLAUDE_GAME_STORAGE_KEY = "aibydm:game:claude-certified-architect:v1";
export const CLAUDE_GAME_SLUG = "claude-certified-architect";

export const CLAUDE_ACHIEVEMENTS: Achievement[] = [
  { id: "first-clear", title: "First Clear", description: "Clear any floor in the challenge.", xp: 50 },
  { id: "clean-floor", title: "Clean Floor", description: "Answer every question correctly on one floor.", xp: 75 },
  { id: "tower-run", title: "Tower Run", description: "Complete all ten floors in challenge mode.", xp: 150 },
  { id: "certified-score", title: "Certified Score", description: "Earn at least 80% accuracy in a completed run.", xp: 125 },
  { id: "reviewer", title: "Mistake Reviewer", description: "Finish a review session from previous misses.", xp: 40 },
  { id: "habit-builder", title: "Habit Builder", description: "Build a three-day learning streak.", xp: 80 },
];

export function emptyGameProgress(): GameProgressState {
  return {
    version: 1,
    xp: 0,
    level: 1,
    streakDays: 0,
    attempts: [],
    floorProgress: {},
    unlockedAchievements: [],
    badges: [],
    updatedAt: 0,
  };
}

export function getQuestionMap(challenge: GameChallenge) {
  return new Map(challenge.questions.map((question) => [question.id, question]));
}

export function isCorrectAnswer(selected: number[], correct: number[]) {
  if (selected.length !== correct.length) return false;
  const selectedSet = new Set(selected);
  return correct.every((index) => selectedSet.has(index));
}

export function getRank(accuracy: number) {
  if (accuracy >= 90) return "Principal Architect";
  if (accuracy >= 80) return "Certified Architect";
  if (accuracy >= 67) return "Solution Designer";
  if (accuracy >= 50) return "Apprentice Architect";
  return "Needs Review";
}

export function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return minutes > 0 ? minutes + "m " + String(remainder).padStart(2, "0") + "s" : remainder + "s";
}

export function calculateAttempt({
  challenge,
  mode,
  startedAt,
  completedAt,
  results,
}: {
  challenge: GameChallenge;
  mode: GameAttempt["mode"];
  startedAt: number;
  completedAt: number;
  results: QuestionResult[];
}): GameAttempt {
  const floorsById = new Map(challenge.floors.map((floor) => [floor.id, floor]));
  const correctAnswers = results.filter((result) => result.correct).length;
  const totalQuestions = results.length;
  const accuracy = totalQuestions ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
  const clearedFloors = challenge.floors
    .filter((floor) => {
      const floorResults = results.filter((result) => result.floorId === floor.id);
      const correct = floorResults.filter((result) => result.correct).length;
      return floorResults.length > 0 && correct >= floor.clearThreshold;
    })
    .map((floor) => floor.id);
  const floorBonus = clearedFloors.length * 15;
  const modeBonus = mode === "challenge" && clearedFloors.length === challenge.floors.length ? 100 : 0;
  const xpEarned = Math.max(10, correctAnswers * 12 + floorBonus + modeBonus);
  const score = Math.round(accuracy * 10 + floorBonus + modeBonus);

  return {
    id: challenge.slug + "-" + completedAt,
    gameSlug: challenge.slug,
    mode,
    startedAt,
    completedAt,
    durationSeconds: Math.max(1, Math.round((completedAt - startedAt) / 1000)),
    totalQuestions,
    correctAnswers,
    incorrectAnswers: Math.max(0, totalQuestions - correctAnswers),
    score,
    accuracy,
    xpEarned,
    clearedFloors: clearedFloors.filter((floorId) => floorsById.has(floorId)),
    results,
  };
}

export function getCategoryBreakdown(challenge: GameChallenge, attempt?: GameAttempt) {
  return challenge.categories.map((category) => {
    const results = attempt?.results.filter((result) => result.categoryId === category.id) ?? [];
    const correct = results.filter((result) => result.correct).length;
    const total = results.length;
    return {
      ...category,
      total,
      correct,
      accuracy: total ? Math.round((correct / total) * 100) : 0,
    };
  });
}

export function getStrongAreas(challenge: GameChallenge, attempt?: GameAttempt) {
  return getCategoryBreakdown(challenge, attempt)
    .filter((entry) => entry.total > 0 && entry.accuracy >= 75)
    .sort((a, b) => b.accuracy - a.accuracy);
}

export function getWeakAreas(challenge: GameChallenge, attempt?: GameAttempt) {
  return getCategoryBreakdown(challenge, attempt)
    .filter((entry) => entry.total > 0 && entry.accuracy < 75)
    .sort((a, b) => a.accuracy - b.accuracy);
}

export function updateStreak(previous: GameProgressState, playedAt: number) {
  if (!previous.lastPlayedAt) return 1;
  const oneDay = 24 * 60 * 60 * 1000;
  const previousDay = Math.floor(previous.lastPlayedAt / oneDay);
  const currentDay = Math.floor(playedAt / oneDay);
  if (currentDay === previousDay) return previous.streakDays || 1;
  if (currentDay === previousDay + 1) return (previous.streakDays || 0) + 1;
  return 1;
}

export function mergeAttemptIntoProgress(
  progress: GameProgressState,
  challenge: GameChallenge,
  attempt: GameAttempt,
): GameProgressState {
  const nextFloorProgress = { ...progress.floorProgress };

  for (const floor of challenge.floors) {
    const floorResults = attempt.results.filter((result) => result.floorId === floor.id);
    if (floorResults.length === 0) continue;
    const correct = floorResults.filter((result) => result.correct).length;
    const accuracy = Math.round((correct / floorResults.length) * 100);
    const previous = nextFloorProgress[floor.id] ?? {
      floorId: floor.id,
      attempts: 0,
      bestCorrect: 0,
      bestAccuracy: 0,
    };
    nextFloorProgress[floor.id] = {
      floorId: floor.id,
      attempts: previous.attempts + 1,
      bestCorrect: Math.max(previous.bestCorrect, correct),
      bestAccuracy: Math.max(previous.bestAccuracy, accuracy),
      clearedAt: previous.clearedAt ?? (correct >= floor.clearThreshold ? attempt.completedAt : undefined),
    };
  }

  const streakDays = updateStreak(progress, attempt.completedAt);
  const xp = progress.xp + attempt.xpEarned;
  const unlocked = new Set(progress.unlockedAchievements);
  if (attempt.clearedFloors.length > 0) unlocked.add("first-clear");
  if (attempt.results.length > 0 && attempt.results.every((result) => result.correct)) unlocked.add("clean-floor");
  if (attempt.mode === "challenge" && attempt.clearedFloors.length === challenge.floors.length) unlocked.add("tower-run");
  if (attempt.accuracy >= 80 && attempt.totalQuestions >= challenge.floors.length) unlocked.add("certified-score");
  if (attempt.mode === "review") unlocked.add("reviewer");
  if (streakDays >= 3) unlocked.add("habit-builder");

  const badges = new Set(progress.badges);
  if (xp >= 250) badges.add("apprentice");
  if (xp >= 750) badges.add("architect");
  if (xp >= 1500) badges.add("principal");

  return {
    version: 1,
    xp,
    level: Math.max(1, Math.floor(xp / 250) + 1),
    streakDays,
    lastPlayedAt: attempt.completedAt,
    attempts: [attempt, ...progress.attempts].slice(0, 30),
    floorProgress: nextFloorProgress,
    unlockedAchievements: [...unlocked],
    badges: [...badges],
    updatedAt: Date.now(),
  };
}

export function getLeaderboard(progress: GameProgressState): LeaderboardEntry[] {
  return progress.attempts
    .map((attempt) => ({
      id: "leaderboard-" + attempt.id,
      attemptId: attempt.id,
      score: attempt.score,
      accuracy: attempt.accuracy,
      durationSeconds: attempt.durationSeconds,
      xpEarned: attempt.xpEarned,
      rank: getRank(attempt.accuracy),
      completedAt: attempt.completedAt,
    }))
    .sort((a, b) => b.score - a.score || a.durationSeconds - b.durationSeconds)
    .slice(0, 10);
}

export function getLatestAttempt(progress: GameProgressState) {
  return progress.attempts[0];
}

export function getMistakeQuestionIds(progress: GameProgressState) {
  const ids = new Set<string>();
  for (const attempt of progress.attempts) {
    for (const result of attempt.results) {
      if (!result.correct) ids.add(result.questionId);
    }
  }
  return [...ids];
}

export function getFloorResult(attempt: GameAttempt | undefined, floor: ChallengeFloor) {
  const results = attempt?.results.filter((result) => result.floorId === floor.id) ?? [];
  const correct = results.filter((result) => result.correct).length;
  return {
    total: results.length,
    correct,
    cleared: results.length > 0 && correct >= floor.clearThreshold,
    accuracy: results.length ? Math.round((correct / results.length) * 100) : 0,
  };
}
