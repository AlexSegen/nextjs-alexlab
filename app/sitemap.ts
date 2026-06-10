import type { MetadataRoute } from 'next'
import { projects } from '@/data/projects'

export const dynamic = 'force-static'

const SITE_URL = 'https://avivas.dev'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/career', '/portfolio', '/portfolio/web', '/portfolio/ui'].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }))

  const projectRoutes = projects.map((project) => ({
    url: `${SITE_URL}/portfolio/${project.catslug}/${project.id}`,
    lastModified: new Date(),
  }))

  return [...staticRoutes, ...projectRoutes]
}
