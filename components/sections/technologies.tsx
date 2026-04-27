const skillGroups = [
  {
    title: "Product Interfaces",
    description: "React, Next.js, TypeScript, Tailwind CSS, shadcn/ui, responsive UI.",
  },
  {
    title: "Full-stack Flows",
    description: "Supabase Auth, Postgres, Storage, server routes, RPCs, relational data.",
  },
  {
    title: "Product Systems",
    description: "Onboarding, reviews, public profiles, feeds, bookmarks, follows, notifications.",
  },
  {
    title: "Design Taste",
    description: "UI/UX, component systems, visual consistency, polished interaction details.",
  },
]

export function TechnologiesSection() {
  return (
    <section
      className="bg-neutral-950 px-6 py-16 text-neutral-200 sm:px-12 sm:py-20 lg:px-24 xl:px-56"
      aria-labelledby="skills-heading"
    >
      <div className="mx-auto max-w-2xl">
        <div className="mb-5">
          <h2 id="skills-heading" className="text-base font-medium text-white text-balance">
            Skills
          </h2>
          <p className="mt-2 text-sm leading-6 text-neutral-400 text-pretty">
            The stack I reach for when an interface needs to become a real product.
          </p>
        </div>

        <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {skillGroups.map((skill) => (
            <article
              key={skill.title}
              className="grid gap-1 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6"
            >
              <h3 className="text-sm font-medium text-white text-balance">{skill.title}</h3>
              <p className="text-sm leading-6 text-neutral-400 text-pretty">{skill.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
