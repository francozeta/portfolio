import type React from "react"
import type { Metadata } from "next"
import { Geist } from 'next/font/google'
import { siteConfig } from "@/lib/site"
import "../globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: "Admin Paused | Franco Zeta",
  description: "The Supabase CMS is paused while the portfolio uses local content.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.className} antialiased text-white bg-neutral-950`}>
        {children}
      </body>
    </html>
  )
}
