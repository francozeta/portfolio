"use client"

import type React from "react"
import { memo } from "react"
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiMongodb,
  SiPostgresql,
  SiFramer,
  SiPython,
  SiGit,
  SiAdobeillustrator,
  SiAdobephotoshop,
  SiSupabase,
  SiVercel,
  SiFirebase,
  SiGithub,
  SiFigma,
  SiExpress,
  SiNestjs,
  SiMysql,
  SiRedis,
  SiDocker,
  SiWebpack,
  SiVite,
} from "react-icons/si"
import { FaJava } from "react-icons/fa"
import { VscVscode } from "react-icons/vsc"

interface Technology {
  name: string
  icon: React.ElementType
  category: "frontend" | "backend" | "database" | "tools"
}

// Memoized TechBadge component for better performance
const TechBadge = memo(({ tech }: { tech: Technology }) => (
  <div
    className="flex items-center gap-2 bg-neutral-900/80 border border-neutral-700/50 rounded-full px-4 py-2 whitespace-nowrap backdrop-blur-sm transition-colors hover:bg-neutral-800/80 hover:border-neutral-600/50"
    role="listitem"
  >
    <tech.icon className="w-4 h-4 text-white flex-shrink-0" aria-hidden="true" />
    <span className="text-sm font-medium text-white">{tech.name}</span>
  </div>
))

TechBadge.displayName = "TechBadge"

// Static brick layout component
const BrickLayout = memo(({ technologies }: { technologies: Technology[] }) => {
  // Group technologies into rows for brick layout
  const rows = [
    technologies.slice(0, 8), // Frontend row
    technologies.slice(8, 13), // Backend row
    technologies.slice(13, 19), // Database row
    technologies.slice(19), // Tools row
  ]

  return (
    <div className="space-y-4 md:space-y-6" role="list" aria-label="Technologies and tools">
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={`flex flex-wrap gap-3 md:gap-4 justify-center md:justify-start ${
            rowIndex % 2 === 1 ? "md:ml-8 lg:ml-12" : ""
          }`}
          style={{
            // Stagger rows on larger screens for brick effect
            marginLeft: rowIndex % 2 === 1 ? "clamp(0px, 4vw, 3rem)" : "0",
          }}
        >
          {row.map((tech) => (
            <TechBadge key={tech.name} tech={tech} />
          ))}
        </div>
      ))}
    </div>
  )
})

BrickLayout.displayName = "BrickLayout"

export function TechnologiesSection() {
  const technologies: Technology[] = [
    // Frontend
    { name: "HTML5", icon: SiHtml5, category: "frontend" },
    { name: "CSS3", icon: SiCss3, category: "frontend" },
    { name: "JavaScript", icon: SiJavascript, category: "frontend" },
    { name: "TypeScript", icon: SiTypescript, category: "frontend" },
    { name: "React", icon: SiReact, category: "frontend" },
    { name: "Next.js", icon: SiNextdotjs, category: "frontend" },
    { name: "Tailwind CSS", icon: SiTailwindcss, category: "frontend" },
    { name: "Framer Motion", icon: SiFramer, category: "frontend" },

    // Backend
    { name: "Node.js", icon: SiNodedotjs, category: "backend" },
    { name: "Express", icon: SiExpress, category: "backend" },
    { name: "NestJS", icon: SiNestjs, category: "backend" },
    { name: "Python", icon: SiPython, category: "backend" },
    { name: "Java", icon: FaJava, category: "backend" },

    // Database
    { name: "MongoDB", icon: SiMongodb, category: "database" },
    { name: "PostgreSQL", icon: SiPostgresql, category: "database" },
    { name: "MySQL", icon: SiMysql, category: "database" },
    { name: "Redis", icon: SiRedis, category: "database" },
    { name: "Supabase", icon: SiSupabase, category: "database" },
    { name: "Firebase", icon: SiFirebase, category: "database" },

    // Tools
    { name: "Git", icon: SiGit, category: "tools" },
    { name: "GitHub", icon: SiGithub, category: "tools" },
    { name: "VS Code", icon: VscVscode, category: "tools" },
    { name: "Figma", icon: SiFigma, category: "tools" },
    { name: "Illustrator", icon: SiAdobeillustrator, category: "tools" },
    { name: "Photoshop", icon: SiAdobephotoshop, category: "tools" },
    { name: "Docker", icon: SiDocker, category: "tools" },
    { name: "Webpack", icon: SiWebpack, category: "tools" },
    { name: "Vite", icon: SiVite, category: "tools" },
    { name: "Vercel", icon: SiVercel, category: "tools" },
  ]

  return (
    <section
      className="bg-black py-16 md:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      aria-labelledby="technologies-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 md:mb-16">
          <h2
            id="technologies-heading"
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight"
          >
            Technologies & Tools
          </h2>
          <p className="text-base md:text-lg text-neutral-300 max-w-4xl">
            Throughout my journey as a web developer, I've worked with{" "}
            <span className="text-white font-medium">these tools and technologies</span>
          </p>
        </div>

        {/* Static brick layout */}
        <div className="relative">
          {/* Subtle gradient overlays for visual depth */}
          <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-black via-black/60 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-black via-black/60 to-transparent z-10 pointer-events-none" />

          <BrickLayout technologies={technologies} />
        </div>
      </div>

      {/* Subtle background decoration */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 bg-gradient-to-r from-neutral-800/5 to-neutral-700/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
    </section>
  )
}
