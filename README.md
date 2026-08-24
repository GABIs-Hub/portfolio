# Portfolio Site

Production-oriented personal portfolio for Ogabi David, rebuilt from a Vite React app into a strict Next.js App Router project.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Lucide React icons
- Vercel-ready metadata, sitemap, and robots routes

## Scripts

```bash
npm.cmd run dev
npm.cmd run lint
npm.cmd run build
```

## Architecture Notes

- `src/app/page.tsx` contains the server-rendered homepage composition.
- `src/lib/site.ts` contains the typed portfolio content source.
- `src/components` contains small reusable UI sections.
- `docs/technical-architecture.md` records the current architecture and future CMS/contact extension points.

The contact form from the previous Vite implementation was removed because it initialized EmailJS credentials in browser code. The first release uses direct email and social links; a server-side contact flow can be added once provider credentials are available.
