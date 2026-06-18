import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import { exams, getExam, getExamTakeHref } from "@/lib/content";

export function generateStaticParams() {
  return exams.map((exam) => ({ slug: exam.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const exam = getExam(slug);
  if (!exam) return { title: "Exam not found - AIByDM" };
  return { title: `${exam.title} - AIByDM Exams`, description: exam.description };
}

export default async function ExamPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const exam = getExam(slug);
  if (!exam) notFound();

  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <SiteNav />
      <section className="relative border-b border-foreground/10 pt-36 pb-12 lg:pt-44">
        <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
          <Link href="/exams" className="group mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            All exams
          </Link>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {exam.role} / {exam.questions} questions
          </p>
          <h1 className="mt-5 font-display text-[clamp(3rem,8vw,6rem)] leading-[0.95] tracking-tight">
            {exam.title}
          </h1>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px] lg:items-end">
            <p className="max-w-2xl text-xl leading-relaxed text-muted-foreground">
              {exam.description}
            </p>
            <div className="border border-foreground/10 bg-background p-5">
              <div className="grid grid-cols-2 gap-px border border-foreground/10 bg-foreground/10">
                <div className="bg-background p-4">
                  <div className="font-display text-3xl">{exam.sampleExamQuestions.length}</div>
                  <div className="mt-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">V1 questions</div>
                </div>
                <div className="bg-background p-4">
                  <div className="font-display text-3xl">{exam.stages.length}</div>
                  <div className="mt-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Stages</div>
                </div>
              </div>
              <Button asChild size="lg" className="mt-5 min-h-12 w-full rounded-full">
                <Link href={getExamTakeHref(exam.slug)}>Start exam <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 lg:py-24">
        <div className="mx-auto grid max-w-[1100px] gap-12 px-6 lg:grid-cols-[1fr_320px] lg:px-12">
          <article>
            <div className="mb-5 flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
              <h2 className="font-display text-3xl">Prep stages</h2>
            </div>
            <div className="grid gap-px border border-foreground/10 bg-foreground/10">
              {exam.stages.map((stage, index) => (
                <div key={stage} className="bg-background p-5">
                  <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    Stage {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-3 text-lg text-muted-foreground">{stage}</p>
                </div>
              ))}
            </div>
          </article>
          <aside className="border border-foreground/10 p-6 lg:sticky lg:top-32 lg:self-start">
            <div className="mb-5 flex items-center gap-2">
              <FileQuestion className="h-4 w-4" aria-hidden="true" />
              <h2 className="font-medium">Sample questions</h2>
            </div>
            <div className="space-y-3">
              {exam.sampleExamQuestions.map((question, index) => (
                <div key={question.id} className="border border-foreground/10 p-4 text-sm text-muted-foreground">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Question {index + 1} / {question.stage}</p>
                  <p className="mt-2 text-foreground">{question.prompt}</p>
                </div>
              ))}
            </div>
            <Button asChild className="mt-5 w-full rounded-full">
              <Link href={getExamTakeHref(exam.slug)}>Open test runner <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </aside>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
