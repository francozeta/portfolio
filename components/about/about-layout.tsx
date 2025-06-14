"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, MessageCircle } from "lucide-react"
import { FaThreads } from "react-icons/fa6"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { AboutJourney } from "./about-journey"
import { AboutSkills } from "./about-skills"
import { AboutExperience } from "./about-experience"
import { AboutValues } from "./about-values"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { MdEmail } from "react-icons/md"

export function AboutLayout() {
  const { ref: imageRef, isVisible: imageVisible } = useScrollReveal<HTMLDivElement>({ delay: 200 })

  return (
    <section className="bg-neutral-950 pt-24 pb-16 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-24 px-6 sm:px-12 lg:px-24 xl:px-56">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column - Sticky Profile */}
          <div
            ref={imageRef}
            className={`lg:col-span-4 lg:sticky lg:top-24 space-y-6 transition-all duration-1000 ${imageVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            {/* Profile Image */}
            <div className="relative w-48 h-48 mx-auto lg:mx-0">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 rounded-full blur-xl" />
              <Image
                src="https://ahmytayvpbqnwimemzqh.supabase.co/storage/v1/object/public/portfolio//profile-photo.jpg"
                alt="Franco Zeta - Software Developer"
                width={192}
                height={192}
                className="relative w-full h-full object-cover rounded-full border-2 border-white/10"
                priority
                sizes="192px"
              />
            </div>

            {/* Location and Status */}
            <div className="space-y-3 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 text-neutral-400">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">Peru, South America</span>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm text-neutral-300">Available for work</span>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-2 text-neutral-400">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">Started coding in 2022</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex justify-center lg:justify-start gap-3">
              <Button
                variant="outline"
                size="sm"
                className="bg-neutral-900/50 border-neutral-700 hover:bg-neutral-800/70 hover:border-neutral-600"
                asChild
              >
                <Link
                  href="https://github.com/francozeta"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                >
                  <FaGithub className="h-4 w-4" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="bg-neutral-900/50 border-neutral-700 hover:bg-neutral-800/70 hover:border-neutral-600"
                asChild
              >
                <Link
                  href="https://www.linkedin.com/in/franco-zeta-496330267"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                >
                  <FaLinkedin className="h-4 w-4" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="bg-neutral-900/50 border-neutral-700 hover:bg-neutral-800/70 hover:border-neutral-600"
                asChild
              >
                <Link
                  href="https://www.threads.net/@frxnco.zeta"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Threads Profile"
                >
                  <FaThreads className="h-4 w-4" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="bg-neutral-900/50 border-neutral-700 hover:bg-neutral-800/70 hover:border-neutral-600"
                asChild
              >
                <Link href="mailto:francozeta2011@gmail.com" aria-label="Send Email">
                  <MdEmail className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* CTA Button */}
            <div className="flex justify-center lg:justify-start">
              <Button
                className="bg-white text-black hover:bg-neutral-200 transition-all duration-200 rounded-full"
                asChild
              >
                <Link href="#contact" aria-label="Schedule a call">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  
                  Schedule a call
                </Link>
              </Button>
            </div>
          </div>
          {/* Right Column - All Content */}
          <div className="lg:col-span-8 space-y-0">
            <AboutJourney />
            <AboutSkills />
            <AboutExperience />
            <AboutValues />
          </div>
        </div>
      </div>
    </section>
  )
}
