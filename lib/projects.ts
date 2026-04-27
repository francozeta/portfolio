import type { Project, CreateProjectData, UpdateProjectData } from "@/types/project"

export type ProjectSummary = Omit<Project, "content" | "media">

const projects = [
  {
    id: "kocteau",
    slug: "kocteau",
    title: "Kocteau",
    description:
      "A social music review platform for searching tracks, publishing opinions, and discovering music through people and taste.",
    excerpt:
      "A production music review platform with auth, onboarding, Deezer search, public profiles, track pages, and a relational Supabase backend.",
    content: [
      {
        id: "kocteau-problem-heading",
        type: "heading",
        level: 2,
        content: "Problem",
      },
      {
        id: "kocteau-problem-intro",
        type: "paragraph",
        content:
          "Music discovery is personal, but most music products optimize playback, charts, or cataloging. I wanted Kocteau to explore a smaller and more human question: what would a social review layer for individual tracks feel like?",
      },
      {
        id: "kocteau-problem-quote",
        type: "quote",
        content:
          "Music has playlists, scrobbles, and catalog pages. Kocteau is my attempt at giving opinions, taste, and discovery a clearer place to meet.",
      },
      {
        id: "kocteau-problem-context",
        type: "paragraph",
        content:
          "Spotify personalizes quietly, Last.fm captures listening history, Rate Your Music goes deep on cataloging, and conversations usually disappear into Discord, Twitter, or group chats. Kocteau turns that scattered behavior into a product loop.",
      },
      {
        id: "kocteau-solution-divider",
        type: "divider",
      },
      {
        id: "kocteau-solution-heading",
        type: "heading",
        level: 2,
        content: "Solution",
      },
      {
        id: "kocteau-solution-intro",
        type: "paragraph",
        content:
          "The product loop is intentionally simple: search for a track, rate it, publish a short take, and discover music through the people and taste signals around you.",
      },
      {
        id: "kocteau-product-flow",
        type: "process",
        content: [
          {
            title: "Search",
            description: "Use Deezer search to find tracks quickly without forcing users to create records manually.",
          },
          {
            title: "Review",
            description: "Write a public opinion with a rating, turning passive listening into something shareable.",
          },
          {
            title: "Publish",
            description: "Attach the review to a stable local entity, profile, activity surface, and social graph.",
          },
          {
            title: "Discover",
            description: "Use profiles, follows, track pages, and feed signals to make taste visible beyond one user.",
          },
          {
            title: "Refine",
            description: "Let explicit taste tags and future interactions improve the For You direction over time.",
          },
        ],
      },
      {
        id: "kocteau-product-surfaces",
        type: "product-surfaces",
        content: {
          title: "Product surfaces",
          description:
            "The case study should feel like a product, not a database report. These are the interface moments that carry the Kocteau loop today.",
          items: [
            {
              label: "Search",
              title: "Deezer-powered track lookup",
              description:
                "A fast entry point that lets users find music first, then lets Kocteau decide what needs to become local product data.",
            },
            {
              label: "Write",
              title: "Review composer",
              description:
                "A compact publishing moment for rating a track and turning a personal reaction into a public opinion.",
            },
            {
              label: "Track",
              title: "Shared song pages",
              description:
                "Each track becomes a stable page where reviews and ratings can accumulate beyond a single profile.",
            },
            {
              label: "Profile",
              title: "Taste as identity",
              description:
                "Public profiles make listening history, reviews, and future taste signals feel like part of a person.",
            },
            {
              label: "Feed",
              title: "Recent reviews now, richer discovery next",
              description:
                "The current feed proves the social loop while leaving room for a more personalized discovery model.",
            },
            {
              label: "Auth",
              title: "OTP and onboarding",
              description:
                "Account creation stays lightweight so the first meaningful product moment can be about taste, not passwords.",
            },
          ],
        },
      },
      {
        id: "kocteau-role-heading",
        type: "heading",
        level: 2,
        content: "Role",
      },
      {
        id: "kocteau-role-list",
        type: "list",
        content: [
          "Product design: shaping the review loop, onboarding, profile states, discovery direction, and public project narrative.",
          "Frontend engineering: Next.js App Router, React, TypeScript, Tailwind CSS, and shadcn/ui surfaces.",
          "Backend and data modeling: Supabase Auth, Postgres relationships, Storage, RLS-aware access patterns, and RPCs.",
          "Integration and deployment: Deezer Search API, Turborepo, pnpm workspaces, Vercel previews, and production release flow.",
        ],
        listType: "bullet",
      },
      {
        id: "kocteau-architecture-divider",
        type: "divider",
      },
      {
        id: "kocteau-architecture-heading",
        type: "heading",
        level: 2,
        content: "Architecture",
      },
      {
        id: "kocteau-architecture-intro",
        type: "paragraph",
        content:
          "I treated Kocteau as a product system, not just a portfolio project. The architecture separates product surfaces, shared packages, external search, and the database layer so the project can keep evolving.",
      },
      {
        id: "kocteau-architecture-map",
        type: "architecture",
        content: {
          title: "System map",
          description:
            "A compact monorepo setup around a Next.js web app, a Supabase data layer, Deezer as the external music search source, and Vercel as the production surface.",
          nodes: [
            {
              title: "Next.js web app",
              description:
                "The main product surface for auth, onboarding, search, review creation, profiles, feed views, and track pages.",
              items: ["App Router", "Server Actions", "React", "shadcn/ui", "Tailwind"],
            },
            {
              title: "Shared workspace",
              description:
                "Turborepo and pnpm keep configuration, product primitives, and future packages organized as Kocteau grows.",
              items: ["Turborepo", "pnpm workspaces", "shared config"],
            },
            {
              title: "Supabase",
              description:
                "Auth, Postgres, Storage, and RPCs handle identity, relational data, user content, and atomic backend operations.",
              items: ["Auth OTP", "Postgres", "Storage", "RPCs"],
            },
            {
              title: "Deezer API",
              description:
                "Searches tracks and provides music metadata, while Kocteau keeps stable local entities for product data.",
              items: ["Track search", "metadata", "entity cache"],
            },
            {
              title: "Vercel",
              description:
                "Hosts the production app, preview builds, and the public release surface at kocteau.com.",
              items: ["Production", "previews", "CI"],
            },
          ],
        },
      },
      {
        id: "kocteau-decisions-divider",
        type: "divider",
      },
      {
        id: "kocteau-decisions-heading",
        type: "heading",
        level: 2,
        content: "Technical decisions",
      },
      {
        id: "kocteau-decisions",
        type: "decisions",
        content: [
          {
            title: "Entity caching layer",
            problem:
              "Deezer is useful for search, but relying on it as the source of truth would make reviews, feeds, and profile history fragile.",
            decision:
              "Cache normalized tracks in Supabase after search or selection, then attach reviews, ratings, user profiles, feed entries, and track pages to stable local records.",
            tradeoff:
              "Metadata can become slightly stale, but Kocteau gets durable IDs, faster internal reads, and product data it can actually own.",
          },
          {
            title: "RPCs for critical writes",
            problem:
              "Review creation can affect multiple pieces of state: user activity, counters, notifications, and related social surfaces.",
            decision:
              "Move multi-step writes into server-side flows and RPCs instead of scattering direct writes across client components.",
            tradeoff:
              "There is more backend code to maintain, but the app avoids counter drift and keeps constraints closer to the data.",
          },
          {
            title: "Designing for a multi-signal feed",
            problem:
              "New users have very little interaction history, so a pure collaborative recommendation model would start empty.",
            decision:
              "Shape the discovery model around taste tags, reviewed tracks, followed users, recency, diversity, and fallback content as the product grows beyond the current recent-reviews feed.",
            tradeoff:
              "The feed becomes more opinionated, but the first session feels less blank and gives the product room to learn.",
          },
          {
            title: "OTP-first authentication",
            problem:
              "A personal product should keep account creation lightweight and avoid unnecessary password handling.",
            decision:
              "Use email OTP and make onboarding about taste setup rather than credentials.",
            tradeoff:
              "Email delivery, redirect states, and expired-token paths require more careful QA than a basic password form.",
          },
        ],
      },
      {
        id: "kocteau-result-divider",
        type: "divider",
      },
      {
        id: "kocteau-result-heading",
        type: "heading",
        level: 2,
        content: "Result",
      },
      {
        id: "kocteau-result",
        type: "paragraph",
        content:
          "Kocteau is live as an in-progress product at kocteau.com. The current result is not just a static demo: it has a real product loop around auth, onboarding, Deezer search, review creation, a recent-reviews feed, public user profiles, and track pages with their reviews.",
      },
      {
        id: "kocteau-learnings-heading",
        type: "heading",
        level: 2,
        content: "Learnings",
      },
      {
        id: "kocteau-learnings",
        type: "list",
        content: [
          "Decouple from external APIs early. Search providers are great inputs, but product behavior needs stable local data.",
          "Cold start is not only an algorithm problem. Onboarding, taste tags, editorial defaults, and empty states shape the first impression.",
          "RPCs are worth the overhead when a write has product consequences beyond a single table row.",
          "A monorepo adds setup cost, but it keeps a growing product easier to split into web, shared packages, and future mobile work.",
          "OTP auth looks simple in UI, but redirects, expired links, and email states need serious testing.",
        ],
        listType: "numbered",
      },
      {
        id: "kocteau-live-link",
        type: "link",
        content: {
          url: "https://kocteau.com",
          title: "Open Kocteau",
          description: "A live music review product built around tracks, taste, profiles, and social discovery.",
          image: "/kocteau-logo.svg",
        },
      },
    ],
    image_url: "/kocteau-logo.svg",
    logo_url: "/kocteau-logo.svg",
    status: "in_progress",
    featured: true,
    technologies: [
      {
        name: "Next.js",
        color: "bg-transparent text-white",
        iconName: "RiNextjsFill",
      },
      {
        name: "TypeScript",
        color: "bg-transparent text-white",
        iconName: "SiTypescript",
      },
      {
        name: "Supabase",
        color: "bg-transparent text-white",
        iconName: "SiSupabase",
      },
      {
        name: "Tailwind CSS",
        color: "bg-transparent text-white",
        iconName: "SiTailwindcss",
      },
    ],
    repo_url: "https://github.com/francozeta/kocteau",
    deploy_url: "https://kocteau.com",
    reading_time: 6,
    created_at: "2026-01-01T00:00:00.000000+00:00",
    updated_at: "2026-04-27T00:00:00.000000+00:00",
  },
  {
    id: "mubi-clone",
    slug: "mubi-clone",
    title: "MUBI Clone",
    description:
      "A curated cinema platform inspired by MUBI, built as a practical MVP with movie pages, reviews, and cinephile user profiles.",
    excerpt:
      "A functional MUBI-inspired streaming experience focused on curated films, polished UI, and full-stack product thinking.",
    content: [
      {
        id: "mubi-overview",
        type: "heading",
        level: 2,
        content: "MUBI Clone - Proyecto Web",
      },
      {
        id: "mubi-intro",
        type: "paragraph",
        content:
          "Este proyecto es un clon funcional de la plataforma MUBI, desarrollado como ejercicio de aprendizaje practico con enfoque en un MVP real. Su objetivo es ofrecer una experiencia similar a MUBI: una plataforma de cine curado, con fichas de peliculas, resenas y perfiles de usuarios cinefilos.",
      },
      {
        id: "mubi-stack-intro",
        type: "paragraph",
        content: "Tecnologias utilizadas:",
      },
      {
        id: "mubi-stack-list",
        type: "list",
        content: [
          "Next.js 15 con App Router",
          "Supabase como base de datos y backend durante el prototipo",
          "Tailwind CSS y shadcn/ui para estilos e interfaz",
        ],
        listType: "bullet",
      },
    ],
    image_url: "/projects/mubi-clone.png",
    logo_url: "/mubi-logo.svg",
    status: "completed",
    featured: true,
    technologies: [
      {
        name: "Next.js",
        color: "bg-transparent text-white",
        iconName: "RiNextjsFill",
      },
      {
        name: "TypeScript",
        color: "bg-transparent text-white",
        iconName: "SiTypescript",
      },
      {
        name: "Shadcn/ui",
        color: "bg-transparent text-white",
        iconName: "SiShadcnui",
      },
    ],
    repo_url: "https://github.com/francozeta/mubi-clone-nextjs",
    deploy_url: "https://mubi-clone.vercel.app",
    reading_time: 1,
    created_at: "2025-06-09T15:32:08.570348+00:00",
    updated_at: "2025-06-16T15:27:22.597782+00:00",
  },
] satisfies Project[]

function sortNewestFirst(items: Project[]) {
  return [...items].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
}

function toSummary(project: Project): ProjectSummary {
  const { content, media, ...summary } = project
  void content
  void media
  return summary
}

function throwLocalContentMode(): never {
  throw new Error(
    "The Supabase CMS is paused. Edit local project content in lib/projects.ts until the CMS is rebuilt.",
  )
}

export async function getProjects(): Promise<Project[]> {
  return sortNewestFirst(projects)
}

export async function getProjectSummaries(): Promise<ProjectSummary[]> {
  return sortNewestFirst(projects).map(toSummary)
}

export async function getFeaturedProjects(): Promise<ProjectSummary[]> {
  return sortNewestFirst(projects).filter((project) => project.featured).slice(0, 3).map(toSummary)
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return projects.find((project) => project.slug === slug) ?? null
}

export async function createProject(projectData: CreateProjectData): Promise<Project> {
  void projectData
  return throwLocalContentMode()
}

export async function updateProject(projectData: UpdateProjectData): Promise<Project> {
  void projectData
  return throwLocalContentMode()
}

export async function deleteProject(id: string): Promise<void> {
  void id
  throwLocalContentMode()
}

export async function uploadProjectImage(file: File, projectSlug: string): Promise<string> {
  void file
  void projectSlug
  return throwLocalContentMode()
}
