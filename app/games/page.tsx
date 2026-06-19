import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Clock,
  Gamepad2,
  Joystick,
  Play,
  Sparkles,
  Trophy,
} from "lucide-react";
import { SiteNav } from "@/components/site/site-nav";
import { games, getGameHref } from "@/lib/content";

export const metadata: Metadata = {
  title: "Games - AIByDM",
  description: "Practice AI concepts through compact learning games and challenge modes.",
};

export default function GamesPage() {
  const featuredGame = games.find((game) => game.featured) ?? games[0];
  const sideGames = games.filter((game) => game.slug !== featuredGame.slug);

  return (
    <main className="min-h-dvh overflow-x-hidden bg-slate-950 text-white">
      <SiteNav variant="compact" />
      <section className="pt-14 lg:h-dvh lg:overflow-hidden">
        <div className="mx-auto flex min-h-[calc(100dvh-3.5rem)] max-w-[1500px] flex-col gap-4 px-4 py-4 sm:px-6 lg:grid lg:grid-cols-[1.2fr_0.8fr] lg:grid-rows-[1fr_auto] lg:overflow-hidden lg:px-8">
          <Link
            href={getGameHref(featuredGame.slug)}
            className="group relative flex min-h-[480px] flex-col overflow-hidden rounded-[28px] border border-cyan-300/20 bg-[radial-gradient(circle_at_18%_18%,rgba(34,211,238,0.28),transparent_34%),linear-gradient(135deg,rgba(15,23,42,0.96),rgba(8,13,28,0.98))] p-5 shadow-2xl shadow-cyan-950/30 transition-transform duration-300 hover:-translate-y-0.5 lg:min-h-0 lg:overflow-hidden lg:p-7"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="inline-flex min-h-10 items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 text-xs font-semibold uppercase tracking-widest text-cyan-100">
                <Trophy className="h-4 w-4" aria-hidden="true" />
                Flagship challenge
              </span>
              <span className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 text-sm text-slate-200">
                <Clock className="h-4 w-4" aria-hidden="true" />
                {featuredGame.duration}
              </span>
            </div>

            <div className="mt-auto max-w-4xl py-8 lg:py-10">
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan-200/80">AIByDM Arcade</p>
              <h1 className="mt-4 max-w-4xl font-display text-4xl leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
                {featuredGame.title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                {featuredGame.description}
              </p>
            </div>

            <div className="grid gap-3 border-t border-white/10 pt-4 sm:grid-cols-[auto_1fr] sm:items-center">
              <span className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-cyan-300 px-6 text-sm font-semibold text-slate-950 transition-colors group-hover:bg-white sm:w-fit">
                <Play className="h-4 w-4 fill-current" aria-hidden="true" />
                {featuredGame.ctaLabel ?? "Start challenge"}
              </span>
              <div className="grid grid-cols-3 gap-2 text-center text-xs sm:ml-auto sm:w-[420px]">
                <ArcadeMetric label="Questions" value={String(featuredGame.questionCount ?? 0)} />
                <ArcadeMetric label="XP" value={String(featuredGame.xpReward ?? 0)} />
                <ArcadeMetric label="Mode" value={featuredGame.completionRate ?? "Local"} />
              </div>
            </div>
          </Link>

          <aside className="flex min-h-0 flex-col rounded-[28px] border border-white/10 bg-white/[0.04] p-4 shadow-2xl shadow-black/20 lg:overflow-hidden">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-slate-400">Practice deck</p>
                <h2 className="mt-1 font-display text-2xl text-white">Game library</h2>
              </div>
              <Joystick className="h-6 w-6 text-cyan-200" aria-hidden="true" />
            </div>
            <div className="mt-4 grid gap-3 lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:pr-1">
              {sideGames.map((game) => (
                <Link
                  key={game.slug}
                  href={getGameHref(game.slug)}
                  className="group rounded-2xl border border-white/10 bg-slate-900/70 p-4 transition-colors hover:border-cyan-300/40 hover:bg-slate-900"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan-200/70">{game.type}</p>
                      <h3 className="mt-2 text-lg font-semibold text-white">{game.title}</h3>
                    </div>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-slate-300">Preview</span>
                  </div>
                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-400">{game.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-300">
                    <span className="rounded-full bg-white/5 px-3 py-1">{game.difficulty}</span>
                    <span className="rounded-full bg-white/5 px-3 py-1">{game.duration}</span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-3 py-1">
                      Open <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </aside>

          <div className="grid gap-3 lg:col-span-2 lg:grid-cols-4">
            <ArcadeStatus icon={<Gamepad2 className="h-5 w-5" />} label="Games" value={String(games.length)} detail="One playable, four practice previews" />
            <ArcadeStatus icon={<BadgeCheck className="h-5 w-5" />} label="Daily loop" value="3-20 min" detail="Short sessions, no long lesson scroll" />
            <ArcadeStatus icon={<Sparkles className="h-5 w-5" />} label="Progress" value="Local" detail="XP, badges, attempts, streaks" />
            <ArcadeStatus icon={<Trophy className="h-5 w-5" />} label="Flagship" value="Claude" detail="Architect challenge floors" />
          </div>
        </div>
      </section>
    </main>
  );
}

function ArcadeMetric({ label, value }: { label: string; value: string }) {
  return (
    <span className="rounded-2xl border border-white/10 bg-white/[0.06] px-3 py-2">
      <span className="block font-display text-xl text-white">{value}</span>
      <span className="block font-mono text-[10px] uppercase tracking-widest text-slate-400">{label}</span>
    </span>
  );
}

function ArcadeStatus({
  icon,
  label,
  value,
  detail,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <div className="flex items-center gap-3 text-cyan-200">
        {icon}
        <span className="font-mono text-[11px] uppercase tracking-[0.2em]">{label}</span>
      </div>
      <div className="mt-3 font-display text-2xl text-white">{value}</div>
      <p className="mt-1 text-sm text-slate-400">{detail}</p>
    </div>
  );
}
