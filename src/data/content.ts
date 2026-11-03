export const PROFILE = {
  name: "Salim Mouttaki",
  first: "Salim",
  last: "Mouttaki",
  role: "Développeur full-stack",
  location: "Genève, Suisse",
  github: "https://github.com/0x2e73",
  linkedin: "https://www.linkedin.com/in/salim-mouttaki-06342a20a/",
  lead: "Je livre des produits qui tournent en production, et je construis les workflows IA qui les rendent fiables.",
};

export const STATS = [
  { value: "2 133", label: "commits en 11 semaines" },
  { value: "1", label: "app métier en prod, construite seul" },
  { value: "5 883", label: "tâches migrées le jour 1" },
  { value: "302", label: "fichiers de tests auto" },
  { value: "44", label: "releases publiées" },
  { value: "MIT", label: "app open source" },
  { value: "24/7", label: "agents IA autonomes" },
];

export const MANIFESTO =
  "Étudiant Technicien ES à Genève, bientôt à l'HEPIA. En parallèle de mes études, je travaille en indépendant : des produits conçus, codés et livrés de bout en bout, pour des équipes qui s'en servent tous les jours.";

/** Words of the manifesto rendered in the accent serif. */
export const MANIFESTO_EMPHASIS = ["l'HEPIA.", "indépendant", "jours."];

export type Experience = {
  company: string;
  context: string;
  role: string;
  period: string;
  duration?: string;
  summary: string;
  points: string[];
  stack: string[];
  metrics?: { value: string; label: string }[];
  link?: { label: string; href: string };
  note?: string;
};

export const EXPERIENCE: Experience[] = [
  {
    company: "Bureau d'ingénieurs",
    context: "Ingénierie technique du bâtiment · Suisse romande",
    role: "Développeur full-stack, seul sur le produit",
    period: "Mars → Sept. 2026",
    duration: "6 mois",
    summary:
      "L'équipe travaillait avec un logiciel générique qui ne couvrait pas son métier. J'ai proposé de repartir de zéro, puis j'ai conçu, développé et mis en production leur nouvelle application de gestion, de l'analyse du besoin jusqu'au serveur.",
    points: [
      "Migration de 39 utilisateurs, 157 projets et 5 883 tâches dès les premiers jours",
      "Visualiseur de plans AutoCAD dans le navigateur : rendu Canvas 2D, 50 à 100× plus rapide que la première version",
      "Planification heures prévues / effectives, absences avec validation, portail client, Gantt, assistant IA",
      "Infrastructure montée de A à Z : Docker, reverse proxy, pare-feu, déploiement continu par tag Git",
    ],
    stack: ["Next.js", "TypeScript", "Express", "Prisma", "PostgreSQL", "BullMQ", "Redis"],
    metrics: [
      { value: "2 133", label: "commits" },
      { value: "163", label: "PR fusionnées" },
      { value: "60", label: "migrations BDD" },
      { value: "6 sem.", label: "jusqu'à la prod" },
    ],
    note: "Nom du client communiqué sur demande.",
  },
  {
    company: "LeanPPC",
    context: "One-click Google Ads · app Shopify · avec Charles, fondateur",
    role: "Lead développeur Shopify",
    period: "Déc. 2025 → aujourd'hui",
    summary:
      "Je construis toute la partie technique de LeanPPC : une app Shopify qui met une boutique en ligne sur Google Ads en un clic, sans aucune expertise PPC, puis protège son budget toute seule.",
    points: [
      "Audit de conformité Google Merchant Center : plus de 14 contrôles automatiques sur la boutique",
      "Connexion Google Ads, création des comptes et des campagnes Search / Shopping, annonces rédigées par IA",
      "Suivi des conversions fiable, côté serveur et côté navigateur",
      "Back-office interne sécurisé et landing bilingue FR / EN",
    ],
    stack: ["Remix", "TypeScript", "Shopify Polaris", "Google Ads API", "Prisma", "PostgreSQL", "Next.js"],
  },
  {
    company: "Thème Shopify premium",
    context: "L'un des plus grands thèmes du marché Shopify",
    role: "Développeur freelance, refonte d'architecture",
    period: "2025",
    summary:
      "Un thème installé sur un très grand nombre de boutiques, dont le code avait grandi sans structure. J'ai repensé toute son architecture et refondu une large partie du code pour le rendre rapide, cohérent et enfin maintenable.",
    points: [
      "Nouvelle architecture des sections, des composants et des scripts",
      "Gains de performance et suppression de la dette technique accumulée",
      "Revue de code, gestion des erreurs et nouvelles fonctionnalités",
    ],
    stack: ["Liquid", "JavaScript", "CSS", "Shopify"],
  },
  {
    company: "Inoks Capital",
    context: "Gestion d'actifs · Genève",
    role: "Apprenti développeur, puis freelance",
    period: "2021 → 2025",
    duration: "4 ans",
    summary:
      "Quatre ans sur une solution bancaire interne, au contact de développeurs exigeants. C'est là que j'ai acquis une vraie maîtrise de l'architecture logicielle et des bases solides que j'applique sur chaque projet.",
    points: [
      "Conception backend et frontend d'une application bancaire : transactions, données, sécurité",
      "Clean architecture, séparation des couches, code testable et maintenable",
      "En freelance : migration d'une application React vers la dernière version, dépendances comprises",
    ],
    stack: ["C#", ".NET", "Entity Framework", "SQL", "React"],
  },
  {
    company: "Indépendant",
    context: "PME et associations · Suisse romande",
    role: "Sites, apps mobiles, refontes",
    period: "2023 → aujourd'hui",
    summary:
      "En parallèle de mes études, des projets livrés de bout en bout pour des entreprises qui avaient besoin de résultats, pas de maquettes.",
    points: [
      "Application mobile React Native pour un salon de coiffure, avec une interface clients et une interface équipe",
      "Sites vitrines rapides et animés pour des entreprises du bâtiment et des services",
      "Site associatif avec visite 3D en Three.js et dons en ligne via Stripe",
    ],
    stack: ["React", "React Native", "Next.js", "Three.js", "Stripe"],
  },
];

export const EDUCATION = [
  { title: "HEPIA, haute école d'ingénierie", school: "Genève", period: "Prochaine étape" },
  { title: "Technicien ES en développement d'applications", school: "CFPT, Genève", period: "2025 → 2027" },
  { title: "CFC d'informaticien, développement d'applications", school: "CFPT, Genève", period: "2021 → 2025" },
];

export type Project = {
  slug: string;
  index: string;
  name: string;
  tagline: string;
  status: string;
  description: string;
  features: { title: string; body: string }[];
  stack: string[];
  href?: string;
  hrefLabel?: string;
  visual: "erp" | "leanppc" | "kanbell" | "sayback" | "agents";
};

export const FEATURED: Project[] = [
  {
    slug: "erp",
    index: "01",
    name: "App métier",
    tagline: "L'outil exact d'un bureau d'ingénieurs.",
    status: "En production",
    description:
      "Une application de gestion construite autour des processus réels du génie technique du bâtiment. Conçue, développée et déployée seul.",
    features: [
      { title: "Projets & tâches", body: "Kanban, liste, Gantt, phases et livrables" },
      { title: "Planification", body: "Heures prévues / effectives, glisser-déposer" },
      { title: "Plans AutoCAD", body: "Rendu DWG dans le navigateur, en Canvas 2D" },
      { title: "Portail client", body: "Suivi, documents et échanges avec l'équipe" },
      { title: "Absences", body: "Demandes et workflow d'approbation" },
      { title: "Assistant IA", body: "Intégré au quotidien de l'équipe" },
    ],
    stack: ["Next.js", "Express", "Prisma", "PostgreSQL"],
    hrefLabel: "Nom du client sur demande",
    visual: "erp",
  },
  {
    slug: "leanppc",
    index: "02",
    name: "LeanPPC",
    tagline: "One-click Google Ads pour Shopify.",
    status: "App Shopify",
    description:
      "Le marchand installe l'app, et son compte Google Ads est configuré en cinq minutes. Ensuite, LeanPPC coupe les dépenses inutiles tout seul.",
    features: [
      { title: "Audit Merchant Center", body: "14+ contrôles automatiques" },
      { title: "Google Ads en un clic", body: "Compte, campagnes, annonces IA" },
      { title: "Conversions", body: "Suivi serveur + navigateur" },
      { title: "Flux produits", body: "Catalogue synchronisé" },
    ],
    stack: ["Remix", "Polaris", "Google Ads API", "Prisma"],
    visual: "leanppc",
  },
  {
    slug: "kanbell",
    index: "03",
    name: "Kanbell",
    tagline: "Dix agents de code. Aucun perdu de vue.",
    status: "macOS · Linux",
    description:
      "Une app de bureau qui réunit tous les agents de code dans une seule fenêtre, rangés par projet. On voit lequel travaille, lequel attend une réponse et ce qu'il a changé, et on est prévenu dès qu'un agent a besoin de nous.",
    features: [
      { title: "Multi-agents", body: "Claude Code, Codex, Gemini CLI" },
      { title: "Rangés par projet", body: "Un terminal par agent" },
      { title: "Signal d'attente", body: "Notifié dès qu'un agent bloque" },
      { title: "Changements Git", body: "Ce que chaque agent a modifié" },
      { title: "Tableau de tâches", body: "Sources GitHub et GitLab" },
      { title: "100 % local", body: "Pas de compte, pas de serveur" },
    ],
    stack: ["Electron", "React", "TypeScript", "node-pty", "xterm.js"],
    href: "https://kanbell.com",
    hrefLabel: "kanbell.com",
    visual: "kanbell",
  },
  {
    slug: "sayback",
    index: "04",
    name: "SayBack",
    tagline: "La réunion passe. Le contexte reste.",
    status: "Open source · MIT",
    description:
      "Une mémoire de réunion qui tourne sur ta machine. Audio, écran et notes sur une même chronologie ; chaque point du compte rendu renvoie au passage exact de la réunion.",
    features: [
      { title: "100 % local", body: "Pas de compte, pas de serveur" },
      { title: "Modèles open source", body: "Transcription et résumé hors ligne" },
      { title: "Citations sourcées", body: "Chaque point renvoie à la vidéo" },
      { title: "Multi-plateforme", body: "App de bureau Electron" },
    ],
    stack: ["Electron", "TypeScript", "whisper", "Ollama"],
    href: "https://github.com/0x2e73/sayback-app",
    hrefLabel: "github.com/0x2e73/sayback-app",
    visual: "sayback",
  },
  {
    slug: "agents",
    index: "05",
    name: "Agents autonomes",
    tagline: "Automatisation par workflows IA.",
    status: "En production · 24/7",
    description:
      "Je conçois des agents IA totalement autonomes qui travaillent avec les équipes, en suivant leurs workflows. Je les utilise moi-même au quotidien : c'est ce qui me permet de livrer beaucoup plus, beaucoup plus vite.",
    features: [
      { title: "Autonomes", body: "Ils planifient, exécutent et reprennent seuls" },
      { title: "Humain dans la boucle", body: "Validation là où ça compte" },
      { title: "Sur mesure", body: "Calqués sur vos workflows réels" },
      { title: "Éprouvés", body: "Utilisés chaque jour dans mon travail" },
    ],
    stack: ["Claude", "Agent SDK", "MCP", "Node.js"],
    visual: "agents",
  },
];

export const INDEX = [
  { name: "Merge", kind: "Gestionnaire de projets, pour moi", year: "2026", stack: "React 19 · Hono · Postgres", image: null },
  { name: "Centre El-Falah", kind: "Site, visite 3D, dons Stripe", year: "2026", stack: "React · Three.js", image: null },
  { name: "DockLibre", kind: "App macOS native", year: "2026", stack: "SwiftUI · AppKit", image: null },
  { name: "Klyn AI", kind: "Site de mon agence IA", year: "2025", stack: "Next.js", image: "/klyn-ai-website.png", href: "https://klyn-ai.com" },
  { name: "Hair Lab", kind: "App mobile salon de coiffure", year: "2025", stack: "React Native", image: "/hair-lab.png" },
  { name: "PFB Rénovation", kind: "Site vitrine", year: "2025", stack: "Next.js", image: "/pfb-renovations.png", href: "https://pfb-renovation.ch" },
  { name: "Clean Architecture", kind: "Starter API open source", year: "2024", stack: ".NET 9 · EF Core", image: "/clean-architecture-cone.jfif", href: "https://github.com/0x2e73/clean-architecture-starter" },
] as { name: string; kind: string; year: string; stack: string; image: string | null; href?: string }[];

export const AI_PRINCIPLES = [
  {
    n: "01",
    title: "La spec avant le code",
    body: "Chaque chantier commence par une spécification et un plan d'implémentation relus. L'agent sait ce qu'il doit livrer, et ce qu'il ne doit pas toucher.",
  },
  {
    n: "02",
    title: "Des agents orchestrés",
    body: "Un orchestrateur découpe le travail, des sous-agents spécialisés l'exécutent en parallèle. Le gros modèle décide, les petits exécutent.",
  },
  {
    n: "03",
    title: "Des garde-fous",
    body: "Hooks, règles par projet, permissions explicites. Aucune commande destructive ne passe sans validation humaine.",
  },
  {
    n: "04",
    title: "La preuve avant le « c'est fait »",
    body: "Tests, typecheck, build et vérification dans un vrai navigateur avant de déclarer une tâche terminée. Pas de « ça devrait marcher ».",
  },
  {
    n: "05",
    title: "En production, pas en démo",
    body: "Des agents autonomes tournent 24/7 et travaillent avec des équipes. Un assistant IA sert des utilisateurs tous les jours. SayBack résume des réunions sans quitter la machine.",
  },
];

export const TERMINAL_LINES: { t: string; tone?: "dim" | "ok" | "accent" | "warn" }[] = [
  { t: "$ workflow run feature/portail-client", tone: "accent" },
  { t: "→ spec       docs/specs/portail-client.md", tone: "dim" },
  { t: "→ plan       12 tâches · 3 lots indépendants", tone: "dim" },
  { t: "◆ orchestrateur   découpe le plan" },
  { t: "  ├ agent:api       routes + base de données  ✓", tone: "ok" },
  { t: "  ├ agent:web       pages + composants        ✓", tone: "ok" },
  { t: "  └ agent:tests     48 cas                    ✓", tone: "ok" },
  { t: "◆ garde-fou   migration destructive ? → demande validation", tone: "warn" },
  { t: "◆ vérif       typecheck ✓  tests 48/48 ✓  build ✓", tone: "ok" },
  { t: "◆ navigateur  parcours client testé en vrai     ✓", tone: "ok" },
  { t: "→ PR ouverte · liée au ticket", tone: "dim" },
  { t: "done. prêt pour la revue.", tone: "accent" },
];

export const STACK = [
  { group: "Front", items: ["TypeScript", "React", "Next.js", "Remix", "React Native", "Tailwind", "Motion", "Three.js"] },
  { group: "Back", items: ["Node.js", "Express", "Hono", "C# / .NET", "Prisma", "PostgreSQL", "Redis · BullMQ"] },
  { group: "Infra", items: ["Docker", "Caddy", "PM2", "GitHub Actions", "Vercel", "Supabase", "VPS Linux"] },
  { group: "IA", items: ["Claude Code", "Agent SDK", "MCP", "Ollama", "whisper.cpp", "Gemini API"] },
];
