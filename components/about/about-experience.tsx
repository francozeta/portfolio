"use client"

import { Calendar, MapPin } from "lucide-react"

export function AboutExperience() {

  const experiences = [
    {
      period: "2024 - Present",
      title: "Freelance Full Stack Developer",
      company: "Self-Employed",
      location: "Peru (Remote)",
      description:
        "Designing and developing tailored web applications for clients, with a focus on performance, usability, and scalability. I work across the full stack using React, Next.js, Node.js, and Supabase to bring real-world ideas to production.",
      highlights: [
        "Delivered 5+ production-grade applications",
        "Specialized in lightweight e-commerce and POS systems",
        "Maintained 100% client satisfaction across projects",
      ],
    },
    {
      period: "2023 - 2024",
      title: "Frontend Developer",
      company: "Personal Projects",
      location: "Peru",
      description:
        "Focused on building and refining a wide range of personal web apps to sharpen my skills in modern frontend technologies. Explored design systems, accessibility, and real-user flows with tools like React, TypeScript, Tailwind CSS, and Next.js.",
      highlights: [
        "Built 10+ personal projects across different domains",
        "Deepened expertise in React, Next.js, and UI libraries",
        "Implemented responsive and accessible design patterns",
      ],
    },
    {
      period: "2022 - 2023",
      title: "Learning & Development",
      company: "Self-Directed Study",
      location: "Peru",
      description:
        "Started my journey into web development with focused daily practice. I began with the basics of HTML and CSS, gradually moving into JavaScript, React, and backend fundamentals — all while developing small but meaningful applications.",
      highlights: [
        "Completed 500+ hours of self-paced coding practice",
        "Built and deployed my first full web applications",
        "Formed consistent study and project routines",
      ],
    },
  ];


  return (
    <section id="experience" className="mb-16">
      <header className="mb-8">
        <span
          className={`inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap border-transparent bg-neutral-800 text-neutral-200 mb-4 transition-all duration-700 `}
        >
          <span className="mr-1">✦</span>
          Knowledge
        </span>

        <h2
          className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 transition-all duration-700 `}
        >
          Experience
        </h2>
        <p className="text-base md:text-lg  text-neutral-400">My professional journey and key milestones in software development</p>
      </header>

      <div
        className={`space-y-8 transition-all duration-1000`}
      >
        {experiences.map((exp, index) => (
          <article key={index} className="relative pl-8 border-l-2 border-neutral-800 last:border-l-0">
            {/* Timeline dot */}
            <div className="absolute -left-2 top-0 w-4 h-4 bg-white rounded-full border-4 border-neutral-950" />

            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <h3 className="text-xl font-semibold text-white">{exp.title}</h3>
                <div className="flex items-center gap-2 text-sm text-neutral-400">
                  <Calendar className="h-4 w-4" />
                  <span>{exp.period}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-neutral-400">
                <span className="font-medium">{exp.company}</span>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{exp.location}</span>
                </div>
              </div>

              <p className="text-base text-neutral-300 leading-relaxed">{exp.description}</p>

              <ul className="space-y-1">
                {exp.highlights.map((highlight, idx) => (
                  <li key={idx} className="text-sm text-neutral-400 flex items-start gap-2">
                    <span className="text-white mt-1.5 block w-1 h-1 bg-white rounded-full flex-shrink-0" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
