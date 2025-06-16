import type { Metadata } from "next"
import { WorkLayout } from "@/components/work/work-layout"

export const metadata: Metadata = {
  title: "Work",
  description:
    "Explore Franco Zeta's portfolio of web development projects. From e-commerce platforms to analytics dashboards, discover the technologies and solutions behind each project.",
  openGraph: {
    title: "Work & Projects - Franco Zeta's Portfolio",
    description:
      "Explore Franco Zeta's portfolio of web development projects. From e-commerce platforms to analytics dashboards, discover the technologies and solutions behind each project.",
  },
}

export default function WorkPage() {
  return (
    <main className="relative">
      <WorkLayout />
    </main>
  )
}
