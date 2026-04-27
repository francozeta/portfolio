import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ProjectDetail } from "@/components/work/project-detail"
import { getProjectBySlug, getProjects } from "@/lib/projects"

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const projects = await getProjects()
    return projects.map((project) => ({
      slug: project.slug,
    }))
  } catch (error) {
    console.error("Error generating static params:", error)
    return []
  }
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  try {
    const { slug } = await params
    const project = await getProjectBySlug(slug)

    if (!project) {
      return {
        title: "Project Not Found",
        description: "The requested project could not be found.",
      }
    }

    return {
      title: `${project.title}`,
      description: project.excerpt || project.description || `Learn about ${project.title}, a project by Franco Zeta.`,
      alternates: {
        canonical: `/work/${project.slug}`,
      },
      openGraph: {
        title: `${project.title} - Franco Zeta's Portfolio`,
        description:
          project.excerpt || project.description || `Learn about ${project.title}, a project by Franco Zeta.`,
      },
      twitter: {
        card: "summary_large_image",
        title: `${project.title} - Franco Zeta`,
        description:
          project.excerpt || project.description || `Learn about ${project.title}, a project by Franco Zeta.`,
      },
    }
  } catch (error) {
    console.error("Error generating metadata:", error)
    return {
      title: "Project | Franco Zeta's Portfolio",
      description: "Explore this project by Franco Zeta.",
    }
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return <ProjectDetail project={project} />
}
