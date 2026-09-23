# Technical Architecture

## Current Release

This portfolio is a Next.js App Router application using strict TypeScript, React Server Components, Tailwind CSS v4 for preflight and utilities, and a hand-written, token-based stylesheet. Content is static and typed in `src/lib/site.ts`.

The original Vite implementation was a single browser-heavy component with inline styles, client-side font injection, GSAP-driven cursor blobs with SVG filters, and EmailJS credentials in the browser. The Next.js rebuild moved the site to server-rendered route files. This upgrade keeps that architecture and restores the parts of the original identity worth keeping (dark theme, blob cursor, mobile-first positioning) in a lighter form.

## Decisions

- Server Components by default. Client islands are limited to `MobileNav`, `ThemeToggle`, `CursorBlob`, `RevealObserver`, `ExternalActionLink`, and `IntroSplash`, each owning a browser-only interaction.
- In-page navigation uses plain anchors with `scroll-padding-top`, not `next/link`, to avoid shipping router code for hash links.
- The homepage includes an accessible `SectionProgress` client island: a fixed desktop rail and compact mobile tick navigation track the six primary sections without intercepting native wheel, touch, or keyboard scrolling. The native scrollbar is visually hidden only on pages that render the island (`html:has(.section-progress)`), so case studies keep the native scrollbar and inherit its colour from `color-scheme`. Reduced motion disables indicator transitions and smooth jumps.
- Quicksand is loaded through `next/font/google`, which self-hosts the font at build time. Builds need network access to fetch it once; there is no runtime request.
- Design tokens live as CSS custom properties in `globals.css` (surfaces, text, accent, type scale, spacing, radius, motion). Components reference tokens rather than raw values, so no component knows which theme is active.
- Theme-agnostic tokens (type, layout, shape, motion) are declared once on `:root`; theme tokens are declared per theme under `:root[data-theme="dark"]` and `:root[data-theme="light"]`. Dark is the default and the primary identity, so the palette resolves with no attribute present.
- Light mode is an art-directed warm-paper palette, not an inversion: a lifted paper background (`#f6f4ef`), white top-step surfaces, restrained alpha hairlines that mirror the dark theme's border visibility, near-black text, and the brand teal darkened to `#0b7a68` so it passes AA as text. Dark mode values are unchanged.
- The cursor is a single soft blob plus a dot, moved with `translate3d` in a `requestAnimationFrame` loop that stops when settled. It renders only for `pointer: fine` and `hover: hover` devices with no reduced-motion preference, and uses no filters or backdrop blur.
- Scroll reveals are CSS transitions toggled by one `IntersectionObserver`. The observer is keyed to the active pathname so newly mounted homepage content is initialized after case-study navigation; this avoids the blank-looking return state without forcing a page reload. Elements already in the viewport at hydration are marked visible before the transition class is enabled, so nothing flashes. Without JavaScript, or with reduced motion, all content is simply visible.
- Case-study pagination derives previous/next links from the ordered `projects` array, wraps at the boundaries, and keeps all-work navigation inside the App Router.
- `ExternalActionLink` provides immediate pending feedback, an accessible live status, and duplicate-activation protection without delaying navigation, downloads, or mail actions.
- `IntroSplash` is a session-scoped client island. It uses only CSS and `sessionStorage`, appears once per browser session, and exits quickly without blocking server-rendered content or internal route transitions.
- `ThemeToggle` is a two-state client island backed by `useSyncExternalStore` reading the `<html data-theme>` attribute, which is the source of truth, so the control always reflects what is painted. Both icons are rendered and the correct one is selected in CSS, so the right icon is painted before hydration and hydration output is identical to the server markup. Switching writes `localStorage` and sets the attribute; there is no reload and no library.
- Initial theme is resolved by a small synchronous inline script that is the first node in `<body>`, so it runs before anything is painted: stored choice, then `prefers-color-scheme`, then dark. An explicit choice always wins, and the persisted value is re-read on later loads. `suppressHydrationWarning` is set on `<html>` only, which is the single attribute the script may change. `next/script` with `beforeInteractive` was rejected because it queues the script for the framework bundle and reintroduces a flash of the wrong theme.
- `prefers-color-scheme` is followed only until the visitor makes a choice; the toggle rewrites the `theme-color` meta tags so mobile browser chrome matches the active theme.
- Contact uses direct `mailto:`, WhatsApp, and LinkedIn links. No credentials in client code.
- `robots` and `sitemap` are generated by `src/app/robots.ts` and `src/app/sitemap.ts`, including statically generated case-study routes.

## Future Extension Points

- Add a validated server action or route handler for contact submissions when a provider such as Resend is configured.
- Case-study routes live under `src/app/work/[slug]/page.tsx`; `Project.slug` and typed project evidence drive static generation.
- Regenerate `public/og-image.png` to match the dark visual system.
- Replace `src/lib/site.ts` exports with a content loader if a CMS is adopted.
- Add analytics after the deployment target is confirmed.
