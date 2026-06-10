# Alejandro Vivas — Frontend Developer Portfolio

Personal portfolio showcasing professional experience, selected projects, and a contact form. Built for recruiters and companies evaluating frontend development skills.

![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=flat&logo=node.js&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=flat&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v3-06B6D4?style=flat&logo=tailwindcss&logoColor=white)

## Stack

| Category | Technology |
|---|---|
| Framework | Next.js 15 (App Router, static export) |
| UI | React 18 |
| Language | TypeScript (strict mode) |
| Styles | Tailwind CSS v3, SCSS Modules, simple-line-icons |
| Components | Headless UI |
| Validation | Zod |
| Carousel | react-slick |

## Features

- **Typed data layer** — `data/` and `types/` provide typed ES modules for site config, projects, and career data (no Context API)
- **Responsive design** — mobile-first breakpoints via Tailwind CSS
- **Video background hero** — WebM/MP4 with fallback support
- **Contact form** — Zod schema validation via `lib/validations.ts` and state management via `useContactForm` hook
- **Sticky header** — animated scroll transition
- **Project carousel** — `react-slick` with autoplay
- **Static portfolio routes** — `/portfolio/[catslug]/[id]` generated at build time via `generateStaticParams`
- **SEO** — Open Graph, Twitter Card, JSON-LD, `sitemap.xml`, `robots.txt`
- **React Strict Mode** enabled

## Getting Started

```bash
# Requirements: Node.js >= 20 (see .nvmrc)

# Install dependencies
yarn

# Development server → http://localhost:3000
yarn dev

# Production build (static export to out/)
yarn build
yarn start

# Lint and format
yarn lint
yarn format
```

## Project Structure

```
├── app/               # App Router pages, layouts, sitemap, robots
│   ├── career/        # /career page
│   └── portfolio/     # /portfolio and /portfolio/[catslug]/[id]
├── components/
│   ├── layout/        # SiteShell, Header, Footer
│   ├── home/          # Hero, About, Latest Works
│   ├── portfolio/     # ProjectCarousel, ProjectCard, ProjectDetails
│   ├── career/        # SkillBadge, ExperienceItem
│   ├── contact/       # ContactForm + useContactForm hook
│   ├── shared/        # SocialList, ContactBar
│   └── ui/            # Button, icons
├── data/              # Typed site, project, and career data
├── types/             # Shared TypeScript interfaces
├── lib/               # Validation (Zod) and contact API client
└── hooks/             # Shared React hooks (e.g. useScrollPosition)
```

## Pages

| Route | Description |
|---|---|
| `/` | Home — Hero, About, and Latest Works sections |
| `/career` | Career timeline and professional experience |
| `/portfolio` | Full project portfolio grid |
| `/portfolio/:catslug` | Filtered portfolio by category (`web` or `ui`) |
| `/portfolio/:catslug/:id` | Individual project details |

## Deployment

Static export deployed to AWS S3 + CloudFront (`avivas.dev`):

```bash
yarn deploy
```

See [CLAUDE.md](./CLAUDE.md) for infrastructure details and known issues.
