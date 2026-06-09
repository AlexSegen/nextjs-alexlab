# Plan de Refactorización — nextjs-alexlab (Portafolio Alejandro Vivas)

> **Audiencia**: este documento está escrito para ser consumido por un agente de IA que ejecutará los cambios. Cada fase es autocontenida, ordenada por dependencias, y debe terminar con `yarn build` exitoso (genera `out/` sin errores) antes de pasar a la siguiente.

## 1. Resumen ejecutivo

El sitio es un portafolio personal en **Next.js 15 (Pages Router)**, React 18, JS puro (`.jsx`), Tailwind v3 + SCSS Modules, con datos estáticos servidos vía Context API, exportado estáticamente (`output: 'export'`) y desplegado a S3 + CloudFront.

El objetivo de esta refactorización es modernizar la arquitectura a los estándares actuales de Next.js (App Router + TypeScript), eliminar deuda técnica/código muerto, simplificar el manejo de datos (que es 100% estático y no necesita Context API), y dejar una base de componentes reutilizable — **sin** introducir complejidad innecesaria para un portafolio (no CMS, no testing framework, no i18n, no monorepo).

**Restricción no negociable**: el resultado final debe seguir siendo exportable estáticamente (`output: 'export'`) y compatible con el flujo `yarn deploy` (S3 + CloudFront) descrito en `CLAUDE.md`.

---

## 2. Diagnóstico del estado actual

### Código muerto / huérfano
- `pages/toastme.jsx` + `pages/toastmejs.module.scss` — página demo de la librería `toastmejs`, no enlazada desde ningún `<nav>`. Arrastra las dependencias `toastmejs` y `prismjs`.
- `components/home/features.jsx` — importado pero comentado en `pages/index.jsx` (`// import Features...`). No se usa en ninguna página.
- `services/api.jsx` — `getProjects()` y `getRepos()` no se usan en ningún lado. Solo `sendMessage()` está en uso (vía `ContactForm`).
- `package.json` declara `react-on-screen` y `react-wow` — ninguno se importa en el código.
- `package-lock.json` y `yarn.lock` coexisten; `CLAUDE.md` indica que yarn es el gestor primario.

### Bugs / inconsistencias
- `components/home/hero.jsx`: `<video autoplay="true" ...>` — la prop correcta en JSX es `autoPlay` (booleana). Tal como está, React la ignora (atributo no reconocido).
- Enlaces rotos a `/portfolio/details/${project.id}` en `components/home/latest-works.jsx` y `components/project/index.jsx` — esa ruta **no existe** en `pages/`. Son botones "Project details" / "Details" que llevan a 404.
- `components/Layout.jsx` y `components/shared/header-alt.jsx` agregan **cada uno** un listener `scroll` en `document` sin `removeEventListener` — listeners duplicados y leak en cada remount.
- `services/api.jsx` apunta a `https://pixelagil.herokuapp.com/api` — Heroku eliminó los dynos gratuitos en nov-2022; este endpoint muy probablemente está caído, por lo que **el formulario de contacto no funciona actualmente**. URL hardcodeada, sin variable de entorno.

### Arquitectura / patrones desactualizados
- **Pages Router** en Next 15 (App Router es el estándar actual recomendado por Next.js).
- **Sin TypeScript** — sin tipado para `Project`, `ExperienceEntry`, etc.
- **`ConfigContext`** envuelve toda la app (`pages/_app.jsx`) solo para exponer datos 100% estáticos (`title`, `social links`, `projects`, `career`). No hay ningún `setState` real — es un wrapper innecesario sobre datos que podrían importarse directamente como módulos ES, lo cual además es más compatible con Server Components.
- Mezcla de estrategias de estilos: Tailwind utilities + SCSS Modules (`hero.module.scss`, `social-list.module.scss`, `toastmejs.module.scss`) + clases globales custom en `styles/globals.css`.
- Iconografía: SVGs inline gigantes embebidos directamente en JSX (`hero.jsx`, `social-list.jsx`), más la fuente de iconos `simple-line-icons` solo para 2 iconos del formulario de contacto.
- Imágenes con `<img>` nativo en vez de `next/image`.
- SEO mínimo: solo `<title>`/`<meta description>` vía `next/head`. Sin `sitemap.xml`, `robots.txt`, Open Graph, ni datos estructurados (JSON-LD), que son particularmente valiosos en un portafolio profesional.
- Sin ESLint ni Prettier configurados (`CLAUDE.md` confirma: "No linting or test scripts are configured").

---

## 3. Arquitectura objetivo

```
app/
├── layout.tsx                    # Root layout: <html>, fonts, CSS global, JSON-LD Person, SiteShell
├── page.tsx                      # "/"  (Home)
├── globals.css                   # ex styles/globals.css + animations.css
├── sitemap.ts                    # nuevo
├── robots.ts                     # nuevo
├── not-found.tsx                 # nuevo (404 amigable)
├── career/
│   └── page.tsx
└── portfolio/
    ├── page.tsx                  # "/portfolio" (selector de categorías)
    └── [catslug]/
        ├── page.tsx              # "/portfolio/web" | "/portfolio/ui"
        └── [id]/
            └── page.tsx          # "/portfolio/web/1" — detalle de proyecto (NUEVO, corrige enlaces rotos)

components/
├── layout/
│   ├── site-shell.tsx            # "use client" — maneja scroll padding (ex Layout.jsx)
│   ├── header.tsx                 # ex shared/header-alt.jsx
│   └── footer.tsx                 # ex shared/footer.jsx
├── home/
│   ├── hero.tsx
│   ├── about.tsx
│   └── latest-works.tsx           # solo el carrusel (ProjectCarousel)
├── career/
│   ├── skill-badge.tsx            # ex `Skill` inline en career.jsx
│   └── experience-item.tsx        # ex `ExperienceItem` inline en career.jsx
├── portfolio/
│   ├── project-card.tsx           # ex `Slide` en latest-works
│   ├── project-details.tsx        # ex components/project/index.jsx
│   └── project-carousel.tsx       # "use client" — carrusel (embla)
├── contact/
│   ├── contact-form.tsx           # "use client"
│   └── use-contact-form.ts        # hook (reemplaza ResultReducer)
├── shared/
│   ├── contact-bar.tsx
│   └── social-list.tsx
└── ui/
    ├── button.tsx                 # wrapper tipado de .button / .button.is-primary
    └── icons/
        ├── react-logo.tsx
        ├── vue-logo.tsx
        ├── angular-logo.tsx
        ├── check-icon.tsx
        ├── github-icon.tsx
        ├── linkedin-icon.tsx
        └── twitter-icon.tsx

data/
├── site.ts                        # title, description, social links (ex ConfigContext.initialState)
├── projects.ts                    # ex contexts/data.jsx -> projects[]
└── career.ts                      # ex contexts/data.jsx -> HARD_SKILLS, SOFT_SKILLS, TOOLS, EXPERIENCE

types/
└── index.ts                       # Project, ExperienceEntry, SiteConfig, etc.

lib/
├── validations.ts                 # zod (ex utils/validations.jsx con Joi)
└── contact-api.ts                 # sendMessage (ex services/api.jsx)

hooks/
└── use-scroll-position.ts         # hook compartido con cleanup correcto

public/                             # sin cambios estructurales
```

**Eliminados al final**: `pages/`, `contexts/`, `services/`, `utils/`, `styles/` (contenido migrado a `app/globals.css`).

---

## 4. Restricciones y principios

1. **`output: 'export'` se mantiene** — todo debe seguir generando `out/` y desplegándose vía `yarn deploy` (S3 + CloudFront) sin cambios en `next.config`/infra salvo lo estrictamente necesario para Image Optimization (ver Fase 5).
2. **El diseño visual NO cambia** — mismas clases Tailwind, mismo layout, mismas animaciones. Esto es un refactor de arquitectura/código, no un rediseño.
3. **App Router + Static Export**: usar `generateStaticParams` (reemplaza `getStaticPaths`/`getStaticProps`), `export const metadata` / `generateMetadata` (reemplaza `next/head`). No usar Route Handlers dinámicos ni ISR (incompatibles con export estático).
4. **No introducir**: frameworks de testing, CMS, i18n, monorepo, librerías de manejo de estado (Redux/Zustand — no son necesarias), animaciones nuevas más allá de lo ya existente.
5. Cada fase debe dejar el proyecto en estado **build-passing** (`yarn build` sin errores) antes de continuar a la siguiente.

---

## 5. Fases del plan

### Fase 0 — Limpieza de código muerto y fixes rápidos
**Esfuerzo: S | Riesgo: bajo**

- [ ] Eliminar `pages/toastme.jsx` y `pages/toastmejs.module.scss`.
- [ ] Eliminar `components/home/features.jsx` y la línea comentada `// import Features...` en `pages/index.jsx`.
- [ ] Eliminar `getProjects` y `getRepos` de `services/api.jsx` (dejar solo `sendMessage`).
- [ ] Eliminar dependencias no usadas del `package.json`: `toastmejs`, `prismjs`, `react-on-screen`, `react-wow`.
- [ ] Eliminar `package-lock.json` (yarn es el gestor primario según `CLAUDE.md`).
- [ ] Corregir `autoplay="true"` → `autoPlay` en `components/home/hero.jsx`.
- [ ] Decidir el destino de los enlaces `/portfolio/details/${project.id}` (se resuelve creando la ruta real en Fase 3 — `app/portfolio/[catslug]/[id]/page.tsx`). No tocar aún, solo dejar anotado.
- [ ] Ejecutar `yarn install && yarn build` para confirmar que todo sigue funcionando tras la limpieza.

---

### Fase 1 — Tooling: TypeScript + ESLint + Prettier
**Esfuerzo: S | Riesgo: bajo**

- [ ] Agregar dependencias dev: `typescript`, `@types/react`, `@types/react-dom`, `@types/node`.
- [ ] Crear `tsconfig.json` (usar el que genera `next` automáticamente al detectar TS, con `strict: true`, `paths` con alias `@/*` apuntando a la raíz).
- [ ] Agregar ESLint: `eslint`, `eslint-config-next`. Crear `.eslintrc.json` extendiendo `next/core-web-vitals` y `next/typescript`.
- [ ] Agregar Prettier: `prettier`, `eslint-config-prettier`. Crear `.prettierrc` (sin opciones exóticas — 2 espacios, comillas simples, sin punto y coma si así está el estilo actual del repo, o el que prefiera el agente siguiendo el estilo dominante actual).
- [ ] Crear `.editorconfig` básico.
- [ ] Agregar scripts a `package.json`: `"lint": "next lint"`, `"format": "prettier --write ."`.
- [ ] Confirmar `yarn build` sigue OK (en este punto el proyecto sigue siendo `.jsx`, TS solo está disponible para archivos nuevos vía `allowJs`).

---

### Fase 2 — Capa de datos y dominio (tipada)
**Esfuerzo: M | Riesgo: bajo-medio**

Objetivo: eliminar `ConfigContext` (innecesario para datos 100% estáticos) y reemplazarlo por módulos ES tipados, importables directamente desde Server Components.

- [ ] Crear `types/index.ts` con interfaces: `Project`, `ProjectMedia`, `ExperienceEntry`, `SiteConfig`, `CareerData` (hardSkills, softSkills, tools, experience).
- [ ] Crear `data/site.ts` — exporta `siteConfig: SiteConfig` (title, description, author, twitter, linkedin, github), tomado de `ConfigContext.initialState`.
- [ ] Crear `data/projects.ts` — exporta `projects: Project[]`, tomado de `contexts/data.jsx`.
- [ ] Crear `data/career.ts` — exporta `HARD_SKILLS`, `SOFT_SKILLS`, `TOOLS`, `EXPERIENCE` tipados, tomado de `contexts/data.jsx`.
- [ ] Crear `lib/validations.ts` — migrar `utils/validations.jsx` de **Joi** (`@hapi/joi`) a **Zod** (más liviano, integración nativa con TS, estándar actual). Schema equivalente: `name` (3-50), `subject` (3-50), `email` (formato válido), `content` (3-300).
- [ ] Crear `lib/contact-api.ts` — migrar `sendMessage` desde `services/api.jsx`. La URL del endpoint debe leerse de `process.env.NEXT_PUBLIC_CONTACT_API_URL` (con el valor actual de Heroku como fallback solo para no romper el build; ver Fase 7 para el problema de fondo).
- [ ] Eliminar `contexts/ConfigContext.jsx`, `contexts/data.jsx`, `services/api.jsx`, `utils/validations.jsx` (sus contenidos ya migraron).
- [ ] **Nota**: este paso deja referencias rotas en componentes que usaban `useContext(ConfigContext)` — esto se resuelve en la Fase 3/4 al migrar cada componente. Si se quiere mantener el build verde en esta fase intermedia, se puede mantener un `ConfigContext` "shim" temporal que re-exporte los nuevos módulos, y eliminarlo definitivamente al final de la Fase 4.

---

### Fase 3 — Migración a App Router
**Esfuerzo: L | Riesgo: medio** (es la fase más grande, pero mecánica)

#### 3.1 Layout raíz
- [ ] Crear `app/layout.tsx` (Server Component): incluye `<html>`, imports de CSS globales (`tailwindcss/tailwind.css`, `simple-line-icons` o su reemplazo, `app/globals.css`), metadata por defecto (`export const metadata: Metadata`) usando `data/site.ts`, y JSON-LD `Person` schema (ver Fase 6).
- [ ] Crear `components/layout/site-shell.tsx` (`"use client"`) — encapsula la lógica de `useState`/`useEffect` para `scrollPosition` y la clase `pt-20` condicional que hoy vive en `components/Layout.jsx`. Usa el hook `hooks/use-scroll-position.ts` (Fase 4).
- [ ] `app/layout.tsx` renderiza `<SiteShell><Header />{children}<Footer /></SiteShell>`.
- [ ] Eliminar `pages/_app.jsx` y `components/Layout.jsx` al final de esta fase.

#### 3.2 Páginas
- [ ] `app/page.tsx` ← `pages/index.jsx` (Hero, About, LatestWorks, ContactBar). Server Component (no necesita `"use client"` salvo por los componentes hijos que sí lo requieran).
- [ ] `app/career/page.tsx` ← `pages/career.jsx`. Reemplazar `useContext(ConfigContext)` por imports directos de `data/career.ts` y `data/site.ts`. Definir `export const metadata` con título "Career".
- [ ] `app/portfolio/page.tsx` ← `pages/portfolio/index.jsx`.
- [ ] `app/portfolio/[catslug]/page.tsx` ← `pages/portfolio/[catslug].jsx`:
  - Reemplazar el filtrado client-side (`useState` + `useEffect` + `router.push`) por filtrado en build-time: `generateStaticParams` retorna `[{ catslug: 'web' }, { catslug: 'ui' }]`, y el filtrado de `projects` se hace directamente en el Server Component con `data/projects.ts`.
  - Slugs inválidos: usar `notFound()` de `next/navigation` en vez de `router.push('/portfolio')`.
- [ ] **Nuevo** `app/portfolio/[catslug]/[id]/page.tsx` — página de detalle de un proyecto individual:
  - `generateStaticParams` retorna todas las combinaciones `{ catslug, id }` desde `data/projects.ts`.
  - Renderiza `components/portfolio/project-details.tsx` para ese proyecto.
  - `generateMetadata` genera título/descripción específicos del proyecto (mejora SEO).
  - Esto resuelve los enlaces rotos `/portfolio/details/${project.id}` → ahora apuntan a `/portfolio/${project.catslug}/${project.id}`.
- [ ] Eliminar todo `pages/` una vez migradas todas las rutas.

#### 3.3 next.config
- [ ] Renombrar `next.config.js` → `next.config.ts` (opcional pero alineado con "TS-first"; Next 15 soporta config en TS). Mantener `output: 'export'` y `reactStrictMode: true`.

---

### Fase 4 — Modernización de componentes
**Esfuerzo: M | Riesgo: bajo-medio**

- [ ] Convertir todos los componentes restantes de `.jsx` → `.tsx` con props tipadas (usar los tipos de `types/index.ts`).
- [ ] `components/shared/header-alt.jsx` → `components/layout/header.tsx` (`"use client"` por el `Menu` de Headless UI y el scroll listener). Usar `hooks/use-scroll-position.ts`.
- [ ] `components/shared/footer.jsx` → `components/layout/footer.tsx`.
- [ ] Crear `hooks/use-scroll-position.ts`: hook único con `addEventListener`/`removeEventListener` correcto (con cleanup), `{ passive: true }`, reemplaza la lógica duplicada de `Layout.jsx` y `header-alt.jsx`.
- [ ] `components/home/hero.jsx` → `components/home/hero.tsx`: extraer los SVGs inline (React/Vue/Angular logos) a `components/ui/icons/*.tsx`.
- [ ] `components/home/about.jsx` → `components/home/about.tsx`.
- [ ] `components/shared/social-list.jsx` → `components/shared/social-list.tsx`: extraer SVGs a `components/ui/icons/{github,linkedin,twitter}-icon.tsx`; recibir `siteConfig` por props o importarlo directamente de `data/site.ts`.
- [ ] `components/contact/ContactForm.jsx` + `ResultReducer.jsx` → `components/contact/contact-form.tsx` + `components/contact/use-contact-form.ts` (hook que encapsula `useReducer`/`useState`, usa `lib/validations.ts` y `lib/contact-api.ts`).
- [ ] `components/home/latest-works.jsx` → dividir en:
  - `components/home/latest-works.tsx` (sección + título, Server Component, recibe `projects` de `data/projects.ts`)
  - `components/portfolio/project-carousel.tsx` (`"use client"`, carrusel)
  - `components/portfolio/project-card.tsx` (ex `Slide`)
- [ ] `components/project/index.jsx` → `components/portfolio/project-details.tsx`. Extraer `CheckIcon` a `components/ui/icons/check-icon.tsx`.
- [ ] `pages/career.jsx`: extraer componentes inline `Skill` → `components/career/skill-badge.tsx` y `ExperienceItem` → `components/career/experience-item.tsx`.
- [ ] **Carrusel** — evaluar reemplazar `react-slick` + `slick-carousel` (requieren CSS legacy y dependen de jQuery-like patterns) por **`embla-carousel-react`** (liviano, sin dependencias, API moderna basada en hooks, usado por shadcn/ui). Aplica a `project-carousel.tsx` y `project-details.tsx`. *(Recomendado, no bloqueante — si se prefiere minimizar cambios visuales se puede mantener `react-slick`.)*
- [ ] **Iconos del formulario** — evaluar reemplazar la dependencia de fuente `simple-line-icons` (solo usada para `icon-user`/`icon-envelope`) por 2 iconos SVG de `@heroicons/react` (ya se usa el ecosistema Headless UI / Heroicons), eliminando una dependencia de fuente de iconos completa por 2 SVGs puntuales. *(Recomendado, opcional.)*
- [ ] `components/shared/contact-bar.jsx` → `components/shared/contact-bar.tsx` (props tipadas: `btnText`, `contentText`, `contentSubText`, `isDark`).
- [ ] Botones: crear `components/ui/button.tsx` que encapsule las variantes `.button` / `.button.is-primary` (mismas clases Tailwind ya definidas en `globals.css`), tipado con `variant?: 'default' | 'primary'` y soporte para `as="link"` (Next `<Link>`) o `as="button"`. Reemplazar usos repetidos de `className="button is-primary ..."` a través del código.

---

### Fase 5 — Imágenes y performance
**Esfuerzo: S-M | Riesgo: bajo**

- [ ] Reemplazar todos los `<img>` por `next/image` (`Hero` background no aplica si es `<video>`, pero sí `about.jsx` (SkillItem logos), `latest-works`/`project-card` (project images), `project-details` (carousel photos), `career.jsx` y `portfolio` pages (`coding_workspace.jpg`), `contact-bar.jsx` (`collage.jpg`).
- [ ] Configurar `next.config.ts` → `images: { unoptimized: true }` (requerido para `output: 'export'` sin un loader custom — S3/CloudFront no ejecuta el optimizador de imágenes de Next).
- [ ] Definir `width`/`height` (o `fill` + contenedor con dimensiones) para cada imagen migrada, y `priority` para la imagen above-the-fold del Hero si aplica.

---

### Fase 6 — SEO y metadata
**Esfuerzo: S-M | Riesgo: bajo**

- [ ] `app/layout.tsx`: `export const metadata: Metadata` con `title` (template `%s | Alejandro Vivas - Frontend Developer`), `description`, `metadataBase`, Open Graph (`og:title`, `og:description`, `og:image`, `og:url`) y Twitter card.
- [ ] Cada página (`career`, `portfolio`, `portfolio/[catslug]`, `portfolio/[catslug]/[id]`) define su propio `export const metadata` o `generateMetadata` con título/descripción específicos.
- [ ] Crear `app/sitemap.ts` (genera `sitemap.xml` con todas las rutas estáticas, incluyendo las de proyectos).
- [ ] Crear `app/robots.ts`.
- [ ] Agregar JSON-LD `Person` (schema.org) en `app/layout.tsx` con nombre, rol, sameAs (links sociales) — aporta valor real de SEO/AEO para un portafolio profesional.
- [ ] (Opcional) imagen Open Graph estática en `public/og-image.jpg` referenciada desde la metadata.

---

### Fase 7 — Formulario de contacto: issue conocido
**Esfuerzo: documentar ahora / implementar después | Riesgo: medio (funcionalidad rota)**

- [ ] Documentar en el código (`lib/contact-api.ts`) y en `CLAUDE.md` que el endpoint `https://pixelagil.herokuapp.com/api` probablemente está caído (Heroku eliminó dynos free en nov-2022) y que el formulario de contacto **no está enviando mensajes actualmente**.
- [ ] Parametrizar la URL vía `NEXT_PUBLIC_CONTACT_API_URL` (env var), documentada en un nuevo `.env.example`.
- [ ] **Recomendación de seguimiento (fuera del alcance de este refactor de código)**: dado que `CLAUDE.md` ya establece que la lógica server-side debe ir vía AWS Lambda + API Gateway (consistente con la infraestructura S3/CloudFront existente), crear una función Lambda simple (Function URL) que reciba el payload y lo envíe vía SES o un proveedor transaccional (Resend, etc.), y apuntar `NEXT_PUBLIC_CONTACT_API_URL` a esa Function URL. Alternativa más simple: un servicio de formularios de terceros (Web3Forms, Formspree) que no requiere backend propio.

---

### Fase 8 — Limpieza final y verificación
**Esfuerzo: S | Riesgo: bajo**

- [ ] Confirmar que `pages/`, `contexts/`, `services/`, `utils/`, `styles/` quedaron vacíos/eliminados.
- [ ] Confirmar que no quedan imports de `ConfigContext` ni de `react-slick`/`@hapi/joi` si fueron reemplazados.
- [ ] Ejecutar `yarn lint`, `yarn build` — build debe generar `out/` correctamente.
- [ ] Verificar manualmente con `yarn build && npx serve out` (o equivalente) que las rutas `/`, `/career`, `/portfolio`, `/portfolio/web`, `/portfolio/ui`, `/portfolio/web/<id>`, `/portfolio/ui/<id>` renderizan correctamente y que los enlaces "Project details" ya no rompen.
- [ ] Actualizar `CLAUDE.md`: arquitectura (App Router, TS, nuevas carpetas `data/`, `lib/`, `hooks/`, `types/`), comandos (`yarn lint`), y la nota sobre el endpoint de contacto.

---

## 6. Cambios de dependencias

| Acción | Paquete | Motivo |
|---|---|---|
| ➕ Agregar | `typescript`, `@types/react`, `@types/react-dom`, `@types/node` | Migración a TS |
| ➕ Agregar | `eslint`, `eslint-config-next`, `prettier`, `eslint-config-prettier` | Tooling base, estándar profesional |
| ➕ Agregar | `zod` | Reemplaza `@hapi/joi`, más liviano e integrado con TS |
| ➕ Agregar (recomendado) | `embla-carousel-react` | Reemplaza `react-slick`/`slick-carousel`, sin deps legacy |
| ➕ Agregar (recomendado) | `@heroicons/react` | Reemplaza `simple-line-icons` (solo 2 iconos) |
| ➖ Quitar | `@hapi/joi` | Reemplazado por zod |
| ➖ Quitar | `toastmejs`, `prismjs` | Código muerto (página `toastme`) |
| ➖ Quitar | `react-on-screen`, `react-wow` | Sin uso en el código |
| ➖ Quitar (si se reemplaza carrusel) | `react-slick`, `slick-carousel` | Reemplazado por embla |
| ➖ Quitar (si se reemplazan iconos) | `simple-line-icons` | Reemplazado por heroicons |
| ✅ Mantener | `next`, `react`, `react-dom`, `@headlessui/react`, `@tailwindcss/forms`, `tailwindcss`, `autoprefixer`, `postcss` | Sin cambios |
| ⚠️ Evaluar | `sass` | Solo necesario si se conservan archivos `.scss`. Si en la Fase 4 se migran `hero.module.scss` y `social-list.module.scss` a CSS Modules planos o utilities Tailwind, esta dependencia puede eliminarse. |

---

## 7. Fuera de alcance (explícitamente excluido)

- Frameworks de testing (Jest, Vitest, Playwright, etc.)
- CMS o gestión de contenido headless
- Internacionalización (i18n)
- Monorepo / workspaces
- Librerías de manejo de estado global (Redux, Zustand, Jotai) — no son necesarias, los datos son estáticos
- Rediseño visual — el objetivo es arquitectura, no UI/UX
- Implementación real del backend de contacto (Lambda) — solo se deja documentado y parametrizado vía env var

---

## 8. Resumen de prioridades para el agente ejecutor

| Fase | Prioridad | Esfuerzo |
|---|---|---|
| 0 — Limpieza y fixes rápidos | Alta | S |
| 1 — Tooling (TS/ESLint/Prettier) | Alta | S |
| 2 — Capa de datos tipada | Alta | M |
| 3 — App Router | Alta (núcleo del refactor) | L |
| 4 — Componentes modernos | Alta | M |
| 5 — Imágenes (`next/image`) | Media | S-M |
| 6 — SEO/metadata | Media | S-M |
| 7 — Fix formulario de contacto | Media (issue funcional real) | S (doc) |
| 8 — Limpieza final/verificación | Alta | S |

Las fases 0-4 constituyen el "núcleo" de la modernización arquitectónica. Las fases 5-7 son mejoras de calidad que pueden ejecutarse en una segunda pasada si se prefiere acotar el alcance de la primera entrega.
