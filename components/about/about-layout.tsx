import Link from "next/link"

const linkClass =
  "font-medium text-neutral-50 underline decoration-neutral-500/70 underline-offset-4 transition-colors duration-150 hover:text-white hover:decoration-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"

const projectNotes = [
  {
    title: "Kocteau",
    href: "https://kocteau.com",
    description:
      "A music and reviews platform where I work through the full product shape: flow, interface, data, and the small moments between discovering a track and publishing a thought about it.",
  },
  {
    title: "Stepper",
    href: "/work/stepper",
    description:
      "An accessible multi-step primitive that explores source ownership, keyboard behavior, guarded navigation, documentation, and registry-ready distribution.",
  },
  {
    title: "Anomalyer",
    description:
      "An early idea I am still shaping. I keep it visible because not every useful project starts polished; some exist to sharpen taste before they become a finished product.",
  },
]

export function AboutLayout() {
  return (
    <section className="bg-neutral-950 px-6 pb-24 pt-28 text-neutral-200 sm:px-12 sm:pb-28 sm:pt-32 lg:px-24 xl:px-56">
      <div className="mx-auto max-w-2xl">
        <article>
          <header>
            <p className="text-sm leading-6 text-neutral-400/80">About</p>
            <h1 className="mt-2 text-2xl font-semibold leading-tight text-white text-balance sm:text-3xl">
              I turn product ideas into clear, usable interfaces.
            </h1>

            <div className="mt-8 space-y-5 text-[15px] leading-7 text-neutral-300 sm:text-base sm:leading-8">
              <p className="text-pretty">
                I&apos;m Franco Zeta, a software developer and product designer from Lima. I turn early product ideas
                into interfaces that are clear, careful, and ready for people to use.
              </p>

              <p className="text-pretty">
                Right now I&apos;m building{" "}
                <Link href="https://kocteau.com" target="_blank" rel="noopener noreferrer" className={linkClass}>
                  Kocteau
                </Link>
                , a music and reviews platform. It has become the place where I learn by doing real product work:
                shaping flows, refining the interface, connecting data, and making the experience feel coherent from
                the first visit to a published review.
              </p>

              <p className="text-pretty">
                Before and alongside that, I&apos;ve been exploring projects like Stepper and Anomalyer. They help me
                keep refining my judgment between design, frontend, and product without forcing every idea to sound
                finished before it is.
              </p>

              <p className="text-pretty">
                I like building with intention: not only making something work, but making it feel considered.
              </p>
            </div>
          </header>

          <section className="mt-14 space-y-10" aria-labelledby="about-work-heading">
            <h2 id="about-work-heading" className="text-base font-medium text-white text-balance">
              What I&apos;m working on
            </h2>

            <div className="space-y-8">
              {projectNotes.map((project) => (
                <section key={project.title} aria-labelledby={`${project.title.toLowerCase()}-heading`}>
                  <h3 id={`${project.title.toLowerCase()}-heading`} className="text-sm font-medium text-white">
                    {project.href ? (
                      <Link
                        href={project.href}
                        target={project.href.startsWith("http") ? "_blank" : undefined}
                        rel={project.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className={linkClass}
                      >
                        {project.title}
                      </Link>
                    ) : (
                      project.title
                    )}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-neutral-400 text-pretty">{project.description}</p>
                </section>
              ))}
            </div>
          </section>

          <section className="mt-14" aria-labelledby="about-focus-heading">
            <h2 id="about-focus-heading" className="text-base font-medium text-white text-balance">
              What I care about
            </h2>

            <p className="mt-3 text-sm leading-6 text-neutral-400 text-pretty">
              I care about rough product ideas becoming understandable web flows, interfaces that feel calm and
              readable, and systems where frontend, data, and product behavior stay connected. I prefer small, honest
              improvements over pretending every pass is final.
            </p>
          </section>

          <section className="mt-14" aria-labelledby="about-currently-heading">
            <h2 id="about-currently-heading" className="text-base font-medium text-white text-balance">
              Currently
            </h2>

            <p className="mt-3 text-sm leading-6 text-neutral-400 text-pretty">
              I&apos;m available for selected freelance product work, design engineering collaborations, and frontend
              builds where the interface and product logic both matter. You can reach me on{" "}
              <Link
                href="https://www.linkedin.com/in/franco-zeta-496330267"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                LinkedIn
              </Link>
              , via{" "}
              <Link href="mailto:francozeta2011@gmail.com" className={linkClass}>
                email
              </Link>
              , or see my code on{" "}
              <Link href="https://github.com/francozeta" target="_blank" rel="noopener noreferrer" className={linkClass}>
                GitHub
              </Link>
              .
            </p>
          </section>
        </article>
      </div>
    </section>
  )
}
