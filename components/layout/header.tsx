"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, User, Layout } from "lucide-react"
import { cn } from "@/lib/utils"

export function Header() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/"
    }
    return pathname?.startsWith(path)
  }

  return (
    <header className="fixed sm:top-0 bottom-0 sm:bottom-auto left-0 right-0 z-50 flex justify-center p-4 sm:p-4">
      <nav className="flex items-center rounded-full bg-neutral-950/60 border border-neutral-700/50 gap-1 p-1.5 sm:p-1 backdrop-blur-md shadow-2xl">
        <Link
          href="/"
          className={cn(
            "flex items-center justify-center rounded-full px-4 py-3 sm:px-3 sm:py-2 text-neutral-300 transition-all duration-200 border",
            isActive("/")
              ? "bg-neutral-900/70 text-white border-neutral-50/20 shadow-lg"
              : "hover:bg-neutral-800/50 hover:text-white border-transparent hover:border-neutral-50/20",
          )}
        >
          <Home size={16} className="sm:size-3.5" />
        </Link>

        <div className="mx-1.5 sm:mx-1 h-6 w-px bg-neutral-700/50" />

        <Link
          href="/about"
          className={cn(
            "flex items-center gap-2 sm:gap-1.5 rounded-full px-4 py-3 sm:px-3 sm:py-2 text-neutral-300 transition-all duration-200 border",
            isActive("/about")
              ? "bg-neutral-900/70 text-white border-neutral-50/20 shadow-lg"
              : "hover:bg-neutral-800/50 hover:text-white border-transparent hover:border-neutral-50/20",
          )}
        >
          <User size={16} className="sm:size-3.5" />
          <span className="text-sm sm:text-xs font-medium hidden sm:inline">About</span>
        </Link>

        <Link
          href="/work"
          className={cn(
            "flex items-center gap-2 sm:gap-1.5 rounded-full px-4 py-3 sm:px-3 sm:py-2 text-neutral-300 transition-all duration-200 border",
            isActive("/work")
              ? "bg-neutral-900/70 text-white border-neutral-50/20 shadow-lg"
              : "hover:bg-neutral-800/50 hover:text-white border-transparent hover:border-neutral-50/20",
          )}
        >
          <Layout size={16} className="sm:size-3.5" />
          <span className="text-sm sm:text-xs font-medium hidden sm:inline">Work</span>
        </Link>
      </nav>
    </header>
  )
}
