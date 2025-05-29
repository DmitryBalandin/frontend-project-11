import '../scss/styles.scss'

// Import all of Bootstrap’s JS
import * as bootstrap from 'bootstrap';
import i18next from 'i18next';
import app from './app';
import ru from './locales/ru';
import en from './locales/en';
const i118n = i18next.createInstance();
i118n.init({
  lng: 'ru',
  debug: true,
  resources: {
    ru
  }
}).then(function(t) {
  // initialized and ready to go!
  app(i118n);
});

export {i118n};


