"use client";

import { useInView } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#01";

/** Text that decodes from random glyphs; replays on hover. */
export function Scramble({
  text,
  className,
  duration = 700,
  delay = 0,
  hover = true,
}: {
  text: string;
  className?: string;
  duration?: number;
  delay?: number;
  hover?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [out, setOut] = useState(text);
  const raf = useRef(0);

  const run = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    cancelAnimationFrame(raf.current);
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      let s = "";
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (ch === " " || i / text.length < p) s += ch;
        else s += CHARS[(Math.random() * CHARS.length) | 0];
      }
      setOut(s);
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  }, [text, duration]);

  useEffect(() => {
    if (!inView) return;
    const id = setTimeout(run, delay);
    return () => clearTimeout(id);
  }, [inView, run, delay]);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  return (
    <span ref={ref} className={className} onPointerEnter={hover ? run : undefined} aria-label={text}>
      <span aria-hidden>{out}</span>
    </span>
  );
}
