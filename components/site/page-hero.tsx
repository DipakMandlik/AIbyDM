export function PageHero({
  eyebrow,
  title,
  highlight,
  description,
  meta,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  description: string;
  meta?: { value: string; label: string }[];
}) {
  const isVisible = true;

  return (
    <section className="relative pt-36 lg:pt-44 pb-16 lg:pb-20 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        {[...Array(6)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute h-px bg-foreground/10"
            style={{ top: `${16.6 * (i + 1)}%`, left: 0, right: 0 }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            {eyebrow}
          </span>
        </div>

        <h1
          className={`text-[clamp(2.5rem,7vw,5.5rem)] font-display leading-[0.95] tracking-tight mb-8 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {title}
          {highlight && (
            <>
              <br />
              <span className="text-muted-foreground">{highlight}</span>
            </>
          )}
        </h1>

        <p
          className={`text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-2xl transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {description}
        </p>

        {meta && (
          <div
            className={`mt-12 flex flex-wrap gap-10 lg:gap-16 transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {meta.map((m) => (
              <div key={m.label}>
                <div className="text-3xl lg:text-4xl font-display">{m.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{m.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
