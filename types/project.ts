import type { IconType } from "react-icons"

export interface Project {
  id: string
  slug: string
  title: string
  description: string | null
  image_url: string | null
  status: "in_progress" | "completed"
  technologies: TechnologyData[] // Cambiado a TechnologyData
  repo_url: string | null
  deploy_url: string | null
  created_at: string
  updated_at: string
}

export interface Technology {
  name: string
  icon: IconType
  iconName: string // Para guardar en la DB
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
  image_url?: string | null // Permitir null
  status: "in_progress" | "completed"
  technologies: TechnologyData[] // Para guardar en la DB
  repo_url?: string
  deploy_url?: string
}

export interface UpdateProjectData extends Partial<CreateProjectData> {
  id: string
}
