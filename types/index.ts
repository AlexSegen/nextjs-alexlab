export interface ProjectMedia {
  img: string
}

export interface Project {
  id: number
  title: string
  description: string
  category: string
  catslug: 'web' | 'ui'
  url?: string
  media: ProjectMedia
  photos: string[]
  tech: string[]
  features: string[]
}

export interface ExperienceEntry {
  className: string
  company: string
  period: string
  rol: string
  description: string
}

export interface SiteConfig {
  title: string
  description: string
  author: string
  twitter: string
  linkedin: string
  github: string
}

export interface CareerData {
  hardSkills: string[]
  softSkills: string[]
  tools: string[]
  experience: ExperienceEntry[]
}

export interface ContactPayload {
  name: string
  email: string
  subject: string
  content: string
}
