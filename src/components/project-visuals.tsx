"use client";

import { motion, useInView, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

function Frame({ children, title, className }: { children: React.ReactNode; title: string; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-lg border border-white/10 bg-ink-2 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] ${className ?? ""}`}>
      <div className="flex items-center gap-1.5 border-b border-white/5 px-3 py-2">
        <span className="size-2 rounded-full bg-white/15" />
        <span className="size-2 rounded-full bg-white/15" />
        <span className="size-2 rounded-full bg-white/15" />
        <span className="ml-3 truncate font-mono text-[10px] text-fog">{title}</span>
      </div>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 01 · App métier: a fictional UI + a fictional floor plan, all code  */
/* ------------------------------------------------------------------ */

const NAV = ["Tableau de bord", "Projets", "Tâches", "Planning", "Plans", "Clients", "Absences"];
const COLS = [
  { name: "À faire", tone: "bg-white/30" },
  { name: "En cours", tone: "bg-sky-400" },
  { name: "Validation", tone: "bg-amber-400" },
  { name: "Terminé", tone: "bg-emerald-400" },
];
const TASKS = [
  { t: "Villa Bellevue · CVC", tag: "Concept", col: 0 },
  { t: "Halle Est · ventilation", tag: "Étude", col: 0 },
  { t: "Immeuble Les Cèdres · sanitaire", tag: "Exécution", col: 1 },
  { t: "École du Parc · électricité", tag: "Devis", col: 1 },
  { t: "Résidence Lac · chauffage", tag: "Révision", col: 2 },
  { t: "Atelier Nord · plans", tag: "Livré", col: 3 },
  { t: "Piscine Sud · traitement", tag: "Livré", col: 3 },
];

function FakePlan({ play }: { play: boolean }) {
  // Original drawing, not derived from any real plan.
  const walls = [
    "M20 20 H380 V260 H20 Z",
    "M20 110 H170",
    "M230 110 H380",
    "M170 20 V110",
    "M230 110 V260",
    "M120 110 V260",
    "M120 190 H230",
    "M300 110 V180",
  ];
  const ducts = [
    { d: "M40 140 H210 V60 H360", c: "#f87171" },
    { d: "M40 155 H195 V75 H360", c: "#a3e635" },
    { d: "M260 240 V200 H360", c: "#60a5fa" },
  ];
  return (
    <svg viewBox="0 0 400 280" className="h-full w-full" fill="none" aria-hidden>
      <rect x="0" y="0" width="400" height="280" fill="#f7f7f5" />
      {walls.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          stroke="#2a2a2e"
          strokeWidth={i === 0 ? 6 : 4}
          initial={{ pathLength: 0 }}
          animate={play ? { pathLength: 1 } : {}}
          transition={{ duration: 1.1, ease: EASE, delay: i * 0.08 }}
        />
      ))}
      {ducts.map((p, i) => (
        <motion.path
          key={p.d}
          d={p.d}
          stroke={p.c}
          strokeWidth="6"
          strokeLinecap="square"
          initial={{ pathLength: 0 }}
          animate={play ? { pathLength: 1 } : {}}
          transition={{ duration: 1.4, ease: EASE, delay: 0.9 + i * 0.2 }}
        />
      ))}
      {[[60, 60], [300, 60], [60, 220], [170, 230], [330, 225]].map(([x, y], i) => (
        <motion.rect
          key={i}
          x={x - 6}
          y={y - 6}
          width="12"
          height="12"
          fill="#2a2a2e"
          initial={{ scale: 0 }}
          animate={play ? { scale: 1 } : {}}
          transition={{ delay: 1.8 + i * 0.06, type: "spring", stiffness: 400, damping: 20 }}
          style={{ transformOrigin: `${x}px ${y}px` }}
        />
      ))}
    </svg>
  );
}

export function ErpVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  // One task travels across the board, on a loop.
  const [moving, setMoving] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setMoving((c) => (c + 1) % COLS.length), 1800);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <div ref={ref} className="relative h-full w-full">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.1, ease: EASE }}
        className="absolute inset-x-0 top-[2%]"
      >
        <Frame title="app · tâches">
          <div className="flex">
            <aside className="hidden w-36 shrink-0 border-r border-white/5 p-3 sm:block">
              <div className="mb-4 flex items-center gap-2">
                <span className="size-4 rounded bg-accent" />
                <span className="h-2 w-14 rounded bg-white/20" />
              </div>
              {NAV.map((n, i) => (
                <div key={n} className={`mb-1 rounded px-2 py-1.5 text-[10px] ${i === 2 ? "bg-accent/15 text-accent" : "text-fog"}`}>
                  {n}
                </div>
              ))}
            </aside>
            <div className="grid min-w-0 flex-1 grid-cols-4 gap-2 p-3">
              {COLS.map((c, ci) => (
                <div key={c.name} className="flex min-w-0 flex-col gap-1.5 rounded-md bg-white/[0.02] p-1.5">
                  <div className="flex items-center gap-1.5 px-1 py-1 text-[9px] font-medium uppercase tracking-wider text-paper/70">
                    <span className={`size-1.5 rounded-full ${c.tone}`} />
                    <span className="truncate">{c.name}</span>
                  </div>
                  {TASKS.filter((t) => t.col === ci).map((t, ti) => (
                    <motion.div
                      key={t.t}
                      initial={{ opacity: 0, y: 10 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.4 + (ci * 2 + ti) * 0.07, duration: 0.6, ease: EASE }}
                      className="rounded border border-white/5 bg-ink p-1.5"
                    >
                      <div className="truncate text-[9px] text-paper/85">{t.t}</div>
                      <div className="mt-1 inline-block rounded bg-white/5 px-1 text-[8px] text-fog">{t.tag}</div>
                    </motion.div>
                  ))}
                  {moving === ci && (
                    <motion.div
                      layoutId="moving-task"
                      transition={{ type: "spring", stiffness: 260, damping: 26 }}
                      className="rounded border border-accent/50 bg-accent/10 p-1.5"
                    >
                      <div className="truncate text-[9px] text-accent">Portail client · v2</div>
                      <div className="mt-1 h-1 overflow-hidden rounded bg-white/10">
                        <div className="h-full bg-accent" style={{ width: `${((ci + 1) / COLS.length) * 100}%` }} />
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Frame>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 60, rotate: 0 }}
        animate={inView ? { opacity: 1, y: 0, rotate: 2 } : {}}
        transition={{ duration: 1.2, ease: EASE, delay: 0.25 }}
        className="absolute bottom-[1%] right-[2%] hidden w-[48%] sm:block"
      >
        <Frame title="plan-exemple.dwg · canvas 2D">
          <div className="aspect-[400/280]">
            <FakePlan play={inView} />
          </div>
        </Frame>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: EASE, delay: 1.2 }}
        className="absolute bottom-[4%] left-[2%] rounded-full bg-accent px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-ink"
      >
        Rendu 50–100× plus rapide
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 02 · Lecteur d'offres: a fictional offer, read field by field       */
/* ------------------------------------------------------------------ */

// Fictional company and amounts, not taken from any real offer.
const OFFER_FIELDS = [
  { k: "Entreprise", v: "Exemple Ventilation SA", c: 0.98 },
  { k: "Total net TTC", v: "CHF 184 320.00", c: 0.97 },
  { k: "Rabais", v: "5 %", c: 0.93 },
  { k: "Escompte", v: "2 % à 30 jours", c: 0.9 },
  { k: "CFC 244 · Ventilation", v: "CHF 96 400.00", c: 0.88 },
  { k: "Délai", v: "6 semaines ?", c: 0.58 },
];

function FakeOffer({ play }: { play: boolean }) {
  const lines = [70, 52, 0, 88, 76, 82, 0, 64, 90, 58, 84, 0, 46, 72, 80, 0, 66, 54, 86, 74, 0, 60, 78];
  return (
    <div className="relative h-full w-full bg-[#f7f7f5] p-4">
      <div className="mb-3 flex items-start justify-between">
        <div className="h-3 w-20 rounded-sm bg-[#2a2a2e]" />
        <div className="space-y-1 text-right">
          <div className="ml-auto h-1.5 w-16 rounded-sm bg-black/20" />
          <div className="ml-auto h-1.5 w-10 rounded-sm bg-black/15" />
        </div>
      </div>
      <div className="mb-3 font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-black/60">Offre n° 26-118</div>
      <div className="space-y-1.5">
        {lines.map((w, i) =>
          w === 0 ? (
            <div key={i} className="h-1" />
          ) : (
            <div key={i} className="flex items-center gap-2">
              <div className="h-1.5 rounded-sm bg-black/15" style={{ width: `${w * 0.7}%` }} />
              <div className="ml-auto h-1.5 w-8 rounded-sm bg-black/25" />
            </div>
          ),
        )}
      </div>
      <div className="mt-3 flex justify-end border-t border-black/10 pt-2">
        <div className="h-2 w-16 rounded-sm bg-[#2a2a2e]" />
      </div>
      {/* reading head */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 h-8 bg-gradient-to-b from-transparent via-[rgba(204,255,61,0.35)] to-transparent"
        initial={{ top: "-10%" }}
        animate={play ? { top: ["-10%", "100%"] } : {}}
        transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity, repeatDelay: 1.2 }}
      />
    </div>
  );
}

export function OffresVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <div ref={ref} className="relative h-full w-full">
      <motion.div
        initial={{ opacity: 0, y: 40, rotate: 0 }}
        animate={inView ? { opacity: 1, y: 0, rotate: -2 } : {}}
        transition={{ duration: 1.1, ease: EASE }}
        className="absolute left-[2%] top-[4%] w-[46%]"
      >
        <Frame title="offre-exemple.pdf">
          <div className="aspect-[4/5]">
            <FakeOffer play={inView} />
          </div>
        </Frame>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2, ease: EASE, delay: 0.25 }}
        className="absolute right-[2%] top-[14%] w-[56%]"
      >
        <Frame title="extraction · offre n° 26-118">
          <ul className="divide-y divide-white/5 p-1">
            {OFFER_FIELDS.map((f, i) => {
              const doubt = f.c < 0.7;
              return (
                <motion.li
                  key={f.k}
                  initial={{ opacity: 0, x: 12 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.9 + i * 0.22 }}
                  className={`${i > 3 ? "hidden sm:grid" : "grid"} grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1 px-2.5 py-2`}
                >
                  <span className="truncate text-[9px] uppercase tracking-wider text-fog">{f.k}</span>
                  <span className={`font-mono text-[9px] tabular-nums ${doubt ? "text-amber-300" : "text-fog"}`}>
                    {Math.round(f.c * 100)} %
                  </span>
                  <span className={`truncate text-[11px] ${doubt ? "text-amber-300" : "text-paper/90"}`}>{f.v}</span>
                  <span className="h-1 w-14 overflow-hidden rounded bg-white/10">
                    <motion.span
                      className={`block h-full origin-left ${doubt ? "bg-amber-300" : "bg-accent"}`}
                      initial={{ scaleX: 0 }}
                      animate={inView ? { scaleX: f.c } : {}}
                      transition={{ duration: 0.8, ease: EASE, delay: 1.1 + i * 0.22 }}
                    />
                  </span>
                </motion.li>
              );
            })}
          </ul>
        </Frame>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: EASE, delay: 2.4 }}
        className="absolute bottom-[4%] right-[2%] flex items-center gap-2 rounded-full bg-amber-300 px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-ink"
      >
        <span className="size-1.5 rounded-full bg-ink" />
        Délai à relire · un humain valide
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 03 · LeanPPC: the real landing page                                 */
/* ------------------------------------------------------------------ */

export function LeanVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["4%", "-10%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1.08, 1]);

  return (
    <div ref={ref} className="relative h-full w-full overflow-hidden rounded-lg border border-white/10 bg-[#eef2f7]">
      <motion.div style={{ y, scale }} className="absolute inset-x-0 top-0 flex h-[115%] origin-top flex-col">
        <div className="flex items-center gap-1.5 border-b border-black/5 bg-white/70 px-3 py-2 backdrop-blur">
          <span className="size-2 rounded-full bg-black/10" />
          <span className="size-2 rounded-full bg-black/10" />
          <span className="size-2 rounded-full bg-black/10" />
          <span className="ml-3 font-mono text-[10px] text-black/40">leanppc.com</span>
        </div>
        <div className="relative min-h-0 flex-1">
          <Image
            src="/work/leanppc-landing.jpg"
            alt="Landing page de LeanPPC : Live on Google Ads in one click"
            fill
            className="object-cover object-top"
            sizes="(min-width: 1024px) 55vw, 95vw"
          />
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
        className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full bg-[#0B0E14] px-3.5 py-2 font-mono text-[11px] text-white shadow-xl"
      >
        <span className="size-1.5 rounded-full bg-emerald-400" />
        Setup Google Ads · ~5 min
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 04 · Kanbell: a fictional workspace, drawn in code                  */
/* ------------------------------------------------------------------ */

type AgentState = "work" | "wait" | "done";

const KB_PROJECTS = [
  {
    name: "portfolio",
    dot: "bg-accent",
    agents: [
      { cli: "claude", task: "refonte section projets" },
      { cli: "codex", task: "tests e2e navigation" },
    ],
  },
  {
    name: "api-facturation",
    dot: "bg-sky-400",
    agents: [
      { cli: "claude", task: "migration Prisma" },
      { cli: "gemini", task: "doc des routes" },
    ],
  },
  {
    name: "app-mobile",
    dot: "bg-fuchsia-400",
    agents: [{ cli: "codex", task: "écran paiement" }],
  },
];

// Each step rewrites the state of the 5 agents, in sidebar order.
const KB_STEPS: AgentState[][] = [
  ["work", "work", "work", "done", "work"],
  ["wait", "work", "work", "done", "work"],
  ["wait", "work", "done", "done", "work"],
  ["work", "work", "done", "done", "wait"],
  ["work", "done", "work", "done", "wait"],
  ["done", "done", "work", "work", "work"],
];

const KB_STATE: Record<AgentState, { label: string; dot: string; text: string }> = {
  work: { label: "travaille", dot: "bg-accent animate-pulse", text: "text-accent" },
  wait: { label: "attend", dot: "bg-amber-300", text: "text-amber-300" },
  done: { label: "terminé", dot: "bg-emerald-400", text: "text-emerald-400" },
};

const KB_TERM = [
  { t: "> refonte section projets", tone: "text-accent" },
  { t: "● Lecture de src/components/projects.tsx", tone: "text-fog" },
  { t: "● Édition src/data/content.ts  +24 −2", tone: "text-paper/70" },
  { t: "● Bash  pnpm typecheck  ✓", tone: "text-emerald-400" },
  { t: "? Pousser la branche sur origin ?  (o/n)", tone: "text-amber-300" },
];

export function KanbellVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-15%" });
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setStep((s) => (s + 1) % KB_STEPS.length), 1600);
    return () => clearInterval(id);
  }, [inView]);

  const states = KB_STEPS[step];
  const waiting = states.filter((s) => s === "wait").length;
  let n = -1;

  return (
    <div ref={ref} className="relative h-full w-full">
      <Frame title="Kanbell" className="flex h-full flex-col">
        <div className="flex min-h-0 flex-1 font-mono text-[11px]">
          {/* sidebar: projects and their agents */}
          <div className="w-[42%] shrink-0 space-y-4 overflow-hidden border-r border-white/5 p-3 sm:w-[38%] sm:p-4">
            {KB_PROJECTS.map((p) => (
              <div key={p.name}>
                <div className="flex items-center gap-2 text-paper">
                  <span className={`size-2 rounded-sm ${p.dot}`} />
                  <span className="truncate">{p.name}</span>
                </div>
                <div className="mt-1.5 space-y-1">
                  {p.agents.map((a) => {
                    n += 1;
                    const s = KB_STATE[states[n]];
                    const selected = n === 0;
                    return (
                      <div
                        key={a.cli + a.task}
                        className={`flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors duration-300 ${
                          selected ? "bg-white/[0.06]" : ""
                        }`}
                      >
                        <span className={`size-1.5 shrink-0 rounded-full transition-colors duration-300 ${s.dot}`} />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-paper/80">{a.cli}</span>
                          <span className="hidden truncate text-[10px] text-fog sm:block">{a.task}</span>
                        </span>
                        <span className={`hidden shrink-0 text-[9px] transition-colors duration-300 lg:inline ${s.text}`}>{s.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* main: the selected agent's terminal */}
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex items-center gap-4 border-b border-white/5 px-4 py-2 text-[10px] text-fog">
              <span className="text-paper">terminal</span>
              <span>tâches</span>
              <span>changements</span>
              <span className="hidden sm:inline">notes</span>
            </div>
            <div className="min-h-0 flex-1 space-y-1.5 overflow-hidden p-4">
              {KB_TERM.map((l, i) => (
                <motion.div
                  key={l.t}
                  initial={{ opacity: 0, x: -6 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.35, duration: 0.6, ease: EASE }}
                  className={`truncate ${l.tone}`}
                >
                  {l.t}
                </motion.div>
              ))}
              <span className="inline-block h-3.5 w-1.5 animate-pulse bg-paper/70 align-middle" />
            </div>
          </div>
        </div>
      </Frame>

      {/* the signal: an agent is waiting for you */}
      <motion.div
        key={waiting > 0 ? "wait" : "idle"}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="absolute bottom-5 right-5 flex items-center gap-2 rounded-full bg-[#0B0E14] px-3.5 py-2 font-mono text-[11px] text-white shadow-xl ring-1 ring-white/10"
      >
        <span className={`size-1.5 rounded-full ${waiting > 0 ? "bg-amber-300" : "bg-accent animate-pulse"}`} />
        {waiting > 0 ? `${waiting} agent${waiting > 1 ? "s" : ""} attend${waiting > 1 ? "ent" : ""} ta réponse` : "5 agents au travail"}
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 05 · SayBack                                                        */
/* ------------------------------------------------------------------ */

const SUMMARY = [
  { t: "Décision : livrer le portail client vendredi", at: "12:41" },
  { t: "Action : valider le budget avec le client", at: "18:05" },
  { t: "Question ouverte : export PDF des plans ?", at: "31:22" },
];

export function SayBackVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10%" });
  const bars = 56;
  return (
    <div ref={ref} className="relative h-full w-full overflow-hidden rounded-lg border border-white/10">
      <Image src="/work/sayback-meadow.jpg" alt="" fill className="object-cover object-bottom" sizes="(min-width: 1024px) 50vw, 100vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
      <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full bg-black/40 px-3 py-1.5 backdrop-blur-md">
        <span className="size-1.5 animate-pulse rounded-full bg-red-500" />
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/90">Local · hors ligne</span>
      </div>

      <div className="absolute inset-x-6 bottom-6 space-y-4">
        <div className="flex h-14 items-center gap-[3px]">
          {Array.from({ length: bars }).map((_, i) => (
            <motion.span
              key={i}
              className="h-full w-full origin-center rounded-full bg-white/80"
              animate={inView ? { scaleY: [0.2, (30 + ((i * 37) % 70)) / 100, 0.25] } : { scaleY: 0.2 }}
              transition={{ duration: 1.2 + ((i * 13) % 10) / 10, repeat: Infinity, ease: "easeInOut", delay: (i % 7) * 0.08 }}
            />
          ))}
        </div>
        <div className="hidden space-y-2 rounded-lg border border-white/10 bg-black/50 p-4 backdrop-blur-md sm:block">
          {SUMMARY.map((s, i) => (
            <motion.div
              key={s.t}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.25, duration: 0.7, ease: EASE }}
              className="flex items-center justify-between gap-4 text-[13px] text-white/90"
            >
              <span>{s.t}</span>
              <span className="shrink-0 rounded bg-white/10 px-1.5 py-0.5 font-mono text-[10px] text-white/70">▶ {s.at}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 06 · Agents autonomes: deliberately generic                         */
/* ------------------------------------------------------------------ */

const AGENTS = [
  { id: "a1", label: "Recherche", x: 20, y: 18 },
  { id: "a2", label: "Rédaction", x: 80, y: 18 },
  { id: "a3", label: "Exécution", x: 18, y: 72 },
  { id: "a4", label: "Contrôle", x: 82, y: 72 },
];
const HUB = { x: 50, y: 48 };
const TEAM = { x: 50, y: 92 };

const FEED = [
  { who: "orchestrateur", t: "nouvelle tâche reçue · plan en 4 étapes", tone: "text-accent" },
  { who: "recherche", t: "contexte rassemblé" },
  { who: "exécution", t: "étape 2/4 terminée · vérifiée" },
  { who: "équipe", t: "validation demandée → approuvée", tone: "text-amber-300" },
  { who: "contrôle", t: "résultat conforme ✓" },
  { who: "orchestrateur", t: "livré · tâche suivante", tone: "text-accent" },
];

export function AgentsVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-15%" });
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setActive((a) => (a + 1) % (AGENTS.length + 1)), 900);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <div ref={ref} className="flex h-full w-full flex-col overflow-hidden rounded-lg border border-white/10 bg-ink-2 font-mono text-[11px]">
      <div className="flex items-center justify-between border-b border-white/5 px-5 py-3 text-fog">
        <span>agents · workflow</span>
        <span className="flex items-center gap-2 text-accent">
          <span className="size-1.5 animate-pulse rounded-full bg-accent" />
          autonome 24/7
        </span>
      </div>

      <div className="relative min-h-0 flex-1">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
          {[...AGENTS, TEAM].map((n, i) => (
            <line
              key={i}
              x1={HUB.x}
              y1={HUB.y}
              x2={n.x}
              y2={n.y}
              stroke={i === active || (i === AGENTS.length && active === AGENTS.length) ? "rgba(204,255,61,0.7)" : "rgba(255,255,255,0.08)"}
              strokeWidth="0.3"
              strokeDasharray="1 1"
              vectorEffect="non-scaling-stroke"
              style={{ transition: "stroke 0.4s" }}
            />
          ))}
        </svg>

        {/* travelling pulse */}
        {inView && (
          <motion.span
            key={active}
            className="absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_12px_rgba(204,255,61,0.9)]"
            initial={{ left: `${HUB.x}%`, top: `${HUB.y}%`, opacity: 1 }}
            animate={{
              left: `${(active < AGENTS.length ? AGENTS[active] : TEAM).x}%`,
              top: `${(active < AGENTS.length ? AGENTS[active] : TEAM).y}%`,
              opacity: [1, 1, 0],
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        )}

        <div
          className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 rounded-xl border border-accent/50 bg-accent/10 px-4 py-3 text-accent"
          style={{ left: `${HUB.x}%`, top: `${HUB.y}%` }}
        >
          <span className="whitespace-nowrap text-[11px] font-medium sm:text-[13px]">◆ orchestrateur</span>
          <span className="hidden text-[9px] text-accent/70 sm:inline">planifie · délègue · vérifie</span>
        </div>

        {AGENTS.map((a, i) => (
          <div
            key={a.id}
            className={`absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-md border px-2 py-1.5 text-[10px] transition-colors duration-300 sm:px-3 sm:py-2 sm:text-[11px] ${
              i === active ? "border-accent bg-accent text-ink" : "border-white/10 bg-ink text-paper/70"
            }`}
            style={{ left: `${a.x}%`, top: `${a.y}%` }}
          >
            <span className="hidden sm:inline">agent:</span>
            {a.label.toLowerCase()}
          </div>
        ))}

        <div
          className={`absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-md border px-2 py-1.5 text-[10px] transition-colors duration-300 sm:px-3 sm:py-2 sm:text-[11px] ${
            active === AGENTS.length ? "border-amber-300 bg-amber-300 text-ink" : "border-white/10 bg-ink text-paper/70"
          }`}
          style={{ left: `${TEAM.x}%`, top: `${TEAM.y}%` }}
        >
          ● équipe<span className="hidden sm:inline"> · validation</span>
        </div>
      </div>

      <div className="hidden space-y-1 border-t border-white/5 px-5 py-4 sm:block">
        {FEED.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.3 }}
            className="flex gap-3"
          >
            <span className={`w-28 shrink-0 ${f.tone ?? "text-fog"}`}>[{f.who}]</span>
            <span className="truncate text-paper/70">{f.t}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
