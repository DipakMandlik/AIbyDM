"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BrandWordmark } from "@/components/site/brand-wordmark";
import { Button } from "@/components/ui/button";
import { CommandSearch } from "@/components/site/command-search";
import { Menu, X } from "lucide-react";

export const productLinks = [
  { name: "Learn", href: "/learn", desc: "Structured AI tracks" },
  { name: "Tools", href: "/tools", desc: "Discover AI tools" },
  { name: "Games", href: "/games", desc: "Play to learn" },
  { name: "Exams", href: "/exams", desc: "Interview prep" },
  { name: "Newsletter", href: "/newsletter", desc: "Weekly editions" },
  { name: "Community", href: "/community", desc: "Open source" },
];

export function SiteNav({ variant = 'default' }: { variant?: 'default' | 'compact' }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const compact = variant === 'compact';
  const condensed = compact || isScrolled;

  useEffect(() => {
    if (compact) return;
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [compact]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMobileMenuOpen(false);
    };

    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`fixed z-50 transition-all duration-500 ${
        compact ? "left-0 right-0 top-0" : isScrolled ? "top-4 left-4 right-4" : "top-0 left-0 right-0"
      }`}
    >
      <nav
        className={`mx-auto transition-all duration-500 ${
          compact
            ? "max-w-none border-b border-foreground/10 bg-background/95 shadow-sm backdrop-blur-xl"
            : isScrolled || isMobileMenuOpen
            ? "bg-background/80 backdrop-blur-xl border border-foreground/10 rounded-2xl shadow-lg max-w-[1200px]"
            : "bg-transparent max-w-[1400px]"
        }`}
      >
        <div
          className={`flex items-center justify-between transition-all duration-500 px-6 lg:px-8 ${
            compact ? "h-14" : isScrolled ? "h-14" : "h-20"
          }`}
        >
          <BrandWordmark compact={condensed} />

          <div className={`hidden md:flex items-center ${compact ? "gap-6" : "gap-9"}`}>
            {productLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-foreground/70 hover:text-foreground transition-colors duration-300 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <CommandSearch />
            <Button
              asChild
              size="sm"
              className={`bg-foreground hover:bg-foreground/90 text-background rounded-full transition-all duration-500 ${
                condensed ? "px-4 h-8 text-xs" : "px-6"
              }`}
            >
              <Link href="/learn">Start learning</Link>
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="min-h-11 min-w-11 p-2 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`md:hidden fixed inset-0 bg-background z-40 transition-all duration-500 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ top: 0 }}
      >
        <div className={`flex h-full flex-col px-8 pb-8 ${compact ? "pt-24" : "pt-28"}`}>
          <div className="flex-1 flex flex-col justify-center gap-6">
            {productLinks.map((link, i) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-4xl font-display text-foreground hover:text-muted-foreground transition-all duration-500 ${
                  isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: isMobileMenuOpen ? `${i * 60}ms` : "0ms" }}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/search"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-4xl font-display text-foreground hover:text-muted-foreground transition-all duration-500 ${
                isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: isMobileMenuOpen ? "360ms" : "0ms" }}
            >
              Search
            </Link>
          </div>

          <div
            className={`flex gap-4 pt-8 border-t border-foreground/10 transition-all duration-500 ${
              isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: isMobileMenuOpen ? "300ms" : "0ms" }}
          >
            <Button
              asChild
              className="flex-1 bg-foreground text-background rounded-full h-14 text-base"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Link href="/learn">Start learning</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
