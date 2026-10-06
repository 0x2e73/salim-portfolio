import { STATS } from "@/data/content";

export function Marquee() {
  const row = [...STATS, ...STATS];
  return (
    <section aria-label="Chiffres" className="relative overflow-hidden border-y border-line bg-ink py-6">
      <div data-marquee className="flex w-max gap-14 pr-14" style={{ animation: "marquee 42s linear infinite" }}>
        {row.map((s, i) => (
          <div key={i} className="flex shrink-0 items-baseline gap-3" aria-hidden={i >= STATS.length}>
            <span className="text-4xl font-semibold tracking-[-0.04em] text-paper tabular-nums sm:text-5xl">{s.value}</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-fog">{s.label}</span>
            <span className="ml-10 text-accent">✳</span>
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink" />
    </section>
  );
}
