# Alejandro Vivas — Frontend Developer Portfolio

Personal portfolio showcasing professional experience, selected projects, and a contact form. Built for recruiters and companies evaluating frontend development skills.

![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=flat&logo=node.js&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=flat&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v3-06B6D4?style=flat&logo=tailwindcss&logoColor=white)

## Stack

| Category | Technology |
|---|---|
| Framework | Next.js 15 (Pages Router) |
| UI | React 18 |
| Styles | Tailwind CSS v3, SCSS Modules, simple-line-icons |
| Components | Headless UI |
| Validation | @hapi/joi |
| Animations | react-wow, react-on-screen |
| Carousel | react-slick |

## Features

- **Context API store** — `ConfigContext` serves as the global data layer for site metadata and project data
- **Responsive design** — mobile-first breakpoints via Tailwind CSS
- **Video background hero** — WebM/MP4 with fallback support
- **Contact form** — schema validation with `@hapi/joi` and state management via `useReducer`
- **Sticky header** — animated scroll transition
- **Project carousel** — `react-slick` with autoplay
- **Client-side portfolio filtering** — dynamic routes (`/portfolio/:catslug`) with category filtering
- **React Strict Mode** enabled

## Getting Started

```bash
# Requirements: Node.js >= 20 (see .nvmrc)

# Install dependencies
yarn

# Development server → http://localhost:3000
yarn dev

# Production build
yarn build
yarn start
```

## Project Structure

```
├── components/       # UI components (Layout, home, contact, project)
│   ├── home/         # Hero, About, Latest Works sections
│   ├── contact/      # ContactForm with validation
│   ├── project/      # ProjectDetails with image carousel
│   └── shared/       # Header, Footer, ContactBar, SocialList
├── contexts/         # ConfigContext (global store) and data.jsx (project data)
├── pages/            # Next.js pages (index, career, portfolio)
├── services/         # API calls (contact form, GitHub)
├── styles/           # globals.css, animations.css, SCSS modules
└── utils/            # Validation schemas
```

## Pages

| Route | Description |
|---|---|
| `/` | Home — Hero, About, and Latest Works sections |
| `/career` | Career timeline and professional experience |
| `/portfolio` | Full project portfolio grid |
| `/portfolio/:catslug` | Filtered portfolio by category (`web` or `ui`) |
