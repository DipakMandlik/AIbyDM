import type { Metadata } from "next";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";
import { ClaudeChallengeLeaderboard } from "@/components/games/claude-certified-architect";

export const metadata: Metadata = {
  title: "Claude Challenge Leaderboard - AIByDM Games",
  description: "View your browser-local leaderboard for the Claude Certified Architect Challenge.",
};

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <SiteNav />
      <ClaudeChallengeLeaderboard />
      <SiteFooter />
    </main>
  );
}
