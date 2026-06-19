"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

const categories = [
  "All",
  "Engineering",
  "Architecture",
  "Product",
  "Security",
  "Operations",
  "Research",
];

type SkillsHeroProps = {
  onCategoryChange?: (category: string) => void;
};

export function SkillsHero({ onCategoryChange }: SkillsHeroProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleCategory = (cat: string) => {
    setActiveCategory(cat);
    onCategoryChange?.(cat);
  };

  return (
    <section className="border-b border-foreground/8 bg-background">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
        {/* Eyebrow */}
        <p className="font-mono text-xs uppercase tracking-widest text-foreground/40 mb-6">
          Skills Marketplace
        </p>

        {/* Headline */}
        <h1 className="font-display text-5xl lg:text-7xl text-foreground mb-6 leading-[1.05] max-w-3xl">
          Your career in AI,<br />
          <span
            style={{
              backgroundImage: "linear-gradient(135deg, #06b6d4 0%, #22d3ee 50%, #f97316 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            mapped and mastered.
          </span>
        </h1>

        <p className="text-lg text-foreground/55 max-w-xl mb-10 leading-relaxed">
          Discover skills, follow career paths, earn certifications, and build the portfolio that gets you hired.
        </p>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex items-center max-w-xl mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search skills, roles, certifications..."
              className="w-full pl-11 pr-4 py-3.5 border border-foreground/15 bg-background text-sm text-foreground placeholder:text-foreground/35 focus:outline-none focus:border-[#06b6d4] transition-colors duration-200 rounded-l-sm"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3.5 bg-foreground text-background text-sm font-medium hover:bg-foreground/85 transition-colors duration-200 rounded-r-sm"
          >
            Search
          </button>
        </form>

        {/* Category pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => handleCategory(cat)}
              className={`flex-none font-mono text-xs uppercase tracking-wider px-4 py-2 rounded-full border transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-foreground text-background border-foreground"
                  : "bg-transparent text-foreground/50 border-foreground/15 hover:border-foreground/30 hover:text-foreground/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
