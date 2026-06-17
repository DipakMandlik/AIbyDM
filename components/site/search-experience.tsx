"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { getSearchItems, type SearchKind } from "@/lib/content";

const filters: { label: string; value: "all" | SearchKind }[] = [
  { label: "All", value: "all" },
  { label: "Learn", value: "track" },
  { label: "Lessons", value: "lesson" },
  { label: "Projects", value: "project" },
  { label: "Tools", value: "tool" },
  { label: "Games", value: "game" },
  { label: "Exams", value: "exam" },
  { label: "Newsletter", value: "newsletter" },
];

function matchesFilter(kind: SearchKind, filter: "all" | SearchKind) {
  if (filter === "all") return true;
  if (filter === "track") return kind === "track" || kind === "module";
  return kind === filter;
}

export function SearchExperience() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | SearchKind>("all");
  const items = useMemo(() => getSearchItems(), []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const params = new URLSearchParams(window.location.search);
      setQuery(params.get("q") ?? "");
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return items.filter((item) => {
      const haystack = [item.title, item.excerpt, item.meta, item.kind, ...item.keywords]
        .join(" ")
        .toLowerCase();
      return matchesFilter(item.kind, filter) && (!normalized || haystack.includes(normalized));
    });
  }, [filter, items, query]);

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
        <label className="flex min-h-16 items-center gap-4 border border-foreground/10 px-5">
          <Search className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
          <span className="sr-only">Search AIByDM</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full bg-transparent text-xl outline-none placeholder:text-muted-foreground"
            placeholder="Search tracks, lessons, projects, tools..."
            autoFocus
          />
        </label>

        <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
          {filters.map((entry) => (
            <button
              key={entry.value}
              type="button"
              onClick={() => setFilter(entry.value)}
              className={`min-h-11 shrink-0 border px-4 text-sm transition-colors ${
                filter === entry.value
                  ? "border-foreground bg-foreground text-background"
                  : "border-foreground/10 text-muted-foreground hover:text-foreground"
              }`}
            >
              {entry.label}
            </button>
          ))}
        </div>

        <div className="mt-8 flex items-center gap-4">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {results.length} results
          </span>
          <div className="h-px flex-1 bg-foreground/10" />
        </div>

        <div className="mt-8 grid gap-px border border-foreground/10 bg-foreground/10">
          {results.map((item) => (
            <Link
              key={`${item.kind}-${item.href}-${item.title}`}
              href={item.href}
              className="group grid gap-4 bg-background p-6 transition-colors hover:bg-foreground/[0.02] md:grid-cols-[140px_1fr_24px]"
            >
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {item.kind}
              </span>
              <span>
                <span className="block text-xl font-medium">{item.title}</span>
                <span className="mt-2 block text-sm text-muted-foreground">{item.excerpt}</span>
                <span className="mt-2 block font-mono text-xs text-muted-foreground">{item.meta}</span>
              </span>
              <ArrowRight className="hidden h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 md:block" />
            </Link>
          ))}
        </div>

        {results.length === 0 && (
          <div className="mt-8 border border-dashed border-foreground/20 p-10 text-muted-foreground">
            No results yet. Try a broader term like prompt, RAG, agent, exam, or tool.
          </div>
        )}
      </div>
    </section>
  );
}
