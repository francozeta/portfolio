# Franco Zeta Portfolio Interface Direction

## Direction

Dark editorial portfolio inspired by `jakub.kr`, adapted for Franco Zeta and Kocteau. The site should feel quiet, personal, precise, and product-minded: less landing page, more curated notebook/studio index.

## Feel

- Personal but professional.
- Compact, readable, and intentional.
- Black canvas, white primary text, soft neutral hierarchy.
- Inline links should feel like part of the writing, not CTA buttons.
- Kocteau is the main identity anchor.

## Layout

- Main content column: `max-w-2xl`, centered with `mx-auto`.
- Sections should share the same horizontal axis as the hero.
- Prefer compact sections with clear labels: `Projects`, `Writing`, `Skills`, `Contact`.
- Avoid oversized hero typography and generic full-screen marketing blocks.

## Depth

- Use dark surfaces and very soft borders.
- Primary canvas: `bg-neutral-950`.
- Cards: `bg-neutral-950` or `bg-neutral-900/60`.
- Borders: `border-white/[0.08]` to `border-white/[0.10]`.
- Hover borders can rise gently to `border-white/25`.
- Avoid glows, heavy shadows, and decorative gradients.

## Typography

- Body text should feel editorial and calm.
- Use `text-pretty` on paragraphs and `text-balance` on headings.
- Keep headings modest: section titles around `text-base` unless a detail page needs more hierarchy.
- Use italic serif spans sparingly for personal emphasis, like `care deeply`.

## Interaction

- Prefer inline links with underline and subtle color changes.
- Interaction feedback should stay under `200ms`.
- Animate only opacity/transform if animation is needed.
- Keep focus rings visible on links and interactive cards.
- Avoid hover glow/destello. Hover can reveal an arrow, shift text color, or scale on press, but surfaces should not brighten with a flashy shadow.

## Current Patterns

- Hero profile row: small circular photo, name, role, Kocteau logo link.
- Hero prose: two compact paragraphs, inline links, one italic emotional phrase.
- Home project cards: quiet shadow-ring surfaces with a centered grayscale logo mark, small tabular index, title and short description below. Use `logo_url` for card identity and keep `image_url` for larger project screenshots/details.
- Skills rows: compact two-column rows with `11rem` title column and muted descriptive text.
- Experience rows: bordered top/bottom list with linked rows for projects and plain rows for education.
- Other/contact: small link cards for Kocteau, LinkedIn, GitHub, and email.
- Footer: centered on the same `max-w-2xl` axis, small text signature, 40px circular social links, and enough mobile bottom padding for the fixed navigation.
- About detail page: no portrait/photo; use an editorial intro followed by Kocteau, Capabilities, Timeline, Principles, and Currently sections.
- Work index page: compact editorial layout with server-provided project data, one restrained featured surface, a problem/solution/role/stack frame, typographic project index, restrained link actions, and Motion limited to opacity/transform under 200ms.
- Work detail pages: editorial case-note layout on `max-w-2xl`; compact back link, small circular project logo, title/excerpt, metadata rows, quiet preview surface, stack pills, content as `Case notes`, and no floating table-of-contents.
- About page: no portrait/photo; use CV-backed facts, Kocteau as the main product story, border-y editorial rows, compact capability/timeline/principle sections, and small 40px action links.
- Detail polish: prefer static shadow rings over card borders for depth surfaces, use concentric radii (`rounded-[22px] p-1` with `rounded-[18px]` inner surfaces), add pure white/10 image outlines in dark mode, use tabular numbers in indexes/years, and add `active:scale-[0.96]` only to action-like links.
- Future sections should continue the same `max-w-2xl` centered rhythm before introducing wider layouts.
