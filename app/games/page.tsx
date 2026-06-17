import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import { PageHero } from "@/components/site/page-hero";
import { games, getGameHref } from "@/lib/content";

export const metadata: Metadata = {
  title: "Games - AIByDM",
  description: "Practice AI concepts through short, focused learning games and challenges.",
};

export default function GamesPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <SiteNav />
      <PageHero
        eyebrow="Games"
        title="Practice AI"
        highlight="without the grind."
        description="Short reinforcement loops for prompts, retrieval, hallucinations, embeddings, and agents. Play for recall, then jump back into the lesson path."
        meta={[
          { value: String(games.length), label: "Games" },
          { value: "3-20", label: "Minutes" },
          { value: "Daily", label: "Practice" },
        ]}
      />
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="grid gap-px border border-foreground/10 bg-foreground/10 md:grid-cols-2 xl:grid-cols-4">
            {games.map((game) => (
              <Link
                key={game.slug}
                href={getGameHref(game.slug)}
                className="group flex min-h-[320px] flex-col bg-background p-8 transition-colors hover:bg-foreground/[0.02]"
              >
                <div className="mb-8 flex items-start justify-between gap-4">
                  <span className="font-mono text-xs text-muted-foreground">{game.type}</span>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground opacity-0 transition-all group-hover:opacity-100" />
                </div>
                <h2 className="font-display text-3xl">{game.title}</h2>
                <p className="mt-4 flex-1 leading-relaxed text-muted-foreground">
                  {game.description}
                </p>
                <div className="mt-8 flex flex-wrap gap-2">
                  <span className="border border-foreground/10 px-3 py-1 font-mono text-xs">
                    {game.difficulty}
                  </span>
                  <span className="border border-foreground/10 px-3 py-1 font-mono text-xs">
                    {game.duration}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
