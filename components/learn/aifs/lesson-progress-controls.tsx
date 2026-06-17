"use client";

import Link from "next/link";
import { Check, RotateCcw } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLearnProgress } from "@/hooks/use-learn-progress";
import { getAifsPhase, getPhaseProgress } from "@/lib/learning-index";

export function LessonProgressControls({ lessonId, phaseSlug }: { lessonId: string; phaseSlug: string }) {
  const progress = useLearnProgress();
  const { recordVisit } = progress;
  const complete = progress.isLessonComplete(lessonId);
  const phase = getAifsPhase(phaseSlug);
  const phaseProgress = phase ? getPhaseProgress(progress.state, phase) : undefined;

  useEffect(() => {
    recordVisit(lessonId);
  }, [lessonId, recordVisit]);

  return (
    <section className="border border-foreground/10 p-6">
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Progress</p>
      {phaseProgress && (
        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between font-mono text-xs">
            <span className="text-muted-foreground">
              {phaseProgress.completed} / {phaseProgress.total} phase lessons
            </span>
            <span>{progress.ready ? phaseProgress.percentage : 0}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-foreground/10">
            <div
              className="h-full rounded-full bg-foreground transition-all duration-700"
              style={{ width: `${progress.ready ? phaseProgress.percentage : 0}%` }}
            />
          </div>
        </div>
      )}

      <Button
        type="button"
        onClick={() => progress.toggleLessonComplete(lessonId)}
        className={`mt-6 h-12 w-full rounded-full ${
          complete ? "border border-foreground/10 bg-background text-foreground hover:bg-foreground/[0.03]" : "bg-foreground text-background hover:bg-foreground/90"
        }`}
        aria-pressed={complete}
      >
        {complete ? <RotateCcw className="h-4 w-4" /> : <Check className="h-4 w-4" />}
        {complete ? "Mark incomplete" : "Mark lesson complete"}
      </Button>

      <Link
        href={progress.getContinueTarget()}
        className="mt-3 inline-flex min-h-10 w-full items-center justify-center text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        Continue target
      </Link>
    </section>
  );
}
