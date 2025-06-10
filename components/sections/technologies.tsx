"use client"

import type React from "react"
import { motion } from "framer-motion"
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

  // Component for individual technology badge
  const TechBadge = ({ tech }: { tech: Technology }) => (
    <div className="flex items-center gap-2 bg-neutral-900/80 border border-neutral-700/50 rounded-full px-4 py-2 whitespace-nowrap backdrop-blur-sm">
      <tech.icon className="w-4 h-4 text-white flex-shrink-0" />
      <span className="text-sm font-medium text-white">{tech.name}</span>
    </div>
  )

  // Create brick pattern rows with offset
  const BrickRow = ({ techs, offset = 0 }: { techs: Technology[]; offset?: number }) => {
    // Duplicate technologies to ensure seamless flow
    const extendedTechs = [...techs, ...techs, ...techs, ...techs]

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
  }

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

        {/* Infinite Scrolling Carousel - All rows move together */}
        <div className="relative overflow-hidden min-w-full">
          {/* Left gradient overlay - Responsive width based on screen size */}
          <div className="absolute left-0 top-0 bottom-0 w-11 sm:w-16 md:w-24 lg:w-32 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />

          {/* Right gradient overlay - Responsive width based on screen size */}
          <div className="absolute right-0 top-0 bottom-0 w-11 sm:w-16 md:w-24 lg:w-32 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />

          {/* Parent container that moves all rows together */}
          <motion.div
            className="space-y-6"
            animate={{
              x: [0, -1200], // Move much further before reset for seamless loop
            }}
            transition={{
              x: {
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                duration: 90, // Slightly faster - 1.5 minutes per cycle (was 120s)
                ease: "linear", // Constant speed for smooth movement
              },
            }}
          >
            {/* Brick pattern with different offsets for each row to create staggered effect */}
            <BrickRow techs={frontendTechs} offset={0} />
            <BrickRow techs={backendTechs} offset={-80} />
            <BrickRow techs={databaseTechs} offset={-40} />
            <BrickRow techs={toolsTechs} offset={-120} />
          </motion.div>
        </div>
      </div>

      {/* Background gradient effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-gradient-to-r from-neutral-800/20 to-neutral-700/20 rounded-full blur-3xl pointer-events-none" />
    </section>
  )
}
