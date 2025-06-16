"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export function AboutJourney() {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollReveal<HTMLElement>()
  const { ref: badgeRef, isVisible: badgeVisible } = useScrollReveal<HTMLSpanElement>({ delay: 100 })
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal<HTMLHeadingElement>({ delay: 200 })
  const { ref: contentRef, isVisible: contentVisible } = useScrollReveal<HTMLDivElement>({ delay: 400 })

  return (
    <section ref={sectionRef} id="journey" className="mb-16">
      <header className="mb-8">
        <span
          ref={badgeRef}
          className={`inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap border-transparent bg-neutral-800 text-neutral-200 mb-4 transition-all duration-700 ${badgeVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
        >
          <span className="mr-1">✦</span>
          My Story
        </span>

        <h2
          ref={titleRef}
          className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 transition-all duration-700 ${titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
        >
          My Journey
        </h2>
      </header>

      <div
        ref={contentRef}
        className={`prose prose-lg prose-invert max-w-none transition-all duration-700 ${contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
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
