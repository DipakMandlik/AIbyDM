import type { Metadata } from "next";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import { PageHero } from "@/components/site/page-hero";
import { NewsletterIndex } from "@/app/newsletter/newsletter-index";
import { issues, newsletterTopics } from "@/lib/content";

export const metadata: Metadata = {
  title: "Newsletter - AIByDM",
  description: "Read AIByDM issues about AI engineering, tools, agents, evaluations, and product design.",
};

export default function NewsletterPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <SiteNav />
      <PageHero
        eyebrow="Newsletter"
        title="100 AI signals"
        highlight="for builders."
        description="Source-backed AIByDM briefings across models, agents, tools, safety, research, product, engineering, open source, business, and learning."
        meta={[
          { value: String(issues.length), label: "Issues" },
          { value: String(newsletterTopics.length), label: "Categories" },
          { value: "Perplexity", label: "Refresh" },
        ]}
      />
      <NewsletterIndex issues={issues} categories={newsletterTopics} />
      <SiteFooter />
    </main>
  );
}
