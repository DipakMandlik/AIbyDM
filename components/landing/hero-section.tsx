"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const words = ["learn", "build", "practice", "ship"];

function TypedText({
  text,
  delayOffset = 0,
  characterClassName = "",
}: {
  text: string;
  delayOffset?: number;
  characterClassName?: string;
}) {
  return (
    <span aria-hidden="true">
      {text.split("").map((char, index) => (
        <span
          key={`${text}-${index}`}
          className={`typewriter-char inline-block ${characterClassName}`}
          style={{ animationDelay: `${delayOffset + index * 50}ms` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

export function HeroSection() {
  const isVisible = true;
  const [wordIndex, setWordIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const activeWord = words[wordIndex];

  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-background text-foreground">
      <div className="absolute right-[-8%] top-[12%] hidden h-[72%] w-[56%] pointer-events-none md:block">
        <svg
          className="h-full w-full overflow-visible opacity-80"
          viewBox="0 0 800 620"
          fill="none"
          aria-hidden="true"
        >
          <path
            className={prefersReducedMotion ? "" : "hero-flow-path"}
            d="M44 410C168 176 343 121 510 244C626 329 694 262 756 172"
            stroke="url(#hero-flow-cyan)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            className={prefersReducedMotion ? "" : "hero-flow-path hero-flow-path-delay"}
            d="M72 438C206 230 360 198 498 294C606 369 690 350 762 276"
            stroke="url(#hero-flow-warm)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            className={prefersReducedMotion ? "" : "hero-flow-path hero-flow-path-slow"}
            d="M110 334C224 430 356 444 456 334C548 232 650 196 786 236"
            stroke="url(#hero-flow-soft)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="hero-flow-cyan" x1="44" y1="410" x2="756" y2="172" gradientUnits="userSpaceOnUse">
              <stop stopColor="#06b6d4" stopOpacity="0" />
              <stop offset="0.45" stopColor="#22d3ee" stopOpacity="0.62" />
              <stop offset="1" stopColor="#67e8f9" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="hero-flow-warm" x1="72" y1="438" x2="762" y2="276" gradientUnits="userSpaceOnUse">
              <stop stopColor="#f97316" stopOpacity="0" />
              <stop offset="0.5" stopColor="#fb923c" stopOpacity="0.28" />
              <stop offset="1" stopColor="#facc15" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="hero-flow-soft" x1="110" y1="334" x2="786" y2="236" gradientUnits="userSpaceOnUse">
              <stop stopColor="#a7f3d0" stopOpacity="0" />
              <stop offset="0.48" stopColor="#bae6fd" stopOpacity="0.46" />
              <stop offset="1" stopColor="#a7f3d0" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
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
            aria-label={`The place to ${activeWord} AI`}
            className={`max-w-6xl text-[clamp(3rem,12vw,10rem)] font-display leading-[0.92] tracking-normal transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="block" aria-hidden="true">The place to</span>
            <span className="mt-2 block md:mt-3" aria-hidden="true">
              <span className="inline-flex items-baseline gap-[0.16em]">
                <span className="relative inline-flex min-w-[7.1ch] items-baseline md:min-w-[7.6ch]">
                  <span key={wordIndex} className="inline-flex">
                    {prefersReducedMotion ? (
                      <span className="text-foreground drop-shadow-[0_0_18px_rgba(6,182,212,0.18)]">{activeWord}</span>
                    ) : (
                      <TypedText text={activeWord} characterClassName="text-foreground drop-shadow-[0_0_18px_rgba(6,182,212,0.18)]" />
                    )}
                  </span>
                  {prefersReducedMotion ? (
                    null
                  ) : <span className="typewriter-caret ml-2 h-[0.72em] w-[0.06em] bg-cyan-600" />}
                  <span className="absolute -bottom-2 left-0 h-2 w-full origin-left rounded-full bg-cyan-400/15 shadow-[0_0_28px_rgba(6,182,212,0.22)]" />
                </span>
                <span>AI</span>
              </span>
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
