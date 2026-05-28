import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { JsonLd } from "@/components/seo/json-ld"
import { WritingArticle } from "@/components/writing/writing-article"
import { absoluteUrl, siteConfig } from "@/lib/site"
import { writingJsonLd } from "@/lib/seo"
import { getWritingBySlug, getWritings } from "@/lib/writings"

interface WritingPageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getWritings().map((writing) => ({
    slug: writing.slug,
  }))
}

export async function generateMetadata({ params }: WritingPageProps): Promise<Metadata> {
  const { slug } = await params
  const writing = getWritingBySlug(slug)

  if (!writing) {
    return {
      title: "Writing Not Found",
      description: "The requested writing could not be found.",
    }
  }

  return {
    title: writing.title,
    description: writing.description,
    alternates: {
      canonical: `/writing/${writing.slug}`,
    },
    keywords: writing.keywords,
    openGraph: {
      title: `${writing.title} - Franco Zeta`,
      description: writing.description,
      type: "article",
      url: absoluteUrl(`/writing/${writing.slug}`),
      publishedTime: writing.date,
      modifiedTime: writing.updatedAt || writing.date,
      authors: ["Franco Zeta"],
      siteName: siteConfig.title,
    },
    twitter: {
      card: "summary_large_image",
      title: `${writing.title} - Franco Zeta`,
      description: writing.description,
    },
  }
}

export default async function WritingPage({ params }: WritingPageProps) {
  const { slug } = await params
  const writing = getWritingBySlug(slug)

  if (!writing) {
    notFound()
  }

  return (
    <>
      <JsonLd data={writingJsonLd(writing)} />
      <WritingArticle writing={writing} />
    </>
  )
}
