"use client"

import { useState, useEffect, useCallback } from "react"
import { cn } from "@/lib/utils"
import type { ContentBlock } from "@/types/project"

interface TocItem {
  id: string
  title: string
  level: number
}

interface TableOfContentsProps {
  content: ContentBlock[]
  className?: string
}

// Helper function to generate slug from text
const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export function TableOfContents({ content, className }: TableOfContentsProps) {
  const [activeSection, setActiveSection] = useState<string>("")
  const [tocItems, setTocItems] = useState<TocItem[]>([])

  // Extract headings from content
  useEffect(() => {
    const headings = content
      .filter((block) => block.type === "heading")
      .map((block) => ({
        id: `heading-${generateSlug(block.content)}`,
        title: block.content,
        level: (block as any).level || 2,
      }))

    setTocItems(headings)
  }, [content])

  // Smooth scroll to section
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerOffset = 100
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
    if (tocItems.length === 0) return

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      // Find the entry that is intersecting and has the highest intersection ratio
      const intersectingEntries = entries.filter((entry) => entry.isIntersecting)

      if (intersectingEntries.length > 0) {
        // Get the entry with the highest intersection ratio (most visible)
        const mostVisible = intersectingEntries.reduce((prev, current) =>
          current.intersectionRatio > prev.intersectionRatio ? current : prev,
        )
        setActiveSection(mostVisible.target.id)
      } else {
        // If no sections are intersecting, check if we need to clear the active section
        const allIntersecting = entries.some((entry) => entry.isIntersecting)
        if (!allIntersecting) {
          // Find the closest section based on scroll position
          const scrollPosition = window.scrollY + window.innerHeight / 2
          let closestSection = ""
          let closestDistance = Number.POSITIVE_INFINITY

          tocItems.forEach(({ id }) => {
            const element = document.getElementById(id)
            if (element) {
              const elementTop = element.getBoundingClientRect().top + window.scrollY
              const distance = Math.abs(scrollPosition - elementTop)
              if (distance < closestDistance) {
                closestDistance = distance
                closestSection = id
              }
            }
          })

          if (closestSection) {
            setActiveSection(closestSection)
          }
        }
      }
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // Observe all heading elements
    tocItems.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [tocItems])

  if (tocItems.length === 0) return null

  return (
    <div className={cn("hidden xl:block", className)}>
      <div className="fixed top-1/4 right-2 -translate-y-1/2 z-40">
        <div className="bg-transparent rounded-lg p-4 min-w-[200px] max-w-[250px]">
          <h4 className="text-xs text-white mb-3">On This Page</h4>
          <nav>
            <ul className="space-y-2">
              {tocItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={cn(
                      "block text-xs transition-colors hover:text-white w-full text-left",
                      activeSection === item.id ? "text-white" : "text-neutral-400",
                      item.level === 3 && "pl-3",
                      item.level === 4 && "pl-6",
                      item.level === 5 && "pl-9",
                      item.level === 6 && "pl-12",
                    )}
                    title={item.title}
                  >
                    {item.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}
