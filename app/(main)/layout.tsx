import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist } from "next/font/google"
import "@/app/globals.css"
import { Header } from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { JsonLd } from "@/components/seo/json-ld"
import { personJsonLd, websiteJsonLd } from "@/lib/seo"
import { siteConfig } from "@/lib/site"
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  applicationName: siteConfig.title,
  metadataBase: new URL(siteConfig.url),
  title: {
    template: "%s | Franco Zeta",
    default: siteConfig.title,
  },
  description: siteConfig.description,
  keywords: [
    "Franco Zeta",
    "Software Developer",
    "Product Designer",
    "Writing",
    "Kocteau",
    "Stepper",
    "Anomalyer",
    "Web Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Portfolio",
    "Music software",
    "Interface design",
    "Peru",
    "Lima",
    "Frontend",
  ],
  authors: [{ name: "Franco Zeta" }],
  creator: "Franco Zeta",
  alternates: {
    canonical: "/",
  },
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: "@frxnco_zeta",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

// Fixed viewport configuration for better accessibility
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5, // Allow zooming for accessibility
  userScalable: true, // Enable user scaling
  themeColor: "#0a0a0a",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.className} antialiased text-neutral-200 bg-neutral-950`}>
        <a
          href="#main-content"
          className="sr-only fixed left-4 top-4 z-[100] rounded-md bg-neutral-100 px-4 py-3 text-sm font-medium text-neutral-950 focus:not-sr-only"
        >
          Skip to content
        </a>
        <JsonLd data={[personJsonLd(), websiteJsonLd()]} />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
