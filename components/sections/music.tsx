"use client"

import { memo, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { FaSpotify } from "react-icons/fa"
import { ExternalLink } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"

interface Album {
  id: string
  artist: string
  name: string
  image: string
  trackCount: number
  spotifyUrl: string
  year: string
}

const AlbumSkeleton = () => (
  <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 w-full">
    <div className="flex flex-col items-center gap-4">
      <Skeleton className="w-16 h-16 rounded-full" />
      <div className="text-center w-full">
        <Skeleton className="h-6 w-32 mx-auto mb-2" />
        <Skeleton className="h-4 w-24 mx-auto" />
      </div>
    </div>
  </div>
)

const AlbumCard = memo(({ album }: { album: Album }) => (
  <Link
    href={album.spotifyUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 hover:border-neutral-700 transition-colors block w-full"
  >
    <div className="flex flex-col items-center gap-4">
      <div className="relative group">
        <div className="w-16 h-16 bg-neutral-800 rounded-full overflow-hidden border-2 border-neutral-800 transition-colors">
          <Image
            src={album.image || "/placeholder.svg"}
            alt={`${album.artist} - ${album.name}`}
            width={64}
            height={64}
            className="w-full h-full object-cover"
            loading="lazy"
            sizes="64px"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAAcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AKAAH//Z"
          />
        </div>

        {/* External link indicator */}
        <div className="absolute -bottom-1 -right-1 bg-neutral-900 rounded-full p-1 border border-neutral-700 transition-colors">
          <ExternalLink className="w-3 h-3 text-neutral-400 transition-colors" />
        </div>
      </div>

      <div className="text-center">
        <h3 className="text-lg font-semibold text-white mb-1">{album.name}</h3>
        <div className="text-xs text-neutral-500">
          {album.artist} • {album.year} • {album.trackCount} tracks
        </div>
      </div>
    </div>
  </Link>
))

AlbumCard.displayName = "AlbumCard"

export function MusicSection() {
  // Add scroll reveal hooks
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollReveal<HTMLElement>()
  const { ref: badgeRef, isVisible: badgeVisible } = useScrollReveal<HTMLSpanElement>({ delay: 100 })
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal<HTMLHeadingElement>({ delay: 200 })
  const { ref: descRef, isVisible: descVisible } = useScrollReveal<HTMLParagraphElement>({ delay: 300 })
  const { ref: albumsRef, isVisible: albumsVisible } = useScrollReveal<HTMLDivElement>({ delay: 400 })
  const { ref: buttonRef, isVisible: buttonVisible } = useScrollReveal<HTMLDivElement>({ delay: 500 })

  const albums: Album[] = [
    {
      id: "1",
      artist: "Slowdive",
      name: "Slowdive",
      image: "https://ahmytayvpbqnwimemzqh.supabase.co/storage/v1/object/public/portfolio//slowdive-album.jpg",
      trackCount: 10,
      spotifyUrl: "https://open.spotify.com/album/1qDA0jVhj4ZTjGHmpbmmwa?si=R2iTyP9oTUWlgZwklhoDOQ",
      year: "1993",
    },
    {
      id: "2",
      artist: "Beach House",
      name: "Devotion",
      image: "https://ahmytayvpbqnwimemzqh.supabase.co/storage/v1/object/public/portfolio//devotion-album.jpg",
      trackCount: 11,
      spotifyUrl: "https://open.spotify.com/album/6Unw8A3kdy8ZPj6MmlbA7E",
      year: "2008",
    },
    {
      id: "3",
      artist: "Soda Stereo",
      name: "Dynamo",
      image: "https://ahmytayvpbqnwimemzqh.supabase.co/storage/v1/object/public/portfolio//dynamo-album.jpg",
      trackCount: 12,
      spotifyUrl: "https://open.spotify.com/album/4bfwXuecOmNVlPM5RStAiQ?si=z3alEjV6QWy1tWX7kI4G8Q",
      year: "1992",
    },
  ]

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section ref={sectionRef} className="bg-neutral-950 py-20 sm:py-24 lg:py-32 px-6 sm:px-12 lg:px-24 xl:px-56">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span
            ref={badgeRef}
            className={`inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit mx-auto whitespace-nowrap border-transparent bg-neutral-800 text-neutral-200 mb-4 transition-all duration-700 ${
              badgeVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="mr-1">✦</span>
            Music & Code
          </span>

          <h2
            ref={titleRef}
            className={`text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight transition-all duration-700 ${
              titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Music & Code
          </h2>
          <p
            ref={descRef}
            className={`text-lg md:text-xl text-neutral-300 max-w-3xl mx-auto transition-all duration-700 ${
              descVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Music is the <span className="text-white font-medium">soundtrack to my creativity</span>. These albums have
            been my companions through countless coding sessions.
          </p>
        </div>

        <div
          ref={albumsRef}
          className={`grid grid-cols-1 lg:grid-cols-3 gap-4 mb-16 transition-all duration-1000 ${
            albumsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {loading ? (
            <>
              <AlbumSkeleton />
              <AlbumSkeleton />
              <AlbumSkeleton />
            </>
          ) : (
            albums.map((album) => <AlbumCard key={album.id} album={album} />)
          )}
        </div>

        <div
          ref={buttonRef}
          className={`text-center transition-all duration-700 ${
            buttonVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Button
            className="bg-white text-black hover:bg-neutral-200 transition-all duration-200 w-full sm:w-auto rounded-full h-auto mb-1 sm:mb-0"
            aria-label="Follow Franco Zeta on Spotify"
            asChild
          >
            <a
              href="https://open.spotify.com/user/31hft7h6lrrnh23tavv674ykmqfe"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaSpotify className="w-4 h-4 mr-2" aria-hidden="true" />
              Follow on Spotify
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
