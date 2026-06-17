"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLearnProgress } from "@/hooks/use-learn-progress";
import { getLearningPathProgress } from "@/lib/learning-index";
import { tracks } from "@/lib/content";

export function ContinueLearning() {
  const aifs = useLearnProgress();
  const aifsProgress = getLearningPathProgress(aifs.state);
  const activeTracks = tracks
    .filter((track) => track.slug !== "ai-foundations" && track.progress > 0)
    .sort((a, b) => b.progress - a.progress);
  const hasAifsProgress = aifsProgress.completed > 0 || aifsProgress.visited > 0 || Boolean(aifs.state.lastVisitedLessonId);

  if (!hasAifsProgress && activeTracks.length === 0) return null;

  const aifsHref = aifs.getContinueTarget();

  return (
    <section className="relative py-12 lg:py-16 border-y border-foreground/10 bg-foreground/[0.02]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex items-center gap-4 mb-8">
          <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">Continue learning</span>
          <div className="flex-1 h-px bg-foreground/10" />
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-foreground/10 border border-foreground/10">
          {hasAifsProgress && (
            <Link href={aifsHref} className="group bg-background p-6 lg:p-8 flex items-center gap-6 hover:bg-foreground/[0.02] transition-colors">
              <div className="shrink-0 w-14 h-14 border border-foreground/10 flex items-center justify-center font-display text-xl">01</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <h3 className="text-lg font-medium truncate group-hover:translate-x-1 transition-transform">AI From Scratch</h3>
                  <span className="font-mono text-sm text-muted-foreground shrink-0">{aifsProgress.percentage}%</span>
                </div>
                <div className="h-1.5 bg-foreground/10 overflow-hidden rounded-full">
                  <div className="h-full bg-foreground rounded-full transition-all duration-700" style={{ width: `${aifsProgress.percentage}%` }} />
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground shrink-0 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </Link>
          )}

          {activeTracks.map((track) => (
            <Link key={track.slug} href={`/learn/${track.slug}`} className="group bg-background p-6 lg:p-8 flex items-center gap-6 hover:bg-foreground/[0.02] transition-colors">
              <div className="shrink-0 w-14 h-14 border border-foreground/10 flex items-center justify-center font-display text-xl">{track.number}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <h3 className="text-lg font-medium truncate group-hover:translate-x-1 transition-transform">{track.title}</h3>
                  <span className="font-mono text-sm text-muted-foreground shrink-0">{track.progress}%</span>
                </div>
                <div className="h-1.5 bg-foreground/10 overflow-hidden rounded-full">
                  <div className="h-full bg-foreground rounded-full transition-all duration-700" style={{ width: `${track.progress}%` }} />
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground shrink-0 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}


