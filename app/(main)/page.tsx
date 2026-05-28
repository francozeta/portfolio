import { FeaturedProjects } from "@/components/sections/featured-projects"
import { HeroSection } from "@/components/sections/hero"
import { WritingSection } from "@/components/sections/writing"
import { absoluteUrl, siteConfig } from "@/lib/site"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Home | Franco Zeta's Portfolio",
  description:
    "Portfolio of Franco Zeta, a Lima-based software design student building Kocteau, Stepper, Anomalyer, and product-shaped web interfaces.",
  openGraph: {
    title: "Home | Franco Zeta's Portfolio",
    description:
      "Portfolio of Franco Zeta, focused on Kocteau, Stepper, Anomalyer, and product-shaped web interfaces.",
    url: absoluteUrl("/"),
    type: "website",
    siteName: siteConfig.title,
  },
}

export default function Home() {
  return (
    <main className="relative">
      <HeroSection />
      <FeaturedProjects />
      <WritingSection />
    </main>
  )
}
