import type { MetadataRoute } from "next"
import { getProjectSummaries } from "@/lib/projects"

const siteUrl = "https://francozeta.vercel.app"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjectSummaries()
  const now = new Date()

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/work`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...projects.map((project) => ({
      url: `${siteUrl}/work/${project.slug}`,
      lastModified: new Date(project.updated_at),
      changeFrequency: "monthly" as const,
      priority: project.featured ? 0.8 : 0.6,
    })),
  ]
}
