import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Quote } from "lucide-react"
import { HalftoneImage } from "@/components/writing/halftone-image"
import type { Writing, WritingBlock, WritingInline } from "@/lib/writings"

interface WritingArticleProps {
  writing: Writing
}

const actionLinkClass =
  "inline-flex min-h-10 items-center gap-1 text-sm font-medium text-neutral-400/80 transition-[color,transform] duration-150 ease-out hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 active:scale-[0.96]"

const inlineLinkClass =
  "font-medium text-neutral-100 underline decoration-neutral-500/70 underline-offset-4 transition-colors duration-150 hover:text-white hover:decoration-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"

function InlineContent({ content }: { content: WritingInline[] }) {
  return (
    <>
      {content.map((part, index) => {
        if (typeof part === "string") {
          return part
        }

        return (
          <Link
            key={`${part.href}-${index}`}
            href={part.href}
            target="_blank"
            rel="noopener noreferrer"
            className={inlineLinkClass}
          >
            {part.text}
          </Link>
        )
      })}
    </>
  )
}

function WritingBlockRenderer({ block }: { block: WritingBlock }) {
  if (block.type === "paragraph") {
    return (
      <p className="text-[15px] leading-7 text-neutral-300 text-pretty sm:text-base sm:leading-8">
        <InlineContent content={block.content} />
      </p>
    )
  }

  if (block.type === "quote") {
    return (
      <blockquote className="rounded-[18px] bg-neutral-900/35 px-4 py-4 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]">
        <Quote className="mb-4 size-4 text-neutral-500" aria-hidden="true" />
        <p className="text-[15px] leading-7 text-neutral-300 text-pretty sm:text-base sm:leading-8">
          <InlineContent content={block.content} />
        </p>
        {block.author && <cite className="mt-3 block text-sm text-neutral-400/80 not-italic">{block.author}</cite>}
      </blockquote>
    )
  }

  return (
    <figure className="my-8">
      {block.filter === "halftone-dots" ? (
        <HalftoneImage
          src={block.src}
          alt={block.alt}
          width={block.width ?? 1200}
          height={block.height ?? 720}
          variant={block.variant}
        />
      ) : (
        <div className="relative overflow-hidden rounded-[18px] bg-neutral-900/45 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]">
          <Image
            src={block.src}
            alt={block.alt}
            width={block.width ?? 1200}
            height={block.height ?? 720}
            className="h-auto w-full object-cover"
            sizes="(max-width: 768px) 100vw, 672px"
          />
        </div>
      )}
      {block.caption && (
        <figcaption className="mt-3 text-sm leading-6 text-neutral-400/80 text-pretty">{block.caption}</figcaption>
      )}
    </figure>
  )
}

export function WritingArticle({ writing }: WritingArticleProps) {
  return (
    <article className="bg-neutral-950 px-6 pb-24 pt-28 text-neutral-200 sm:px-12 sm:pb-28 sm:pt-32 lg:px-24 xl:px-56">
      <div className="mx-auto max-w-2xl">
        <Link href="/writing" className={actionLinkClass}>
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          Back to writing
        </Link>

        <header className="mt-10">
          <p className="text-sm leading-6 text-neutral-400/80">
            {writing.displayDate} / {writing.topic} / {writing.readingTime}
          </p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight text-white text-balance sm:text-4xl">
            {writing.title}
          </h1>
          <p className="mt-5 text-[15px] leading-7 text-neutral-400 text-pretty sm:text-base sm:leading-8">
            {writing.description}
          </p>
        </header>

        <div className="mt-12 space-y-5">
          {writing.blocks.map((block) => (
            <WritingBlockRenderer key={block.id} block={block} />
          ))}
        </div>
      </div>
    </article>
  )
}
