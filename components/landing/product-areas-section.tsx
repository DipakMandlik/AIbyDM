"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const areas = [
  {
    number: "01",
    name: "Learn",
    href: "/learn",
    headline: "Structured AI tracks",
    description:
      "Guided learning paths that take you from fundamentals to shipping real projects, with clear milestones and progress tracking.",
    meta: "4 tracks · 400+ lessons",
  },
  {
    number: "02",
    name: "Tools",
    href: "/tools",
    headline: "Discover the right tool",
    description:
      "A curated, searchable directory of AI tools. Compare, collect, and find open-source alternatives for any workflow.",
    meta: "360+ tools · 8 categories",
  },
  {
    number: "03",
    name: "Games",
    href: "/games",
    headline: "Learn by playing",
    description:
      "Interactive challenges that turn abstract AI concepts into muscle memory. Compete, climb, and come back daily.",
    meta: "6 games · daily rounds",
  },
  {
    number: "04",
    name: "Exams",
    href: "/exams",
    headline: "Guided interview prep",
    description:
      "Role-based preparation journeys that walk you through every stage of a real AI interview loop, not a question dump.",
    meta: "4 roles · 2.5k+ questions",
  },
  {
    number: "05",
    name: "Newsletter",
    href: "/newsletter",
    headline: "Stay current, weekly",
    description:
      "A publication, not a feed. Featured editions, a full issue archive, and topics you can follow at your own pace.",
    meta: "47 issues · weekly",
  },
  {
    number: "06",
    name: "Community",
    href: "/community",
    headline: "Build in the open",
    description:
      "An open-source contributor ecosystem. Improve lessons, add tools, and ship features alongside thousands of others.",
    meta: "Open source · all welcome",
  },
];

function AreaCard({ area, index }: { area: (typeof areas)[0]; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Link
      ref={ref}
      href={area.href}
      className={`group relative bg-background p-8 lg:p-10 flex flex-col min-h-[280px] transition-all duration-700 hover:bg-foreground/[0.02] ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="flex items-start justify-between mb-8">
        <span className="font-mono text-sm text-muted-foreground">{area.number}</span>
        <ArrowUpRight className="w-5 h-5 text-muted-foreground opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
      </div>

      <h3 className="text-3xl font-display mb-1 group-hover:translate-x-1 transition-transform duration-300">
        {area.name}
      </h3>
      <p className="text-lg text-foreground/80 mb-4">{area.headline}</p>
      <p className="text-sm text-muted-foreground leading-relaxed flex-1">
        {area.description}
      </p>

      <span className="mt-6 font-mono text-xs text-muted-foreground">{area.meta}</span>
    </Link>
  );
}

export function ProductAreasSection() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="platform" ref={ref} className="relative py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-16 lg:mb-20">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            The platform
          </span>
          <h2
            className={`text-4xl lg:text-6xl font-display tracking-tight transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Six ways to grow.
            <br />
            <span className="text-muted-foreground">One platform.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground/10 border border-foreground/10">
          {areas.map((area, index) => (
            <AreaCard key={area.number} area={area} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
