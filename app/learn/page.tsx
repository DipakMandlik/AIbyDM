import type { Metadata } from "next";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import { PageHero } from "@/components/site/page-hero";
import { ContinueLearning } from "@/components/learn/continue-learning";
import { TrackGrid } from "@/components/learn/track-grid";

export const metadata: Metadata = {
  title: "Learn AI - AIByDM",
  description: "Structured AI learning tracks with guided progression, hands-on projects, and clear milestones.",
};

export default function LearnPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <SiteNav />
      <PageHero
        eyebrow="Learn"
        title="Structured paths"
        highlight="from curious to capable."
        description="Guided tracks that take you step by step from the fundamentals of AI to shipping real projects. Pick a path, follow the milestones, and learn by building."
        meta={[
          { value: "4", label: "Tracks" },
          { value: "400+", label: "Lessons" },
          { value: "Free", label: "Forever" },
        ]}
      />
      <ContinueLearning />
      <TrackGrid />
      <SiteFooter />
    </main>
  );
}
