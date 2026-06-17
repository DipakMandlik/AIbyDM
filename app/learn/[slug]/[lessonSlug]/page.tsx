import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen, Check, Compass, FileText } from "lucide-react";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import {
  getAllLessons,
  getLesson,
  getLessonHref,
  getProjectHref,
  getTrackHref,
} from "@/lib/content";

export function generateStaticParams() {
  return getAllLessons().map(({ track, lesson }) => ({
    slug: track.slug,
    lessonSlug: lesson.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; lessonSlug: string }>;
}): Promise<Metadata> {
  const { slug, lessonSlug } = await params;
  const match = getLesson(slug, lessonSlug);
  if (!match) return { title: "Lesson not found - AIByDM" };
  return {
    title: `${match.lesson.title} - AIByDM Learn`,
    description: match.lesson.summary,
  };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string; lessonSlug: string }>;
}) {
  const { slug, lessonSlug } = await params;
  const match = getLesson(slug, lessonSlug);
  if (!match) notFound();

  const { track, module: trackModule, lesson } = match;
  const trackLessons = track.modules.flatMap((entry) =>
    entry.lessons.map((lessonEntry) => ({ module: entry, lesson: lessonEntry })),
  );
  const currentIndex = trackLessons.findIndex((entry) => entry.lesson.slug === lesson.slug);
  const previous = currentIndex > 0 ? trackLessons[currentIndex - 1] : undefined;
  const next = currentIndex < trackLessons.length - 1 ? trackLessons[currentIndex + 1] : undefined;
  const relatedProjects = track.projects.filter((project) =>
    project.relatedLessonSlugs.includes(lesson.slug),
  );

  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <SiteNav />
      <section className="relative border-b border-foreground/10 pt-36 pb-12 lg:pt-44">
        <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
          <Link
            href={getTrackHref(track.slug)}
            className="group mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {track.title}
          </Link>

          <div className="mb-6 flex flex-wrap items-center gap-3 font-mono text-xs text-muted-foreground">
            <span>{trackModule.title}</span>
            <span>/</span>
            <span>{lesson.duration}</span>
          </div>
          <h1 className="max-w-4xl font-display text-[clamp(2.5rem,6vw,4.8rem)] leading-[0.95] tracking-tight">
            {lesson.title}
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-muted-foreground">
            {lesson.summary}
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto grid max-w-[1100px] gap-12 px-6 lg:grid-cols-[1fr_320px] lg:px-12">
          <article className="space-y-12">
            <section>
              <div className="mb-6 flex items-center gap-3">
                <BookOpen className="h-5 w-5" aria-hidden="true" />
                <h2 className="font-display text-3xl">Lesson</h2>
              </div>
              <div className="space-y-5 text-lg leading-8 text-muted-foreground">
                {lesson.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>

            <section>
              <div className="mb-5 flex items-center gap-3">
                <Check className="h-5 w-5" aria-hidden="true" />
                <h2 className="font-display text-3xl">Objectives</h2>
              </div>
              <div className="grid gap-px border border-foreground/10 bg-foreground/10">
                {lesson.objectives.map((objective) => (
                  <div key={objective} className="bg-background p-5 text-muted-foreground">
                    {objective}
                  </div>
                ))}
              </div>
            </section>

            <section>
              <div className="mb-5 flex items-center gap-3">
                <Compass className="h-5 w-5" aria-hidden="true" />
                <h2 className="font-display text-3xl">Practice</h2>
              </div>
              <div className="grid gap-px border border-foreground/10 bg-foreground/10">
                {lesson.practice.map((item) => (
                  <div key={item} className="bg-background p-5 text-muted-foreground">
                    {item}
                  </div>
                ))}
              </div>
            </section>

            <section className="border border-foreground/10 p-6">
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Next action
              </p>
              <p className="mt-4 text-xl leading-relaxed">{lesson.nextAction}</p>
            </section>
          </article>

          <aside className="space-y-8 lg:sticky lg:top-32 lg:self-start">
            <section className="border border-foreground/10 p-6">
              <h2 className="font-medium">Concepts</h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {lesson.concepts.map((concept) => (
                  <span key={concept} className="border border-foreground/10 px-3 py-1 font-mono text-xs">
                    {concept}
                  </span>
                ))}
              </div>
            </section>

            <section className="border border-foreground/10 p-6">
              <div className="mb-5 flex items-center gap-2">
                <FileText className="h-4 w-4" aria-hidden="true" />
                <h2 className="font-medium">Resources</h2>
              </div>
              <div className="space-y-3">
                {lesson.resources.map((resource) => (
                  <Link
                    key={resource.label}
                    href={resource.href}
                    className="block border border-foreground/10 p-4 text-sm transition-colors hover:bg-foreground/[0.03]"
                  >
                    <span className="block font-medium">{resource.label}</span>
                    <span className="mt-1 block font-mono text-xs text-muted-foreground">
                      {resource.kind}
                    </span>
                  </Link>
                ))}
              </div>
            </section>

            {relatedProjects.length > 0 && (
              <section className="border border-foreground/10 p-6">
                <h2 className="font-medium">Related projects</h2>
                <div className="mt-5 space-y-3">
                  {relatedProjects.map((project) => (
                    <Link
                      key={project.slug}
                      href={getProjectHref(track.slug, project.slug)}
                      className="block border border-foreground/10 p-4 text-sm transition-colors hover:bg-foreground/[0.03]"
                    >
                      <span className="font-medium">{project.title}</span>
                      <span className="mt-2 block text-muted-foreground">{project.summary}</span>
                    </Link>
                  ))}
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
              href={getLessonHref(track.slug, previous.lesson.slug)}
              className="group bg-background p-6 transition-colors hover:bg-foreground/[0.03]"
            >
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Previous lesson
              </span>
              <span className="mt-3 block text-xl font-medium">{previous.lesson.title}</span>
            </Link>
          ) : (
            <Link href={getTrackHref(track.slug)} className="bg-background p-6 transition-colors hover:bg-foreground/[0.03]">
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <ArrowLeft className="h-4 w-4" /> Back to track
              </span>
              <span className="mt-3 block text-xl font-medium">{track.title}</span>
            </Link>
          )}
          {next && (
            <Link
              href={getLessonHref(track.slug, next.lesson.slug)}
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
      <SiteFooter />
    </main>
  );
}
