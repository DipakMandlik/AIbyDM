import Link from "next/link";
import { TiltedCard } from "@/components/skills/tilted-card";
import { type Skill, difficultyColors, getSkillHref } from "@/lib/skills-data";

type SkillCardProps = {
  skill: Skill;
  index?: number;
};

export function SkillCard({ skill, index = 0 }: SkillCardProps) {
  return (
    <TiltedCard className="group h-full">
      <Link
        href={getSkillHref(skill.slug)}
        className="flex flex-col h-full border border-foreground/10 bg-background p-6 transition-all duration-300 hover:border-foreground/25 hover:shadow-md"
        style={{
          transitionDelay: `${index * 30}ms`,
        }}
      >
        {/* Header badges */}
        <div className="flex items-center justify-between mb-5">
          <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/40">
            {skill.category}
          </span>
          <span
            className="font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full text-white"
            style={{ backgroundColor: difficultyColors[skill.difficulty] }}
          >
            {skill.difficulty}
          </span>
        </div>

        {/* Title + tagline */}
        <div className="flex-1">
          <h3 className="font-display text-xl text-foreground mb-1.5 leading-tight">
            {skill.title}
          </h3>
          <p className="text-sm text-foreground/55 leading-relaxed mb-4">
            {skill.tagline}
          </p>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-3 mb-4 font-mono text-xs text-foreground/40">
          <span>{skill.duration}</span>
          <span className="w-1 h-1 rounded-full bg-foreground/20" />
          <span className="text-[#f97316] font-medium">{skill.xp.toLocaleString()} XP</span>
        </div>

        {/* Divider */}
        <div className="border-t border-foreground/8 mb-4" />

        {/* Stat pills */}
        <div className="flex flex-wrap gap-2 mb-5">
          <span className="inline-flex items-center gap-1.5 text-xs text-foreground/50 bg-foreground/[0.04] px-2.5 py-1 rounded-full">
            <span className="text-[#06b6d4]">◈</span>
            {skill.learningPaths} Path{skill.learningPaths !== 1 ? 's' : ''}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-foreground/50 bg-foreground/[0.04] px-2.5 py-1 rounded-full">
            <span className="text-foreground/30">⬡</span>
            {skill.projects} Projects
          </span>
          {skill.certifications > 0 && (
            <span className="inline-flex items-center gap-1.5 text-xs text-foreground/50 bg-foreground/[0.04] px-2.5 py-1 rounded-full">
              <span className="text-[#f97316]">✦</span>
              {skill.certifications} Cert{skill.certifications !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        {/* CTA — visible on hover */}
        <div className="flex items-center gap-2 text-xs font-mono text-foreground/40 group-hover:text-[#06b6d4] transition-colors duration-300">
          <span>Explore skill</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </div>
      </Link>
    </TiltedCard>
  );
}
