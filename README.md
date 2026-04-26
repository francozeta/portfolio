# Franco Zeta's Portfolio

![Portfolio Hero](/public/images/hero.png)

> A modern, responsive portfolio website showcasing my work as a Software Developer, Systems Engineer & Designer.

**Live Demo:** [francozeta.vercel.app](https://francozeta.vercel.app)

## Features

- Modern, responsive portfolio built with Next.js App Router.
- Local, versioned project content in `lib/projects.ts`.
- Rich project detail rendering with text, images, code, lists, quotes, links, and dividers.
- Static assets in `public/images`, `public/projects`, and `public/music`.
- SEO metadata, Open Graph images, and accessible UI primitives.

## Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Static typing
- **Tailwind CSS 4** - Styling
- **shadcn-style primitives** - Local UI components
- **Lucide React / React Icons** - Icons

### Content

- **Local TypeScript data** - Project records live in `lib/projects.ts`
- **Static public assets** - Images are committed under `public/`
- **Supabase backup docs** - Legacy export and RLS notes live in `docs/`

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm type-check   # Run TypeScript compiler
```

## Project Structure

```txt
portfolio/
├── app/                 # Next.js App Router routes
├── components/          # React components
├── docs/                # Supabase export and recovery notes
├── hooks/               # Custom React hooks
├── lib/                 # Project data and utilities
├── public/              # Static assets
├── types/               # TypeScript types
└── README.md
```

## Content Workflow

The previous Supabase CMS is paused. To edit projects, update `lib/projects.ts`.

Supabase was not deleted or modified. The latest inventory is documented in `docs/supabase-inventory.md`, and the exported project data is stored in `docs/supabase-backup.json`.

## Deployment

Deploy on Vercel with the default Next.js settings. The public portfolio does not require Supabase environment variables.
