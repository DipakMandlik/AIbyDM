import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";
import { PhaseDetail } from "@/components/learn/aifs/phase-detail";
import { aifsLearningPathIndex, getAifsPhase } from "@/lib/learning-index";

export function generateStaticParams() {
  return aifsLearningPathIndex.phases.map((phase) => ({ phaseSlug: phase.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ phaseSlug: string }> }): Promise<Metadata> {
  const { phaseSlug } = await params;
  const phase = getAifsPhase(phaseSlug);
  if (!phase) return { title: "Phase not found - AIByDM Learn" };
  return {
    title: `Phase ${phase.number}: ${phase.title} - AIByDM Learn`,
    description: phase.description,
  };
}

export default async function AiFromScratchPhasePage({ params }: { params: Promise<{ phaseSlug: string }> }) {
  const { phaseSlug } = await params;
  const phase = getAifsPhase(phaseSlug);
  if (!phase) notFound();

  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <SiteNav />
      <PhaseDetail phase={phase} />
      <SiteFooter />
    </main>
  );
}
