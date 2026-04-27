import type { Project, CreateProjectData, UpdateProjectData } from "@/types/project"

export type ProjectSummary = Omit<Project, "content" | "media">

const projects = [
  {
    id: "kocteau",
    slug: "kocteau",
    title: "Kocteau",
    description:
      "A music review platform for discovering tracks, publishing opinions, and building a social layer around music.",
    excerpt:
      "A production music review platform with auth, public profiles, review publishing, personalized feeds, and a relational Supabase backend.",
    content: [
      {
        id: "kocteau-overview",
        type: "heading",
        level: 2,
        content: "Kocteau - Music Review Platform",
      },
      {
        id: "kocteau-intro",
        type: "paragraph",
        content:
          "Kocteau is my personal product in production: a music review platform built around tracks, public profiles, reviews, follows, bookmarks, comments, notifications, and personalized feeds.",
      },
      {
        id: "kocteau-role",
        type: "paragraph",
        content:
          "I designed and built the full product flow, including authentication, onboarding, external track search, review publishing, profile states, data modeling, storage, server routes, RPCs, and deployment.",
      },
      {
        id: "kocteau-stack-intro",
        type: "paragraph",
        content: "Core stack:",
      },
      {
        id: "kocteau-stack-list",
        type: "list",
        content: [
          "Next.js App Router, React, TypeScript, Tailwind CSS, and shadcn/ui",
          "Supabase Auth, Database, Storage, relational modeling, and RPCs",
          "Deezer Search API, Vercel, Turborepo, pnpm workspaces, and ESLint",
        ],
        listType: "bullet",
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
    reading_time: 2,
    created_at: "2026-01-01T00:00:00.000000+00:00",
    updated_at: "2026-04-26T00:00:00.000000+00:00",
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
