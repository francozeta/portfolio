"use client"

import { Button } from "@/components/ui/button"
import { Download, ArrowRight } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pb-16 sm:pb-0">
      <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
        {/* Texto principal */}
        <div className="space-y-3 sm:space-y-4">
          <p className="text-base text-neutral-400 font-light tracking-wide">Hello, I am</p>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-neutral-100 tracking-tight">
            Franco Zeta
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-neutral-300 font-light max-w-2xl mx-auto leading-relaxed">
            Software Developer & Systems Engineer & Designer
          </p>
        </div>

        {/* Botones de acción con estilo fullrounded */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4 sm:pt-6">
          <Button
            variant="outline"
            className="group bg-neutral-900/50 border-neutral-700  hover:bg-neutral-800/70 hover:border-neutral-600 hover:text-neutral-100 transition-all duration-200 backdrop-blur-sm w-full sm:w-auto rounded-full h-auto mb-1 sm:mb-0"
          >
            <Image
              src="https://ahmytayvpbqnwimemzqh.supabase.co/storage/v1/object/public/portfolio//profile-photo.jpg"
              alt="Franco Zeta"
              width={24}
              height={24}
              className="w-6 h-6 rounded-full mr-2 flex-shrink-0 object-cover"
            />
            About me
            <ArrowRight
              className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-neutral-100"
            />
          </Button>

          <Button className="bg-white text-black hover:bg-neutral-200 transition-all duration-200 w-full sm:w-auto rounded-full  h-auto mb-1 sm:mb-0">
            <Download className="mr-2 h-4 w-4" />
            Download CV
          </Button>
        </div>
      </div>
    </section>
  )
}
