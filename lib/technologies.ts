import type { IconType } from "react-icons"
import {
  SiVuedotjs,
  SiAngular,
  SiSvelte,
  SiNuxtdotjs,
  SiTypescript,
  SiJavascript,
  SiPython,
  SiRust,
  SiGo,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiRedis,
  SiSupabase,
  SiFirebase,
  SiTailwindcss,
  SiSass,
  SiNodedotjs,
  SiExpress,
  SiNestjs,
  SiFastapi,
  SiDjango,
  SiFlask,
  SiVercel,
  SiNetlify,
  SiGooglecloud,
  SiDocker,
  SiGit,
  SiGithub,
  SiFigma,
  SiWebpack,
  SiVite,
  SiShadcnui,
} from "react-icons/si"

import { FaHtml5, FaCss3Alt, FaPhp, FaWordpress, FaReact, FaJava, FaAws } from "react-icons/fa"

import { TbBrandFramerMotion } from "react-icons/tb"
import { RiNextjsFill } from "react-icons/ri"
import { VscVscode } from "react-icons/vsc"

export interface Technology {
  name: string
  icon: IconType
  iconName: string // Para guardar en la DB
  color?: string
}

export interface TechnologyData {
  name: string
  iconName: string
  color?: string
}

export const AVAILABLE_TECHNOLOGIES: Technology[] = [
  { name: "Next.js", icon: RiNextjsFill, iconName: "RiNextjsFill", color: "bg-transparent text-white" },
  { name: "React", icon: FaReact, iconName: "FaReact", color: "bg-transparent text-white" },
  { name: "Vue.js", icon: SiVuedotjs, iconName: "SiVuedotjs", color: "bg-transparent text-white" },
  { name: "Angular", icon: SiAngular, iconName: "SiAngular", color: "bg-transparent text-white" },
  { name: "Svelte", icon: SiSvelte, iconName: "SiSvelte", color: "bg-transparent text-white" },
  { name: "Nuxt.js", icon: SiNuxtdotjs, iconName: "SiNuxtdotjs", color: "bg-transparent text-white" },

  { name: "TypeScript", icon: SiTypescript, iconName: "SiTypescript", color: "bg-transparent text-white" },
  { name: "JavaScript", icon: SiJavascript, iconName: "SiJavascript", color: "bg-transparent text-black" },
  { name: "Python", icon: SiPython, iconName: "SiPython", color: "bg-transparent text-white" },
  { name: "PHP", icon: FaPhp, iconName: "FaPhp", color: "bg-transparent text-white" },
  { name: "Java", icon: FaJava, iconName: "FaJava", color: "bg-transparent text-white" },
  { name: "Rust", icon: SiRust, iconName: "SiRust", color: "bg-transparent text-white" },
  { name: "Go", icon: SiGo, iconName: "SiGo", color: "bg-transparent text-white" },

  { name: "HTML5", icon: FaHtml5, iconName: "FaHtml5", color: "bg-transparent text-white" },
  { name: "CSS3", icon: FaCss3Alt, iconName: "FaCss3Alt", color: "bg-transparent text-white" },

  { name: "Tailwind CSS", icon: SiTailwindcss, iconName: "SiTailwindcss", color: "bg-transparent text-white" },
  { name: "Sass", icon: SiSass, iconName: "SiSass", color: "bg-transparent text-white" },

  {
    name: 'Shadcn/ui', icon: SiShadcnui, iconName:'SiShadcnui', color: 'bg-transparent text-white'
  },

  {
    name: "Framer Motion",
    icon: TbBrandFramerMotion,
    iconName: "TbBrandFramerMotion",
    color: "bg-transparent text-white",
  },

  { name: "Node.js", icon: SiNodedotjs, iconName: "SiNodedotjs", color: "bg-transparent text-white" },
  { name: "Express", icon: SiExpress, iconName: "SiExpress", color: "bg-transparent text-white" },
  { name: "NestJS", icon: SiNestjs, iconName: "SiNestjs", color: "bg-transparent text-white" },
  { name: "FastAPI", icon: SiFastapi, iconName: "SiFastapi", color: "bg-transparent text-white" },
  { name: "Django", icon: SiDjango, iconName: "SiDjango", color: "bg-transparent text-white" },
  { name: "Flask", icon: SiFlask, iconName: "SiFlask", color: "bg-transparent text-white" },

  { name: "PostgreSQL", icon: SiPostgresql, iconName: "SiPostgresql", color: "bg-transparent text-white" },
  { name: "MySQL", icon: SiMysql, iconName: "SiMysql", color: "bg-transparent text-white" },
  { name: "MongoDB", icon: SiMongodb, iconName: "SiMongodb", color: "bg-transparent text-white" },
  { name: "Redis", icon: SiRedis, iconName: "SiRedis", color: "bg-transparent text-white" },
  { name: "Supabase", icon: SiSupabase, iconName: "SiSupabase", color: "bg-transparent text-white" },
  { name: "Firebase", icon: SiFirebase, iconName: "SiFirebase", color: "bg-transparent text-white" },

  { name: "Vercel", icon: SiVercel, iconName: "SiVercel", color: "bgtransparent-white" },
  { name: "Netlify", icon: SiNetlify, iconName: "SiNetlify", color: "bg-transparent text-white" },
  { name: "AWS", icon: FaAws, iconName: "FaAws", color: "bg-transparent text-white" },
  { name: "Google Cloud", icon: SiGooglecloud, iconName: "SiGooglecloud", color: "bg-transparent text-white" },

  { name: "Git", icon: SiGit, iconName: "SiGit", color: "bg-transparent text-white" },
  { name: "GitHub", icon: SiGithub, iconName: "SiGithub", color: "bg-transparent text-white" },
  { name: "Docker", icon: SiDocker, iconName: "SiDocker", color: "bg-transparent text-white" },
  { name: "Figma", icon: SiFigma, iconName: "SiFigma", color: "bg-transparent text-white" },
  { name: "VS Code", icon: VscVscode, iconName: " VscVscode ", color: "bg-transparent text-white" },
  { name: "Webpack", icon: SiWebpack, iconName: "SiWebpack", color: "bg-transparent text-white" },
  { name: "Vite", icon: SiVite, iconName: "SiVite", color: "bg-transparent text-white" },

  { name: "WordPress", icon: FaWordpress, iconName: "FaWordpress", color: "bg-transparent text-white" },
]

// Función helper para obtener icono por nombre
export function getIconByName(iconName: string): IconType | null {
  const tech = AVAILABLE_TECHNOLOGIES.find((t) => t.iconName === iconName)
  return tech?.icon || null
}

// Función helper para convertir de Technology a TechnologyData
export function technologyToData(tech: Technology): TechnologyData {
  return {
    name: tech.name,
    iconName: tech.iconName,
    color: tech.color,
  }
}

// Función helper para convertir de TechnologyData a Technology
export function technologyFromData(data: TechnologyData): Technology | null {
  const tech = AVAILABLE_TECHNOLOGIES.find((t) => t.iconName === data.iconName)
  if (!tech) return null

  return {
    ...tech,
    color: data.color || tech.color, // Usar color guardado o default
  }
}
