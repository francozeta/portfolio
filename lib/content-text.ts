import type { Writing, WritingBlock, WritingInline } from "@/lib/writings"
import type { ContentBlock, InlineContent, Project } from "@/types/project"
import { absoluteUrl } from "@/lib/site"

function markdownLink(text: string, href: string) {
  return `[${text}](${href})`
}

export function writingInlineToText(content: WritingInline[]) {
  return content.map((part) => (typeof part === "string" ? part : part.text)).join("")
}

export function writingInlineToMarkdown(content: WritingInline[]) {
  return content.map((part) => (typeof part === "string" ? part : markdownLink(part.text, part.href))).join("")
}

export function writingToPlainText(writing: Writing) {
  return writing.blocks.map((block) => writingBlockToText(block)).filter(Boolean).join("\n\n")
}

export function writingToMarkdown(writing: Writing) {
  const blocks = writing.blocks.map((block) => writingBlockToMarkdown(block)).filter(Boolean)

  return [
    `# ${writing.title}`,
    "",
    writing.description,
    "",
    `Published: ${writing.date}`,
    `Topic: ${writing.topic}`,
    `Reading time: ${writing.readingTime}`,
    "",
    ...blocks,
  ].join("\n")
}

function writingBlockToText(block: WritingBlock) {
  if (block.type === "image") {
    return block.caption || block.alt
  }

  return writingInlineToText(block.content)
}

function writingBlockToMarkdown(block: WritingBlock) {
  if (block.type === "quote") {
    return `> ${writingInlineToMarkdown(block.content)}${block.author ? `\n>\n> - ${block.author}` : ""}`
  }

  if (block.type === "image") {
    const caption = block.caption ? `\n\n${block.caption}` : ""
    return `![${block.alt}](${absoluteUrl(block.src)})${caption}`
  }

  return writingInlineToMarkdown(block.content)
}

export function projectToPlainText(project: Project) {
  return project.content.map((block) => projectBlockToText(block)).filter(Boolean).join("\n\n")
}

export function projectToMarkdown(project: Project) {
  const blocks = project.content.map((block) => projectBlockToMarkdown(block)).filter(Boolean)

  return [
    `# ${project.title}`,
    "",
    project.excerpt || project.description || "",
    "",
    `Status: ${project.status === "completed" ? "Completed" : "In progress"}`,
    `Stack: ${project.technologies.map((tech) => tech.name).join(", ")}`,
    project.deploy_url ? `Live: ${project.deploy_url}` : "",
    project.repo_url ? `Source: ${project.repo_url}` : "",
    "",
    ...blocks,
  ]
    .filter((line) => line !== "")
    .join("\n")
}

function inlineContentToText(content: string | InlineContent[]) {
  if (typeof content === "string") {
    return content
  }

  return content.map((part) => (typeof part === "string" ? part : part.text)).join("")
}

function inlineContentToMarkdown(content: string | InlineContent[]) {
  if (typeof content === "string") {
    return content
  }

  return content.map((part) => (typeof part === "string" ? part : markdownLink(part.text, part.href))).join("")
}

function projectBlockToText(block: ContentBlock): string {
  switch (block.type) {
    case "heading":
    case "paragraph":
    case "quote":
    case "code":
      return inlineContentToText(block.content)
    case "list":
      return block.content.join("\n")
    case "link":
      return `${block.content.title}. ${block.content.description || block.content.url}`
    case "image":
      return block.content.caption || block.content.alt
    case "process":
      return block.content.map((item) => `${item.title}: ${item.description}`).join("\n")
    case "product-surfaces":
      return [block.content.title, block.content.description, ...block.content.items.map((item) => `${item.title}: ${item.description}`)].join("\n")
    case "architecture":
      return [block.content.title, block.content.description || "", ...block.content.nodes.map((node) => `${node.title}: ${node.description}`)]
        .filter(Boolean)
        .join("\n")
    case "decisions":
      return block.content.map((item) => `${item.title}: ${item.decision}`).join("\n")
    case "metrics":
      return [block.content.title, block.content.description, ...block.content.items.map((item) => `${item.label}: ${item.value}. ${item.description}`)].join("\n")
    case "divider":
      return ""
  }
}

function projectBlockToMarkdown(block: ContentBlock): string {
  switch (block.type) {
    case "heading":
      return `${"#".repeat(Math.min(block.level + 1, 6))} ${block.content}`
    case "paragraph":
      return inlineContentToMarkdown(block.content)
    case "quote":
      return `> ${block.content}${block.author ? `\n>\n> - ${block.author}` : ""}`
    case "list":
      return block.content.map((item, index) => (block.listType === "numbered" ? `${index + 1}. ${item}` : `- ${item}`)).join("\n")
    case "link":
      return `- ${markdownLink(block.content.title, block.content.url)}${block.content.description ? `: ${block.content.description}` : ""}`
    case "image": {
      const caption = block.content.caption ? `\n\n${block.content.caption}` : ""
      return `![${block.content.alt}](${absoluteUrl(block.content.url)})${caption}`
    }
    case "code":
      return `\`\`\`${block.language || ""}${block.filename ? ` ${block.filename}` : ""}\n${block.content}\n\`\`\``
    case "process":
      return ["### Product flow", ...block.content.map((item) => `- **${item.title}:** ${item.description}`)].join("\n")
    case "product-surfaces":
      return [`### ${block.content.title}`, block.content.description, ...block.content.items.map((item) => `- **${item.title}:** ${item.description}`)].join("\n")
    case "architecture":
      return [
        `### ${block.content.title}`,
        block.content.description || "",
        ...block.content.nodes.map((node) => `- **${node.title}:** ${node.description} (${node.items.join(", ")})`),
      ]
        .filter(Boolean)
        .join("\n")
    case "decisions":
      return ["### Technical decisions", ...block.content.map((item) => `- **${item.title}:** ${item.decision} Tradeoff: ${item.tradeoff}`)].join("\n")
    case "metrics":
      return [`### ${block.content.title}`, block.content.description, ...block.content.items.map((item) => `- **${item.label}:** ${item.value}. ${item.description}`)].join("\n")
    case "divider":
      return ""
  }
}
