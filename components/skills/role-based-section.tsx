import Link from "next/link";
import { type CareerPath, getSkillHref } from "@/lib/skills-data";

type RoleBasedSectionProps = {
  paths: CareerPath[];
};

const roleIcons: Record<string, string> = {
  Engineering: "◈",
  Architecture: "⬡",
  Product: "◎",
  Operations: "◷",
  Security: "◻",
  Research: "◆",
};

export function RoleBasedSection({ paths }: RoleBasedSectionProps) {
  return (
    <section className="py-20 border-b border-foreground/8">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <p className="font-mono text-xs uppercase tracking-widest text-foreground/40 mb-2">
            Role-Based Learning
          </p>
          <h2 className="font-display text-3xl lg:text-4xl text-foreground">
            Become who you want to be
          </h2>
        </div>

        {/* Role rows */}
        <div className="divide-y divide-foreground/8">
          {paths.map((path) => (
            <Link
              key={path.slug}
              href={getSkillHref(path.slug)}
              className="group flex items-start lg:items-center justify-between gap-6 py-6 hover:bg-foreground/[0.02] transition-colors duration-200 -mx-4 px-4"
            >
              {/* Left: icon + title + tagline */}
              <div className="flex items-start lg:items-center gap-4 min-w-0">
                <span className="text-foreground/20 text-xl flex-none mt-0.5 lg:mt-0" aria-hidden="true">
                  {roleIcons[path.role] ?? "◈"}
                </span>
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-display text-lg text-foreground group-hover:text-foreground/80 transition-colors duration-200">
                      Become a{path.title.match(/^[AEIOU]/i) ? 'n' : ''} {path.title}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-foreground/35 hidden sm:inline">
                      {path.role}
                    </span>
                  </div>
                  <p className="text-sm text-foreground/45 mt-0.5 line-clamp-1">
                    {path.tagline}
                  </p>
                </div>
              </div>

              {/* Right: stats + arrow */}
              <div className="flex items-center gap-6 flex-none">
                <div className="hidden md:flex items-center gap-4 font-mono text-xs text-foreground/35">
                  <span>{path.durationMonths}mo</span>
                  <span>{path.skills.length} skills</span>
                  <span className="text-[#06b6d4]">{path.salaryRange}</span>
                </div>
                <span className="text-foreground/25 group-hover:text-[#06b6d4] group-hover:translate-x-1 transition-all duration-200">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
