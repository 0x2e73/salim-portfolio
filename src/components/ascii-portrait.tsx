"use client";

import { useEffect, useRef } from "react";

/**
 * Live ASCII portrait rendered on a 2D canvas.
 *
 * - The source image (a transparent cutout) is sampled once per resize into a
 *   grid of cells; each cell stores a density (0..1) and whether it belongs to
 *   the subject.
 * - Every frame, cells are displaced by a pseudo-3D parallax (bright cells sit
 *   "closer" and move more toward the pointer) plus a repulsion field around
 *   the cursor, then drawn from a pre-rendered glyph atlas.
 * - Around the cursor, glyphs light up in the accent color and scramble.
 */

const RAMP = " .,:;-~=+*cxoe%#&@";
const SCRAMBLE = "01<>/\\|{}[]$#%&*+=?!";
const ACCENT = "#ccff3d";
const BASE = "#ededee";

type Cell = {
  x: number;
  y: number;
  d: number; // density 0..1
  subject: boolean;
  reveal: number; // ms at which the cell settles
  ox: number; // current offset (spring)
  oy: number;
  vx: number;
  vy: number;
  seed: number;
};

type Props = {
  src: string;
  className?: string;
  /** Approx number of glyph rows the portrait spans. */
  rows?: number;
};

export function AsciiPortrait({ src, className, rows: targetRows = 112 }: Props) {
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
    let cellW = 6;
    let cellH = 10;
    let cols = 0;
    let rows = 0;
    let cells: Cell[] = [];
    let atlasBase: HTMLCanvasElement | null = null;
    let atlasAccent: HTMLCanvasElement | null = null;
    const glyphs = RAMP + SCRAMBLE;
    let raf = 0;
    let visible = true;
    let start = performance.now();

    // pointer in canvas px; target and smoothed
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999, active: false };
    // normalized look direction (-1..1)
    const look = { x: 0, y: 0, tx: 0, ty: 0 };

    const img = new Image();
    img.decoding = "async";
    img.src = src;

    function buildAtlas(color: string) {
      const a = document.createElement("canvas");
      const gw = Math.ceil(cellW * dpr);
      const gh = Math.ceil(cellH * dpr);
      a.width = gw * glyphs.length;
      a.height = gh;
      const g = a.getContext("2d")!;
      g.fillStyle = color;
      g.textBaseline = "middle";
      g.textAlign = "center";
      g.font = `500 ${Math.round(cellH * 0.92 * dpr)}px ${getComputedStyle(document.body).getPropertyValue("--font-geist-mono") || "ui-monospace"}, ui-monospace, monospace`;
      for (let i = 0; i < glyphs.length; i++) {
        g.fillText(glyphs[i], i * gw + gw / 2, gh / 2 + dpr * 0.5);
      }
      return a;
    }

    function sample() {
      if (!img.complete || !img.naturalWidth) return;
      if (width < 2 || height < 2) {
        cells = []; // canvas hidden (e.g. display:none on mobile)
        return;
      }
      // Grid resolution
      cellH = Math.max(6.5, Math.min(13, height / targetRows));
      cellW = cellH * 0.6;
      cols = Math.ceil(width / cellW);
      rows = Math.ceil(height / cellH);

      // Fit: scale so the head is large, crop the bottom of the torso.
      const ir = img.naturalWidth / img.naturalHeight;
      const mobile = width < 768;
      let dh = height * (mobile ? 1.05 : 1.28);
      let dw = dh * ir;
      if (dw > width * (mobile ? 1.4 : 0.95)) {
        dw = width * (mobile ? 1.4 : 0.95);
        dh = dw / ir;
      }
      const dx = mobile ? (width - dw) / 2 : width - dw * 0.92;
      const dy = height * (mobile ? 0.16 : 0.07) - dh * 0.085;

      const off = document.createElement("canvas");
      off.width = cols;
      off.height = rows;
      const o = off.getContext("2d", { willReadFrequently: true })!;
      o.drawImage(img, dx / cellW, dy / cellH, dw / cellW, dh / cellH);
      const data = o.getImageData(0, 0, cols, rows).data;

      const lum = new Float32Array(cols * rows);
      const alpha = new Float32Array(cols * rows);
      const inside: number[] = [];
      for (let i = 0; i < cols * rows; i++) {
        const r = data[i * 4], g = data[i * 4 + 1], b = data[i * 4 + 2], a = data[i * 4 + 3] / 255;
        lum[i] = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
        alpha[i] = a;
        if (a > 0.5) inside.push(lum[i]);
      }
      // Global rank (histogram equalization) inside the subject...
      inside.sort((p, q) => p - q);
      const n = inside.length || 1;
      const rank = (v: number) => {
        let lo = 0;
        let hi = n;
        while (lo < hi) {
          const mid = (lo + hi) >> 1;
          if (inside[mid] < v) lo = mid + 1;
          else hi = mid;
        }
        return lo / n;
      };

      // ...blended with local contrast (mean / std over a window of subject
      // cells), otherwise the large dark suit pushes the whole face to "@"
      // and glasses and beard disappear.
      const W = cols + 1;
      const S1 = new Float64Array(W * (rows + 1));
      const S2 = new Float64Array(W * (rows + 1));
      const SM = new Float64Array(W * (rows + 1));
      for (let y = 0; y < rows; y++) {
        let r1 = 0, r2 = 0, rm = 0;
        for (let x = 0; x < cols; x++) {
          const i = y * cols + x;
          const m = alpha[i] > 0.5 ? 1 : 0;
          r1 += lum[i] * m;
          r2 += lum[i] * lum[i] * m;
          rm += m;
          const k = (y + 1) * W + x + 1;
          S1[k] = S1[k - W] + r1;
          S2[k] = S2[k - W] + r2;
          SM[k] = SM[k - W] + rm;
        }
      }
      const rad = Math.max(3, Math.round(rows / 16));
      const box = (A: Float64Array, x0: number, y0: number, x1: number, y1: number) =>
        A[y1 * W + x1] - A[y0 * W + x1] - A[y1 * W + x0] + A[y0 * W + x0];

      const next: Cell[] = [];
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = y * cols + x;
          const a = alpha[i];
          let d = 0;
          const subject = a > 0.35;
          if (subject) {
            const x0 = Math.max(0, x - rad), x1 = Math.min(cols, x + rad + 1);
            const y0 = Math.max(0, y - rad), y1 = Math.min(rows, y + rad + 1);
            const cnt = Math.max(1, box(SM, x0, y0, x1, y1));
            const mean = box(S1, x0, y0, x1, y1) / cnt;
            const std = Math.sqrt(Math.max(0, box(S2, x0, y0, x1, y1) / cnt - mean * mean));
            const local = Math.min(1, Math.max(0, 0.5 + (lum[i] - mean) / (2.4 * std + 0.04)));
            const s = rank(lum[i]) * 0.45 + local * 0.55;
            d = (s < 0.12 ? 0.05 : Math.min(1, 0.02 + Math.pow(s, 1.25) * 0.98)) * Math.min(1, a * 1.2);
          }
          const seed = Math.random();
          // Background field: sparse dots on a lattice
          const isField = !subject && x % 3 === 0 && y % 2 === 0;
          if (!subject && !isField) continue;
          next.push({
            x: x * cellW,
            y: y * cellH,
            d: subject ? d : 0.04,
            subject,
            reveal: subject ? 250 + (y / rows) * 900 + seed * 500 : 100 + seed * 1400,
            ox: 0,
            oy: 0,
            vx: 0,
            vy: 0,
            seed,
          });
        }
      }
      cells = next;
      atlasBase = buildAtlas(BASE);
      atlasAccent = buildAtlas(ACCENT);
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      sample();
      // Paint once immediately (reduced motion, hidden tab, thumbnails).
      draw(reduce || document.hidden ? performance.now() + 99999 : performance.now());
    }

    function draw(now: number) {
      if (!atlasBase || !atlasAccent) return;
      const t = now - start;
      const c = ctx!;
      c.setTransform(1, 0, 0, 1, 0, 0);
      c.clearRect(0, 0, canvas!.width, canvas!.height);

      // smooth pointer + look
      pointer.x += (pointer.tx - pointer.x) * 0.18;
      pointer.y += (pointer.ty - pointer.y) * 0.18;
      look.x += (look.tx - look.x) * 0.06;
      look.y += (look.ty - look.y) * 0.06;

      const gw = Math.ceil(cellW * dpr);
      const gh = Math.ceil(cellH * dpr);
      const R = Math.max(110, Math.min(220, width * 0.13));
      const R2 = R * R;
      const scan = ((t * 0.00018) % 1.4) * height - height * 0.2; // scanline y
      const scrambleTick = Math.floor(t / 70);

      for (let k = 0; k < cells.length; k++) {
        const cell = cells[k];
        let d = cell.d;

        // parallax: brighter = closer = moves more
        const depth = cell.subject ? 0.35 + d * 0.9 : 0.15;
        const px = look.x * 22 * depth;
        const py = look.y * 12 * depth;

        // cursor repulsion (spring)
        const cx = cell.x + px + cellW / 2;
        const cy = cell.y + py + cellH / 2;
        const dx = cx - pointer.x;
        const dy = cy - pointer.y;
        const dist2 = dx * dx + dy * dy;
        let fx = 0;
        let fy = 0;
        let heat = 0;
        if (pointer.active && dist2 < R2) {
          const dist = Math.sqrt(dist2) || 1;
          const f = 1 - dist / R;
          heat = f * f;
          const push = heat * (cell.subject ? 26 : 34);
          fx = (dx / dist) * push;
          fy = (dy / dist) * push;
        }
        if (!reduce) {
          cell.vx += (fx - cell.ox) * 0.14;
          cell.vy += (fy - cell.oy) * 0.14;
          cell.vx *= 0.72;
          cell.vy *= 0.72;
          cell.ox += cell.vx;
          cell.oy += cell.vy;
        }

        // intro reveal
        const life = t - cell.reveal;
        if (life < 0) continue;
        const intro = life < 420;

        // scanline shimmer
        const sd = Math.abs(cell.y - scan);
        if (sd < 40) d = Math.min(1, d + (1 - sd / 40) * (cell.subject ? 0.18 : 0.12));

        let glyph: number;
        let accent = false;
        if (intro || (heat > 0.25 && ((cell.seed * 997 + scrambleTick) | 0) % 5 === 0)) {
          glyph = RAMP.length + (((cell.seed * 7919 + scrambleTick) | 0) % SCRAMBLE.length);
          accent = true;
        } else {
          const boosted = Math.min(1, d + heat * (cell.subject ? 0.45 : 0.6));
          glyph = Math.min(RAMP.length - 1, Math.round(boosted * (RAMP.length - 1)));
          accent = heat > 0.18 && cell.seed < heat * 1.4;
        }
        if (glyph === 0) continue;

        const alpha = cell.subject
          ? Math.min(1, 0.22 + d * 0.95 + heat * 0.5)
          : Math.min(0.9, 0.12 + heat * 0.9 + (sd < 40 ? 0.12 : 0));
        c.globalAlpha = intro ? Math.min(1, life / 420) * 0.9 : alpha;
        c.drawImage(
          accent ? atlasAccent : atlasBase,
          glyph * gw,
          0,
          gw,
          gh,
          Math.round((cell.x + px + cell.ox) * dpr),
          Math.round((cell.y + py + cell.oy) * dpr),
          gw,
          gh,
        );
      }
      c.globalAlpha = 1;
    }

    function loop(now: number) {
      raf = 0;
      if (!visible) return;
      draw(now);
      raf = requestAnimationFrame(loop);
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
      look.tx = Math.max(-1, Math.min(1, (e.clientX / window.innerWidth) * 2 - 1));
      look.ty = Math.max(-1, Math.min(1, (e.clientY / window.innerHeight) * 2 - 1));
    }
    function onLeave() {
      pointer.active = false;
      look.tx = 0;
      look.ty = 0;
    }

    // Touch devices: a slow idle wander instead of a cursor
    let wander = 0;
    function idle(now: number) {
      look.tx = Math.sin(now * 0.0005) * 0.6;
      look.ty = Math.cos(now * 0.0004) * 0.3;
      wander = requestAnimationFrame(idle);
    }

    img.onload = async () => {
      await document.fonts?.ready;
      resize();
      start = performance.now();
      kick();
    };

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
    } else if (!reduce) {
      wander = requestAnimationFrame(idle);
    }

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(wander);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [src, targetRows]);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
