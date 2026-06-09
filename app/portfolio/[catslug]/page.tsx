import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import { projects } from '@/data/projects'
import ProjectDetails from '@/components/project'

const CATEGORIES = ['web', 'ui'] as const

export function generateStaticParams() {
  return CATEGORIES.map((catslug) => ({ catslug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ catslug: string }>
}): Promise<Metadata> {
  const { catslug } = await params

  return {
    title: `${catslug.toUpperCase()} Design`,
  }
}

export default async function FilteredPortfolio({
  params,
}: {
  params: Promise<{ catslug: string }>
}) {
  const { catslug } = await params

  if (!CATEGORIES.includes(catslug as (typeof CATEGORIES)[number])) {
    notFound()
  }

  const filtered = projects.filter((project) => project.catslug === catslug)

  return (
    <>
      <div className="relative p-5 overflow-hidden text-center bg-black">
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-white">Portfolio</h1>
          <div className="flex items-center justify-center p-4 text-sm">
            <Link href="/" className="font-semibold text-gray-400 hover:text-gray-300">
              Home
            </Link>
            <span className="mx-2 text-gray-500">/</span>
            <Link href="/portfolio" className="font-semibold text-gray-400 hover:text-gray-300">
              Portfolio
            </Link>
            <span className="mx-2 text-gray-500">/</span>
            <span className="font-semibold text-gray-500">
              <span className="uppercase">{catslug} </span>Design
            </span>
          </div>
        </div>
        <img
          src="/img/coding_workspace.jpg"
          className="absolute top-0 w-full transform -translate-y-1/2 opacity-20"
          alt=""
        />
      </div>
      <div className="container py-5 mx-auto text-gray-400 md:py-20">
        <h2 className="mb-2 text-4xl font-bold text-center text-white md:mb-6 md:text-left md:text-5xl">
          <span className="text-gray-400 uppercase">{catslug}</span>Design
        </h2>

        {filtered.map((project) => (
          <div key={project.id} className="p-4 rounded">
            <ProjectDetails project={project} />
          </div>
        ))}
      </div>
    </>
  )
}
