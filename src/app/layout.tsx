import type { Metadata, Viewport } from "next";
import { Overpass, Quicksand } from "next/font/google";

import { CursorBlob } from "@/components/cursor-blob";
import { IntroSplash } from "@/components/intro-splash";
import { RevealObserver } from "@/components/reveal-observer";
import { siteConfig } from "@/lib/site";
import { DEFAULT_THEME, THEME_COLORS, themeInitScript } from "@/lib/theme";
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
  // Pre-script defaults follow the operating system; the theme toggle then
  // rewrites these to match the active theme.
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: THEME_COLORS.dark },
    { media: "(prefers-color-scheme: light)", color: THEME_COLORS.light },
  ],
  colorScheme: "dark light",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteConfig.url}/#person`,
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

/** Renders the shared document shell, global client effects, and person metadata. */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // Dark is the server-rendered default. `themeInitScript` runs before the first
  // paint and may replace it with the visitor's stored theme, so hydration
  // warnings are suppressed for the `<html>` element only.
  return (
    <html
      lang="en"
      className={`${quickSand.variable} ${overpass.variable}`}
      data-scroll-behavior="smooth"
      data-theme={DEFAULT_THEME}
      suppressHydrationWarning
    >
      <body>
        {/* Inline and synchronous on purpose: it is the first node in <body>, so it
            runs in the same parser task as the start of the body and therefore
            before any content is painted. `next/script` would queue it for the
            framework bundle and reintroduce a flash of the wrong theme. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
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
