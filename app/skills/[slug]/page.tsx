import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import { Button } from "@/components/ui/button";
import {
  careerPaths,
  getCareerPath,
  getCertification,
  getSkill,
  difficultyColors,
} from "@/lib/skills-data";
import { getTrackHref, getGameHref, getExamHref, getToolHref } from "@/lib/content";

export function generateStaticParams() {
  return careerPaths.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const path = getCareerPath(slug);
  if (!path) return { title: "Path not found — AIByDM Skills" };
  return {
    title: `${path.title} Career Path — AIByDM Skills`,
    description: path.description,
  };
}

export default async function CareerPathPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const path = getCareerPath(slug);
  if (!path) notFound();

  const pathCerts = path.certifications
    .map((s) => getCertification(s))
    .filter(Boolean) as NonNullable<ReturnType<typeof getCertification>>[];

  const pathSkills = path.skills
    .map((s) => getSkill(s))
    .filter(Boolean) as NonNullable<ReturnType<typeof getSkill>>[];

  return (
    <div className="min-h-screen bg-background">
      <SiteNav variant="compact" />

      {/* Header */}
      <section className="border-b border-foreground/10 pt-24 pb-12">
        <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
          <Link
            href="/skills"
            className="group mb-8 inline-flex items-center gap-2 text-sm text-foreground/50 hover:text-foreground transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Skills Marketplace
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/40 border border-foreground/15 px-2.5 py-1 rounded-full">
              {path.role}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/40">
              {path.durationMonths} month path
            </span>
          </div>

          <h1 className="font-display text-[clamp(3rem,7vw,5rem)] leading-[1] tracking-tight text-foreground mb-3">
            {path.title}
          </h1>

          <p
            className="font-mono text-lg mb-4"
            style={{ color: "#06b6d4" }}
          >
            {path.salaryRange}
          </p>

          <p className="text-lg text-foreground/55 max-w-2xl leading-relaxed mb-8">
            {path.description}
          </p>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-6 font-mono text-sm text-foreground/40">
            <span>{path.skills.length} skills</span>
            <span>·</span>
            <span>{path.learningPaths.length} learning path{path.learningPaths.length !== 1 ? 's' : ''}</span>
            <span>·</span>
            <span>{path.certifications.length} certification{path.certifications.length !== 1 ? 's' : ''}</span>
            <span>·</span>
            <span>{path.projects.length} projects</span>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto grid max-w-[1100px] gap-12 px-6 lg:grid-cols-[1fr_300px] lg:px-12">
          {/* Main column */}
          <article className="space-y-14">
            {/* Overview */}
            <div>
              <h2 className="font-display text-2xl text-foreground mb-4">Overview</h2>
              <p className="text-foreground/65 leading-relaxed">{path.overview}</p>
            </div>

            {/* Required skills */}
            <div>
              <h2 className="font-display text-2xl text-foreground mb-4">Prerequisites</h2>
              <div className="grid gap-2">
                {path.requiredSkills.map((req) => (
                  <div
                    key={req}
                    className="flex items-center gap-3 border border-foreground/10 p-4 text-sm text-foreground/65"
                  >
                    <span className="text-[#16a34a] text-xs">✓</span>
                    {req}
                  </div>
                ))}
              </div>
            </div>

            {/* Skills you'll develop */}
            {pathSkills.length > 0 && (
              <div>
                <h2 className="font-display text-2xl text-foreground mb-4">Skills you&apos;ll develop</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {pathSkills.map((skill) => (
                    <Link
                      key={skill.slug}
                      href={`/skills/${skill.slug}`}
                      className="group border border-foreground/10 p-4 hover:border-foreground/25 transition-all duration-200"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-foreground group-hover:text-foreground/80">
                          {skill.title}
                        </span>
                        <span
                          className="font-mono text-[10px] uppercase px-1.5 py-0.5 rounded text-white"
                          style={{ backgroundColor: difficultyColors[skill.difficulty] }}
                        >
                          {skill.difficulty}
                        </span>
                      </div>
                      <p className="text-xs text-foreground/45 leading-relaxed">
                        {skill.tagline}
                      </p>
                      <div className="mt-2 font-mono text-[10px] text-foreground/30">
                        {skill.duration} · {skill.xp.toLocaleString()} XP
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Learning paths */}
            {path.learningPaths.length > 0 && (
              <div>
                <h2 className="font-display text-2xl text-foreground mb-4">Learning paths</h2>
                <div className="grid gap-px border border-foreground/10 bg-foreground/10">
                  {path.learningPaths.map((trackSlug, i) => (
                    <Link
                      key={trackSlug}
                      href={getTrackHref(trackSlug)}
                      className="group bg-background p-5 hover:bg-foreground/[0.02] transition-colors duration-200 flex items-center justify-between"
                    >
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-widest text-foreground/35 mb-1">
                          Track {String(i + 1).padStart(2, "0")}
                        </p>
                        <p className="text-sm text-foreground/70 group-hover:text-foreground transition-colors">
                          {trackSlug.replace(/-/g, " ")}
                        </p>
                      </div>
                      <span className="text-foreground/25 group-hover:text-[#06b6d4] group-hover:translate-x-1 transition-all duration-200 text-sm">
                        →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {path.projects.length > 0 && (
              <div>
                <h2 className="font-display text-2xl text-foreground mb-4">Capstone projects</h2>
                <div className="space-y-3">
                  {path.projects.map((project, i) => (
                    <div
                      key={project}
                      className="border border-foreground/10 p-5"
                    >
                      <p className="font-mono text-[10px] uppercase tracking-widest text-foreground/35 mb-2">
                        Project {String(i + 1).padStart(2, "0")}
                      </p>
                      <p className="text-sm text-foreground/65 leading-relaxed">{project}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            {/* CTA */}
            <div className="border border-foreground/10 p-5">
              <p className="font-mono text-xs uppercase tracking-widest text-foreground/40 mb-3">
                Start this path
              </p>
              <Button asChild className="w-full rounded-full bg-foreground text-background hover:bg-foreground/85">
                <Link href="/learn">Begin learning →</Link>
              </Button>
            </div>

            {/* Certifications */}
            {pathCerts.length > 0 && (
              <div className="border border-foreground/10 p-5">
                <p className="font-mono text-xs uppercase tracking-widest text-foreground/40 mb-4">
                  Certifications
                </p>
                <div className="space-y-3">
                  {pathCerts.map((cert) => (
                    <div key={cert.slug} className="border border-foreground/10 p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded text-white"
                          style={{ backgroundColor: difficultyColors[cert.difficulty] }}
                        >
                          {cert.difficulty}
                        </span>
                        <span className="font-mono text-[10px] text-[#f97316]">
                          {cert.xp.toLocaleString()} XP
                        </span>
                      </div>
                      <p className="text-sm text-foreground/70 mt-1.5">{cert.title}</p>
                      <p className="font-mono text-[10px] text-foreground/35 mt-1">
                        {cert.questions} questions · {cert.duration}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommended tools */}
            {path.recommendedTools.length > 0 && (
              <div className="border border-foreground/10 p-5">
                <p className="font-mono text-xs uppercase tracking-widest text-foreground/40 mb-4">
                  Recommended tools
                </p>
                <div className="flex flex-wrap gap-2">
                  {path.recommendedTools.map((tool) => (
                    <Link
                      key={tool}
                      href={getToolHref(tool)}
                      className="font-mono text-[11px] text-foreground/55 bg-foreground/[0.04] hover:bg-foreground/[0.08] px-2.5 py-1 rounded-full transition-colors duration-200"
                    >
                      {tool}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Related games */}
            {path.relatedGames.length > 0 && (
              <div className="border border-foreground/10 p-5">
                <p className="font-mono text-xs uppercase tracking-widest text-foreground/40 mb-4">
                  Practice games
                </p>
                <div className="space-y-2">
                  {path.relatedGames.map((gameSlug) => (
                    <Link
                      key={gameSlug}
                      href={getGameHref(gameSlug)}
                      className="group flex items-center justify-between text-sm text-foreground/60 hover:text-foreground transition-colors duration-200"
                    >
                      <span>{gameSlug.replace(/-/g, " ")}</span>
                      <span className="text-foreground/25 group-hover:text-[#06b6d4] group-hover:translate-x-0.5 transition-all duration-200">
                        →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Related exams */}
            {path.relatedExams.length > 0 && (
              <div className="border border-foreground/10 p-5">
                <p className="font-mono text-xs uppercase tracking-widest text-foreground/40 mb-4">
                  Interview prep
                </p>
                <div className="space-y-2">
                  {path.relatedExams.map((examSlug) => (
                    <Link
                      key={examSlug}
                      href={getExamHref(examSlug)}
                      className="group flex items-center justify-between text-sm text-foreground/60 hover:text-foreground transition-colors duration-200"
                    >
                      <span>{examSlug.replace(/-/g, " ")} exam</span>
                      <span className="text-foreground/25 group-hover:text-[#06b6d4] group-hover:translate-x-0.5 transition-all duration-200">
                        →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
