import type { Metadata } from "next";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import { PageHero } from "@/components/site/page-hero";
import { SearchExperience } from "@/components/site/search-experience";
import { getSearchItems } from "@/lib/content";

export const metadata: Metadata = {
  title: "Search - AIByDM",
  description: "Search AIByDM tracks, lessons, projects, tools, games, exams, newsletter issues, and community resources.",
};

export default function SearchPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <SiteNav />
      <PageHero
        eyebrow="Search"
        title="Find the next"
        highlight="useful step."
        description="Search across AIByDM learning tracks, lessons, projects, tools, practice games, exam prep, and newsletter issues."
        meta={[
          { value: String(getSearchItems().length), label: "Indexed items" },
          { value: "Static", label: "Fast" },
          { value: "Ctrl K", label: "Shortcut" },
        ]}
      />
      <SearchExperience />
      <SiteFooter />
    </main>
  );
}
