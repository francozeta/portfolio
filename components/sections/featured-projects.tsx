"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowRight, Github, ExternalLink, ChevronRight, ChevronLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getFeaturedProjects } from "@/lib/projects"
import { AVAILABLE_TECHNOLOGIES } from "@/lib/technologies"
import type { Project } from "@/types/project"
import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"

export function FeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [scrollPosition, setScrollPosition] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const isLargeScreen = useMediaQuery("(min-width: 1024px)")

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

  // Function to update navigation button states and scroll position
  const updateScrollState = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
      setScrollPosition(scrollLeft / (scrollWidth - clientWidth))
    }
  }

  // Function for scroll left
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 320 + 24
      scrollContainerRef.current.scrollBy({
        left: -cardWidth,
        behavior: "smooth",
      })
    }
  }

  // Function for scroll right
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 320 + 24
      scrollContainerRef.current.scrollBy({
        left: cardWidth,
        behavior: "smooth",
      })
    }
  }

  // Set up scroll event listeners
  useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("scroll", updateScrollState)
      updateScrollState()

      // Also check on window resize
      window.addEventListener("resize", updateScrollState)

      return () => {
        container.removeEventListener("scroll", updateScrollState)
        window.removeEventListener("resize", updateScrollState)
      }
    }
  }, [projects])

  const renderTechIcon = (iconName: string) => {
    const tech = AVAILABLE_TECHNOLOGIES.find((t) => t.iconName === iconName)
    if (!tech) return null

    const Icon = tech.icon
    return <Icon className="h-4 w-4" />
  }

  if (loading) {
    return (
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="h-12 bg-gray-200 rounded w-80 mb-6 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-96 mb-4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-80 mb-8 animate-pulse"></div>
            </div>
            <div className="flex gap-6 overflow-hidden">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex-shrink-0 w-80 h-96 bg-gray-200 rounded-2xl animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-white py-20">
      <div className="max-w-full mx-auto px-4 sm:pl-6 sm:pr-0 lg:pl-8 lg:pr-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Text Content */}
          <div className="lg:sticky lg:top-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6 leading-tight">
              My Featured Projects
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-md">
              A curated selection of projects I've built — blending design, functionality, and real-world use cases.
            </p>
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Link
                href="/work"
                className="group flex items-center gap-2 text-black hover:gap-3 transition-all duration-300"
              >
                <span className="text-lg font-medium">View all projects</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>

              {/* Navigation buttons - Only visible on larger screens */}
              {isLargeScreen && (
                <div className="flex items-center gap-3 ml-auto">
                  <Button
                    onClick={scrollLeft}
                    disabled={!canScrollLeft}
                    className="w-10 h-10 rounded-full bg-white border border-gray-300 text-black hover:bg-gray-100 transition-colors p-0 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Previous projects"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <Button
                    onClick={scrollRight}
                    disabled={!canScrollRight}
                    className="w-10 h-10 rounded-full bg-white border border-gray-300 text-black hover:bg-gray-100 transition-colors p-0 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Next projects"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              )}
            </div>

            {/* Scroll progress indicator - Only visible on larger screens */}
            {isLargeScreen && (
              <div className="h-1 bg-gray-200 rounded-full w-32 overflow-hidden mt-2 hidden lg:block">
                <div
                  className="h-full bg-black rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${scrollPosition * 100}%` }}
                />
              </div>
            )}
          </div>

          {/* Right Column - Projects with Horizontal/Vertical layout */}
          <div className="relative overflow-hidden">
            {/* Scrollable container with responsive behavior */}
            <div
              ref={scrollContainerRef}
              className={cn(
                "pb-6 -mx-4 px-4 sm:mx-0 sm:px-0",
                // On mobile (< lg), use vertical stack with padding on both sides
                "lg:overflow-x-auto scrollbar-hide",
                // On desktop (lg+), use horizontal scroll with padding only on left
              )}
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <div
                className={cn(
                  // For mobile: Stack vertically
                  "grid grid-cols-1 gap-6 lg:grid-cols-none",
                  // For desktop: Arrange horizontally
                  "lg:flex lg:flex-row lg:gap-6 lg:w-max",
                )}
              >
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className={cn(
                      "w-full lg:w-80 flex-shrink-0 bg-[#D9D9D9] border-2 border-[#404040] rounded-2xl overflow-hidden group hover:shadow-lg transition-all duration-300",
                    )}
                  >
                    {/* Project Image */}
                    <div className="h-48 bg-gray-300 overflow-hidden">
                      {project.image_url ? (
                        <img
                          src={project.image_url || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center">
                          <span className="text-gray-600 text-sm">No image</span>
                        </div>
                      )}
                    </div>

                    {/* Project Content */}
                    <div className="p-6">
                      {/* Title and Status */}
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-black">{project.title}</h3>
                        {project.status === "completed" && (
                          <Badge className="bg-black text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                            Completed
                          </Badge>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-gray-700 text-sm mb-4 line-clamp-2">{project.description}</p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies?.slice(0, 4).map((tech) => (
                          <Badge
                            key={tech.name}
                            variant="secondary"
                            className="bg-black text-white text-xs px-2 py-1 rounded-full flex items-center gap-1"
                          >
                            {renderTechIcon(tech.iconName)}
                            <span>{tech.name}</span>
                          </Badge>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between">
                        <button className="group flex items-center gap-2 text-black hover:gap-3 transition-all duration-300">
                          <span className="text-sm font-medium">View Details</span>
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </button>

                        <div className="flex gap-3">
                          {project.repo_url && (
                            <a
                              href={project.repo_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
                            >
                              <Github className="h-4 w-4" />
                            </a>
                          )}
                          {project.deploy_url && (
                            <a
                              href={project.deploy_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Placeholder cards if less than 3 projects */}
                {projects.length < 3 &&
                  Array.from({ length: 3 - projects.length }).map((_, index) => (
                    <div
                      key={`placeholder-${index}`}
                      className="w-full lg:w-80 flex-shrink-0 bg-[#D9D9D9] border-2 border-[#404040] rounded-2xl overflow-hidden opacity-50"
                    >
                      <div className="h-48 bg-gray-300 flex items-center justify-center">
                        <span className="text-gray-600">Coming Soon</span>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-black mb-3">Project Coming Soon</h3>
                        <p className="text-gray-700 text-sm mb-4">
                          New exciting project in development. Stay tuned for updates!
                        </p>
                        <div className="flex gap-2 mb-6">
                          <Badge className="bg-gray-400 text-white text-xs px-2 py-1 rounded-full">TBD</Badge>
                        </div>
                      </div>
                    </div>
                  ))}

                {/* Extra spacing to show scroll hint on desktop */}
                <div className="hidden lg:block w-20 flex-shrink-0"></div>
              </div>
            </div>

            {/* Scroll indicator for mobile - subtle horizontal dots */}
            <div className="flex justify-center gap-2 mt-6 lg:hidden">
              {projects.length > 0 &&
                Array.from({ length: Math.min(projects.length, 3) }).map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${index === 0 ? "bg-black" : "bg-gray-300"}`}
                  />
                ))}
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
