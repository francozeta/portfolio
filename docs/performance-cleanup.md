# Performance and Cleanup Notes

## Completed

- `work/[slug]` no longer ships its case-study layout as a Client Component.
- `components/project/content-renderer.tsx` no longer imports `react-syntax-highlighter`; code blocks now render as lightweight semantic `<pre><code>`.
- Project detail pages now keep the editorial visual direction without requiring route-level Motion.
- Added `sitemap.ts`, `robots.ts`, `manifest.ts`, and generated Open Graph images.
- Added immutable cache headers for public SVG/image asset folders.
- Updated mobile navigation padding to respect `safe-area-inset-bottom`.
- Replaced admin placeholder `min-h-screen` with `min-h-dvh`.

## Cleanup Candidates Not Deleted Yet

These files appear legacy or currently unused, but they were not deleted because file deletion should be confirmed first.

- `components/work/project-card.tsx`
- `components/work/table-of-contents.tsx`
- `components/about/about-experience.tsx`
- `components/about/about-journey.tsx`
- `components/about/about-skills.tsx`
- `components/about/table-of-contents.tsx`
- `components/sections/music.tsx`
- `hooks/use-scroll-reveal.ts`

## Dependency Candidates

The following dependencies may be removable if no remaining imported component uses them after the final UI cleanup.

- `react-syntax-highlighter`
- `@types/react-syntax-highlighter`
- `recharts`
- `react-day-picker`
- `embla-carousel-react`
- `react-resizable-panels`
- `next-themes`

Before removing them, confirm whether the shadcn/ui components that import those packages should also stay in the repo.

## Suggested Next Check

Run Lighthouse after deployment or through Chrome DevTools against production. Local static checks pass, but production metrics like LCP, CLS, INP, and CDN cache behavior should be verified against the deployed URL.
