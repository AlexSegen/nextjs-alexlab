# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev          # Start dev server at localhost:3000
yarn build        # Production build (generates static export in out/)
yarn start        # Start production server
yarn deploy       # Build + sync to S3 + invalidate CloudFront cache
```

No linting or test scripts are configured.

Use `yarn` as the package manager (both `yarn.lock` and `package-lock.json` exist, but yarn is primary).

Node.js version is pinned to **20** via `.nvmrc`.

## Architecture

This is a Next.js 15 personal portfolio site (Alejandro Vivas - Frontend Developer) using React 18, Tailwind CSS v3, and SCSS modules. No TypeScript — all files are `.jsx`.

### Data & State

**`contexts/ConfigContext.jsx`** is the central data store, wrapping the entire app via `pages/_app.jsx`. It provides:
- Site metadata (title, description, social links)
- `projects` — imported from `contexts/data.jsx` (static project data)
- `career` — `{ hardSkills, softSkills, tools, experience }` from `contexts/data.jsx`

All pages and components access shared data via `useContext(ConfigContext)`.

**`contexts/data.jsx`** — static arrays: `HARD_SKILLS`, `SOFT_SKILLS`, `TOOLS`, `EXPERIENCE`, and `projects`. Hard skills and tools are tech names (no translation needed). Soft skills and experience descriptions are localized via `career.json`.

**`services/api.jsx`** — external API calls to `https://pixelagil.herokuapp.com/api` and the GitHub API. The contact form uses `sendMessage()` from here.

### Pages

| Route | File |
|---|---|
| `/` | `pages/index.jsx` |
| `/career` | `pages/career.jsx` |
| `/portfolio` | `pages/portfolio/index.jsx` |
| `/portfolio/web` or `/portfolio/ui` | `pages/portfolio/[catslug].jsx` |

Portfolio filtering works client-side: `[catslug].jsx` reads `router.query.catslug` and filters `projects` from ConfigContext. Invalid slugs redirect to `/portfolio`.

### Component Structure

- **`components/Layout.jsx`** — root layout wrapping every page. Adds `Header` and `Footer`, manages scroll position for sticky header offset, accepts `wided` prop (skips `container mx-auto` on `<main>` when true).
- **`components/shared/`** — `header-alt.jsx`, `footer.jsx`, `contact-bar.jsx`, `social-list.jsx`, `language-switcher.jsx`
- **`components/home/`** — `hero.jsx`, `about.jsx`, `latest-works.jsx`
- **`components/contact/`** — `ContactForm.jsx` (uses `useReducer` via `ResultReducer.jsx`), validates with `@hapi/joi` via `utils/validations.jsx`
- **`components/project/index.jsx`** — `ProjectDetails` component using `react-slick` image carousel

### Styling

- **Tailwind CSS v3** — configured in `tailwind.config.js` using `content` (not `purge`) to scan `pages/` and `components/`
- **`styles/globals.css`** — defines custom utility classes: `.button` and `.button.is-primary` (gradient). Use these classes for buttons throughout the site.
- **`styles/animations.css`** — animation utilities
- **CSS Modules** — used for component-specific styles (e.g., `hero.module.scss`, `social-list.module.scss`)
- **`simple-line-icons`** — icon font used for form field icons (`icon-user`, `icon-envelope`, etc.)

### Localization (i18n)

The site supports **English (en)** and **Spanish (es)** via `react-i18next`.

**`i18n/index.js`** — initializes i18next with all translation resources bundled directly (no HTTP backend, required to avoid SSR hydration mismatches in Next.js). Always initializes with `lng: 'en'`; the saved language is restored client-side in `pages/_app.jsx` via `useEffect` reading from `localStorage`.

**Translation files** live in `public/locales/{en,es}/{namespace}.json`:

| Namespace | Content |
|---|---|
| `common` | Nav links, footer labels |
| `home` | Hero bio, about section, latest works, contact bar |
| `career` | All career page text, soft skills array, full experience objects |
| `portfolio` | Portfolio pages, project descriptions/features/categories |
| `contact` | Form placeholders, button labels, success/error messages |

**Usage pattern** — every component that renders text imports `useTranslation`:
```jsx
const { t } = useTranslation('home')
// ...
<h1>{t('hero.title')}</h1>
```

For rich text with JSX tags (e.g., `<strong>`), use the `Trans` component:
```jsx
<Trans i18nKey="about.description" ns="home">
  Text with <strong className="...">highlighted</strong> parts.
</Trans>
```

For arrays (skills, experience items): `t('soft_skills.items', { returnObjects: true })`.

**Important:** Never use `i18next-http-backend` in this project — translations must be imported statically to work with Next.js SSR. When adding a new namespace, import it in `i18n/index.js` and add it to both `en` and `es` resource objects.

**Language persistence** — `LanguageSwitcher` saves to `localStorage` key `'lang'`. `_app.jsx` reads this key on mount to restore the preference.

### Next.js 15 notes

- `next.config.js` has `reactStrictMode: true` and `output: 'export'` (static export mode).
- `<Link>` does **not** accept an `<a>` child — pass `className` and other props directly to `<Link>`.
- Build output goes to `out/` (not `.next/`). Do **not** add API routes — they are incompatible with `output: 'export'`.
- Dynamic routes must export `getStaticPaths` + `getStaticProps` for static export to work.

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
