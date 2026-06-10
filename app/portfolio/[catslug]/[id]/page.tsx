import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import { projects } from '@/data/projects'
import ProjectDetails from '@/components/portfolio/project-details'

export function generateStaticParams() {
  return projects.map((project) => ({
    catslug: project.catslug,
    id: String(project.id),
  }))
}

function findProject(catslug: string, id: string) {
  return projects.find(
    (project) => project.catslug === catslug && String(project.id) === id,
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ catslug: string; id: string }>
}): Promise<Metadata> {
  const { catslug, id } = await params
  const project = findProject(catslug, id)

  if (!project) {
    return {}
  }

  return {
    title: project.title,
    description: project.description,
  }
}

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ catslug: string; id: string }>
}) {
  const { catslug, id } = await params
  const project = findProject(catslug, id)

  if (!project) {
    notFound()
  }

  return (
    <div className="container py-5 mx-auto text-gray-400 md:py-20">
      <div className="flex items-center p-4 text-sm">
        <Link href="/" className="font-semibold text-gray-400 hover:text-gray-300">
          Home
        </Link>
        <span className="mx-2 text-gray-500">/</span>
        <Link href="/portfolio" className="font-semibold text-gray-400 hover:text-gray-300">
          Portfolio
        </Link>
        <span className="mx-2 text-gray-500">/</span>
        <Link
          href={`/portfolio/${project.catslug}`}
          className="font-semibold text-gray-400 hover:text-gray-300"
        >
          <span className="uppercase">{project.catslug} </span>Design
        </Link>
        <span className="mx-2 text-gray-500">/</span>
        <span className="font-semibold text-gray-500">{project.title}</span>
      </div>

      <div className="p-4 rounded">
        <ProjectDetails project={project} />
      </div>
    </div>
  )
}
