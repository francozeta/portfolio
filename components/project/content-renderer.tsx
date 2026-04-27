import Image from "next/image"
import Link from "next/link"
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

function ParagraphRenderer({ content }: { content: string }) {
  return <p className="mb-5 text-sm leading-7 text-neutral-400 text-pretty sm:text-[15px]">{content}</p>
}

function HeadingRenderer({ content, level }: { content: string; level: number }) {
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
}

function ImageRenderer({
  content,
}: {
  content: { url: string; alt: string; caption?: string; width?: number; height?: number }
}) {
  return (
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
  )
}

function CodeRenderer({ content, language, filename }: { content: string; language?: string; filename?: string }) {
  return (
    <div className="my-8 overflow-hidden rounded-[18px] shadow-[0_0_0_1px_rgba(255,255,255,0.08)]">
      {filename && (
        <div className="border-b border-white/[0.08] bg-neutral-900/70 px-4 py-2">
          <span className="font-mono text-sm text-neutral-500">{filename}</span>
        </div>
      )}
      <pre className="overflow-x-auto bg-neutral-950 px-4 py-4 text-sm leading-6 text-neutral-300">
        <code className={language ? `language-${language}` : undefined}>{content}</code>
      </pre>
    </div>
  )
}

function ListRenderer({ content, listType }: { content: string[]; listType: "bullet" | "numbered" }) {
  const Tag = listType === "numbered" ? "ol" : "ul"

  return (
    <Tag className="mb-7 divide-y divide-white/[0.08] border-y border-white/[0.08]">
      {content.map((item, index) => (
        <li key={item} className="grid gap-3 py-3.5 text-sm leading-6 text-neutral-400 text-pretty sm:grid-cols-[3rem_1fr]">
          {listType === "numbered" ? (
            <span className="text-neutral-600 tabular-nums">{String(index + 1).padStart(2, "0")}</span>
          ) : (
            <span className="mt-3 h-px w-4 bg-white/25" aria-hidden="true" />
          )}
          <span>{item}</span>
        </li>
      ))}
    </Tag>
  )
}

function QuoteRenderer({ content, author }: { content: string; author?: string }) {
  return (
    <blockquote className="my-8 rounded-[22px] bg-neutral-950 p-1 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]">
      <div className="rounded-[18px] bg-neutral-900/35 px-4 py-4">
        <Quote className="mb-4 size-4 text-neutral-500" aria-hidden="true" />
        <p className="text-sm leading-7 text-neutral-300 text-pretty sm:text-[15px]">{content}</p>
        {author && <cite className="mt-3 block text-sm text-neutral-500 not-italic">{author}</cite>}
      </div>
    </blockquote>
  )
}

function LinkRenderer({
  content,
}: {
  content: { url: string; title: string; description?: string; image?: string }
}) {
  return (
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
  )
}

function ProcessRenderer({ content }: { content: Array<{ title: string; description: string }> }) {
  return (
    <section className="my-8 rounded-[22px] bg-neutral-950 p-1 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]">
      <ol className="grid gap-px overflow-hidden rounded-[18px] bg-white/[0.08]" aria-label="Product flow">
        {content.map((item, index) => (
          <li key={item.title} className="grid gap-3 bg-neutral-950/95 px-4 py-4 sm:grid-cols-[4rem_1fr] sm:gap-5">
            <span className="text-xs uppercase tracking-[0.18em] text-neutral-600 tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="text-sm font-medium text-white text-balance">{item.title}</h3>
              <p className="mt-1 text-sm leading-6 text-neutral-400 text-pretty">{item.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

function ProductSurfacesRenderer({
  content,
}: {
  content: {
    title: string
    description: string
    items: Array<{ label: string; title: string; description: string }>
  }
}) {
  const previewRows = content.items.slice(0, 3)

  return (
    <section className="my-10">
      <div className="mb-4 grid gap-2 sm:grid-cols-[8rem_1fr]">
        <p className="text-sm font-medium text-white text-balance">{content.title}</p>
        <p className="text-sm leading-6 text-neutral-400 text-pretty">{content.description}</p>
      </div>

      <div className="rounded-[26px] bg-neutral-950 p-1 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]">
        <div className="rounded-[22px] bg-neutral-900/30 p-4 sm:p-5">
          <div className="rounded-[18px] bg-neutral-950/80 p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-neutral-900 text-xs font-medium text-neutral-500 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]">
                  K
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Track review loop</p>
                  <p className="mt-0.5 text-xs leading-5 text-neutral-500">Search, write, publish, discover</p>
                </div>
              </div>
              <span className="rounded-full bg-neutral-900 px-2.5 py-1 text-xs text-neutral-500 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]">
                live
              </span>
            </div>

            <div className="mt-5 grid gap-2">
              {previewRows.map((item) => (
                <div
                  key={item.label}
                  className="grid gap-2 rounded-[14px] bg-neutral-900/45 px-3 py-2.5 sm:grid-cols-[5.5rem_1fr]"
                >
                  <span className="text-xs uppercase tracking-[0.16em] text-neutral-600">{item.label}</span>
                  <span className="text-sm leading-6 text-neutral-300 text-pretty">{item.title}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {content.items.map((item) => (
              <article
                key={item.title}
                className="rounded-[16px] bg-neutral-950/45 px-3.5 py-3 shadow-[0_0_0_1px_rgba(255,255,255,0.07)]"
              >
                <p className="text-xs uppercase tracking-[0.16em] text-neutral-600">{item.label}</p>
                <h3 className="mt-2 text-sm font-medium text-neutral-200 text-balance">{item.title}</h3>
                <p className="mt-1 text-sm leading-6 text-neutral-500 text-pretty">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ArchitectureRenderer({
  content,
}: {
  content: {
    title: string
    description?: string
    nodes: Array<{ title: string; description: string; items: string[] }>
  }
}) {
  const [primaryNode, ...supportingNodes] = content.nodes

  return (
    <section className="my-8 rounded-[22px] bg-neutral-950 p-1 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]">
      <div className="rounded-[18px] bg-neutral-900/35 p-4 sm:p-5">
        <div className="grid gap-2 sm:grid-cols-[8rem_1fr]">
          <p className="text-sm font-medium text-white text-balance">{content.title}</p>
          {content.description && (
            <p className="text-sm leading-6 text-neutral-400 text-pretty">{content.description}</p>
          )}
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-[1.05fr_0.95fr]">
          {primaryNode && (
            <article className="rounded-[18px] bg-neutral-950/70 px-4 py-4 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]">
              <p className="text-xs uppercase tracking-[0.18em] text-neutral-600">Core</p>
              <h3 className="mt-3 text-sm font-medium text-white text-balance">{primaryNode.title}</h3>
              <p className="mt-2 text-sm leading-6 text-neutral-400 text-pretty">{primaryNode.description}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {primaryNode.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full bg-neutral-900 px-2.5 py-1 text-xs leading-5 text-neutral-400 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          )}

          <div className="space-y-2">
            {supportingNodes.map((node, index) => (
              <article
                key={node.title}
                className="rounded-[16px] bg-neutral-950/45 px-3.5 py-3 shadow-[0_0_0_1px_rgba(255,255,255,0.07)]"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-xs text-neutral-600 tabular-nums">
                    {String(index + 2).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-sm font-medium text-neutral-200 text-balance">{node.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-neutral-500 text-pretty">{node.description}</p>
                    <p className="mt-2 text-xs leading-5 text-neutral-600 text-pretty">{node.items.join(" / ")}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function DecisionsRenderer({
  content,
}: {
  content: Array<{ title: string; problem: string; decision: string; tradeoff: string }>
}) {
  return (
    <div className="my-8 divide-y divide-white/[0.08] border-y border-white/[0.08]">
      {content.map((item, index) => {
        const details = [
          { label: "Problem", value: item.problem },
          { label: "Decision", value: item.decision },
          { label: "Tradeoff", value: item.tradeoff },
        ]

        return (
          <article key={item.title} className="grid gap-3 py-5 sm:grid-cols-[4rem_1fr] sm:gap-5">
            <span className="text-sm text-neutral-600 tabular-nums">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h3 className="text-sm font-medium text-white text-balance">{item.title}</h3>
              <dl className="mt-4 grid gap-3">
                {details.map((detail) => (
                  <div key={detail.label} className="grid gap-1 sm:grid-cols-[5.5rem_1fr]">
                    <dt className="text-xs uppercase tracking-[0.16em] text-neutral-600">{detail.label}</dt>
                    <dd className="text-sm leading-6 text-neutral-400 text-pretty">{detail.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </article>
        )
      })}
    </div>
  )
}

function DividerRenderer() {
  return <hr className="my-10 border-white/[0.08]" />
}

function BlockRenderer({ block }: { block: ContentBlock }) {
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
    case "process":
      return <ProcessRenderer content={block.content} />
    case "product-surfaces":
      return <ProductSurfacesRenderer content={block.content} />
    case "architecture":
      return <ArchitectureRenderer content={block.content} />
    case "decisions":
      return <DecisionsRenderer content={block.content} />
    case "divider":
      return <DividerRenderer />
    default:
      return null
  }
}

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
