import type { Metadata } from "next"
import { JsonLd } from "@/components/seo/json-ld"
import { WorkLayout } from "@/components/work/work-layout"
import { getProjectSummaries } from "@/lib/projects"
import { absoluteUrl, siteConfig } from "@/lib/site"
import { workCollectionJsonLd } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected product work by Franco Zeta, including Kocteau, a music review platform, and full-stack web case studies built with Next.js, TypeScript, Supabase, and Tailwind CSS.",
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: "Selected Work - Franco Zeta",
    description:
      "A curated index of product-shaped web projects by Franco Zeta, focused on interfaces, full-stack flows, and thoughtful systems.",
    url: absoluteUrl("/work"),
    type: "website",
    siteName: siteConfig.title,
  },
}

export default async function WorkPage() {
  const projects = await getProjectSummaries()

  return (
    <main className="relative">
      <JsonLd data={workCollectionJsonLd(projects)} />
      <WorkLayout projects={projects} />
    </main>
  )
}
