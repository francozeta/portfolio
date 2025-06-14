"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { Heart, Lightbulb, Users, Zap } from "lucide-react"

export function AboutValues() {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollReveal<HTMLElement>()
  const { ref: badgeRef, isVisible: badgeVisible } = useScrollReveal<HTMLSpanElement>({ delay: 100 })
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal<HTMLHeadingElement>({ delay: 200 })
  const { ref: valuesRef, isVisible: valuesVisible } = useScrollReveal<HTMLDivElement>({ delay: 400 })

  const values = [
    {
      icon: Heart,
      title: "Passion-Driven",
      description:
        "I approach every project with genuine excitement, writing code that reflects care, creativity, and intention.",
    },
    {
      icon: Lightbulb,
      title: "Always Learning",
      description:
        "I stay curious and committed to growth — constantly exploring new tools, patterns, and ideas to stay sharp and relevant.",
    },
    {
      icon: Users,
      title: "People-Focused",
      description:
        "I build with empathy — crafting interfaces and experiences that feel intuitive, accessible, and truly user-centered.",
    },
    {
      icon: Zap,
      title: "Performance-Oriented",
      description:
        "From page load to data flow, I care about speed and efficiency — optimizing every layer for a smoother, smarter experience.",
    },
  ];

  return (
    <section ref={sectionRef} id="values" className="mb-0">
      <header className="mb-8">
        <span
          ref={badgeRef}
          className={`inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap border-transparent bg-neutral-800 text-neutral-200 mb-4 transition-all duration-700 ${badgeVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
        >
          <span className="mr-1">✦</span>
          Ethics
        </span>
        <h2
          ref={titleRef}
          className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 transition-all duration-700 ${titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
        >
          Values & Principles
        </h2>
        <p className="text-lg text-neutral-400 max-w-2xl">
          The core principles that guide my approach to development and design
        </p>
      </header>

      <div
        ref={valuesRef}
        className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-1000 ${valuesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
      >
        {values.map((value, index) => (
          <article key={value.title} className="space-y-4">
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
              <value.icon className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white">{value.title}</h3>
            <p className="text-neutral-400 leading-relaxed">{value.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
