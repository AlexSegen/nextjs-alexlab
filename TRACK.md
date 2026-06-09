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

## Próxima fase

Fase 2 — Capa de datos y dominio tipada (pendiente de aprobación).
