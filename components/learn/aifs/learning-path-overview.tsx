"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Circle, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLearnProgress } from "@/hooks/use-learn-progress";
import {
  AIFS_PATH_SLUG,
  aifsLearningPathIndex,
  getAifsLessonHref,
  getContinueLesson,
  getLearningPathProgress,
  getPhaseHref,
  getPhaseProgress,
} from "@/lib/learning-index";

export function LearningPathOverview() {
  const progress = useLearnProgress();
  const pathProgress = getLearningPathProgress(progress.state);
  const continueLesson = getContinueLesson(progress.state);
  const continueHref = continueLesson
    ? getAifsLessonHref(continueLesson.phase.slug, continueLesson.lesson.slug)
    : getPhaseHref(AIFS_PATH_SLUG, aifsLearningPathIndex.phases[0]?.slug ?? "00-setup-and-tooling");

  return (
    <>
      <section className="relative border-b border-foreground/10 pt-36 pb-12 lg:pt-44">
        <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
          <Link
            href="/learn"
            className="group mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            All tracks
          </Link>

          <div className="mb-6 flex flex-wrap items-center gap-3 font-mono text-xs text-muted-foreground">
            <span>{aifsLearningPathIndex.totalPhases} phases</span>
            <span>/</span>
            <span>{aifsLearningPathIndex.totalLessons} lessons</span>
            <span>/</span>
            <span>{aifsLearningPathIndex.duration}</span>
          </div>

          <h1 className="max-w-4xl font-display text-[clamp(2.8rem,7vw,5.4rem)] leading-[0.95] tracking-tight">
            {aifsLearningPathIndex.title}
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-muted-foreground">
            {aifsLearningPathIndex.description}
          </p>

          <div className="mt-10 max-w-xl">
            <div className="mb-2 flex items-center justify-between font-mono text-xs">
              <span className="text-muted-foreground">
                {pathProgress.completed} / {pathProgress.total} complete
              </span>
              <span>{progress.ready ? pathProgress.percentage : 0}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-foreground/10">
              <div
                className="h-full rounded-full bg-foreground transition-all duration-700"
                style={{ width: `${progress.ready ? pathProgress.percentage : 0}%` }}
              />
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="h-14 rounded-full bg-foreground px-8 text-base text-background hover:bg-foreground/90"
            >
              <Link href={continueHref}>
                <Play className="mr-2 h-4 w-4 fill-current" />
                {pathProgress.visited || pathProgress.completed ? "Continue learning" : "Start here"}
              </Link>
            </Button>
            {continueLesson && (pathProgress.visited > 0 || pathProgress.completed > 0) && (
              <Link
                href={continueHref}
                className="inline-flex min-h-14 items-center border border-foreground/10 px-5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Last: {continueLesson.lesson.title}
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
          <div className="mb-10 flex items-center gap-4">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Curriculum phases
            </span>
            <div className="h-px flex-1 bg-foreground/10" />
          </div>

          <div className="grid gap-px border border-foreground/10 bg-foreground/10">
            {aifsLearningPathIndex.phases.map((phase) => {
              const phaseProgress = getPhaseProgress(progress.state, phase);
              const firstLesson = phase.lessons[0];
              return (
                <Link
                  key={phase.slug}
                  href={getPhaseHref(AIFS_PATH_SLUG, phase.slug)}
                  className="group grid gap-5 bg-background p-6 transition-colors hover:bg-foreground/[0.02] md:grid-cols-[96px_1fr_160px] md:items-center"
                >
                  <span className="font-mono text-sm text-muted-foreground">Phase {phase.number}</span>
                  <span>
                    <span className="flex items-center gap-3 text-xl font-medium">
                      {phaseProgress.percentage === 100 ? (
                        <Check className="h-4 w-4 text-foreground" aria-hidden="true" />
                      ) : (
                        <Circle className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                      )}
                      {phase.title}
                    </span>
                    <span className="mt-2 block text-sm leading-6 text-muted-foreground">
                      {phase.description}
                    </span>
                    {firstLesson && (
                      <span className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-foreground">
                        Open phase <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    )}
                  </span>
                  <span className="space-y-2">
                    <span className="flex items-center justify-between font-mono text-xs text-muted-foreground">
                      <span>{phaseProgress.completed} / {phaseProgress.total}</span>
                      <span>{progress.ready ? phaseProgress.percentage : 0}%</span>
                    </span>
                    <span className="block h-1.5 overflow-hidden rounded-full bg-foreground/10">
                      <span
                        className="block h-full rounded-full bg-foreground transition-all duration-700"
                        style={{ width: `${progress.ready ? phaseProgress.percentage : 0}%` }}
                      />
                    </span>
                    <span className="block font-mono text-xs text-muted-foreground">
                      {phase.lessonCount} lessons
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
