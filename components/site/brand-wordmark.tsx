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
        <span className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-cyan-300/55 bg-[#061316] text-[10px] font-black tracking-tight text-cyan-100 shadow-[0_0_24px_rgba(6,182,212,0.34)] transition-all duration-300 group-hover/brand:border-orange-300/70 group-hover/brand:shadow-[0_0_30px_rgba(249,115,22,0.34)]">
          <span className="absolute inset-0 brand-logo-tubes" />
          <span className="absolute inset-x-1 top-2 h-px bg-cyan-200/65 shadow-[0_0_12px_rgba(34,211,238,0.9)]" />
          <span className="absolute inset-y-1 left-2 w-px bg-orange-300/55 shadow-[0_0_12px_rgba(251,146,60,0.8)]" />
          <span className="relative">AI</span>
        </span>
        <span className="flex items-baseline gap-1.5">
          <span
            className={`brand-wordmark-text font-black tracking-tight text-foreground transition-all duration-300 ${
              compact ? "text-xl" : "text-2xl"
            }`}
          >
            AIByDM
          </span>
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-700 transition-colors duration-300 group-hover/brand:text-orange-600">
            /ai
          </span>
        </span>
        <span className="absolute -bottom-1 left-10 h-px w-0 bg-gradient-to-r from-cyan-400 via-orange-300 to-transparent shadow-[0_0_14px_rgba(34,211,238,0.8)] transition-all duration-500 group-hover/brand:w-[calc(100%-2.5rem)]" />
      </span>
    </Link>
  );
}
