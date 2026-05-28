export type WritingInline = string | {
  text: string
  href: string
}

export type WritingBlock =
  | {
      id: string
      type: "paragraph"
      content: WritingInline[]
    }
  | {
      id: string
      type: "quote"
      content: WritingInline[]
      author?: string
    }
  | {
      id: string
      type: "image"
      src: string
      alt: string
      caption?: string
      width?: number
      height?: number
      filter?: "halftone-dots"
      variant?: "maze" | "constellation" | "overload"
    }

export interface Writing {
  slug: string
  title: string
  description: string
  date: string
  updatedAt?: string
  displayDate: string
  topic: string
  readingTime: string
  keywords: string[]
  blocks: WritingBlock[]
}

const writings = [
  {
    slug: "the-niche-as-a-new-form-of-streaming",
    title: "The Niche as a New Form of Streaming",
    description:
      "A note on why streaming's next valuable shape may be smaller, more legible, and more opinionated than the endless catalog.",
    date: "2026-05-28",
    updatedAt: "2026-05-28",
    displayDate: "May 28, 2026",
    topic: "Streaming",
    readingTime: "5 min read",
    keywords: [
      "streaming",
      "niche media",
      "content discovery",
      "curation",
      "media fragmentation",
      "Kocteau",
      "music software",
      "Franco Zeta writing",
    ],
    blocks: [
      {
        id: "abundance",
        type: "paragraph",
        content: [
          "There was a time when streaming meant abundance. Everything seemed to be there: huge catalogs, algorithms that promised to know you better than you knew yourself, and the feeling of total access. But that promise has started to wear down. The problem is no longer the lack of content. It is the excess of paths toward something that might actually matter. ",
          {
            text: "Deloitte's 2025 Digital Media Trends",
            href: "https://www.deloitte.com/us/en/insights/industry/technology/digital-media-trends-consumption-habits-survey/2025.html",
          },
          " frames the competition as a fight for roughly six daily hours of entertainment attention, split across SVOD, user-generated video, social platforms, gaming, music, podcasts, and other forms of media. There is no longer one center of consumption.",
        ],
      },
      {
        id: "infinite-feed-maze-image",
        type: "image",
        src: "/writing/the-niche-as-a-new-form-of-streaming/infinite-feed-maze.webp",
        alt: "An abstract infinite feed turning into a maze of blocks, paths, and dead ends.",
        caption: "A catalog can be full and still feel impossible to move through.",
        width: 1600,
        height: 900,
        filter: "halftone-dots",
        variant: "maze",
      },
      {
        id: "refuge",
        type: "paragraph",
        content: [
          "In that context, the niche stops feeling like the edge and starts feeling like shelter. Not because it is smaller, but because it is more legible. Less noise, more identity. Less promise of totality, more taste. ",
          {
            text: "Gracenote's 2025 State of Play",
            href: "https://gracenote.com/insights/2025-state-of-play/",
          },
          " says that one-third of streaming viewers feel the amount of services and content hurts their TV enjoyment. That is not only a platform problem. It is a design problem.",
        ],
      },
      {
        id: "discovery",
        type: "paragraph",
        content: [
          "The key is discovery. The future of streaming does not seem to live only in the infinite catalog, but in the experience of being guided through it. People do not only want access; they want orientation. They want to feel that someone thought about the path before them, without taking away their autonomy. They want an interface that does not push them to consume more, but helps them choose better.",
        ],
      },
      {
        id: "tribes",
        type: "paragraph",
        content: [
          "That tension explains why curated spaces, specific communities, and platforms with personality feel more attractive now. The media environment is no longer organized around one obvious destination. ",
          {
            text: "Pew Research Center's 2025 social media data",
            href: "https://www.pewresearch.org/internet/2026/01/22/americans-social-media-use-2025/",
          },
          " shows YouTube still leading, while Instagram, TikTok, WhatsApp, and Reddit continue to show how attention lives across different digital tribes. People do not simply move from one big room to another. They move between many smaller rooms, each with its own language.",
        ],
      },
      {
        id: "niche-constellations-image",
        type: "image",
        src: "/writing/the-niche-as-a-new-form-of-streaming/niche-constellations.webp",
        alt: "Small communities represented as separate constellations connected by thin lines.",
        caption: "The interesting part is not one huge audience, but many small rooms with their own language.",
        width: 1600,
        height: 900,
        filter: "halftone-dots",
        variant: "constellation",
      },
      {
        id: "replacement",
        type: "paragraph",
        content: [
          "The paradox is that the niche should be the opposite of the mainstream. In practice, it is starting to work as its emotional replacement. It does not replace the mainstream in volume, but it can replace it in meaning. Before, being mainstream meant being everywhere. Now, the valuable thing is often being in the right place, for the right people, with the right tone.",
        ],
      },
      {
        id: "gauge",
        type: "paragraph",
        content: [
          "Even television no longer behaves like a stable block. In May 2025, ",
          {
            text: "Nielsen's The Gauge",
            href: "https://www.nielsen.com/news-center/2025/streaming-reaches-historic-tv-milestone-eclipses-combined-broadcast-and-cable-viewing-for-first-time/",
          },
          " reported that streaming reached 44.8% of total TV usage in the United States, surpassing broadcast and cable combined for the first time. YouTube led all streaming with 12.5% of TV viewing, while free ad-supported services such as Pluto TV, The Roku Channel, and Tubi kept growing. That statistic says more than streaming is winning. It says cultural consumption is becoming distributed, personalized, and harder to summarize.",
        ],
      },
      {
        id: "trap",
        type: "paragraph",
        content: [
          "But there is an uncomfortable side to this. Falling in love with the niche can easily become a performance of superiority. It is tempting to believe that smaller automatically means smarter, purer, or more authentic. It does not. Sometimes the niche is also a way to hide from the disorder of the world. Sometimes it is just an elegant excuse to say, I am not like everyone else.",
        ],
      },
      {
        id: "layered-viewer-image",
        type: "image",
        src: "/writing/the-niche-as-a-new-form-of-streaming/layered-viewer.webp",
        alt: "A lone viewer standing before a large layered screen overloaded with content.",
        caption: "A niche can be shelter, but it can also become another way to avoid the mess.",
        width: 1600,
        height: 900,
        filter: "halftone-dots",
        variant: "overload",
      },
      {
        id: "symptom",
        type: "paragraph",
        content: [
          "That is what makes the idea interesting. The niche should not be celebrated as a perfect sanctuary. It should be read as a symptom of an age exhausted by algorithmic abundance and obsessed with appearing original. Building from the niche is not only a product decision. It is a posture toward noise.",
        ],
      },
      {
        id: "kocteau",
        type: "paragraph",
        content: [
          "That is also why projects like Kocteau make sense to me. They are not born to beat the mass market. They exist to prove that there is still room for interfaces with character, sober experiences, and platforms that treat taste as something serious. The value is not in having everything. It is in knowing exactly who the space exists for.",
        ],
      },
      {
        id: "ending",
        type: "paragraph",
        content: [
          "Maybe the most honest way to say it is this: the niche is not the new mainstream because it is bigger. It is the new mainstream because the old mainstream feels too big to inhabit. In a world where attention is scattered and discovery has become exhausting, small spaces with a clear voice begin to feel not only desirable, but necessary. Not as a trend. As a way to breathe inside the noise.",
        ],
      },
    ],
  },
  {
    slug: "the-honest-selfishness-of-an-idea",
    title: "The Honest Selfishness of an Idea",
    description:
      "A note on how Kocteau was born: from a personal need that, over time, started to feel shared.",
    date: "2026-05-27",
    updatedAt: "2026-05-27",
    displayDate: "May 27, 2026",
    topic: "Kocteau",
    readingTime: "3 min read",
    keywords: [
      "Kocteau",
      "music software",
      "product thinking",
      "software ideas",
      "music reviews",
      "curation",
      "Franco Zeta writing",
    ],
    blocks: [
      {
        id: "opening",
        type: "paragraph",
        content: [
          "I like to think that an idea does not begin by trying to please everyone. It begins as a private need, almost selfish: you build something because you are missing a place to put a feeling, a point of view, an obsession. And only later, if someone else recognizes their own problem there, the idea stops being only yours and starts becoming a community.",
        ],
      },
      {
        id: "software",
        type: "paragraph",
        content: [
          "In software, that tension appears often. ",
          {
            text: "Eric S. Raymond",
            href: "https://www.catb.org/~esr/writings/cathedral-bazaar/cathedral-bazaar/",
          },
          " defended the idea of solving your own need first; ",
          {
            text: "Paul Graham",
            href: "https://www.paulgraham.com/startupideas.html",
          },
          " insists on observing what is missing in the present and building from there. I do not say this as a comparison of scale, but as a reminder of something simple: many times, the universal enters through a small door.",
        ],
      },
      {
        id: "kocteau",
        type: "paragraph",
        content: [
          "Kocteau was born through that door. It did not want to be another review app; it wanted to be a house where a song could hold memory, taste, and human noise. Unknown or recognized music, hidden or dead, noise or whisper: anything that makes you remember something deserves a place to stay.",
        ],
      },
      {
        id: "curation",
        type: "paragraph",
        content: [
          "Curation can be good, bad, clumsy, delicate, emotional, or contradictory. The app should receive all of that without turning it into cold content. If a song moves something in you, write it down. If an image, a person, an anger, or a calm appears while listening, leave it there. Kocteau exists so that listening can feel human inside a technological interface.",
        ],
      },
    ],
  },
] satisfies Writing[]

export function getWritings() {
  return writings
}

export function getWritingSummaries() {
  return writings.map(({ blocks, ...summary }) => {
    void blocks
    return summary
  })
}

export function getWritingBySlug(slug: string) {
  return writings.find((writing) => writing.slug === slug) ?? null
}
