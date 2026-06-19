import Link from "next/link";
import { TiltedCard } from "@/components/skills/tilted-card";
import { type CareerPath, getSkillHref } from "@/lib/skills-data";

type CareerPathCardProps = {
  path: CareerPath;
  index?: number;
};

export function CareerPathCard({ path, index = 0 }: CareerPathCardProps) {
  return (
    <TiltedCard className="group h-full">
      <Link
        href={getSkillHref(path.slug)}
        className="flex flex-col h-full border border-foreground/10 bg-background p-6 transition-all duration-300 hover:border-foreground/25 hover:shadow-md"
        style={{ transitionDelay: `${index * 30}ms` }}
      >
        {/* Role badge */}
        <div className="mb-5">
          <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/40">
            {path.role}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display text-2xl text-foreground mb-1 leading-tight">
          {path.title}
        </h3>

        {/* Salary */}
        <p className="font-mono text-sm text-[#06b6d4] mb-1.5 font-medium">
          {path.salaryRange}
        </p>

        {/* Tagline */}
        <p className="text-sm text-foreground/55 leading-relaxed mb-5 flex-1">
          {path.tagline}
        </p>

        {/* Duration */}
        <div className="font-mono text-xs text-foreground/40 mb-4">
          {path.durationMonths} month{path.durationMonths !== 1 ? 's' : ''} path
        </div>

        {/* Divider */}
        <div className="border-t border-foreground/8 mb-4" />

        {/* Top skills */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {path.skills.slice(0, 3).map((s) => (
            <span
              key={s}
              className="inline-flex items-center gap-1 text-[11px] text-foreground/50 bg-foreground/[0.04] px-2 py-0.5 rounded-full"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-foreground/20 inline-block" />
              {s.replace(/-/g, ' ')}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-2 text-xs font-mono text-foreground/40 group-hover:text-[#06b6d4] transition-colors duration-300">
          <span>Explore path</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </div>
      </Link>
    </TiltedCard>
  );
}
