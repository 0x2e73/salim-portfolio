"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Line of text that slides up from a mask. */
export function MaskLine({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    // Observe the (unclipped) wrapper: the inner span starts outside the mask,
    // so it would never intersect on its own.
    <motion.span
      className={`block overflow-hidden ${className ?? ""}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
    >
      <motion.span
        className="block"
        variants={{ hidden: { y: "105%" }, show: { y: "0%" } }}
        transition={{ duration: 1, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}

export function SectionLabel({ n, children }: { n: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-fog">
      <span className="text-accent">{n}</span>
      <span className="h-px w-10 bg-fog/40" />
      {children}
    </div>
  );
}
