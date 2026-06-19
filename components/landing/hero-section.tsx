"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { TubesBackground } from "./tubes-background";
import { AnimatedSphere } from "./animated-sphere";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const words = ["learn", "build", "practice", "ship"];

export function HeroSection() {
  const isVisible = true;
  const [wordIndex, setWordIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-background text-foreground">
      <div className="absolute right-[-12%] top-1/2 hidden h-[620px] w-[620px] -translate-y-1/2 pointer-events-none md:block lg:h-[820px] lg:w-[820px]">
        <TubesBackground
          tone="light"
          enableClickInteraction={false}
          className="h-full min-h-full rounded-full border border-cyan-500/10 shadow-[0_30px_120px_rgba(6,182,212,0.16)]"
        />
      </div>

      <div className="absolute right-0 top-1/2 hidden h-[600px] w-[600px] -translate-y-1/2 opacity-25 pointer-events-none md:block lg:h-[800px] lg:w-[800px]">
        <AnimatedSphere />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        {[...Array(8)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute h-px bg-foreground/10"
            style={{ top: `${12.5 * (i + 1)}%`, left: 0, right: 0 }}
          />
        ))}
        {[...Array(12)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute w-px bg-foreground/10"
            style={{ left: `${8.33 * (i + 1)}%`, top: 0, bottom: 0 }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 py-32 lg:px-12 lg:py-40">
        <div
          className={`mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground">
            <span className="h-px w-8 bg-foreground/30" />
            The platform to master AI
          </span>
        </div>

        <div className="mb-12">
          <h1
            className={`text-[clamp(3rem,12vw,10rem)] font-display leading-[0.9] tracking-tight transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="block">The place to</span>
            <span className="block">
              <span className="relative inline-block brand-wordmark-text">
                <span key={wordIndex} className="inline-flex">
                  {words[wordIndex].split("").map((char, i) => (
                    <span
                      key={`${wordIndex}-${i}`}
                      className={prefersReducedMotion ? "inline-block" : "inline-block animate-char-in"}
                      style={prefersReducedMotion ? undefined : { animationDelay: `${i * 50}ms` }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
                <span className="absolute -bottom-2 left-0 right-0 h-3 bg-cyan-400/15 shadow-[0_0_28px_rgba(6,182,212,0.22)]" />
              </span>{" "}
              AI
            </span>
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-end">
          <p
            className={`max-w-xl text-xl leading-relaxed text-muted-foreground transition-all delay-200 duration-700 lg:text-2xl ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Structured tracks, real tools, interactive games, and interview prep.
            Everything you need to go from curious to capable in the AI era.
          </p>

          <div
            className={`flex flex-col sm:flex-row items-start gap-4 transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Button
              asChild
              size="lg"
              className="group h-14 rounded-full bg-foreground px-8 text-base text-background hover:bg-foreground/90"
            >
              <Link href="/learn">
                Start learning free
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-14 rounded-full border-foreground/20 px-8 text-base hover:bg-foreground/5"
            >
              <Link href="/tools">Explore tools</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
