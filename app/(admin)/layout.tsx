import type React from "react"
import type { Metadata } from "next"
import { Geist } from 'next/font/google'
import "../globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://francozeta.vercel.app"),
  title: "Admin Paused | Franco Zeta",
  description: "The Supabase CMS is paused while the portfolio uses local content.",
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
