"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function AboutSection() {
  return (
    <section id="about" className="bg-black py-20 sm:py-24 lg:py-32 px-6 sm:px-12 lg:px-24 xl:px-56">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row-reverse gap-12">
          {/* Image - Desktop only, positioned on the right */}
          <div className="mt-10 w-48 h-48 md:w-72 md:h-72 hidden md:block">
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-accent">
              <Image
                src="https://ahmytayvpbqnwimemzqh.supabase.co/storage/v1/object/public/portfolio//profile-photo.jpg"
                alt="Franco Zeta - Software Developer"
                fill
                className="object-cover grayscale"
                loading="lazy"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 md:text-left">
            {/* Badge */}
            <span className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap border-transparent bg-neutral-800 text-neutral-200 mb-4">
              ✦ Who I Am
            </span>

            {/* Image - Mobile only */}
            <div className="w-48 h-48 md:w-72 md:h-72 mt-3 mb-8 block md:hidden">
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-accent">
                <Image
                  src="https://ahmytayvpbqnwimemzqh.supabase.co/storage/v1/object/public/portfolio//profile-photo.jpg"
                  alt="Franco Zeta - Software Developer"
                  fill
                  className="object-cover grayscale"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              About Me
            </h2>

            {/* Description */}
            <p className="text-base md:text-lg text-neutral-300 mb-8 max-w-4xl">
              I'm a passionate software developer and design enthusiast from Peru. My journey began in 2022 with a simple HTML course — and quickly turned into a deep love for buildingthings with code.

            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Link
                href="/about"
                className="group flex items-center gap-2 text-white hover:gap-3 transition-all duration-300"
                aria-label="View about me page"
              >
                <span className="text-base md:text-lg  font-medium">View about me</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
