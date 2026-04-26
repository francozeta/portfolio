import Image from "next/image"
import Link from "next/link"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { MdEmail } from "react-icons/md"

const linkClass =
  "font-medium text-neutral-50 underline decoration-neutral-500/70 underline-offset-4 transition-colors duration-150 hover:text-white hover:decoration-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"

export function HeroSection() {
  return (
    <section className="bg-neutral-950 px-6 pb-16 pt-28 text-neutral-200 sm:px-12 sm:pb-20 sm:pt-32 lg:px-24 lg:pb-24 xl:px-56">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center gap-3">
          <Image
            src="/images/profile-photo.jpg"
            alt="Franco Zeta"
            width={48}
            height={48}
            className="size-12 rounded-full border border-white/10 object-cover"
            priority
            sizes="48px"
          />

          <div>
            <h1 className="text-base font-semibold leading-5 text-white text-balance">Franco Zeta</h1>
            <p className="flex flex-wrap items-center gap-x-1.5 text-sm leading-5 text-neutral-400 text-pretty">
              <span>Design Engineer at</span>
              <Link
                href="https://kocteau.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-neutral-100 transition-colors duration-150 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
                aria-label="Visit Kocteau"
              >
                <Image
                  src="/kocteau-logo.svg"
                  alt=""
                  width={14}
                  height={14}
                  className="size-3.5"
                  aria-hidden="true"
                />
                Kocteau
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-5 text-[15px] leading-7 text-neutral-300 sm:text-base sm:leading-8">
          <p className="max-w-2xl text-pretty">
            I&apos;m building{" "}
            <Link href="https://kocteau.com" target="_blank" rel="noopener noreferrer" className={linkClass}>
              Kocteau
            </Link>
            , my personal project: a music review platform for discovering tracks, publishing opinions, and building a
            more social way to listen. I <span className="font-serif italic text-neutral-100">care deeply</span> about
            craft and quality, and I like to make people feel something through my work.
          </p>

          <p className="max-w-2xl text-pretty">
            Previously, I built{" "}
            <Link href="/work/mubi-clone" className={linkClass}>
              MUBI Clone
            </Link>{" "}
            and a few other experiments. You can reach me on{" "}
            <Link
              href="https://www.linkedin.com/in/franco-zeta-496330267"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              <FaLinkedin className="mr-1 inline size-3.5 align-[-0.125em]" aria-hidden="true" />
              LinkedIn
            </Link>
            , via{" "}
            <Link href="mailto:francozeta2011@gmail.com" className={linkClass}>
              <MdEmail className="mr-1 inline size-4 align-[-0.175em]" aria-hidden="true" />
              email
            </Link>
            , or see my code on{" "}
            <Link
              href="https://github.com/francozeta"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              <FaGithub className="mr-1 inline size-3.5 align-[-0.125em]" aria-hidden="true" />
              GitHub
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  )
}
