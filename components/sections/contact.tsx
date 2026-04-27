import Image from "next/image"
import Link from "next/link"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { MdEmail } from "react-icons/md"

const links = [
  {
    label: "Kocteau",
    description: "Music review platform and main product.",
    href: "https://kocteau.com",
    logo: "/kocteau-logo.svg",
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
                className="group rounded-[22px] bg-neutral-950 p-1 shadow-[0_0_0_1px_rgba(255,255,255,0.08)] transition-transform duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 active:scale-[0.96]"
              >
                <div className="rounded-[18px] bg-neutral-900/25 px-4 py-3">
                  <div className="flex items-center gap-2">
                    {item.logo && (
                      <Image
                        src={item.logo}
                        alt=""
                        width={16}
                        height={16}
                        className="size-3.5 object-contain opacity-55 grayscale transition-opacity duration-150 group-hover:opacity-85"
                        aria-hidden="true"
                      />
                    )}
                    {Icon && (
                      <Icon
                        className="size-3.5 text-neutral-500 transition-colors duration-150 group-hover:text-white"
                        aria-hidden="true"
                      />
                    )}
                    <h3 className="text-sm font-medium text-white text-balance">{item.label}</h3>
                  </div>
                  <p className="mt-1 text-sm leading-6 text-neutral-400 text-pretty">{item.description}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
