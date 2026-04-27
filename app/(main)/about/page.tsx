import type { Metadata } from "next"
import { AboutLayout } from "@/components/about/about-layout"

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Franco Zeta, a junior web developer from Peru building Kocteau, a music review platform with Next.js, TypeScript, Supabase, and Tailwind CSS.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Franco Zeta - Web Developer building Kocteau",
    description:
      "Junior web developer from Peru building product-shaped web interfaces, full-stack flows, and Kocteau, a music review platform in production.",
  },
}

export default function AboutPage() {
  return (
    <main className="relative">
      <AboutLayout />
    </main>
  )
}
