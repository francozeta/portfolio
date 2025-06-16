import type { IconType } from "react-icons"

// Content block types for rich content
export type ContentBlock =
  | ParagraphBlock
  | HeadingBlock
  | ImageBlock
  | CodeBlock
  | ListBlock
  | QuoteBlock
  | LinkBlock
  | DividerBlock

export interface BaseBlock {
  id: string
  type: string
}

export interface ParagraphBlock extends BaseBlock {
  type: "paragraph"
  content: string
}

export interface HeadingBlock extends BaseBlock {
  type: "heading"
  content: string
  level: 1 | 2 | 3 | 4 | 5 | 6
}

export interface ImageBlock extends BaseBlock {
  type: "image"
  content: {
    url: string
    alt: string
    caption?: string
    width?: number
    height?: number
  }
}

export interface CodeBlock extends BaseBlock {
  type: "code"
  content: string
  language?: string
  filename?: string
}

export interface ListBlock extends BaseBlock {
  type: "list"
  content: string[]
  listType: "bullet" | "numbered"
}

export interface QuoteBlock extends BaseBlock {
  type: "quote"
  content: string
  author?: string
}

export interface LinkBlock extends BaseBlock {
  type: "link"
  content: {
    url: string
    title: string
    description?: string
    image?: string
  }
}

export interface DividerBlock extends BaseBlock {
  type: "divider"
}

// Media types
export interface ProjectMedia {
  id: string
  project_id: string
  file_name: string
  file_url: string
  file_type: "image" | "video" | "document"
  file_size?: number
  alt_text?: string
  caption?: string
  position: number
  created_at: string
  updated_at: string
}

// Updated Project interface
export interface Project {
  id: string
  slug: string
  title: string
  description: string | null
  excerpt?: string | null
  content: ContentBlock[]
  image_url: string | null
  status: "in_progress" | "completed"
  featured: boolean
  technologies: TechnologyData[]
  repo_url: string | null
  deploy_url: string | null
  reading_time?: number
  created_at: string
  updated_at: string
  media?: ProjectMedia[]
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
  excerpt?: string
  content?: ContentBlock[]
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
