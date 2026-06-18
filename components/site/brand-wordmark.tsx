import Link from "next/link";

type BrandWordmarkProps = {
  compact?: boolean;
  className?: string;
};

export function BrandWordmark({ compact = false, className = "" }: BrandWordmarkProps) {
  return (
    <Link
      href="/"
      className={`group/brand inline-flex min-h-11 items-center gap-2 rounded-full outline-none transition-transform duration-300 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-cyan-500 ${className}`}
      aria-label="AIByDM home"
    >
      <span className="relative flex items-center gap-2">
        <span className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-cyan-400/35 bg-cyan-50 text-[10px] font-black tracking-tight text-cyan-700 shadow-[0_0_24px_rgba(6,182,212,0.18)] transition-all duration-300 group-hover/brand:border-cyan-500 group-hover/brand:bg-cyan-100">
          <span className="absolute inset-x-1 top-2 h-px bg-cyan-500/45" />
          <span className="absolute inset-y-1 left-2 w-px bg-cyan-500/35" />
          <span className="relative">AI</span>
        </span>
        <span className="flex items-baseline gap-1.5">
          <span
            className={`brand-wordmark-text font-black tracking-tight text-foreground transition-all duration-300 group-hover/brand:text-cyan-700 ${
              compact ? "text-xl" : "text-2xl"
            }`}
          >
            AIByDM
          </span>
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-700 transition-colors duration-300 group-hover/brand:text-foreground">
            /ai
          </span>
        </span>
        <span className="absolute -bottom-1 left-10 h-px w-0 bg-gradient-to-r from-cyan-500 via-foreground to-transparent transition-all duration-500 group-hover/brand:w-[calc(100%-2.5rem)]" />
      </span>
    </Link>
  );
}
