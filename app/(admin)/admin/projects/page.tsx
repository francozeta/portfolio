"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, ExternalLink, Github } from "lucide-react"
import { ProjectForm } from "@/components/admin/project-form"
import { getProjects, deleteProject } from "@/lib/projects"
import type { Project } from "@/types/project"
import { AVAILABLE_TECHNOLOGIES } from "@/lib/technologies"

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [error, setError] = useState("")

  const loadProjects = async () => {
    try {
      setLoading(true)
      const data = await getProjects()
      setProjects(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar proyectos")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProjects()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este proyecto?")) return

    try {
      await deleteProject(id)
      await loadProjects()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al eliminar proyecto")
    }
  }

  const handleFormSuccess = async () => {
    setShowForm(false)
    setEditingProject(null)
    await loadProjects()
  }

  const handleFormCancel = () => {
    setShowForm(false)
    setEditingProject(null)
  }

  // Función para renderizar el icono de una tecnología
  const renderTechIcon = (iconName: string) => {
    const tech = AVAILABLE_TECHNOLOGIES.find((t) => t.iconName === iconName)
    if (!tech) return null

    const Icon = tech.icon
    return <Icon className="h-4 w-4" />
  }

  if (showForm || editingProject) {
    return (
      <div className="max-w-4xl mx-auto">
        <ProjectForm project={editingProject || undefined} onSuccess={handleFormSuccess} onCancel={handleFormCancel} />
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Gestión de Proyectos</h1>
        <Button onClick={() => setShowForm(true)} className="bg-white text-black hover:bg-neutral-200">
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Proyecto
        </Button>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-6">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="text-center py-8">
          <p className="text-neutral-400">Cargando proyectos...</p>
        </div>
      ) : projects.length === 0 ? (
        <Card className="bg-neutral-900/50 border-neutral-700">
          <CardContent className="text-center py-8">
            <p className="text-neutral-400 mb-4">No hay proyectos creados aún</p>
            <Button onClick={() => setShowForm(true)} className="bg-white text-black hover:bg-neutral-200">
              <Plus className="mr-2 h-4 w-4" />
              Crear tu primer proyecto
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="bg-neutral-900/50 border-neutral-700">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Image */}
                  <div className="lg:w-48 lg:h-32 w-full h-48 bg-neutral-800 rounded-lg overflow-hidden flex-shrink-0">
                    {project.image_url ? (
                      <img
                        src={project.image_url || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-neutral-500">Sin imagen</div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                        <Badge
                          variant={project.status === "completed" ? "default" : "secondary"}
                          className={
                            project.status === "completed" ? "bg-green-600 text-white" : "bg-yellow-600 text-white"
                          }
                        >
                          {project.status === "completed" ? "Completado" : "En Progreso"}
                        </Badge>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingProject(project)}
                          className="bg-neutral-800/50 border-neutral-600 text-white hover:bg-neutral-700/50"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(project.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <p className="text-neutral-300 mb-4 line-clamp-2">{project.description}</p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies &&
                        project.technologies.map((tech) => (
                          <Badge
                            key={tech.name}
                            variant="secondary"
                            className="bg-white/10 text-white flex items-center gap-1 border-neutral-100/20 rounded-full px-2"
                          >
                            {renderTechIcon(tech.iconName)}
                            <span className="text-xs">{tech.name}</span>
                          </Badge>
                        ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-3">
                      {project.repo_url && (
                        <a
                          href={project.repo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-neutral-400 hover:text-white transition-colors"
                        >
                          <Github className="h-5 w-5" />
                        </a>
                      )}
                      {project.deploy_url && (
                        <a
                          href={project.deploy_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-neutral-400 hover:text-white transition-colors"
                        >
                          <ExternalLink className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
