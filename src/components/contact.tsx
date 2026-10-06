"use client";

import { motion, useMotionValue, useSpring, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { PROFILE } from "@/data/content";
import { SectionLabel } from "./reveal";
import { AsciiPortrait } from "./ascii-portrait";

function Magnetic({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });
  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * 0.3);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.3);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["12%", "0%"]);

  return (
    <section ref={ref} id="contact" className="relative overflow-hidden px-4 pb-8 pt-28 sm:px-8 md:pt-40">
      <AsciiPortrait
        src="/salim-cutout.png"
        rows={80}
        className="pointer-events-none absolute inset-y-0 right-0 hidden h-full w-[55%] opacity-35 [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)] md:block"
      />
      <div className="relative mx-auto max-w-[1600px]">
        <SectionLabel n="05">Contact</SectionLabel>

        <motion.h2
          style={{ x }}
          className="mt-8 whitespace-nowrap text-[clamp(4.5rem,19vw,20rem)] font-semibold leading-[0.8] tracking-[-0.065em] text-paper"
        >
          Parlons<span className="text-accent">.</span>
        </motion.h2>

        <div className="mt-14 grid gap-10 md:grid-cols-12">
          <p className="max-w-[40ch] text-pretty text-lg leading-relaxed text-paper/75 md:col-span-5">
            Un produit à sortir, une app métier à remplacer, un workflow IA à rendre fiable ? Écris-moi sur LinkedIn, je réponds vite.
          </p>
          <div className="flex flex-wrap items-start gap-4 md:col-span-7 md:justify-end">
            {[
              { label: "LinkedIn", href: PROFILE.linkedin, cursor: "Profil" },
              { label: "GitHub", href: PROFILE.github, cursor: "Code" },
            ].map((l) => (
              <Magnetic key={l.label}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor={l.cursor}
                  className="group relative inline-flex items-center gap-4 overflow-hidden rounded-full border border-paper/20 bg-ink/80 px-6 py-4 text-xl sm:px-8 sm:py-5 tracking-[-0.02em] text-paper backdrop-blur-md transition-colors hover:border-accent sm:text-4xl"
                >
                  <span className="absolute inset-0 origin-bottom scale-y-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
                  <span className="relative transition-colors duration-300 group-hover:text-ink">{l.label}</span>
                  <span className="relative text-accent transition-all duration-500 group-hover:rotate-45 group-hover:text-ink">↗</span>
                </a>
              </Magnetic>
            ))}
          </div>
        </div>

        <footer className="mt-28 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-fog">
          <span>© {new Date().getFullYear()} Salim Mouttaki</span>
          <span className="hidden md:inline">Portrait rendu en direct, caractère par caractère</span>
          <a href="#top" className="text-paper transition-colors hover:text-accent">
            Haut de page ↑
          </a>
        </footer>
      </div>
    </section>
  );
}
