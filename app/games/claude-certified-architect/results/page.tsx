import type { Metadata } from "next";
import { SiteNav } from "@/components/site/site-nav";
import { ClaudeChallengeResults } from "@/components/games/claude-certified-architect";

export const metadata: Metadata = {
  title: "Claude Challenge Results - AIByDM Games",
  description: "Review score, XP, category breakdown, strong areas, and weak areas from your latest Claude Certified Architect Challenge run.",
};

export default function Page() {
  return (
    <main className="min-h-dvh overflow-x-hidden bg-slate-950 text-white">
      <SiteNav variant="compact" />
      <ClaudeChallengeResults />
    </main>
  );
}
