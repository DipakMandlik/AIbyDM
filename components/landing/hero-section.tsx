"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { TubesBackground } from "./tubes-background";
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
    <section className="relative min-h-screen overflow-hidden bg-[#050608]">
      <TubesBackground className="min-h-screen rounded-b-[2rem] md:rounded-b-[3rem]">
        <div className="mx-auto flex min-h-screen max-w-[1400px] flex-col justify-center px-6 py-32 lg:px-12 lg:py-40">
          <div
            className={`mb-8 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="inline-flex items-center gap-3 text-sm font-mono text-white/70">
              <span className="h-px w-8 bg-cyan-300/60 shadow-[0_0_18px_rgba(34,211,238,0.9)]" />
              The platform to master AI
            </span>
          </div>

        <div className="mb-12">
          <h1
            className={`max-w-6xl text-[clamp(3rem,12vw,10rem)] font-display leading-[0.9] tracking-tight text-white drop-shadow-[0_0_38px_rgba(6,182,212,0.3)] transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="block text-white/78">AIByDM</span>
            <span className="block">
              <span className="relative inline-block brand-hero-wordmark">
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
                <span className="absolute -bottom-2 left-0 right-0 h-3 bg-cyan-300/20 shadow-[0_0_30px_rgba(34,211,238,0.55)]" />
              </span>{" "}
              AI
            </span>
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-end">
          <p
            className={`max-w-xl text-xl leading-relaxed text-white/72 transition-all delay-200 duration-700 lg:text-2xl ${
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
              className="h-14 rounded-full bg-white px-8 text-base text-[#050608] shadow-[0_0_34px_rgba(34,211,238,0.32)] hover:bg-cyan-50 group"
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
              className="h-14 rounded-full border-white/30 bg-white/5 px-8 text-base text-white backdrop-blur-md hover:bg-white/12"
            >
              <Link href="/tools">Explore tools</Link>
            </Button>
          </div>
        </div>
        </div>
      </TubesBackground>
    </section>
  );
}
