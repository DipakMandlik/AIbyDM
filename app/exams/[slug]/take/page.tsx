import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExamRunner } from "@/components/exams/exam-runner";
import { SiteNav } from "@/components/site/site-nav";
import { exams, getExam } from "@/lib/content";

export function generateStaticParams() {
  return exams.map((exam) => ({ slug: exam.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const exam = getExam(slug);
  if (!exam) return { title: "Exam not found - AIByDM" };
  return {
    title: `Take ${exam.title} - AIByDM Exams`,
    description: `Practice ${exam.role} interview questions in a focused exam runner.`,
  };
}

export default async function ExamTakePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const exam = getExam(slug);
  if (!exam) notFound();

  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-50">
      <SiteNav variant="compact" />
      <ExamRunner exam={exam} />
    </main>
  );
}
