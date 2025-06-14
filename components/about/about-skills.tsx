"use client"

import { Badge } from "@/components/ui/badge"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export function AboutSkills() {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollReveal<HTMLElement>()
  const { ref: badgeRef, isVisible: badgeVisible } = useScrollReveal<HTMLSpanElement>({ delay: 100 })
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal<HTMLHeadingElement>({ delay: 200 })
  const { ref: skillsRef, isVisible: skillsVisible } = useScrollReveal<HTMLDivElement>({ delay: 400 })

  const skillCategories = [
    {
      title: "Frontend Development",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "HTML5", "CSS3"],
    },
    {
      title: "Backend Development",
      skills: ["Node.js", "Python", "Express", "PostgreSQL", "Supabase", "REST APIs"],
    },
    {
      title: "Design & Tools",
      skills: ["Figma", "UI/UX Design", "Responsive Design", "Git", "GitHub", "VS Code"],
    },
    {
      title: "Deployment & Cloud",
      skills: ["Vercel", "Docker", "Firebase", "Database Design", "Performance Optimization"],
    },
  ]

  return (
    <section ref={sectionRef} id="skills" className="mb-16">
      <header className="mb-8">
        <span
          ref={badgeRef}
          className={`inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap border-transparent bg-neutral-800 text-neutral-200 mb-4 transition-all duration-700 ${
            badgeVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="mr-1">✦</span>
          Tech Stack
        </span>

        <h2
          ref={titleRef}
          className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 transition-all duration-700 ${
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Skills & Expertise
        </h2>
        <p className="text-base md:text-lg text-neutral-400 max-w-2xl">
          A comprehensive toolkit built through continuous learning and hands-on experience
        </p>
      </header>

      <div
        ref={skillsRef}
        className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-1000 ${
          skillsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {skillCategories.map((category, index) => (
          <article key={category.title} className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-4">{category.title}</h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="bg-transparent text-white border border-white/20 text-xs md:text-sm  px-3 py-1 rounded-full"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
