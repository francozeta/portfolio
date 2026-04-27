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
    <header className="fixed bottom-0 left-0 right-0 z-50 flex justify-center px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-4 sm:bottom-auto sm:top-0 sm:p-4">
      <nav
        className="flex items-center rounded-full bg-neutral-950/60 border border-neutral-700/50 gap-1 p-1.5 sm:p-1 backdrop-blur-md"
        role="navigation"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className={cn(
            "flex items-center justify-center rounded-full border px-4 py-3 text-neutral-300 transition-[background-color,border-color,color,transform] duration-150 ease-out sm:px-3 sm:py-2 active:scale-[0.96]",
            isActive("/")
              ? "bg-neutral-900/70 text-white border-neutral-50/20"
              : "hover:bg-neutral-800/50 hover:text-white border-transparent hover:border-neutral-50/20",
          )}
          aria-label="Home page"
          aria-current={isActive("/") ? "page" : undefined}
        >
          <Home size={16} className="sm:size-3.5" aria-hidden="true" />
          <span className="sr-only">Home</span>
        </Link>

        <div className="mx-1.5 sm:mx-1 h-6 w-px bg-neutral-700/50" aria-hidden="true" />

        <Link
          href="/about"
          className={cn(
            "flex items-center gap-2 rounded-full border px-4 py-3 text-neutral-300 transition-[background-color,border-color,color,transform] duration-150 ease-out sm:gap-1.5 sm:px-3 sm:py-2 active:scale-[0.96]",
            isActive("/about")
              ? "bg-neutral-900/70 text-white border-neutral-50/20"
              : "hover:bg-neutral-800/50 hover:text-white border-transparent hover:border-neutral-50/20",
          )}
          aria-label="About page"
          aria-current={isActive("/about") ? "page" : undefined}
        >
          <User size={16} className="sm:size-3.5" aria-hidden="true" />
          <span className="text-sm sm:text-xs font-medium hidden sm:inline">About</span>
        </Link>

        <Link
          href="/work"
          className={cn(
            "flex items-center gap-2 rounded-full border px-4 py-3 text-neutral-300 transition-[background-color,border-color,color,transform] duration-150 ease-out sm:gap-1.5 sm:px-3 sm:py-2 active:scale-[0.96]",
            isActive("/work")
              ? "bg-neutral-900/70 text-white border-neutral-50/20"
              : "hover:bg-neutral-800/50 hover:text-white border-transparent hover:border-neutral-50/20",
          )}
          aria-label="Work and projects page"
          aria-current={isActive("/work") ? "page" : undefined}
        >
          <Layout size={16} className="sm:size-3.5" aria-hidden="true" />
          <span className="text-sm sm:text-xs font-medium hidden sm:inline">Work</span>
        </Link>
      </nav>
    </header>
  )
}
