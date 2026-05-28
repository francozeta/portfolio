import { getProjects } from "@/lib/projects"
import { projectToMarkdown, writingToMarkdown } from "@/lib/content-text"
import { absoluteUrl, siteConfig } from "@/lib/site"
import { getWritings } from "@/lib/writings"

export const dynamic = "force-static"

export async function GET() {
  const writings = getWritings()
  const projects = await getProjects()

  const content = [
    `# ${siteConfig.name} portfolio context`,
    "",
    siteConfig.description,
    "",
    `Canonical site: ${siteConfig.url}`,
    `Location: ${siteConfig.location}`,
    `GitHub: ${siteConfig.social.github}`,
    `LinkedIn: ${siteConfig.social.linkedin}`,
    `X: ${siteConfig.social.x}`,
    "",
    "## Priority URLs",
    "",
    `- ${absoluteUrl("/writing")}`,
    `- ${absoluteUrl("/work/kocteau")}`,
    `- ${absoluteUrl("/work/stepper")}`,
    "",
    "## Writing",
    "",
    ...writings.map((writing) => writingToMarkdown(writing)),
    "",
    "## Work",
    "",
    ...projects.map((project) => projectToMarkdown(project)),
  ].join("\n\n")

  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  })
}
