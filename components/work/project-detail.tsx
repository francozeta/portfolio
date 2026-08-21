import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { FaGithub } from "react-icons/fa"
import type { Project } from "@/types/project"
import { AVAILABLE_TECHNOLOGIES } from "@/lib/technologies"
import { ContentRenderer } from "@/components/project/content-renderer"

interface ProjectDetailProps {
  project: Project
}

const actionLinkClass =
  "inline-flex min-h-10 items-center gap-1 text-sm font-medium text-neutral-400 transition-[color,transform] duration-150 ease-out hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 active:scale-[0.96]"

function getStatusLabel(status: Project["status"]) {
  return status === "completed" ? "Completed" : "In progress"
}

function getYear(date: string) {
  return new Date(date).getUTCFullYear()
}

function getRoleLabel(project: Project) {
  return project.slug === "kocteau" ? "Product design + engineering" : "Frontend + product UI"
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const logo = project.logo_url || project.image_url
  const showPreview = Boolean(project.image_url && !project.image_url.endsWith(".svg"))

  return (
    <article className="bg-neutral-950 px-6 pb-24 pt-28 text-neutral-200 sm:px-12 sm:pb-28 sm:pt-32 lg:px-24 xl:px-56">
      <div className="mx-auto max-w-2xl">
        <Link href="/work" className={actionLinkClass}>
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          Back to work
        </Link>

        <header className="mt-10">
          <div className="flex items-center gap-3">
            {logo && (
              <div className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-neutral-900/60 outline outline-1 -outline-offset-1 outline-white/10">
                <Image
                  src={logo}
                  alt=""
                  width={32}
                  height={32}
                  className="size-6 object-contain opacity-70 grayscale"
                  aria-hidden="true"
                  priority
                />
              </div>
            )}
            <div>
              <p className="text-sm leading-5 text-neutral-400/80">Case study</p>
              <p className="text-sm leading-5 text-neutral-400">{getStatusLabel(project.status)}</p>
            </div>
          </div>

          <h1 className="mt-7 text-3xl font-semibold leading-tight text-white text-balance sm:text-4xl">
            {project.title}
          </h1>

          <p className="mt-4 text-sm leading-6 text-neutral-400/80 text-pretty">
            {getYear(project.created_at)} / {getRoleLabel(project)}
          </p>

          {project.excerpt && (
            <p className="mt-5 text-[15px] leading-7 text-neutral-400 text-pretty sm:text-base sm:leading-8">
              {project.excerpt}
            </p>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
            {project.deploy_url && (
              <Link href={project.deploy_url} target="_blank" rel="noopener noreferrer" className={actionLinkClass}>
                Live
                <ExternalLink className="size-3.5" aria-hidden="true" />
              </Link>
            )}
            {project.repo_url && (
              <Link href={project.repo_url} target="_blank" rel="noopener noreferrer" className={actionLinkClass}>
                Source
                <FaGithub className="size-3.5" aria-hidden="true" />
              </Link>
            )}
          </div>
        </header>

        {project.technologies.length > 0 && (
          <section className="mt-10" aria-labelledby="project-stack-heading">
            <h2 id="project-stack-heading" className="mb-5 text-base font-medium text-white text-balance">
              Stack
            </h2>

            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => {
                const item = AVAILABLE_TECHNOLOGIES.find((availableTech) => availableTech.iconName === tech.iconName)
                const Icon = item?.icon

                return (
                  <span
                    key={tech.name}
                    className="inline-flex min-h-10 items-center gap-2 rounded-full bg-neutral-950 px-3 text-sm text-neutral-300 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
                  >
                    {Icon && <Icon className="size-3.5 text-neutral-500" aria-hidden="true" />}
                    {tech.name}
                  </span>
                )
              })}
            </div>
          </section>
        )}

        {showPreview && project.image_url && (
          <figure className="mt-12">
            <div className="rounded-[22px] bg-neutral-950 p-1 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]">
              <div className="relative flex min-h-64 items-center justify-center overflow-hidden rounded-[18px] bg-neutral-900/45 outline outline-1 -outline-offset-1 outline-white/10">
                <Image
                  src={project.image_url}
                  alt={`${project.title} preview`}
                  width={1200}
                  height={720}
                  className="h-auto w-full object-cover opacity-90"
                  sizes="(max-width: 768px) 100vw, 672px"
                  priority
                />
              </div>
            </div>
          </figure>
        )}

        <section className="mt-12" aria-label={`${project.title} case study`}>
          {project.content.length > 0 ? (
            <ContentRenderer content={project.content} />
          ) : (
            <div className="border-y border-white/[0.08] py-6">
              <p className="text-sm leading-6 text-neutral-400 text-pretty">
                This case study is still being documented. For now, the live project and source links above are the best
                references.
              </p>
            </div>
          )}
        </section>

        <footer className="mt-16 border-t border-white/[0.08] pt-6">
          <Link href="/work" className={actionLinkClass}>
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            All work
          </Link>
        </footer>
      </div>
    </article>
  )
}
