"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { MANIFESTO, MANIFESTO_EMPHASIS } from "@/data/content";

const EMPHASIS = new Set(MANIFESTO_EMPHASIS);

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const y = useTransform(progress, range, [8, 0]);
  const em = EMPHASIS.has(word);
  return (
    <span className="relative mr-[0.25em] inline-block">
      <motion.span style={{ opacity, y }} className={em ? "font-serif italic text-accent" : undefined}>
        {word}
      </motion.span>
    </span>
  );
}

export function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.55"] });
  const words = MANIFESTO.split(" ");

  return (
    <section className="mx-auto max-w-[1600px] px-4 py-32 sm:px-8 md:py-48">
      <div className="mb-10 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-fog">
        <span className="h-px w-10 bg-fog/50" />
        En deux phrases
      </div>
      <div ref={ref}>
        <p className="max-w-[22ch] text-[clamp(2rem,5.4vw,5.6rem)] font-medium leading-[1.02] tracking-[-0.04em] text-paper">
          {words.map((w, i) => (
            <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
          ))}
        </p>
      </div>
    </section>
  );
}
