"use client"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ExternalLink, Calendar, CheckCircle, Clock } from "lucide-react"
import { FaGithub } from "react-icons/fa"
import type { Project } from "@/types/project"
import { AVAILABLE_TECHNOLOGIES } from "@/lib/technologies"
import { ContentRenderer } from "@/components/project/content-renderer"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { TableOfContents } from "./table-of-contents"

interface ProjectDetailProps {
  project: Project
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal<HTMLDivElement>()
  const { ref: contentRef, isVisible: contentVisible } = useScrollReveal<HTMLDivElement>({ delay: 200 })

  const renderTechIcon = (iconName: string) => {
    const tech = AVAILABLE_TECHNOLOGIES.find((t) => t.iconName === iconName)
    if (!tech) return null
    const Icon = tech.icon
    return <Icon className="h-4 w-4" />
  }

  const estimatedReadingTime = project.reading_time || Math.ceil((project.content?.length || 0) * 0.5)

  const formattedDate = new Date(project.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <article className="bg-neutral-950 pt-16 pb-24 sm:pt-20 sm:pb-32 lg:pt-24 lg:pb-40 relative">
      {/* Header */}
      <div
        ref={headerRef}
        className={`px-6 sm:px-12 lg:px-24 xl:px-56 mb-16 transition-all duration-1000 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
      >
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span className="text-sm">Back to projects</span>
          </Link>

          {/* Project meta */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <Badge
              className={`text-sm px-3 py-1 rounded-full flex items-center gap-2 ${project.status === "completed"
                ? "bg-green-600/20 text-green-400 border-green-600/30"
                : "bg-orange-600/20 text-orange-400 border-orange-600/30"
                }`}
            >
              {project.status === "completed" ? <CheckCircle className="h-4 w-4" /> : <Calendar className="h-4 w-4" />}
              {project.status === "completed" ? "Completed" : "In Progress"}
            </Badge>

            <div className="flex items-center gap-2 text-neutral-400 text-sm">
              <Calendar className="h-4 w-4" />
              <span>{formattedDate}</span>
            </div>
            {estimatedReadingTime > 0 && (
              <div className="flex items-center gap-2 text-neutral-400 text-sm">
                <Clock className="h-4 w-4" />
                <span>{estimatedReadingTime} min read</span>
              </div>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">{project.title}</h1>

          {/* Excerpt */}
          {project.excerpt && (
            <p className="text-base md:text-lg text-neutral-300 mb-8 leading-relaxed">{project.excerpt}</p>
          )}

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.technologies?.map((tech) => (
              <Badge
                key={tech.name}
                variant="secondary"
                className="bg-white/10 text-white text-sm px-3 py-1 rounded-full flex items-center gap-2 border-neutral-100/20"
              >
                {renderTechIcon(tech.iconName)}
                <span>{tech.name}</span>
              </Badge>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-4">
            {project.deploy_url && (
              <Button className="bg-white text-black hover:bg-neutral-200 transition-all duration-200" asChild>
                <Link href={project.deploy_url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Live Demo
                </Link>
              </Button>
            )}

            {project.repo_url && (
              <Button
                variant="outline"
                className="bg-neutral-900/50 border-neutral-700 text-white hover:bg-neutral-800/70 "
                asChild
              >
                <Link href={project.repo_url} target="_blank" rel="noopener noreferrer">
                  <FaGithub className="h-4 w-4 mr-2" />
                  View Source Code
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Hero Image */}
      {project.image_url && (
        <div className="px-6 sm:px-12 lg:px-24 xl:px-56 mb-16">
          <div className="max-w-6xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden bg-neutral-800">
              <Image
                src={project.image_url || "/placeholder.svg"}
                alt={`${project.title} project screenshot`}
                width={1200}
                height={600}
                className="w-full h-auto object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
              />
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="px-6 sm:px-12 lg:px-24 xl:px-56">
        <div className="max-w-4xl mx-auto">
          <div
            ref={contentRef}
            className={`transition-all duration-1000 ${contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            {project.content && project.content.length > 0 ? (
              <ContentRenderer content={project.content} />
            ) : (
              <div className="text-center py-16">
                <p className="text-neutral-400 text-base md:text-lg mb-4">Content coming soon</p>
                <p className="text-neutral-500 text-sm">
                  This project is still being documented. Check back later for detailed information.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table of Contents - Fixed Position */}
      {project.content && project.content.length > 0 && <TableOfContents content={project.content} />}

      {/* Footer CTA */}
      <div className="px-6 sm:px-12 lg:px-24 xl:px-56 mt-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8 text-center">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4">Interested in working together?</h3>
            <p className="text-neutral-300 text-sm md:text-base mb-6">
              I'm always open to discussing new opportunities and interesting projects.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-white text-black hover:bg-neutral-200" asChild>
                <Link href="mailto:francozeta2011@gmail.com">Get in touch</Link>
              </Button>
              <Button
                variant="outline"
                className="bg-transparent border-neutral-700 text-white hover:bg-neutral-800/50"
                asChild
              >
                <Link href="/work">View more projects</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
