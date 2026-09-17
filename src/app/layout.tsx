import type { Metadata, Viewport } from "next";
import { Overpass, Quicksand } from "next/font/google";

import { CursorBlob } from "@/components/cursor-blob";
import { IntroSplash } from "@/components/intro-splash";
import { RevealObserver } from "@/components/reveal-observer";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const quickSand = Quicksand({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-quicksand",
});

const overpass = Overpass({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-overpass",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  verification: {
    google: siteConfig.googleSiteVerification,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.siteName,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name}, software engineer building Flutter mobile and full-stack products`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b0c0f",
  colorScheme: "dark",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  alternateName: siteConfig.nickname,
  url: siteConfig.url,
  email: `mailto:${siteConfig.email}`,
  jobTitle: siteConfig.role,
  description: siteConfig.description,
  address: {
    "@type": "PostalAddress",
    addressCountry: "NG",
  },
  sameAs: [siteConfig.github, siteConfig.linkedin],
  knowsAbout: [
    "Flutter",
    "Dart",
    "Kotlin",
    "Jetpack Compose",
    "Android Development",
    "React",
    "Next.js",
    "TypeScript",
    "PostgreSQL",
    "Prisma",
    "Clean Architecture",
    "Full-stack development",
    "Firebase",
    "Supabase",
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${quickSand.variable} ${overpass.variable}`}
      data-scroll-behavior="smooth"
    >
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <IntroSplash />
        {children}
        <CursorBlob />
        <RevealObserver />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
