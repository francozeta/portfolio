"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { getFeaturedProjects } from "@/lib/projects"
import type { Project } from "@/types/project"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { ProjectCard } from "@/components/work/project-card"

export function FeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

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

  if (loading) {
    return (
      <section className="bg-neutral-950 py-20 sm:py-24 lg:py-32" aria-label="Featured projects loading">
        <div className="max-w-full mx-auto px-6 sm:px-12 lg:pl-24 xl:pl-56 lg:pr-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <Skeleton className="h-4 w-32 mb-4" />
              <Skeleton className="h-12 w-80 mb-6" />
              <Skeleton className="h-4 w-96 mb-4" />
              <Skeleton className="h-4 w-80 mb-8" />
              <Skeleton className="h-10 w-48" />
            </div>
            <div className="flex gap-6 overflow-hidden">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex-shrink-0 w-80 h-96">
                  <Skeleton className="w-full h-48 mb-4" />
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <div className="flex flex-wrap gap-2 mb-4">
                    {Array.from({ length: 3 }).map((_, j) => (
                      <Skeleton key={j} className="h-6 w-16 rounded-full" />
                    ))}
                  </div>
                  <div className="flex justify-between">
                    <Skeleton className="h-8 w-24" />
                    <div className="flex gap-2">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <Skeleton className="h-8 w-8 rounded-full" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-neutral-950 py-20 sm:py-24 lg:py-32" aria-labelledby="featured-projects-heading">
      <div className="max-w-[2000px] mx-auto px-6 sm:px-12 lg:pl-24 xl:pl-56 lg:pr-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="lg:sticky lg:top-20">
            <span className="inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap border-transparent bg-neutral-800 text-neutral-200 mb-4">
              <span className="mr-1">✦</span>
              Featured Work
            </span>

            <h2
              id="featured-projects-heading"
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
            >
              My Featured Projects
            </h2>
            <p className="text-base md:text-lg text-neutral-300 mb-8 max-w-md">
              A curated selection of projects I've built — blending design, functionality, and real-world use cases.
            </p>
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Link
                href="/work"
                className="group flex items-center gap-2 text-white hover:gap-3 transition-all duration-300"
                aria-label="View all projects page"
              >
                <span className="text-base md:text-lg font-medium">View all projects</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden">
            <div
              ref={scrollContainerRef}
              className={cn(
                "pb-6 -mx-6 px-6 sm:-mx-12 sm:px-12 lg:mx-0 lg:px-0",
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
                  <div key={project.id} className="w-full lg:w-80 flex-shrink-0">
                    <ProjectCard project={project} viewMode="grid" />
                  </div>
                ))}

                {projects.length < 3 &&
                  Array.from({ length: 3 - projects.length }).map((_, index) => (
                    <div
                      key={`placeholder-${index}`}
                      className="w-full lg:w-80 flex-shrink-0 bg-neutral-900/50 border border-neutral-800 rounded-2xl overflow-hidden opacity-50 select-none"
                      aria-label="Coming soon project placeholder"
                    >
                      <div className="h-48 bg-neutral-800 flex items-center justify-center">
                        <span className="text-neutral-500">Coming Soon</span>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-white mb-3">Project Coming Soon</h3>
                        <p className="text-neutral-300 text-sm mb-4">
                          New exciting project in development. Stay tuned for updates!
                        </p>
                        <div className="flex gap-2 mb-6">
                          <span className="bg-neutral-700 text-white text-xs px-2 py-1 rounded-full">TBD</span>
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
