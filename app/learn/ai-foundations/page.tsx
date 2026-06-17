import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "AI Foundations is now AI From Scratch - AIByDM Learn",
  description: "AIByDM's flagship AI Foundations path is now the deeper AI From Scratch guided curriculum.",
};

export default function AiFoundationsMovedPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <SiteNav />
      <section className="border-b border-foreground/10 pt-36 pb-20 lg:pt-44 lg:pb-28">
        <div className="mx-auto max-w-[900px] px-6 lg:px-12">
          <p className="mb-5 font-mono text-xs uppercase tracking-widest text-muted-foreground">Learn update</p>
          <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-tight">AI Foundations is now AI From Scratch.</h1>
          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-muted-foreground">
            The introductory AI path has been rebuilt into a full phase-based curriculum with lesson progress, completion tracking, and a guided next step after every lesson.
          </p>
          <Button asChild size="lg" className="mt-10 h-14 rounded-full bg-foreground px-8 text-base text-background hover:bg-foreground/90">
            <Link href="/learn/ai-from-scratch">
              Open AI From Scratch
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
