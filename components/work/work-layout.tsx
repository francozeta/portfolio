"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useReducedMotion } from "motion/react"
import { ArrowUpRight, Circle, ExternalLink, Layers2, Route } from "lucide-react"
import { FaGithub } from "react-icons/fa"
import type { ProjectSummary } from "@/lib/projects"

interface WorkLayoutProps {
  projects: ProjectSummary[]
}

const actionLinkClass =
  "inline-flex min-h-10 items-center gap-1 text-sm font-medium text-neutral-400 transition-[color,transform] duration-150 ease-out hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 active:scale-[0.96]"

const surfaceClass =
  "rounded-[22px] bg-neutral-950 p-1 shadow-[0_0_0_1px_rgba(255,255,255,0.08)] transition-transform duration-150 ease-out"

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

function isLogoImage(src: string | null) {
  return Boolean(src?.endsWith(".svg"))
}

export function WorkLayout({ projects }: WorkLayoutProps) {
  const shouldReduceMotion = useReducedMotion()
  const featuredProject = projects[0]

  const hiddenState = shouldReduceMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 12 }

  const itemVariants = {
    hidden: hiddenState,
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.18, ease: "easeOut" as const },
    },
  }

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.06,
      },
    },
  }

  const projectFrame = featuredProject
    ? [
        {
          label: "Problem",
          value: "Turn music discovery into a social product surface with reviews, profiles, and track context.",
        },
        {
          label: "Solution",
          value: "A Next.js product with auth, publishing flows, relational data, and a calmer review experience.",
        },
        {
          label: "Role",
          value: "Product design, frontend, data modeling, Supabase integration, and deployment.",
        },
        {
          label: "Stack",
          value: getTechLine(featuredProject),
        },
      ]
    : []

  return (
    <section className="bg-neutral-950 px-6 pb-24 pt-28 text-neutral-200 sm:px-12 sm:pb-28 sm:pt-32 lg:px-24 xl:px-56">
      <motion.div
        className="mx-auto max-w-2xl"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.header variants={itemVariants}>
          <p className="text-sm leading-6 text-neutral-500">Work</p>
          <h1 className="mt-2 text-3xl font-semibold leading-tight text-white text-balance sm:text-4xl">
            Product work, presented as decisions instead of decoration.
          </h1>
          <p className="mt-6 text-[15px] leading-7 text-neutral-400 text-pretty sm:text-base sm:leading-8">
            A compact index of projects I&apos;ve built or shaped, focused on real flows, interface polish, and the
            systems behind the screens.
          </p>
        </motion.header>

        {featuredProject && (
          <motion.article className="mt-14" variants={itemVariants} aria-labelledby="featured-work-heading">
            <div className="mb-5 flex items-end justify-between gap-4">
              <h2 id="featured-work-heading" className="text-base font-medium text-white text-balance">
                Featured
              </h2>
              <span className="inline-flex min-h-10 items-center gap-2 text-sm text-neutral-500">
                <Circle className="size-2 fill-current" aria-hidden="true" />
                {getStatusLabel(featuredProject.status)}
              </span>
            </div>

            <div className={surfaceClass}>
              <div className="rounded-[18px] bg-neutral-900/45 p-4 sm:p-5">
                <div className="flex gap-4">
                  <div className="relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-[14px] bg-neutral-950 outline outline-1 -outline-offset-1 outline-white/10 sm:size-20">
                    {featuredProject.image_url ? (
                      <Image
                        src={featuredProject.image_url}
                        alt=""
                        fill
                        className={
                          isLogoImage(featuredProject.image_url)
                            ? "object-contain p-4 opacity-85"
                            : "object-cover opacity-90"
                        }
                        sizes="80px"
                        aria-hidden="true"
                        priority
                      />
                    ) : (
                      <Layers2 className="size-5 text-neutral-500" aria-hidden="true" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-neutral-500">
                      <span>{getYear(featuredProject.created_at)}</span>
                      <span aria-hidden="true">/</span>
                      <span>Product case study</span>
                    </div>

                    <h3 className="mt-1 text-xl font-semibold leading-snug text-white text-balance">
                      {featuredProject.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-neutral-400 text-pretty">
                      {featuredProject.excerpt || featuredProject.description}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/[0.08] pt-3">
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
            </div>
          </motion.article>
        )}

        {projectFrame.length > 0 && (
          <motion.section className="mt-14" variants={itemVariants} aria-labelledby="project-frame-heading">
            <h2 id="project-frame-heading" className="mb-5 text-base font-medium text-white text-balance">
              How I frame it
            </h2>

            <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {projectFrame.map((item) => (
                <article key={item.label} className="grid gap-1 py-4 sm:grid-cols-[7rem_1fr] sm:gap-6">
                  <h3 className="text-sm text-neutral-500">{item.label}</h3>
                  <p className="text-sm leading-6 text-neutral-300 text-pretty">{item.value}</p>
                </article>
              ))}
            </div>
          </motion.section>
        )}

        <motion.section className="mt-14" variants={itemVariants} aria-labelledby="work-index-heading">
          <h2 id="work-index-heading" className="mb-5 text-base font-medium text-white text-balance">
            Index
          </h2>

          <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {projects.map((project, index) => (
              <Link
                key={project.id}
                href={`/work/${project.slug}`}
                className="group grid min-h-24 gap-4 py-5 transition-colors duration-150 hover:bg-white/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 sm:grid-cols-[3rem_1fr_auto]"
              >
                <span className="text-sm text-neutral-600 tabular-nums">{String(index + 1).padStart(2, "0")}</span>

                <span>
                  <span className="block text-base font-medium text-white text-balance">{project.title}</span>
                  <span className="mt-1 block max-w-xl text-sm leading-6 text-neutral-400 text-pretty">
                    {project.excerpt || project.description}
                  </span>
                  <span className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-sm text-neutral-500">
                    <span>{getStatusLabel(project.status)}</span>
                    <span aria-hidden="true">/</span>
                    <span>{getTechLine(project, 3)}</span>
                  </span>
                </span>

                <span className="flex items-start justify-end text-neutral-500">
                  <ArrowUpRight
                    className="size-4 opacity-0 transition-[color,opacity,transform] duration-150 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100 group-hover:text-white"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            ))}
          </div>
        </motion.section>

        <motion.section className="mt-14" variants={itemVariants} aria-labelledby="work-lens-heading">
          <h2 id="work-lens-heading" className="mb-5 text-base font-medium text-white text-balance">
            Lens
          </h2>

          <div className="grid gap-3 sm:grid-cols-2">
            <article className={surfaceClass}>
              <div className="rounded-[18px] bg-neutral-900/35 px-4 py-3">
                <Layers2 className="mb-5 size-4 text-neutral-500" aria-hidden="true" />
                <h3 className="text-sm font-medium text-white text-balance">Systems first</h3>
                <p className="mt-1 text-sm leading-6 text-neutral-400 text-pretty">
                  I like projects with real states: auth, onboarding, publishing, feeds, and data that stays readable.
                </p>
              </div>
            </article>

            <article className={surfaceClass}>
              <div className="rounded-[18px] bg-neutral-900/35 px-4 py-3">
                <Route className="mb-5 size-4 text-neutral-500" aria-hidden="true" />
                <h3 className="text-sm font-medium text-white text-balance">Case by route</h3>
                <p className="mt-1 text-sm leading-6 text-neutral-400 text-pretty">
                  Each project should explain the problem, stack, tradeoffs, outcome, and what I would improve next.
                </p>
              </div>
            </article>
          </div>
        </motion.section>
      </motion.div>
    </section>
  )
}
