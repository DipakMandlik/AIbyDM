import type { Metadata } from "next";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import { PageHero } from "@/components/site/page-hero";
import { ContinueLearning } from "@/components/learn/continue-learning";
import { TrackGrid } from "@/components/learn/track-grid";

export const metadata: Metadata = {
  title: "Learn AI - AIByDM",
  description: "Structured AI learning with AI From Scratch, phase progression, hands-on projects, and clear milestones.",
};

export default function LearnPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <SiteNav />
      <PageHero
        eyebrow="Learn"
        title="Learn by phase"
        highlight="from scratch to shipped."
        description="Start with AI From Scratch, a phase-based curriculum that takes you from setup and math foundations through LLMs, agents, infrastructure, safety, and capstones. Keep exploring focused AIByDM tracks when you need a smaller path."
        meta={[
          { value: "20", label: "Phases" },
          { value: "500+", label: "Lessons" },
          { value: "Free", label: "Forever" },
        ]}
      />
      <ContinueLearning />
      <TrackGrid />
      <SiteFooter />
    </main>
  );
}

