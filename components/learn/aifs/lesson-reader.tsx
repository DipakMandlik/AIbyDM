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
    <section className="px-4 pb-6 pt-24 lg:h-screen lg:overflow-hidden lg:px-6 lg:pb-6 lg:pt-24">
      <div className="mx-auto flex h-full max-w-[1380px] flex-col gap-4">
        <header className="border border-foreground/10 bg-background/85 px-4 py-3 shadow-sm backdrop-blur lg:px-5">
          <Link
            href={getPhaseHref(AIFS_PATH_SLUG, phase.slug)}
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Phase {phase.number}: {phase.title}
          </Link>
          <div className="mt-3 grid gap-3 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="min-w-0">
              <div className="mb-2 flex flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground">
                <span>{aifsLearningPath.title}</span>
                <span>/</span>
                <span>Lesson {lesson.number}</span>
                <span>/</span>
                <span>{lesson.duration}</span>
              </div>
              <h1 className="font-display text-2xl leading-tight tracking-tight lg:text-3xl">{lesson.title}</h1>
              <p className="mt-2 line-clamp-2 max-w-3xl text-sm leading-6 text-muted-foreground lg:line-clamp-1">{lesson.summary}</p>
            </div>
            <div className="flex flex-wrap gap-2 font-mono text-xs text-muted-foreground lg:justify-end">
              <span className="border border-foreground/10 px-3 py-1">{lesson.type}</span>
              {lesson.languages.map((language) => (
                <span key={language} className="border border-foreground/10 px-3 py-1">
                  {language}
                </span>
              ))}
              {lesson.prerequisites.length === 0 && <span className="border border-foreground/10 px-3 py-1">No prerequisites</span>}
            </div>
          </div>
        </header>

        <nav className="grid shrink-0 gap-px border border-foreground/10 bg-foreground/10 lg:grid-cols-2" aria-label="Lesson navigation">
          <Link href={getPhaseHref(AIFS_PATH_SLUG, phase.slug)} className="group bg-background p-4 transition-colors hover:bg-foreground/[0.03]">
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to phase
            </span>
            <span className="mt-2 block font-medium">{phase.title}</span>
          </Link>
          {next ? (
            <Link href={getAifsLessonHref(next.phase.slug, next.lesson.slug)} className="group bg-background p-4 text-left transition-colors hover:bg-foreground/[0.03] lg:text-right">
              <span className="flex items-center gap-2 text-sm text-muted-foreground lg:justify-end">
                Next lesson
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="mt-2 block font-medium">{next.lesson.title}</span>
            </Link>
          ) : (
            <div className="bg-background p-4 text-sm text-muted-foreground lg:text-right">
              <span className="block">End of path</span>
              <span className="mt-2 block font-medium text-foreground">{aifsLearningPath.title}</span>
            </div>
          )}
        </nav>

        <div className="grid min-h-0 flex-1 gap-4 lg:grid-cols-[260px_minmax(0,1fr)_320px]">
          <aside className="hidden min-h-0 lg:block">
            <div className="sticky top-28 max-h-[calc(100vh-9rem)] overflow-y-auto">
              <LearningSidebar phase={phase} currentLessonSlug={lesson.slug} />
            </div>
          </aside>

          <article className="min-w-0 min-h-0">
            <LessonBody sections={lesson.sections} quiz={lesson.quiz} sourcePath={lesson.sourcePath} />
          </article>

          <aside className="min-h-0 space-y-5 lg:sticky lg:top-28 lg:max-h-[calc(100vh-9rem)] lg:overflow-y-auto">
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
