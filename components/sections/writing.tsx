import Link from "next/link"
import { IoDocumentText } from "react-icons/io5"
import { getWritingSummaries } from "@/lib/writings"

export function WritingSection() {
  const writings = getWritingSummaries()

  return (
    <section
      id="writing"
      className="scroll-mt-24 bg-neutral-950 px-6 pb-16 pt-10 text-neutral-200 sm:px-12 sm:pb-20 sm:pt-12 lg:px-24 xl:px-56"
      aria-labelledby="writing-heading"
    >
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center justify-between gap-4">
          <h2 id="writing-heading" className="text-base font-medium text-white text-balance">
            Writing
          </h2>
          <Link
            href="/writing"
            className="min-h-10 text-sm leading-10 text-neutral-500 transition-colors duration-150 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
          >
            All writing
          </Link>
        </div>

        <div className="mt-5 grid gap-3">
          {writings.map((writing) => (
            <Link
              key={writing.slug}
              href={`/writing/${writing.slug}`}
              className="-mx-3 grid cursor-pointer grid-cols-[4.5rem_1fr] items-center gap-4 rounded-[18px] px-3 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
            >
              <span className="grid size-16 place-items-center rounded-[14px] bg-neutral-900/70 text-neutral-300 shadow-[0_0_0_1px_rgba(255,255,255,0.08),inset_0_1px_0_rgba(255,255,255,0.04)]">
                <IoDocumentText className="size-8 opacity-80" aria-hidden="true" />
              </span>

              <span className="min-w-0">
                <span className="block text-base font-medium leading-6 text-white text-balance">
                  {writing.title}
                </span>
                <span className="mt-1 block text-sm leading-6 text-neutral-500">{writing.displayDate}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
