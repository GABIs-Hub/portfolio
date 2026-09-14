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

- `src/app/layout.tsx` sets metadata, the font, structured data, and the two client islands (cursor and scroll reveal).
- `src/app/page.tsx` is the server-rendered homepage: hero, selected work, about, skills, capabilities, contact.
- `src/app/globals.css` holds the design tokens (colour, type scale, spacing, radius, motion) and all component styles.
- `src/lib/site.ts` is the single typed content source. Edit copy, projects, and links here.
- `src/components` contains small UI pieces. Only `mobile-nav`, `cursor-blob`, and `reveal-observer` run on the client.
- `docs/technical-architecture.md` records decisions and extension points.

## CV download

Every "Download CV" link (header, hero, mobile menu, contact list) points at `public/cv/ogabi-david-cv.pdf`. Add your PDF at that exact path and the links work with no code change. To change the path or the downloaded file name, edit `cv` in `src/lib/site.ts`. Keep the PDF reasonably small (under 1 MB) and export it with text, not as a scanned image, so recruiters' systems can parse it.

## Content rules

Everything on the site should be verifiable. Project descriptions, roles, and status are written from what the projects actually do; no user counts, clients, or outcomes are shown unless they are real.

## Contact

The contact section uses direct email, WhatsApp, and LinkedIn links. A server-side contact form can be added later once a mail provider is configured; credentials must never live in client code.
