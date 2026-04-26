import type { Project, CreateProjectData, UpdateProjectData } from "@/types/project"

export type ProjectSummary = Omit<Project, "content" | "media">

const projects = [
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
