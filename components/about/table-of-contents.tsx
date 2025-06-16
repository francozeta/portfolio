"use client"

import { useState, useEffect, useCallback } from "react"
import { cn } from "@/lib/utils"

interface TocItem {
  id: string
  title: string
  level: number
}

interface TableOfContentsProps {
  className?: string
}

export function TableOfContents({ className }: TableOfContentsProps) {
  const [activeSection, setActiveSection] = useState<string>("")
  const [tocItems, setTocItems] = useState<TocItem[]>([])

  // Define the sections we want to track
  const sections = [
    { id: "journey", title: "My Journey" },
    { id: "skills", title: "Skills & Expertise" },
    { id: "experience", title: "Experience" },
    { id: "values", title: "Values & Principles" },
  ]

  useEffect(() => {
    setTocItems(sections.map((section) => ({ ...section, level: 1 })))
  }, [])

  // Smooth scroll to section without changing URL
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerOffset = 100 // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }, [])

  // Track active section using Intersection Observer
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px", // Trigger when section is in the middle third of viewport
      threshold: 0,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // Observe all sections
    sections.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  if (tocItems.length === 0) return null

  return (
    <div className={cn("hidden xl:block", className)}>
      <div className="fixed top-1/2 right-6 -translate-y-1/2 z-40">
        <nav className="flex flex-col gap-3">
          {tocItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300 hover:scale-150",
                activeSection === item.id ? "bg-white scale-125" : "bg-neutral-600 hover:bg-neutral-400",
              )}
              title={item.title}
              aria-label={`Navigate to ${item.title}`}
            />
          ))}
        </nav>
      </div>
    </div>
  )
}
