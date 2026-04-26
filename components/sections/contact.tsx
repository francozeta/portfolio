import Link from "next/link"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { MdEmail } from "react-icons/md"

const links = [
  {
    label: "Kocteau",
    description: "Music review platform and main product.",
    href: "https://kocteau.com",
  },
  {
    label: "LinkedIn",
    description: "Professional updates and contact.",
    href: "https://www.linkedin.com/in/franco-zeta-496330267",
    icon: FaLinkedin,
  },
  {
    label: "GitHub",
    description: "Code, experiments, and project work.",
    href: "https://github.com/francozeta",
    icon: FaGithub,
  },
  {
    label: "Email",
    description: "For roles, projects, or a calm hello.",
    href: "mailto:francozeta2011@gmail.com",
    icon: MdEmail,
  },
]

export function ContactSection() {
  return (
    <section
      className="bg-neutral-950 px-6 py-16 text-neutral-200 sm:px-12 sm:py-20 lg:px-24 xl:px-56"
      aria-labelledby="other-heading"
    >
      <div className="mx-auto max-w-2xl">
        <div className="mb-5">
          <h2 id="other-heading" className="text-base font-medium text-white text-balance">
            Other
          </h2>
          <p className="mt-2 text-sm leading-6 text-neutral-400 text-pretty">
            I&apos;m open to junior web developer roles, pre-professional internships, and carefully scoped product
            collaborations.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {links.map((item) => {
            const Icon = item.icon

            return (
              <Link
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group rounded-2xl border border-white/[0.08] bg-neutral-950 px-4 py-3 transition-colors duration-150 hover:border-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
              >
                <div className="flex items-center gap-2">
                  {Icon && <Icon className="size-3.5 text-neutral-500 transition-colors duration-150 group-hover:text-white" aria-hidden="true" />}
                  <h3 className="text-sm font-medium text-white text-balance">{item.label}</h3>
                </div>
                <p className="mt-1 text-sm leading-6 text-neutral-400 text-pretty">{item.description}</p>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
