import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Play, Trophy } from "lucide-react";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import { games, getGame, getLessonHref, tracks } from "@/lib/content";

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

  const relatedLessons = tracks
    .flatMap((track) =>
      track.modules.flatMap((trackModule) =>
        trackModule.lessons.map((lesson) => ({ track, lesson })),
      ),
    )
    .filter((entry) => game.relatedLessons.includes(entry.lesson.slug));

  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <SiteNav />
      <section className="relative border-b border-foreground/10 pt-36 pb-12 lg:pt-44">
        <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
          <Link href="/games" className="group mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            All games
          </Link>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {game.type} / {game.difficulty} / {game.duration}
          </p>
          <h1 className="mt-5 font-display text-[clamp(3rem,8vw,6rem)] leading-[0.95] tracking-tight">
            {game.title}
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-muted-foreground">
            {game.description}
          </p>
          <button className="mt-10 inline-flex min-h-14 items-center gap-2 rounded-full bg-foreground px-8 text-base font-medium text-background">
            <Play className="h-4 w-4 fill-current" aria-hidden="true" />
            Start practice
          </button>
        </div>
      </section>
      <section className="py-16 lg:py-24">
        <div className="mx-auto grid max-w-[1100px] gap-12 px-6 lg:grid-cols-[1fr_320px] lg:px-12">
          <article>
            <div className="mb-5 flex items-center gap-3">
              <Trophy className="h-5 w-5" aria-hidden="true" />
              <h2 className="font-display text-3xl">How it works</h2>
            </div>
            <div className="grid gap-px border border-foreground/10 bg-foreground/10">
              {game.rules.map((rule, index) => (
                <div key={rule} className="bg-background p-5">
                  <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    Step {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-3 text-lg text-muted-foreground">{rule}</p>
                </div>
              ))}
            </div>
          </article>
          <aside className="border border-foreground/10 p-6 lg:sticky lg:top-32 lg:self-start">
            <h2 className="font-medium">Related lessons</h2>
            <div className="mt-5 space-y-3">
              {relatedLessons.map(({ track, lesson }) => (
                <Link key={lesson.slug} href={getLessonHref(track.slug, lesson.slug)} className="group block border border-foreground/10 p-4 text-sm transition-colors hover:bg-foreground/[0.03]">
                  <span className="font-medium">{lesson.title}</span>
                  <span className="mt-2 flex items-center gap-2 text-muted-foreground">
                    {track.title}
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
