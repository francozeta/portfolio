import Link from "next/link"

const linkClass =
  "font-medium text-neutral-50 underline decoration-neutral-500/70 underline-offset-4 transition-colors duration-150 hover:text-white hover:decoration-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"

const productNotes = [
  {
    title: "Music as the domain",
    description:
      "Kocteau is built around tracks, reviews, public profiles, follows, bookmarks, comments, notifications, and a personalized feed.",
  },
  {
    title: "A real app shape",
    description:
      "The product includes auth, onboarding, external music search, storage, relational data, server routes, RPCs, and deployment on Vercel.",
  },
  {
    title: "Interface as product",
    description:
      "I care about the small decisions: empty states, profile states, review flows, spacing, hierarchy, and whether the interface feels worth using.",
  },
]

const capabilityGroups = [
  {
    title: "Frontend",
    items: "Next.js App Router, React, TypeScript, Tailwind CSS, shadcn/ui, responsive interfaces.",
  },
  {
    title: "Backend / data",
    items: "Supabase Auth, Postgres, Storage, relational modeling, server routes, RPCs.",
  },
  {
    title: "Product flows",
    items: "Onboarding, review publishing, feeds, public profiles, likes, bookmarks, follows, notifications.",
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
      "Last-cycle student at CERTUS, focused on web applications, programming logic, databases, responsive UI, and project delivery.",
  },
  {
    year: "Now",
    title: "Building Kocteau",
    description:
      "A production music review platform where I am practicing product thinking, database architecture, UI craft, and full-stack execution.",
  },
]

const principles = [
  "Make the interface explain itself.",
  "Prefer clear flows over clever decoration.",
  "Treat small details as part of the product.",
  "Ship, learn, and keep the system understandable.",
]

export function AboutLayout() {
  return (
    <section className="bg-neutral-950 px-6 pb-24 pt-28 text-neutral-200 sm:px-12 sm:pb-28 sm:pt-32 lg:px-24 xl:px-56">
      <div className="mx-auto max-w-2xl">
        <header className="space-y-7">
          <div>
            <p className="text-sm leading-6 text-neutral-500">About</p>
            <h1 className="mt-2 text-3xl font-semibold leading-tight text-white text-balance sm:text-4xl">
              I build product-shaped web interfaces with a taste for systems, music, and quiet details.
            </h1>
          </div>

          <div className="space-y-5 text-[15px] leading-7 text-neutral-300 sm:text-base sm:leading-8">
            <p className="text-pretty">
              I&apos;m Franco Zeta, a junior web developer from Peru and a last-cycle Software Design & Development
              student. I&apos;m currently building{" "}
              <Link href="https://kocteau.com" target="_blank" rel="noopener noreferrer" className={linkClass}>
                Kocteau
              </Link>
              , a music review platform in production built with Next.js, TypeScript, Supabase, Tailwind CSS, and the
              Deezer Search API.
            </p>

            <p className="text-pretty">
              I like projects where the technical structure and the visual decisions have to work together. Auth,
              onboarding, database modeling, public profiles, and feeds matter to me as much as spacing, copy, and how a
              button feels when someone is unsure what to do next.
            </p>
          </div>
        </header>

        <section className="mt-16" aria-labelledby="about-kocteau-heading">
          <div className="mb-5 flex items-end justify-between gap-4">
            <h2 id="about-kocteau-heading" className="text-base font-medium text-white text-balance">
              Kocteau
            </h2>

            <Link
              href="https://github.com/francozeta/kocteau"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-neutral-400 transition-colors duration-150 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
            >
              Repository
            </Link>
          </div>

          <div className="grid gap-3">
            {productNotes.map((note) => (
              <article key={note.title} className="rounded-2xl border border-white/[0.08] bg-neutral-950 px-4 py-3">
                <h3 className="text-sm font-medium text-white text-balance">{note.title}</h3>
                <p className="mt-1 text-sm leading-6 text-neutral-400 text-pretty">{note.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16" aria-labelledby="about-capabilities-heading">
          <h2 id="about-capabilities-heading" className="mb-5 text-base font-medium text-white text-balance">
            Capabilities
          </h2>

          <div className="space-y-3">
            {capabilityGroups.map((group) => (
              <article
                key={group.title}
                className="grid gap-1 rounded-2xl border border-white/[0.08] bg-neutral-950 px-4 py-3 sm:grid-cols-[11rem_1fr] sm:gap-6"
              >
                <h3 className="text-sm font-medium text-white text-balance">{group.title}</h3>
                <p className="text-sm leading-6 text-neutral-400 text-pretty">{group.items}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16" aria-labelledby="about-timeline-heading">
          <h2 id="about-timeline-heading" className="mb-5 text-base font-medium text-white text-balance">
            Timeline
          </h2>

          <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {timelineItems.map((item) => (
              <article key={`${item.year}-${item.title}`} className="grid gap-1 py-4 sm:grid-cols-[7rem_1fr] sm:gap-6">
                <p className="text-sm text-neutral-500">{item.year}</p>
                <div>
                  <h3 className="text-sm font-medium text-white text-balance">{item.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-neutral-400 text-pretty">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16" aria-labelledby="about-principles-heading">
          <h2 id="about-principles-heading" className="mb-5 text-base font-medium text-white text-balance">
            Principles
          </h2>

          <ul className="grid gap-3 sm:grid-cols-2">
            {principles.map((principle) => (
              <li key={principle} className="rounded-2xl border border-white/[0.08] bg-neutral-950 px-4 py-3 text-sm leading-6 text-neutral-300 text-pretty">
                {principle}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16 border-t border-white/[0.08] pt-6" aria-labelledby="about-contact-heading">
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
        </section>
      </div>
    </section>
  )
}
