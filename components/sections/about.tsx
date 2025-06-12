"use client"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export function AboutSection() {
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>()
  const { ref: badgeRef, isVisible: badgeVisible } = useScrollReveal<HTMLSpanElement>({ delay: 100 })
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal<HTMLHeadingElement>({ delay: 200 })
  const { ref: textRef, isVisible: textVisible } = useScrollReveal<HTMLParagraphElement>({ delay: 300 })
  const { ref: linkRef, isVisible: linkVisible } = useScrollReveal<HTMLDivElement>({ delay: 400 })

  return (
    <section
      ref={sectionRef}
      id="about"
      className="bg-neutral-950 py-20 sm:py-24 lg:py-32 px-6 sm:px-12 lg:px-24 xl:px-56"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row-reverse gap-12">
          {/* SVG Container - Desktop */}
          <div
            className={`mt-10 w-48 h-48 md:w-72 md:h-72 hidden md:block transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <Image
                src="https://ahmytayvpbqnwimemzqh.supabase.co/storage/v1/object/public/portfolio//fz-logo.svg"
                alt="Franco Zeta - Software Developer"
                fill
                className="object-contain"
                loading="lazy"
                sizes="(max-width: 768px) 192px, 288px"
              />
            </div>
          </div>

          <div className="flex-1 md:text-left">
            {/* Badge */}
            <span
              ref={badgeRef}
              className={`inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap border-transparent bg-neutral-800 text-neutral-200 mb-4 transition-all duration-700 ${
                badgeVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <span className="mr-1">✦</span>
              Who I Am
            </span>

            {/* SVG Container - Mobile */}
            <div
              className={`w-48 h-48 md:w-72 md:h-72 mt-3 mb-8 block md:hidden transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Image
                  src="https://ahmytayvpbqnwimemzqh.supabase.co/storage/v1/object/public/portfolio//fz-logo.svg"
                  alt="Franco Zeta - Software Developer"
                  fill
                  className="object-contain"
                  loading="lazy"
                  sizes="192px"
                />
              </div>
            </div>

            {/* Title */}
            <h2
              ref={titleRef}
              className={`text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight transition-all duration-700 ${
                titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              About Me
            </h2>

            {/* Description */}
            <p
              ref={textRef}
              className={`text-base md:text-lg text-neutral-300 mb-8 max-w-4xl transition-all duration-700 ${
                textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              I'm a passionate software developer and design enthusiast from Peru. My journey began in 2022 with a
              simple HTML course — and quickly turned into a deep love for building things with code.
            </p>

            {/* Link */}
            <div
              ref={linkRef}
              className={`flex flex-wrap items-center gap-4 mb-6 transition-all duration-700 ${
                linkVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <Link
                href="/about"
                className="group flex items-center gap-2 text-white hover:gap-3 transition-all duration-300"
                aria-label="View about me page"
              >
                <span className="text-base md:text-lg font-medium">View about me</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
