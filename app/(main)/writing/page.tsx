import type { Metadata } from "next"
import { JsonLd } from "@/components/seo/json-ld"
import { WritingIndex } from "@/components/writing/writing-index"
import { absoluteUrl, siteConfig } from "@/lib/site"
import { writingCollectionJsonLd } from "@/lib/seo"
import { getWritings } from "@/lib/writings"

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Essays and notes by Franco Zeta about software, product ideas, Kocteau, music curation, interface design, and building thoughtful web products.",
  alternates: {
    canonical: "/writing",
  },
  keywords: [
    "Franco Zeta writing",
    "Kocteau",
    "software essays",
    "product thinking",
    "music software",
    "interface design",
  ],
  openGraph: {
    title: "Writing - Franco Zeta",
    description:
      "Essays and notes by Franco Zeta about software, product ideas, Kocteau, music curation, and interface design.",
    url: absoluteUrl("/writing"),
    type: "website",
    siteName: siteConfig.title,
  },
  twitter: {
    card: "summary_large_image",
    title: "Writing - Franco Zeta",
    description: "Essays and notes by Franco Zeta about software, product ideas, Kocteau, and interface design.",
  },
}

export default function WritingPage() {
  const writings = getWritings()

  return (
    <>
      <JsonLd data={writingCollectionJsonLd(writings)} />
      <WritingIndex writings={writings} />
    </>
  )
}
