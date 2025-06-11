"use client"

import type React from "react"
import { useState, useEffect, useRef, memo, useCallback } from "react"
import { ArrowRight, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { getFeaturedProjects } from "@/lib/projects"
import { AVAILABLE_TECHNOLOGIES } from "@/lib/technologies"
import type { Project } from "@/types/project"
import { cn } from "@/lib/utils"
import { FaGithub } from "react-icons/fa"
import Image from "next/image"

// Optimized project card with better accessibility
const ProjectCard = memo(
  ({
    project,
    renderTechIcon,
  }: {
    project: Project
    renderTechIcon: (iconName: string) => React.ReactNode
  }) => (
    <article className="w-full lg:w-80 flex-shrink-0 bg-[#D9D9D9] border-2 border-neutral-950/50 rounded-2xl overflow-hidden group hover:shadow-lg transition-all duration-300 select-none">
      {/* Optimized image with proper loading and accessibility */}
      <div className="h-48 bg-neutral-300 overflow-hidden">
        {project.image_url ? (
          <Image
            src={project.image_url || "/placeholder.svg"}
            alt={`Screenshot of ${project.title} project`}
            width={320}
            height={192}
            className="w-full h-full object-cover"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 320px"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAAcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-neutral-400 to-neutral-500 flex items-center justify-center">
            <span className="text-neutral-600 text-sm">No image available</span>
          </div>
        )}
      </div>

      <div className="p-6">
        {/* Title and Status */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-black">{project.title}</h3>
          <Badge
            className="bg-black text-white text-xs px-2 py-1 rounded-full flex items-center gap-1"
            aria-label={`Project status: ${project.status === "completed" ? "Completed" : "In Progress"}`}
          >
            <span
              className={`w-2 h-2 ${project.status === "completed" ? "bg-green-400" : "bg-orange-400"} rounded-full`}
              aria-hidden="true"
            />
            {project.status === "completed" ? "Completed" : "In Progress"}
          </Badge>
        </div>

        {/* Description */}
        <p className="text-neutral-700 text-sm mb-4 line-clamp-2">{project.description}</p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-6" role="list" aria-label="Technologies used">
          {project.technologies?.slice(0, 4).map((tech) => (
            <Badge
              key={tech.name}
              variant="secondary"
              className="bg-black text-white text-xs px-2 py-1 rounded-full flex items-center gap-1"
              role="listitem"
            >
              {renderTechIcon(tech.iconName)}
              <span>{tech.name}</span>
            </Badge>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <button
            className="group/button flex items-center gap-2 text-black transition-all duration-300 cursor-pointer hover:gap-3"
            aria-label={`View details for ${project.title} project`}
          >
            <span className="text-sm font-medium">View Details</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover/button:translate-x-1" aria-hidden="true" />
          </button>
          <div className="flex gap-3">
            {project.repo_url && (
              <a
                href={project.repo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-black text-white rounded-full hover:bg-neutral-800 transition-colors"
                aria-label={`View ${project.title} source code on GitHub`}
              >
                <FaGithub className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
            {project.deploy_url && (
              <a
                href={project.deploy_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-black text-white rounded-full hover:bg-neutral-800 transition-colors"
                aria-label={`View ${project.title} live demo`}
              >
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  ),
)

ProjectCard.displayName = "ProjectCard"

export function FeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Mouse/touch drag scroll functionality
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  useEffect(() => {
    const loadFeaturedProjects = async () => {
      try {
        const data = await getFeaturedProjects()
        setProjects(data)
      } catch (error) {
        console.error("Error loading featured projects:", error)
      } finally {
        setLoading(false)
      }
    }

    loadFeaturedProjects()
  }, [])

  // Optimized drag handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft)
    setScrollLeft(scrollContainerRef.current.scrollLeft)
  }, [])

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!scrollContainerRef.current) return
    setIsDragging(true)
    setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft)
    setScrollLeft(scrollContainerRef.current.scrollLeft)
  }, [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !scrollContainerRef.current) return
      e.preventDefault()
      const x = e.pageX - scrollContainerRef.current.offsetLeft
      const walk = (x - startX) * 2
      scrollContainerRef.current.scrollLeft = scrollLeft - walk
    },
    [isDragging, startX, scrollLeft],
  )

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging || !scrollContainerRef.current) return
      const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft
      const walk = (x - startX) * 2
      scrollContainerRef.current.scrollLeft = scrollLeft - walk
    },
    [isDragging, startX, scrollLeft],
  )

  const stopDragging = useCallback(() => {
    setIsDragging(false)
  }, [])

  const renderTechIcon = useCallback((iconName: string) => {
    const tech = AVAILABLE_TECHNOLOGIES.find((t) => t.iconName === iconName)
    if (!tech) return null
    const Icon = tech.icon
    return <Icon className="h-4 w-4" aria-hidden="true" />
  }, [])

  if (loading) {
    return (
      <section className="bg-white py-20" aria-label="Featured projects loading">
        <div className="max-w-full mx-auto px-4 sm:pl-6 sm:pr-0 lg:pl-8 lg:pr-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="h-12 bg-neutral-200 rounded w-80 mb-6 animate-pulse" aria-hidden="true" />
              <div className="h-4 bg-neutral-200 rounded w-96 mb-4 animate-pulse" aria-hidden="true" />
              <div className="h-4 bg-neutral-200 rounded w-80 mb-8 animate-pulse" aria-hidden="true" />
            </div>
            <div className="flex gap-6 overflow-hidden">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-80 h-96 bg-neutral-200 rounded-2xl animate-pulse"
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-white py-20" aria-labelledby="featured-projects-heading">
      <div className="max-w-full mx-auto px-4 sm:pl-6 sm:pr-0 lg:pl-8 lg:pr-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Text Content */}
          <div className="lg:sticky lg:top-20">
            <h2
              id="featured-projects-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6 leading-tight"
            >
              My Featured Projects
            </h2>
            <p className="text-lg text-neutral-600 mb-8 max-w-md">
              A curated selection of projects I've built — blending design, functionality, and real-world use cases.
            </p>
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Link
                href="/work"
                className="group flex items-center gap-2 text-black hover:gap-3 transition-all duration-300"
                aria-label="View all projects page"
              >
                <span className="text-lg font-medium">View all projects</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Right Column - Projects with drag-to-scroll */}
          <div className="relative overflow-hidden">
            <div
              ref={scrollContainerRef}
              className={cn(
                "pb-6 -mx-4 px-4 sm:mx-0 sm:px-0",
                "lg:overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing",
              )}
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={stopDragging}
              onMouseLeave={stopDragging}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={stopDragging}
              role="region"
              aria-label="Featured projects carousel"
            >
              <div className={cn("grid grid-cols-1 gap-6 lg:grid-cols-none", "lg:flex lg:flex-row lg:gap-6 lg:w-max")}>
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} renderTechIcon={renderTechIcon} />
                ))}

                {/* Placeholder cards if less than 3 projects */}
                {projects.length < 3 &&
                  Array.from({ length: 3 - projects.length }).map((_, index) => (
                    <div
                      key={`placeholder-${index}`}
                      className="w-full lg:w-80 flex-shrink-0 bg-[#D9D9D9] border-2 border-neutral-950/50 rounded-2xl overflow-hidden opacity-50 select-none"
                      aria-label="Coming soon project placeholder"
                    >
                      <div className="h-48 bg-neutral-300 flex items-center justify-center">
                        <span className="text-neutral-600">Coming Soon</span>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-black mb-3">Project Coming Soon</h3>
                        <p className="text-neutral-700 text-sm mb-4">
                          New exciting project in development. Stay tuned for updates!
                        </p>
                        <div className="flex gap-2 mb-6">
                          <Badge className="bg-neutral-400 text-white text-xs px-2 py-1 rounded-full">TBD</Badge>
                        </div>
                      </div>
                    </div>
                  ))}

                <div className="hidden lg:block w-20 flex-shrink-0" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  )
}
