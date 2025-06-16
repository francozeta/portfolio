"use client"

import { memo } from "react"
import Image from "next/image"
import Link from "next/link"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import { ExternalLink, Quote } from "lucide-react"
import type { ContentBlock } from "@/types/project"
import type { JSX } from "react"

interface ContentRendererProps {
  content: ContentBlock[]
  className?: string
}

// Helper function to generate slug from text
const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

const ParagraphRenderer = memo(({ content }: { content: string }) => (
  <p className="text-base md:text-lg text-neutral-300 leading-relaxed mb-6">{content}</p>
))

const HeadingRenderer = memo(({ content, level, id }: { content: string; level: number; id: string }) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements
  const headingId = `heading-${generateSlug(content)}`
  const sizeClasses = {
    1: "text-3xl md:text-4xl font-bold text-white mb-8",
    2: "text-2xl md:text-3xl font-bold text-white mb-6",
    3: "text-xl md:text-2xl font-semibold text-white mb-4",
    4: "text-lg md:text-xl font-semibold text-white mb-4",
    5: "text-base md:text-lg font-semibold text-white mb-3",
    6: "text-sm md:text-base font-semibold text-white mb-3",
  }

  return (
    <Tag id={headingId} className={sizeClasses[level as keyof typeof sizeClasses]}>
      {content}
    </Tag>
  )
})

const ImageRenderer = memo(
  ({ content }: { content: { url: string; alt: string; caption?: string; width?: number; height?: number } }) => (
    <figure className="mb-8">
      <div className="relative rounded-lg overflow-hidden bg-neutral-800">
        <Image
          src={content.url || "/placeholder.svg"}
          alt={content.alt}
          width={content.width || 800}
          height={content.height || 400}
          className="w-full h-auto object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
        />
      </div>
      {content.caption && (
        <figcaption className="text-sm text-neutral-400 text-center mt-3 italic">{content.caption}</figcaption>
      )}
    </figure>
  ),
)

const CodeRenderer = memo(
  ({ content, language, filename }: { content: string; language?: string; filename?: string }) => (
    <div className="mb-8">
      {filename && (
        <div className="bg-neutral-800 px-4 py-2 rounded-t-lg border-b border-neutral-700">
          <span className="text-sm text-neutral-400 font-mono">{filename}</span>
        </div>
      )}
      <SyntaxHighlighter
        language={language || "text"}
        style={oneDark}
        className={`${filename ? "rounded-t-none" : ""} rounded-lg`}
        customStyle={{
          margin: 0,
          background: "#1a1a1a",
          fontSize: "14px",
        }}
      >
        {content}
      </SyntaxHighlighter>
    </div>
  ),
)

const ListRenderer = memo(({ content, listType }: { content: string[]; listType: "bullet" | "numbered" }) => {
  const Tag = listType === "numbered" ? "ol" : "ul"
  const listClass = listType === "numbered" ? "list-decimal" : "list-disc"

  return (
    <Tag className={`${listClass} list-inside space-y-2 mb-6 text-neutral-300`}>
      {content.map((item, index) => (
        <li key={index} className="text-base md:text-lg leading-relaxed">
          {item}
        </li>
      ))}
    </Tag>
  )
})

const QuoteRenderer = memo(({ content, author }: { content: string; author?: string }) => (
  <blockquote className="border-l-4 border-white pl-6 py-4 mb-8 bg-neutral-900/50 rounded-r-lg">
    <div className="flex items-start gap-3">
      <Quote className="h-6 w-6 text-white flex-shrink-0 mt-1" />
      <div>
        <p className="text-lg text-white italic leading-relaxed mb-2">"{content}"</p>
        {author && <cite className="text-sm text-neutral-400 not-italic">— {author}</cite>}
      </div>
    </div>
  </blockquote>
))

const LinkRenderer = memo(
  ({ content }: { content: { url: string; title: string; description?: string; image?: string } }) => (
    <Link
      href={content.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block mb-8 p-4 bg-neutral-900/50 border border-neutral-800 rounded-lg hover:border-neutral-700 transition-colors group"
    >
      <div className="flex items-start gap-4">
        {content.image && (
          <div className="flex-shrink-0 w-16 h-16 bg-neutral-800 rounded-lg overflow-hidden">
            <Image
              src={content.image || "/placeholder.svg"}
              alt={content.title}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-white font-medium group-hover:text-neutral-200 transition-colors">{content.title}</h4>
            <ExternalLink className="h-4 w-4 text-neutral-400" />
          </div>
          {content.description && <p className="text-sm text-neutral-400 line-clamp-2">{content.description}</p>}
        </div>
      </div>
    </Link>
  ),
)

const DividerRenderer = memo(() => <hr className="border-neutral-800 my-12" />)

const BlockRenderer = memo(({ block }: { block: ContentBlock }) => {
  switch (block.type) {
    case "paragraph":
      return <ParagraphRenderer content={block.content} />
    case "heading":
      return <HeadingRenderer content={block.content} level={block.level} id={block.id} />
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

// Set display names for better debugging
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
    return <div className={`text-neutral-400 italic ${className}`}>No content available.</div>
  }

  return (
    <div className={`prose prose-lg prose-invert max-w-none ${className}`}>
      {content.map((block) => (
        <BlockRenderer key={block.id} block={block} />
      ))}
    </div>
  )
}
