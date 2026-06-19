import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Play, Trophy } from "lucide-react";
import { SiteNav } from "@/components/site/site-nav";
import { ClaudeChallengeOverview } from "@/components/games/claude-certified-architect";
import { games, getGame, getLessonHref, tracks } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return games.map((game) => ({ slug: game.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game) return { title: "Game not found - AIByDM" };
  return { title: `${game.title} - AIByDM Games`, description: game.description };
}

export default async function GamePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game) notFound();

  if (game.slug === "claude-certified-architect") {
    return (
      <main className="min-h-dvh overflow-x-hidden bg-slate-950 text-white">
        <SiteNav variant="compact" />
        <ClaudeChallengeOverview />
      </main>
    );
  }

  const relatedLessons = tracks
    .flatMap((track) =>
      track.modules.flatMap((trackModule) =>
        trackModule.lessons.map((lesson) => ({ track, lesson })),
      ),
    )
    .filter((entry) => game.relatedLessons.includes(entry.lesson.slug));

  return (
    <main className="min-h-dvh overflow-x-hidden bg-slate-950 text-white">
      <SiteNav variant="compact" />
      <section className="pt-14 lg:h-dvh lg:overflow-hidden">
        <div className="mx-auto grid min-h-[calc(100dvh-3.5rem)] max-w-[1300px] gap-4 px-4 py-4 sm:px-6 lg:grid-cols-[1fr_360px] lg:overflow-hidden lg:px-8">
          <article className="flex min-h-[520px] flex-col rounded-[28px] border border-white/10 bg-white/[0.04] p-5 lg:min-h-0 lg:overflow-hidden lg:p-7">
            <Link
              href="/games"
              className="group inline-flex min-h-10 w-fit items-center gap-2 rounded-full border border-white/10 px-4 text-sm text-slate-300 transition-colors hover:border-cyan-300/40 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              All games
            </Link>
            <div className="mt-auto py-8">
              <p className="font-mono text-xs uppercase tracking-widest text-cyan-200/80">
                {game.type} / {game.difficulty} / {game.duration}
              </p>
              <h1 className="mt-5 font-display text-4xl leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
                {game.title}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                {game.description}
              </p>
            </div>
            <button className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-cyan-300 px-6 text-sm font-semibold text-slate-950 sm:w-fit">
              <Play className="h-4 w-4 fill-current" aria-hidden="true" />
              Practice preview
            </button>
          </article>
          <aside className="grid min-h-0 gap-4 lg:grid-rows-[1fr_1fr] lg:overflow-hidden">
            <div className="rounded-[24px] border border-white/10 bg-slate-900/70 p-5 lg:overflow-y-auto">
              <div className="mb-4 flex items-center gap-3 text-cyan-200">
                <Trophy className="h-5 w-5" aria-hidden="true" />
                <h2 className="font-display text-2xl text-white">How it works</h2>
              </div>
              <div className="grid gap-3">
                {game.rules.map((rule, index) => (
                  <div key={rule} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <p className="font-mono text-xs uppercase tracking-widest text-cyan-200/70">
                      Step {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{rule}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-slate-900/70 p-5 lg:overflow-y-auto">
              <h2 className="font-display text-2xl text-white">Related lessons</h2>
              <div className="mt-4 space-y-3">
                {relatedLessons.map(({ track, lesson }) => (
                  <Link
                    key={lesson.slug}
                    href={getLessonHref(track.slug, lesson.slug)}
                    className="group block rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm transition-colors hover:border-cyan-300/40"
                  >
                    <span className="font-medium">{lesson.title}</span>
                    <span className="mt-2 flex items-center gap-2 text-slate-400">
                      {track.title}
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
