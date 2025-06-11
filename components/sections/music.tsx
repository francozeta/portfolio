"use client"

import { useState, memo } from "react"
import { Play, Pause, ExternalLink, Disc } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Album {
  id: string
  artist: string
  name: string
  description: string
  image: string
  trackCount: number
  spotifyUrl: string
  embedId: string
}

// Memoize the album component
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
    <div className="group bg-neutral-900/50 border border-neutral-700 rounded-2xl p-6 hover:bg-neutral-900/70 transition-all duration-300">
      <div className="flex items-start gap-4">
        {/* Album Cover */}
        <div className="relative flex-shrink-0">
          <div className="w-20 h-20 bg-neutral-800 rounded-lg overflow-hidden">
            <img
              src={album.image || "/placeholder.svg"}
              alt={`${album.artist} - ${album.name}`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Play Button Overlay */}
          <button
            onClick={() => onTogglePlay(album.id)}
            className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            {isPlaying ? <Pause className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 text-white ml-1" />}
          </button>
        </div>

        {/* Album Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-lg font-semibold text-white group-hover:text-neutral-200 transition-colors">
                {album.name}
              </h3>
              <p className="text-sm text-neutral-400">{album.artist}</p>
            </div>
            <a
              href={album.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-neutral-400 hover:text-white transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <p className="text-neutral-300 text-sm mb-3 line-clamp-2">{album.description}</p>

          <div className="flex items-center gap-4 text-xs text-neutral-400">
            <span className="flex items-center gap-1">
              <Disc className="w-3 h-3" />
              {album.trackCount} tracks
            </span>
            <span>Spotify</span>
          </div>
        </div>
      </div>

      {/* Lazy load Spotify embed */}
      {isPlaying && (
        <div className="mt-4 pt-4 border-t border-neutral-700">
          <iframe
            src={`https://open.spotify.com/embed/album/${album.embedId}?utm_source=generator&theme=0`}
            width="100%"
            height="352"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-lg"
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
    <section className="bg-black py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">Music & Code</h2>

              <div className="space-y-6 text-lg text-neutral-300 leading-relaxed">
                <p>
                  Music is the <span className="text-white font-medium">soundtrack to my creativity</span>. Whether I'm
                  deep in code, designing interfaces, or brainstorming new ideas, the right album sets the perfect mood.
                </p>

                <p>
                  These albums have been my companions through countless coding sessions. From{" "}
                  <span className="text-white font-medium">ambient soundscapes</span> to{" "}
                  <span className="text-white font-medium">experimental textures</span>, each one brings something
                  unique to the creative process.
                </p>

                <p>
                  Feel free to explore and discover some new sounds. Who knows? You might find your next favorite coding
                  companion.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-neutral-700">
              <div>
                <div className="text-3xl font-bold text-white mb-1">{albums.length}</div>
                <div className="text-sm text-neutral-400 uppercase tracking-wide">Albums</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">
                  {albums.reduce((total, album) => total + album.trackCount, 0)}
                </div>
                <div className="text-sm text-neutral-400 uppercase tracking-wide">Total Tracks</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">∞</div>
                <div className="text-sm text-neutral-400 uppercase tracking-wide">Hours Listened</div>
              </div>
            </div>
          </div>

          {/* Right Column - Albums */}
          <div className="space-y-6">
            {albums.map((album) => (
              <AlbumCard
                key={album.id}
                album={album}
                isPlaying={currentlyPlaying === album.id}
                onTogglePlay={togglePlay}
              />
            ))}

            {/* Follow on Spotify */}
            <div className="text-center pt-4">
              <Button
                variant="outline"
                className="border-white text-neutral-950 hover:bg-white hover:text-black transition-all duration-200"
                asChild
              >
                <a
                  href="https://open.spotify.com/user/31hft7h6lrrnh23tavv674ykmqfe"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Follow on Spotify
                </a>
              </Button>
            </div>
          </div>
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
