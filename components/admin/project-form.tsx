"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Upload, X, Loader2 } from "lucide-react"
import type { Project, CreateProjectData, Technology, TechnologyData } from "@/types/project"
import { createProject, updateProject, uploadProjectImage } from "@/lib/projects"
import { AVAILABLE_TECHNOLOGIES } from "@/lib/technologies"

interface ProjectFormProps {
  project?: Project
  onSuccess: () => void
  onCancel: () => void
}

export function ProjectForm({ project, onSuccess, onCancel }: ProjectFormProps) {
  const [formData, setFormData] = useState({
    title: project?.title || "",
    slug: project?.slug || "",
    description: project?.description || "",
    status: project?.status || ("in_progress" as const),
    repo_url: project?.repo_url || "",
    deploy_url: project?.deploy_url || "",
  })

  // Inicializar tecnologías seleccionadas
  const [selectedTechnologies, setSelectedTechnologies] = useState<Technology[]>(() => {
    if (!project?.technologies) return []

    return project.technologies
      .map((techData) => {
        const tech = AVAILABLE_TECHNOLOGIES.find((t) => t.iconName === techData.iconName)
        return tech || null
      })
      .filter(Boolean) as Technology[]
  })

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(project?.image_url || null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = () => setImagePreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const addTechnology = (tech: Technology) => {
    if (!selectedTechnologies.find((t) => t.name === tech.name)) {
      setSelectedTechnologies([...selectedTechnologies, tech])
    }
  }

  const removeTechnology = (techName: string) => {
    setSelectedTechnologies(selectedTechnologies.filter((t) => t.name !== techName))
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: project ? prev.slug : generateSlug(title),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      let imageUrl = project?.image_url || null

      // Upload image if a new one was selected
      if (imageFile) {
        imageUrl = await uploadProjectImage(imageFile, formData.slug)
      }

      // Convertir technologies a format para guardar en DB
      const technologiesData: TechnologyData[] = selectedTechnologies.map((tech) => ({
        name: tech.name,
        iconName: tech.iconName,
        color: tech.color,
      }))

      const projectData: CreateProjectData = {
        ...formData,
        image_url: imageUrl,
        technologies: technologiesData,
      }

      if (project) {
        await updateProject({ id: project.id, ...projectData })
      } else {
        await createProject(projectData)
      }

      onSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar el proyecto")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="bg-neutral-900/50 border-neutral-700">
      <CardHeader>
        <CardTitle className="text-white">{project ? "Editar Proyecto" : "Nuevo Proyecto"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div>
            <Label className="text-white">Imagen del Proyecto</Label>
            <div className="mt-2">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => {
                      setImageFile(null)
                      setImagePreview(null)
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-neutral-600 border-dashed rounded-lg cursor-pointer bg-neutral-800/50 hover:bg-neutral-800/70">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-4 text-neutral-400" />
                    <p className="mb-2 text-sm text-neutral-400">
                      <span className="font-semibold">Click para subir</span> o arrastra una imagen
                    </p>
                    <p className="text-xs text-neutral-500">PNG, JPG o WEBP (MAX. 5MB)</p>
                  </div>
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                </label>
              )}
            </div>
          </div>

          {/* Title and Slug */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title" className="text-white">
                Título
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="bg-neutral-800/50 border-neutral-600 text-white"
                required
              />
            </div>
            <div>
              <Label htmlFor="slug" className="text-white">
                Slug
              </Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                className="bg-neutral-800/50 border-neutral-600 text-white"
                required
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <Label className="text-white">Estado</Label>
            <Select
              value={formData.status}
              onValueChange={(value: "in_progress" | "completed") =>
                setFormData((prev) => ({ ...prev, status: value }))
              }
            >
              <SelectTrigger className="bg-neutral-800/50 border-neutral-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="in_progress">En Progreso</SelectItem>
                <SelectItem value="completed">Completado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="text-white">
              Descripción
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              className="bg-neutral-800/50 border-neutral-600 text-white"
              rows={4}
            />
          </div>

          {/* Technologies */}
          <div>
            <Label className="text-white">Tecnologías</Label>
            <div className="mt-2 space-y-3">
              <Select
                onValueChange={(value) => {
                  const tech = AVAILABLE_TECHNOLOGIES.find((t) => t.name === value)
                  if (tech) addTechnology(tech)
                }}
              >
                <SelectTrigger className="bg-neutral-800/50 border-neutral-600 text-white">
                  <SelectValue placeholder="Seleccionar tecnología" />
                </SelectTrigger>
                <SelectContent>
                  {AVAILABLE_TECHNOLOGIES.map((tech) => {
                    const Icon = tech.icon
                    return (
                      <SelectItem key={tech.name} value={tech.name}>
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4" />
                          <span>{tech.name}</span>
                        </div>
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>

              <div className="flex flex-wrap gap-2">
                {selectedTechnologies.map((tech) => {
                  const Icon = tech.icon
                  return (
                    <Badge
                      key={tech.name}
                      variant="secondary"
                      className={`${tech.color || "bg-neutral-700 text-white"} flex items-center gap-1 border-neutral-100/20 rounded-full px-2`}
                    >
                      <Icon className="h-3 w-3" />
                      <span>{tech.name}</span>
                      <button
                        type="button"
                        onClick={() => removeTechnology(tech.name)}
                        className="ml-1 hover:bg-black/20 rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )
                })}
              </div>
            </div>
          </div>

          {/* URLs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="repo_url" className="text-white">
                URL del Repositorio
              </Label>
              <Input
                id="repo_url"
                type="url"
                value={formData.repo_url}
                onChange={(e) => setFormData((prev) => ({ ...prev, repo_url: e.target.value }))}
                className="bg-neutral-800/50 border-neutral-600 text-white"
                placeholder="https://github.com/..."
              />
            </div>
            <div>
              <Label htmlFor="deploy_url" className="text-white">
                URL del Deploy
              </Label>
              <Input
                id="deploy_url"
                type="url"
                value={formData.deploy_url}
                onChange={(e) => setFormData((prev) => ({ ...prev, deploy_url: e.target.value }))}
                className="bg-neutral-800/50 border-neutral-600 text-white"
                placeholder="https://..."
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={loading} className="bg-white text-black hover:bg-neutral-200">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                <>{project ? "Actualizar" : "Crear"} Proyecto</>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={loading}
              className="bg-neutral-800/50 border-neutral-600 text-white hover:bg-neutral-700/50"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
