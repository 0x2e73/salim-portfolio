"use client";

import { motion } from "motion/react";
import { STACK } from "@/data/content";
import { SectionLabel } from "./reveal";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Stack() {
  return (
    <section className="mx-auto max-w-[1600px] px-4 py-28 sm:px-8 md:py-40">
      <SectionLabel n="04">Compétences</SectionLabel>
      <h2 className="mb-16 mt-6 max-w-[18ch] text-[clamp(2.2rem,5vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.05em]">
        Du schéma de base de données au serveur de production.
      </h2>
      <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {STACK.map((g, gi) => (
          <motion.div
            key={g.group}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, ease: EASE, delay: gi * 0.08 }}
            className="group relative bg-ink p-6 sm:p-8"
          >
            <div className="mb-8 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.14em]">
              <span className="text-accent">{g.group}</span>
              <span className="text-fog">{String(g.items.length).padStart(2, "0")}</span>
            </div>
            <ul className="space-y-2.5">
              {g.items.map((it) => (
                <li
                  key={it}
                  className="flex items-center gap-3 text-lg tracking-[-0.02em] text-paper/80 transition-all duration-300 hover:translate-x-1 hover:text-paper"
                >
                  <span className="h-px w-3 bg-line transition-all duration-300 group-hover:w-5 group-hover:bg-accent/60" />
                  {it}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
