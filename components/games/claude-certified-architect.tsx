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
    <section className="pt-14 lg:h-dvh lg:overflow-hidden">
      <div className="mx-auto grid min-h-[calc(100dvh-3.5rem)] max-w-[1500px] gap-4 px-4 py-4 sm:px-6 lg:grid-cols-[1fr_360px] lg:overflow-hidden lg:px-8">
        <div className="grid min-h-0 gap-4 lg:grid-rows-[auto_1fr] lg:overflow-hidden">
          <header className="rounded-[28px] border border-cyan-300/20 bg-[radial-gradient(circle_at_12%_0%,rgba(34,211,238,0.22),transparent_32%),linear-gradient(135deg,rgba(15,23,42,0.96),rgba(8,13,28,0.98))] p-5 lg:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Link href="/games" className="group inline-flex min-h-10 items-center gap-2 rounded-full border border-white/10 px-4 text-sm text-slate-300 transition-colors hover:border-cyan-300/40 hover:text-white">
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Arcade
              </Link>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 font-mono text-[11px] uppercase tracking-widest text-cyan-100">Hard</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 font-mono text-[11px] uppercase tracking-widest text-cyan-100">{challenge.estimatedDuration}</span>
              </div>
            </div>
            <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan-200/80">Flagship game</p>
                <h1 className="mt-3 font-display text-4xl leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-6xl">{challenge.title}</h1>
                <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">{challenge.description}</p>
              </div>
              <Button asChild size="lg" className="min-h-12 rounded-full bg-cyan-300 px-6 text-slate-950 hover:bg-white">
                <Link href={gameRoot + "/play"}>Start challenge <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </div>
          </header>

          <div className="grid min-h-0 gap-4 lg:grid-cols-[0.72fr_1fr] lg:overflow-hidden">
            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4 lg:overflow-y-auto">
              <div className="mb-4 flex items-center gap-3 text-cyan-200">
                <Trophy className="h-5 w-5" aria-hidden="true" />
                <h2 className="font-display text-2xl text-white">Modes</h2>
              </div>
              <div className="grid gap-3">
                {[
                  ["Full Challenge", "Clear 10 floors with 6 questions each.", "/play"],
                  ["Practice Mode", "Instant feedback, hints, and references.", "/play?mode=practice"],
                  ["Single Question", "One focused scenario for a quick rep.", "/play?mode=single"],
                  ["Review Mode", "Revisit misses and weak areas.", "/play?mode=review"],
                ].map(([title, description, href]) => (
                  <Link key={title} href={gameRoot + href} className="group rounded-2xl border border-white/10 bg-slate-900/70 p-4 transition-colors hover:border-cyan-300/40 hover:bg-slate-900">
                    <h3 className="font-semibold text-white">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
                    <span className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-cyan-200">Open mode <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4 lg:overflow-y-auto">
              <div className="mb-4 flex items-center gap-3 text-cyan-200">
                <ListChecks className="h-5 w-5" aria-hidden="true" />
                <h2 className="font-display text-2xl text-white">Floor map</h2>
              </div>
              <FloorGrid />
            </div>
          </div>
        </div>

        <aside className="grid min-h-0 gap-4 lg:grid-rows-[auto_auto_1fr] lg:overflow-hidden">
          <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
            <div className="grid grid-cols-2 gap-2">
              <Metric label="Questions" value={String(challenge.questionCount)} />
              <Metric label="XP Reward" value={String(challenge.xpReward)} />
              <Metric label="Floors" value={String(challenge.floors.length)} />
              <Metric label="Completion" value={progress.ready ? completion + "%" : "0%"} />
            </div>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
            <h2 className="font-semibold text-white">Architect profile</h2>
            <div className="mt-4 space-y-3 text-sm">
              <StatusRow label="Level" value={String(progress.state.level)} />
              <StatusRow label="XP" value={String(progress.state.xp)} />
              <StatusRow label="Streak" value={progress.state.streakDays + " days"} />
              <StatusRow label="Latest rank" value={latest ? getRank(latest.accuracy) : "Not started"} />
            </div>
            <div className="mt-5 grid gap-3">
              <Button asChild variant="outline" className="border-white/15 bg-white/5 text-white hover:bg-white/10"><Link href={gameRoot + "/progress"}>View progress</Link></Button>
              <Button asChild variant="outline" className="border-white/15 bg-white/5 text-white hover:bg-white/10"><Link href={gameRoot + "/leaderboard"}>Local leaderboard</Link></Button>
            </div>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5 lg:overflow-y-auto">
            <h2 className="font-semibold text-white">Category coverage</h2>
            <div className="mt-4 space-y-3">
              {challenge.categories.map((category) => (
                <div key={category.id}>
                  <div className="flex items-center justify-between gap-4 text-sm text-slate-300">
                    <span>{category.shortLabel}</span>
                    <span className="font-mono text-xs text-slate-500">{category.weight}%</span>
                  </div>
                  <div className="mt-2 h-1.5 rounded-full bg-white/10"><div className="h-full rounded-full bg-cyan-300" style={{ width: category.weight + "%" }} /></div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
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
    <section className="pt-14 lg:h-dvh lg:overflow-hidden">
      <div className="mx-auto flex min-h-[calc(100dvh-3.5rem)] max-w-[1500px] flex-col gap-4 px-4 py-4 sm:px-6 lg:overflow-hidden lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-[24px] border border-white/10 bg-white/[0.04] p-3 sm:p-4">
          <Link href={gameRoot} className="group inline-flex min-h-10 items-center gap-2 rounded-full border border-white/10 px-4 text-sm text-slate-300 transition-colors hover:border-cyan-300/40 hover:text-white">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Challenge overview
          </Link>
          <div className="flex flex-wrap gap-2">
            {Object.entries(modeLabels).map(([key, label]) => (
              <Link key={key} href={gameRoot + "/play" + (key === "challenge" ? "" : "?mode=" + key)} className={"inline-flex min-h-10 items-center rounded-full border px-3 text-xs font-mono transition-colors " + (mode === key ? "border-cyan-300 bg-cyan-300 text-slate-950" : "border-white/10 bg-white/5 text-slate-300 hover:border-cyan-300/40 hover:text-white")}>{label}</Link>
            ))}
          </div>
        </div>

        <div className="grid min-h-0 flex-1 gap-4 lg:grid-cols-[1fr_340px] lg:overflow-hidden">
          <article className="flex min-h-[560px] flex-col rounded-[28px] border border-white/10 bg-slate-900/90 p-5 shadow-2xl shadow-black/20 md:p-6 lg:min-h-0 lg:overflow-y-auto">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan-200/80">{modeLabels[mode]} / Question {currentIndex + 1} of {questions.length}</p>
                <h1 className="mt-3 max-w-4xl text-xl font-semibold leading-snug text-white md:text-2xl lg:text-3xl">{current.prompt}</h1>
              </div>
              <div className="min-w-24 rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-center">
                <div className="font-display text-3xl text-cyan-200">{progressPct}%</div>
                <div className="font-mono text-[11px] uppercase text-slate-500">Answered</div>
              </div>
            </div>

            <div className="mt-5 grid gap-3" role="group" aria-label="Answer options">
              {current.options.map((option, index) => {
                const isSelected = selected.includes(index);
                const isCorrect = current.correctOptionIndexes.includes(index);
                const feedbackClass = showFeedback && isCorrect ? "border-emerald-300 bg-emerald-300 text-slate-950" : showFeedback && isSelected && !isCorrect ? "border-red-300 text-red-200" : isSelected ? "border-cyan-300 bg-cyan-300/10 text-white" : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-cyan-300/40 hover:text-white";
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => toggleAnswer(index)}
                    className={"min-h-14 w-full rounded-2xl border p-4 text-left transition-colors focus-visible:ring-2 focus-visible:ring-cyan-300 " + feedbackClass}
                    aria-pressed={isSelected}
                  >
                    <span className="flex items-start gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-current font-mono text-xs">{optionLabel(index)}</span>
                      <span className="leading-relaxed">{option}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            {showFeedback ? (
              <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <div className="flex items-center gap-2 font-medium">{correct ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />} {correct ? "Correct" : "Review this one"}</div>
                {current.hint ? <p className="mt-3 text-sm text-slate-400">Hint: {current.hint}</p> : null}
                <p className="mt-3 leading-relaxed text-slate-300">{current.explanation}</p>
              </div>
            ) : null}

            <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6">
              <Button type="button" variant="outline" className="border-white/15 bg-white/5 text-white hover:bg-white/10" disabled={currentIndex === 0} onClick={() => setCurrentIndex((index) => Math.max(0, index - 1))}>
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
              <div className="flex gap-3">
                {mode !== "challenge" ? <Button type="button" variant="outline" className="border-white/15 bg-white/5 text-white hover:bg-white/10" onClick={() => setRevealed((state) => ({ ...state, [current.id]: true }))}>Show explanation</Button> : null}
                <Button type="button" className="bg-cyan-300 text-slate-950 hover:bg-white" disabled={selected.length === 0} onClick={nextQuestion}>
                  {currentIndex === questions.length - 1 ? "Finish" : "Next"} <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </article>

          <aside className="grid min-h-0 gap-4 lg:grid-rows-[auto_auto_1fr] lg:overflow-hidden">
            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
              <h2 className="font-semibold text-white">Run status</h2>
              <div className="mt-5 space-y-4 text-sm">
                <StatusRow label="Mode" value={modeLabels[mode]} />
                <StatusRow label="Answered" value={answeredCount + " / " + questions.length} />
                <StatusRow label="Clear rule" value="4 / 6 per floor" />
                <StatusRow label="XP pool" value={String(challenge.xpReward)} />
              </div>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
              <h2 className="font-semibold text-white">Current topic</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {current.tags.map((tag) => <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-2 py-1 font-mono text-[11px] text-slate-300">{tag}</span>)}
              </div>
              <div className="mt-5 space-y-2">
                {current.references.map((reference) => <Link key={reference.href} href={reference.href} className="block text-sm text-slate-400 underline-offset-4 hover:text-cyan-200 hover:underline">{reference.label}</Link>)}
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
    <section className="pt-14 lg:h-dvh lg:overflow-hidden">
      <div className="mx-auto flex min-h-[calc(100dvh-3.5rem)] max-w-[1400px] flex-col gap-4 px-4 py-4 sm:px-6 lg:overflow-hidden lg:px-8">
        <Link href={gameRoot} className="group inline-flex min-h-10 w-fit items-center gap-2 rounded-full border border-white/10 px-4 text-sm text-slate-300 transition-colors hover:border-cyan-300/40 hover:text-white"><ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Challenge overview</Link>
        {latest ? (
          <div className="grid min-h-0 flex-1 gap-4 lg:grid-cols-[1fr_340px] lg:overflow-hidden">
            <div className="grid min-h-0 gap-4 lg:grid-rows-[auto_1fr_1fr] lg:overflow-hidden">
              <div className="rounded-[28px] border border-cyan-300/20 bg-[radial-gradient(circle_at_18%_0%,rgba(34,211,238,0.22),transparent_34%),rgba(255,255,255,0.04)] p-5 md:p-6">
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-cyan-200/80">Results / {modeLabels[latest.mode]}</p>
                <h1 className="mt-3 font-display text-5xl leading-none text-white lg:text-6xl">{getRank(latest.accuracy)}</h1>
                <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                  <Metric label="Score" value={String(latest.score)} />
                  <Metric label="Accuracy" value={latest.accuracy + "%"} />
                  <Metric label="XP Earned" value={String(latest.xpEarned)} />
                  <Metric label="Time" value={formatDuration(latest.durationSeconds)} />
                </div>
              </div>
              <Panel title="Category breakdown" icon={<BarChart3 className="h-5 w-5" />}>
                <div className="space-y-4 lg:max-h-full lg:overflow-y-auto">
                  {breakdown.map((entry) => <ProgressLine key={entry.id} label={entry.label} value={entry.total ? entry.accuracy : 0} detail={entry.correct + " / " + entry.total} />)}
                </div>
              </Panel>
              <Panel title="Floor results" icon={<Target className="h-5 w-5" />}>
                <FloorGrid attemptId={latest.id} />
              </Panel>
            </div>
            <aside className="grid min-h-0 gap-4 lg:grid-rows-[auto_auto_1fr_1fr] lg:overflow-hidden">
              <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
                <h2 className="font-semibold text-white">Next best step</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{weakAreas[0] ? "Practice " + weakAreas[0].label + " before your next full challenge run." : "Your latest run is strong. Repeat the full challenge to improve speed and consistency."}</p>
                <div className="mt-6 grid gap-3">
                  <Button asChild className="bg-cyan-300 text-slate-950 hover:bg-white"><Link href={gameRoot + "/play?mode=practice"}>Continue learning</Link></Button>
                  <Button asChild variant="outline" className="border-white/15 bg-white/5 text-white hover:bg-white/10"><Link href={gameRoot + "/play"}>Retry challenge</Link></Button>
                  <Button asChild variant="outline" className="border-white/15 bg-white/5 text-white hover:bg-white/10"><Link href={gameRoot + "/play?mode=review"}>Review mistakes</Link></Button>
                </div>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
                <h2 className="font-semibold text-white">Share achievement</h2>
                <p className="mt-3 text-sm text-slate-400">{shareText}</p>
                <Button type="button" variant="outline" className="mt-5 w-full border-white/15 bg-white/5 text-white hover:bg-white/10" onClick={() => navigator.clipboard?.writeText(shareText)}><Share2 className="h-4 w-4" /> Copy share text</Button>
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
    <section className="pt-14 lg:h-dvh lg:overflow-hidden">
      <div className="mx-auto flex min-h-[calc(100dvh-3.5rem)] max-w-[1400px] flex-col gap-4 px-4 py-4 sm:px-6 lg:overflow-hidden lg:px-8">
        <Link href={gameRoot} className="group inline-flex min-h-10 w-fit items-center gap-2 rounded-full border border-white/10 px-4 text-sm text-slate-300 transition-colors hover:border-cyan-300/40 hover:text-white"><ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Challenge overview</Link>
        <div className="grid min-h-0 flex-1 gap-4 lg:grid-cols-[1fr_340px] lg:overflow-hidden">
          <div className="grid min-h-0 gap-4 lg:grid-rows-[auto_1fr_0.8fr] lg:overflow-hidden">
            <div className="rounded-[28px] border border-cyan-300/20 bg-[radial-gradient(circle_at_18%_0%,rgba(34,211,238,0.22),transparent_34%),rgba(255,255,255,0.04)] p-5 md:p-6">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-cyan-200/80">Progress tracking</p>
              <h1 className="mt-3 font-display text-5xl leading-none text-white lg:text-6xl">Level {progress.state.level}</h1>
              <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
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
          <aside className="grid min-h-0 gap-4 lg:grid-rows-[auto_1fr_auto] lg:overflow-hidden">
            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
              <h2 className="font-semibold text-white">Badges</h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {progress.state.badges.length ? progress.state.badges.map((badge) => <span key={badge} className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-2 font-mono text-xs uppercase text-cyan-100">{badge}</span>) : <p className="text-sm text-slate-400">Earn 250 XP to unlock your first badge.</p>}
              </div>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5 lg:overflow-y-auto">
              <h2 className="font-semibold text-white">Achievements</h2>
              <div className="mt-5 space-y-3">
                {CLAUDE_ACHIEVEMENTS.map((achievement) => {
                  const unlocked = achievements.some((item) => item.id === achievement.id);
                  return <div key={achievement.id} className={"rounded-2xl border p-4 " + (unlocked ? "border-cyan-300/50 bg-cyan-300/10 text-white" : "border-white/10 bg-white/[0.03] text-slate-400")}><div className="flex items-center gap-2 font-medium"><Award className="h-4 w-4" />{achievement.title}</div><p className="mt-2 text-sm">{achievement.description}</p></div>;
                })}
              </div>
            </div>
            <Button type="button" variant="outline" className="w-full border-white/15 bg-white/5 text-white hover:bg-white/10" onClick={progress.resetProgress}><RotateCcw className="h-4 w-4" /> Reset local progress</Button>
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
    <section className="pt-14 lg:h-dvh lg:overflow-hidden">
      <div className="mx-auto flex min-h-[calc(100dvh-3.5rem)] max-w-[1200px] flex-col gap-4 px-4 py-4 sm:px-6 lg:overflow-hidden lg:px-8">
        <Link href={gameRoot} className="group inline-flex min-h-10 w-fit items-center gap-2 rounded-full border border-white/10 px-4 text-sm text-slate-300 transition-colors hover:border-cyan-300/40 hover:text-white"><ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Challenge overview</Link>
        <div className="rounded-[28px] border border-cyan-300/20 bg-[radial-gradient(circle_at_18%_0%,rgba(34,211,238,0.22),transparent_34%),rgba(255,255,255,0.04)] p-5 md:p-6">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-cyan-200/80">Local-only leaderboard</p>
          <h1 className="mt-3 font-display text-5xl leading-none text-white lg:text-6xl">Your best runs</h1>
          <p className="mt-4 max-w-2xl text-slate-400">This leaderboard is stored in this browser only. No backend, account, or shared database is used.</p>
        </div>
        {entries.length ? (
          <div className="grid min-h-0 flex-1 gap-3 overflow-y-auto rounded-[24px] border border-white/10 bg-white/[0.04] p-3">
            {entries.map((entry, index) => (
              <div key={entry.id} className="grid gap-4 rounded-2xl border border-white/10 bg-slate-900/80 p-4 md:grid-cols-[72px_1fr_repeat(4,110px)] md:items-center">
                <div className="font-display text-4xl text-cyan-200">{String(index + 1).padStart(2, "0")}</div>
                <div><div className="font-medium text-white">{entry.rank}</div><div className="text-sm text-slate-500">{new Date(entry.completedAt).toLocaleDateString()}</div></div>
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
    <div className="grid gap-3 md:grid-cols-2">
      {challenge.floors.map((floor) => {
        const saved = progress.state.floorProgress[floor.id];
        const result = getFloorResult(attempt, floor);
        const cleared = Boolean(saved?.clearedAt || result.cleared);
        return (
          <div key={floor.id} className="rounded-2xl border border-white/10 bg-slate-900/75 p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-cyan-200/70">Floor {String(floor.number).padStart(2, "0")}</p>
                <h3 className="mt-2 font-display text-xl text-white">{floor.name}</h3>
              </div>
              <span className={"rounded-full border px-2 py-1 font-mono text-[11px] " + (cleared ? "border-cyan-300/40 bg-cyan-300/10 text-cyan-100" : "border-white/10 text-slate-500")}>{cleared ? "Cleared" : "Open"}</span>
            </div>
            <p className="mt-3 text-sm text-slate-400">{challenge.categories.find((category) => category.id === floor.categoryId)?.label}</p>
            <div className="mt-4 h-1.5 rounded-full bg-white/10"><div className="h-full rounded-full bg-cyan-300" style={{ width: (attempt ? result.accuracy : saved?.bestAccuracy ?? 0) + "%" }} /></div>
            <p className="mt-2 font-mono text-xs text-slate-500">Best: {attempt ? result.correct : saved?.bestCorrect ?? 0} / {floor.questionIds.length}</p>
          </div>
        );
      })}
    </div>
  );
}

function FloorMiniMap({ answers, questions }: { answers: Record<string, number[]>; questions: GameQuestion[] }) {
  return (
    <div className="min-h-0 rounded-[24px] border border-white/10 bg-white/[0.04] p-5 lg:overflow-y-auto">
      <h2 className="font-semibold text-white">Question map</h2>
      <div className="mt-5 grid grid-cols-6 gap-2">
        {questions.map((question, index) => <span key={question.id} className={"flex h-9 items-center justify-center rounded-xl border font-mono text-xs " + ((answers[question.id] ?? []).length ? "border-cyan-300 bg-cyan-300 text-slate-950" : "border-white/10 bg-white/[0.03] text-slate-500")}>{index + 1}</span>)}
      </div>
    </div>
  );
}

function AttemptList() {
  const progress = useGameProgress();
  if (!progress.state.attempts.length) return <p className="text-sm text-slate-400">No attempts yet.</p>;
  return <div className="space-y-3 lg:max-h-full lg:overflow-y-auto">{progress.state.attempts.slice(0, 6).map((attempt) => <div key={attempt.id} className="grid gap-2 rounded-2xl border border-white/10 bg-slate-900/75 p-4 sm:grid-cols-4"><Stat label="Mode" value={modeLabels[attempt.mode]} /><Stat label="Score" value={String(attempt.score)} /><Stat label="Accuracy" value={attempt.accuracy + "%"} /><Stat label="Time" value={formatDuration(attempt.durationSeconds)} /></div>)}</div>;
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4"><div className="font-display text-3xl text-white">{value}</div><div className="mt-1 font-mono text-[11px] uppercase tracking-widest text-slate-500">{label}</div></div>;
}

function Stat({ label, value }: { label: string; value: string }) {
  return <div><div className="font-mono text-[11px] uppercase tracking-widest text-slate-500">{label}</div><div className="mt-1 font-medium text-white">{value}</div></div>;
}

function StatusRow({ label, value }: { label: string; value: string }) {
  return <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3 last:border-0 last:pb-0"><span className="text-slate-400">{label}</span><span className="text-right font-medium text-white">{value}</span></div>;
}

function ProgressLine({ label, value, detail }: { label: string; value: number; detail: string }) {
  return <div><div className="flex items-center justify-between gap-4 text-sm text-slate-300"><span>{label}</span><span className="font-mono text-xs text-slate-500">{detail}</span></div><div className="mt-2 h-1.5 rounded-full bg-white/10"><div className="h-full rounded-full bg-cyan-300" style={{ width: value + "%" }} /></div></div>;
}

function Panel({ title, icon, children }: { title: string; icon: ReactNode; children: ReactNode }) {
  return <section className="min-h-0 rounded-[24px] border border-white/10 bg-white/[0.04] p-5 lg:overflow-hidden"><div className="mb-4 flex items-center gap-3 text-cyan-200">{icon}<h2 className="font-display text-2xl text-white">{title}</h2></div>{children}</section>;
}

function AreaList({ title, items, empty }: { title: string; items: string[]; empty: string }) {
  return <div className="min-h-0 rounded-[24px] border border-white/10 bg-white/[0.04] p-5 lg:overflow-y-auto"><h2 className="font-semibold text-white">{title}</h2><div className="mt-4 space-y-2">{items.length ? items.map((item) => <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-sm text-slate-300">{item}</div>) : <p className="text-sm text-slate-400">{empty}</p>}</div></div>;
}

function EmptyState({ title, description, action, href }: { title: string; description: string; action: string; href: string }) {
  return <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-8 text-center"><Medal className="mx-auto h-8 w-8 text-cyan-200" /><h2 className="mt-4 font-display text-3xl text-white">{title}</h2><p className="mx-auto mt-3 max-w-xl text-slate-400">{description}</p><Button asChild className="mt-6 bg-cyan-300 text-slate-950 hover:bg-white"><Link href={href}>{action}</Link></Button></div>;
}
