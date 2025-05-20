import { watchedObject } from './watcher.js'
import validator from './validator.js';
import state from './state.js';
import queryRss from './queryRss.js';
import parserRss from './parser.js';

export default (i18) => {
  const form = document.querySelector('form.rss-form')

  const input = document.querySelector('#url-input')
  form.addEventListener('submit', (e) => {
    const inputValue = input.value;
    e.preventDefault()
    validator(inputValue, state.listAddRssNews, i18)
      .then((value) => {
        return queryRss(value)
      })
      .then((value) => {
        return parserRss(value)
      })
      .then((data) =>{
        console.log(data);
        const message = i18.t('success')
        watchedObject.listAddRssNews.push(inputValue)
        watchedObject.feedbackRss = message;
        watchedObject.rssIsValid = true
        watchedObject.inputValue = '';
        console.log(watchedObject);
      })
      .catch((e) => {
        const message = i18.t(e.message.key);
          watchedObject.feedbackRss = message;
          watchedObject.rssIsValid = false;
          watchedObject.inputValue = inputValue;
      })


  })
}
// 'https://buzzfeed.com/world.xml'