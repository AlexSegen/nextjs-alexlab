import { useTranslation } from 'react-i18next'

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const toggle = () => {
    const next = i18n.language.startsWith('es') ? 'en' : 'es'
    i18n.changeLanguage(next)
    localStorage.setItem('lang', next)
  }
  const label = i18n.language.startsWith('es') ? 'EN' : 'ES'

  return (
    <button
      onClick={toggle}
      className="block px-4 py-6 font-semibold text-gray-400 hover:text-white uppercase tracking-widest"
    >
      {label}
    </button>
  )
}
