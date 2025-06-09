import { supabase } from "./supabase"
import type { Project, CreateProjectData, UpdateProjectData } from "@/types/project"

export async function getProjects(): Promise<Project[]> {
  if (!supabase) {
    throw new Error("Supabase not configured")
  }

  const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false })

  if (error) {
    throw new Error(`Error fetching projects: ${error.message}`)
  }

  return data || []
}

export async function getFeaturedProjects(): Promise<Project[]> {
  if (!supabase) {
    throw new Error("Supabase not configured")
  }

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
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (!supabase) {
    throw new Error("Supabase not configured")
  }

  const { data, error } = await supabase.from("projects").select("*").eq("slug", slug).single()

  if (error) {
    if (error.code === "PGRST116") {
      return null
    }
    throw new Error(`Error fetching project: ${error.message}`)
  }

  return data
}

export async function createProject(projectData: CreateProjectData): Promise<Project> {
  if (!supabase) {
    throw new Error("Supabase not configured")
  }

  const { data, error } = await supabase.from("projects").insert([projectData]).select().single()

  if (error) {
    throw new Error(`Error creating project: ${error.message}`)
  }

  return data
}

export async function updateProject(projectData: UpdateProjectData): Promise<Project> {
  if (!supabase) {
    throw new Error("Supabase not configured")
  }

  const { id, ...updateData } = projectData
  const { data, error } = await supabase.from("projects").update(updateData).eq("id", id).select().single()

  if (error) {
    throw new Error(`Error updating project: ${error.message}`)
  }

  return data
}

export async function deleteProject(id: string): Promise<void> {
  if (!supabase) {
    throw new Error("Supabase not configured")
  }

  const { error } = await supabase.from("projects").delete().eq("id", id)

  if (error) {
    throw new Error(`Error deleting project: ${error.message}`)
  }
}

export async function uploadProjectImage(file: File, projectSlug: string): Promise<string> {
  if (!supabase) {
    throw new Error("Supabase not configured")
  }

  const fileExt = file.name.split(".").pop()
  const fileName = `${projectSlug}-${Date.now()}.${fileExt}`
  const filePath = `${fileName}`

  const { error: uploadError } = await supabase.storage.from("project-images").upload(filePath, file)

  if (uploadError) {
    throw new Error(`Error uploading image: ${uploadError.message}`)
  }

  const { data } = supabase.storage.from("project-images").getPublicUrl(filePath)

  return data.publicUrl
}
