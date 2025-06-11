"use client"

import type React from "react"
import { motion } from "framer-motion"
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

// Memoize the TechBadge component
const TechBadge = memo(({ tech }: { tech: Technology }) => (
  <div className="flex items-center gap-2 bg-neutral-900/80 border border-neutral-700/50 rounded-full px-4 py-2 whitespace-nowrap backdrop-blur-sm">
    <tech.icon className="w-4 h-4 text-white flex-shrink-0" />
    <span className="text-sm font-medium text-white">{tech.name}</span>
  </div>
))

TechBadge.displayName = "TechBadge"

// Optimize BrickRow with reduced animation complexity
const BrickRow = memo(({ techs, offset = 0 }: { techs: Technology[]; offset?: number }) => {
  // Reduce duplications for better performance
  const extendedTechs = [...techs, ...techs]

  return (
    <div
      className="flex gap-4 whitespace-nowrap"
      style={{
        marginLeft: `${offset}px`,
        minWidth: "max-content",
      }}
    >
      {extendedTechs.map((tech, index) => (
        <TechBadge key={`${tech.name}-${index}`} tech={tech} />
      ))}
    </div>
  )
})

BrickRow.displayName = "BrickRow"

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

  // Group technologies by category
  const frontendTechs = technologies.filter((tech) => tech.category === "frontend")
  const backendTechs = technologies.filter((tech) => tech.category === "backend")
  const databaseTechs = technologies.filter((tech) => tech.category === "database")
  const toolsTechs = technologies.filter((tech) => tech.category === "tools")

  return (
    <section className="bg-black py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Technologies & Tools
          </h2>
          <p className="text-lg text-neutral-300 max-w-4xl">
            Throughout my journey as a web developer, I've worked with{" "}
            <span className="text-white font-medium">these tools and technologies</span>
          </p>
        </div>

        {/* Simplified animation with better performance */}
        <div className="relative overflow-hidden min-w-full">
          <div className="absolute left-0 top-0 bottom-0 w-11 sm:w-16 md:w-24 lg:w-32 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-11 sm:w-16 md:w-24 lg:w-32 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />

          {/* Optimized animation with reduced complexity */}
          <motion.div
            className="space-y-6"
            animate={{
              x: [0, -800], // Reduced distance
            }}
            transition={{
              x: {
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                duration: 60, // Faster duration
                ease: "linear",
              },
            }}
            style={{
              willChange: "transform", // Optimize for animations
            }}
          >
            <BrickRow techs={frontendTechs} offset={0} />
            <BrickRow techs={backendTechs} offset={-80} />
            <BrickRow techs={databaseTechs} offset={-40} />
            <BrickRow techs={toolsTechs} offset={-120} />
          </motion.div>
        </div>
      </div>

      {/* Simplified background effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 bg-gradient-to-r from-neutral-800/10 to-neutral-700/10 rounded-full blur-3xl pointer-events-none" />
    </section>
  )
}
