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
