"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import { getToolHref, toolCategories, type Tool } from "@/lib/content";

export function ToolDirectory({ tools }: { tools: Tool[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return tools.filter((tool) => {
      const matchesCategory = category === "all" || tool.category === category;
      const haystack = [tool.name, tool.category, tool.pricing, tool.description, ...tool.useCases]
        .join(" ")
        .toLowerCase();
      return matchesCategory && (!normalized || haystack.includes(normalized));
    });
  }, [category, query, tools]);

  return (
    <section className="relative py-16 lg:py-24">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="mb-8 grid gap-4 lg:grid-cols-[1fr_320px]">
          <label className="flex min-h-14 items-center gap-3 border border-foreground/10 px-4">
            <Search className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
            <span className="sr-only">Search tools</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search tools, categories, use cases..."
              className="w-full bg-transparent text-base outline-none placeholder:text-muted-foreground"
            />
          </label>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="min-h-14 border border-foreground/10 bg-background px-4 text-base outline-none"
            aria-label="Filter tools by category"
          >
            <option value="all">All categories</option>
            {toolCategories.map((entry) => (
              <option key={entry.name} value={entry.name}>
                {entry.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-8 flex items-center gap-4">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {filtered.length} tools
          </span>
          <div className="h-px flex-1 bg-foreground/10" />
        </div>

        {filtered.length > 0 ? (
          <div className="grid gap-px border border-foreground/10 bg-foreground/10 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((tool) => (
              <Link
                key={tool.slug}
                href={getToolHref(tool.slug)}
                className="group flex min-h-[280px] flex-col bg-background p-8 transition-colors hover:bg-foreground/[0.02]"
              >
                <div className="mb-8 flex items-start justify-between gap-4">
                  <span className="font-mono text-xs text-muted-foreground">{tool.category}</span>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                </div>
                <h2 className="font-display text-3xl">{tool.name}</h2>
                <p className="mt-4 flex-1 leading-relaxed text-muted-foreground">
                  {tool.description}
                </p>
                <div className="mt-8 flex flex-wrap gap-2">
                  <span className="border border-foreground/10 px-3 py-1 font-mono text-xs">
                    {tool.pricing}
                  </span>
                  {tool.featured && (
                    <span className="bg-foreground px-3 py-1 font-mono text-xs text-background">
                      Featured
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-foreground/20 p-10 text-muted-foreground">
            No tools match that search yet.
          </div>
        )}
      </div>
    </section>
  );
}
