import { getProjectSummaries } from "@/lib/projects"
import { absoluteUrl, siteConfig } from "@/lib/site"
import { getWritingSummaries } from "@/lib/writings"

export const dynamic = "force-static"

export async function GET() {
  const writings = getWritingSummaries()
  const projects = await getProjectSummaries()

  const content = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.description}`,
    "",
    "This file is a curated map for AI assistants and search agents. It points to the highest-signal pages on the portfolio.",
    "",
    "## Core pages",
    "",
    `- [Home](${absoluteUrl("/")}) - Portfolio homepage for Franco Zeta.`,
    `- [Writing](${absoluteUrl("/writing")}) - Essays and notes about software, product thinking, Kocteau, and interface design.`,
    `- [Work](${absoluteUrl("/work")}) - Selected projects and case studies.`,
    `- [About](${absoluteUrl("/about")}) - Background, skills, and personal context.`,
    "",
    "## Writing",
    "",
    ...writings.map((writing) => `- [${writing.title}](${absoluteUrl(`/writing/${writing.slug}`)}) - ${writing.description}`),
    "",
    "## Work",
    "",
    ...projects.map((project) => `- [${project.title}](${absoluteUrl(`/work/${project.slug}`)}) - ${project.excerpt || project.description || "Project case study by Franco Zeta."}`),
    "",
    "## Machine-readable context",
    "",
    `- [Full Markdown context](${absoluteUrl("/llms-full.txt")}) - Clean Markdown export of the most important writing and work content.`,
  ].join("\n")

  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  })
}
