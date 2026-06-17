import Link from "next/link";
import { ArrowLeft, ArrowRight, FileText } from "lucide-react";
import { LessonBody } from "@/components/learn/aifs/lesson-body";
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
  getPreviousLesson,
} from "@/lib/learning-index";

export function LessonReader({ phase, lesson }: { phase: AifsPhase; lesson: AifsLesson }) {
  const previous = getPreviousLesson(phase.slug, lesson.slug);
  const next = getNextLesson(phase.slug, lesson.slug);

  return (
    <>
      <section className="relative border-b border-foreground/10 pt-36 pb-12 lg:pt-44">
        <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
          <Link
            href={getPhaseHref(AIFS_PATH_SLUG, phase.slug)}
            className="group mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Phase {phase.number}: {phase.title}
          </Link>

          <div className="mb-6 flex flex-wrap items-center gap-3 font-mono text-xs text-muted-foreground">
            <span>{aifsLearningPath.title}</span>
            <span>/</span>
            <span>Lesson {lesson.number}</span>
            <span>/</span>
            <span>{lesson.duration}</span>
          </div>

          <h1 className="max-w-4xl font-display text-[clamp(2.5rem,6vw,4.8rem)] leading-[0.95] tracking-tight">
            {lesson.title}
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-muted-foreground">
            {lesson.summary}
          </p>

          <div className="mt-8 flex flex-wrap gap-2 font-mono text-xs text-muted-foreground">
            <span className="border border-foreground/10 px-3 py-1">{lesson.type}</span>
            {lesson.languages.map((language) => (
              <span key={language} className="border border-foreground/10 px-3 py-1">
                {language}
              </span>
            ))}
            {lesson.prerequisites.length === 0 && (
              <span className="border border-foreground/10 px-3 py-1">No prerequisites</span>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-6 lg:grid-cols-[260px_1fr_320px] lg:px-12">
          <aside className="hidden lg:block lg:sticky lg:top-32 lg:self-start">
            <LearningSidebar phase={phase} currentLessonSlug={lesson.slug} />
          </aside>

          <article className="min-w-0 space-y-14">
            <LessonBody sections={lesson.sections} quiz={lesson.quiz} sourcePath={lesson.sourcePath} />
          </article>

          <aside className="space-y-8 lg:sticky lg:top-32 lg:self-start">
            <LessonProgressControls lessonId={lesson.id} phaseSlug={phase.slug} />

            <div className="lg:hidden">
              <LearningSidebar phase={phase} currentLessonSlug={lesson.slug} />
            </div>

            <section className="border border-foreground/10 p-6">
              <h2 className="font-medium">On this page</h2>
              <div className="mt-5 space-y-2">
                {lesson.sections.map((section) => (
                  <a
                    key={section.key}
                    href={`#${section.key}`}
                    className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {displaySectionTitle(section.title)}
                  </a>
                ))}
                {lesson.quiz.length > 0 && (
                  <a href="#check-understanding" className="block text-sm text-muted-foreground transition-colors hover:text-foreground">
                    Check Understanding
                  </a>
                )}
              </div>
            </section>

            {lesson.resources.length > 0 && (
              <section className="border border-foreground/10 p-6">
                <div className="mb-5 flex items-center gap-2">
                  <FileText className="h-4 w-4" aria-hidden="true" />
                  <h2 className="font-medium">Resources</h2>
                </div>
                <div className="space-y-3">
                  {lesson.resources.slice(0, 10).map((resource) => {
                    const href = resolveAifsMarkdownHref(resource.href, lesson.sourcePath);
                    const content = (
                      <>
                        <span className="block font-medium">{resource.label}</span>
                        <span className="mt-1 block font-mono text-xs text-muted-foreground">{resource.kind}</span>
                      </>
                    );
                    return href.startsWith("/") ? (
                      <Link
                        key={resource.href + resource.label}
                        href={href}
                        className="block border border-foreground/10 p-4 text-sm transition-colors hover:bg-foreground/[0.03]"
                      >
                        {content}
                      </Link>
                    ) : (
                      <a
                        key={resource.href + resource.label}
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className="block border border-foreground/10 p-4 text-sm transition-colors hover:bg-foreground/[0.03]"
                      >
                        {content}
                      </a>
                    );
                  })}
                </div>
              </section>
            )}
          </aside>
        </div>
      </section>

      <section className="border-t border-foreground/10 py-10">
        <div className="mx-auto grid max-w-[1100px] gap-px border border-foreground/10 bg-foreground/10 px-0 lg:grid-cols-2">
          {previous ? (
            <Link
              href={getAifsLessonHref(previous.phase.slug, previous.lesson.slug)}
              className="group bg-background p-6 transition-colors hover:bg-foreground/[0.03]"
            >
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Previous lesson
              </span>
              <span className="mt-3 block text-xl font-medium">{previous.lesson.title}</span>
            </Link>
          ) : (
            <Link href={getPhaseHref(AIFS_PATH_SLUG, phase.slug)} className="bg-background p-6 transition-colors hover:bg-foreground/[0.03]">
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <ArrowLeft className="h-4 w-4" /> Back to phase
              </span>
              <span className="mt-3 block text-xl font-medium">{phase.title}</span>
            </Link>
          )}
          {next && (
            <Link
              href={getAifsLessonHref(next.phase.slug, next.lesson.slug)}
              className="group bg-background p-6 text-right transition-colors hover:bg-foreground/[0.03]"
            >
              <span className="flex items-center justify-end gap-2 text-sm text-muted-foreground">
                Next lesson
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="mt-3 block text-xl font-medium">{next.lesson.title}</span>
            </Link>
          )}
        </div>
      </section>
    </>
  );
}

function displaySectionTitle(title: string) {
  if (/^the problem$/i.test(title)) return "Problem";
  if (/^the concept$/i.test(title)) return "Concept";
  return title;
}
