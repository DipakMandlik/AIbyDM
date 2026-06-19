"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CareerPathCard } from "@/components/skills/career-path-card";
import { type CareerPath } from "@/lib/skills-data";

type CareerPathsSectionProps = {
  paths: CareerPath[];
};

export function CareerPathsSection({ paths }: CareerPathsSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 border-b border-foreground/8">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-foreground/40 mb-2">
              Career Paths
            </p>
            <h2 className="font-display text-3xl lg:text-4xl text-foreground">
              Structured paths to your role
            </h2>
          </div>
          <Link
            href="/skills/certifications"
            className="hidden sm:flex items-center gap-1.5 font-mono text-xs text-foreground/40 hover:text-foreground/70 transition-colors duration-200"
          >
            View certifications
            <span>→</span>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {paths.map((path, i) => (
            <div
              key={path.slug}
              className={`transition-all duration-500 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <CareerPathCard path={path} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
