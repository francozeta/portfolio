"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Grid, List } from "lucide-react"
import { ProjectCard } from "./project-card"
import { getProjects } from "@/lib/projects"
import type { Project } from "@/types/project"
import { Skeleton } from "@/components/ui/skeleton"

export function WorkLayout() {
  const [projects, setProjects] = useState<Project[]>([])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<"all" | "completed" | "in_progress">("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await getProjects()
        setProjects(data)
        setFilteredProjects(data)
      } catch (error) {
        console.error("Error loading projects:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [])

  useEffect(() => {
    let filtered = projects

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.technologies.some((tech) => tech.name.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Filter by status
    if (selectedStatus !== "all") {
      filtered = filtered.filter((project) => project.status === selectedStatus)
    }

    setFilteredProjects(filtered)
  }, [projects, searchTerm, selectedStatus])

  if (loading) {
    return (
      <section className="bg-neutral-950 pt-24 pb-16 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-24 px-6 sm:px-12 lg:px-24 xl:px-56">
        <div className="max-w-7xl mx-auto">
          {/* Header skeleton */}
          <div className="text-center mb-16">
            <Skeleton className="h-4 w-32 mx-auto mb-4" />
            <Skeleton className="h-12 w-80 mx-auto mb-6" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>

          {/* Filters skeleton */}
          <div className="mb-12 space-y-4">
            <div className="flex gap-4">
              <Skeleton className="h-10 flex-1" />
              <Skeleton className="h-10 w-10" />
            </div>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-20 rounded-full" />
              ))}
            </div>
          </div>

          {/* Projects skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <div className="flex gap-2">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <Skeleton key={j} className="h-6 w-16 rounded-full" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-neutral-950 pt-24 pb-16 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-24 px-6 sm:px-12 lg:px-24 xl:px-56">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap border-transparent bg-neutral-800 text-neutral-200 mb-4">
            <span className="mr-1">✦</span>
            Portfolio
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            My Work & Projects
          </h1>
          <p className="text-base md:text-lg text-neutral-300 max-w-3xl mx-auto">
            A collection of projects I've built — from concept to deployment. Each project represents a unique challenge
            and learning experience.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-12 space-y-4">
          {/* Search and View Toggle */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-neutral-900/50 border-neutral-700 text-white placeholder:text-neutral-400"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              className="bg-neutral-900/50 border-neutral-700 text-white hover:bg-neutral-800/70 flex-shrink-0"
            >
              {viewMode === "grid" ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
            </Button>
          </div>

          {/* Status Filters */}
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={selectedStatus === "all" ? "default" : "outline"}
              className={`cursor-pointer transition-colors text-sm ${
                selectedStatus === "all"
                  ? "bg-white text-black"
                  : "bg-transparent text-white border-neutral-600 hover:bg-neutral-800"
              }`}
              onClick={() => setSelectedStatus("all")}
            >
              All ({projects.length})
            </Badge>
            <Badge
              variant={selectedStatus === "completed" ? "default" : "outline"}
              className={`cursor-pointer transition-colors text-sm ${
                selectedStatus === "completed"
                  ? "bg-white text-black"
                  : "bg-transparent text-white border-neutral-600 hover:bg-neutral-800"
              }`}
              onClick={() => setSelectedStatus("completed")}
            >
              Completed ({projects.filter((p) => p.status === "completed").length})
            </Badge>
            <Badge
              variant={selectedStatus === "in_progress" ? "default" : "outline"}
              className={`cursor-pointer transition-colors text-sm ${
                selectedStatus === "in_progress"
                  ? "bg-white text-black"
                  : "bg-transparent text-white border-neutral-600 hover:bg-neutral-800"
              }`}
              onClick={() => setSelectedStatus("in_progress")}
            >
              In Progress ({projects.filter((p) => p.status === "in_progress").length})
            </Badge>
          </div>
        </div>

        {/* Projects Grid */}
        <div>
          {filteredProjects.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-neutral-400 text-lg mb-4">No projects found</p>
              <p className="text-neutral-500 text-sm">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div
              className={`grid gap-8 ${
                viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
              }`}
            >
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} viewMode={viewMode} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
