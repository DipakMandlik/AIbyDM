export type GameMode = "challenge" | "single" | "practice" | "review";

export type QuestionKind =
  | "multiple-choice"
  | "multi-select"
  | "scenario"
  | "architecture"
  | "agent"
  | "mcp"
  | "claude-platform";

export type GameCategory = {
  id: string;
  label: string;
  shortLabel: string;
  weight: number;
};

export type GameQuestion = {
  id: string;
  floorId: string;
  categoryId: string;
  kind: QuestionKind;
  prompt: string;
  options: string[];
  correctOptionIndexes: number[];
  explanation: string;
  hint?: string;
  difficulty: "core" | "applied" | "advanced";
  tags: string[];
  objectives: string[];
  references: { label: string; href: string }[];
};

export type ChallengeFloor = {
  id: string;
  number: number;
  name: string;
  categoryId: string;
  questionIds: string[];
  clearThreshold: number;
};

export type GameChallenge = {
  id: string;
  slug: string;
  title: string;
  description: string;
  questionCount: number;
  estimatedDuration: string;
  xpReward: number;
  clearThreshold: number;
  categories: GameCategory[];
  floors: ChallengeFloor[];
  questions: GameQuestion[];
};

export type QuestionResult = {
  questionId: string;
  floorId: string;
  categoryId: string;
  selectedOptionIndexes: number[];
  correct: boolean;
  answeredAt: number;
};

export type GameAttempt = {
  id: string;
  gameSlug: string;
  mode: GameMode;
  startedAt: number;
  completedAt: number;
  durationSeconds: number;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  score: number;
  accuracy: number;
  xpEarned: number;
  clearedFloors: string[];
  results: QuestionResult[];
};

export type Achievement = {
  id: string;
  title: string;
  description: string;
  xp: number;
};

export type Badge = {
  id: string;
  title: string;
  description: string;
};

export type LeaderboardEntry = {
  id: string;
  attemptId: string;
  score: number;
  accuracy: number;
  durationSeconds: number;
  xpEarned: number;
  rank: string;
  completedAt: number;
};

export type FloorProgress = {
  floorId: string;
  attempts: number;
  bestCorrect: number;
  bestAccuracy: number;
  clearedAt?: number;
};

export type GameProgressState = {
  version: 1;
  xp: number;
  level: number;
  streakDays: number;
  lastPlayedAt?: number;
  attempts: GameAttempt[];
  floorProgress: Record<string, FloorProgress>;
  unlockedAchievements: string[];
  badges: string[];
  updatedAt: number;
};
