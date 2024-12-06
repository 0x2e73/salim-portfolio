import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Salim Mouttaki",
  initials: "SM",
  location: "Genève, Suisse",
  description:
    "Étudiant en informatique passionné par le développement d'applications et l'entrepreneuriat. Freelance en parallèle pour créer des solutions digitales innovantes.",
  summary:
    "Je suis actuellement en dernière année de CFC en informatique avec une spécialisation en développement d’applications. Parallèlement, je réalise des projets entrepreneuriaux en tant que freelance, en me concentrant sur la création de plateformes modernes et intuitives, comme une application de mise en relation entre particuliers et bureaux d'études. Je suis passionné par la conception de logiciels qui répondent à des besoins réels, tout en intégrant des technologies avancées comme React, .NET. Mon objectif est de poursuivre un master en informatique tout en développant des projets ambitieux pour aider les entreprises à évoluer dans un monde numérique.",
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
      "title": "Application Web de Gestion de livraison de Pizza",
      "href": "https://github.com/mou-inoks/pizza-management-web",
      "dates": "2023 - Présent",
      "active": true,
      "description": "Cette application web est conçue pour gérer les employés et la planification des opérations de livraison. Elle comprend des fonctionnalités pour assigner des itinéraires de livraison, gérer les horaires de travail et suivre les performances afin d'optimiser l'efficacité opérationnelle et améliorer le service client.",
      "technologies": [
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "Material-UI",
        "Authentification JWT"
      ],
      "links": [
        {
          "icon": <Icons.github className='size-3' />
        }
      ],
      "image": "/pizza-management-app.png",  
    },
    {
      "title": "Site Web Globalbat SA",
      "href": "https://www.globalbat.ch",
      "dates": "2023 - Présent",
      "active": true,
      "description": "Développement du site officiel de Globalbat SA, une entreprise leader dans le secteur du bâtiment et de la construction. Le site présente leurs services, projets et l'histoire de l'entreprise, offrant une présence en ligne moderne et professionnelle.",
      "technologies": [
        "HTML",
        "CSS",
        "JavaScript",
        "WordPress",
        "Bootstrap"
      ],
      "links": [
        {
          "icon": <Icons.globe className='size-3' />
        }
      ],
      "image": "/globalbat-website.png",
      },
    {
      "title": "Site Web de Lavage de Voitures",
      "href": "https://github.com/mou-inoks/car-wash-website",
      "dates": "2023 - Présent",
      "active": true,
      "description": "Conception et développement d'un site web convivial pour une entreprise locale de lavage de voitures. Le site permet aux clients de réserver des services en ligne, de consulter les plans tarifaires et d'en savoir plus sur les traitements disponibles. Accent mis sur le design réactif et l'expérience utilisateur intuitive.",
      "technologies": [
        "HTML",
        "CSS",
        "JavaScript",
        "PHP",
        "WordPress"
      ],
      "links": [
        {
          "icon": <Icons.github className='size-3' />
        }
      ],
      "image": "/clean-car-website.avif",
    },
    {
      "title": "Jeux de la Vie",
      "href": "https://github.com/mou-inoks/jeux-de-la-vie",
      "dates": "2023 - Présent",
      "active": true,
      "description": "Création d'une simulation du Jeu de la Vie de Conway en utilisant C# pour la logique backend et React.js pour l'interface front-end. Le projet démontre les automates cellulaires et inclut des fonctionnalités interactives comme l'ajustement de la taille de la grille et la vitesse de l'évolution.",
      "technologies": [
        "C#",
        "React.js",
        "HTML",
        "CSS"
      ],
      "links": [
        {
          "icon": <Icons.github className='size-3' />
        }
      ],
      "image": "/jeux-vie.jpg",
    }
  ]

} as const;
