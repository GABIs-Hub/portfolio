# Portfolio Site

Personal portfolio for Ogabi David (Gabi), a mobile developer working with Flutter, React Native, and Kotlin, with web development as a second capability.

## Stack

- Next.js 16 App Router with React Server Components
- React 19
- TypeScript (strict)
- Tailwind CSS v4 (preflight and utilities) with hand-written, token-based CSS
- Quicksand via `next/font` (self-hosted at build time)
- Lucide React icons
- Vercel-ready metadata, sitemap, robots, and JSON-LD

## Scripts

```bash
npm install
npm run dev
npm run lint
npm run build
```

## Architecture

- `src/app/layout.tsx` sets metadata, the fonts, structured data, and shared client behavior; the homepage also mounts focused client islands for the cursor, scroll reveal, intro splash, actions, section progress navigation, and a restrained transform-only hero parallax layer.
- `src/app/page.tsx` is the server-rendered homepage: hero, selected work, about, skills, capabilities, contact.
- `src/app/work/[slug]/page.tsx` renders typed static case-study pages for selected projects.
- `src/app/globals.css` holds the design tokens (colour, type scale, spacing, radius, motion) and all component styles.
- `src/lib/site.ts` is the single typed content source. Edit copy, projects, and links here.
- `src/components` contains small UI pieces. Only `mobile-nav`, `cursor-blob`, and `reveal-observer` run on the client.
- `docs/technical-architecture.md` records decisions and extension points.

## CV download

Every "Download CV" link (header, hero, mobile menu, contact list) points at the verified PDF in `public/cv/Ogabi_David_Upgraded_CV.pdf`. To change the path or the downloaded file name, edit `cv` in `src/lib/site.ts`. Keep the PDF reasonably small (under 1 MB) and export it with text, not as a scanned image, so recruiters' systems can parse it.

## Content rules

Everything on the site should be verifiable. Project descriptions, roles, and status are written from what the projects actually do; no user counts, clients, or outcomes are shown unless they are real.

## Contact

The contact section uses direct email, WhatsApp, and LinkedIn links. A server-side contact form can be added later once a mail provider is configured; credentials must never live in client code.

## SEO routes

`src/app/robots.ts` and `src/app/sitemap.ts` generate the canonical `robots.txt` and `sitemap.xml` routes from `siteConfig.url`, including every statically generated project case study.
