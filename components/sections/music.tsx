"use client"

import { useState, memo } from "react"
import { Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { FaSpotify } from "react-icons/fa"

interface Album {
  id: string
  artist: string
  name: string
  description: string
  image: string
  trackCount: number
  spotifyUrl: string
  embedId: string
  year: string
}

// Horizontal album card for better mobile experience
const AlbumCard = memo(
  ({
    album,
    isPlaying,
    onTogglePlay,
  }: {
    album: Album
    isPlaying: boolean
    onTogglePlay: (id: string) => void
  }) => (
    <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 hover:border-neutral-700 transition-colors">
      <div className="flex items-start gap-6">
        {/* Album Cover */}
        <div className="relative flex-shrink-0">
          <div className="w-24 h-24 md:w-32 md:h-32 bg-neutral-800 rounded-xl overflow-hidden">
            <Image
              src={album.image || "/placeholder.svg"}
              alt={`${album.artist} - ${album.name}`}
              width={128}
              height={128}
              className="w-full h-full object-cover"
              loading="lazy"
              sizes="(max-width: 768px) 96px, 128px"
            />
          </div>

          {/* Play Button Overlay */}
          <button
            onClick={() => onTogglePlay(album.id)}
            className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"
            aria-label={isPlaying ? "Pause album" : "Play album"}
          >
            {isPlaying ? <Pause className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 text-white ml-0.5" />}
          </button>
        </div>

        {/* Album Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="min-w-0 flex-1">
              <h3 className="text-lg md:text-xl font-semibold text-white truncate">{album.name}</h3>
              <p className="text-sm text-neutral-400">
                {album.artist} • {album.year}
              </p>
            </div>
            <a
              href={album.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-neutral-400 hover:text-green-400 transition-colors flex-shrink-0"
              aria-label="Open in Spotify"
            >
              <FaSpotify className="w-5 h-5" />
            </a>
          </div>

          <p className="text-sm text-neutral-300 leading-relaxed mb-3 line-clamp-2">{album.description}</p>

          <div className="text-xs text-neutral-500">{album.trackCount} tracks</div>
        </div>
      </div>

      {/* Spotify Embed */}
      {isPlaying && (
        <div className="mt-6 pt-6 border-t border-neutral-800">
          <iframe
            src={`https://open.spotify.com/embed/album/${album.embedId}?utm_source=generator&theme=0`}
            width="100%"
            height="352"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-xl"
            title={`${album.artist} - ${album.name}`}
          />
        </div>
      )}
    </div>
  ),
)

AlbumCard.displayName = "AlbumCard"

export function MusicSection() {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null)

  const albums: Album[] = [
    {
      id: "1",
      artist: "Panchiko",
      name: "D>E>A>T>H>M>E>T>A>L",
      description:
        "Lo-fi textures and nostalgic vibes from an internet cult classic—perfect for introspective work sessions.",
      image: "https://ahmytayvpbqnwimemzqh.supabase.co/storage/v1/object/public/portfolio//panchiko-album.jpg",
      trackCount: 8,
      spotifyUrl: "https://open.spotify.com/intl-es/album/2MASm01cgG0a0CgioQpe6Q?si=6906KMSMTK6RtmQnZW5pPg",
      embedId: "2MASm01cgG0a0CgioQpe6Q",
      year: "2000",
    },
    {
      id: "2",
      artist: "Aphex Twin",
      name: "Selected Ambient Works 85-92",
      description: "Minimalist ambient and dreamy electronics to enhance focus, flow, and deep late-night coding.",
      image:
        "https://ahmytayvpbqnwimemzqh.supabase.co/storage/v1/object/public/portfolio//Selected_Ambient_Works_85-92.png",
      trackCount: 13,
      spotifyUrl: "https://open.spotify.com/intl-es/album/7aNclGRxTysfh6z0d8671k?si=uAFFsRf5Shyc46VMwE3cjw",
      embedId: "7aNclGRxTysfh6z0d8671k",
      year: "1992",
    },
    {
      id: "3",
      artist: "Dean Blunt",
      name: "ZUSHI",
      description:
        "Experimental, mellow, and strangely captivating — great for winding down or diving deep into creative work.",
      image: "https://ahmytayvpbqnwimemzqh.supabase.co/storage/v1/object/public/portfolio//zushi-album.jpg",
      trackCount: 11,
      spotifyUrl: "https://open.spotify.com/intl-es/album/6awMz5xtEk8XSlID98YfMv?si=G0gKt2ICSVyULfQ3NbsnOw",
      embedId: "6awMz5xtEk8XSlID98YfMv",
      year: "2023",
    },
  ]

  const togglePlay = (albumId: string) => {
    if (currentlyPlaying === albumId) {
      setCurrentlyPlaying(null)
    } else {
      setCurrentlyPlaying(albumId)
    }
  }

  return (
    <section className="bg-black py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">Music & Code</h2>
          <p className="text-lg md:text-xl text-neutral-300 max-w-3xl mx-auto">
            Music is the <span className="text-white font-medium">soundtrack to my creativity</span>. These albums have
            been my companions through countless coding sessions.
          </p>
        </div>

        {/* Albums - Horizontal Layout */}
        <div className="space-y-6 mb-16">
          {albums.map((album) => (
            <AlbumCard
              key={album.id}
              album={album}
              isPlaying={currentlyPlaying === album.id}
              onTogglePlay={togglePlay}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            variant="outline"
            className="bg-neutral-800 border-neutral-700 text-white hover:bg-white hover:text-black transition-all duration-200 rounded-full"
            asChild
          >
            <a
              href="https://open.spotify.com/user/31hft7h6lrrnh23tavv674ykmqfe"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaSpotify className="w-4 h-4 mr-2" />
              Follow on Spotify
            </a>
          </Button>
        </div>
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  )
}
