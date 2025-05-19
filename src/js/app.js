import { watchedObject } from './watcher.js';

export default () => {
  const form = document.querySelector('form.rss-form');
  form.addEventListener('submit', (e) => e.preventDefault())
  const input = document.querySelector('#url-input');
  input.addEventListener('change', () => {
    watchedObject.inputValue = input.value;
  })
}