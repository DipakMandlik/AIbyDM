import Link from "next/link";
import { type Skill, difficultyColors, getSkillHref } from "@/lib/skills-data";

type TrendingSkillsProps = {
  skills: Skill[];
};

export function TrendingSkills({ skills }: TrendingSkillsProps) {
  if (skills.length === 0) return null;

  return (
    <section className="py-12 border-b border-foreground/8 bg-foreground/[0.015]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex items-center gap-6 overflow-x-auto pb-1 scrollbar-hide">
          <span className="flex-none font-mono text-[10px] uppercase tracking-widest text-foreground/35">
            Trending
          </span>
          <div className="w-px h-4 bg-foreground/15 flex-none" />
          {skills.map((skill) => (
            <Link
              key={skill.slug}
              href={getSkillHref(skill.slug)}
              className="flex-none flex items-center gap-2 group"
            >
              <span
                className="w-1.5 h-1.5 rounded-full flex-none"
                style={{ backgroundColor: difficultyColors[skill.difficulty] }}
              />
              <span className="text-sm text-foreground/60 group-hover:text-foreground transition-colors duration-200 whitespace-nowrap">
                {skill.title}
              </span>
              <span className="font-mono text-[10px] text-[#f97316]">
                ↑{(skill.xp / 100).toFixed(0)}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
