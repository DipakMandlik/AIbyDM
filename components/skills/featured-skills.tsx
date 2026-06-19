"use client";

import { useEffect, useRef, useState } from "react";
import { SkillCard } from "@/components/skills/skill-card";
import { type Skill } from "@/lib/skills-data";

type FeaturedSkillsProps = {
  skills: Skill[];
  category?: string;
};

export function FeaturedSkills({ skills, category = "All" }: FeaturedSkillsProps) {
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

  const filtered = category === "All" ? skills : skills.filter((s) => s.category === category);

  return (
    <section ref={ref} className="py-20 border-b border-foreground/8">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-foreground/40 mb-2">
              Featured
            </p>
            <h2 className="font-display text-3xl lg:text-4xl text-foreground">
              High-demand skills
            </h2>
          </div>
          <span className="font-mono text-xs text-foreground/35 hidden sm:block">
            {filtered.length} skill{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((skill, i) => (
            <div
              key={skill.slug}
              className={`transition-all duration-500 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <SkillCard skill={skill} index={i} />
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-foreground/40 font-mono text-sm">
            No skills in this category yet.
          </div>
        )}
      </div>
    </section>
  );
}
