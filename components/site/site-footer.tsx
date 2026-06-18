"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AnimatedWave } from "@/components/landing/animated-wave";
import { BrandWordmark } from "@/components/site/brand-wordmark";

const footerLinks = {
  Platform: [
    { name: "Learn", href: "/learn" },
    { name: "Tools", href: "/tools" },
    { name: "Games", href: "/games" },
    { name: "Exams", href: "/exams" },
  ],
  Resources: [
    { name: "Newsletter", href: "/newsletter" },
    { name: "Community", href: "/community" },
    { name: "Search", href: "/search" },
    { name: "Projects", href: "/learn" },
  ],
  OpenSource: [
    { name: "Contribute", href: "/community", badge: "Open" },
    { name: "Roadmap", href: "https://github.com/DipakMandlik/AIByDM/issues", external: true },
    { name: "Discussions", href: "https://github.com/DipakMandlik/AIByDM/discussions", external: true },
    { name: "Support", href: "https://github.com/DipakMandlik/AIByDM/issues", external: true },
  ],
  Legal: [
    { name: "MIT License", href: "https://github.com/DipakMandlik/AIByDM/blob/main/LICENSE", external: true },
    { name: "Security", href: "https://github.com/DipakMandlik/AIByDM/security", external: true },
    { name: "Code of Conduct", href: "https://github.com/DipakMandlik/AIByDM/blob/main/CODE_OF_CONDUCT.md", external: true },
  ],
};

const socialLinks = [
  { name: "GitHub", href: "https://github.com/DipakMandlik/AIByDM" },
  { name: "Discussions", href: "https://github.com/DipakMandlik/AIByDM/discussions" },
  { name: "Issues", href: "https://github.com/DipakMandlik/AIByDM/issues" },
];

export function SiteFooter() {
  return (
    <footer className="relative border-t border-foreground/10">
      <div className="absolute inset-0 h-64 opacity-20 pointer-events-none overflow-hidden">
        <AnimatedWave />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="py-16 lg:py-24">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-12 lg:gap-8">
            <div className="col-span-2">
              <BrandWordmark className="mb-6" />

              <p className="text-muted-foreground leading-relaxed mb-8 max-w-xs">
                The learning platform for the AI era. Master skills through structured
                tracks, real tools, and hands-on practice.
              </p>

              <div className="flex gap-6">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group"
                    rel="noreferrer"
                    target="_blank"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                ))}
              </div>
            </div>

            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="text-sm font-medium mb-6">{title}</h3>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      {"external" in link && link.external ? (
                        <a
                          href={link.href}
                          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                          rel="noreferrer"
                          target="_blank"
                        >
                          {link.name}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {link.name}
                          {"badge" in link && link.badge && (
                            <span className="rounded-full bg-foreground px-2 py-0.5 text-xs text-background">
                              {link.badge}
                            </span>
                          )}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="py-8 border-t border-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            2026 AIByDM. Learn in the open.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              New lessons shipped weekly
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
