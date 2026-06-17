import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check, GitBranch } from "lucide-react";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import { getTool, getToolHref, tools } from "@/lib/content";

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) return { title: "Tool not found - AIByDM" };
  return { title: `${tool.name} - AIByDM Tools`, description: tool.description };
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();

  const related = tools
    .filter((entry) => entry.slug !== tool.slug && entry.category === tool.category)
    .slice(0, 2);

  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <SiteNav />
      <section className="relative border-b border-foreground/10 pt-36 pb-12 lg:pt-44">
        <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
          <Link
            href="/tools"
            className="group mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            All tools
          </Link>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {tool.category} / {tool.pricing}
          </p>
          <h1 className="mt-5 font-display text-[clamp(3rem,8vw,6rem)] leading-[0.95] tracking-tight">
            {tool.name}
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-muted-foreground">
            {tool.description}
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto grid max-w-[1100px] gap-12 px-6 lg:grid-cols-[1fr_320px] lg:px-12">
          <article className="space-y-12">
            <section>
              <div className="mb-5 flex items-center gap-3">
                <Check className="h-5 w-5" aria-hidden="true" />
                <h2 className="font-display text-3xl">Use cases</h2>
              </div>
              <div className="grid gap-px border border-foreground/10 bg-foreground/10">
                {tool.useCases.map((useCase) => (
                  <div key={useCase} className="bg-background p-5 text-muted-foreground">
                    {useCase}
                  </div>
                ))}
              </div>
            </section>

            <section>
              <div className="mb-5 flex items-center gap-3">
                <GitBranch className="h-5 w-5" aria-hidden="true" />
                <h2 className="font-display text-3xl">Alternatives</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {tool.alternatives.map((alternative) => (
                  <span key={alternative} className="border border-foreground/10 px-4 py-2 font-mono text-sm">
                    {alternative}
                  </span>
                ))}
              </div>
            </section>
          </article>

          <aside className="space-y-8 lg:sticky lg:top-32 lg:self-start">
            <section className="border border-foreground/10 p-6">
              <h2 className="font-medium">Links</h2>
              <div className="mt-5 space-y-3">
                {tool.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center justify-between gap-4 border border-foreground/10 p-4 text-sm transition-colors hover:bg-foreground/[0.03]"
                  >
                    {link.label}
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </section>

            {related.length > 0 && (
              <section className="border border-foreground/10 p-6">
                <h2 className="font-medium">Related tools</h2>
                <div className="mt-5 space-y-3">
                  {related.map((entry) => (
                    <Link
                      key={entry.slug}
                      href={getToolHref(entry.slug)}
                      className="block border border-foreground/10 p-4 text-sm transition-colors hover:bg-foreground/[0.03]"
                    >
                      <span className="font-medium">{entry.name}</span>
                      <span className="mt-2 block text-muted-foreground">{entry.description}</span>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </aside>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
