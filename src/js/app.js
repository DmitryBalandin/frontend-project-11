import { watchedObject } from './watcher.js'
import validator from './validator.js';
import state from './state.js';
export default (i18) => {
  const form = document.querySelector('form.rss-form')
  form.addEventListener('submit', (e) => e.preventDefault())
  const input = document.querySelector('#url-input')
  input.addEventListener('change', () => {
    validator(input.value,state.listAddRssNews,i18)
  })
}
