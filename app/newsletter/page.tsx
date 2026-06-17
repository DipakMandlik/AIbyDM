import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import { PageHero } from "@/components/site/page-hero";
import { getIssueHref, issues, newsletterTopics } from "@/lib/content";

export const metadata: Metadata = {
  title: "Newsletter - AIByDM",
  description: "Read AIByDM issues about AI engineering, tools, agents, evaluations, and product design.",
};

export default function NewsletterPage() {
  const featured = issues.find((issue) => issue.featured) ?? issues[0];

  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <SiteNav />
      <PageHero
        eyebrow="Newsletter"
        title="A weekly signal"
        highlight="for AI builders."
        description="A publication, not a feed. Follow what changed in AI engineering, what to learn next, and which tools are worth your attention."
        meta={[
          { value: String(issues.length), label: "Issues" },
          { value: String(newsletterTopics.length), label: "Topics" },
          { value: "Weekly", label: "Cadence" },
        ]}
      />
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
          {featured && (
            <Link href={getIssueHref(featured.slug)} className="group mb-12 block border border-foreground/10 p-8 transition-colors hover:bg-foreground/[0.02] lg:p-10">
              <div className="flex items-start justify-between gap-4">
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Featured / Issue {featured.number}
                </span>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground opacity-0 transition-all group-hover:opacity-100" />
              </div>
              <h2 className="mt-8 max-w-3xl font-display text-5xl leading-none tracking-tight">
                {featured.title}
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                {featured.excerpt}
              </p>
            </Link>
          )}
          <div className="grid gap-px border border-foreground/10 bg-foreground/10">
            {issues.map((issue) => (
              <Link key={issue.slug} href={getIssueHref(issue.slug)} className="group grid gap-6 bg-background p-6 transition-colors hover:bg-foreground/[0.02] md:grid-cols-[140px_1fr_120px]">
                <div className="font-mono text-xs text-muted-foreground">
                  <span className="block">Issue {issue.number}</span>
                  <span className="mt-2 block">{issue.date}</span>
                </div>
                <div>
                  <h2 className="text-2xl font-medium">{issue.title}</h2>
                  <p className="mt-2 text-muted-foreground">{issue.excerpt}</p>
                </div>
                <span className="font-mono text-xs text-muted-foreground md:text-right">{issue.topic}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
