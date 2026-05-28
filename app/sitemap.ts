import type { MetadataRoute } from "next"
import { getProjectSummaries } from "@/lib/projects"
import { siteConfig } from "@/lib/site"
import { getWritingSummaries } from "@/lib/writings"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjectSummaries()
  const writings = getWritingSummaries()
  const now = new Date()

  return [
    {
      url: siteConfig.url,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/work`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/writing`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    ...projects.map((project) => ({
      url: `${siteConfig.url}/work/${project.slug}`,
      lastModified: new Date(project.updated_at),
      changeFrequency: "monthly" as const,
      priority: project.featured ? 0.8 : 0.6,
    })),
    ...writings.map((writing) => ({
      url: `${siteConfig.url}/writing/${writing.slug}`,
      lastModified: new Date(writing.updatedAt || writing.date),
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ]
}
