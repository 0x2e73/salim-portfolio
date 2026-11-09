"use client";

import { useEffect, useRef } from "react";

/**
 * Live ASCII relief rendered on a 2D canvas, drawn entirely in code.
 *
 * - An animated height field (a few layered sine waves) is sampled per cell
 *   every frame. Cells near a contour line are drawn with a glyph that follows
 *   the line's direction (- | / \), like an ASCII topographic map; every fifth
 *   contour is brighter, as on a real map.
 * - The pointer raises a hill in the field, so the contours wrap around it;
 *   near the pointer, glyphs light up in the accent color and scramble.
 * - Elsewhere, a sparse dot lattice keeps the surface readable.
 */

const LINES = "-\\|/"; // indexed by line direction, 45° bins
const RAMP = ".:";
const SCRAMBLE = "01<>/\\|{}[]$#%&*+=?!";
const ACCENT = "#ccff3d";
const BASE = "#ededee";
const GLYPHS = LINES + RAMP + SCRAMBLE;
const DOT = LINES.length;
const SCR = LINES.length + RAMP.length;

type Props = {
  className?: string;
  /** Approx number of glyph rows the field spans. */
  rows?: number;
  /** Fade the field toward the left edge, to keep text on top of it legible. */
  fadeLeft?: boolean;
};

export function AsciiField({ className, rows: targetRows = 72, fadeLeft = false }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let cellW = 7;
    let cellH = 12;
    let cols = 0;
    let rows = 0;
    let heights = new Float32Array(0);
    let seeds = new Float32Array(0);
    let reveals = new Float32Array(0);
    let fades = new Float32Array(0);
    let atlasBase: HTMLCanvasElement | null = null;
    let atlasAccent: HTMLCanvasElement | null = null;
    let raf = 0;
    let visible = true;
    // Frame pacing: never above ~60 fps (120 Hz screens would double the
    // work), and degrade on slow machines: 30 fps first, then a 1x canvas.
    let interval = 1000 / 60 - 2;
    let last = 0;
    let cost = 0;
    let slow = 0;
    let lowRes = false;
    let start = performance.now();

    // pointer in canvas px; target and smoothed
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999, active: false };

    function buildAtlas(color: string) {
      const a = document.createElement("canvas");
      const gw = Math.ceil(cellW * dpr);
      const gh = Math.ceil(cellH * dpr);
      a.width = gw * GLYPHS.length;
      a.height = gh;
      const g = a.getContext("2d")!;
      g.fillStyle = color;
      g.textBaseline = "middle";
      g.textAlign = "center";
      g.font = `500 ${Math.round(cellH * 0.92 * dpr)}px ${getComputedStyle(document.body).getPropertyValue("--font-geist-mono") || "ui-monospace"}, ui-monospace, monospace`;
      for (let i = 0; i < GLYPHS.length; i++) {
        g.fillText(GLYPHS[i], i * gw + gw / 2, gh / 2 + dpr * 0.5);
      }
      return a;
    }

    function layout() {
      if (width < 2 || height < 2) {
        cols = rows = 0; // canvas hidden (e.g. display:none on mobile)
        return;
      }
      cellH = Math.max(9, Math.min(15, height / targetRows));
      cellW = cellH * 0.6;
      cols = Math.ceil(width / cellW) + 1;
      rows = Math.ceil(height / cellH) + 1;
      const n = cols * rows;
      heights = new Float32Array(n);
      seeds = new Float32Array(n);
      reveals = new Float32Array(n);
      fades = new Float32Array(n);
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = y * cols + x;
          const s = Math.random();
          seeds[i] = s;
          // the relief draws itself in from the right, with some grain
          reveals[i] = 150 + (1 - x / cols) * 900 + s * 500;
          const u = x / cols;
          fades[i] = fadeLeft && width >= 768 ? 0.22 + 0.78 * Math.min(1, Math.max(0, (u - 0.18) / 0.5)) : 1;
        }
      }
      atlasBase = buildAtlas(BASE);
      atlasAccent = buildAtlas(ACCENT);
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = lowRes ? 1 : Math.min(window.devicePixelRatio || 1, 1.75);
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      layout();
      // Paint once immediately (reduced motion, hidden tab, thumbnails).
      draw(reduce || document.hidden ? performance.now() + 99999 : performance.now());
    }

    function draw(now: number) {
      if (!atlasBase || !atlasAccent || !cols) return;
      const t = now - start;
      const c = ctx!;
      c.setTransform(1, 0, 0, 1, 0, 0);
      c.clearRect(0, 0, canvas!.width, canvas!.height);

      // Touch devices: the hill wanders slowly on its own.
      if (coarse && !reduce) {
        pointer.tx = width * (0.62 + Math.sin(t * 0.00023) * 0.25);
        pointer.ty = height * (0.42 + Math.cos(t * 0.00017) * 0.22);
        if (!pointer.active) {
          pointer.x = pointer.tx;
          pointer.y = pointer.ty;
          pointer.active = true;
        }
      }
      pointer.x += (pointer.tx - pointer.x) * 0.12;
      pointer.y += (pointer.ty - pointer.y) * 0.12;

      const time = reduce ? 0 : t;
      const R = Math.max(120, Math.min(260, width * 0.16));
      const twoSigma2 = 2 * (R * 0.55) ** 2;
      const R2 = R * R;
      const scale = 3.2 / Math.max(height, 1);

      // 1. height field
      for (let y = 0; y < rows; y++) {
        const py = y * cellH + cellH / 2;
        const ny = py * scale;
        for (let x = 0; x < cols; x++) {
          const px = x * cellW + cellW / 2;
          const nx = px * scale;
          let h =
            0.55 * Math.sin(nx * 1.35 + time * 0.00011 + Math.sin(ny * 1.1 + time * 0.00007) * 1.4) +
            0.35 * Math.sin(ny * 2.1 - time * 0.00009 + nx * 0.7) +
            0.18 * Math.sin((nx + ny) * 3.3 + time * 0.00013);
          if (pointer.active) {
            const dx = px - pointer.x;
            const dy = py - pointer.y;
            h += 1.15 * Math.exp(-(dx * dx + dy * dy) / twoSigma2);
          }
          heights[y * cols + x] = h;
        }
      }

      // 2. glyphs
      const gw = Math.ceil(cellW * dpr);
      const gh = Math.ceil(cellH * dpr);
      const levels = 7; // contour lines per unit of height
      const scrambleTick = Math.floor(t / 70);

      for (let y = 1; y < rows - 1; y++) {
        for (let x = 1; x < cols - 1; x++) {
          const i = y * cols + x;
          const life = t - reveals[i];
          if (life < 0) continue;
          const intro = life < 420;
          const seed = seeds[i];

          const v = heights[i] * levels;
          const k = Math.floor(v);
          const f = v - k;
          // distance to the nearest contour, in height units, over the local slope
          const gx = (heights[i + 1] - heights[i - 1]) * levels;
          const gy = (heights[i + cols] - heights[i - cols]) * levels;
          const slope = Math.hypot(gx, gy) / 2 || 1e-3;
          const dist = Math.min(f, 1 - f) / slope; // in cells
          const onLine = dist < 0.55;

          const px = x * cellW + cellW / 2;
          const py = y * cellH + cellH / 2;
          let heat = 0;
          if (pointer.active) {
            const dx = px - pointer.x;
            const dy = py - pointer.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < R2) {
              const q = 1 - Math.sqrt(d2) / R;
              heat = q * q;
            }
          }

          let glyph: number;
          let accent = false;
          let alpha: number;
          if (intro || (onLine && heat > 0.3 && ((seed * 997 + scrambleTick) | 0) % 6 === 0)) {
            glyph = SCR + (((seed * 7919 + scrambleTick) | 0) % SCRAMBLE.length);
            accent = true;
            alpha = intro ? Math.min(1, life / 420) * 0.8 : 0.9;
          } else if (onLine) {
            // contour direction is perpendicular to the gradient
            // angle of (-gy, gx) in pixels, y down
            const a = Math.atan2(gx / cellW, -gy / cellH);
            const bin = ((Math.round(a / (Math.PI / 4)) % 4) + 4) % 4;
            glyph = bin;
            const index = ((k + 1) % 5 + 5) % 5 === 0;
            alpha = (index ? 0.85 : 0.42) * (1 - dist / 0.9) + heat * 0.5;
            accent = heat > 0.15 && seed < heat * 1.6;
          } else if (x % 3 === 0 && y % 2 === 0) {
            glyph = DOT;
            alpha = 0.1 + heat * 0.6;
            accent = heat > 0.35 && seed < heat;
          } else if (heat > 0.45 && seed < heat * 0.35) {
            glyph = DOT + 1;
            alpha = heat * 0.5;
            accent = true;
          } else {
            continue;
          }

          c.globalAlpha = Math.min(1, alpha) * fades[i];
          c.drawImage(
            accent ? atlasAccent : atlasBase,
            glyph * gw,
            0,
            gw,
            gh,
            Math.round(x * cellW * dpr),
            Math.round(y * cellH * dpr),
            gw,
            gh,
          );
        }
      }
      c.globalAlpha = 1;
    }

    function loop(now: number) {
      raf = 0;
      if (!visible) return;
      raf = requestAnimationFrame(loop);
      if (now - last < interval) return;
      last = now;
      const t0 = performance.now();
      draw(now);
      const spent = performance.now() - t0;
      cost = cost ? cost * 0.9 + spent * 0.1 : spent;
      if (cost < 8) {
        slow = 0;
        return;
      }
      if (++slow < 30) return;
      slow = 0;
      cost = 0;
      if (interval < 30) interval = 1000 / 30 - 2;
      else if (!lowRes && dpr > 1) {
        lowRes = true;
        resize();
      }
    }

    function kick() {
      if (!raf && visible && !reduce) raf = requestAnimationFrame(loop);
    }

    function onMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      pointer.tx = e.clientX - rect.left;
      pointer.ty = e.clientY - rect.top;
      if (!pointer.active) {
        pointer.x = pointer.tx;
        pointer.y = pointer.ty;
      }
      pointer.active = pointer.ty > -50 && pointer.ty < rect.height + 50;
      if (reduce) draw(performance.now() + 99999);
    }
    function onLeave() {
      pointer.active = false;
    }

    let cancelled = false;
    (document.fonts?.ready ?? Promise.resolve()).then(() => {
      if (cancelled) return;
      resize();
      start = performance.now();
      kick();
    });

    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && !document.hidden;
      if (visible) kick();
    });
    io.observe(canvas);

    const onVis = () => {
      visible = !document.hidden;
      if (visible) kick();
    };
    document.addEventListener("visibilitychange", onVis);

    if (!coarse) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [targetRows, fadeLeft]);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
