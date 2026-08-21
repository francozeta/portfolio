import Link from "next/link"
import { IoDocumentText } from "react-icons/io5"
import type { Writing } from "@/lib/writings"

interface WritingIndexProps {
  writings: Writing[]
}

export function WritingIndex({ writings }: WritingIndexProps) {
  return (
    <section className="bg-neutral-950 px-6 pb-24 pt-28 text-neutral-200 sm:px-12 sm:pb-28 sm:pt-32 lg:px-24 xl:px-56">
      <div className="mx-auto max-w-2xl">
        <header>
          <p className="text-sm leading-6 text-neutral-400/80">Writing</p>
          <h1 className="mt-2 text-2xl font-semibold leading-tight text-white text-balance sm:text-3xl">
            Notes on software, taste, and product ideas.
          </h1>
          <p className="mt-6 text-[15px] leading-7 text-neutral-400 text-pretty sm:text-base sm:leading-8">
            Short essays and product notes about the ideas behind my work, especially the thinking that shapes Kocteau
            and the way I want interfaces to feel.
          </p>
        </header>

        <div className="mt-10 divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {writings.map((writing) => (
            <Link
              key={writing.slug}
              href={`/writing/${writing.slug}`}
              className="grid cursor-pointer gap-4 py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 sm:grid-cols-[4.5rem_1fr]"
            >
              <span className="grid size-16 place-items-center rounded-[14px] bg-neutral-900/70 text-neutral-300 shadow-[0_0_0_1px_rgba(255,255,255,0.08),inset_0_1px_0_rgba(255,255,255,0.04)]">
                <IoDocumentText className="size-8 opacity-80" aria-hidden="true" />
              </span>

              <span className="min-w-0">
                <span className="block text-base font-medium leading-6 text-white text-balance">{writing.title}</span>
                <span className="mt-1 block text-sm leading-6 text-neutral-400/80">
                  {writing.displayDate} / {writing.topic} / {writing.readingTime}
                </span>
                <span className="mt-3 block text-sm leading-6 text-neutral-400 text-pretty">
                  {writing.description}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
