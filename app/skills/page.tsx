import type { Metadata } from "next";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import { SkillsIndex } from "@/app/skills/skills-index";

export const metadata: Metadata = {
  title: "Skills Marketplace — AIByDM",
  description:
    "Discover AI skills, follow career paths, earn certifications, and build the portfolio that lands your next role.",
  openGraph: {
    title: "Skills Marketplace — AIByDM",
    description:
      "Structured paths from AI Engineer to AI Architect. Skills, projects, certifications, and everything in between.",
  },
};

export default function SkillsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav variant="compact" />
      <main className="pt-14">
        <SkillsIndex />
      </main>
      <SiteFooter />
    </div>
  );
}
