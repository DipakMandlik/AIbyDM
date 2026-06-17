import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BookOpen, GitBranch, Handshake, ShieldCheck, Sparkles } from "lucide-react";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import { PageHero } from "@/components/site/page-hero";

export const metadata: Metadata = {
  title: "Community - AIByDM",
  description: "Join the AIByDM open-source community and contribute curriculum, UX, tools, exams, and platform quality.",
};

const repoUrl = "https://github.com/DipakMandlik/AIByDM";

const lanes = [
  {
    title: "Curriculum and lessons",
    description: "Improve learning paths, lesson clarity, project briefs, and resources.",
    href: "/learn",
    Icon: BookOpen,
  },
  {
    title: "Product and UX",
    description: "Refine navigation, accessibility, search, motion, and information architecture.",
    href: repoUrl,
    Icon: Sparkles,
  },
  {
    title: "Tools and exams",
    description: "Add tool guides, role-based prep, games, and reviewable practice loops.",
    href: "/tools",
    Icon: GitBranch,
  },
  {
    title: "Community operations",
    description: "Help triage issues, support discussions, and keep contribution paths healthy.",
    href: `${repoUrl}/discussions`,
    Icon: Handshake,
  },
];

export default function CommunityPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <SiteNav />
      <PageHero
        eyebrow="Community"
        title="Build AIByDM"
        highlight="in the open."
        description="A premium open-source platform needs more than code. Help shape curriculum, product quality, search, tools, exams, and the rituals that make learning together easier."
        meta={[
          { value: "MIT", label: "Licensed" },
          { value: "GitHub", label: "Native" },
          { value: "Open", label: "Contribution" },
        ]}
      />
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="grid gap-px border border-foreground/10 bg-foreground/10 md:grid-cols-2 xl:grid-cols-4">
            {lanes.map(({ title, description, href, Icon }) => (
              <Link key={title} href={href} className="group flex min-h-[280px] flex-col bg-background p-8 transition-colors hover:bg-foreground/[0.02]">
                <div className="mb-8 flex items-start justify-between gap-4">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground opacity-0 transition-all group-hover:opacity-100" />
                </div>
                <h2 className="font-display text-3xl">{title}</h2>
                <p className="mt-4 flex-1 leading-relaxed text-muted-foreground">{description}</p>
              </Link>
            ))}
          </div>

          <div className="mt-12 grid gap-px border border-foreground/10 bg-foreground/10 lg:grid-cols-3">
            <Link href={`${repoUrl}/blob/main/CONTRIBUTING.md`} className="bg-background p-8 transition-colors hover:bg-foreground/[0.02]">
              <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              <h2 className="mt-6 text-2xl font-medium">Contribution guide</h2>
              <p className="mt-3 text-muted-foreground">Start with the standards for issues, pull requests, and review.</p>
            </Link>
            <Link href={`${repoUrl}/issues`} className="bg-background p-8 transition-colors hover:bg-foreground/[0.02]">
              <GitBranch className="h-5 w-5" aria-hidden="true" />
              <h2 className="mt-6 text-2xl font-medium">Issue queue</h2>
              <p className="mt-3 text-muted-foreground">Find product, content, and platform work that needs hands.</p>
            </Link>
            <Link href={`${repoUrl}/discussions`} className="bg-background p-8 transition-colors hover:bg-foreground/[0.02]">
              <Handshake className="h-5 w-5" aria-hidden="true" />
              <h2 className="mt-6 text-2xl font-medium">Discussions</h2>
              <p className="mt-3 text-muted-foreground">Share ideas, ask questions, and shape the next platform direction.</p>
            </Link>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
