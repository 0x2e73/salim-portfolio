"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

/**
 * Small accent dot + a ring that grows over interactive elements.
 * Elements can set data-cursor="label" to show a label inside the ring.
 */
export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 500, damping: 40, mass: 0.6 });
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [down, setDown] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = (e.target as HTMLElement)?.closest?.("a, button, [data-cursor]") as HTMLElement | null;
      setHover(!!el);
      setLabel(el?.dataset.cursor ?? null);
    };
    const d = () => setDown(true);
    const u = () => setDown(false);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", d);
    window.addEventListener("pointerup", u);
    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", d);
      window.removeEventListener("pointerup", u);
    };
  }, [x, y]);

  if (!enabled) return null;

  const size = label ? 88 : hover ? 44 : 22;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[70] flex items-center justify-center rounded-full border border-accent/70 font-mono text-[10px] uppercase tracking-[0.14em] text-ink"
        style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: size,
          height: size,
          backgroundColor: label ? "rgba(204,255,61,1)" : "rgba(204,255,61,0)",
          scale: down ? 0.85 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        {label}
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[70] size-1.5 rounded-full bg-accent"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: label ? 0 : 1 }}
      />
    </>
  );
}
