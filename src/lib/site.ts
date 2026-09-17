import type { LucideIcon } from "lucide-react";
import {
  Code2,
  Layers,
  PenTool,
  Server,
  Smartphone,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: `#${string}`;
};

export type ProjectStatus = "Live" | "In progress" | "Private";

export type Project = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  problem: string;
  role: string;
  notes: string[];
  impact: string[];
  stack: string[];
  status: ProjectStatus;
  href?: string;
};

export type SkillGroup = {
  title: string;
  items: string[];
  primary?: boolean;
};

export type Capability = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type Experience = {
  period: string;
  role: string;
  organization: string;
  points: string[];
};

export type Fact = {
  label: string;
  value: string;
};

export type ContactLink = {
  label: string;
  value: string;
  href: string;
  external?: boolean;
  download?: string;
};

export type Social = {
  label: string;
  href: string;
};

export const siteConfig = {
  name: "Ogabi David",
  nickname: "Gabi",
  brand: "GABI",
  siteName: "GABI's Workspace",
  role: "Software Engineer | Mobile & Full-Stack Developer",
  tagline: "Flutter first · React · Next.js · TypeScript",
  location: "Nigeria",
  timezone: "WAT (UTC+1)",
  email: "gabisworkspace@outlook.com",
  url: "https://gabis-workspace.vercel.app",
  github: "https://github.com/GABIs-Hub",
  linkedin: "https://linkedin.com/in/david-ogabi-b77a2a31a",
  whatsapp: "https://wa.me/2349027876679",
  googleSiteVerification: "LEwvAXqy9PxUPX7lqUi6YSK4Vu0vqK5n3TUWKKH5ugk",
  title: "Ogabi David · Software Engineer | Flutter, Mobile & Full-Stack",
  description:
    "Portfolio of Ogabi David (Gabi), a software engineer in Nigeria building Flutter mobile products and full-stack applications with React, Next.js, TypeScript, and PostgreSQL.",
  keywords: [
    "Ogabi David",
    "Gabi",
    "Gabi's Workspace",
    "Software Engineer",
    "Flutter Developer",
    "Mobile Developer",
    "Full-Stack Developer",
    "Frontend Developer",
    "Next.js Developer",
    "Nigeria",
  ],
};

export const emailHref = `mailto:${siteConfig.email}?subject=${encodeURIComponent("Project enquiry")}`;

/**
 * The CV is served as a static file from `public/cv/`.
 * Drop the PDF at `public/cv/ogabi-david-cv.pdf` and every CV link on the site picks it up.
 */
export const cv = {
  href: "/cv/Ogabi_David_Upgraded_CV.pdf",
  fileName: "Ogabi-David-CV.pdf",
  label: "Download CV",
};

export const navItems: NavItem[] = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Contact", href: "#contact" },
];

export const heroFacts: Fact[] = [
  { label: "Focus", value: "Flutter mobile products with structured architecture" },
  { label: "Also", value: "Full-stack products with React, Next.js, and PostgreSQL" },
  { label: "Based in", value: `${siteConfig.location} · ${siteConfig.timezone}` },
  { label: "Evidence", value: "15+ UI components · 5+ client projects · 20+ BizLedger workflows" },
];

export const projects: Project[] = [
  {
    slug: "student-budget-tracker",
    title: "Student Budget Tracker",
    category: "Mobile · Personal finance",
    summary:
      "A Flutter expense tracker concept shaped around the way university students actually plan spending across a semester.",
    problem:
      "Student spending is irregular and concentrated in a few places, mostly restaurants and supermarkets. Generic finance apps do not frame a budget around a semester, which is the period that actually matters to a student.",
    role: "Design and development",
    notes: [
      "Budget views at daily, weekly, monthly, and semester granularity, so the same transactions can be read at whichever level matters at the time.",
      "Spending grouped by common student categories, including restaurants and supermarkets, with analytics on where money goes.",
      "Built in Flutter with Firebase as the backend, and Kotlin for the Android layer.",
    ],
    impact: [
      "The project explores daily, weekly, monthly, and semester views as one coherent budgeting model.",
      "Its status remains in progress; no user or production outcome is claimed.",
    ],
    stack: ["Flutter", "Dart", "Firebase", "Kotlin"],
    status: "In progress",
  },
  {
    slug: "bizledger",
    title: "BizLedger",
    category: "Mobile · Small business finance",
    summary:
      "A cross-platform ledger and accounting app that gives small businesses clear financial tracking across devices.",
    problem:
      "Small businesses often keep records in notebooks or spreadsheets that do not travel well between a phone and a laptop. BizLedger aims to make recording a transaction, and reading the picture that results, simple on any device.",
    role: "Design and development",
    notes: [
      "Designed 20+ core workflows spanning products, sales, inventory, debt management, reporting, business profiles, and backup/restore.",
      "Implemented versioned relational local data with Drift/SQLite, schema migrations, and transactional workflows connected to PostgreSQL/Neon.",
      "Structured the application with Feature-First + Clean Architecture, Riverpod state management, GoRouter navigation, and reusable service layers.",
    ],
    impact: [
      "Built a business tool around repeatable sales and inventory workflows rather than a generic ledger screen.",
      "Added safeguards including below-cost sale warnings, product archiving/restoration, stock adjustments, and direct cart quantity editing.",
    ],
    stack: ["Flutter", "Dart", "Riverpod", "Drift", "SQLite", "PostgreSQL", "Neon"],
    status: "In progress",
  },
  {
    slug: "acire-ventures-sales-system",
    title: "Acire Ventures Sales System",
    category: "Web · Full-stack business system",
    summary:
      "A full-stack sales and inventory platform designed around products, sales, invoices, reservations, accounts, representatives, and administration.",
    problem:
      "Business workflows need reliable transaction history and role-aware controls, not disconnected screens that leave important decisions to manual coordination.",
    role: "Design and development",
    notes: [
      "Architected a relational PostgreSQL schema with Prisma and Neon to preserve transaction history across business workflows.",
      "Implemented role-aware workflows for products, sales, invoices, reservations, business accounts, sales representatives, and administration.",
      "Designed safeguards for below-cost confirmation, completed-sale correction, product archiving, reservation expiry, and duplicate-name prevention.",
    ],
    impact: [
      "The system establishes a consistent data foundation for sales operations and audit history.",
      "Production status is not claimed; the project is presented as an engineering case study.",
    ],
    stack: ["Next.js", "React", "TypeScript", "Prisma", "PostgreSQL", "Neon", "Better Auth", "Vercel"],
    status: "In progress",
  },
  {
    slug: "gabi",
    title: "GABI",
    category: "Web · AI product platform",
    summary:
      "An AI-powered brand identity and creative direction platform that turns business context into structured brand systems and creative assets.",
    problem:
      "Early-stage brands need more than isolated generated images: they need a coherent strategy, visual system, and usable documentation that can guide future work.",
    role: "Design and development",
    notes: [
      "Defined product requirements around brand strategy, logo systems, typography, color systems, AI-generated mockups, social content, and downloadable documentation.",
      "Refined the product around context-aware generation, responsive architecture, animated interfaces, and industry-specific creative direction.",
      "Built with a full-stack Next.js and TypeScript foundation alongside Figma-led product thinking.",
    ],
    impact: [
      "The platform connects brand strategy and creative direction into one product workflow.",
      "Its production status is intentionally not stated beyond the verified project scope.",
    ],
    stack: ["Next.js", "TypeScript", "AI", "Figma", "Full-stack"],
    status: "In progress",
  },
  {
    slug: "architect-portfolio",
    title: "Architect Portfolio",
    category: "Web · Client website",
    summary:
      "A personal brand website for an architect, presenting services, expertise, and visual identity.",
    problem:
      "An architect needs a site that presents their work and services with the same care they put into their own designs, and that loads quickly and reads well on a phone.",
    role: "Design and development",
    notes: [
      "Responsive layout with structured content sections for services, expertise, and identity.",
      "Performance-minded implementation focused on a strong first impression.",
      "Deployed on Vercel.",
    ],
    impact: ["Delivered as part of 5+ client websites and software projects taken from requirements through deployment."],
    stack: ["React", "TypeScript", "Vercel"],
    status: "Live",
    href: "https://favour-ogabi.vercel.app",
  },
  {
    slug: "portfolio",
    title: "Personal Developer Portfolio",
    category: "Web · Personal product",
    summary:
      "A server-rendered portfolio designed to communicate mobile specialization, full-stack capability, and evidence-led engineering work.",
    problem:
      "A multidisciplinary engineer needs a clear professional narrative without reducing meaningful projects to technology lists.",
    role: "Product, design, and development",
    notes: [
      "Built with Next.js App Router, strict TypeScript, typed content, and a small set of client islands.",
      "Uses structured metadata, Open Graph, responsive layouts, and progressive motion for a fast first impression.",
      "Content is organized around projects, experience, capabilities, and direct conversion paths.",
    ],
    impact: [
      "The current implementation carries 6+ reusable sections and is being upgraded against the latest CV.",
      "The previous implementation achieved a 100 Lighthouse SEO score; this release is validated independently.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    status: "Live",
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: "Mobile",
    primary: true,
    items: ["Flutter", "Dart", "Riverpod", "Drift", "SQLite", "Kotlin", "Jetpack Compose", "Android"],
  },
  {
    title: "Web",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Responsive UI"],
  },
  {
    title: "Backend and data",
    items: ["Node.js", "REST APIs", "PostgreSQL", "Neon", "Prisma", "Firebase", "Supabase", "Sanity"],
  },
  {
    title: "Tooling and design",
    items: ["Better Auth", "Paystack", "Git", "GitHub", "GitLab", "Vercel", "Netlify", "Figma", "VS Code"],
  },
];

export const learning = ["Swift", "SwiftUI"];

export const capabilities: Capability[] = [
  {
    title: "Flutter product development",
    description:
      "Cross-platform products from a single Dart codebase, with structured state, navigation, relational data, and screens that adapt to the device.",
    icon: Smartphone,
  },
  {
    title: "Android development",
    description:
      "Native Android work with Kotlin and Jetpack Compose, including platform-specific code inside cross-platform apps.",
    icon: Layers,
  },
  {
    title: "Web development",
    description:
      "Responsive, accessible interfaces with React, Next.js, TypeScript, and Tailwind CSS.",
    icon: Code2,
  },
  {
    title: "UI implementation",
    description:
      "Turning Figma designs into consistent, responsive screens on mobile and web.",
    icon: PenTool,
  },
  {
    title: "Backend and API integration",
    description:
      "Connecting products to PostgreSQL, Neon, Prisma, Firebase, Supabase, REST APIs, authentication, and payment services.",
    icon: Server,
  },
];

export const experience: Experience[] = [
  {
    period: "Jul 2025 – Present",
    role: "Frontend Developer",
    organization: "NACOS DU Software Development Team",
    points: [
      "Shipped 15+ production UI components for a student election platform used by 200+ students, including authentication and vote-progress flows.",
      "Delivered 10+ pages and components from Figma specifications with responsive layouts, animations, and reusable interface patterns.",
      "Collaborated within a 12-developer team using structured Git branching, code review, and shared delivery workflows.",
    ],
  },
  {
    period: "Jul 2025 – Present",
    role: "Freelance Software Developer",
    organization: "Independent client projects",
    points: [
      "Delivered 5+ client websites and software projects with Next.js, TypeScript, React, and Tailwind CSS from requirements through production deployment.",
      "Built BizLedger and the Acire Ventures Sales System across Flutter, PostgreSQL/Neon, Prisma, authentication, and role-aware workflows.",
      "Resolved dependency conflicts, framework migrations, runtime errors, deployment failures, and configuration issues across local and cloud environments.",
    ],
  },
  {
    period: "2026",
    role: "Product / Technical Lead",
    organization: "Gbanner Systems",
    points: [
      "Coordinated development activities across departments by setting direction, reviewing progress, and aligning contributors around implementation priorities.",
      "Ran cross-functional progress reviews to identify blockers, provide actionable feedback, and improve delivery across design and development workstreams.",
    ],
  },
  {
    period: "2024 – 2028",
    role: "Software Engineering Student",
    organization: "Dominion University, Ibadan",
    points: [
      "Building production-oriented mobile and full-stack projects alongside coursework in software engineering fundamentals, data structures, system design, and architecture.",
    ],
  },
];

export const contactLinks: ContactLink[] = [
  { label: "Email", value: siteConfig.email, href: emailHref },
  { label: "CV", value: "Download PDF", href: cv.href, download: cv.fileName },
  { label: "WhatsApp", value: "Message on WhatsApp", href: siteConfig.whatsapp, external: true },
  { label: "LinkedIn", value: "david-ogabi", href: siteConfig.linkedin, external: true },
  { label: "GitHub", value: "GABIs-Hub", href: siteConfig.github, external: true },
];

export const socials: Social[] = [
  { label: "GitHub", href: siteConfig.github },
  { label: "LinkedIn", href: siteConfig.linkedin },
  { label: "WhatsApp", href: siteConfig.whatsapp },
];
