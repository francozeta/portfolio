import Link from "next/link"

const experienceItems = [
  {
    title: "Kocteau",
    meta: "Personal project in production",
    href: "https://kocteau.com",
    description:
      "A music review platform built with Next.js, TypeScript, Supabase, Tailwind CSS, Deezer Search API, Vercel, Turborepo, and pnpm workspaces.",
  },
  {
    title: "Software Design & Development",
    meta: "CERTUS, 2023 - 2026",
    description:
      "Last-cycle student focused on web applications, programming logic, databases, responsive interfaces, and product delivery.",
  },
  {
    title: "MUBI Clone",
    meta: "Case study",
    href: "/work/mubi-clone",
    description:
      "A curated cinema MVP used to practice full-stack product thinking, polished UI, movie pages, reviews, and public profiles.",
  },
]

export function AboutSection() {
  return (
    <section
      id="about"
      className="bg-neutral-950 px-6 py-16 text-neutral-200 sm:px-12 sm:py-20 lg:px-24 xl:px-56"
      aria-labelledby="experience-heading"
    >
      <div className="mx-auto max-w-2xl">
        <div className="mb-5 flex items-end justify-between gap-4">
          <h2 id="experience-heading" className="text-base font-medium text-white text-balance">
            Experience
          </h2>

          <Link
            href="/about"
            className="text-sm font-medium text-neutral-400 transition-colors duration-150 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
          >
            More about me
          </Link>
        </div>

        <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {experienceItems.map((item) => {
            const content = (
              <article className="grid gap-1 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6">
                <div>
                  <h3 className="text-sm font-medium text-white text-balance">{item.title}</h3>
                  <p className="mt-1 text-sm text-neutral-500">{item.meta}</p>
                </div>
                <p className="text-sm leading-6 text-neutral-400 text-pretty">{item.description}</p>
              </article>
            )

            if (!item.href) {
              return <div key={item.title}>{content}</div>
            }

            return (
              <Link
                key={item.title}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="block transition-colors duration-150 hover:bg-white/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
              >
                {content}
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
