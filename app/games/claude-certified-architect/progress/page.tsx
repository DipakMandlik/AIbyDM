import type { Metadata } from "next";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";
import { ClaudeChallengeProgress } from "@/components/games/claude-certified-architect";

export const metadata: Metadata = {
  title: "Claude Challenge Progress - AIByDM Games",
  description: "Track XP, streaks, achievements, badges, floor mastery, and local progress for the Claude Certified Architect Challenge.",
};

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <SiteNav />
      <ClaudeChallengeProgress />
      <SiteFooter />
    </main>
  );
}
