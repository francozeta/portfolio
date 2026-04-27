import type { Project, CreateProjectData, UpdateProjectData } from "@/types/project"

export type ProjectSummary = Omit<Project, "content" | "media">

const projects = [
  {
    id: "kocteau",
    slug: "kocteau",
    title: "Kocteau",
    description:
      "A social music network for reviewing songs, expressing taste, and discovering music through people, tags, and lightweight recommendations.",
    excerpt:
      "A Letterboxd-inspired music product with OTP auth, taste onboarding, Deezer search, reviews, public profiles, track pages, and a Supabase/Postgres backend.",
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
          "Music discovery is personal, but most music products optimize playback, cataloging, or passive recommendation. Kocteau explores a more social question: what would a Letterboxd-like layer for songs feel like if reviews, taste, and discovery lived in the same product?",
      },
      {
        id: "kocteau-problem-quote",
        type: "quote",
        content:
          "Kocteau is built around a simple belief: music taste becomes more meaningful when people can explain it, not only stream it.",
      },
      {
        id: "kocteau-problem-context",
        type: "paragraph",
        content:
          "Playlists show what people collect, scrobbles show what people played, and algorithms suggest what might come next. But the human layer often disappears into group chats, social posts, or notes that are hard to revisit. Kocteau turns that behavior into a product loop.",
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
          "The core loop combines explicit taste with social activity. A user signs in with email OTP, completes a profile, selects preference tags, reviews songs found through Deezer, and then discovers more music through reviews, follows, and feed signals.",
      },
      {
        id: "kocteau-product-flow",
        type: "process",
        content: [
          {
            title: "Sign in",
            description: "A passwordless OTP flow lowers account friction and keeps the first session focused on taste, not credentials.",
          },
          {
            title: "Shape taste",
            description: "Profile setup and preference tags create the first recommendation signals before the user has review history.",
          },
          {
            title: "Find a track",
            description: "Deezer search gives users a fast way to find music while Kocteau decides what needs to become local data.",
          },
          {
            title: "Publish a review",
            description: "A rating and written take turn listening into a reusable object attached to a profile and a track page.",
          },
          {
            title: "Interact",
            description: "Likes, bookmarks, comments, and follows make the product social and create richer signals for discovery.",
          },
          {
            title: "Recommend",
            description: "The feed can blend preference tags, social signals, recency, diversity, and fallback content as usage grows.",
          },
        ],
      },
      {
        id: "kocteau-user-journey-diagram",
        type: "image",
        content: {
          url: "/work/kocteau/user-journey.svg",
          alt: "Kocteau user journey diagram from email OTP to profile, taste setup, For You feed, and review creation.",
          caption:
            "User journey: Kocteau moves from low-friction auth into taste setup, then into discovery and review creation.",
          width: 1360,
          height: 240,
        },
      },
      {
        id: "kocteau-product-surfaces",
        type: "product-surfaces",
        content: {
          title: "Product surfaces",
          description:
            "These are the product moments that make Kocteau more than a database of songs: identity, taste, publishing, and social discovery.",
          items: [
            {
              label: "Auth",
              title: "Email OTP sign in",
              description:
                "A lightweight account flow powered by Supabase Auth and email delivery, designed to avoid password friction.",
            },
            {
              label: "Taste",
              title: "Preference onboarding",
              description:
                "Explicit tags give the feed a starting point before the user has enough behavior for stronger recommendations.",
            },
            {
              label: "Search",
              title: "Deezer-powered lookup",
              description:
                "Users search real music metadata without manually creating songs, albums, or artists.",
            },
            {
              label: "Review",
              title: "Rating plus written take",
              description:
                "The composer turns a quick reaction into content that can live on feeds, profiles, and track pages.",
            },
            {
              label: "Feed",
              title: "For You direction",
              description:
                "The product direction combines human curation with lightweight recommendation signals instead of pure algorithmic opacity.",
            },
            {
              label: "Social",
              title: "Likes, comments, saves, follows",
              description:
                "Interaction primitives make taste social and give future recommendation logic more useful signals.",
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
          "Defined the MVP, user journey, review loop, onboarding model, and recommendation direction.",
          "Built the frontend with Next.js App Router, React, TypeScript, Tailwind CSS, and shadcn/ui.",
          "Modeled the backend with Supabase Auth, Postgres tables, relational entities, RLS-aware access patterns, and RPCs.",
          "Integrated Deezer search, email OTP delivery, server-state handling, deployment workflow, and production release concerns.",
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
          "I treated Kocteau as a product system, not a static demo. The architecture separates UI, server state, backend data, auth, external music metadata, and deployment so the product can keep evolving after the MVP.",
      },
      {
        id: "kocteau-architecture-diagram",
        type: "image",
        content: {
          url: "/work/kocteau/architecture.svg",
          alt: "Kocteau architecture diagram showing the Turborepo web app connected to Supabase, Deezer API, and Vercel.",
          caption:
            "Architecture diagram: the web app owns the product experience while Supabase, Deezer, and Vercel handle persistence, music metadata, and deployment.",
          width: 1360,
          height: 496,
        },
      },
      {
        id: "kocteau-architecture-map",
        type: "architecture",
        content: {
          title: "System map",
          description:
            "A compact product architecture around a Next.js web app, a Supabase data layer, Deezer for music search, email infrastructure for OTP, and Vercel as the production surface.",
          nodes: [
            {
              title: "Next.js web app",
              description:
                "The main product surface for auth, onboarding, search, review creation, profiles, feeds, and track pages.",
              items: ["App Router", "React", "TypeScript", "Tailwind", "shadcn/ui"],
            },
            {
              title: "Server state",
              description:
                "TanStack Query manages remote data, cache, optimistic interactions, and synchronization for reviews and social actions.",
              items: ["TanStack Query", "cache", "optimistic UI"],
            },
            {
              title: "Supabase",
              description:
                "Auth, Postgres, Row Level Security, Storage, and RPCs handle identity, relational product data, and critical writes.",
              items: ["Auth OTP", "Postgres", "RLS", "RPCs"],
            },
            {
              title: "Music metadata",
              description:
                "Deezer powers track search while Kocteau stores stable local entities so reviews can accumulate around durable records.",
              items: ["Deezer API", "track search", "entity cache"],
            },
            {
              title: "Email layer",
              description:
                "Resend SMTP supports OTP delivery and keeps auth messaging separate from product UI concerns.",
              items: ["Resend", "SMTP", "React Email"],
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
            title: "OTP-first authentication",
            problem:
              "A social product needs low-friction account creation, but handling passwords adds security and UX overhead early in the MVP.",
            decision:
              "Use Supabase Auth with email OTP and pair onboarding with profile and taste setup instead of password creation.",
            tradeoff:
              "The app avoids password management, but email delivery, expired codes, and redirect states need careful testing.",
          },
          {
            title: "Entity caching layer",
            problem:
              "Deezer is useful for search, but relying on an external API as the source of truth would make reviews and track pages fragile.",
            decision:
              "Create or reuse local `entities` when users publish reviews, then attach ratings, profile activity, and track pages to those records.",
            tradeoff:
              "Metadata can become slightly stale, but Kocteau gets durable IDs, fewer repeated external calls, and data it can query reliably.",
          },
          {
            title: "Postgres and RLS over NoSQL",
            problem:
              "The product depends on relationships between users, reviews, entities, likes, comments, bookmarks, follows, and taste tags.",
            decision:
              "Use Supabase Postgres with relational modeling and RLS-aware access rules instead of a loose document model.",
            tradeoff:
              "The schema requires more upfront thinking, but joins, constraints, and policy-driven access fit the product better.",
          },
          {
            title: "TanStack Query for server state",
            problem:
              "Reviews and social interactions change often, and manually coordinating fetches, cache, loading states, and optimistic updates gets messy.",
            decision:
              "Use TanStack Query for server-state synchronization, local cache, and interaction feedback.",
            tradeoff:
              "It adds dependency and bundle weight, but reduces custom state code and makes interactive surfaces feel faster.",
          },
          {
            title: "Hybrid recommendation direction",
            problem:
              "A new user has almost no behavior history, so a pure algorithmic feed starts cold and generic.",
            decision:
              "Blend explicit taste tags, reviewed tracks, follows, recent activity, diversity, and fallback content into the discovery model.",
            tradeoff:
              "The feed becomes more opinionated, but the first session can feel relevant before the product has enough long-term data.",
          },
          {
            title: "Backend-as-a-service over custom infrastructure",
            problem:
              "The MVP needed auth, database, storage, policies, and server writes without spending the project budget on infrastructure.",
            decision:
              "Use Supabase and Vercel instead of maintaining a custom Node backend and self-managed database.",
            tradeoff:
              "There is some platform coupling, but the product can move faster and keep engineering effort on the user experience.",
          },
        ],
      },
      {
        id: "kocteau-measurement-divider",
        type: "divider",
      },
      {
        id: "kocteau-measurement-heading",
        type: "heading",
        level: 2,
        content: "Measurement",
      },
      {
        id: "kocteau-measurement-intro",
        type: "paragraph",
        content:
          "The case study should not invent traction. Instead, Kocteau can be evaluated through the signals that matter for this product category: activation, publishing, engagement, recommendation quality, and system health.",
      },
      {
        id: "kocteau-metrics",
        type: "metrics",
        content: {
          title: "Observable signals",
          description:
            "The next iteration should turn these product questions into dashboard queries or analytics events.",
          items: [
            {
              label: "Activation",
              value: "OTP to taste",
              description: "How many users verify email, finish profile setup, and select preference tags.",
            },
            {
              label: "Creation",
              value: "First review",
              description: "How quickly a new user searches a track and publishes their first rating or written take.",
            },
            {
              label: "Engagement",
              value: "Social actions",
              description: "Likes, saves, comments, and follows show whether reviews create interaction beyond reading.",
            },
            {
              label: "Discovery",
              value: "Feed quality",
              description: "Feed loads, clicks, follows, and review actions can reveal whether recommendations feel useful.",
            },
          ],
        },
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
          "Kocteau reached a functional MVP shape: users can authenticate, complete onboarding, search music through Deezer, publish reviews, browse social surfaces, and view public profiles and track pages. The strongest result is not a single feature, but a coherent loop that can now be tested with real behavior.",
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
          "Recommendation quality starts before the algorithm. Onboarding, taste tags, empty states, and social defaults shape the first session.",
          "External APIs are inputs, not product foundations. Deezer can search music, but Kocteau needs its own stable entities.",
          "Server state deserves a dedicated model. Reviews, likes, comments, and saves feel better when cache and optimistic states are handled deliberately.",
          "Relational data fits social products. Reviews, follows, profiles, and entities benefit from constraints and explicit relationships.",
          "OTP auth looks simple but has hidden edge cases: email delay, spam folders, expired codes, redirects, and incomplete profiles.",
        ],
        listType: "numbered",
      },
      {
        id: "kocteau-next-heading",
        type: "heading",
        level: 2,
        content: "Next steps",
      },
      {
        id: "kocteau-next-list",
        type: "list",
        content: [
          "Add real product screenshots and Excalidraw/SVG diagrams for architecture, user flow, and recommendation logic.",
          "Instrument activation and engagement metrics before making claims about traction.",
          "Improve recommendation quality with more nuanced taste signals and feedback loops.",
          "Expand notifications and retention surfaces once review publishing is validated.",
          "Add automated tests around auth, review creation, social interactions, and feed behavior.",
        ],
        listType: "bullet",
      },
      {
        id: "kocteau-live-link",
        type: "link",
        content: {
          url: "https://kocteau.com",
          title: "Open Kocteau",
          description: "A social music review product built around tracks, taste, profiles, and discovery.",
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
        name: "React",
        color: "bg-transparent text-white",
        iconName: "FaReact",
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
        name: "PostgreSQL",
        color: "bg-transparent text-white",
        iconName: "SiPostgresql",
      },
      {
        name: "Tailwind CSS",
        color: "bg-transparent text-white",
        iconName: "SiTailwindcss",
      },
      {
        name: "Shadcn/ui",
        color: "bg-transparent text-white",
        iconName: "SiShadcnui",
      },
      {
        name: "Vercel",
        color: "bg-transparent text-white",
        iconName: "SiVercel",
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
