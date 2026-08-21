import { FeaturedProjects } from "@/components/sections/featured-projects"
import { HeroSection } from "@/components/sections/hero"
import { WritingSection } from "@/components/sections/writing"
import { absoluteUrl, siteConfig } from "@/lib/site"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    absolute: siteConfig.title,
  },
  description:
    "Software developer and product designer in Lima building Kocteau and helping teams turn early product ideas into clear, thoughtful web interfaces.",
  openGraph: {
    title: siteConfig.title,
    description:
      "Software developer and product designer building Kocteau and thoughtful web interfaces from Lima, Peru.",
    url: absoluteUrl("/"),
    type: "website",
    siteName: siteConfig.title,
  },
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedProjects />
      <WritingSection />
    </>
  )
}
