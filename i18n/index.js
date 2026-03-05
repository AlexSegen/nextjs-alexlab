import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import enCommon from '../public/locales/en/common.json'
import esCommon from '../public/locales/es/common.json'
import enHome from '../public/locales/en/home.json'
import esHome from '../public/locales/es/home.json'
import enCareer from '../public/locales/en/career.json'
import esCareer from '../public/locales/es/career.json'
import enPortfolio from '../public/locales/en/portfolio.json'
import esPortfolio from '../public/locales/es/portfolio.json'
import enContact from '../public/locales/en/contact.json'
import esContact from '../public/locales/es/contact.json'

i18n
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    defaultNS: 'common',
    resources: {
      en: {
        common: enCommon,
        home: enHome,
        career: enCareer,
        portfolio: enPortfolio,
        contact: enContact,
      },
      es: {
        common: esCommon,
        home: esHome,
        career: esCareer,
        portfolio: esPortfolio,
        contact: esContact,
      },
    },
    interpolation: { escapeValue: false },
    debug: process.env.NODE_ENV === 'development',
  })

export default i18n
