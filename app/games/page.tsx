import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Play, Trophy } from "lucide-react";
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
                className={"group flex min-h-[320px] flex-col bg-background p-8 transition-colors hover:bg-foreground/[0.02] " + (game.featured ? "md:col-span-2 xl:col-span-2" : "")}
              >
                <div className="mb-8 flex items-start justify-between gap-4">
                  <span className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground">
                    {game.featured ? <Trophy className="h-4 w-4" aria-hidden="true" /> : null}
                    {game.featured ? "Flagship" : game.type}
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                </div>
                <h2 className={"font-display " + (game.featured ? "text-4xl md:text-5xl" : "text-3xl")}>{game.title}</h2>
                <p className="mt-4 flex-1 leading-relaxed text-muted-foreground">
                  {game.description}
                </p>
                <div className="mt-8 grid gap-2 sm:grid-cols-2">
                  <GameMeta label="Difficulty" value={game.difficulty} />
                  <GameMeta label="Duration" value={game.duration} />
                  {game.questionCount ? <GameMeta label="Questions" value={String(game.questionCount)} /> : null}
                  {game.xpReward ? <GameMeta label="XP" value={String(game.xpReward)} /> : null}
                  {game.completionRate ? <GameMeta label="Completion" value={game.completionRate} /> : null}
                </div>
                {game.featured ? (
                  <span className="mt-8 inline-flex min-h-12 w-fit items-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background">
                    <Play className="h-4 w-4 fill-current" aria-hidden="true" />
                    {game.ctaLabel ?? "Start"}
                  </span>
                ) : null}
              </Link>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

function GameMeta({ label, value }: { label: string; value: string }) {
  return (
    <span className="border border-foreground/10 px-3 py-2 font-mono text-xs">
      <span className="text-muted-foreground">{label}: </span>{value}
    </span>
  );
}
