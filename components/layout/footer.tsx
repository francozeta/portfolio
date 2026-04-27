import Link from "next/link"
import { FaGithub } from "react-icons/fa"
import { FaLinkedin, FaThreads } from "react-icons/fa6"
import { MdEmail } from "react-icons/md"

const socialLinks = [
  {
    label: "GitHub",
    href: "https://www.github.com/francozeta",
    icon: FaGithub,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/franco-zeta-496330267",
    icon: FaLinkedin,
  },
  {
    label: "Threads",
    href: "https://www.threads.net/@frxnco.zeta",
    icon: FaThreads,
  },
  {
    label: "Email",
    href: "mailto:francozeta2011@gmail.com",
    icon: MdEmail,
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-neutral-950 px-6 pb-28 pt-8 text-neutral-200 sm:px-12 sm:pb-10 lg:px-24 xl:px-56">
      <div className="mx-auto max-w-2xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              href="/"
              className="inline-flex min-h-10 items-center text-sm font-medium text-white transition-[color,transform] duration-150 ease-out hover:text-neutral-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 active:scale-[0.96]"
            >
              francozeta
            </Link>
            <p className="text-sm leading-6 text-neutral-500 text-pretty">
              © {new Date().getFullYear()} / Built with care in Lima.
            </p>
          </div>

          <nav className="flex items-center gap-2" aria-label="Footer social links">
            {socialLinks.map((item) => {
              const Icon = item.icon
              const isEmail = item.href.startsWith("mailto:")

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  target={isEmail ? undefined : "_blank"}
                  rel={isEmail ? undefined : "noopener noreferrer"}
                  aria-label={item.label}
                  className="inline-flex size-10 items-center justify-center rounded-full bg-neutral-950 text-neutral-500 shadow-[0_0_0_1px_rgba(255,255,255,0.08)] transition-[color,transform] duration-150 ease-out hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 active:scale-[0.96]"
                >
                  <Icon className="size-4" aria-hidden="true" />
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </footer>
  )
}
