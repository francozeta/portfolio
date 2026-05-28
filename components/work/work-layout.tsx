import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, ExternalLink } from "lucide-react"
import { FaGithub } from "react-icons/fa"
import type { ProjectSummary } from "@/lib/projects"

interface WorkLayoutProps {
  projects: ProjectSummary[]
}

const actionLinkClass =
  "inline-flex min-h-10 items-center gap-1 text-sm font-medium text-neutral-400 transition-[color,transform] duration-150 ease-out hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 active:scale-[0.96]"

const projectLinkClass =
  "group block rounded-[22px] bg-neutral-950 p-1 shadow-[0_0_0_1px_rgba(255,255,255,0.08)] transition-transform duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 active:scale-[0.98]"

function getStatusLabel(status: ProjectSummary["status"]) {
  return status === "completed" ? "Completed" : "In progress"
}

function getYear(date: string) {
  return new Date(date).getUTCFullYear()
}

function getTechLine(project: ProjectSummary, limit = 4) {
  return project.technologies
    .slice(0, limit)
    .map((tech) => tech.name)
    .join(", ")
}

function getProjectLogo(project: ProjectSummary) {
  return project.logo_url || project.image_url
}

function isSvg(src: string | null | undefined) {
  return Boolean(src?.endsWith(".svg"))
}

export function WorkLayout({ projects }: WorkLayoutProps) {
  const featuredProject = projects.find((project) => project.slug === "kocteau") ?? projects[0]
  const otherProjects = featuredProject
    ? projects.filter((project) => project.slug !== featuredProject.slug)
    : projects

  return (
    <section className="bg-neutral-950 px-6 pb-24 pt-28 text-neutral-200 sm:px-12 sm:pb-28 sm:pt-32 lg:px-24 xl:px-56">
      <div className="mx-auto max-w-3xl">
        <header className="max-w-2xl">
          <p className="text-sm leading-6 text-neutral-500">Work</p>
          <h1 className="mt-2 text-2xl font-semibold leading-tight text-white text-balance sm:text-3xl">
            Selected work.
          </h1>
          <p className="mt-6 text-[15px] leading-7 text-neutral-400 text-pretty sm:text-base sm:leading-8">
            A small collection of products and case studies where I practice product thinking, frontend, data, and
            interface detail. Some are finished enough to explain; others are still useful because they show how I am
            shaping my taste.
          </p>
        </header>

        {featuredProject && (
          <section className="mt-14" aria-labelledby="featured-work-heading">
            <h2 id="featured-work-heading" className="text-base font-medium text-white text-balance">
              Main project
            </h2>

            <article className="mt-5 rounded-[22px] bg-neutral-950 p-1 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]">
              <div className="rounded-[18px] bg-neutral-900/45 p-4 sm:p-5">
                <div className="grid gap-5 sm:grid-cols-[6rem_1fr] sm:gap-6">
                  <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-[16px] bg-neutral-950 outline outline-1 -outline-offset-1 outline-white/10">
                    {getProjectLogo(featuredProject) ? (
                      <Image
                        src={getProjectLogo(featuredProject) as string}
                        alt=""
                        width={80}
                        height={80}
                        className={
                          isSvg(getProjectLogo(featuredProject))
                            ? "size-12 object-contain opacity-70 grayscale"
                            : "size-full object-cover opacity-90"
                        }
                        aria-hidden="true"
                        priority
                      />
                    ) : (
                      <span className="text-sm text-neutral-500">No image</span>
                    )}
                  </div>

                  <div>
                    <p className="text-sm leading-6 text-neutral-500">
                      {getStatusLabel(featuredProject.status)} / {getYear(featuredProject.created_at)}
                    </p>
                    <h3 className="mt-1 text-xl font-semibold leading-snug text-white text-balance">
                      {featuredProject.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-neutral-400 text-pretty">
                      {featuredProject.excerpt || featuredProject.description}
                    </p>
                    <p className="mt-4 text-sm leading-6 text-neutral-500 text-pretty">
                      {getTechLine(featuredProject)}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
                  <Link href={`/work/${featuredProject.slug}`} className={actionLinkClass}>
                    Case study
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </Link>
                  {featuredProject.deploy_url && (
                    <Link
                      href={featuredProject.deploy_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={actionLinkClass}
                    >
                      Live
                      <ExternalLink className="size-3.5" aria-hidden="true" />
                    </Link>
                  )}
                  {featuredProject.repo_url && (
                    <Link
                      href={featuredProject.repo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={actionLinkClass}
                    >
                      Source
                      <FaGithub className="size-3.5" aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </div>
            </article>
          </section>
        )}

        {otherProjects.length > 0 && (
          <section className="mt-14" aria-labelledby="selected-projects-heading">
            <h2 id="selected-projects-heading" className="text-base font-medium text-white text-balance">
              Other work
            </h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {otherProjects.map((project, index) => {
                const logo = getProjectLogo(project)

                return (
                  <Link key={project.id} href={`/work/${project.slug}`} className={projectLinkClass}>
                    <article>
                      <div className="relative flex aspect-[1.22] items-center justify-center overflow-hidden rounded-[18px] bg-neutral-900/45 outline outline-1 -outline-offset-1 outline-white/10">
                        <span className="absolute left-3 top-3 text-xs text-neutral-600 tabular-nums">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        {logo ? (
                          <Image
                            src={logo}
                            alt=""
                            width={72}
                            height={72}
                            className={
                              isSvg(logo)
                                ? "size-12 object-contain opacity-55 grayscale transition-[opacity,scale] duration-150 ease-out group-hover:scale-105 group-hover:opacity-80"
                                : "size-full object-cover opacity-80 transition-[opacity,scale] duration-150 ease-out group-hover:scale-[1.02] group-hover:opacity-90"
                            }
                            aria-hidden="true"
                          />
                        ) : (
                          <span className="text-sm text-neutral-500">No image</span>
                        )}
                      </div>

                      <div className="min-h-44 px-3 pb-4 pt-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm leading-5 text-neutral-500">
                              {getStatusLabel(project.status)} / {getYear(project.created_at)}
                            </p>
                            <h3 className="mt-1 text-sm font-medium text-white text-balance">{project.title}</h3>
                          </div>
                          <ArrowUpRight
                            className="mt-1 size-4 shrink-0 text-neutral-500 opacity-0 transition-[color,opacity,transform] duration-150 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100 group-hover:text-white"
                            aria-hidden="true"
                          />
                        </div>

                        <p className="mt-3 line-clamp-3 text-sm leading-6 text-neutral-400 text-pretty">
                          {project.excerpt || project.description}
                        </p>

                        <p className="mt-4 line-clamp-2 text-sm leading-6 text-neutral-500 text-pretty">
                          {getTechLine(project, 3)}
                        </p>
                      </div>
                    </article>
                  </Link>
                )
              })}
            </div>
          </section>
        )}
      </div>
    </section>
  )
}
