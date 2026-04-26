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

## Current Patterns

- Hero profile row: small circular photo, name, role, Kocteau logo link.
- Hero prose: two compact paragraphs, inline links, one italic emotional phrase.
- Project cards: quiet bordered cards, image/logo top, title and short description below.
- Skills rows: compact two-column rows with `11rem` title column and muted descriptive text.
- Experience rows: bordered top/bottom list with linked rows for projects and plain rows for education.
- Other/contact: small link cards for Kocteau, LinkedIn, GitHub, and email.
- Future sections should continue the same `max-w-2xl` centered rhythm before introducing wider layouts.
