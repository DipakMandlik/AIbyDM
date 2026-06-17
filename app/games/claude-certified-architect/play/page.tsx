import { Suspense } from "react";
import type { Metadata } from "next";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";
import { ClaudeChallengePlay } from "@/components/games/claude-certified-architect";

export const metadata: Metadata = {
  title: "Play Claude Certified Architect Challenge - AIByDM Games",
  description: "Play the Claude Certified Architect Challenge in challenge, practice, single-question, or review mode.",
};

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <SiteNav />
      <Suspense fallback={<div className="min-h-screen pt-40 text-center text-muted-foreground">Loading challenge...</div>}>
        <ClaudeChallengePlay />
      </Suspense>
      <SiteFooter />
    </main>
  );
}
