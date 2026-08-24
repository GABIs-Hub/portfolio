import {
  BriefcaseBusiness,
  Code2,
  Github,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Smartphone,
  Sparkles,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type NavItem = {
  label: string;
  href: `#${string}`;
};

export type Project = {
  title: string;
  summary: string;
  impact: string;
  tags: string[];
  status: "Live" | "In progress" | "Private";
  href?: string;
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

export const siteConfig = {
  name: "Ogabi David",
  brand: "GABI",
  role: "Frontend and mobile developer",
  location: "Nigeria",
  email: "ogabidavid16@gmail.com",
  url: "https://gabis-workspace.vercel.app",
  repo: "https://github.com/GABIs-Hub",
  linkedin: "https://linkedin.com/in/david-ogabi-b77a2a31a",
  whatsapp: "https://wa.me/2349027876679",
  description:
    "Ogabi David builds responsive web interfaces and cross-platform mobile applications with React, Next.js, TypeScript, Flutter, Kotlin, and Firebase.",
};

export const navItems: NavItem[] = [
  { label: "Work", href: "#work" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const proofPoints = [
  "Mobile-first product engineering",
  "React, Next.js, TypeScript, and Tailwind CSS",
  "Flutter, Kotlin, Firebase, and Supabase",
  "Clean delivery for students, creators, and small businesses",
];

export const capabilities: Capability[] = [
  {
    title: "Cross-platform apps",
    description:
      "Designing Flutter and Android-first product flows with clear state, useful analytics, and responsive screens.",
    icon: Smartphone,
  },
  {
    title: "Frontend systems",
    description:
      "Building React and Next.js interfaces that are accessible, fast to scan, and easy for another engineer to extend.",
    icon: Code2,
  },
  {
    title: "Product execution",
    description:
      "Turning ambiguous ideas into scoped releases with practical content structure, deployment, and iteration paths.",
    icon: Workflow,
  },
  {
    title: "Developer tools",
    description:
      "Exploring tools that reduce debugging friction, including dependency analysis and stack-trace interpretation.",
    icon: Sparkles,
  },
];

export const projects: Project[] = [
  {
    title: "DepSense API",
    summary:
      "A developer-focused dependency analyzer and error decoder for package manifests and stack traces.",
    impact:
      "Built around the practical workflow of understanding dependency risk and translating failures into plain-language fixes.",
    tags: ["API", "Developer tools", "Node.js"],
    status: "In progress",
  },
  {
    title: "BizLedger",
    summary:
      "A cross-platform ledger and finance tracking app for small businesses.",
    impact:
      "Focuses on simple transaction entry, clean reporting, and business-friendly financial visibility across devices.",
    tags: ["Flutter", "Finance", "Mobile"],
    status: "In progress",
  },
  {
    title: "Student Budget Tracker",
    summary:
      "A student expense tracker for daily, weekly, monthly, and semester-level budget views.",
    impact:
      "Designed to make spending patterns easier to understand across common student purchase categories.",
    tags: ["Flutter", "Firebase", "Kotlin"],
    status: "In progress",
  },
  {
    title: "Architect Portfolio",
    summary:
      "A responsive personal brand site for an architect, built to present services, expertise, and visual identity clearly.",
    impact:
      "Delivered a focused, performance-minded portfolio with structured sections and a polished first impression.",
    tags: ["React", "TypeScript", "Vercel"],
    status: "Live",
    href: "https://favour-ogabi.vercel.app",
  },
];

export const experience: Experience[] = [
  {
    period: "2024 - Present",
    role: "Junior Mobile Developer",
    organization: "Self-directed / freelance",
    points: [
      "Builds cross-platform mobile apps with Flutter and React Native.",
      "Explores native Android delivery with Kotlin and Jetpack Compose.",
      "Publishes practical project work through GitHub-driven development.",
    ],
  },
  {
    period: "2024",
    role: "Frontend Developer",
    organization: "NACOS DU Software Development Team",
    points: [
      "Collaborated on responsive web interfaces and reusable UI components.",
      "Worked within Git-based development workflows.",
      "Contributed implementation support while keeping usability and performance in view.",
    ],
  },
  {
    period: "2023 - Present",
    role: "Software Engineering Student",
    organization: "University",
    points: [
      "Studies software engineering fundamentals while shipping real projects.",
      "Applies data structures, programming principles, architecture, and product thinking through practice.",
    ],
  },
];

export const socials = [
  { label: "GitHub", href: siteConfig.repo, icon: Github },
  { label: "LinkedIn", href: siteConfig.linkedin, icon: Linkedin },
  { label: "WhatsApp", href: siteConfig.whatsapp, icon: MessageCircle },
  { label: "Email", href: `mailto:${siteConfig.email}`, icon: Mail },
];

export const highlights = [
  { label: "Primary stack", value: "Next.js, React, TypeScript, Flutter" },
  { label: "Product focus", value: "Student tools, finance workflows, personal brands" },
  { label: "Delivery mode", value: "Accessible UI, clean structure, Vercel deployment" },
  { label: "Location", value: siteConfig.location, icon: MapPin },
  { label: "Availability", value: "Open to frontend and mobile opportunities", icon: BriefcaseBusiness },
];
