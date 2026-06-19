"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import { CertificationCard } from "@/components/skills/certification-card";
import { certifications, type Difficulty } from "@/lib/skills-data";

const difficultyFilters: Array<"All" | Difficulty> = [
  "All",
  "Beginner",
  "Intermediate",
  "Advanced",
  "Expert",
];

export default function CertificationsPage() {
  const [filter, setFilter] = useState<"All" | Difficulty>("All");

  const filtered =
    filter === "All" ? certifications : certifications.filter((c) => c.difficulty === filter);

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

          <p className="font-mono text-xs uppercase tracking-widest text-foreground/40 mb-4">
            Certifications
          </p>
          <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] text-foreground mb-4">
            Credentials that prove<br />what you can build.
          </h1>
          <p className="text-lg text-foreground/55 max-w-xl leading-relaxed mb-8">
            AIByDM certifications are structured around real-world AI engineering competencies — not trivia. Earn credentials that show employers you can ship.
          </p>

          {/* Filter pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {difficultyFilters.map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setFilter(level)}
                className={`font-mono text-xs uppercase tracking-wider px-4 py-2 rounded-full border transition-all duration-200 ${
                  filter === level
                    ? "bg-foreground text-background border-foreground"
                    : "bg-transparent text-foreground/50 border-foreground/15 hover:border-foreground/30 hover:text-foreground/80"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
          {filtered.length === 0 ? (
            <p className="text-center text-foreground/40 font-mono text-sm py-16">
              No certifications at this level yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((cert, i) => (
                <CertificationCard key={cert.slug} cert={cert} index={i} />
              ))}
            </div>
          )}

          {/* Coming soon note */}
          <div className="mt-16 border border-foreground/10 p-8 text-center">
            <p className="font-mono text-xs uppercase tracking-widest text-foreground/35 mb-3">
              Coming soon
            </p>
            <p className="text-foreground/50 text-sm max-w-sm mx-auto">
              More certifications are in development. All certifications will integrate with the Claude Certified Architect game for hands-on practice.
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
