import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import { PageHero } from "@/components/site/page-hero";
import { exams, getExamHref } from "@/lib/content";

export const metadata: Metadata = {
  title: "Exams - AIByDM",
  description: "Prepare for AI, ML, data science, and AI product interviews through structured exam paths.",
};

export default function ExamsPage() {
  const questionCount = exams.reduce((total, exam) => total + exam.questions, 0);

  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <SiteNav />
      <PageHero
        eyebrow="Exams"
        title="Interview prep"
        highlight="with a path."
        description="Role-based prep that works like a journey, not a question dump. Review stages, practice questions, and connect each exam back to Learn."
        meta={[
          { value: String(exams.length), label: "Roles" },
          { value: `${questionCount}+`, label: "Questions" },
          { value: "Self", label: "Paced" },
        ]}
      />
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="grid gap-px border border-foreground/10 bg-foreground/10 md:grid-cols-2 xl:grid-cols-4">
            {exams.map((exam) => (
              <Link key={exam.slug} href={getExamHref(exam.slug)} className="group flex min-h-[320px] flex-col bg-background p-8 transition-colors hover:bg-foreground/[0.02]">
                <div className="mb-8 flex items-start justify-between gap-4">
                  <span className="font-mono text-xs text-muted-foreground">{exam.role}</span>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground opacity-0 transition-all group-hover:opacity-100" />
                </div>
                <h2 className="font-display text-3xl">{exam.title}</h2>
                <p className="mt-4 flex-1 leading-relaxed text-muted-foreground">{exam.description}</p>
                <div className="mt-8 flex flex-wrap gap-2">
                  <span className="border border-foreground/10 px-3 py-1 font-mono text-xs">
                    {exam.questions} questions
                  </span>
                  <span className="border border-foreground/10 px-3 py-1 font-mono text-xs">
                    {exam.duration}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
