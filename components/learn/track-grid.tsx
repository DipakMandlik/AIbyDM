"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { tracks, type Track } from "@/lib/content";

const levelStyles: Record<Track["level"], string> = {
  Beginner: "text-green-700 border-green-700/30",
  Intermediate: "text-amber-700 border-amber-700/30",
  Advanced: "text-red-700 border-red-700/30",
};

function TrackCard({ track, index }: { track: Track; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const lessonCount = track.modules.reduce((acc, m) => acc + m.lessons.length, 0);

  return (
    <Link
      ref={ref}
      href={`/learn/${track.slug}`}
      className={`group relative bg-background p-8 lg:p-10 flex flex-col transition-all duration-700 hover:bg-foreground/[0.02] ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="flex items-start justify-between mb-6">
        <span className="font-mono text-sm text-muted-foreground">{track.number}</span>
        <span className="font-mono text-xs px-2 py-1 bg-foreground text-background">
          {track.tagline}
        </span>
      </div>

      <h3 className="text-3xl font-display mb-3 group-hover:translate-x-1 transition-transform duration-300">
        {track.title}
      </h3>
      <p className="text-muted-foreground leading-relaxed mb-8 flex-1">
        {track.description}
      </p>

      <div className="flex items-center gap-3 mb-6">
        <span className={`font-mono text-xs px-2.5 py-1 border ${levelStyles[track.level]}`}>
          {track.level}
        </span>
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
            <div
              className="h-full bg-foreground rounded-full"
              style={{ width: `${track.progress}%` }}
            />
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
  return (
    <section className="relative py-20 lg:py-28">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            All tracks
          </span>
          <div className="flex-1 h-px bg-foreground/10" />
          <span className="font-mono text-xs text-muted-foreground">
            {tracks.length} paths
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/10 border border-foreground/10">
          {tracks.map((track, index) => (
            <TrackCard key={track.slug} track={track} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
