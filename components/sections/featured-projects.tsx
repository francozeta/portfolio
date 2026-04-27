import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getFeaturedProjects } from "@/lib/projects"
import type { ProjectSummary } from "@/lib/projects"

const projectLinkClass =
  "group block rounded-[22px] bg-neutral-950 p-1 shadow-[0_0_0_1px_rgba(255,255,255,0.08)] transition-transform duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 active:scale-[0.96]"

const actionLinkClass =
  "inline-flex min-h-10 items-center gap-1 text-sm font-medium text-neutral-400 transition-[color,transform] duration-150 ease-out hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 active:scale-[0.96]"

function getProjectLogo(project: ProjectSummary) {
  return project.logo_url || project.image_url
}

function getLogoClass(project: ProjectSummary) {
  return project.slug === "mubi-clone" ? "size-14" : "size-11"
}

export async function FeaturedProjects() {
  const projects = await getFeaturedProjects()
  const visibleProjects = projects.slice(0, 2)

  return (
    <section className="bg-neutral-950 px-6 py-16 text-neutral-200 sm:px-12 sm:py-20 lg:px-24 xl:px-56" aria-labelledby="featured-projects-heading">
      <div className="mx-auto max-w-2xl">
        <div className="mb-5 flex items-end justify-between gap-4">
          <h2 id="featured-projects-heading" className="text-base font-medium text-white text-balance">
            Projects
          </h2>

          <Link
            href="/work"
            className={actionLinkClass}
            aria-label="View all projects"
          >
            All work
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {visibleProjects.map((project, index) => {
            const logo = getProjectLogo(project)

            return (
              <Link key={project.id} href={`/work/${project.slug}`} className={projectLinkClass}>
                <article>
                  <div className="relative flex aspect-[1.16] items-center justify-center overflow-hidden rounded-[18px] bg-neutral-900/45 outline outline-1 -outline-offset-1 outline-white/10">
                    <span className="absolute left-3 top-3 text-xs text-neutral-600 tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {logo ? (
                    <Image
                      src={logo}
                      alt=""
                      width={64}
                      height={64}
                      className={`${getLogoClass(project)} object-contain opacity-55 grayscale transition-[opacity,scale] duration-150 ease-out group-hover:scale-105 group-hover:opacity-80`}
                      aria-hidden="true"
                    />
                    ) : (
                      <span className="text-sm text-neutral-500">No logo</span>
                    )}
                  </div>

                  <div className="flex min-h-28 items-start justify-between gap-4 px-3 pb-3 pt-4">
                    <div>
                      <h3 className="text-sm font-medium text-white text-balance">{project.title}</h3>
                      <p className="mt-1 line-clamp-2 text-sm leading-6 text-neutral-400 text-pretty">
                        {project.excerpt || project.description}
                      </p>
                    </div>
                    <ArrowRight
                      className="mt-1 size-4 shrink-0 text-neutral-500 opacity-0 transition-[color,opacity,transform] duration-150 ease-out group-hover:translate-x-0.5 group-hover:opacity-100 group-hover:text-white"
                      aria-hidden="true"
                    />
                  </div>
                </article>
              </Link>
            )
          })}

          {visibleProjects.length < 2 && (
            <Link href="https://kocteau.com" target="_blank" rel="noopener noreferrer" className={projectLinkClass}>
              <article>
                <div className="flex aspect-[1.16] items-center justify-center rounded-[18px] bg-neutral-900/45 outline outline-1 -outline-offset-1 outline-white/10">
                  <Image
                    src="/kocteau-logo.svg"
                    alt=""
                    width={64}
                    height={64}
                    className="size-11 object-contain opacity-55 grayscale"
                    aria-hidden="true"
                  />
                </div>

                <div className="flex min-h-28 items-start justify-between gap-4 px-3 pb-3 pt-4">
                  <div>
                    <h3 className="text-sm font-medium text-white text-balance">Kocteau</h3>
                    <p className="mt-1 text-sm leading-6 text-neutral-400 text-pretty">
                      Music review platform with auth, public profiles, feeds, and a social layer around tracks.
                    </p>
                  </div>
                  <ArrowRight
                    className="mt-1 size-4 shrink-0 text-neutral-500 opacity-0 transition-[color,opacity,transform] duration-150 ease-out group-hover:translate-x-0.5 group-hover:opacity-100 group-hover:text-white"
                    aria-hidden="true"
                  />
                </div>
              </article>
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
