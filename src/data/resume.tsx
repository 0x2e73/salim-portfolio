import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Salim Mouttaki",
  initials: "SM",
  location: "Genève, Suisse",
  description:
    "Étudiant en informatique passionné par le développement d'applications et l'entrepreneuriat. Freelance en parallèle pour créer des solutions digitales innovantes.",
  summary:
    "Je viens de terminer mon apprentissage en informatique (CFC avec spécialisation en développement d’applications) en août 2025. J’ai été admis en Technicien ES au CFPT, où je poursuis ma formation pour renforcer mes compétences techniques et stratégiques. Parallèlement, j’ai cofondé Klyn-AI, une petite société en nom commun, avec pour mission d’aider les entreprises à automatiser leurs processus grâce à l’intelligence artificielle. Mon objectif est clair : proposer des solutions concrètes, simples à intégrer, mais puissantes, pour améliorer la productivité et l’expérience client. Je reste passionné par la conception de logiciels qui répondent à de vrais besoins, en m’appuyant sur des technologies modernes comme React, .NET ou encore des outils d’automatisation avancés. Mon ambition est de continuer à développer des projets à fort impact, tout en poursuivant à terme un master en informatique.",
  avatarUrl: "/me.jpeg",
  skills: [
    "React",
    "Next.js",
    "Typescript",
    "Node.js",
    "Python",
    "SQL",
    "MySql",
    "Docker",
    "Git",
    "C#",
    "Entity Framework Core"
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Accueil" },
  ],
  contact: {
    email: "salim.mouttaki@proton.me",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/mou-inoks",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/salim-mouttaki-06342a20a/",
        icon: Icons.linkedin,

        navbar: true,
      },
      email: {
        name: "Envoyer un email",
        url: "#",
        icon: Icons.email,

        navbar: false,
      },
    },
  },
  "work": [
    {
      "company": "Inoks Capital",
      "badges": [],
      "location": "Genève, Suisse",
      "title": "Apprenti développeur Junior",
      "logoUrl": "/inoks-capital.svg",
      "start": "2021",
      "end": "2025",
      "description": "Au sein de l'équipe d'Inoks Capital, j'ai acquis une expertise en développement backend et frontend. J'ai principalement travaillé sur la conception et le développement d'une solution bancaire interne, mettant en œuvre des technologies modernes pour le traitement des transactions, la gestion des données et la sécurisation des informations. Ce projet m'a permis d'apprendre presque tout ce que je sais aujourd'hui en matière de programmation, avec une grande expérience dans l'intégration de services backend et la création d'interfaces frontend complexes."
    },
    {
      "company": "Globalbat SA",
      "badges": [],
      "location": "Genève, Suisse",
      "title": "Développeur Freelance",
      "logoUrl": "/globalbat.png",
      "start": "2023",
      "end": "2023",
      "description": "Création d'un site web pour Globalbat SA, une entreprise spécialisée dans la construction et la rénovation de bâtiments"
    },
    {
      "company": "AI Law Shield",
      "badges": [],
      "location": "En ligne",
      "title": "Freelance IA",
      "logoUrl": "/ai-law-shield.jpeg",
      "start": "2024",
      "end": "2024",
      "description": "Projet dans le domaine de l'intelligence artificielle pour le droit. Développement de fonctionnalités d'IA pour analyser des documents juridiques, bien que je sois encore en phase d'apprentissage intensif sur les aspects avancés de l'IA."
    },
    {
      "company": "Application Pizza Management",
      "badges": [],
      "location": "En ligne",
      "title": "Développeur Freelance",
      "logoUrl": "/pizza-web-app.jpeg",
      "start": "2023",
      "end": "2023",
      "description": "Développement d'une application web de gestion de commandes pour une pizzeria. L'application permet de gérer les commandes, les stocks, et les livraisons. Utilisation de React pour le frontend et Node.js pour le backend."
    },
    {
      "company": "CFPT de Genève",
      "badges": [],
      "location": "Genève, Suisse",
      "title": "Étudiant en CFC Informatique",
      "logoUrl": "/cfpt.png",
      "start": "2021",
      "end": "2025",
      "description": "Formation pratique et théorique en informatique au CFPT de Genève. Apprentissage des technologies de développement, des bases de données, de la cybersécurité et des systèmes d'exploitation, avec une forte composante projet pour mettre en pratique ces connaissances dans un environnement professionnel."
    },
    {
      "company": "LinkedIn Learning",
      "badges": [],
      "location": "En ligne",
      "title": "Formations en HTML et JavaScript",
      "logoUrl": "/linkedin.png",
      "start": "2020",
      "end": "2020",
      "description": "Formations intensives sur le HTML, JavaScript et les meilleures pratiques pour le développement web. Apprentissage de l'intégration des technologies frontend et développement de sites web interactifs."
    }
  ],
  // "education": [
  //   {
  //     "school": "CFPT de Genève",
  //     "href": "https://www.cfpt.ch",
  //     "degree": "CFC Informatique - En cours",
  //     "logoUrl": "/cfpt.png",
  //     "start": "2021",
  //     "end": "2025"
  //   },
  //   {
  //     "school": "Inoks Capital",
  //     "href": "https://www.inokscapital.com",
  //     "degree": "Apprenti développeur - 4 ans d'expérience",
  //     "logoUrl": "/inoks.png",
  //     "start": "2021",
  //     "end": "2025"
  //   },
  //   {
  //     "school": "LinkedIn Learning",
  //     "href": "https://www.linkedin.com/learning",
  //     "degree": "Formations en HTML, JavaScript, C#",
  //     "logoUrl": "/linkedin.png",
  //     "start": "2023",
  //     "end": "2023"
  //   },
  // ],
  projects: [
    {
      "title": "AI Law Shield",
      "href": "https://github.com/mou-inoks/ai-law-shield",
      "dates": "2024 - Présent",
      "active": true,
      "description": "AI Law Shield est un outil alimenté par l'IA conçu pour analyser rapidement les contrats, les politiques de confidentialité et les conditions de service. Il identifie les clauses risquées, met en évidence les points critiques et offre des recommandations pour protéger les utilisateurs des pièges juridiques potentiels. Un projet open-source visant à rendre la protection juridique plus accessible à tous. 🚀📄",
      "technologies": [
        "Python",
        "Apprentissage automatique",
        "Traitement du langage naturel (NLP)",
        "OpenAI GPT-3"
      ],
      "links": [
        {
          "icon": <Icons.github className='size-3' />
        }
      ],
      "image": "/ai-law-app.webp",
    },
     {
      "title": "Jeux de la Vie",
      "href": "https://jeux-de-la-vie-conway.vercel.app/",
      "dates": "2023 - Présent",
      "active": true,
      "description": "Simulation interactive du célèbre Jeu de la vie. Tous les calculs sont effectués côté UI, directement dans React (sans Web Worker ni backend), avec une gestion optimisée de l’état et du rendu grâce à Vite pour les performances.",
      "technologies": [
        "React.js",
      ],
      "links": [
        {
          "icon": <Icons.github className='size-3' />
        }
      ],
      "image": "/jeux-vie.jpg",
    },
    {
      "title": "Template Prelime Agency (React)",
      "href": "https://template-prelime-agency-react-js.vercel.app/",
      "dates": "2025 - Présent",
      "active": true,
      "description": "Reprise d’un site HTML/CSS statique, entièrement réécrit avec React pour m’exercer à la structuration de composants et à la logique moderne d’une SPA (Single Page Application). Projet personnel réalisé pour le plaisir et la montée en compétence",
      "technologies": [
        "React",
        "Node.js",
        "Express",
        "Material-UI",
      ],
      "links": [
        {
          "icon": <Icons.github className='size-3' />
        }
      ],
      "image": "/prelime-website-template.png",  
    },
    {
      "title": "Klyn AI – Site vitrine de l’agence",
      "href": "https://klyn-ai.com",
      "dates": "2025 - Présent",
      "active": true,
      "description": "Site web développé lors du lancement de Klyn AI, mon agence spécialisée dans l’automatisation par l’intelligence artificielle pour les entreprises. Design premium, interface sombre et épurée, présentation claire de l’offre avec un focus produit impactant (à la manière des plus grands sites SaaS). Développement complet en React avec une attention particulière portée à l’expérience utilisateur, la typographie, et la mise en valeur des fonctionnalités IA.",
      "technologies": [
        "CSS",
        "React-js",
        "Next-js",
      ],
      "links": [
        {
          "icon": <Icons.github className='size-3' />
        }
      ],
      "image": "/klyn-ai-website.png",
    },
    {
      "title": "🧱 Clean Architecture – API Backend .NET 9",
      "href": "https://github.com/0x2e73/clean-architecture-starter",
      "dates": "2024 - Présent",
      "active": true,
      "description": "Un starter backend .NET 9 construit autour des principes de la Clean Architecture, conçu pour offrir une base de code ultra-solide, testable et maintenable. L’architecture sépare clairement les couches Domain, Application, Infrastructure et API. Tout est pensé pour la scalabilité, la lisibilité du code, et une mise en production rapide sans sacrifier la qualité technique. Parfait pour démarrer des projets d’API robustes avec une structure professionnelle dès le jour 1.",
      "technologies": [
        "C#",
        ".net 9",
        "Entity Framework Core",
        "SQL",
        "Authentification JWT",
      ],
      "links": [
        {
          "icon": <Icons.github className='size-3' />
        }
      ],
      "image": "/clean-architecture-cone.jfif",
    },
   
  ]

} as const;
