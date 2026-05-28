"use client"

import Image from "next/image"
import { HalftoneDots } from "@paper-design/shaders-react"

type HalftoneVariant = "maze" | "constellation" | "overload"

interface HalftoneImageProps {
  src: string
  alt: string
  width: number
  height: number
  variant?: HalftoneVariant
}

const variantSettings = {
  maze: {
    size: 0.42,
    radius: 1.2,
    contrast: 0.46,
    grainMixer: 0.26,
    grainOverlay: 0.24,
    grid: "hex",
    type: "gooey",
  },
  constellation: {
    size: 0.34,
    radius: 1.08,
    contrast: 0.38,
    grainMixer: 0.2,
    grainOverlay: 0.18,
    grid: "hex",
    type: "classic",
  },
  overload: {
    size: 0.48,
    radius: 1.32,
    contrast: 0.52,
    grainMixer: 0.3,
    grainOverlay: 0.28,
    grid: "hex",
    type: "gooey",
  },
} as const

export function HalftoneImage({ src, alt, width, height, variant = "maze" }: HalftoneImageProps) {
  const settings = variantSettings[variant]

  return (
    <div className="relative aspect-video overflow-hidden rounded-[18px] bg-[#f1efe6] shadow-[0_0_0_1px_rgba(255,255,255,0.08)]">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="absolute inset-0 h-full w-full object-cover opacity-80"
        sizes="(max-width: 768px) 100vw, 672px"
      />
      <HalftoneDots
        aria-hidden="true"
        className="absolute inset-0"
        image={src}
        colorBack="#f1efe6"
        colorFront="#1c1c1c"
        fit="cover"
        width="100%"
        height="100%"
        speed={0}
        frame={0}
        maxPixelCount={1200000}
        originalColors={false}
        inverted={false}
        grainSize={0.48}
        {...settings}
      />
    </div>
  )
}
