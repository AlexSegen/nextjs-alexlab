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

---

## Fase 4 — Modernización de componentes ✅

**Estado**: Completada (ejecución autónoma)
**Build**: `yarn build` OK — 11 rutas estáticas generadas en `out/`. Verificado con `npx serve out` (rutas válidas → 200, `/portfolio/zzz` → 404).

### Cambios realizados

#### Iconos extraídos a `components/ui/icons/`
- [react-logo.tsx](components/ui/icons/react-logo.tsx), [vue-logo.tsx](components/ui/icons/vue-logo.tsx), [angular-logo.tsx](components/ui/icons/angular-logo.tsx) — extraídos de `hero.jsx`.
- [check-icon.tsx](components/ui/icons/check-icon.tsx) — extraído de `components/project/index.jsx`, reutilizado también en `components/career/skill-badge.tsx`.
- [github-icon.tsx](components/ui/icons/github-icon.tsx), [linkedin-icon.tsx](components/ui/icons/linkedin-icon.tsx), [twitter-icon.tsx](components/ui/icons/twitter-icon.tsx) — extraídos de `social-list.jsx`.

#### Componente `Button`
- Creado [components/ui/button.tsx](components/ui/button.tsx): variantes `default`/`primary` (mapean a `.button`/`.button.is-primary` de `globals.css`), soporta `as="link"` (renderiza `next/link`, incluye `target` para links externos) o `as="button"` (HTML nativo). Reemplaza los usos repetidos de `className="button is-primary ..."` en `hero.tsx`, `contact-bar.tsx`, `project-card.tsx` y `project-details.tsx`.

#### Layout
- [components/shared/header-alt.jsx](components/shared/header-alt.jsx) → [components/layout/header.tsx](components/layout/header.tsx) — tipado, sin cambios de comportamiento (sigue usando `useScrollPosition` y Headless UI `Menu`).
- [components/shared/footer.jsx](components/shared/footer.jsx) → [components/layout/footer.tsx](components/layout/footer.tsx) — tipado, imports actualizados a rutas `@/`.
- [app/layout.tsx](app/layout.tsx) actualizado para importar `Header`/`Footer` desde `components/layout/`.

#### Home
- [components/home/hero.jsx](components/home/hero.jsx) → [components/home/hero.tsx](components/home/hero.tsx) — SVGs de React/Vue/Angular extraídos a iconos, botones migrados a `<Button>`.
- [components/home/about.jsx](components/home/about.jsx) → [components/home/about.tsx](components/home/about.tsx) — `SkillItem` tipado.
- [components/home/latest-works.jsx](components/home/latest-works.jsx) dividido en:
  - [components/home/latest-works.tsx](components/home/latest-works.tsx) — Server Component (sección + título), recibe `projects` desde `data/projects` y renderiza el carrusel.
  - [components/portfolio/project-carousel.tsx](components/portfolio/project-carousel.tsx) — `"use client"`, encapsula `react-slick`.
  - [components/portfolio/project-card.tsx](components/portfolio/project-card.tsx) — ex `Slide`, tipado con `Project`, usa `<Button>`.

#### Shared
- [components/shared/social-list.jsx](components/shared/social-list.jsx) → [components/shared/social-list.tsx](components/shared/social-list.tsx) — usa los iconos extraídos; eliminado `social-list.module.scss` (código muerto detectado en Fase 3).
- [components/shared/contact-bar.jsx](components/shared/contact-bar.jsx) → [components/shared/contact-bar.tsx](components/shared/contact-bar.tsx) — props tipadas (`btnText`, `contentText`, `contentSubText?`, `isDark?`), botón migrado a `<Button variant="primary">`.

#### Contacto
- `ContactForm.jsx` + `ResultReducer.jsx` → [components/contact/contact-form.tsx](components/contact/contact-form.tsx) (presentación) + [components/contact/use-contact-form.ts](components/contact/use-contact-form.ts) (hook `useContactForm`, encapsula estado, validación con `lib/validations.ts` y envío con `lib/contact-api.ts`). `resultReducer` ahora tipado (`ResultState`/`ResultAction`).

#### Portfolio
- `components/project/index.jsx` → [components/portfolio/project-details.tsx](components/portfolio/project-details.tsx) — tipado con `Project`, `CheckIcon` extraído, botones migrados a `<Button>`. Referenciado desde `app/portfolio/[catslug]/page.tsx` y `app/portfolio/[catslug]/[id]/page.tsx`.

#### Career
- `Skill`/`ExperienceItem` (inline en `app/career/page.tsx` desde Fase 3) extraídos a [components/career/skill-badge.tsx](components/career/skill-badge.tsx) y [components/career/experience-item.tsx](components/career/experience-item.tsx) (tipado con `ExperienceEntry`).

#### Config
- [tailwind.config.js](tailwind.config.js): eliminado el glob `./pages/**/*.{js,ts,jsx,tsx}` (obsoleto desde Fase 3, `pages/` ya no existe).

### Fix adicional
- **`@types/react-slick` traía anidado `@types/react@19`**, incompatible con `@types/react@18` del proyecto (error `'Slider' cannot be used as a JSX component`). Se agregó `"resolutions": { "@types/react-slick/@types/react": "^18.3.31" }` en `package.json` para forzar la versión correcta.

### Decisión: sin reemplazo de librerías opcionales
El plan sugería (de forma "recomendada, no bloqueante") reemplazar `react-slick`/`slick-carousel` por `embla-carousel-react` y `simple-line-icons` por `@heroicons/react`. Se decidió **no realizar estos reemplazos**: son cambios de UI/dependencias de mayor riesgo visual sin posibilidad de verificación manual en este flujo autónomo, y el plan los marca explícitamente como no bloqueantes. Quedan documentados aquí como posible mejora futura.

### Eliminado
- Todo `components/project/`, `components/shared/header-alt.jsx`, `components/shared/footer.jsx`, `components/shared/social-list.jsx`, `components/shared/social-list.module.scss`, `components/shared/contact-bar.jsx`, `components/home/hero.jsx`, `components/home/about.jsx`, `components/home/latest-works.jsx`, `components/contact/ContactForm.jsx`, `components/contact/ResultReducer.jsx`.

### Notas para próximas fases
- Todos los componentes activos ahora son `.tsx` tipados. No quedan `.jsx` en `components/`.
- Pendiente Fase 5: warnings `@next/next/no-img-element` en `about.tsx`, `project-card.tsx`, `project-details.tsx`, `contact-bar.tsx`, `app/career/page.tsx`, `app/portfolio/page.tsx`, `app/portfolio/[catslug]/page.tsx`.

---

---

## Fase 5 — Imágenes y performance ✅

**Estado**: Completada (ejecución autónoma)
**Build**: `yarn build` OK — sin warnings `@next/next/no-img-element`. Verificado con `npx serve out` (rutas `/`, `/career`, `/portfolio`, `/portfolio/web/3` → 200, imágenes `/img/tech/*.png` servidas correctamente con `data-nimg`).

### Cambios realizados
- [next.config.ts](next.config.ts): agregado `images: { unoptimized: true }` (requerido para `output: 'export'`, S3/CloudFront no ejecuta el optimizador de Next).
- Reemplazados todos los `<img>` por `next/image`, con `width`/`height` según las dimensiones reales de cada asset:
  - [components/home/about.tsx](components/home/about.tsx) — logos de `SkillItem` (150×150).
  - [components/portfolio/project-card.tsx](components/portfolio/project-card.tsx) — `project.media.img` (2620×1535), 2 instancias.
  - [components/portfolio/project-details.tsx](components/portfolio/project-details.tsx) — fotos del carrusel (2620×1535).
  - [components/shared/contact-bar.tsx](components/shared/contact-bar.tsx) — `collage.jpg` (1920×480), agregado `h-auto` junto a `w-full` para mantener el aspect ratio.
  - [app/career/page.tsx](app/career/page.tsx), [app/portfolio/page.tsx](app/portfolio/page.tsx), [app/portfolio/[catslug]/page.tsx](app/portfolio/[catslug]/page.tsx) — `coding_workspace.jpg` (1000×473), agregado `h-auto`.
- El `<video>` del Hero no requiere cambios (no es `<img>`, fuera del alcance de `next/image`); no se asignó `priority` porque no hay imagen above-the-fold migrada en esa sección.

### Notas para próximas fases
- Con `images.unoptimized: true`, `next/image` actúa principalmente como wrapper semántico (sin optimización en build) — necesario para mantener compatibilidad con el export estático a S3/CloudFront.

---

---

## Fase 6 — SEO y metadata ✅

**Estado**: Completada (ejecución autónoma)
**Build**: `yarn build` OK — 13 rutas estáticas generadas en `out/`, incluyendo `sitemap.xml` y `robots.txt`.

### Cambios realizados
- [app/layout.tsx](app/layout.tsx): `metadata` ampliado con `metadataBase: new URL('https://avivas.dev')`, `openGraph` (type, url, siteName, title, description, images: `/img/bg-hero2.jpg`) y `twitter` (`summary_large_image`). El JSON-LD `Person` ya existía desde la Fase 3.
- Descripciones específicas agregadas a `export const metadata` / `generateMetadata`:
  - [app/career/page.tsx](app/career/page.tsx) — "Professional experience, skills and tools of Alejandro Vivas, Frontend Developer."
  - [app/portfolio/page.tsx](app/portfolio/page.tsx) — "Web and UI design projects by Alejandro Vivas, Frontend Developer."
  - [app/portfolio/[catslug]/page.tsx](app/portfolio/[catslug]/page.tsx) — descripción dinámica por categoría.
  - `app/portfolio/[catslug]/[id]/page.tsx` ya tenía título/descripción por proyecto desde la Fase 3.
- Creado [app/sitemap.ts](app/sitemap.ts) (`export const dynamic = 'force-static'`, requerido para `output: 'export'`) — incluye `/`, `/career`, `/portfolio`, `/portfolio/web`, `/portfolio/ui` y todas las rutas de detalle de proyecto (`/portfolio/{catslug}/{id}`) generadas desde `data/projects`.
- Creado [app/robots.ts](app/robots.ts) (`export const dynamic = 'force-static'`) — permite todo el rastreo y referencia `https://avivas.dev/sitemap.xml`.
- Imagen Open Graph: se reutilizó el asset existente `/img/bg-hero2.jpg` (1920×1080) en vez de crear un nuevo `og-image.jpg`.

### Notas para próximas fases
- `sitemap.ts`/`robots.ts` requieren `export const dynamic = 'force-static'` en `output: 'export'`; sin esto el build falla (`Error: export const dynamic = "force-static"... not configured`).

---

---

## Fase 7 — Formulario de contacto: issue conocido ✅

**Estado**: Completada (ejecución autónoma)
**Build**: `yarn build` OK.

### Cambios realizados
- [CLAUDE.md](CLAUDE.md): nueva sección "Known issues" documentando que el endpoint de contacto (`https://pixelagil.herokuapp.com/api`, fallback en `lib/contact-api.ts`) probablemente está caído (Heroku eliminó dynos free en nov-2022) y que el formulario de contacto puede no estar enviando mensajes actualmente. Incluye la recomendación de reemplazo vía AWS Lambda + Function URL (SES/Resend) o un servicio de formularios de terceros (Web3Forms, Formspree).
- La parametrización vía `NEXT_PUBLIC_CONTACT_API_URL` y el comentario en [lib/contact-api.ts](lib/contact-api.ts) ya se habían realizado en la Fase 2; esta fase solo agrega la documentación faltante en `CLAUDE.md`.

### Notas para próximas fases
- La implementación del reemplazo del backend de contacto (Lambda/SES o servicio de terceros) queda fuera del alcance de este refactor de arquitectura, según lo definido en el plan.

---

---

## Fase 8 — Limpieza final y verificación ✅

**Estado**: Completada (ejecución autónoma)
**Build**: `yarn lint` (0 warnings/errores) y `yarn build` OK — 13 rutas estáticas en `out/`.

### Verificaciones realizadas
- `pages/`, `contexts/`, `services/`, `utils/`, `styles/` no existen (eliminados en fases previas).
- Sin referencias a `ConfigContext` ni `@hapi/joi` en el código fuente.
- `react-slick` sigue presente de forma intencional (ver decisión de Fase 4: no se reemplazó por `embla-carousel-react`), usado solo en `components/portfolio/project-carousel.tsx` y `project-details.tsx`.
- `npx serve out` — verificación manual de todas las rutas:
  - `/`, `/career`, `/portfolio`, `/portfolio/web`, `/portfolio/ui`, `/portfolio/web/3`, `/portfolio/ui/1`, `/portfolio/ui/2` → 200
  - `/portfolio/zzz` → 404
  - `/sitemap.xml`, `/robots.txt` → 200
  - Enlaces "Project details" en `/portfolio/web` apuntan correctamente a `/portfolio/web/3` (sin rutas rotas `/portfolio/details/*`).

### Cambios realizados
- [CLAUDE.md](CLAUDE.md): reescrito por completo para reflejar la arquitectura post-refactor — App Router, TypeScript estricto, nuevas carpetas `data/`, `lib/`, `hooks/`, `types/`, estructura de `components/`, `next.config.ts` (`images.unoptimized`, `output: 'export'`), comandos (`yarn lint`, `yarn format`), notas de Next 15 (`params` async, `sitemap.ts`/`robots.ts` con `dynamic = 'force-static'`) y la sección "Known issues" del formulario de contacto.

---

## Refactorización completada ✅

Todas las fases (0–8) del [REFACTOR-PLAN.md](REFACTOR-PLAN.md) fueron ejecutadas. El proyecto es ahora Next.js 15 App Router + TypeScript estricto, manteniendo `output: 'export'` y compatibilidad total con `yarn deploy` (S3 + CloudFront), sin cambios de diseño visual.

### Pendientes documentados (fuera de alcance del refactor de arquitectura)
- Reemplazo opcional de `react-slick`/`slick-carousel` por `embla-carousel-react` (Fase 4, recomendado no bloqueante).
- Reemplazo opcional de `simple-line-icons` por `@heroicons/react` para los iconos del formulario de contacto (Fase 4, recomendado no bloqueante).
- Backend del formulario de contacto (endpoint Heroku probablemente caído) — ver "Known issues" en `CLAUDE.md` (Fase 7).
