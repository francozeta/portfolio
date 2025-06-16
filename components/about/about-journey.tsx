"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export function AboutJourney() {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollReveal<HTMLElement>()
  const { ref: badgeRef, isVisible: badgeVisible } = useScrollReveal<HTMLSpanElement>({ delay: 100 })
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal<HTMLHeadingElement>({ delay: 200 })
  const { ref: contentRef, isVisible: contentVisible } = useScrollReveal<HTMLDivElement>({ delay: 400 })

  return (
    <section id="journey" className="mb-16">
      <header className="mb-8">
        <span className={`inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap border-transparent bg-neutral-800 text-neutral-200 mb-4 transition-all duration-700`}>
          <span className="mr-1">✦</span>
          My Story
        </span>

        <h2
          className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 transition-all duration-700`}
        >
          My Journey
        </h2>
      </header>

      <div
        className={`prose prose-lg prose-invert max-w-none transition-all duration-700`}
      >
        <div className="space-y-6 text-neutral-300 leading-relaxed text-base md:text-lg">
          <p>
            I began coding in 2022 with a simple HTML course that sparked a deep interest in how digital experiences are built — from logic to design.
          </p>

          <p>
            With a background in Systems Engineering, I approach development as both a problem solver and systems thinker, balancing code with creativity.
          </p>

          <p>
            I've worked with HTML, CSS, React, Next.js, and Supabase — building smooth interfaces and scalable backends with care and intention.
          </p>

          <p>
            Today, I focus on thoughtful projects that go beyond function — aiming for clarity, consistency, and real connection.
          </p>


        </div>
      </div>
    </section>
  )
}
