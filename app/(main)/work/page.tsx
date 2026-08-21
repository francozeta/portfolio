import type { Metadata } from "next"
import { JsonLd } from "@/components/seo/json-ld"
import { WorkLayout } from "@/components/work/work-layout"
import { getProjectSummaries } from "@/lib/projects"
import { absoluteUrl, siteConfig } from "@/lib/site"
import { workCollectionJsonLd } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected product work by Franco Zeta, including Kocteau and full-stack case studies across product design, Next.js, TypeScript, and Supabase.",
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: "Selected Work - Franco Zeta",
    description:
      "Product design and full-stack case studies by Franco Zeta, from early decisions to clear, thoughtful interfaces.",
    url: absoluteUrl("/work"),
    type: "website",
    siteName: siteConfig.title,
  },
}

export default async function WorkPage() {
  const projects = await getProjectSummaries()

  return (
    <>
      <JsonLd data={workCollectionJsonLd(projects)} />
      <WorkLayout projects={projects} />
    </>
  )
}
