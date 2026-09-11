import type { LucideIcon } from "lucide-react";
import {
  Code2,
  Layers,
  PenTool,
  Server,
  Smartphone,
  TabletSmartphone,
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
  role: "Mobile Developer",
  tagline: "Flutter · React Native · Kotlin",
  location: "Nigeria",
  timezone: "WAT (UTC+1)",
  email: "ogabidavid16@gmail.com",
  url: "https://gabis-workspace.vercel.app",
  github: "https://github.com/GABIs-Hub",
  linkedin: "https://linkedin.com/in/david-ogabi-b77a2a31a",
  whatsapp: "https://wa.me/2349027876679",
  googleSiteVerification: "LEwvAXqy9PxUPX7lqUi6YSK4Vu0vqK5n3TUWKKH5ugk",
  title: "Ogabi David · Mobile Developer | Flutter, React Native, Kotlin",
  description:
    "Portfolio of Ogabi David (Gabi), a mobile developer in Nigeria building cross-platform apps with Flutter, React Native, and Kotlin, and web interfaces with React and Next.js.",
  keywords: [
    "Ogabi David",
    "Gabi",
    "Gabi's Workspace",
    "Mobile Developer",
    "Flutter Developer",
    "React Native Developer",
    "Android Developer",
    "Kotlin Developer",
    "Web Developer",
    "Nigeria",
  ],
};

export const emailHref = `mailto:${siteConfig.email}?subject=${encodeURIComponent("Project enquiry")}`;

/**
 * The CV is served as a static file from `public/cv/`.
 * Drop the PDF at `public/cv/ogabi-david-cv.pdf` and every CV link on the site picks it up.
 */
export const cv = {
  href: "/cv/ogabi-david-cv.pdf",
  fileName: "Ogabi-David-CV.pdf",
  label: "Download CV",
};

export const navItems: NavItem[] = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const heroFacts: Fact[] = [
  { label: "Focus", value: "Mobile apps with Flutter, React Native, and Kotlin" },
  { label: "Also", value: "Web interfaces with React, Next.js, and TypeScript" },
  { label: "Based in", value: `${siteConfig.location} · ${siteConfig.timezone}` },
  { label: "Currently", value: "Building BizLedger and a student budget tracker in Flutter" },
];

export const projects: Project[] = [
  {
    slug: "student-budget-tracker",
    title: "Student Budget Tracker",
    category: "Mobile · Personal finance",
    summary:
      "An expense tracker built for university students, with daily, weekly, monthly, and semester budget views.",
    problem:
      "Student spending is irregular and concentrated in a few places, mostly restaurants and supermarkets. Generic finance apps do not frame a budget around a semester, which is the period that actually matters to a student.",
    role: "Design and development",
    notes: [
      "Budget views at daily, weekly, monthly, and semester granularity, so the same transactions can be read at whichever level matters at the time.",
      "Spending grouped by common student categories, including restaurants and supermarkets, with analytics on where money goes.",
      "Built in Flutter with Firebase as the backend, and Kotlin for the Android layer.",
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
      "Simple transaction entry as the core loop, so record keeping stays fast enough to actually happen.",
      "Reporting focused on business-friendly visibility rather than accounting jargon.",
      "A single Flutter codebase so the same ledger works across devices.",
    ],
    stack: ["Flutter", "Dart"],
    status: "In progress",
  },
  {
    slug: "architect-portfolio",
    title: "Architect Portfolio",
    category: "Web · Personal brand site",
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
    stack: ["React", "TypeScript", "Vercel"],
    status: "Live",
    href: "https://favour-ogabi.vercel.app",
  },
  {
    slug: "depsense-api",
    title: "DepSense API",
    category: "Developer tooling · API",
    summary:
      "A developer-focused API with a dependency analyser and an error decoder that turns stack traces into plain-English fixes.",
    problem:
      "Dependency problems and cryptic stack traces slow developers down in every ecosystem. DepSense reads the manifests developers already have and explains failures in language that points at a fix.",
    role: "Design and development",
    notes: [
      "Dependency analyser accepts package.json, pubspec.yaml, and build.gradle, covering the npm, Dart, and Android ecosystems in one tool.",
      "Error decoder translates stack traces into plain-English explanations and suggested fixes.",
      "Implemented as a Node.js API.",
    ],
    stack: ["Node.js", "REST API"],
    status: "In progress",
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: "Mobile",
    primary: true,
    items: ["Flutter", "Dart", "React Native", "Kotlin", "Jetpack Compose", "Android SDK"],
  },
  {
    title: "Web",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Vite"],
  },
  {
    title: "Backend and data",
    items: ["Firebase", "Supabase", "Node.js", "REST APIs"],
  },
  {
    title: "Tooling and design",
    items: ["Git and GitHub", "Android Studio", "Gradle", "Figma", "VS Code"],
  },
];

export const learning = ["Swift", "SwiftUI"];

export const capabilities: Capability[] = [
  {
    title: "Flutter development",
    description:
      "Cross-platform apps from a single Dart codebase, with attention to state, navigation, and screens that adapt to the device.",
    icon: Smartphone,
  },
  {
    title: "React Native development",
    description:
      "Mobile apps for teams already invested in JavaScript and React, sharing patterns with the web.",
    icon: TabletSmartphone,
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
      "Connecting apps to Firebase, Supabase, and Node.js services.",
    icon: Server,
  },
];

export const experience: Experience[] = [
  {
    period: "2024 – Present",
    role: "Junior Mobile Developer",
    organization: "Independent and freelance",
    points: [
      "Building cross-platform mobile apps with Flutter and React Native.",
      "Exploring native Android with Kotlin and Jetpack Compose.",
      "Publishing project work through GitHub-driven development.",
    ],
  },
  {
    period: "2024",
    role: "Frontend Developer",
    organization: "NACOS DU Software Development Team",
    points: [
      "Collaborated on responsive web interfaces and reusable UI components.",
      "Worked within Git-based development workflows.",
      "Helped implement features while keeping usability and performance in view.",
    ],
  },
  {
    period: "2023 – Present",
    role: "Software Engineering Student",
    organization: "University",
    points: [
      "Studying software engineering fundamentals while shipping real projects in parallel.",
      "Coursework spans data structures, programming principles, system design, and software architecture.",
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
