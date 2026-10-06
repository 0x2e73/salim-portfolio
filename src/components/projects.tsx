"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";

function useDesktop() {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const on = () => setDesktop(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return desktop;
}
import { FEATURED, type Project } from "@/data/content";
import { AgentsVisual, ErpVisual, LeanVisual, SayBackVisual } from "./project-visuals";
import { MaskLine, SectionLabel } from "./reveal";
import { Scramble } from "./scramble";

const VISUALS = {
  erp: ErpVisual,
  leanppc: LeanVisual,
  sayback: SayBackVisual,
  agents: AgentsVisual,
};

function Card({ p, i, total, progress }: { p: Project; i: number; total: number; progress: MotionValue<number> }) {
  // As later cards arrive, earlier ones recede.
  const start = i / total;
  const scale = useTransform(progress, [start, 1], [1, 1 - (total - i) * 0.04]);
  const dim = useTransform(progress, [start, start + 1 / total, 1], [0, 0.15, 0.55]);
  const Visual = VISUALS[p.visual];
  const desktop = useDesktop();

  return (
    <div
      className="relative flex justify-center px-3 py-3 sm:px-6 lg:sticky lg:top-0 lg:h-[100svh] lg:items-center lg:py-0"
      style={desktop ? { paddingTop: `${4 + i * 1.2}vh` } : undefined}
    >
      <motion.article
        style={desktop ? { scale } : undefined}
        className="relative grid w-full lg:h-[86svh] max-w-[1500px] origin-top grid-rows-[auto_1fr] gap-6 overflow-hidden rounded-2xl border border-line bg-ink-2 p-5 sm:p-8 lg:grid-cols-12 lg:grid-rows-1 lg:gap-10 lg:p-10"
      >
        <div className="flex min-h-0 flex-col lg:col-span-5">
          <div>
            <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-fog">
              <span>
                <span className="text-accent">{p.index}</span> / 0{total}
              </span>
              <span className="rounded-full border border-line px-2.5 py-1 text-paper">{p.status}</span>
            </div>
            <h3 className="mt-6 text-[clamp(2.6rem,6vw,6rem)] font-semibold leading-[0.9] tracking-[-0.05em] text-paper lg:mt-10">
              <MaskLine>{p.name}</MaskLine>
            </h3>
            <p className="mt-3 font-serif text-[clamp(1.3rem,2.2vw,2rem)] italic leading-tight text-accent">{p.tagline}</p>
            <p className="mt-5 max-w-[48ch] text-pretty text-[15px] leading-relaxed text-paper/70 lg:text-base">{p.description}</p>
          </div>

          <div className="mt-8 hidden min-h-0 flex-1 flex-col lg:flex">
            <ul className="divide-y divide-line border-y border-line">
              {p.features.map((f, k) => (
                <motion.li
                  key={f.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 + k * 0.06 }}
                  className="group/f flex items-baseline gap-4 py-3 transition-colors duration-300 xl:py-3.5"
                >
                  <span className="w-6 shrink-0 font-mono text-[10px] text-fog transition-colors group-hover/f:text-accent">
                    {String(k + 1).padStart(2, "0")}
                  </span>
                  <span className="shrink-0 text-[15px] font-medium tracking-[-0.01em] text-paper transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/f:translate-x-1 xl:text-base">
                    {f.title}
                  </span>
                  <span className="ml-auto truncate text-right text-[13px] text-fog">{f.body}</span>
                </motion.li>
              ))}
            </ul>
            <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-6">
              <span className="font-mono text-[11px] text-fog">{p.stack.join(" · ")}</span>
              {p.href ? (
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="Voir"
                  className="font-mono text-[12px] text-paper underline decoration-paper/30 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                >
                  <Scramble text={`${p.hrefLabel} ↗`} />
                </a>
              ) : (
                p.hrefLabel && <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-paper/60">{p.hrefLabel}</span>
              )}
            </div>
          </div>
        </div>

        <div className="relative aspect-[4/3.4] min-h-0 sm:aspect-[16/11] lg:col-span-7 lg:aspect-auto">
          <Visual />
        </div>

        {desktop && <motion.div style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-ink" />}
      </motion.article>
    </div>
  );
}

export function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section id="projets" className="relative">
      <div className="mx-auto max-w-[1600px] px-4 pb-10 pt-24 sm:px-8 md:pt-32">
        <SectionLabel n="02">Projets</SectionLabel>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <h2 className="text-[clamp(3rem,9vw,9rem)] font-semibold leading-[0.88] tracking-[-0.055em]">
            <MaskLine>Mis en</MaskLine>
            <MaskLine delay={0.08}>
              <span className="font-serif font-normal italic tracking-[-0.02em] text-accent">production.</span>
            </MaskLine>
          </h2>
          <p className="max-w-[34ch] pb-3 text-fog">
            Quatre projets qui tournent pour de vrai : une app métier, un SaaS Shopify, un logiciel open source et des agents autonomes.
          </p>
        </div>
      </div>

      <div ref={ref} className="relative">
        {FEATURED.map((p, i) => (
          <Card key={p.slug} p={p} i={i} total={FEATURED.length} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}
