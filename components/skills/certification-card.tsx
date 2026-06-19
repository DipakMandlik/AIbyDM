import { TiltedCard } from "@/components/skills/tilted-card";
import { type Certification, difficultyColors, getCertificationHref } from "@/lib/skills-data";
import Link from "next/link";

type CertificationCardProps = {
  cert: Certification;
  index?: number;
};

export function CertificationCard({ cert, index = 0 }: CertificationCardProps) {
  return (
    <TiltedCard className="group h-full">
      <div id={cert.slug}
        className="flex flex-col h-full border border-foreground/10 bg-background p-6 transition-all duration-300 hover:border-foreground/25 hover:shadow-md"
        style={{ transitionDelay: `${index * 30}ms` }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <span
            className="font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full text-white"
            style={{ backgroundColor: difficultyColors[cert.difficulty] }}
          >
            {cert.difficulty}
          </span>
          <span className="font-mono text-xs text-[#f97316] font-medium">
            {cert.xp.toLocaleString()} XP
          </span>
        </div>

        {/* Title + description */}
        <h3 className="font-display text-xl text-foreground mb-2 leading-tight">
          {cert.title}
        </h3>
        <p className="text-sm text-foreground/55 leading-relaxed mb-5 flex-1">
          {cert.description}
        </p>

        {/* Divider */}
        <div className="border-t border-foreground/8 mb-4" />

        {/* Stats */}
        <div className="space-y-2 mb-5">
          <div className="flex items-center gap-2 text-xs text-foreground/50">
            <span className="text-foreground/30">◈</span>
            <span>{cert.questions} questions</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-foreground/50">
            <span className="text-[#16a34a]">✓</span>
            <span>{cert.passingScore}% passing score</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-foreground/50">
            <span className="text-foreground/30">◷</span>
            <span>{cert.duration}</span>
          </div>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-2 text-xs font-mono text-foreground/40 group-hover:text-[#06b6d4] transition-colors duration-300">
          <span>View certification</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </div>
      </div>
    </TiltedCard>
  );
}
