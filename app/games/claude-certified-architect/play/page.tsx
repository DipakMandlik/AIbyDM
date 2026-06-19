import { Suspense } from "react";
import type { Metadata } from "next";
import { SiteNav } from "@/components/site/site-nav";
import { ClaudeChallengePlay } from "@/components/games/claude-certified-architect";

export const metadata: Metadata = {
  title: "Play Claude Certified Architect Challenge - AIByDM Games",
  description: "Play the Claude Certified Architect Challenge in challenge, practice, single-question, or review mode.",
};

export default function Page() {
  return (
    <main className="min-h-dvh overflow-x-hidden bg-slate-950 text-white">
      <SiteNav variant="compact" />
      <Suspense fallback={<div className="pt-28 text-center text-slate-400">Loading challenge...</div>}>
        <ClaudeChallengePlay />
      </Suspense>
    </main>
  );
}
