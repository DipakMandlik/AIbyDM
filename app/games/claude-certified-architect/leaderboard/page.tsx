import type { Metadata } from "next";
import { SiteNav } from "@/components/site/site-nav";
import { ClaudeChallengeLeaderboard } from "@/components/games/claude-certified-architect";

export const metadata: Metadata = {
  title: "Claude Challenge Leaderboard - AIByDM Games",
  description: "View your browser-local leaderboard for the Claude Certified Architect Challenge.",
};

export default function Page() {
  return (
    <main className="min-h-dvh overflow-x-hidden bg-slate-950 text-white">
      <SiteNav variant="compact" />
      <ClaudeChallengeLeaderboard />
    </main>
  );
}
