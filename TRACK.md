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

## Próxima fase

Fase 1 — Tooling: TypeScript + ESLint + Prettier (pendiente de aprobación).
