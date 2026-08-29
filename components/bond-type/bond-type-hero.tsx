"use client"

import { useEffect, useRef } from "react"
import { BondType } from "./engine"
import { FONT_VAR, FONT_WEIGHT } from "./params"

export function BondTypeHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    let engine: BondType | null = null
    let onScreen = false
    let hidden = document.hidden
    let resizeTimer = 0

    const sync = () => {
      if (!engine) return
      if (media.matches) {
        engine.stop()
        engine.renderStill()
      } else if (onScreen && !hidden) engine.start()
      else engine.stop()
    }

    const frame = requestAnimationFrame(() => {
      engine = new BondType(canvas)
      if (!engine.ok) return
      sync()

      const family = getComputedStyle(document.body)
        .getPropertyValue(FONT_VAR)
        .split(",")[0]
        .replace(/["']/g, "")
        .trim()

      if (family && document.fonts?.load) {
        document.fonts.load(`${FONT_WEIGHT} 1em "${family}"`).then(
          () => engine?.setFont(`"${family}", monospace`),
          () => undefined,
        )
      }
    })

    const intersection = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry?.isIntersecting ?? false
        sync()
      },
      { threshold: 0.2 },
    )
    intersection.observe(canvas)

    const onVisibility = () => {
      hidden = document.hidden
      sync()
    }
    const onMotion = () => sync()
    const onResize = () => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(() => engine?.resize(), 120)
    }
    const resize = new ResizeObserver(onResize)
    resize.observe(canvas)

    document.addEventListener("visibilitychange", onVisibility)
    media.addEventListener("change", onMotion)

    return () => {
      cancelAnimationFrame(frame)
      intersection.disconnect()
      resize.disconnect()
      document.removeEventListener("visibilitychange", onVisibility)
      media.removeEventListener("change", onMotion)
      window.clearTimeout(resizeTimer)
      engine?.destroy()
    }
  }, [])

  return (
    <div
      role="img"
      aria-label="Franco Zeta in a pixel typeface. The letters unfold into a molecular diagram and return to the name."
      className="relative aspect-[1344/620] w-full select-none overflow-hidden bg-transparent"
    >
      <canvas ref={canvasRef} className="h-full w-full bg-transparent [image-rendering:pixelated]" />
    </div>
  )
}
