import Link from "next/link";
import { ArrowLeft, ArrowRight, FileText } from "lucide-react";
import { LessonBody, LessonTableOfContents } from "@/components/learn/aifs/lesson-body";
import { LearningSidebar } from "@/components/learn/aifs/learning-sidebar";
import { LessonProgressControls } from "@/components/learn/aifs/lesson-progress-controls";
import {
  aifsLearningPath,
  type AifsLesson,
  type AifsPhase,
} from "@/lib/learning";
import { resolveAifsMarkdownHref } from "@/lib/learning-links";
import {
  AIFS_PATH_SLUG,
  getAifsLessonHref,
  getNextLesson,
  getPhaseHref,
} from "@/lib/learning-index";

export function LessonReader({ phase, lesson }: { phase: AifsPhase; lesson: AifsLesson }) {
  const next = getNextLesson(phase.slug, lesson.slug);

  return (
    <section className="px-3 pb-4 pt-16 lg:h-screen lg:overflow-hidden lg:px-4 lg:pb-4 lg:pt-[4.25rem]">
      <div className="mx-auto flex h-full max-w-[1380px] flex-col gap-3">
        <header className="shrink-0 border border-foreground/10 bg-background/90 px-3 py-3 shadow-sm backdrop-blur lg:px-4">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-muted-foreground">
                <Link href="/learn/ai-from-scratch" className="transition-colors hover:text-foreground">
                  {aifsLearningPath.title}
                </Link>
                <span>/</span>
                <Link href={getPhaseHref(AIFS_PATH_SLUG, phase.slug)} className="transition-colors hover:text-foreground">
                  Phase {phase.number}
                </Link>
                <span>/</span>
                <span>Lesson {lesson.number}</span>
                <span>/</span>
                <span>{lesson.duration}</span>
              </div>

              <div className="mt-2 flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1">
                <h1 className="min-w-0 font-display text-xl leading-tight tracking-tight lg:text-2xl">{lesson.title}</h1>
                <span className="border border-foreground/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {lesson.type}
                </span>
                {lesson.languages.slice(0, 3).map((language) => (
                  <span key={language} className="border border-foreground/10 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                    {language}
                  </span>
                ))}
                {lesson.prerequisites.length === 0 && (
                  <span className="border border-foreground/10 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">No prerequisites</span>
                )}
              </div>

              <p className="mt-1 line-clamp-1 max-w-4xl text-sm leading-6 text-muted-foreground">{lesson.summary}</p>
            </div>

            <nav className="grid shrink-0 gap-2 sm:grid-cols-2 xl:min-w-[420px]" aria-label="Lesson navigation">
              <Link
                href={getPhaseHref(AIFS_PATH_SLUG, phase.slug)}
                className="group flex min-h-11 min-w-0 items-center justify-between gap-3 border border-foreground/10 bg-background px-3 py-2 text-sm transition-colors hover:bg-foreground/[0.03]"
              >
                <span className="flex min-w-0 items-center gap-2">
                  <ArrowLeft className="h-4 w-4 shrink-0 transition-transform group-hover:-translate-x-1" />
                  <span className="min-w-0">
                    <span className="block font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Back to phase</span>
                    <span className="block truncate font-medium">{phase.title}</span>
                  </span>
                </span>
              </Link>

              {next ? (
                <Link
                  href={getAifsLessonHref(next.phase.slug, next.lesson.slug)}
                  className="group flex min-h-11 min-w-0 items-center justify-between gap-3 border border-foreground/10 bg-background px-3 py-2 text-sm transition-colors hover:bg-foreground/[0.03]"
                >
                  <span className="min-w-0">
                    <span className="block font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Next lesson</span>
                    <span className="block truncate font-medium">{next.lesson.title}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
                </Link>
              ) : (
                <div
                  className="flex min-h-11 min-w-0 items-center border border-foreground/10 bg-foreground/[0.02] px-3 py-2 text-sm text-muted-foreground"
                  aria-disabled="true"
                >
                  <span className="min-w-0">
                    <span className="block font-mono text-[10px] uppercase tracking-wider">End of path</span>
                    <span className="block truncate font-medium text-foreground">{aifsLearningPath.title}</span>
                  </span>
                </div>
              )}
            </nav>
          </div>
        </header>
        <div className="grid min-h-0 flex-1 gap-3 lg:grid-cols-[260px_minmax(0,1fr)_320px]">
          <aside className="hidden min-h-0 lg:block">
            <div className="sticky top-[4.75rem] max-h-[calc(100vh-5.5rem)] overflow-y-auto">
              <LearningSidebar phase={phase} currentLessonSlug={lesson.slug} />
            </div>
          </aside>

          <article className="min-w-0 min-h-0">
            <LessonBody sections={lesson.sections} quiz={lesson.quiz} sourcePath={lesson.sourcePath} />
          </article>

          <aside className="min-h-0 space-y-3 lg:sticky lg:top-[4.75rem] lg:max-h-[calc(100vh-5.5rem)] lg:overflow-y-auto">
            <LessonProgressControls lessonId={lesson.id} phaseSlug={phase.slug} />

            <div className="lg:hidden">
              <LearningSidebar phase={phase} currentLessonSlug={lesson.slug} />
            </div>

            <LessonTableOfContents sections={lesson.sections} hasQuiz={lesson.quiz.length > 0} />

            {lesson.resources.length > 0 && (
              <section className="border border-foreground/10 p-6">
                <div className="mb-5 flex items-center gap-2">
                  <FileText className="h-4 w-4" aria-hidden="true" />
                  <h2 className="font-medium">Resources</h2>
                </div>
                <div className="space-y-3">
                  {lesson.resources.slice(0, 6).map((resource) => {
                    const href = resolveAifsMarkdownHref(resource.href, lesson.sourcePath);
                    const content = (
                      <>
                        <span className="block font-medium">{resource.label}</span>
                        <span className="mt-1 block font-mono text-xs text-muted-foreground">{resource.kind}</span>
                      </>
                    );
                    return href.startsWith("/") ? (
                      <Link key={resource.href + resource.label} href={href} className="block border border-foreground/10 p-4 text-sm transition-colors hover:bg-foreground/[0.03]">
                        {content}
                      </Link>
                    ) : (
                      <a key={resource.href + resource.label} href={href} target="_blank" rel="noreferrer" className="block border border-foreground/10 p-4 text-sm transition-colors hover:bg-foreground/[0.03]">
                        {content}
                      </a>
                    );
                  })}
                </div>
              </section>
            )}
          </aside>
        </div>

      </div>
    </section>
  );
}
