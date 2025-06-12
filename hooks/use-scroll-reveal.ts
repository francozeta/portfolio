"use client"

import { useEffect, useRef, useState } from "react"

interface UseScrollRevealOptions {
  threshold?: number
  delay?: number
  rootMargin?: string
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(options: UseScrollRevealOptions = {}) {
  const { threshold = 0.1, delay = 0, rootMargin = "0px 0px -50px 0px" } = options
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<T>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay)
        }
      },
      {
        threshold,
        rootMargin,
      },
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [threshold, delay, rootMargin])

  return { ref, isVisible }
}
