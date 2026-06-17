"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BarChart3,
  Check,
  ChevronRight,
  Clock,
  ListChecks,
  Medal,
  RotateCcw,
  Share2,
  Target,
  Trophy,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGameProgress } from "@/hooks/use-game-progress";
import { claudeCertifiedArchitectChallenge as challenge } from "@/lib/games/claude-certified-architect";
import {
  CLAUDE_ACHIEVEMENTS,
  calculateAttempt,
  formatDuration,
  getCategoryBreakdown,
  getFloorResult,
  getLeaderboard,
  getLatestAttempt,
  getMistakeQuestionIds,
  getQuestionMap,
  getRank,
  getStrongAreas,
  getWeakAreas,
  isCorrectAnswer,
} from "@/lib/games/engine";
import type { GameMode, GameQuestion, QuestionResult } from "@/lib/games/types";

const gameRoot = "/games/claude-certified-architect";
const modeLabels: Record<GameMode, string> = {
  challenge: "Full Challenge",
  single: "Single Question",
  practice: "Practice Mode",
  review: "Review Mode",
};

function clampMode(value: string | null): GameMode {
  if (value === "single" || value === "practice" || value === "review") return value;
  return "challenge";
}

function optionLabel(index: number) {
  return String.fromCharCode(65 + index);
}

function getPracticeQuestions() {
  return challenge.floors.flatMap((floor) => floor.questionIds.slice(0, 1)).map((id) => questionMap.get(id)).filter(Boolean) as GameQuestion[];
}

const questionMap = getQuestionMap(challenge);

export function ClaudeChallengeOverview() {
  const progress = useGameProgress();
  const latest = getLatestAttempt(progress.state);
  const clearedCount = challenge.floors.filter((floor) => progress.state.floorProgress[floor.id]?.clearedAt).length;
  const completion = Math.round((clearedCount / challenge.floors.length) * 100);

  return (
    <>
      <section className="relative border-b border-foreground/10 pt-36 pb-12 lg:pt-44">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <Link href="/games" className="group mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            All games
          </Link>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Flagship game / Hard / {challenge.estimatedDuration}</p>
          <div className="mt-5 grid gap-10 lg:grid-cols-[1fr_360px] lg:items-end">
            <div>
              <h1 className="font-display text-[clamp(3rem,8vw,6rem)] leading-[0.95] tracking-tight">{challenge.title}</h1>
              <p className="mt-8 max-w-3xl text-xl leading-relaxed text-muted-foreground">{challenge.description}</p>
            </div>
            <div className="border border-foreground/10 bg-background p-6">
              <div className="grid grid-cols-2 gap-px border border-foreground/10 bg-foreground/10">
                <Metric label="Questions" value={String(challenge.questionCount)} />
                <Metric label="XP Reward" value={String(challenge.xpReward)} />
                <Metric label="Floors" value={String(challenge.floors.length)} />
                <Metric label="Completion" value={progress.ready ? completion + "%" : "0%"} />
              </div>
              <Button asChild size="lg" className="mt-6 min-h-12 w-full rounded-full">
                <Link href={gameRoot + "/play"}>Start challenge <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-6 lg:grid-cols-[1fr_340px] lg:px-12">
          <div className="space-y-10">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <Trophy className="h-5 w-5" aria-hidden="true" />
                <h2 className="font-display text-3xl">Challenge modes</h2>
              </div>
              <div className="grid gap-px border border-foreground/10 bg-foreground/10 md:grid-cols-2">
                {[
                  ["Full Challenge", "Clear 10 floors with 6 questions each. A floor clears at 4 correct answers.", "/play"],
                  ["Practice Mode", "Get instant feedback, explanations, hints, and links while you build recall.", "/play?mode=practice"],
                  ["Single Question", "Take one focused scenario when you only have a minute.", "/play?mode=single"],
                  ["Review Mode", "Revisit missed questions and turn weak areas into a next action.", "/play?mode=review"],
                ].map(([title, description, href]) => (
                  <Link key={title} href={gameRoot + href} className="group bg-background p-6 transition-colors hover:bg-foreground/[0.02]">
                    <h3 className="font-display text-2xl transition-transform group-hover:translate-x-1">{title}</h3>
                    <p className="mt-3 leading-relaxed text-muted-foreground">{description}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium">Open mode <ChevronRight className="h-4 w-4" /></span>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-5 flex items-center gap-3">
                <ListChecks className="h-5 w-5" aria-hidden="true" />
                <h2 className="font-display text-3xl">Floor map</h2>
              </div>
              <FloorGrid />
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-32 lg:self-start">
            <div className="border border-foreground/10 p-6">
              <h2 className="font-medium">Your architect profile</h2>
              <div className="mt-5 space-y-4 text-sm">
                <StatusRow label="Level" value={String(progress.state.level)} />
                <StatusRow label="XP" value={String(progress.state.xp)} />
                <StatusRow label="Streak" value={progress.state.streakDays + " days"} />
                <StatusRow label="Latest rank" value={latest ? getRank(latest.accuracy) : "Not started"} />
              </div>
              <div className="mt-6 grid gap-3">
                <Button asChild variant="outline"><Link href={gameRoot + "/progress"}>View progress</Link></Button>
                <Button asChild variant="outline"><Link href={gameRoot + "/leaderboard"}>Local leaderboard</Link></Button>
              </div>
            </div>
            <div className="border border-foreground/10 p-6">
              <h2 className="font-medium">Category coverage</h2>
              <div className="mt-5 space-y-3">
                {challenge.categories.map((category) => (
                  <div key={category.id}>
                    <div className="flex items-center justify-between gap-4 text-sm">
                      <span>{category.shortLabel}</span>
                      <span className="font-mono text-xs text-muted-foreground">{category.weight}%</span>
                    </div>
                    <div className="mt-2 h-1.5 bg-foreground/10"><div className="h-full bg-foreground" style={{ width: category.weight + "%" }} /></div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

export function ClaudeChallengePlay() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const progress = useGameProgress();
  const mode = clampMode(searchParams.get("mode"));
  const [startedAt, setStartedAt] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number[]>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setStartedAt(Date.now()));
    return () => window.cancelAnimationFrame(frame);
  }, [mode]);

  const questions = useMemo(() => {
    if (mode === "single") return [challenge.questions[0]];
    if (mode === "practice") return getPracticeQuestions();
    if (mode === "review") {
      const mistakeIds = getMistakeQuestionIds(progress.state);
      const reviewQuestions = mistakeIds.map((id) => questionMap.get(id)).filter(Boolean) as GameQuestion[];
      return reviewQuestions.length ? reviewQuestions.slice(0, 12) : getPracticeQuestions().slice(0, 6);
    }
    return challenge.questions;
  }, [mode, progress.state]);

  const current = questions[currentIndex] ?? questions[0];
  const selected = answers[current.id] ?? [];
  const correct = isCorrectAnswer(selected, current.correctOptionIndexes);
  const showFeedback = mode !== "challenge" && revealed[current.id];
  const answeredCount = questions.filter((question) => (answers[question.id] ?? []).length > 0).length;
  const progressPct = Math.round((answeredCount / questions.length) * 100);

  function toggleAnswer(index: number) {
    setAnswers((currentAnswers) => {
      const existing = currentAnswers[current.id] ?? [];
      const next = current.correctOptionIndexes.length > 1
        ? existing.includes(index)
          ? existing.filter((value) => value !== index)
          : [...existing, index]
        : [index];
      return { ...currentAnswers, [current.id]: next.sort((a, b) => a - b) };
    });
  }

  function nextQuestion() {
    if (mode !== "challenge") setRevealed((state) => ({ ...state, [current.id]: true }));
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((index) => index + 1);
      return;
    }
    finishAttempt();
  }

  function finishAttempt() {
    const completedAt = Date.now();
    const results: QuestionResult[] = questions.map((question) => {
      const selectedOptionIndexes = answers[question.id] ?? [];
      return {
        questionId: question.id,
        floorId: question.floorId,
        categoryId: question.categoryId,
        selectedOptionIndexes,
        correct: isCorrectAnswer(selectedOptionIndexes, question.correctOptionIndexes),
        answeredAt: completedAt,
      };
    });
    const attempt = calculateAttempt({ challenge, mode, startedAt, completedAt, results });
    progress.recordAttempt(attempt);
    router.push(gameRoot + "/results");
  }

  return (
    <section className="pt-32 pb-16 lg:pt-40 lg:pb-24">
      <div className="mx-auto max-w-[1300px] px-6 lg:px-12">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link href={gameRoot} className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Challenge overview
          </Link>
          <div className="flex flex-wrap gap-2">
            {Object.entries(modeLabels).map(([key, label]) => (
              <Link key={key} href={gameRoot + "/play" + (key === "challenge" ? "" : "?mode=" + key)} className={"border px-3 py-2 text-xs font-mono transition-colors " + (mode === key ? "border-foreground bg-foreground text-background" : "border-foreground/10 text-muted-foreground hover:text-foreground")}>{label}</Link>
            ))}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <article className="border border-foreground/10 bg-background p-5 md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-foreground/10 pb-6">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{modeLabels[mode]} / Question {currentIndex + 1} of {questions.length}</p>
                <h1 className="mt-3 font-display text-3xl leading-tight md:text-5xl">{current.prompt}</h1>
              </div>
              <div className="min-w-24 border border-foreground/10 p-3 text-center">
                <div className="font-display text-3xl">{progressPct}%</div>
                <div className="font-mono text-[11px] uppercase text-muted-foreground">Answered</div>
              </div>
            </div>

            <div className="mt-8 grid gap-3" role="group" aria-label="Answer options">
              {current.options.map((option, index) => {
                const isSelected = selected.includes(index);
                const isCorrect = current.correctOptionIndexes.includes(index);
                const feedbackClass = showFeedback && isCorrect ? "border-foreground bg-foreground text-background" : showFeedback && isSelected && !isCorrect ? "border-destructive text-destructive" : isSelected ? "border-foreground" : "border-foreground/10 hover:border-foreground/40";
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => toggleAnswer(index)}
                    className={"min-h-14 w-full border p-4 text-left transition-colors focus-visible:ring-2 focus-visible:ring-ring " + feedbackClass}
                    aria-pressed={isSelected}
                  >
                    <span className="flex items-start gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-current font-mono text-xs">{optionLabel(index)}</span>
                      <span className="leading-relaxed">{option}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            {showFeedback ? (
              <div className="mt-6 border border-foreground/10 p-5">
                <div className="flex items-center gap-2 font-medium">{correct ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />} {correct ? "Correct" : "Review this one"}</div>
                {current.hint ? <p className="mt-3 text-sm text-muted-foreground">Hint: {current.hint}</p> : null}
                <p className="mt-3 leading-relaxed text-muted-foreground">{current.explanation}</p>
              </div>
            ) : null}

            <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
              <Button type="button" variant="outline" disabled={currentIndex === 0} onClick={() => setCurrentIndex((index) => Math.max(0, index - 1))}>
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
              <div className="flex gap-3">
                {mode !== "challenge" ? <Button type="button" variant="outline" onClick={() => setRevealed((state) => ({ ...state, [current.id]: true }))}>Show explanation</Button> : null}
                <Button type="button" disabled={selected.length === 0} onClick={nextQuestion}>
                  {currentIndex === questions.length - 1 ? "Finish" : "Next"} <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </article>

          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <div className="border border-foreground/10 p-5">
              <h2 className="font-medium">Run status</h2>
              <div className="mt-5 space-y-4 text-sm">
                <StatusRow label="Mode" value={modeLabels[mode]} />
                <StatusRow label="Answered" value={answeredCount + " / " + questions.length} />
                <StatusRow label="Clear rule" value="4 / 6 per floor" />
                <StatusRow label="XP pool" value={String(challenge.xpReward)} />
              </div>
            </div>
            <div className="border border-foreground/10 p-5">
              <h2 className="font-medium">Current topic</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {current.tags.map((tag) => <span key={tag} className="border border-foreground/10 px-2 py-1 font-mono text-[11px] text-muted-foreground">{tag}</span>)}
              </div>
              <div className="mt-5 space-y-2">
                {current.references.map((reference) => <Link key={reference.href} href={reference.href} className="block text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">{reference.label}</Link>)}
              </div>
            </div>
            <FloorMiniMap answers={answers} questions={questions} />
          </aside>
        </div>
      </div>
    </section>
  );
}

export function ClaudeChallengeResults() {
  const progress = useGameProgress();
  const latest = getLatestAttempt(progress.state);
  const breakdown = getCategoryBreakdown(challenge, latest);
  const weakAreas = getWeakAreas(challenge, latest);
  const strongAreas = getStrongAreas(challenge, latest);
  const shareText = latest ? "I scored " + latest.accuracy + "% in the AIByDM Claude Certified Architect Challenge." : "I am practicing the AIByDM Claude Certified Architect Challenge.";

  return (
    <section className="pt-32 pb-16 lg:pt-40 lg:pb-24">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <Link href={gameRoot} className="group mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"><ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Challenge overview</Link>
        {latest ? (
          <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
            <div className="space-y-8">
              <div className="border border-foreground/10 p-6 md:p-8">
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Results / {modeLabels[latest.mode]}</p>
                <h1 className="mt-4 font-display text-[clamp(3rem,8vw,6rem)] leading-none">{getRank(latest.accuracy)}</h1>
                <div className="mt-8 grid gap-px border border-foreground/10 bg-foreground/10 sm:grid-cols-2 lg:grid-cols-4">
                  <Metric label="Score" value={String(latest.score)} />
                  <Metric label="Accuracy" value={latest.accuracy + "%"} />
                  <Metric label="XP Earned" value={String(latest.xpEarned)} />
                  <Metric label="Time" value={formatDuration(latest.durationSeconds)} />
                </div>
              </div>
              <Panel title="Category breakdown" icon={<BarChart3 className="h-5 w-5" />}>
                <div className="space-y-4">
                  {breakdown.map((entry) => <ProgressLine key={entry.id} label={entry.label} value={entry.total ? entry.accuracy : 0} detail={entry.correct + " / " + entry.total} />)}
                </div>
              </Panel>
              <Panel title="Floor results" icon={<Target className="h-5 w-5" />}>
                <FloorGrid attemptId={latest.id} />
              </Panel>
            </div>
            <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
              <div className="border border-foreground/10 p-6">
                <h2 className="font-medium">Next best step</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{weakAreas[0] ? "Practice " + weakAreas[0].label + " before your next full challenge run." : "Your latest run is strong. Repeat the full challenge to improve speed and consistency."}</p>
                <div className="mt-6 grid gap-3">
                  <Button asChild><Link href={gameRoot + "/play?mode=practice"}>Continue learning</Link></Button>
                  <Button asChild variant="outline"><Link href={gameRoot + "/play"}>Retry challenge</Link></Button>
                  <Button asChild variant="outline"><Link href={gameRoot + "/play?mode=review"}>Review mistakes</Link></Button>
                </div>
              </div>
              <div className="border border-foreground/10 p-6">
                <h2 className="font-medium">Share achievement</h2>
                <p className="mt-3 text-sm text-muted-foreground">{shareText}</p>
                <Button type="button" variant="outline" className="mt-5 w-full" onClick={() => navigator.clipboard?.writeText(shareText)}><Share2 className="h-4 w-4" /> Copy share text</Button>
              </div>
              <AreaList title="Strong areas" items={strongAreas.map((area) => area.label)} empty="No strong area yet." />
              <AreaList title="Weak areas" items={weakAreas.map((area) => area.label)} empty="No weak area in the latest run." />
            </aside>
          </div>
        ) : <EmptyState title="No results yet" description="Complete a challenge, practice, or review session to generate your first result." action="Start challenge" href={gameRoot + "/play"} />}
      </div>
    </section>
  );
}

export function ClaudeChallengeProgress() {
  const progress = useGameProgress();
  const latest = getLatestAttempt(progress.state);
  const cleared = challenge.floors.filter((floor) => progress.state.floorProgress[floor.id]?.clearedAt).length;
  const achievements = CLAUDE_ACHIEVEMENTS.filter((achievement) => progress.state.unlockedAchievements.includes(achievement.id));

  return (
    <section className="pt-32 pb-16 lg:pt-40 lg:pb-24">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <Link href={gameRoot} className="group mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"><ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Challenge overview</Link>
        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          <div className="space-y-8">
            <div className="border border-foreground/10 p-6 md:p-8">
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Progress tracking</p>
              <h1 className="mt-4 font-display text-[clamp(3rem,8vw,5.5rem)] leading-none">Level {progress.state.level}</h1>
              <div className="mt-8 grid gap-px border border-foreground/10 bg-foreground/10 sm:grid-cols-2 lg:grid-cols-4">
                <Metric label="Lifetime XP" value={String(progress.state.xp)} />
                <Metric label="Floors cleared" value={cleared + " / " + challenge.floors.length} />
                <Metric label="Streak" value={progress.state.streakDays + " days"} />
                <Metric label="Best rank" value={latest ? getRank(latest.accuracy) : "New"} />
              </div>
            </div>
            <Panel title="Floor mastery" icon={<Target className="h-5 w-5" />}><FloorGrid /></Panel>
            <Panel title="Recent attempts" icon={<Clock className="h-5 w-5" />}>
              <AttemptList />
            </Panel>
          </div>
          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="border border-foreground/10 p-6">
              <h2 className="font-medium">Badges</h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {progress.state.badges.length ? progress.state.badges.map((badge) => <span key={badge} className="border border-foreground/10 px-3 py-2 font-mono text-xs uppercase">{badge}</span>) : <p className="text-sm text-muted-foreground">Earn 250 XP to unlock your first badge.</p>}
              </div>
            </div>
            <div className="border border-foreground/10 p-6">
              <h2 className="font-medium">Achievements</h2>
              <div className="mt-5 space-y-3">
                {CLAUDE_ACHIEVEMENTS.map((achievement) => {
                  const unlocked = achievements.some((item) => item.id === achievement.id);
                  return <div key={achievement.id} className={"border p-4 " + (unlocked ? "border-foreground" : "border-foreground/10 text-muted-foreground")}><div className="flex items-center gap-2 font-medium"><Award className="h-4 w-4" />{achievement.title}</div><p className="mt-2 text-sm">{achievement.description}</p></div>;
                })}
              </div>
            </div>
            <Button type="button" variant="outline" className="w-full" onClick={progress.resetProgress}><RotateCcw className="h-4 w-4" /> Reset local progress</Button>
          </aside>
        </div>
      </div>
    </section>
  );
}

export function ClaudeChallengeLeaderboard() {
  const progress = useGameProgress();
  const entries = getLeaderboard(progress.state);

  return (
    <section className="pt-32 pb-16 lg:pt-40 lg:pb-24">
      <div className="mx-auto max-w-[1000px] px-6 lg:px-12">
        <Link href={gameRoot} className="group mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"><ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Challenge overview</Link>
        <div className="border border-foreground/10 p-6 md:p-8">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Local-only leaderboard</p>
          <h1 className="mt-4 font-display text-[clamp(3rem,8vw,5.5rem)] leading-none">Your best runs</h1>
          <p className="mt-5 max-w-2xl text-muted-foreground">This leaderboard is stored in this browser only. No backend, account, or shared database is used.</p>
        </div>
        {entries.length ? (
          <div className="mt-8 grid gap-px border border-foreground/10 bg-foreground/10">
            {entries.map((entry, index) => (
              <div key={entry.id} className="grid gap-4 bg-background p-5 md:grid-cols-[72px_1fr_repeat(4,110px)] md:items-center">
                <div className="font-display text-4xl">{String(index + 1).padStart(2, "0")}</div>
                <div><div className="font-medium">{entry.rank}</div><div className="text-sm text-muted-foreground">{new Date(entry.completedAt).toLocaleDateString()}</div></div>
                <Stat label="Score" value={String(entry.score)} />
                <Stat label="Accuracy" value={entry.accuracy + "%"} />
                <Stat label="Time" value={formatDuration(entry.durationSeconds)} />
                <Stat label="XP" value={String(entry.xpEarned)} />
              </div>
            ))}
          </div>
        ) : <EmptyState title="No local runs yet" description="Complete a run to create your first leaderboard entry." action="Start challenge" href={gameRoot + "/play"} />}
      </div>
    </section>
  );
}

function FloorGrid({ attemptId }: { attemptId?: string } = {}) {
  const progress = useGameProgress();
  const attempt = attemptId ? progress.state.attempts.find((item) => item.id === attemptId) : undefined;
  return (
    <div className="grid gap-px border border-foreground/10 bg-foreground/10 md:grid-cols-2">
      {challenge.floors.map((floor) => {
        const saved = progress.state.floorProgress[floor.id];
        const result = getFloorResult(attempt, floor);
        const cleared = Boolean(saved?.clearedAt || result.cleared);
        return (
          <div key={floor.id} className="bg-background p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Floor {String(floor.number).padStart(2, "0")}</p>
                <h3 className="mt-2 font-display text-2xl">{floor.name}</h3>
              </div>
              <span className={"border px-2 py-1 font-mono text-[11px] " + (cleared ? "border-foreground" : "border-foreground/10 text-muted-foreground")}>{cleared ? "Cleared" : "Open"}</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">{challenge.categories.find((category) => category.id === floor.categoryId)?.label}</p>
            <div className="mt-5 h-1.5 bg-foreground/10"><div className="h-full bg-foreground" style={{ width: (attempt ? result.accuracy : saved?.bestAccuracy ?? 0) + "%" }} /></div>
            <p className="mt-2 font-mono text-xs text-muted-foreground">Best: {attempt ? result.correct : saved?.bestCorrect ?? 0} / {floor.questionIds.length}</p>
          </div>
        );
      })}
    </div>
  );
}

function FloorMiniMap({ answers, questions }: { answers: Record<string, number[]>; questions: GameQuestion[] }) {
  return (
    <div className="border border-foreground/10 p-5">
      <h2 className="font-medium">Question map</h2>
      <div className="mt-5 grid grid-cols-6 gap-2">
        {questions.map((question, index) => <span key={question.id} className={"flex h-9 items-center justify-center border font-mono text-xs " + ((answers[question.id] ?? []).length ? "border-foreground bg-foreground text-background" : "border-foreground/10 text-muted-foreground")}>{index + 1}</span>)}
      </div>
    </div>
  );
}

function AttemptList() {
  const progress = useGameProgress();
  if (!progress.state.attempts.length) return <p className="text-sm text-muted-foreground">No attempts yet.</p>;
  return <div className="space-y-3">{progress.state.attempts.slice(0, 6).map((attempt) => <div key={attempt.id} className="grid gap-2 border border-foreground/10 p-4 sm:grid-cols-4"><Stat label="Mode" value={modeLabels[attempt.mode]} /><Stat label="Score" value={String(attempt.score)} /><Stat label="Accuracy" value={attempt.accuracy + "%"} /><Stat label="Time" value={formatDuration(attempt.durationSeconds)} /></div>)}</div>;
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="bg-background p-4"><div className="font-display text-3xl">{value}</div><div className="mt-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{label}</div></div>;
}

function Stat({ label, value }: { label: string; value: string }) {
  return <div><div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{label}</div><div className="mt-1 font-medium">{value}</div></div>;
}

function StatusRow({ label, value }: { label: string; value: string }) {
  return <div className="flex items-center justify-between gap-4 border-b border-foreground/10 pb-3 last:border-0 last:pb-0"><span className="text-muted-foreground">{label}</span><span className="text-right font-medium">{value}</span></div>;
}

function ProgressLine({ label, value, detail }: { label: string; value: number; detail: string }) {
  return <div><div className="flex items-center justify-between gap-4 text-sm"><span>{label}</span><span className="font-mono text-xs text-muted-foreground">{detail}</span></div><div className="mt-2 h-1.5 bg-foreground/10"><div className="h-full bg-foreground" style={{ width: value + "%" }} /></div></div>;
}

function Panel({ title, icon, children }: { title: string; icon: ReactNode; children: ReactNode }) {
  return <section className="border border-foreground/10 p-6"><div className="mb-5 flex items-center gap-3">{icon}<h2 className="font-display text-3xl">{title}</h2></div>{children}</section>;
}

function AreaList({ title, items, empty }: { title: string; items: string[]; empty: string }) {
  return <div className="border border-foreground/10 p-6"><h2 className="font-medium">{title}</h2><div className="mt-4 space-y-2">{items.length ? items.map((item) => <div key={item} className="border border-foreground/10 p-3 text-sm">{item}</div>) : <p className="text-sm text-muted-foreground">{empty}</p>}</div></div>;
}

function EmptyState({ title, description, action, href }: { title: string; description: string; action: string; href: string }) {
  return <div className="mt-8 border border-foreground/10 p-8 text-center"><Medal className="mx-auto h-8 w-8 text-muted-foreground" /><h2 className="mt-4 font-display text-3xl">{title}</h2><p className="mx-auto mt-3 max-w-xl text-muted-foreground">{description}</p><Button asChild className="mt-6"><Link href={href}>{action}</Link></Button></div>;
}
