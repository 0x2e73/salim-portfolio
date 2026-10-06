"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { AsciiPortrait } from "./ascii-portrait";
import { PROFILE } from "@/data/content";

const EASE = [0.16, 1, 0.3, 1] as const;

function Letters({ text, delay, className }: { text: string; delay: number; className?: string }) {
  return (
    <span className={`inline-flex overflow-hidden ${className ?? ""}`} aria-label={text}>
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block"
          initial={{ y: "110%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 1.1, ease: EASE, delay: delay + i * 0.045 }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

function PointerReadout() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const m = (e: PointerEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("pointermove", m, { passive: true });
    return () => window.removeEventListener("pointermove", m);
  }, []);
  return (
    <span className="tabular-nums">
      x {String(Math.round(pos.x)).padStart(4, "0")} · y {String(Math.round(pos.y)).padStart(4, "0")}
    </span>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);
  const canvasY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const canvasOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section ref={ref} id="top" className="relative h-[100svh] min-h-[640px] overflow-hidden">
      <motion.div style={{ y: canvasY, opacity: canvasOpacity, scale }} className="absolute inset-0">
        <AsciiPortrait src="/salim-cutout.png" className="absolute inset-0 h-full w-full opacity-60 md:opacity-100" />
        {/* soft fade into the page */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink to-transparent" />
      </motion.div>

      <motion.div
        style={{ y: textY }}
        className="relative z-10 flex h-full flex-col justify-between px-4 pb-8 pt-24 sm:px-8 sm:pb-10"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex flex-col gap-1 font-mono text-[11px] uppercase tracking-[0.14em] text-fog"
        >
          <span className="flex items-center gap-2 text-paper">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            Ouvert aux missions
          </span>
          <span>{PROFILE.location} · 46.20°N 6.14°E</span>
          <span className="hidden md:inline">
            <PointerReadout />
          </span>
        </motion.div>

        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 1.1 }}
            className="mb-6 max-w-[34ch] text-pretty text-lg leading-snug text-paper/90 sm:text-xl md:mb-8"
          >
            {PROFILE.lead}
          </motion.p>

          <h1 className="font-sans text-[18vw] md:text-[clamp(3.5rem,13vw,13rem)] font-semibold leading-[0.82] tracking-[-0.055em] text-paper">
            <Letters text={PROFILE.first} delay={0.35} />
            <br />
            <Letters text={PROFILE.last} delay={0.55} className="pb-[0.06em]" />
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="mt-6 flex flex-wrap items-end justify-between gap-4 border-t border-line pt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-fog"
          >
            <span className="text-paper">{PROFILE.role} · Produit · IA</span>
            <a href="#travail" className="group inline-flex items-center gap-2 text-paper" data-cursor="Go">
              Défiler
              <span className="inline-block transition-transform duration-500 ease-out group-hover:translate-y-1">↓</span>
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
