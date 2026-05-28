import type { Metadata } from "next"
import { AboutLayout } from "@/components/about/about-layout"

export const metadata: Metadata = {
  title: "About",
  description:
    "About Franco Zeta, a Lima-based web developer turning product ideas into clear interfaces while building Kocteau, Stepper, and Anomalyer.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Franco Zeta",
    description:
      "A Lima-based web developer building clear product interfaces through Kocteau, Stepper, and Anomalyer.",
  },
}

export default function AboutPage() {
  return (
    <main className="relative">
      <AboutLayout />
    </main>
  )
}
