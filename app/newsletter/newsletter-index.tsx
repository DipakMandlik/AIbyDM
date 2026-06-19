"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ExternalLink, Filter } from "lucide-react";
import type { Issue, NewsletterCategory } from "@/lib/content";

const DECK_SIZE = 5;

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reducedMotion;
}

function NewsletterIssueDeck({ issues }: { issues: Issue[] }) {
  const deckIssues = useMemo(() => issues.slice(0, DECK_SIZE), [issues]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || isPaused || deckIssues.length < 2) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % deckIssues.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, [deckIssues.length, isPaused, reducedMotion]);

  if (!deckIssues.length) {
    return null;
  }

  const activeIssue = deckIssues[activeIndex] ?? deckIssues[0];

  return (
    <div className="mb-10 grid gap-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(360px,1.08fr)] lg:items-center">
      <div className="max-w-xl">
        <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Latest signals / Issue {activeIssue.number} / {activeIssue.category}
        </span>
        <h2 className="mt-5 font-display text-4xl leading-none tracking-tight md:text-5xl">
          AIByDM weekly intelligence, now in motion.
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          Browse the newest source-backed AI updates as a living stack. Hover the cards to pause, then open the front issue when something catches your eye.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-2">
          {deckIssues.map((issue, index) => (
            <button
              key={issue.slug}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show issue ${issue.number}: ${issue.title}`}
              className={
                "h-2.5 rounded-full transition-all duration-300 " +
                (index === activeIndex
                  ? "w-8 bg-foreground"
                  : "w-2.5 bg-foreground/20 hover:bg-foreground/45")
              }
            />
          ))}
        </div>
      </div>

      <div
        className="relative min-h-[430px] overflow-hidden rounded-lg border border-foreground/10 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.16),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.9),rgba(248,250,252,0.72))] p-4 shadow-[0_24px_70px_rgba(15,23,42,0.08)] [perspective:1200px] md:min-h-[390px] md:p-6"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocusCapture={() => setIsPaused(true)}
        onBlurCapture={() => setIsPaused(false)}
      >
        <div className="absolute inset-x-6 top-5 flex items-center justify-between text-xs text-muted-foreground">
          <span className="font-mono uppercase tracking-widest">Live newsletter deck</span>
          <span>{activeIndex + 1} / {deckIssues.length}</span>
        </div>

        <div className="absolute inset-x-4 bottom-4 top-14 [transform-style:preserve-3d] md:inset-x-8 md:bottom-8">
          {deckIssues.map((issue, index) => {
            const relativeIndex = (index - activeIndex + deckIssues.length) % deckIssues.length;
            const isActive = relativeIndex === 0;
            const depth = Math.min(relativeIndex, 4);
            const transforms = [
              "translate3d(0px, 0px, 0px) scale(1) rotate(0deg)",
              "translate3d(28px, -18px, -44px) scale(0.965) rotate(1deg)",
              "translate3d(56px, -36px, -88px) scale(0.93) rotate(2deg)",
              "translate3d(84px, -54px, -132px) scale(0.895) rotate(3deg)",
              "translate3d(112px, -72px, -176px) scale(0.86) rotate(4deg)",
            ];

            return (
              <Link
                key={issue.slug}
                href={`/newsletter/${issue.slug}`}
                aria-hidden={!isActive}
                tabIndex={isActive ? 0 : -1}
                className={
                  "group absolute inset-0 flex flex-col overflow-hidden rounded-lg border bg-background p-5 shadow-[0_18px_50px_rgba(15,23,42,0.14)] outline-none transition-[transform,opacity,box-shadow,border-color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [backface-visibility:hidden] [transform-style:preserve-3d] focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 md:p-6 " +
                  (isActive
                    ? "pointer-events-auto border-cyan-400/60 hover:shadow-[0_26px_70px_rgba(14,165,233,0.2)]"
                    : "pointer-events-none border-foreground/10")
                }
                style={{
                  transform: transforms[depth],
                  opacity: 1 - depth * 0.14,
                  zIndex: deckIssues.length - relativeIndex,
                }}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <span className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 font-mono text-xs uppercase tracking-widest text-cyan-700">
                    Issue {issue.number} / {issue.category}
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                </div>

                <div className="mt-8 flex-1">
                  <h3 className="line-clamp-3 text-2xl font-semibold leading-tight tracking-tight md:text-3xl">
                    {issue.title}
                  </h3>
                  <p className="mt-4 line-clamp-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {issue.excerpt}
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap items-end justify-between gap-4 border-t border-foreground/10 pt-5 text-sm text-muted-foreground">
                  <div>
                    <span className="block font-mono text-xs uppercase tracking-widest text-foreground/60">Source</span>
                    <span className="mt-1 block max-w-[16rem] truncate text-foreground">{issue.sourceDomain}</span>
                  </div>
                  <div className="text-right">
                    <span className="block">{issue.date}</span>
                    <span className="mt-1 inline-flex items-center gap-1 text-foreground">
                      Open issue <ExternalLink className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function NewsletterIndex({
  issues,
  categories,
}: {
  issues: Issue[];
  categories: NewsletterCategory[];
}) {
  const [activeCategory, setActiveCategory] = useState<NewsletterCategory | "All">("All");
  const filteredIssues = useMemo(
    () => activeCategory === "All" ? issues : issues.filter((issue) => issue.category === activeCategory),
    [activeCategory, issues],
  );

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <NewsletterIssueDeck key={activeCategory} issues={filteredIssues} />

        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="mr-2 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            <Filter className="h-4 w-4" aria-hidden="true" />
            Categories
          </span>
          <button
            type="button"
            onClick={() => setActiveCategory("All")}
            className={"min-h-10 rounded-full border px-4 text-sm transition-colors " + (activeCategory === "All" ? "border-foreground bg-foreground text-background" : "border-foreground/10 text-muted-foreground hover:text-foreground")}
          >
            All {issues.length}
          </button>
          {categories.map((category) => {
            const count = issues.filter((issue) => issue.category === category).length;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={"min-h-10 rounded-full border px-4 text-sm transition-colors " + (activeCategory === category ? "border-foreground bg-foreground text-background" : "border-foreground/10 text-muted-foreground hover:text-foreground")}
              >
                {category} {count}
              </button>
            );
          })}
        </div>

        <div className="grid gap-px border border-foreground/10 bg-foreground/10">
          {filteredIssues.map((issue) => (
            <Link key={issue.slug} href={`/newsletter/${issue.slug}`} className="group grid gap-5 bg-background p-5 transition-[transform,box-shadow,background-color] duration-300 hover:-translate-y-0.5 hover:bg-foreground/[0.02] hover:shadow-[0_14px_40px_rgba(15,23,42,0.08)] md:grid-cols-[128px_1fr_180px] md:items-start lg:p-6">
              <div className="font-mono text-xs text-muted-foreground">
                <span className="block">Issue {issue.number}</span>
                <span className="mt-2 block">{issue.date}</span>
                <span className="mt-3 inline-flex rounded-full border border-foreground/10 px-2 py-1">{issue.category}</span>
              </div>
              <div>
                <h2 className="text-2xl font-medium leading-tight">{issue.title}</h2>
                <p className="mt-2 leading-relaxed text-muted-foreground">{issue.excerpt}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {issue.sections.slice(0, 3).map((section) => (
                    <span key={section} className="rounded-full bg-foreground/[0.04] px-3 py-1 text-xs text-muted-foreground">
                      {section}
                    </span>
                  ))}
                </div>
              </div>
              <div className="font-mono text-xs text-muted-foreground md:text-right">
                <span className="block text-foreground">{issue.sourceDomain}</span>
                <span className="mt-2 block break-words">{issue.sourceTitle}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
