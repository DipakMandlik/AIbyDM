"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock3,
  ListChecks,
  RotateCcw,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Exam } from "@/lib/content";
import { getExamHref } from "@/lib/content";

type SavedExamDraft = {
  currentIndex: number;
  answers: Record<string, number>;
  submitted: boolean;
  startedAt: number;
};

function getInitialDraft(storageKey: string, questionCount: number): SavedExamDraft {
  const fallback = { currentIndex: 0, answers: {}, submitted: false, startedAt: Date.now() };
  if (typeof window === "undefined") return fallback;

  const rawDraft = window.localStorage.getItem(storageKey);
  if (!rawDraft) return fallback;

  try {
    const draft = JSON.parse(rawDraft) as SavedExamDraft;
    return {
      currentIndex: Math.min(Math.max(draft.currentIndex ?? 0, 0), questionCount - 1),
      answers: draft.answers ?? {},
      submitted: Boolean(draft.submitted),
      startedAt: draft.startedAt || fallback.startedAt,
    };
  } catch {
    window.localStorage.removeItem(storageKey);
    return fallback;
  }
}

function optionLabel(index: number) {
  return String.fromCharCode(65 + index);
}

function formatElapsed(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function ExamRunner({ exam }: { exam: Exam }) {
  const questions = exam.sampleExamQuestions;
  const storageKey = `aibydm.exam.${exam.slug}.draft`;
  const [draft, setDraft] = useState<SavedExamDraft>(() => getInitialDraft(storageKey, questions.length));
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const { currentIndex, answers, submitted, startedAt } = draft;

  useEffect(() => {
    if (!startedAt) return;
    const tick = () => setElapsedSeconds(Math.max(0, Math.floor((Date.now() - startedAt) / 1000)));
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, [startedAt]);

  useEffect(() => {
    if (!startedAt) return;
    window.localStorage.setItem(storageKey, JSON.stringify(draft));
  }, [draft, startedAt, storageKey]);

  const current = questions[currentIndex];
  const selected = answers[current.id];
  const answeredCount = questions.filter((question) => answers[question.id] !== undefined).length;
  const progressPct = Math.round((answeredCount / questions.length) * 100);
  const score = useMemo(
    () => questions.filter((question) => answers[question.id] === question.correctOptionIndex).length,
    [answers, questions],
  );
  const accuracy = Math.round((score / questions.length) * 100);
  const canSubmit = answeredCount > 0;

  function selectAnswer(index: number) {
    if (submitted) return;
    setDraft((currentDraft) => ({
      ...currentDraft,
      answers: { ...currentDraft.answers, [current.id]: index },
    }));
  }

  function resetDraft() {
    const now = Date.now();
    setDraft({ currentIndex: 0, answers: {}, submitted: false, startedAt: now });
    setElapsedSeconds(0);
    window.localStorage.removeItem(storageKey);
  }

  return (
    <section className="min-h-dvh bg-slate-50 pt-20 text-slate-950 lg:pt-24">
      <div className="mx-auto grid max-w-[1440px] gap-4 px-4 pb-8 sm:px-6 lg:grid-cols-[270px_minmax(0,1fr)_300px] lg:px-5">
        <aside className="order-2 space-y-4 lg:order-1 lg:sticky lg:top-20 lg:max-h-[calc(100dvh-6rem)] lg:overflow-y-auto">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <Link href={getExamHref(exam.slug)} className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-950">
              <ArrowLeft className="h-4 w-4" />
              Exit exam
            </Link>
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">{exam.role}</p>
              <h1 className="mt-2 text-xl font-semibold leading-tight text-slate-950">{exam.title}</h1>
              <p className="mt-2 text-sm leading-6 text-slate-600">{questions.length} focused questions from the prep path.</p>
            </div>
            <div className="mt-5">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-slate-700">Progress</span>
                <span className="font-mono text-xs text-slate-500">{answeredCount} / {questions.length}</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-cyan-500 transition-all" style={{ width: `${progressPct}%` }} />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <ListChecks className="h-4 w-4 text-cyan-700" />
              <h2 className="text-sm font-semibold text-slate-950">Prep stages</h2>
            </div>
            <div className="space-y-2">
              {exam.stages.map((stage, index) => {
                const active = stage === current.stage;
                return (
                  <div key={stage} className={`rounded-lg border p-3 text-sm ${active ? "border-cyan-300 bg-cyan-50 text-slate-950" : "border-slate-200 bg-white text-slate-600"}`}>
                    <div className="flex items-center justify-between gap-3">
                      <span>{stage}</span>
                      <span className="font-mono text-[11px] text-slate-400">{String(index + 1).padStart(2, "0")}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>

        <article className="order-1 min-w-0 lg:order-2">
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-4 py-4 sm:px-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">Scenario</p>
                <p className="mt-1 text-sm text-slate-500">Question {currentIndex + 1} of {questions.length} / {current.stage}</p>
              </div>
              <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700">
                {submitted ? `${score}/${questions.length} scored` : `${progressPct}% answered`}
              </div>
            </div>

            <div className="px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
              <h2 className="max-w-4xl text-[20px] font-semibold leading-8 text-slate-950 sm:text-[22px]">
                {current.prompt}
              </h2>

              <div className="mt-6 grid gap-3" role="group" aria-label="Answer options">
                {current.options.map((option, index) => {
                  const isSelected = selected === index;
                  const isCorrect = current.correctOptionIndex === index;
                  const reviewClass = submitted && isCorrect
                    ? "border-emerald-500 bg-emerald-50 text-emerald-950"
                    : submitted && isSelected && !isCorrect
                      ? "border-rose-500 bg-rose-50 text-rose-950"
                      : isSelected
                        ? "border-cyan-500 bg-cyan-50 text-slate-950 ring-2 ring-cyan-100"
                        : "border-slate-200 bg-white text-slate-700 hover:border-cyan-300 hover:bg-cyan-50/50";
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => selectAnswer(index)}
                      className={`min-h-14 rounded-xl border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${reviewClass}`}
                      aria-pressed={isSelected}
                    >
                      <span className="flex items-start gap-3">
                        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border font-mono text-xs font-semibold ${isSelected ? "border-cyan-500 bg-cyan-600 text-white" : "border-slate-300 bg-white text-slate-700"}`}>
                          {optionLabel(index)}
                        </span>
                        <span className="pt-1 text-sm leading-6 sm:text-base">{option}</span>
                      </span>
                    </button>
                  );
                })}
              </div>

              {submitted ? (
                <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-950">
                    <CheckCircle2 className="h-4 w-4 text-cyan-700" />
                    Explanation
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-700">{current.explanation}</p>
                </div>
              ) : null}
            </div>

            <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <Button
                type="button"
                variant="outline"
                className="min-h-11 rounded-lg border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                disabled={currentIndex === 0}
                onClick={() => setDraft((currentDraft) => ({ ...currentDraft, currentIndex: Math.max(0, currentDraft.currentIndex - 1) }))}
              >
                <ArrowLeft className="h-4 w-4" /> Previous
              </Button>
              <div className="flex flex-col gap-3 sm:flex-row">
                {submitted ? (
                  <Button type="button" variant="outline" className="min-h-11 rounded-lg border-slate-300 bg-white text-slate-700 hover:bg-slate-50" onClick={resetDraft}>
                    <RotateCcw className="h-4 w-4" /> Restart
                  </Button>
                ) : null}
                {currentIndex < questions.length - 1 ? (
                  <Button type="button" className="min-h-11 rounded-lg bg-cyan-600 text-white hover:bg-cyan-700" onClick={() => setDraft((currentDraft) => ({ ...currentDraft, currentIndex: Math.min(questions.length - 1, currentDraft.currentIndex + 1) }))}>
                    Next <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button type="button" className="min-h-11 rounded-lg bg-cyan-600 text-white hover:bg-cyan-700" disabled={!canSubmit} onClick={() => setDraft((currentDraft) => ({ ...currentDraft, submitted: true }))}>
                    <Send className="h-4 w-4" /> Submit exam
                  </Button>
                )}
              </div>
            </div>
          </div>
        </article>

        <aside className="order-3 space-y-4 lg:sticky lg:top-20 lg:max-h-[calc(100dvh-6rem)] lg:overflow-y-auto">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-950">
              <Clock3 className="h-4 w-4 text-cyan-700" /> Run status
            </div>
            <div className="mt-4 space-y-3 text-sm">
              <StatusRow label="Mode" value="Practice exam" />
              <StatusRow label="Time" value={formatElapsed(elapsedSeconds)} />
              <StatusRow label="Answered" value={`${answeredCount} / ${questions.length}`} />
              <StatusRow label="Score" value={submitted ? `${score} / ${questions.length}` : "Pending"} />
              <StatusRow label="Accuracy" value={submitted ? `${accuracy}%` : "Pending"} />
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-950">Current topic</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-medium text-cyan-800">{current.topic ?? current.stage}</span>
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">{current.stage}</span>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-950">Question navigator</h2>
            <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6 lg:grid-cols-3">
              {questions.map((question, index) => {
                const isCurrent = index === currentIndex;
                const isAnswered = answers[question.id] !== undefined;
                const isCorrect = submitted && answers[question.id] === question.correctOptionIndex;
                const stateClass = isCurrent
                  ? "border-cyan-600 bg-cyan-600 text-white"
                  : submitted && isCorrect
                    ? "border-emerald-500 bg-emerald-50 text-emerald-800"
                    : submitted && isAnswered
                      ? "border-rose-500 bg-rose-50 text-rose-800"
                      : isAnswered
                        ? "border-cyan-300 bg-cyan-50 text-cyan-800"
                        : "border-slate-200 bg-white text-slate-500 hover:border-cyan-300";
                return (
                  <button key={question.id} type="button" onClick={() => setDraft((currentDraft) => ({ ...currentDraft, currentIndex: index }))} className={`flex min-h-11 items-center justify-center rounded-lg border font-mono text-sm transition-colors ${stateClass}`}>
                    {index + 1}
                  </button>
                );
              })}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-500">
              <Legend color="bg-cyan-600" label="Current" />
              <Legend color="bg-cyan-100" label="Answered" />
              <Legend color="bg-white border border-slate-300" label="Open" />
              <Legend color="bg-emerald-100" label="Correct" />
            </div>
          </div>

          {!submitted ? (
            <Button type="button" className="min-h-11 w-full rounded-lg bg-cyan-600 text-white hover:bg-cyan-700" disabled={!canSubmit} onClick={() => setDraft((currentDraft) => ({ ...currentDraft, submitted: true }))}>
              <Check className="h-4 w-4" /> Submit for review
            </Button>
          ) : null}
        </aside>
      </div>
    </section>
  );
}

function StatusRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-3 last:border-0 last:pb-0">
      <span className="text-slate-500">{label}</span>
      <span className="text-right font-semibold text-slate-950">{value}</span>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
      {label}
    </span>
  );
}
