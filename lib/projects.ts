import { supabase } from "./supabase"
import type { Project, CreateProjectData, UpdateProjectData, ContentBlock } from "@/types/project"

const MAX_RETRIES = 3
const RETRY_DELAY = 1000

async function fetchWithRetry<T>(fn: () => Promise<T>, retries = MAX_RETRIES, delay = RETRY_DELAY): Promise<T> {
  try {
    return await fn()
  } catch (error) {
    if (retries <= 0) throw error

    await new Promise((resolve) => setTimeout(resolve, delay))
    return fetchWithRetry(fn, retries - 1, delay * 2)
  }
}

export async function getProjects(): Promise<Project[]> {
  if (!supabase) {
    throw new Error("Supabase not configured. Please check your environment variables.")
  }

  return fetchWithRetry(async () => {
    const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false })

    if (error) {
      throw new Error(`Error fetching projects: ${error.message}`)
    }

    return data || []
  })
}

export async function getFeaturedProjects(): Promise<Project[]> {
  if (!supabase) {
    throw new Error("Supabase not configured")
  }

  return fetchWithRetry(async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("featured", true)
      .order("created_at", { ascending: false })
      .limit(3)

    if (error) {
      throw new Error(`Error fetching featured projects: ${error.message}`)
    }

    return data || []
  })
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (!supabase) {
    throw new Error("Supabase not configured")
  }

  return fetchWithRetry(async () => {
    const { data, error } = await supabase.from("projects").select("*").eq("slug", slug).single()

    if (error) {
      if (error.code === "PGRST116") {
        return null
      }
      throw new Error(`Error fetching project: ${error.message}`)
    }

    return data
  })
}

// Add reading time calculation
function calculateReadingTime(content: ContentBlock[]): number {
  const wordsPerMinute = 200
  let totalWords = 0

  content.forEach((block) => {
    switch (block.type) {
      case "paragraph":
      case "heading":
        totalWords += block.content.split(" ").length
        break
      case "quote":
        totalWords += block.content.split(" ").length
        break
      case "list":
        totalWords += block.content.join(" ").split(" ").length
        break
      case "code":
        totalWords += Math.ceil(block.content.split("\n").length * 2) // Code takes longer to read
        break
    }
  })

  return Math.ceil(totalWords / wordsPerMinute)
}

// Update createProject function
export async function createProject(projectData: CreateProjectData): Promise<Project> {
  if (!supabase) {
    throw new Error("Supabase not configured")
  }

  return fetchWithRetry(async () => {
    const readingTime = projectData.content ? calculateReadingTime(projectData.content) : 0

    const { data, error } = await supabase
      .from("projects")
      .insert([{ ...projectData, reading_time: readingTime }])
      .select()
      .single()

    if (error) {
      throw new Error(`Error creating project: ${error.message}`)
    }

    return data
  })
}

// Update updateProject function
export async function updateProject(projectData: UpdateProjectData): Promise<Project> {
  if (!supabase) {
    throw new Error("Supabase not configured")
  }

  return fetchWithRetry(async () => {
    const { id, ...updateData } = projectData
    const readingTime = updateData.content ? calculateReadingTime(updateData.content) : undefined

    const dataToUpdate = readingTime !== undefined ? { ...updateData, reading_time: readingTime } : updateData

    const { data, error } = await supabase.from("projects").update(dataToUpdate).eq("id", id).select().single()

    if (error) {
      throw new Error(`Error updating project: ${error.message}`)
    }

    return data
  })
}

export async function deleteProject(id: string): Promise<void> {
  if (!supabase) {
    throw new Error("Supabase not configured")
  }

  return fetchWithRetry(async () => {
    const { error } = await supabase.from("projects").delete().eq("id", id)

    if (error) {
      throw new Error(`Error deleting project: ${error.message}`)
    }
  })
}

export async function uploadProjectImage(file: File, projectSlug: string): Promise<string> {
  if (!supabase) {
    throw new Error("Supabase not configured")
  }

  return fetchWithRetry(async () => {
    const fileExt = file.name.split(".").pop()
    const fileName = `${projectSlug}-${Date.now()}.${fileExt}`
    const filePath = `${fileName}`

    const { error: uploadError } = await supabase.storage.from("project-images").upload(filePath, file)

    if (uploadError) {
      throw new Error(`Error uploading image: ${uploadError.message}`)
    }

    const { data } = supabase.storage.from("project-images").getPublicUrl(filePath)

    return data.publicUrl
  })
}
