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
  priority: "high" | "medium" | "low" // Para filtrar en móvil
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
  // Filter technologies for mobile (only high priority)
  const mobileTechnologies = technologies.filter((tech) => tech.priority === "high")

  // Group technologies into rows for brick layout
  const createRows = (techs: Technology[]) =>
    [
      techs.filter((t) => t.category === "frontend"),
      techs.filter((t) => t.category === "backend"),
      techs.filter((t) => t.category === "database"),
      techs.filter((t) => t.category === "tools"),
    ].filter((row) => row.length > 0) // Remove empty rows

  const desktopRows = createRows(technologies)
  const mobileRows = createRows(mobileTechnologies)

  return (
    <div className="space-y-6 md:space-y-8" role="list" aria-label="Technologies and tools">
      {/* Mobile layout - simplified */}
      <div className="block md:hidden">
        {mobileRows.map((row, rowIndex) => (
          <div key={`mobile-${rowIndex}`} className="flex flex-wrap gap-3 justify-center mb-6">
            {row.map((tech) => (
              <TechBadge key={tech.name} tech={tech} />
            ))}
          </div>
        ))}
      </div>

      {/* Desktop layout - full brick pattern */}
      <div className="hidden md:block">
        {desktopRows.map((row, rowIndex) => (
          <div
            key={`desktop-${rowIndex}`}
            className={`flex flex-wrap gap-3 md:gap-4 justify-center md:justify-start mb-6 ${
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
    </div>
  )
})

BrickLayout.displayName = "BrickLayout"

export function TechnologiesSection() {
  const technologies: Technology[] = [
    // Frontend - High Priority
    { name: "React", icon: SiReact, category: "frontend", priority: "high" },
    { name: "Next.js", icon: SiNextdotjs, category: "frontend", priority: "high" },
    { name: "TypeScript", icon: SiTypescript, category: "frontend", priority: "high" },
    { name: "Tailwind CSS", icon: SiTailwindcss, category: "frontend", priority: "high" },

    // Frontend - Medium/Low Priority
    { name: "HTML5", icon: SiHtml5, category: "frontend", priority: "medium" },
    { name: "CSS3", icon: SiCss3, category: "frontend", priority: "medium" },
    { name: "JavaScript", icon: SiJavascript, category: "frontend", priority: "medium" },
    { name: "Framer Motion", icon: SiFramer, category: "frontend", priority: "low" },

    // Backend - High Priority
    { name: "Node.js", icon: SiNodedotjs, category: "backend", priority: "high" },
    { name: "Python", icon: SiPython, category: "backend", priority: "high" },

    // Backend - Medium/Low Priority
    { name: "Express", icon: SiExpress, category: "backend", priority: "medium" },
    { name: "NestJS", icon: SiNestjs, category: "backend", priority: "low" },
    { name: "Java", icon: FaJava, category: "backend", priority: "low" },

    // Database - High Priority
    { name: "PostgreSQL", icon: SiPostgresql, category: "database", priority: "high" },
    { name: "Supabase", icon: SiSupabase, category: "database", priority: "high" },

    // Database - Medium/Low Priority
    { name: "MongoDB", icon: SiMongodb, category: "database", priority: "medium" },
    { name: "MySQL", icon: SiMysql, category: "database", priority: "medium" },
    { name: "Redis", icon: SiRedis, category: "database", priority: "low" },
    { name: "Firebase", icon: SiFirebase, category: "database", priority: "low" },

    // Tools - High Priority
    { name: "Git", icon: SiGit, category: "tools", priority: "high" },
    { name: "GitHub", icon: SiGithub, category: "tools", priority: "high" },
    { name: "Vercel", icon: SiVercel, category: "tools", priority: "high" },
    { name: "Figma", icon: SiFigma, category: "tools", priority: "high" },

    // Tools - Medium/Low Priority
    { name: "VS Code", icon: VscVscode, category: "tools", priority: "medium" },
    { name: "Docker", icon: SiDocker, category: "tools", priority: "medium" },
    { name: "Illustrator", icon: SiAdobeillustrator, category: "tools", priority: "low" },
    { name: "Photoshop", icon: SiAdobephotoshop, category: "tools", priority: "low" },
    { name: "Webpack", icon: SiWebpack, category: "tools", priority: "low" },
    { name: "Vite", icon: SiVite, category: "tools", priority: "low" },
  ]

  return (
    <section
      className="bg-black py-20 sm:py-24 lg:py-32 px-6 sm:px-12 lg:px-24 xl:px-56 relative overflow-hidden"
      aria-labelledby="technologies-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 md:mb-16">
          <h2
            id="technologies-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight"
          >
            Technologies & Tools
          </h2>
          <p className="text-base md:text-lg text-neutral-300 max-w-4xl">
            Throughout my journey as a web developer, I've worked with{" "}
            <span className="text-white font-medium">these tools and technologies</span>
          </p>
        </div>

        {/* Static brick layout with improved spacing */}
        <div className="relative">
          {/* Subtle gradient overlays for visual depth - Hidden on mobile */}
          <div className="hidden md:block absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-black via-black/60 to-transparent z-10 pointer-events-none" />
          <div className="hidden md:block absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-black via-black/60 to-transparent z-10 pointer-events-none" />

          <BrickLayout technologies={technologies} />
        </div>
      </div>

      {/* Subtle background decoration - Hidden on mobile */}
      <div
        className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 bg-gradient-to-r from-neutral-800/5 to-neutral-700/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
    </section>
  )
}
