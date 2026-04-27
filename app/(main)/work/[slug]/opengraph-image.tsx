import { ImageResponse } from "next/og"
import { getProjectBySlug, getProjectSummaries } from "@/lib/projects"

export const alt = "Project case study by Franco Zeta"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

interface ProjectImageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const projects = await getProjectSummaries()

  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export default async function Image({ params }: ProjectImageProps) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          color: "#fafafa",
          padding: 64,
          fontFamily: "Geist, Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#737373",
            fontSize: 26,
          }}
        >
          <span>Case study</span>
          <span>francozeta</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 76, fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1 }}>
            {project?.title || "Project"}
          </div>
          <div style={{ maxWidth: 820, color: "#a3a3a3", fontSize: 32, lineHeight: 1.3 }}>
            {project?.excerpt || project?.description || "Product-shaped web interface and case notes."}
          </div>
        </div>
      </div>
    ),
    size,
  )
}
