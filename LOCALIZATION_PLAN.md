# Plan: Implementar localización con react-i18next

## Context

El sitio de portafolio tiene todo el texto hardcodeado en inglés y español mezclados dentro de los componentes. El objetivo es extraer todas las cadenas de texto a archivos de traducción y soportar dos idiomas (EN / ES) con un selector en el header. Se usará `react-i18next` con hooks siguiendo la documentación oficial.

---

## 1. Instalación de dependencias

```bash
yarn add react-i18next i18next i18next-browser-languagedetector i18next-http-backend
```

---

## 2. Inicialización de i18next

**Crear `i18n/index.js`:**

```js
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    defaultNS: 'common',
    ns: ['common', 'home', 'career', 'portfolio', 'contact'],
    backend: { loadPath: '/locales/{{lng}}/{{ns}}.json' },
    interpolation: { escapeValue: false },
    debug: process.env.NODE_ENV === 'development',
  })

export default i18n
```

**Modificar `pages/_app.jsx`:**
- Agregar `import '../i18n'` al inicio
- Envolver `<Component>` con `<Suspense fallback={null}>`

---

## 3. Estructura de archivos de traducción

```
public/
  locales/
    en/
      common.json     ← nav, footer, botones compartidos
      home.json       ← hero, about, latest-works, contact-bar
      career.json     ← todas las strings de /career
      portfolio.json  ← portfolio index y [catslug]
      contact.json    ← formulario y mensajes de resultado
    es/
      (misma estructura)
```

### Namespace `common.json` (ejemplo en/es)
Nav links, footer headings, copyright, social section labels, botones compartidos ("Let's talk", "Send me a message").

### Namespace `home.json`
Hero: nombre, título, bio, botones. About: headings de stacks, descripción. Latest Works: "Recent Projects", "Project details", "More projects". Contact bar home.

### Namespace `career.json`
Section headers: "Professional Career", "Hard Skills", "Soft Skills", "Experience", "Tools I use", "Education", "Location", "Languages", "Contact". Datos estáticos: empresa, rol, período, descripción de cada experiencia, educación, ubicación, idiomas del perfil.

### Namespace `portfolio.json`
"Portfolio", "Web Design", "UI Design", breadcrumbs, contact bar del portfolio.

### Namespace `contact.json`
Placeholders del form ("Full name", "Email address", "Your message"), botón "Send message" / "Sending...", mensajes de éxito y error.

---

## 4. Selector de idioma

**Crear `components/shared/language-switcher.jsx`:**

```jsx
import { useTranslation } from 'react-i18next'

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const toggle = () => i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en')
  return (
    <button onClick={toggle} className="...">
      {i18n.language === 'en' ? 'ES' : 'EN'}
    </button>
  )
}
```

**Modificar `components/shared/header-alt.jsx`:**
- Importar y renderizar `<LanguageSwitcher />` junto a los links de nav
- Aplicar `useTranslation('common')` para los labels de nav: "Home", "Career", "Portfolio", "Contact"

---

## 5. Implementación por páginas (una a la vez)

La localización se implementa de forma incremental. Cada etapa incluye sus componentes y archivos de traducción. No se pasa a la siguiente hasta validar la actual.

---

### Etapa 1 — Home ✦ (primera)

**Archivos de traducción a crear:**
- `public/locales/en/common.json` — nav, footer (se usan en home también)
- `public/locales/es/common.json`
- `public/locales/en/home.json`
- `public/locales/es/home.json`

**Componentes a actualizar:**

| Componente | Namespace | Strings clave |
|---|---|---|
| `components/shared/header-alt.jsx` | `common` | nav links |
| `components/shared/language-switcher.jsx` | — | nuevo componente |
| `components/shared/footer.jsx` | `common` | headings, links, copyright |
| `components/home/hero.jsx` | `home` | bio, CTAs |
| `components/home/about.jsx` | `home` | headings, descripciones de stacks |
| `components/home/latest-works.jsx` | `home` | "Recent Projects", botones |
| `pages/index.jsx` | `home` | contact bar props ("Let's talk", etc.) |

**Verificación de Etapa 1:**
- `yarn dev` sin errores en consola
- Network tab muestra carga de `common.json` y `home.json`
- Switcher EN/ES cambia todos los textos de la home
- Idioma persiste al recargar

---

### Etapa 2 — Career

**Archivos a crear:**
- `public/locales/en/career.json`
- `public/locales/es/career.json`

**Componentes a actualizar:**

| Componente | Namespace | Strings clave |
|---|---|---|
| `pages/career.jsx` | `career` | todos los section headers, datos de educación, ubicación, idiomas del perfil, labels estáticos |

Los datos de experiencia (empresa, rol, período, descripción) se mueven a `career.json` como array anidado.

---

### Etapa 3 — Portfolio

**Archivos a crear:**
- `public/locales/en/portfolio.json`
- `public/locales/es/portfolio.json`

**Componentes a actualizar:**

| Componente | Namespace | Strings clave |
|---|---|---|
| `pages/portfolio/index.jsx` | `portfolio` | "Portfolio", "Web Design", "UI Design", contact bar props |
| `pages/portfolio/[catslug].jsx` | `portfolio` | breadcrumbs, categorías |
| `components/project/index.jsx` | `portfolio` | "Tech & Tools", "Features", "Preview" |

Los títulos y descripciones de proyectos en `contexts/data.jsx` se mueven a `portfolio.json` como objetos anidados por ID.

---

### Etapa 4 — Contact (formulario)

**Archivos a crear:**
- `public/locales/en/contact.json`
- `public/locales/es/contact.json`

**Componentes a actualizar:**

| Componente | Namespace | Strings clave |
|---|---|---|
| `components/contact/ContactForm.jsx` | `contact` | placeholders, botón "Send message" / "Sending..." |
| `components/contact/ResultReducer.jsx` | `contact` | mensajes de éxito y error |

---

## 6. Datos estructurados en `contexts/data.jsx`

Los campos no textuales (IDs, slugs, urls, fotos, fechas, tech arrays) permanecen en `data.jsx`. Las descripciones y títulos se extraen a los JSON de traducción referenciados por índice o ID.

---

## 7. Idioma por defecto

- `LanguageDetector` detecta el idioma del navegador automáticamente
- Fallback a `'en'` si el idioma no es soportado
- El idioma elegido se persiste en `localStorage` via LanguageDetector

---

## Verificación final (tras Etapa 4)

1. Navegar por todas las páginas en EN y ES — sin texto hardcodeado visible
2. Cambiar idioma → todos los textos cambian en todas las páginas
3. Recargar en cualquier página → idioma persiste
4. Consola sin warnings de keys faltantes de i18next
