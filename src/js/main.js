import '../scss/styles.scss'
import i18next from 'i18next'
import app from './app'
import resources from '../js/locales/index'

i18next.init({
  lng: 'ru',
  resources: resources,
})
app()
