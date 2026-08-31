import Image from "next/image"
import Link from "next/link"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { MdEmail } from "react-icons/md"
import { SpikeTypeHero } from "@/components/spike-type/spike-type-hero"

const linkClass =
  "font-medium text-neutral-50 underline decoration-neutral-500/70 underline-offset-4 transition-colors duration-150 hover:text-white hover:decoration-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"

export function HeroSection() {
  return (
    <section className="bg-neutral-950 px-4 pb-8 pt-24 text-neutral-200 sm:px-8 sm:pb-10 sm:pt-28 lg:px-12 lg:pb-12">
      <div className="mx-auto max-w-6xl">
        <SpikeTypeHero />
      </div>

      <div className="mx-auto mt-9 max-w-2xl sm:mt-11">
        <h1 className="text-sm font-normal leading-5 text-neutral-400 text-pretty">
          Building{" "}
          <Link
            href="https://kocteau.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium text-neutral-100 transition-colors duration-150 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
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
          </Link>{" "}
          and thoughtful web interfaces.
        </h1>

        <div className="mt-8 space-y-5 text-[15px] leading-7 text-neutral-300 sm:text-base sm:leading-8">
          <p className="max-w-2xl text-pretty">
            I&apos;m a software developer and product designer in Lima. I turn early ideas into clear web interfaces
            and the systems behind them, from product decisions and interaction states to React, Next.js,
            TypeScript, and Supabase.
          </p>

          <p className="max-w-2xl text-pretty">
            <Link href="https://kocteau.com" target="_blank" rel="noopener noreferrer" className={linkClass}>
              Kocteau
            </Link>
            , a music review product for taste, tracks, and public writing, is the clearest proof of how I work. I
            also build{" "}
            <Link href="/work/stepper" className={linkClass}>
              Stepper
            </Link>
            , an accessible primitive for multi-step product flows. I&apos;m available for selected client work and
            product collaborations. If you&apos;re shaping something new or refining an existing product, reach me on{" "}
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
