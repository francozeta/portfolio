"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Download, ArrowRight } from "lucide-react"
import Image from "next/image"
import { GridBackground } from "@/components/ui/grid-background"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export function HeroSection() {
  // Add scroll reveal hooks
  const { ref: introRef, isVisible: introVisible } = useScrollReveal<HTMLDivElement>({ delay: 100 })
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal<HTMLHeadingElement>({ delay: 300 })
  const { ref: subtitleRef, isVisible: subtitleVisible } = useScrollReveal<HTMLParagraphElement>({ delay: 500 })
  const { ref: buttonsRef, isVisible: buttonsVisible } = useScrollReveal<HTMLDivElement>({ delay: 700 })

  return (
    <GridBackground className="min-h-screen">
      <section className="relative min-h-screen flex items-center justify-center py-20 sm:py-24 lg:py-32 px-6 sm:px-12 lg:px-24 xl:px-56">
        <div className="max-w-7xl mx-auto text-center space-y-6 sm:space-y-8">
          {/* Main text */}
          <div className="space-y-3 sm:space-y-4">
            <p
              ref={introRef}
              className={`text-base text-neutral-400 font-light tracking-wide transition-all duration-700 ${
                introVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Hello, I am
            </p>

            <h1
              ref={titleRef}
              className={`text-4xl sm:text-6xl lg:text-7xl font-bold text-neutral-100 tracking-tight transition-all duration-700 ${
                titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Franco Zeta
            </h1>

            <p
              ref={subtitleRef}
              className={`text-base sm:text-lg lg:text-xl text-neutral-300 font-light max-w-2xl mx-auto leading-relaxed transition-all duration-700 ${
                subtitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Software Developer & Systems Engineer & Designer
            </p>
          </div>

          {/* Action buttons with better accessibility */}
          <div
            ref={buttonsRef}
            className={`flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4 sm:pt-6 transition-all duration-700 ${
              buttonsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Button
              variant="outline"
              className="group bg-neutral-900/50 border-neutral-700 hover:bg-neutral-800/70 hover:border-neutral-600 hover:text-neutral-100 transition-all duration-200 backdrop-blur-sm w-full sm:w-auto rounded-full h-auto mb-1 sm:mb-0"
              asChild
            >
              <Link href="/about" aria-label="Learn more about Franco Zeta">
                <Image
                  src="https://ahmytayvpbqnwimemzqh.supabase.co/storage/v1/object/public/portfolio//profile-photo.jpg"
                  alt="Franco Zeta profile photo"
                  width={24}
                  height={24}
                  className="w-6 h-6 rounded-full mr-2 flex-shrink-0 object-cover"
                  priority
                  sizes="24px"
                />
                About me
                <ArrowRight
                  className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-neutral-100"
                  aria-hidden="true"
                />
              </Link>
            </Button>

            <Button
              className="bg-white text-black hover:bg-neutral-200 transition-all duration-200 w-full sm:w-auto rounded-full h-auto mb-1 sm:mb-0"
              aria-label="Download Franco Zeta's CV"
            >
              <Download className="mr-2 h-4 w-4" aria-hidden="true" />
              Download CV
            </Button>
          </div>
        </div>
      </section>
    </GridBackground>
  )
}
