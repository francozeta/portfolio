import type { Metadata } from "next"
import { JsonLd } from "@/components/seo/json-ld"
import { AboutLayout } from "@/components/about/about-layout"
import { profilePageJsonLd } from "@/lib/seo"

export const metadata: Metadata = {
  title: "About",
  description:
    "About Franco Zeta, a Lima-based software developer and product designer building Kocteau and helping teams shape thoughtful web products.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Franco Zeta",
    description:
      "A Lima-based software developer and product designer building Kocteau and clear, thoughtful web interfaces.",
  },
}

export default function AboutPage() {
  return (
    <>
      <JsonLd data={profilePageJsonLd()} />
      <AboutLayout />
    </>
  )
}
