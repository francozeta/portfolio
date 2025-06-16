"use client"

import { memo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, ExternalLink, Clock, CheckCircle } from "lucide-react"
import { FaGithub } from "react-icons/fa"
import type { Project } from "@/types/project"
import { AVAILABLE_TECHNOLOGIES } from "@/lib/technologies"

interface ProjectCardProps {
  project: Project
  viewMode?: "grid" | "list"
}

export const ProjectCard = memo(({ project, viewMode = "grid" }: ProjectCardProps) => {
  const renderTechIcon = (iconName: string) => {
    const tech = AVAILABLE_TECHNOLOGIES.find((t) => t.iconName === iconName)
    if (!tech) return null
    const Icon = tech.icon
    return <Icon className="h-4 w-4" />
  }

  if (viewMode === "list") {
    return (
      <article className="bg-neutral-900/50 border border-neutral-800 rounded-2xl overflow-hidden hover:border-neutral-700 transition-all duration-300 group">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-80 h-48 md:h-auto bg-neutral-800 overflow-hidden">
            {project.image_url ? (
              <Image
                src={project.image_url || "/placeholder.svg"}
                alt={`${project.title} project screenshot`}
                width={320}
                height={240}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 320px"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-neutral-700 to-neutral-800 flex items-center justify-center">
                <span className="text-neutral-500 text-sm">No image</span>
              </div>
            )}
          </div>

          <div className="flex-1 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-bold text-white group-hover:text-neutral-200 transition-colors">
                  {project.title}
                </h3>
                <Badge
                  className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
                    project.status === "completed"
                      ? "bg-green-600/20 text-green-400 border-green-600/30"
                      : "bg-orange-600/20 text-orange-400 border-orange-600/30"
                  }`}
                >
                  {project.status === "completed" ? <CheckCircle className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                  {project.status === "completed" ? "Completed" : "In Progress"}
                </Badge>
              </div>
            </div>

            <p className="text-neutral-300 text-sm mb-4 line-clamp-2">{project.excerpt || project.description}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies?.slice(0, 6).map((tech) => (
                <Badge
                  key={tech.name}
                  variant="secondary"
                  className="bg-white/10 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 border-neutral-100/20"
                >
                  {renderTechIcon(tech.iconName)}
                  <span>{tech.name}</span>
                </Badge>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <Link
                href={`/work/${project.slug}`}
                className="group/button flex items-center gap-2 text-white hover:gap-3 transition-all duration-300"
              >
                <span className="text-sm font-medium">View Details</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover/button:translate-x-1" />
              </Link>

              <div className="flex gap-2">
                {project.repo_url && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-neutral-800/50 border-neutral-600 text-white hover:bg-neutral-700/50 p-2"
                    asChild
                  >
                    <Link
                      href={project.repo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.title} source code`}
                    >
                      <FaGithub className="h-4 w-4" />
                    </Link>
                  </Button>
                )}
                {project.deploy_url && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-neutral-800/50 border-neutral-600 text-white hover:bg-neutral-700/50 p-2"
                    asChild
                  >
                    <Link
                      href={project.deploy_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.title} live demo`}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article className="bg-neutral-900/50 border border-neutral-800 rounded-2xl overflow-hidden hover:border-neutral-700 transition-all duration-300 group select-none">
      <div className="h-48 bg-neutral-800 overflow-hidden">
        {project.image_url ? (
          <Image
            src={project.image_url || "/placeholder.svg"}
            alt={`${project.title} project screenshot`}
            width={400}
            height={240}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-neutral-700 to-neutral-800 flex items-center justify-center">
            <span className="text-neutral-500 text-sm">No image</span>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-white group-hover:text-neutral-200 transition-colors">
            {project.title}
          </h3>
          <Badge
            className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
              project.status === "completed"
                ? "bg-green-600/20 text-green-400 border-green-600/30"
                : "bg-orange-600/20 text-orange-400 border-orange-600/30"
            }`}
          >
            {project.status === "completed" ? <CheckCircle className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
            {project.status === "completed" ? "Completed" : "In Progress"}
          </Badge>
        </div>

        <p className="text-neutral-300 text-sm mb-4 line-clamp-2">{project.excerpt || project.description}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies?.slice(0, 4).map((tech) => (
            <Badge
              key={tech.name}
              variant="secondary"
              className="bg-white/10 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 border-neutral-100/20"
            >
              {renderTechIcon(tech.iconName)}
              <span>{tech.name}</span>
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <Link
            href={`/work/${project.slug}`}
            className="group/button flex items-center gap-2 text-white hover:gap-3 transition-all duration-300"
          >
            <span className="text-sm font-medium">View Details</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover/button:translate-x-1" />
          </Link>

          <div className="flex gap-2">
            {project.repo_url && (
              <Button
                variant="outline"
                size="sm"
                className="bg-neutral-800/50 border-neutral-600 text-white hover:bg-neutral-700/50 p-2"
                asChild
              >
                <Link
                  href={project.repo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.title} source code`}
                >
                  <FaGithub className="h-4 w-4" />
                </Link>
              </Button>
            )}
            {project.deploy_url && (
              <Button
                variant="outline"
                size="sm"
                className="bg-neutral-800/50 border-neutral-600 text-white hover:bg-neutral-700/50 p-2"
                asChild
              >
                <Link
                  href={project.deploy_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.title} live demo`}
                >
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </article>
  )
})

ProjectCard.displayName = "ProjectCard"
