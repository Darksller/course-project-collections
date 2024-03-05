import global_en from './en/global.json'
import global_ru from './ru/global.json'
import i18n from 'i18next'

i18n.init({
  interpolation: { escapeValue: false },
  lng: localStorage.getItem('lang') ?? 'en',
  resources: {
    en: { global: global_en },
    ru: { global: global_ru },
  },
})

export { i18n }
