"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "motion/react"
import { ArrowUpRight, Languages, MapPin, Sparkles } from "lucide-react"

const linkClass =
  "font-medium text-neutral-50 underline decoration-neutral-500/70 underline-offset-4 transition-colors duration-150 hover:text-white hover:decoration-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"

const actionLinkClass =
  "inline-flex min-h-10 items-center gap-1 text-sm font-medium text-neutral-400 transition-[color,transform] duration-150 ease-out hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 active:scale-[0.96]"

const surfaceClass =
  "rounded-[22px] bg-neutral-950 p-1 shadow-[0_0_0_1px_rgba(255,255,255,0.08)] transition-transform duration-150 ease-out"

const facts = [
  {
    icon: MapPin,
    label: "Based in",
    value: "Lima, Peru",
  },
  {
    icon: Sparkles,
    label: "Currently",
    value: "Last-cycle Software Design & Development student at CERTUS.",
  },
  {
    icon: Languages,
    label: "Languages",
    value: "Spanish native, English intermediate, Italian advanced.",
  },
]

const capabilityGroups = [
  {
    title: "Frontend",
    items: "Next.js App Router, React, TypeScript, Tailwind CSS, shadcn/ui, responsive interfaces.",
  },
  {
    title: "Backend / data",
    items: "Supabase Auth, Postgres, Storage, RPCs, server routes, relational modeling.",
  },
  {
    title: "Product flows",
    items: "Onboarding, review publishing, feeds, public profiles, likes, bookmarks, follows, comments, notifications.",
  },
  {
    title: "Workflow",
    items: "Vercel, Turborepo, pnpm workspaces, GitHub, ESLint, iterative product delivery.",
  },
]

const timelineItems = [
  {
    year: "2022",
    title: "Started with the web",
    description:
      "I began with HTML and CSS, then moved into JavaScript, React, databases, and the discipline of finishing small projects.",
  },
  {
    year: "2023 - 2026",
    title: "Software Design & Development",
    description:
      "Last-cycle student at CERTUS, focused on web applications, programming logic, databases, interface design, and responsive delivery.",
  },
  {
    year: "Now",
    title: "Building Kocteau",
    description:
      "A production music review platform where I practice product thinking, database architecture, UI craft, and full-stack execution.",
  },
]

const principles = [
  "Make the interface explain itself.",
  "Prefer clear flows over clever decoration.",
  "Treat small details as part of the product.",
  "Ship, learn, and keep the system understandable.",
]

export function AboutLayout() {
  const shouldReduceMotion = useReducedMotion()

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

  return (
    <section className="bg-neutral-950 px-6 pb-24 pt-28 text-neutral-200 sm:px-12 sm:pb-28 sm:pt-32 lg:px-24 xl:px-56">
      <motion.div
        className="mx-auto max-w-2xl"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.header className="space-y-7" variants={itemVariants}>
          <div>
            <p className="text-sm leading-6 text-neutral-500">About</p>
            <h1 className="mt-2 text-3xl font-semibold leading-tight text-white text-balance sm:text-4xl">
              I build web products where the database, flow, and interface have to agree.
            </h1>
          </div>

          <div className="space-y-5 text-[15px] leading-7 text-neutral-300 sm:text-base sm:leading-8">
            <p className="text-pretty">
              I&apos;m Franco Zeta, a junior web developer from Peru. Right now I&apos;m building{" "}
              <Link href="https://kocteau.com" target="_blank" rel="noopener noreferrer" className={linkClass}>
                Kocteau
              </Link>
              , a music review platform in production with Next.js, TypeScript, Supabase, Tailwind CSS, shadcn/ui, and
              the Deezer Search API.
            </p>

            <p className="text-pretty">
              My strongest work happens in the overlap between structure and taste: auth, onboarding, relational data,
              public profiles, feeds, empty states, spacing, and the little moments that make a product feel cared for.
            </p>
          </div>
        </motion.header>

        <motion.section className="mt-12" variants={itemVariants} aria-label="Profile facts">
          <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {facts.map((fact) => {
              const Icon = fact.icon

              return (
                <article key={fact.label} className="grid gap-2 py-4 sm:grid-cols-[9rem_1fr] sm:gap-6">
                  <h2 className="inline-flex items-center gap-2 text-sm text-neutral-500">
                    <Icon className="size-3.5" aria-hidden="true" />
                    {fact.label}
                  </h2>
                  <p className="text-sm leading-6 text-neutral-300 text-pretty">{fact.value}</p>
                </article>
              )
            })}
          </div>
        </motion.section>

        <motion.section className="mt-14" variants={itemVariants} aria-labelledby="about-kocteau-heading">
          <div className="mb-5 flex items-end justify-between gap-4">
            <h2 id="about-kocteau-heading" className="text-base font-medium text-white text-balance">
              Kocteau
            </h2>
            <span className="text-sm text-neutral-500">Personal product</span>
          </div>

          <div className={surfaceClass}>
            <div className="rounded-[18px] bg-neutral-900/45 px-4 py-4 sm:px-5">
              <p className="text-sm leading-6 text-neutral-300 text-pretty">
                Kocteau is the place where I&apos;m practicing the full product loop: discovering tracks, publishing
                reviews, caching external music data, building profile surfaces, and shaping a social layer around what
                people listen to.
              </p>

              <div className="mt-5 grid gap-3 border-y border-white/[0.08] py-4 text-sm sm:grid-cols-3">
                <div>
                  <p className="text-neutral-500">Domain</p>
                  <p className="mt-1 text-white">Music reviews</p>
                </div>
                <div>
                  <p className="text-neutral-500">Scope</p>
                  <p className="mt-1 text-white">Full-stack</p>
                </div>
                <div>
                  <p className="text-neutral-500">Status</p>
                  <p className="mt-1 text-white">In production</p>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
                <Link href="https://kocteau.com" target="_blank" rel="noopener noreferrer" className={actionLinkClass}>
                  Visit Kocteau
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </Link>
                <Link
                  href="https://github.com/francozeta/kocteau"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={actionLinkClass}
                >
                  Repository
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section className="mt-14" variants={itemVariants} aria-labelledby="about-capabilities-heading">
          <h2 id="about-capabilities-heading" className="mb-5 text-base font-medium text-white text-balance">
            Capabilities
          </h2>

          <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {capabilityGroups.map((group) => (
              <article key={group.title} className="grid gap-1 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6">
                <h3 className="text-sm font-medium text-white text-balance">{group.title}</h3>
                <p className="text-sm leading-6 text-neutral-400 text-pretty">{group.items}</p>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section className="mt-14" variants={itemVariants} aria-labelledby="about-timeline-heading">
          <h2 id="about-timeline-heading" className="mb-5 text-base font-medium text-white text-balance">
            Timeline
          </h2>

          <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {timelineItems.map((item) => (
              <article key={`${item.year}-${item.title}`} className="grid gap-1 py-4 sm:grid-cols-[7rem_1fr] sm:gap-6">
                <p className="text-sm text-neutral-500 tabular-nums">{item.year}</p>
                <div>
                  <h3 className="text-sm font-medium text-white text-balance">{item.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-neutral-400 text-pretty">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section className="mt-14" variants={itemVariants} aria-labelledby="about-principles-heading">
          <h2 id="about-principles-heading" className="mb-5 text-base font-medium text-white text-balance">
            Principles
          </h2>

          <ol className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {principles.map((principle, index) => (
              <li key={principle} className="grid gap-2 py-4 sm:grid-cols-[3rem_1fr] sm:gap-6">
                <span className="text-sm text-neutral-600 tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                <span className="text-sm leading-6 text-neutral-300 text-pretty">{principle}</span>
              </li>
            ))}
          </ol>
        </motion.section>

        <motion.section
          className="mt-14 border-t border-white/[0.08] pt-6"
          variants={itemVariants}
          aria-labelledby="about-contact-heading"
        >
          <h2 id="about-contact-heading" className="text-base font-medium text-white text-balance">
            Currently
          </h2>
          <p className="mt-2 text-sm leading-6 text-neutral-400 text-pretty">
            I&apos;m open to junior web developer roles, pre-professional internships, and product collaborations where
            the interface deserves care. Reach me on{" "}
            <Link
              href="https://www.linkedin.com/in/franco-zeta-496330267"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              LinkedIn
            </Link>{" "}
            or via{" "}
            <Link href="mailto:francozeta2011@gmail.com" className={linkClass}>
              email
            </Link>
            .
          </p>
        </motion.section>
      </motion.div>
    </section>
  )
}
