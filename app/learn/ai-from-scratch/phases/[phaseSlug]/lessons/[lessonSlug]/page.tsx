import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteNav } from "@/components/site/site-nav";
import { LessonReader } from "@/components/learn/aifs/lesson-reader";
import { getAifsFullLesson } from "@/lib/learning";
import { getAllAifsLessons } from "@/lib/learning-index";

export function generateStaticParams() {
  return getAllAifsLessons().map(({ phase, lesson }) => ({
    phaseSlug: phase.slug,
    lessonSlug: lesson.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ phaseSlug: string; lessonSlug: string }> }): Promise<Metadata> {
  const { phaseSlug, lessonSlug } = await params;
  const match = getAifsFullLesson(phaseSlug, lessonSlug);
  if (!match) return { title: "Lesson not found - AIByDM Learn" };
  return {
    title: `${match.lesson.title} - AIByDM Learn`,
    description: match.lesson.summary,
  };
}

export default async function AiFromScratchLessonPage({ params }: { params: Promise<{ phaseSlug: string; lessonSlug: string }> }) {
  const { phaseSlug, lessonSlug } = await params;
  const match = getAifsFullLesson(phaseSlug, lessonSlug);
  if (!match) notFound();

  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <SiteNav />
      <LessonReader phase={match.phase} lesson={match.lesson} />
    </main>
  );
}
