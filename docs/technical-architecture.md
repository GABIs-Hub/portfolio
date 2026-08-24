# Technical Architecture

## Current Release

This portfolio is a Next.js App Router application using strict TypeScript, React Server Components, Tailwind CSS v4, and static typed content.

The old Vite implementation was a single browser-heavy component with inline styles, client-side font injection, and EmailJS credentials initialized in the browser. The rebuild moves the site to server-rendered route files and keeps the content in `src/lib/site.ts` so future CMS integration is a data-source change rather than a component rewrite.

## Decisions

- Use Server Components for the page by default.
- Keep client JavaScript out of navigation by using anchors and native `details` for the mobile menu.
- Use a local system font stack for reliable offline builds and zero external font fetches.
- Use `next/image` for the hero visual asset.
- Use direct `mailto:` and social links for the first release contact flow.
- Leave Sanity as a planned adapter because project ID, dataset, schema ownership, and content workflow are not available yet.

## Future Extension Points

- Replace `src/lib/site.ts` exports with a content loader that can read from Sanity.
- Add a validated server action or route handler for contact submissions when a provider such as Resend is configured.
- Add detailed case-study routes under `src/app/work/[slug]/page.tsx`.
- Add analytics and speed insights after the deployment target is confirmed.
