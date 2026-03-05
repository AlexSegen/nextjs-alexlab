
import { Suspense, useEffect } from 'react'
import ConfigContextProvider from "../contexts/ConfigContext";
import i18n from '../i18n'

import 'simple-line-icons/css/simple-line-icons.css';
import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import '../styles/animations.css'

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    const saved = localStorage.getItem('lang')
    if (saved && saved !== i18n.language) {
      i18n.changeLanguage(saved)
    }
  }, [])

  return (
    <Suspense fallback={null}>
      <ConfigContextProvider>
          <Component {...pageProps} />
      </ConfigContextProvider>
    </Suspense>
  )
}

export default MyApp
