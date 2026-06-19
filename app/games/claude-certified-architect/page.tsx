import type { Metadata } from "next";
import { SiteNav } from "@/components/site/site-nav";
import { ClaudeChallengeOverview } from "@/components/games/claude-certified-architect";

export const metadata: Metadata = {
  title: "Claude Certified Architect Challenge - AIByDM Games",
  description: "A browser-local AI architecture challenge with floors, XP, streaks, achievements, and review mode.",
};

export default function Page() {
  return (
    <main className="min-h-dvh overflow-x-hidden bg-slate-950 text-white">
      <SiteNav variant="compact" />
      <ClaudeChallengeOverview />
    </main>
  );
}
