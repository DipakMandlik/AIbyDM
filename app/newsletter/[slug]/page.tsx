import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Newspaper } from "lucide-react";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import { getIssue, issues } from "@/lib/content";

export function generateStaticParams() {
  return issues.map((issue) => ({ slug: issue.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const issue = getIssue(slug);
  if (!issue) return { title: "Issue not found - AIByDM" };
  return { title: `${issue.title} - AIByDM Newsletter`, description: issue.excerpt };
}

export default async function IssuePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const issue = getIssue(slug);
  if (!issue) notFound();

  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <SiteNav />
      <article className="mx-auto grid max-w-[1180px] gap-10 px-6 pt-36 pb-20 lg:grid-cols-[1fr_320px] lg:px-12 lg:pt-44">
        <div>
          <Link href="/newsletter" className="group mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            All issues
          </Link>
          <div className="mb-6 flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            <Newspaper className="h-4 w-4" aria-hidden="true" />
            Issue {issue.number} / {issue.category} / {issue.date}
          </div>
          <h1 className="font-display text-[clamp(3rem,8vw,6rem)] leading-[0.95] tracking-tight">
            {issue.title}
          </h1>
          <p className="mt-8 text-xl leading-relaxed text-muted-foreground">{issue.excerpt}</p>
          <div className="mt-8 rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-5">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">AIByDM summary</p>
            <p className="mt-3 leading-8 text-muted-foreground">{issue.summary}</p>
          </div>
          <div className="mt-14 space-y-8">
            {issue.sections.map((section, index) => (
              <section key={section} className="border-t border-foreground/10 pt-8">
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Section {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-3 text-3xl font-medium">{section}</h2>
                <p className="mt-4 leading-8 text-muted-foreground">
                  AIByDM tracks this signal through the lens of what learners can build, test, and ship.
                  Use the source material for the original reporting, then turn this brief into a practice loop.
                </p>
              </section>
            ))}
          </div>
        </div>

        <aside className="space-y-5 lg:sticky lg:top-32 lg:self-start">
          <div className="border border-foreground/10 p-5">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Primary source</p>
            <h2 className="mt-3 text-xl font-medium">{issue.sourceTitle}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{issue.sourceDomain}</p>
            <a href={issue.sourceUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background">
              Open source
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
          <div className="border border-foreground/10 p-5">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Category</p>
            <div className="mt-3 inline-flex rounded-full border border-foreground/10 px-3 py-1 text-sm">{issue.category}</div>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">Published signal date: {new Date(issue.publishedAt).toLocaleDateString("en", { month: "long", day: "numeric", year: "numeric" })}</p>
          </div>
          {issue.citations?.length ? (
            <div className="border border-foreground/10 p-5">
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Citations</p>
              <div className="mt-4 space-y-3">
                {issue.citations.map((citation) => (
                  <a key={citation.href} href={citation.href} target="_blank" rel="noreferrer" className="block text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
                    {citation.label}
                  </a>
                ))}
              </div>
            </div>
          ) : null}
        </aside>
      </article>
      <SiteFooter />
    </main>
  );
}
