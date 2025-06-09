import type { IconType } from "react-icons"

export interface Project {
  id: string
  slug: string
  title: string
  description: string | null
  image_url: string | null
  status: "in_progress" | "completed"
  featured: boolean // Nuevo campo
  technologies: TechnologyData[]
  repo_url: string | null
  deploy_url: string | null
  created_at: string
  updated_at: string
}

export interface Technology {
  name: string
  icon: IconType
  iconName: string
  color?: string
}

export interface TechnologyData {
  name: string
  iconName: string
  color?: string
}

export interface CreateProjectData {
  slug: string
  title: string
  description?: string
  image_url?: string | null
  status: "in_progress" | "completed"
  featured?: boolean
  technologies: TechnologyData[]
  repo_url?: string
  deploy_url?: string
}

export interface UpdateProjectData extends Partial<CreateProjectData> {
  id: string
}
