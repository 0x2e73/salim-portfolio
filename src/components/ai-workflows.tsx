"use client";

import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { AI_PRINCIPLES, TERMINAL_LINES } from "@/data/content";
import { MaskLine, SectionLabel } from "./reveal";

const EASE = [0.16, 1, 0.3, 1] as const;

const TONE: Record<string, string> = {
  dim: "text-fog",
  ok: "text-paper/85",
  accent: "text-accent",
  warn: "text-amber-300",
};

function Terminal({ shown }: { shown: number }) {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-[#0a0a0b] shadow-[0_60px_160px_-40px_rgba(204,255,61,0.15)]">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-white/10" />
          <span className="size-2.5 rounded-full bg-white/10" />
          <span className="size-2.5 rounded-full bg-white/10" />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-fog">salim@studio — workflow</span>
        <span className="font-mono text-[10px] text-accent tabular-nums">
          {String(Math.min(shown, TERMINAL_LINES.length)).padStart(2, "0")}/{TERMINAL_LINES.length}
        </span>
      </div>
      <div className="min-h-[300px] space-y-1.5 overflow-x-auto p-4 font-mono text-[10.5px] leading-relaxed sm:min-h-[400px] sm:p-6 sm:text-[13px]">
        {TERMINAL_LINES.map((l, i) => (
          <motion.div
            key={i}
            initial={false}
            animate={i < shown ? { opacity: 1, x: 0, filter: "blur(0px)" } : { opacity: 0, x: -6, filter: "blur(4px)" }}
            transition={{ duration: 0.35, ease: EASE }}
            className={`whitespace-pre ${TONE[l.tone ?? ""] ?? "text-paper"}`}
          >
            {l.t}
          </motion.div>
        ))}
        {shown < TERMINAL_LINES.length && <span className="caret" />}
      </div>
    </div>
  );
}

export function AiWorkflows() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.6", "end 0.7"] });
  const [shown, setShown] = useState(0);
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setShown(Math.round(v * 1.15 * TERMINAL_LINES.length));
    setActive(Math.min(AI_PRINCIPLES.length - 1, Math.floor(v * AI_PRINCIPLES.length)));
  });

  const glowX = useTransform(scrollYProgress, [0, 1], ["-20%", "60%"]);

  return (
    <section id="ia" className="relative overflow-hidden border-y border-line bg-[#09090a] py-28 md:py-40">
      <motion.div
        aria-hidden
        style={{ x: glowX }}
        className="pointer-events-none absolute -top-40 left-0 size-[700px] rounded-full bg-accent/[0.045] blur-[140px]"
      />

      <div className="relative mx-auto max-w-[1600px] px-4 sm:px-8">
        <SectionLabel n="03">Intelligence artificielle</SectionLabel>
        <h2 className="mt-6 max-w-[16ch] text-[clamp(2.6rem,7.4vw,7.6rem)] font-semibold leading-[0.9] tracking-[-0.055em]">
          <MaskLine>Je ne fais pas</MaskLine>
          <MaskLine delay={0.06}>
            <span className="text-fog">« de l&apos;IA ».</span>
          </MaskLine>
          <MaskLine delay={0.12}>Je construis des</MaskLine>
          <MaskLine delay={0.18}>
            workflows <span className="font-serif font-normal italic tracking-[-0.02em] text-accent">fiables.</span>
          </MaskLine>
        </h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE, delay: 0.3 }}
          className="mt-8 max-w-[56ch] text-pretty text-lg leading-relaxed text-paper/75 md:text-xl"
        >
          Un agent qui écrit du code, tout le monde sait le lancer. Ce qui compte, c&apos;est qu&apos;il livre la bonne chose, sans rien casser, et qu&apos;on puisse le prouver. C&apos;est comme ça que j&apos;ai livré 2 133 commits en onze semaines sans perdre la maîtrise du produit.
        </motion.p>

        <div ref={ref} className="mt-20 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <ol className="min-w-0 space-y-2 lg:col-span-5">
            {AI_PRINCIPLES.map((p, i) => {
              const on = i === active;
              return (
                <li key={p.n} className="lg:min-h-[26vh]">
                  <motion.div
                    animate={{ opacity: on ? 1 : 0.35 }}
                    transition={{ duration: 0.5 }}
                    className="border-t border-line py-6"
                  >
                    <div className="flex items-baseline gap-4">
                      <span className={`font-mono text-[11px] transition-colors duration-500 ${on ? "text-accent" : "text-fog"}`}>{p.n}</span>
                      <h3 className="text-2xl font-semibold tracking-[-0.03em] text-paper sm:text-3xl">{p.title}</h3>
                    </div>
                    <p className="mt-3 max-w-[46ch] pl-0 text-[15px] sm:pl-9 leading-relaxed text-paper/70">{p.body}</p>
                  </motion.div>
                </li>
              );
            })}
          </ol>

          <div className="min-w-0 lg:col-span-7">
            <div className="lg:sticky lg:top-[18vh]">
              <Terminal shown={shown} />
              <div className="mt-4 hidden grid-cols-3 gap-px sm:grid overflow-hidden rounded-lg border border-line bg-line font-mono text-[10px] uppercase tracking-[0.14em]">
                {["Spec → plan", "Agents // parallèle", "Vérifié, puis livré"].map((s, i) => (
                  <div key={s} className={`bg-[#0a0a0b] px-3 py-3 transition-colors duration-500 ${shown > (i + 1) * 3 ? "text-accent" : "text-fog"}`}>
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
