"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { INDEX } from "@/data/content";

const EASE = [0.16, 1, 0.3, 1] as const;

export function ProjectIndex() {
  const [active, setActive] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 28 });
  const sy = useSpring(y, { stiffness: 260, damping: 28 });
  const current = active !== null ? INDEX[active] : null;
  const listRef = useRef<HTMLUListElement>(null);

  // pointerleave doesn't fire when the list scrolls away under a still cursor.
  useEffect(() => {
    if (active === null) return;
    const onScroll = () => {
      const el = document.elementFromPoint(x.get(), y.get());
      if (!el || !listRef.current?.contains(el)) setActive(null);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [active, x, y]);

  return (
    <section
      className="relative mx-auto max-w-[1600px] px-4 py-24 sm:px-8 md:py-36"
      onPointerMove={(e) => {
        x.set(e.clientX);
        y.set(e.clientY);
      }}
    >
      <div className="mb-10 flex items-end justify-between gap-4">
        <h3 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">Et aussi</h3>
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-fog">{INDEX.length} projets</span>
      </div>

      <ul ref={listRef} onPointerLeave={() => setActive(null)}>
        {INDEX.map((p, i) => {
          const Tag = p.href ? "a" : "div";
          return (
            <motion.li
              key={p.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.8, ease: EASE, delay: i * 0.03 }}
              onPointerEnter={() => setActive(i)}
              className="border-t border-line last:border-b"
            >
                <Tag
                  {...(p.href ? { href: p.href, target: "_blank", rel: "noreferrer", "data-cursor": "Ouvrir" } : {})}
                  className="group grid grid-cols-12 items-baseline gap-4 py-5 transition-colors duration-300 md:py-7"
                >
                  <span className="col-span-1 font-mono text-[11px] text-fog">{String(i + 1).padStart(2, "0")}</span>
                  <span className="col-span-11 text-2xl font-medium tracking-[-0.03em] text-paper transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3 sm:text-3xl md:col-span-5 md:text-4xl">
                    {p.name}
                    {p.href && <span className="ml-2 inline-block text-lg text-accent opacity-0 transition-opacity group-hover:opacity-100">↗</span>}
                  </span>
                  <span className="col-span-11 col-start-2 text-sm text-fog md:col-span-3 md:col-start-auto">{p.kind}</span>
                  <span className="hidden font-mono text-[11px] text-fog md:col-span-2 md:block">{p.stack}</span>
                  <span className="hidden text-right font-mono text-[11px] text-fog md:col-span-1 md:block">{p.year}</span>
                </Tag>
            </motion.li>
          );
        })}
      </ul>

      {/* floating preview */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-40 hidden md:block"
        style={{ x: sx, y: sy, translateX: "24px", translateY: "-50%" }}
      >
        <AnimatePresence mode="popLayout">
          {current && (
            <motion.div
              key={current.name}
              initial={{ opacity: 0, scale: 0.85, rotate: -4, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.9, filter: "blur(6px)" }}
              transition={{ duration: 0.45, ease: EASE }}
              className="relative h-[200px] w-[300px] overflow-hidden rounded-lg border border-white/10 bg-ink-2 shadow-2xl"
            >
              {current.image ? (
                <Image src={current.image} alt="" fill className="object-cover" sizes="300px" />
              ) : (
                <div className="flex h-full flex-col justify-between bg-accent p-5 text-ink">
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em]">{current.year}</span>
                  <span className="text-3xl font-semibold leading-none tracking-[-0.04em]">{current.name}</span>
                  <span className="font-mono text-[10px]">{current.stack}</span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
