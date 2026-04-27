"use client"

import { memo } from "react"
import Image from "next/image"
import Link from "next/link"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import { ArrowUpRight, Quote } from "lucide-react"
import type { ContentBlock } from "@/types/project"
import type { JSX } from "react"

interface ContentRendererProps {
  content: ContentBlock[]
  className?: string
}

const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

const ParagraphRenderer = memo(({ content }: { content: string }) => (
  <p className="mb-5 text-sm leading-7 text-neutral-400 text-pretty sm:text-[15px]">{content}</p>
))

const HeadingRenderer = memo(({ content, level }: { content: string; level: number }) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements
  const headingId = `heading-${generateSlug(content)}`
  const className =
    level <= 2
      ? "mb-4 mt-10 text-base font-medium text-white text-balance first:mt-0"
      : "mb-3 mt-8 text-sm font-medium text-white text-balance"

  return (
    <Tag id={headingId} className={className}>
      {content}
    </Tag>
  )
})

const ImageRenderer = memo(
  ({ content }: { content: { url: string; alt: string; caption?: string; width?: number; height?: number } }) => (
    <figure className="my-8">
      <div className="rounded-[22px] bg-neutral-950 p-1 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]">
        <div className="relative overflow-hidden rounded-[18px] bg-neutral-900/45 outline outline-1 -outline-offset-1 outline-white/10">
          <Image
            src={content.url || "/placeholder.svg"}
            alt={content.alt}
            width={content.width || 900}
            height={content.height || 520}
            className="h-auto w-full object-cover"
            sizes="(max-width: 768px) 100vw, 672px"
          />
        </div>
      </div>
      {content.caption && (
        <figcaption className="mt-3 text-sm leading-6 text-neutral-500 text-pretty">{content.caption}</figcaption>
      )}
    </figure>
  ),
)

const CodeRenderer = memo(
  ({ content, language, filename }: { content: string; language?: string; filename?: string }) => (
    <div className="my-8 overflow-hidden rounded-[18px] shadow-[0_0_0_1px_rgba(255,255,255,0.08)]">
      {filename && (
        <div className="border-b border-white/[0.08] bg-neutral-900/70 px-4 py-2">
          <span className="font-mono text-sm text-neutral-500">{filename}</span>
        </div>
      )}
      <SyntaxHighlighter
        language={language || "text"}
        style={oneDark}
        customStyle={{
          margin: 0,
          background: "#0f0f0f",
          fontSize: "13px",
        }}
      >
        {content}
      </SyntaxHighlighter>
    </div>
  ),
)

const ListRenderer = memo(({ content, listType }: { content: string[]; listType: "bullet" | "numbered" }) => {
  const Tag = listType === "numbered" ? "ol" : "ul"

  return (
    <Tag className="mb-6 divide-y divide-white/[0.08] border-y border-white/[0.08]">
      {content.map((item, index) => (
        <li key={item} className="grid gap-3 py-3 text-sm leading-6 text-neutral-400 text-pretty sm:grid-cols-[3rem_1fr]">
          <span className="text-neutral-600 tabular-nums">
            {listType === "numbered" ? String(index + 1).padStart(2, "0") : "/"}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </Tag>
  )
})

const QuoteRenderer = memo(({ content, author }: { content: string; author?: string }) => (
  <blockquote className="my-8 rounded-[22px] bg-neutral-950 p-1 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]">
    <div className="rounded-[18px] bg-neutral-900/35 px-4 py-4">
      <Quote className="mb-4 size-4 text-neutral-500" aria-hidden="true" />
      <p className="text-sm leading-7 text-neutral-300 text-pretty sm:text-[15px]">{content}</p>
      {author && <cite className="mt-3 block text-sm text-neutral-500 not-italic">{author}</cite>}
    </div>
  </blockquote>
))

const LinkRenderer = memo(
  ({ content }: { content: { url: string; title: string; description?: string; image?: string } }) => (
    <Link
      href={content.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group my-8 block rounded-[22px] bg-neutral-950 p-1 shadow-[0_0_0_1px_rgba(255,255,255,0.08)] transition-transform duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 active:scale-[0.96]"
    >
      <div className="rounded-[18px] bg-neutral-900/35 px-4 py-4">
        <div className="flex items-start gap-4">
          {content.image && (
            <div className="relative size-14 shrink-0 overflow-hidden rounded-[14px] bg-neutral-950 outline outline-1 -outline-offset-1 outline-white/10">
              <Image
                src={content.image || "/placeholder.svg"}
                alt=""
                fill
                className="object-cover"
                sizes="56px"
                aria-hidden="true"
              />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-medium text-white text-balance">{content.title}</h4>
              <ArrowUpRight className="size-3.5 text-neutral-500 transition-colors duration-150 group-hover:text-white" />
            </div>
            {content.description && (
              <p className="mt-1 line-clamp-2 text-sm leading-6 text-neutral-400 text-pretty">{content.description}</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  ),
)

const DividerRenderer = memo(() => <hr className="my-10 border-white/[0.08]" />)

const BlockRenderer = memo(({ block }: { block: ContentBlock }) => {
  switch (block.type) {
    case "paragraph":
      return <ParagraphRenderer content={block.content} />
    case "heading":
      return <HeadingRenderer content={block.content} level={block.level} />
    case "image":
      return <ImageRenderer content={block.content} />
    case "code":
      return <CodeRenderer content={block.content} language={block.language} filename={block.filename} />
    case "list":
      return <ListRenderer content={block.content} listType={block.listType} />
    case "quote":
      return <QuoteRenderer content={block.content} author={block.author} />
    case "link":
      return <LinkRenderer content={block.content} />
    case "divider":
      return <DividerRenderer />
    default:
      return null
  }
})

ParagraphRenderer.displayName = "ParagraphRenderer"
HeadingRenderer.displayName = "HeadingRenderer"
ImageRenderer.displayName = "ImageRenderer"
CodeRenderer.displayName = "CodeRenderer"
ListRenderer.displayName = "ListRenderer"
QuoteRenderer.displayName = "QuoteRenderer"
LinkRenderer.displayName = "LinkRenderer"
DividerRenderer.displayName = "DividerRenderer"
BlockRenderer.displayName = "BlockRenderer"

export function ContentRenderer({ content, className = "" }: ContentRendererProps) {
  if (!content || content.length === 0) {
    return <div className={`text-sm leading-6 text-neutral-500 text-pretty ${className}`}>No content available.</div>
  }

  return (
    <div className={className}>
      {content.map((block) => (
        <BlockRenderer key={block.id} block={block} />
      ))}
    </div>
  )
}
