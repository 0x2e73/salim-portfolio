"use client";

import { motion } from "motion/react";
import { EDUCATION, EXPERIENCE, type Experience as Exp } from "@/data/content";
import { MaskLine, Reveal, SectionLabel } from "./reveal";
import { Scramble } from "./scramble";

const EASE = [0.16, 1, 0.3, 1] as const;

function Row({ e, i }: { e: Exp; i: number }) {
  return (
    <motion.article
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-15% 0px" }}
      className="group relative grid gap-6 border-t border-line py-10 md:grid-cols-12 md:gap-10 md:py-16"
    >
      {/* accent line that draws on enter */}
      <motion.span
        variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1 } }}
        transition={{ duration: 1.4, ease: EASE }}
        className="absolute -top-px left-0 h-px w-full origin-left bg-accent/70"
      />

      <div className="md:col-span-5">
        <div className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-fog">
          <span className="text-paper/40">{String(i + 1).padStart(2, "0")}</span>
          <span>{e.period}</span>
          {e.duration && <span className="rounded-full border border-line px-2 py-0.5 text-paper">{e.duration}</span>}
        </div>
        <h3 className="text-[clamp(2.2rem,4.4vw,4rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-paper">
          <MaskLine>{e.company}</MaskLine>
        </h3>
        <p className="mt-3 font-mono text-[12px] uppercase tracking-[0.1em] text-accent">
          <Scramble text={e.role} />
        </p>
        <p className="mt-2 text-sm text-fog">{e.context}</p>
        {e.note && (
          <p className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-paper/60">
            <span className="size-1.5 rounded-full bg-accent" />
            {e.note}
          </p>
        )}
        {e.link && (
          <a
            href={e.link.href}
            target="_blank"
            rel="noreferrer"
            data-cursor="Ouvrir"
            className="mt-6 inline-flex items-center gap-2 border-b border-paper/30 pb-0.5 font-mono text-[12px] text-paper transition-colors hover:border-accent hover:text-accent"
          >
            {e.link.label} ↗
          </a>
        )}
      </div>

      <div className="md:col-span-7">
        <Reveal>
          <p className="max-w-[60ch] text-pretty text-lg leading-relaxed text-paper/90 md:text-xl">{e.summary}</p>
        </Reveal>

        <ul className="mt-8 space-y-3">
          {e.points.map((p, k) => (
            <motion.li
              key={k}
              variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0 } }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.25 + k * 0.08 }}
              className={`gap-4 text-[15px] leading-relaxed text-fog ${k > 1 ? "hidden md:flex" : "flex"}`}
            >
              <span className="mt-[0.7em] h-px w-4 shrink-0 bg-accent" />
              <span className="text-paper/75">{p}</span>
            </motion.li>
          ))}
        </ul>

        {e.metrics && (
          <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-4">
            {e.metrics.map((m, k) => (
              <motion.div
                key={m.label}
                variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.5 + k * 0.08 }}
                className="bg-ink p-5"
              >
                <div className="text-3xl font-semibold tracking-[-0.04em] text-paper tabular-nums">{m.value}</div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-fog">{m.label}</div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-8 hidden flex-wrap gap-2 md:flex">
          {e.stack.map((s) => (
            <span key={s} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-fog transition-colors duration-300 group-hover:border-paper/20 group-hover:text-paper/80">
              {s}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export function Experience() {
  return (
    <section id="travail" className="mx-auto max-w-[1600px] px-4 pb-24 sm:px-8 md:pb-40">
      <SectionLabel n="01">Travail</SectionLabel>
      <h2 className="mb-16 mt-6 text-[clamp(3rem,9vw,9rem)] font-semibold leading-[0.88] tracking-[-0.055em] md:mb-24">
        <MaskLine>Là où</MaskLine>
        <MaskLine delay={0.08}>
          j&apos;ai <span className="font-serif font-normal italic tracking-[-0.02em] text-accent">livré.</span>
        </MaskLine>
      </h2>

      <div>
        {EXPERIENCE.map((e, i) => (
          <Row key={e.company} e={e} i={i} />
        ))}
      </div>

      <div className="grid gap-6 border-t border-line pt-10 md:grid-cols-12">
        <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-fog md:col-span-5">Formation</div>
        <div className="space-y-4 md:col-span-7">
          {EDUCATION.map((ed) => (
            <Reveal key={ed.title} className="flex flex-wrap items-baseline justify-between gap-2">
              <span className="text-lg text-paper">{ed.title}</span>
              <span className="font-mono text-[12px] text-fog">
                {ed.school} · {ed.period}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
