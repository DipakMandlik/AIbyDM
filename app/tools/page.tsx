import type { Metadata } from "next";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import { PageHero } from "@/components/site/page-hero";
import { ToolDirectory } from "@/components/tools/tool-directory";
import { toolCategories, tools } from "@/lib/content";

export const metadata: Metadata = {
  title: "Tools - AIByDM",
  description: "Discover practical AI tools for learning, building, retrieval, agents, and product workflows.",
};

export default function ToolsPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <SiteNav />
      <PageHero
        eyebrow="Tools"
        title="Find the right"
        highlight="AI tool for the job."
        description="A curated directory for learners and builders. Compare open-source projects, workflow helpers, and product-ready AI tooling without digging through noisy lists."
        meta={[
          { value: String(tools.length), label: "Featured tools" },
          { value: String(toolCategories.length), label: "Categories" },
          { value: "OSS", label: "Friendly" },
        ]}
      />
      <ToolDirectory tools={tools} />
      <SiteFooter />
    </main>
  );
}
