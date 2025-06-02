import '../scss/styles.scss'
import i18next from 'i18next'
import app from './app'
import ru from './locales/ru'
import en from './locales/en'

i18next.init({
  lng: 'ru',
  resources: {
    ru,
    en,
  },
})
app()
