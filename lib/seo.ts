import type { ProjectSummary } from "@/lib/projects"
import type { Writing } from "@/lib/writings"
import type { Project } from "@/types/project"
import { projectToPlainText, writingToPlainText } from "@/lib/content-text"
import { absoluteUrl, siteConfig } from "@/lib/site"

const personId = `${siteConfig.url}/#franco-zeta`
const websiteId = `${siteConfig.url}/#website`

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    image: absoluteUrl("/images/profile-photo.jpg"),
    email: siteConfig.email,
    jobTitle: "Software Developer and Product Designer",
    homeLocation: {
      "@type": "Place",
      name: siteConfig.location,
    },
    sameAs: [siteConfig.social.github, siteConfig.social.linkedin, siteConfig.social.x],
    knowsLanguage: ["English", "Spanish"],
    knowsAbout: [
      "Product design",
      "Frontend engineering",
      "Next.js",
      "React",
      "TypeScript",
      "Supabase",
      "Music software",
      "Interface design",
    ],
  }
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    name: siteConfig.name,
    alternateName: siteConfig.title,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: siteConfig.language,
    author: {
      "@id": personId,
    },
  }
}

export function profilePageJsonLd() {
  const url = absoluteUrl("/about")

  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${url}#profile-page`,
    name: "About Franco Zeta",
    url,
    inLanguage: siteConfig.language,
    mainEntity: {
      "@type": "Person",
      "@id": personId,
    },
  }
}

export function writingJsonLd(writing: Writing) {
  const url = absoluteUrl(`/writing/${writing.slug}`)
  const articleBody = writingToPlainText(writing)

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    headline: writing.title,
    description: writing.description,
    datePublished: writing.date,
    dateModified: writing.updatedAt || writing.date,
    inLanguage: siteConfig.language,
    articleSection: writing.topic,
    articleBody,
    wordCount: articleBody.trim().split(/\s+/).length,
    keywords: writing.keywords,
    isAccessibleForFree: true,
    author: {
      "@id": personId,
    },
    publisher: {
      "@id": personId,
    },
    isPartOf: {
      "@id": `${absoluteUrl("/writing")}#writing`,
    },
  }
}

export function writingCollectionJsonLd(writings: Writing[]) {
  const url = absoluteUrl("/writing")

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}#writing`,
    name: "Writing by Franco Zeta",
    url,
    description: "Notes and essays by Franco Zeta about product ideas, software, taste, and interface design.",
    inLanguage: siteConfig.language,
    author: {
      "@id": personId,
    },
    hasPart: writings.map((writing, index) => ({
      "@type": "BlogPosting",
      position: index + 1,
      name: writing.title,
      headline: writing.title,
      url: absoluteUrl(`/writing/${writing.slug}`),
      datePublished: writing.date,
    })),
  }
}

export function workCollectionJsonLd(projects: ProjectSummary[]) {
  const url = absoluteUrl("/work")

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}#work`,
    name: "Selected work by Franco Zeta",
    url,
    description: "Product case studies and software projects by Franco Zeta.",
    inLanguage: siteConfig.language,
    author: {
      "@id": personId,
    },
    hasPart: projects.map((project, index) => ({
      "@type": "CreativeWork",
      position: index + 1,
      name: project.title,
      url: absoluteUrl(`/work/${project.slug}`),
      description: project.excerpt || project.description,
    })),
  }
}

export function projectJsonLd(project: Project) {
  const url = absoluteUrl(`/work/${project.slug}`)

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${url}#case-study`,
    name: project.title,
    url,
    description: project.excerpt || project.description,
    text: projectToPlainText(project),
    dateCreated: project.created_at,
    dateModified: project.updated_at,
    inLanguage: siteConfig.language,
    author: {
      "@id": personId,
    },
    creator: {
      "@id": personId,
    },
    keywords: project.technologies.map((technology) => technology.name),
    codeRepository: project.repo_url || undefined,
    workExample: project.deploy_url || undefined,
    isPartOf: {
      "@id": `${absoluteUrl("/work")}#work`,
    },
  }
}
