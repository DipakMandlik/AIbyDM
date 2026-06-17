import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, Flag, Layers3, Route } from "lucide-react";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import { getAllProjects, getLessonHref, getProject, getProjectHref, getTrackHref } from "@/lib/content";

export function generateStaticParams() {
  return getAllProjects()
    .filter(({ track }) => track.slug !== "ai-foundations")
    .map(({ track, project }) => ({
      slug: track.slug,
      projectSlug: project.slug,
    }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; projectSlug: string }>;
}): Promise<Metadata> {
  const { slug, projectSlug } = await params;
  if (slug === "ai-foundations") notFound();
  const match = getProject(slug, projectSlug);
  if (!match) return { title: "Project not found - AIByDM" };
  return {
    title: `${match.project.title} - AIByDM Learn`,
    description: match.project.summary,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string; projectSlug: string }>;
}) {
  const { slug, projectSlug } = await params;
  const match = getProject(slug, projectSlug);
  if (!match) notFound();

  const { track, project } = match;
  const projectIndex = track.projects.findIndex((entry) => entry.slug === project.slug);
  const previousProject = projectIndex > 0 ? track.projects[projectIndex - 1] : undefined;
  const nextProject = projectIndex < track.projects.length - 1 ? track.projects[projectIndex + 1] : undefined;
  const lessons = track.modules.flatMap((trackModule) => trackModule.lessons);
  const relatedLessons = lessons.filter((lesson) => project.relatedLessonSlugs.includes(lesson.slug));

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
            <span>Project brief</span>
            <span>/</span>
            <span>{project.difficulty}</span>
            <span>/</span>
            <span>{project.duration}</span>
          </div>
          <h1 className="max-w-4xl font-display text-[clamp(2.5rem,6vw,4.8rem)] leading-[0.95] tracking-tight">
            {project.title}
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-muted-foreground">
            {project.summary}
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto grid max-w-[1100px] gap-12 px-6 lg:grid-cols-[1fr_320px] lg:px-12">
          <article className="space-y-12">
            <section className="border border-foreground/10 p-6 lg:p-8">
              <div className="mb-4 flex items-center gap-3">
                <Flag className="h-5 w-5" aria-hidden="true" />
                <h2 className="font-display text-3xl">Scope</h2>
              </div>
              <p className="text-xl leading-relaxed text-muted-foreground">{project.scope}</p>
            </section>

            <section>
              <div className="mb-5 flex items-center gap-3">
                <Route className="h-5 w-5" aria-hidden="true" />
                <h2 className="font-display text-3xl">Milestone runway</h2>
              </div>
              <div className="grid gap-px border border-foreground/10 bg-foreground/10">
                {project.milestones.map((milestone, index) => (
                  <div key={milestone} className="bg-background p-5">
                    <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                      Milestone {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-3 text-lg text-muted-foreground">{milestone}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <div className="mb-5 flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                <h2 className="font-display text-3xl">Deliverables</h2>
              </div>
              <div className="grid gap-px border border-foreground/10 bg-foreground/10 md:grid-cols-2">
                {project.deliverables.map((deliverable) => (
                  <div key={deliverable} className="bg-background p-5 text-muted-foreground">
                    {deliverable}
                  </div>
                ))}
              </div>
            </section>
          </article>

          <aside className="space-y-8 lg:sticky lg:top-32 lg:self-start">
            <section className="border border-foreground/10 p-6">
              <div className="mb-5 flex items-center gap-2">
                <Layers3 className="h-4 w-4" aria-hidden="true" />
                <h2 className="font-medium">Prep lessons</h2>
              </div>
              <div className="space-y-3">
                {relatedLessons.map((lesson) => (
                  <Link
                    key={lesson.slug}
                    href={getLessonHref(track.slug, lesson.slug)}
                    className="block border border-foreground/10 p-4 text-sm transition-colors hover:bg-foreground/[0.03]"
                  >
                    <span className="font-medium">{lesson.title}</span>
                    <span className="mt-2 block text-muted-foreground">{lesson.summary}</span>
                  </Link>
                ))}
              </div>
            </section>

            <section className="border border-foreground/10 p-6">
              <h2 className="font-medium">Review rubric</h2>
              <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                <li>Can another learner understand the goal and output?</li>
                <li>Does the build prove the intended skill?</li>
                <li>Are failure cases and next iterations visible?</li>
                <li>Can the artifact be reused in a portfolio or team review?</li>
              </ul>
            </section>
          </aside>
        </div>
      </section>

      <section className="border-t border-foreground/10 py-10">
        <div className="mx-auto grid max-w-[1100px] gap-px border border-foreground/10 bg-foreground/10 px-0 lg:grid-cols-2">
          {previousProject ? (
            <Link
              href={getProjectHref(track.slug, previousProject.slug)}
              className="group bg-background p-6 transition-colors hover:bg-foreground/[0.03]"
            >
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Previous project
              </span>
              <span className="mt-3 block text-xl font-medium">{previousProject.title}</span>
            </Link>
          ) : (
            <Link href={getTrackHref(track.slug)} className="bg-background p-6 transition-colors hover:bg-foreground/[0.03]">
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <ArrowLeft className="h-4 w-4" /> Back to track
              </span>
              <span className="mt-3 block text-xl font-medium">{track.title}</span>
            </Link>
          )}
          {nextProject && (
            <Link
              href={getProjectHref(track.slug, nextProject.slug)}
              className="group bg-background p-6 text-right transition-colors hover:bg-foreground/[0.03]"
            >
              <span className="flex items-center justify-end gap-2 text-sm text-muted-foreground">
                Next project
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="mt-3 block text-xl font-medium">{nextProject.title}</span>
            </Link>
          )}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
