"use client";

import { Search } from "lucide-react";

export type SortOrder = "stars" | "recent" | "trending";

const domains = [
  "All",
  "Engineering",
  "Architecture",
  "Product",
  "Security",
  "Operations",
  "Research",
];

type SkillsHeroProps = {
  query: string;
  onQueryChange: (q: string) => void;
  domain: string;
  onDomainChange: (d: string) => void;
  sort: SortOrder;
  onSortChange: (s: SortOrder) => void;
  resultCount: number;
};

export function SkillsHero({
  query,
  onQueryChange,
  domain,
  onDomainChange,
  sort,
  onSortChange,
  resultCount,
}: SkillsHeroProps) {
  return (
    <section className="border-b border-foreground/10 bg-background pt-10 pb-6">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <h1 className="font-display text-3xl lg:text-4xl text-foreground mb-6">
          Browse AI Skills
        </h1>

        {/* Controls row */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-[180px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Search skills..."
              className="w-full pl-9 pr-4 py-2.5 border border-foreground/15 bg-background text-sm text-foreground placeholder:text-foreground/35 focus:outline-none focus:border-[#06b6d4] transition-colors duration-200"
            />
          </div>

          {/* Domain filter */}
          <div className="relative">
            <select
              value={domain}
              onChange={(e) => onDomainChange(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2.5 border border-foreground/15 bg-background text-sm text-foreground focus:outline-none focus:border-[#06b6d4] transition-colors duration-200 cursor-pointer"
            >
              {domains.map((d) => (
                <option key={d} value={d}>
                  {d === "All" ? "Filter by Domain" : d}
                </option>
              ))}
            </select>
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-foreground/40 pointer-events-none text-xs">
              ▾
            </span>
          </div>

          {/* Sort buttons */}
          <div className="flex items-center border border-foreground/15 overflow-hidden">
            {(["stars", "recent", "trending"] as SortOrder[]).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => onSortChange(s)}
                className={`px-3.5 py-2.5 text-xs font-mono uppercase tracking-wider transition-colors duration-150 ${
                  sort === s
                    ? "bg-foreground text-background"
                    : "bg-background text-foreground/50 hover:text-foreground hover:bg-foreground/[0.04]"
                } ${s !== "stars" ? "border-l border-foreground/15" : ""}`}
              >
                {s === "stars" ? "★ Stars" : s === "recent" ? "Recent" : "Trending"}
              </button>
            ))}
          </div>
        </div>

        {/* Result count */}
        <p className="font-mono text-xs text-foreground/35 mt-4">
          {resultCount} skill{resultCount !== 1 ? "s" : ""}
        </p>
      </div>
    </section>
  );
}
