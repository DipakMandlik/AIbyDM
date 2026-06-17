"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLearnProgress } from "@/hooks/use-learn-progress";
import { aifsLearningPathIndex, getLearningPathProgress } from "@/lib/learning-index";
import { tracks, type Track } from "@/lib/content";

const levelStyles: Record<Track["level"], string> = {
  Beginner: "text-green-700 border-green-700/30",
  Intermediate: "text-amber-700 border-amber-700/30",
  Advanced: "text-red-700 border-red-700/30",
};

function useReveal(delay: number) {
  const [isVisible, setIsVisible] = useState(false);
  const [element, setElement] = useState<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (!element) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.15 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [element]);

  return { setElement, isVisible, transitionStyle: { transitionDelay: `${delay}ms` } };
}

function AiFromScratchCard({ index }: { index: number }) {
  const progress = useLearnProgress();
  const pathProgress = getLearningPathProgress(progress.state);
  const { setElement, isVisible, transitionStyle } = useReveal(index * 80);
  const lessonCount = aifsLearningPathIndex.phases.reduce((total, phase) => total + phase.lessons.length, 0);

  return (
    <Link
      ref={setElement}
      href="/learn/ai-from-scratch"
      className={`group relative bg-background p-8 lg:p-10 flex flex-col transition-all duration-700 hover:bg-foreground/[0.02] ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={transitionStyle}
    >
      <div className="flex items-start justify-between mb-6">
        <span className="font-mono text-sm text-muted-foreground">01</span>
        <span className="font-mono text-xs px-2 py-1 bg-foreground text-background">Flagship path</span>
      </div>

      <h3 className="text-3xl font-display mb-3 group-hover:translate-x-1 transition-transform duration-300">
        AI From Scratch
      </h3>
      <p className="text-muted-foreground leading-relaxed mb-8 flex-1">
        A complete phase-based AI engineering journey from setup and math foundations to LLMs, agents, production, safety, and capstone projects.
      </p>

      <div className="flex items-center gap-3 mb-6">
        <span className={`font-mono text-xs px-2.5 py-1 border ${levelStyles.Beginner}`}>Beginner</span>
        <span className="font-mono text-xs text-muted-foreground">{aifsLearningPathIndex.phases.length} phases</span>
        <span className="font-mono text-xs text-muted-foreground">{lessonCount} lessons</span>
      </div>

      {pathProgress.completed > 0 || pathProgress.visited > 0 || progress.state.lastVisitedLessonId ? (
        <div className="mb-2">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs text-muted-foreground">In progress</span>
            <span className="font-mono text-xs">{pathProgress.percentage}%</span>
          </div>
          <div className="h-1.5 bg-foreground/10 overflow-hidden rounded-full">
            <div className="h-full bg-foreground rounded-full" style={{ width: `${pathProgress.percentage}%` }} />
          </div>
        </div>
      ) : (
        <span className="inline-flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all">
          Start journey
          <ArrowUpRight className="w-4 h-4" />
        </span>
      )}
    </Link>
  );
}

function TrackCard({ track, index }: { track: Track; index: number }) {
  const { setElement, isVisible, transitionStyle } = useReveal(index * 80);
  const lessonCount = track.modules.reduce((acc, m) => acc + m.lessons.length, 0);

  return (
    <Link
      ref={setElement}
      href={`/learn/${track.slug}`}
      className={`group relative bg-background p-8 lg:p-10 flex flex-col transition-all duration-700 hover:bg-foreground/[0.02] ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={transitionStyle}
    >
      <div className="flex items-start justify-between mb-6">
        <span className="font-mono text-sm text-muted-foreground">{track.number}</span>
        <span className="font-mono text-xs px-2 py-1 bg-foreground text-background">{track.tagline}</span>
      </div>

      <h3 className="text-3xl font-display mb-3 group-hover:translate-x-1 transition-transform duration-300">{track.title}</h3>
      <p className="text-muted-foreground leading-relaxed mb-8 flex-1">{track.description}</p>

      <div className="flex items-center gap-3 mb-6">
        <span className={`font-mono text-xs px-2.5 py-1 border ${levelStyles[track.level]}`}>{track.level}</span>
        <span className="font-mono text-xs text-muted-foreground">{track.duration}</span>
        <span className="font-mono text-xs text-muted-foreground">{lessonCount} lessons</span>
      </div>

      {track.progress > 0 ? (
        <div className="mb-2">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs text-muted-foreground">In progress</span>
            <span className="font-mono text-xs">{track.progress}%</span>
          </div>
          <div className="h-1.5 bg-foreground/10 overflow-hidden rounded-full">
            <div className="h-full bg-foreground rounded-full" style={{ width: `${track.progress}%` }} />
          </div>
        </div>
      ) : (
        <span className="inline-flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all">
          Start track
          <ArrowUpRight className="w-4 h-4" />
        </span>
      )}
    </Link>
  );
}

export function TrackGrid() {
  const secondaryTracks = tracks.filter((track) => track.slug !== "ai-foundations");

  return (
    <section className="relative py-20 lg:py-28">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">All tracks</span>
          <div className="flex-1 h-px bg-foreground/10" />
          <span className="font-mono text-xs text-muted-foreground">{secondaryTracks.length + 1} paths</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/10 border border-foreground/10">
          <AiFromScratchCard index={0} />
          {secondaryTracks.map((track, index) => (
            <TrackCard key={track.slug} track={track} index={index + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}


