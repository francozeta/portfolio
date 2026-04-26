import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getFeaturedProjects } from "@/lib/projects"

const projectLinkClass =
  "group block rounded-[22px] border border-white/[0.09] bg-neutral-950 p-1 transition-colors duration-150 hover:border-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"

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
            className="inline-flex items-center gap-1 text-sm font-medium text-neutral-400 transition-colors duration-150 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
            aria-label="View all projects"
          >
            All work
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {visibleProjects.map((project) => (
            <Link key={project.id} href={`/work/${project.slug}`} className={projectLinkClass}>
              <article>
                <div className="relative flex aspect-[1.16] items-center justify-center overflow-hidden rounded-[18px] border border-white/[0.08] bg-neutral-900">
                  {project.image_url ? (
                    <Image
                      src={project.image_url}
                      alt={`${project.title} project screenshot`}
                      fill
                      className="object-cover opacity-80 transition-opacity duration-150 group-hover:opacity-100"
                      sizes="(max-width: 640px) 100vw, 320px"
                    />
                  ) : (
                    <span className="text-sm text-neutral-500">No image</span>
                  )}
                </div>

                <div className="flex items-start justify-between gap-4 px-3 pb-3 pt-4">
                  <div>
                    <h3 className="text-sm font-medium text-white text-balance">{project.title}</h3>
                    <p className="mt-1 line-clamp-2 text-sm leading-6 text-neutral-400 text-pretty">
                      {project.excerpt || project.description}
                    </p>
                  </div>
                  <ArrowRight className="mt-1 size-4 shrink-0 text-neutral-500 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-white" aria-hidden="true" />
                </div>
              </article>
            </Link>
          ))}

          {visibleProjects.length < 2 && (
            <Link href="https://kocteau.com" target="_blank" rel="noopener noreferrer" className={projectLinkClass}>
              <article>
                <div className="flex aspect-[1.16] items-center justify-center rounded-[18px] border border-white/[0.08] bg-neutral-900/60">
                  <Image src="/kocteau-logo.svg" alt="" width={48} height={48} className="size-12 opacity-80" aria-hidden="true" />
                </div>

                <div className="flex items-start justify-between gap-4 px-3 pb-3 pt-4">
                  <div>
                    <h3 className="text-sm font-medium text-white text-balance">Kocteau</h3>
                    <p className="mt-1 text-sm leading-6 text-neutral-400 text-pretty">
                      Music review platform with auth, public profiles, feeds, and a social layer around tracks.
                    </p>
                  </div>
                  <ArrowRight className="mt-1 size-4 shrink-0 text-neutral-500 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-white" aria-hidden="true" />
                </div>
              </article>
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
