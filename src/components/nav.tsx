"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "#travail", label: "Travail" },
  { href: "#projets", label: "Projets" },
  { href: "#ia", label: "IA" },
  { href: "#contact", label: "Contact" },
];

function useGenevaTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("fr-CH", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Europe/Zurich",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export function Nav() {
  const time = useGenevaTime();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(v > prev && v > 400);
  });

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: hidden ? -80 : 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: hidden ? 0 : 0.2 }}
      className="fixed inset-x-0 top-0 z-50 mix-blend-difference"
    >
      <nav className="flex items-center justify-between px-4 py-5 font-mono text-[11px] uppercase tracking-[0.14em] text-paper sm:px-8">
        <a href="#top" className="flex items-center gap-2" aria-label="Retour en haut">
          <span className="inline-block size-2 bg-paper" />
          <span>Salim Mouttaki</span>
        </a>
        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((l, i) => (
            <li key={l.href}>
              <a href={l.href} className="group relative inline-flex gap-1.5">
                <span className="text-paper/40">0{i + 1}</span>
                <span className="relative">
                  {l.label}
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-paper transition-transform duration-300 ease-out group-hover:scale-x-100" />
                </span>
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3 tabular-nums">
          <span className="hidden sm:inline">GVA {time}</span>
          <a href="#contact" className="md:hidden">Contact</a>
        </div>
      </nav>
    </motion.header>
  );
}
