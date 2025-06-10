"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
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
} from "react-icons/si"
import { FaJava } from "react-icons/fa"
import { VscVscode } from "react-icons/vsc"

interface Technology {
  name: string
  icon: React.ElementType
  category: "frontend" | "backend" | "database" | "design" | "tools"
}

export function TechnologiesSection() {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null)

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
    { name: "Python", icon: SiPython, category: "backend" },
    { name: "Java", icon: FaJava, category: "backend" },

    // Database
    { name: "MongoDB", icon: SiMongodb, category: "database" },
    { name: "PostgreSQL", icon: SiPostgresql, category: "database" },
    { name: "Supabase", icon: SiSupabase, category: "database" },
    { name: "Firebase", icon: SiFirebase, category: "database" },

    // Design & Tools
    { name: "Git", icon: SiGit, category: "tools" },
    { name: "GitHub", icon: SiGithub, category: "tools" },
    { name: "Illustrator", icon: SiAdobeillustrator, category: "design" },
    { name: "Photoshop", icon: SiAdobephotoshop, category: "design" },
    { name: "Figma", icon: SiFigma, category: "design" },
    { name: "VS Code", icon: VscVscode, category: "tools" },
    { name: "Vercel", icon: SiVercel, category: "tools" },
  ]

return (
    <section className="bg-black py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Technologies & Tools
          </h2>
          <p className="text-lg text-neutral-300 max-w-4xl">
            Throughout my journey as a web developer, I've worked with{" "}
            <span
              className="text-white font-medium inline-block min-w-fit transition-all duration-300 ease-in-out"
              key={hoveredTech || "default"}
            >
              {hoveredTech || "these tools and technologies"}
            </span>
          </p>
        </div>

        {/* Technology Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-9 gap-8 md:gap-10 lg:gap-12">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="group cursor-pointer flex justify-center"
              onMouseEnter={() => setHoveredTech(tech.name)}
              onMouseLeave={() => setHoveredTech(null)}
            >
              <div
                className={cn(
                  "w-14 h-14 md:w-16 md:h-16 flex items-center justify-center",
                  "transition-all duration-300 group-hover:scale-110",
                )}
              >
                <tech.icon className="w-10 h-10 md:w-12 md:h-12 text-white transition-all duration-300 group-hover:text-neutral-300" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Background gradient effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-gradient-to-r from-neutral-800/20 to-neutral-700/20 rounded-full blur-3xl pointer-events-none" />
    </section>
  )
}
