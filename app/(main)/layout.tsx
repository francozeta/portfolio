import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist } from "next/font/google"
import "@/app/globals.css"
import { Header } from "@/components/layout/header"
import Footer from "@/components/layout/footer"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  applicationName: "Franco Zeta Portfolio",
  metadataBase: new URL("https://francozeta.vercel.app"),
  title: {
    template: "%s | Franco Zeta's Portfolio",
    default: "Franco Zeta's Portfolio - Software Developer & Designer",
  },
  description:
    "Franco Zeta - Software Developer, Systems Engineer & Designer from Peru. Passionate about creating innovative web applications with modern technologies like React, Next.js, and TypeScript.",
  keywords: [
    "Franco Zeta",
    "Software Developer",
    "Web Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Portfolio",
    "Peru",
    "Frontend",
    "Backend",
  ],
  authors: [{ name: "Franco Zeta" }],
  creator: "Franco Zeta",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://francozeta.vercel.app",
    title: "Franco Zeta's Portfolio - Software Developer & Designer",
    description:
      "Franco Zeta - Software Developer, Systems Engineer & Designer from Peru. Passionate about creating innovative web applications.",
    siteName: "Franco Zeta's Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Franco Zeta's Portfolio - Software Developer & Designer",
    description: "Franco Zeta - Software Developer, Systems Engineer & Designer from Peru.",
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
  themeColor: "#000000",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={`${geistSans.className} antialiased text-neutral-200 bg-neutral-950`}>
        <Header />
        <main role="main">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
