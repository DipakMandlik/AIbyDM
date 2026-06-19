import Link from "next/link";
import { type Skill, difficultyColors, getSkillHref } from "@/lib/skills-data";

function formatStars(n: number): string {
  return (n / 1000).toFixed(1) + "k";
}

function formatDate(iso: string): string {
  return iso.slice(0, 7);
}

type SkillListItemProps = {
  skill: Skill;
};

export function SkillListItem({ skill }: SkillListItemProps) {
  return (
    <Link
      href={getSkillHref(skill.slug)}
      className="group block border-b border-foreground/8 px-4 py-5 hover:bg-foreground/[0.02] transition-colors duration-150 -mx-4 sm:mx-0 sm:px-0"
    >
      <div className="flex items-start justify-between gap-4">
        {/* Left: title + meta + description */}
        <div className="min-w-0 flex-1">
          {/* Row 1: title */}
          <h3 className="text-base font-semibold text-foreground group-hover:text-foreground/80 transition-colors duration-150 truncate">
            {skill.title}
          </h3>

          {/* Row 2: creator · category · difficulty */}
          <div className="flex items-center flex-wrap gap-x-2 gap-y-1 mt-1">
            <span className="font-mono text-xs text-foreground/40">
              aibydm/{skill.slug}
            </span>
            <span className="text-foreground/20 text-xs">·</span>
            <span className="font-mono text-xs text-foreground/40">
              {skill.category}
            </span>
            <span className="text-foreground/20 text-xs">·</span>
            <span
              className="font-mono text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded text-white"
              style={{ backgroundColor: difficultyColors[skill.difficulty] }}
            >
              {skill.difficulty}
            </span>
          </div>

          {/* Row 3: description */}
          <p className="text-sm text-foreground/55 mt-2 leading-relaxed line-clamp-2">
            {skill.description}
          </p>
        </div>

        {/* Right: stars + date */}
        <div className="flex-none text-right space-y-1">
          <div className="flex items-center justify-end gap-1 font-mono text-sm font-medium text-[#f97316]">
            <span className="text-xs">★</span>
            <span>{formatStars(skill.stars)}</span>
          </div>
          <div className="font-mono text-xs text-foreground/35">
            {formatDate(skill.updatedAt)}
          </div>
        </div>
      </div>
    </Link>
  );
}
