import { cn } from "@/lib/utils"
import type React from "react"

interface GridBackgroundProps {
  children: React.ReactNode
  className?: string
}

export function GridBackground({ children, className }: GridBackgroundProps) {
  return (
    <div className={cn("relative w-full bg-[#101010]", className)}>
      {/* Grid pattern */}
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
        )}
      />

      {/* Radial gradient mask with moon-like shadow (less shadow on top) */}
      <div
        className="pointer-events-none absolute inset-0 bg-neutral-950"
        style={{
          maskImage: `radial-gradient(ellipse 70% 60% at center 40%, transparent 20%, black 70%)`,
          WebkitMaskImage: `radial-gradient(ellipse 70% 60% at center 40%, transparent 20%, black 70%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
