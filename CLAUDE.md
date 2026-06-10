# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev          # Start dev server at localhost:3000
yarn build        # Production build (generates static export in out/, includes lint + typecheck)
yarn start        # Start production server
yarn lint         # Run ESLint (flat config, eslint.config.mjs)
yarn format       # Run Prettier (.prettierrc)
yarn deploy       # Build + sync to S3 + invalidate CloudFront cache
```

No test scripts are configured.

Use `yarn` as the package manager.

Node.js version is pinned to **20** via `.nvmrc`.

## Architecture

This is a Next.js 15 **App Router** personal portfolio site (Alejandro Vivas - Frontend Developer) using React 18, TypeScript (strict mode), Tailwind CSS v3, and SCSS modules. Static export (`output: 'export'`) for deployment to S3 + CloudFront.

### Data & types

- **`types/index.ts`** — shared interfaces: `Project`, `ProjectMedia`, `ExperienceEntry`, `SiteConfig`, `CareerData`, `ContactPayload`.
- **`data/site.ts`** — `siteConfig` (title, description, social links).
- **`data/projects.ts`** — `projects: Project[]`, the static portfolio project list. Each project has `id`, `title`, `category`, `catslug` (`'web' | 'ui'`), `description`, `tech`, `features`, `media`, `photos`, and optional `url`.
- **`data/career.ts`** — `HARD_SKILLS`, `SOFT_SKILLS`, `TOOLS`, `EXPERIENCE` for the career page.
- **`lib/validations.ts`** — Zod schema (`contactMessageSchema`) and `validateMessage()` for the contact form.
- **`lib/contact-api.ts`** — `sendMessage()`, posts to `NEXT_PUBLIC_CONTACT_API_URL` (see Known issues below).

All data is imported directly as typed ES modules — there is no Context API / global provider.

### Pages (App Router)

| Route | File |
|---|---|
| `/` | `app/page.tsx` |
| `/career` | `app/career/page.tsx` |
| `/portfolio` | `app/portfolio/page.tsx` |
| `/portfolio/web` or `/portfolio/ui` | `app/portfolio/[catslug]/page.tsx` |
| `/portfolio/<catslug>/<id>` | `app/portfolio/[catslug]/[id]/page.tsx` |
| 404 | `app/not-found.tsx` |
| `sitemap.xml` | `app/sitemap.ts` |
| `robots.txt` | `app/robots.ts` |

Dynamic routes use `generateStaticParams` (build-time) + `notFound()` for invalid params. In Next 15, `params` is a `Promise` — pages and `generateMetadata` are `async` and `await params`.

### Component Structure

- **`app/layout.tsx`** — root layout (Server Component): global `metadata` (title template, description, Open Graph, Twitter card, `metadataBase`), JSON-LD `Person` schema, imports global CSS, renders `<SiteShell><Header/><main>{children}</main><Footer/></SiteShell>`.
- **`components/layout/`** — `site-shell.tsx` (`"use client"`, applies scroll-based padding via `hooks/use-scroll-position.ts`), `header.tsx`, `footer.tsx`.
- **`components/home/`** — `hero.tsx`, `about.tsx`, `latest-works.tsx` (Server Component, renders `ProjectCarousel`).
- **`components/portfolio/`** — `project-carousel.tsx` (`"use client"`, `react-slick`), `project-card.tsx`, `project-details.tsx` (`"use client"`, `react-slick` photo carousel).
- **`components/career/`** — `skill-badge.tsx`, `experience-item.tsx`.
- **`components/contact/`** — `contact-form.tsx` + `use-contact-form.ts` hook (state, validation via `lib/validations.ts`, submission via `lib/contact-api.ts`).
- **`components/shared/`** — `social-list.tsx`, `contact-bar.tsx`.
- **`components/ui/`** — `button.tsx` (variants `default`/`primary`, `as="link"|"button"`) and `ui/icons/*.tsx` (extracted inline SVGs).
- **`hooks/use-scroll-position.ts`** — scroll position hook used by `SiteShell` and `Header`.

### Styling

- **Tailwind CSS v3** — configured in `tailwind.config.js`, `content` scans `app/**` and `components/**`.
- **`app/globals.css`** — Tailwind directives, custom utility classes `.button` and `.button.is-primary` (gradient, used by `components/ui/button.tsx`), and `fade-in-bottom`/`fade-in-top` animations.
- **CSS Modules** — used for component-specific styles (e.g., `components/home/hero.module.scss`).
- **`simple-line-icons`** — icon font used for contact form field icons (`icon-user`, `icon-envelope`).

### Next.js 15 notes

- `next.config.ts` has `reactStrictMode: true`, `output: 'export'`, and `images: { unoptimized: true }` (required for static export — S3/CloudFront does not run the Next image optimizer).
- `<Link>` does **not** accept an `<a>` child — pass `className` and other props directly to `<Link>`.
- Build output goes to `out/` (not `.next/`). Do **not** add API routes — they are incompatible with `output: 'export'`.
- `app/sitemap.ts` and `app/robots.ts` require `export const dynamic = 'force-static'` to work with static export.
- All images use `next/image` with explicit `width`/`height` (no optimization at build time due to `unoptimized: true`).

---

## Infrastructure (AWS)

The site is deployed to **https://avivas.dev** via S3 + CloudFront.

### AWS Resources

| Resource | ID / Value |
|---|---|
| S3 Bucket | `avivas.dev` (us-east-1, private) |
| CloudFront Distribution | `<CF_DISTRIBUTION_ID>` → `<CF_DOMAIN>.cloudfront.net` |
| CloudFront OAC | `<CF_OAC_ID>` |
| ACM Certificate | `arn:aws:acm:us-east-1:<AWS_ACCOUNT_ID>:certificate/<CERT_ID>` |
| Route53 Hosted Zone | `<HOSTED_ZONE_ID>` (avivas.dev) |
| AWS Profile | `default` |

### Deploy flow

```bash
yarn deploy
# 1. yarn build  → generates out/ with static HTML/CSS/JS
# 2. aws s3 sync → uploads out/ to s3://avivas.dev (deletes removed files)
# 3. cloudfront  → invalidates /* cache so changes are live immediately
```

### Adding server-side logic

API routes are not supported in static export. For server-side processing (webhooks, email, etc.), use **AWS Lambda + API Gateway** and call the endpoint directly from the frontend.

---

## Known issues

### Contact form endpoint likely down

`lib/contact-api.ts` posts to `${NEXT_PUBLIC_CONTACT_API_URL ?? 'https://pixelagil.herokuapp.com/api'}/leads/set`. The Heroku fallback host is **probably unreachable** — Heroku removed free dynos in Nov 2022 — so the contact form (`components/contact/contact-form.tsx`) likely does not deliver messages currently.

- The endpoint is configurable via `NEXT_PUBLIC_CONTACT_API_URL` (see `.env.example`).
- **Recommended fix (out of scope for the architecture refactor)**: replace the endpoint with an AWS Lambda + Function URL that forwards the payload via SES or a transactional provider (e.g. Resend), consistent with the "Adding server-side logic" guidance above. A simpler alternative is a third-party form backend (Web3Forms, Formspree) requiring no custom backend.
