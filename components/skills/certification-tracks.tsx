"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CertificationCard } from "@/components/skills/certification-card";
import { type Certification } from "@/lib/skills-data";

type CertificationTracksProps = {
  certifications: Certification[];
};

export function CertificationTracks({ certifications }: CertificationTracksProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 border-b border-foreground/8 bg-foreground/[0.015]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-foreground/40 mb-2">
              Certifications
            </p>
            <h2 className="font-display text-3xl lg:text-4xl text-foreground">
              Credentials that matter
            </h2>
          </div>
          <Link
            href="/skills/certifications"
            className="hidden sm:flex items-center gap-1.5 font-mono text-xs text-foreground/40 hover:text-foreground/70 transition-colors duration-200"
          >
            All certifications
            <span>→</span>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map((cert, i) => (
            <div
              key={cert.slug}
              className={`transition-all duration-500 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <CertificationCard cert={cert} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
