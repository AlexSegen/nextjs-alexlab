# Track de Refactorización — nextjs-alexlab

Seguimiento del progreso de [REFACTOR-PLAN.md](REFACTOR-PLAN.md). Cada fase se documenta aquí al completarse.

---

## Fase 0 — Limpieza de código muerto y fixes rápidos ✅

**Estado**: Completada
**Build**: `yarn build` OK (export estático generado en `out/`)

### Cambios realizados
- Eliminados `pages/toastme.jsx` y `pages/toastmejs.module.scss`.
- Eliminado `components/home/features.jsx` y la línea de import comentada en [pages/index.jsx](pages/index.jsx).
- Eliminadas `getProjects` y `getRepos` de [services/api.jsx](services/api.jsx); solo queda `sendMessage`.
- Eliminadas dependencias no usadas de `package.json`: `toastmejs`, `prismjs`, `react-on-screen`, `react-wow`.
- Eliminado `package-lock.json` (yarn como gestor primario, lockfile regenerado por `yarn install`).
- Corregido `autoplay="true"` → `autoPlay` en [components/home/hero.jsx:11](components/home/hero.jsx).
- Pendiente (anotado, se resuelve en Fase 3): enlaces rotos `/portfolio/details/${project.id}` en `latest-works.jsx` y `components/project/index.jsx` — se resolverán con la nueva ruta `app/portfolio/[catslug]/[id]/page.tsx`.

### Notas para próximas fases
- `package-lock.json` ya no existe; usar siempre `yarn`.
- El proyecto sigue en Pages Router/.jsx — sin cambios estructurales aún.

---

---

## Fase 1 — Tooling: TypeScript + ESLint + Prettier ✅

**Estado**: Completada
**Build**: `yarn build` OK (incluye lint, sin errores; solo warnings `no-img-element` pendientes de Fase 5)

### Cambios realizados
- Agregadas devDependencies: `typescript`, `@types/node`, `@types/react@^18.3.31`, `@types/react-dom@^18.3.7` (fijadas a la línea 18.x para coincidir con React 18 en runtime).
- Creado [tsconfig.json](tsconfig.json) con `strict: true`, `allowJs: true`, alias `@/*` → raíz (Next generó `next-env.d.ts` automáticamente).
- ESLint: agregadas `eslint`, `eslint-config-next`, `eslint-config-prettier`. Creado [eslint.config.mjs](eslint.config.mjs) con flat config (`eslint-config-next` + `eslint-config-prettier`).
  - **Nota de versión**: `eslint-config-next@16.2.9` requiere `eslint >= 9`; se fijó `eslint@^9` (la última `^10` instalada por defecto rompía el scope manager — `scopeManager.addGlobals is not a function`).
  - `.eslintrc.json` legacy no se usa — Next 15.5 + ESLint 9 requieren flat config (`next lint` solo soporta legacy via shim, que también fallaba con opciones obsoletas; con flat config + eslint@9 funciona correctamente).
- Prettier: agregadas `prettier`, `eslint-config-prettier`. Creado [.prettierrc](.prettierrc) (sin punto y coma, comillas simples, 2 espacios, trailing commas) — siguiendo el estilo dominante del repo.
- Creado [.editorconfig](.editorconfig) básico (UTF-8, LF, 2 espacios, indentación, trim trailing whitespace).
- Agregados scripts a `package.json`: `"lint": "next lint"`, `"format": "prettier --write ."`.

### Fixes adicionales (requeridos para que `next build` con lint integrado pasara en verde)
`next build` ahora ejecuta ESLint y falla si hay errores (no solo warnings). Se corrigieron 5 errores reales preexistentes detectados por el linter:
- [components/shared/social-list.jsx](components/shared/social-list.jsx): prop `fill` duplicada en un `<svg>` (`fill="current"` y `fill="currentColor"`) → se eliminó el duplicado obsoleto.
- [components/home/hero.jsx](components/home/hero.jsx): apóstrofes sin escapar en texto JSX (`I'm`, `I've`) → reemplazados por `&apos;`.
- [pages/portfolio/[catslug].jsx](pages/portfolio/[catslug].jsx): patrón `setState` síncrono dentro de `useEffect` (regla `react-hooks/set-state-in-effect`) → es el filtrado client-side legacy que la Fase 3 reemplaza por `generateStaticParams`. Se agregó disable de archivo (`react-hooks/set-state-in-effect`, `react-hooks/exhaustive-deps`) con comentario explicando que se resuelve en Fase 3, en vez de adelantar esa migración.

### Pendiente / quedará para fases posteriores
- 9 warnings `@next/next/no-img-element` (uso de `<img>` nativo) — se resolverán en Fase 5 al migrar a `next/image`.

### Notas para próximas fases
- Lint ahora es parte del build (`next build` falla si hay errores de ESLint, no solo `yarn lint`). Tenerlo en cuenta al migrar componentes en Fases 3-4: cualquier error de lint nuevo bloqueará el build.
- `eslint.config.mjs` usa flat config — al añadir reglas custom, extender el array exportado.

---

---

## Fase 2 — Capa de datos y dominio tipada ✅

**Estado**: Completada
**Build**: `yarn build` OK

### Cambios realizados
- Creado [types/index.ts](types/index.ts): `Project`, `ProjectMedia`, `ExperienceEntry`, `SiteConfig`, `CareerData`, `ContactPayload`.
- Creado [data/site.ts](data/site.ts) — `siteConfig` (ex `ConfigContext.initialState`).
- Creado [data/projects.ts](data/projects.ts) — `projects: Project[]` (ex `contexts/data.jsx`).
- Creado [data/career.ts](data/career.ts) — `HARD_SKILLS`, `SOFT_SKILLS`, `TOOLS`, `EXPERIENCE` tipados (ex `contexts/data.jsx`).
- Creado [lib/validations.ts](lib/validations.ts) — migrado de Joi a **Zod** (`contactMessageSchema` + `validateMessage`).
- Creado [lib/contact-api.ts](lib/contact-api.ts) — `sendMessage` migrado desde `services/api.jsx`, URL del endpoint vía `process.env.NEXT_PUBLIC_CONTACT_API_URL` con fallback a Heroku. Incluye nota sobre el endpoint posiblemente caído (Fase 7).
- Creado [.env.example](.env.example) documentando `NEXT_PUBLIC_CONTACT_API_URL`.

### Decisión de implementación: sin shim intermedio
El plan ofrecía un "shim" temporal de `ConfigContext` para fases intermedias. Se optó por la **migración directa** de todos los consumidores en esta misma fase (en vez de Fase 3/4), evitando código transitorio:
- [components/Layout.jsx](components/Layout.jsx), [components/shared/social-list.jsx](components/shared/social-list.jsx), [components/home/latest-works.jsx](components/home/latest-works.jsx), [pages/career.jsx](pages/career.jsx), [pages/portfolio/[catslug].jsx](pages/portfolio/[catslug].jsx) — reemplazado `useContext(ConfigContext)` por imports directos de `data/site`, `data/projects`, `data/career`.
- [pages/_app.jsx](pages/_app.jsx) — eliminado `ConfigContextProvider`.
- [components/contact/ContactForm.jsx](components/contact/ContactForm.jsx) — actualizado a `lib/validations.ts` (zod `safeParse`, `result.error.issues[0].message`) y `lib/contact-api.ts`.

### Eliminado
- `contexts/` (ConfigContext.jsx, data.jsx), `services/` (api.jsx), `utils/` (validations.jsx).
- Dependencia `@hapi/joi` (reemplazada por `zod`, ya agregada en esta fase).

### Notas para próximas fases
- Todos los datos estáticos ahora se importan como módulos ES tipados (`@/data/*`, `@/types`) — listos para Server Components en Fase 3.
- `ContactForm.jsx` sigue en `.jsx`; su conversión a `.tsx` + hook (`use-contact-form.ts`) es parte de Fase 4.

---

---

## Fase 3 — Migración a App Router ✅

**Estado**: Completada
**Build**: `yarn build` OK — 8 rutas estáticas generadas en `out/` + `404.html`. Verificado con `npx serve out` (todas las rutas devuelven 200, slugs inválidos devuelven 404).

### Cambios realizados

#### Layout raíz
- Creado [app/globals.css](app/globals.css) — fusión de `styles/globals.css` + `styles/animations.css` (clases `.button`/`.button.is-primary`, animaciones `fade-in-bottom`/`fade-in-top`).
- Creado [hooks/use-scroll-position.ts](hooks/use-scroll-position.ts) — hook único con `addEventListener`/`removeEventListener` y `{ passive: true }` (corrige el leak de listeners duplicados de `Layout.jsx` + `header-alt.jsx`).
- Creado [components/layout/site-shell.tsx](components/layout/site-shell.tsx) (`"use client"`) — encapsula el padding `pt-20` condicional según scroll, usando el hook anterior.
- Creado [app/layout.tsx](app/layout.tsx) (Server Component) — `<html>`, imports de CSS globales, `metadata` (título con template, descripción) desde `data/site.ts`, JSON-LD `Person` (nombre, rol, `sameAs` con redes sociales).
- `app/layout.tsx` renderiza `<SiteShell><Header/>{children}<Footer/></SiteShell>`.
- Eliminados `pages/_app.jsx` y `components/Layout.jsx`.
- **Simplificación**: el prop `wided` de `Layout` y la rama `container mx-auto` de `<main>` eran código muerto (las 4 páginas siempre pasaban `wided={true}`) — no se migró, `<main>` ahora es simple.

#### Páginas
- [app/page.tsx](app/page.tsx) ← `pages/index.jsx` (Hero, About, LatestWorks, ContactBar).
- [app/career/page.tsx](app/career/page.tsx) ← `pages/career.jsx`, con `Skill`/`ExperienceItem` inline tipados, `export const metadata` (título "Career").
- [app/portfolio/page.tsx](app/portfolio/page.tsx) ← `pages/portfolio/index.jsx`, con metadata.
- [app/portfolio/[catslug]/page.tsx](app/portfolio/[catslug]/page.tsx) ← `pages/portfolio/[catslug].jsx`: filtrado ahora en build-time con `generateStaticParams` (`web`/`ui`) + filtrado directo de `data/projects`; slugs inválidos usan `notFound()`.
- **Nuevo** [app/portfolio/[catslug]/[id]/page.tsx](app/portfolio/[catslug]/[id]/page.tsx) — página de detalle de proyecto individual con `generateStaticParams` sobre todas las combinaciones `{catslug, id}`, `generateMetadata` con título/descripción del proyecto, breadcrumbs. **Resuelve los enlaces rotos** `/portfolio/details/${id}` → ahora `/portfolio/${catslug}/${id}` (corregido en `latest-works.jsx` y `components/project/index.jsx`).
- Creado [app/not-found.tsx](app/not-found.tsx) — 404 amigable.
- Eliminado todo `pages/`.

#### Componentes ajustados para App Router (sin renombrar/mover aún — eso es Fase 4)
- [components/shared/header-alt.jsx](components/shared/header-alt.jsx): agregado `"use client"`, reemplazado el listener de scroll local por `useScrollPosition()`.
- [components/contact/ContactForm.jsx](components/contact/ContactForm.jsx): agregado `"use client"` (usa `useState`/`useReducer`).
- [components/home/latest-works.jsx](components/home/latest-works.jsx) y [components/project/index.jsx](components/project/index.jsx): agregado `"use client"` (usan `react-slick`).

#### next.config y tipos
- `next.config.js` → [next.config.ts](next.config.ts), mantiene `output: 'export'` y `reactStrictMode: true`.
- [tailwind.config.js](tailwind.config.js): `content` ahora incluye `./app/**/*.{js,ts,jsx,tsx}`.
- Creado [types/css.d.ts](types/css.d.ts) — declaración `*.css` para imports de CSS de paquetes de terceros (`simple-line-icons`) en `app/layout.tsx`.

#### Eliminado
- `pages/`, `styles/`, `components/Layout.jsx`, `next.config.js`.

### Notas para próximas fases
- `params` en App Router (Next 15) es `Promise<{...}>` — todas las páginas dinámicas usan `async`/`await params`.
- Componentes pendientes de mover/renombrar/tipar (Fase 4): `header-alt.jsx`→`components/layout/header.tsx`, `footer.jsx`→`components/layout/footer.tsx`, `hero.jsx`, `about.jsx`, `social-list.jsx`, `ContactForm.jsx`+`ResultReducer.jsx`, `latest-works.jsx` (dividir en server+client), `project/index.jsx`→`components/portfolio/project-details.tsx`.
- Detectado código muerto adicional no listado en Fase 0: `components/shared/social-list.module.scss` no se importa desde ningún lado — eliminar en Fase 4 al convertir `social-list.jsx`.
- Warnings `<img>` siguen pendientes para Fase 5.

---

## Próxima fase

Fase 4 — Modernización de componentes (en progreso, ejecución autónoma).
