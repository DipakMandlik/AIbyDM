"use client";

import { useState, useMemo } from "react";
import { SkillsHero, type SortOrder } from "@/components/skills/skills-hero";
import { SkillListItem } from "@/components/skills/skill-list-item";
import { skills } from "@/lib/skills-data";

export function SkillsIndex() {
  const [query, setQuery] = useState("");
  const [domain, setDomain] = useState("All");
  const [sort, setSort] = useState<SortOrder>("stars");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    let list = skills.filter((s) => {
      const matchesDomain = domain === "All" || s.category === domain;
      const matchesQuery =
        !q ||
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.tagline.toLowerCase().includes(q);
      return matchesDomain && matchesQuery;
    });

    if (sort === "stars") {
      list = [...list].sort((a, b) => b.stars - a.stars);
    } else if (sort === "recent") {
      list = [...list].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
    } else {
      // trending: trending skills first, then by stars
      list = [...list].sort((a, b) => {
        if (a.trending && !b.trending) return -1;
        if (!a.trending && b.trending) return 1;
        return b.stars - a.stars;
      });
    }

    return list;
  }, [query, domain, sort]);

  return (
    <>
      <SkillsHero
        query={query}
        onQueryChange={setQuery}
        domain={domain}
        onDomainChange={setDomain}
        sort={sort}
        onSortChange={setSort}
        resultCount={filtered.length}
      />

      <main className="max-w-5xl mx-auto px-6 lg:px-8 py-6">
        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-mono text-sm text-foreground/35">No skills match your search.</p>
            <button
              type="button"
              onClick={() => { setQuery(""); setDomain("All"); }}
              className="mt-4 font-mono text-xs text-[#06b6d4] hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div>
            {filtered.map((skill) => (
              <SkillListItem key={skill.slug} skill={skill} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
