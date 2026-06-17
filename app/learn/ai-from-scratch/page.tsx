import type { Metadata } from "next";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";
import { LearningPathOverview } from "@/components/learn/aifs/learning-path-overview";
import { aifsLearningPathIndex } from "@/lib/learning-index";

export const metadata: Metadata = {
  title: "AI From Scratch - AIByDM Learn",
  description: aifsLearningPathIndex.description,
};

export default function AiFromScratchPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <SiteNav />
      <LearningPathOverview />
      <SiteFooter />
    </main>
  );
}
