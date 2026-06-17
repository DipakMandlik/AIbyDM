"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Circle, Lock, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLearnProgress } from "@/hooks/use-learn-progress";
import {
  AIFS_PATH_SLUG,
  getAifsLessonHref,
  getLearningPathHref,
  getPhaseProgress,
  type AifsPhaseIndex,
} from "@/lib/learning-index";

export function PhaseDetail({ phase }: { phase: AifsPhaseIndex }) {
  const progress = useLearnProgress();
  const phaseProgress = getPhaseProgress(progress.state, phase);
  const nextLesson = phase.lessons.find((lesson) => !progress.state.lessons[lesson.id]?.completedAt) ?? phase.lessons[0];

  return (
    <>
      <section className="relative border-b border-foreground/10 pt-36 pb-12 lg:pt-44">
        <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
          <Link
            href={getLearningPathHref(AIFS_PATH_SLUG)}
            className="group mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            AI From Scratch
          </Link>

          <div className="mb-6 flex flex-wrap items-center gap-3 font-mono text-xs text-muted-foreground">
            <span>Phase {phase.number}</span>
            <span>/</span>
            <span>{phase.lessonCount} lessons</span>
            <span>/</span>
            <span>{phase.duration}</span>
          </div>

          <h1 className="max-w-4xl font-display text-[clamp(2.5rem,6vw,4.8rem)] leading-[0.95] tracking-tight">
            {phase.title}
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-muted-foreground">
            {phase.description}
          </p>

          <div className="mt-10 max-w-xl">
            <div className="mb-2 flex items-center justify-between font-mono text-xs">
              <span className="text-muted-foreground">
                {phaseProgress.completed} / {phaseProgress.total} complete
              </span>
              <span>{progress.ready ? phaseProgress.percentage : 0}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-foreground/10">
              <div
                className="h-full rounded-full bg-foreground transition-all duration-700"
                style={{ width: `${progress.ready ? phaseProgress.percentage : 0}%` }}
              />
            </div>
          </div>

          {nextLesson && (
            <Button
              asChild
              size="lg"
              className="mt-10 h-14 rounded-full bg-foreground px-8 text-base text-background hover:bg-foreground/90"
            >
              <Link href={getAifsLessonHref(phase.slug, nextLesson.slug)}>
                <Play className="mr-2 h-4 w-4 fill-current" />
                {phaseProgress.completed > 0 ? "Continue phase" : "Start phase"}
              </Link>
            </Button>
          )}
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
          <div className="mb-10 flex items-center gap-4">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Lessons
            </span>
            <div className="h-px flex-1 bg-foreground/10" />
          </div>

          <div className="border border-foreground/10">
            {phase.lessons.map((lesson, index) => {
              const complete = Boolean(progress.state.lessons[lesson.id]?.completedAt);
              const visited = Boolean(progress.state.lessons[lesson.id]?.visitedAt);
              const current = nextLesson?.id === lesson.id;
              return (
                <Link
                  key={lesson.id}
                  href={getAifsLessonHref(phase.slug, lesson.slug)}
                  className={`group flex items-start gap-4 border-b border-foreground/10 px-5 py-5 transition-colors last:border-b-0 ${
                    current ? "bg-foreground/[0.03]" : "hover:bg-foreground/[0.02]"
                  }`}
                >
                  <span className="mt-1 shrink-0">
                    {complete ? (
                      <Check className="h-4 w-4 text-foreground" aria-hidden="true" />
                    ) : visited || current ? (
                      <Circle className="h-4 w-4 fill-foreground/20 text-foreground" aria-hidden="true" />
                    ) : (
                      <Lock className="h-4 w-4 text-muted-foreground/40" aria-hidden="true" />
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-xs text-muted-foreground">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-lg font-medium text-foreground">{lesson.title}</span>
                      {current && (
                        <span className="bg-foreground px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-background">
                          Up next
                        </span>
                      )}
                    </span>
                    <span className="mt-2 block text-sm leading-6 text-muted-foreground">{lesson.summary}</span>
                    <span className="mt-3 flex flex-wrap gap-2 font-mono text-xs text-muted-foreground">
                      <span>{lesson.type}</span>
                      <span>/</span>
                      <span>{lesson.duration}</span>
                      {lesson.languages[0] && (
                        <>
                          <span>/</span>
                          <span>{lesson.languages.slice(0, 3).join(", ")}</span>
                        </>
                      )}
                    </span>
                  </span>
                  <ArrowRight className="mt-1 hidden h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 sm:block" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
