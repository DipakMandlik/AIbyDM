"use client";

import Link from "next/link";
import { Check, Circle } from "lucide-react";
import { useLearnProgress } from "@/hooks/use-learn-progress";
import { getAifsLessonHref, type AifsPhaseIndex } from "@/lib/learning-index";

export function LearningSidebar({ phase, currentLessonSlug }: { phase: AifsPhaseIndex; currentLessonSlug: string }) {
  const progress = useLearnProgress();

  return (
    <section className="border border-foreground/10 p-6">
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        Phase {phase.number}
      </p>
      <h2 className="mt-3 font-medium">{phase.title}</h2>
      <div className="mt-5 max-h-[52vh] space-y-1 overflow-y-auto pr-1">
        {phase.lessons.map((lesson) => {
          const active = lesson.slug === currentLessonSlug;
          const complete = progress.isLessonComplete(lesson.id);
          return (
            <Link
              key={lesson.id}
              href={getAifsLessonHref(phase.slug, lesson.slug)}
              className={`flex items-start gap-3 px-3 py-2 text-sm transition-colors ${
                active ? "bg-foreground/[0.04] text-foreground" : "text-muted-foreground hover:bg-foreground/[0.02] hover:text-foreground"
              }`}
              aria-current={active ? "page" : undefined}
            >
              <span className="mt-1 shrink-0">
                {complete ? (
                  <Check className="h-3.5 w-3.5 text-foreground" aria-hidden="true" />
                ) : (
                  <Circle className="h-3.5 w-3.5" aria-hidden="true" />
                )}
              </span>
              <span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {lesson.number}
                </span>
                <span className="mt-1 block leading-5">{lesson.title}</span>
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
