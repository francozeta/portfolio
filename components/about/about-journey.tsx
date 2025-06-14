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
        <div className="space-y-6 text-neutral-300 leading-relaxed">
          <p className="text-lg">
            My journey into software development began in 2022 with a simple HTML course. What seemed like a basic intro
            quickly unlocked a deeper curiosity — not just about how websites are built, but about the logic, design, and emotion behind digital experiences.
          </p>

          <p>
            With a background in Systems Engineering, I approach development as both an analytical thinker and a creative problem solver.
            That blend helps me see beyond just lines of code — I think in terms of systems, user flows, and long-term scalability.
          </p>

          <p>
            Since then, I’ve been hands-on with everything from HTML and CSS to modern tools like React, Next.js, and Supabase.
            I love building interfaces that feel smooth and intuitive, but I also enjoy the challenge of structuring clean, scalable backends.
          </p>

          <p>
            Today, I focus on building projects that feel thoughtful — not just functional.
            Whether it's a personal idea or a client collaboration, I care about the details, the consistency, and creating something that actually connects with people.
          </p>

        </div>
      </div>
    </section>
  )
}
