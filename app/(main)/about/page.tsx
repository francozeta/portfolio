import type { Metadata } from "next"
import { AboutLayout } from "@/components/about/about-layout"

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Franco Zeta - Software Developer, Systems Engineer & Designer from Peru. Discover my journey, skills, and passion for creating innovative web applications.",
  openGraph: {
    title: "About Franco Zeta - Software Developer & Designer",
    description:
      "Learn more about Franco Zeta - Software Developer, Systems Engineer & Designer from Peru. Discover my journey, skills, and passion for creating innovative web applications.",
  },
}

export default function AboutPage() {
  return (
    <main className="relative">
      <AboutLayout />
    </main>
  )
}
