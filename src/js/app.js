import { watchedObject } from './watcher.js'
import validator from './validator.js';
import state from './state.js';
import queryRss from './queryRss.js';
import parserRss from './parser.js';
import uniqueId from 'lodash.uniqueid';

export default (i18) => {
  const form = document.querySelector('form.rss-form')

  const input = document.querySelector('#url-input')
  form.addEventListener('submit', (e) => {
    const inputValue = input.value;
    e.preventDefault()
    validator(inputValue, Object.values(state.listAddRssNews).map(value => value.linkFeed), i18)
      .then((value) => {
        return queryRss(value)
      })
      .then((value) => {
        return parserRss(value)
      })
      .then((data) => {
        const message = i18.t('success')
        const id = uniqueId();
        const posts = data.posts.map((post) => { return { ...post, id } });
        watchedObject.listAddRssNews = { [id]: { ...data.feed, linkFeed: inputValue, id, }, ...state.listAddRssNews, }
        watchedObject.feedbackRss = message;
        watchedObject.rssIsValid = true
        watchedObject.inputValue = '';
        watchedObject.posts = [...posts, ...state.posts];
        const arrayRss = Object.values(watchedObject.listAddRssNews).map(value => value.linkFeed);
        if (arrayRss.length === 1) {
          update()
        }
      })
      .catch((e) => {
        const message = i18.t(e.message.key);
        watchedObject.feedbackRss = message;
        watchedObject.rssIsValid = false;
        watchedObject.inputValue = inputValue;

      })



  })
}

function update() {
  const arrayUrslRss = Object.values(watchedObject.listAddRssNews).map(value => value.linkFeed);
  console.log(arrayUrslRss);
  Promise.allSettled(arrayUrslRss.map(url => queryRss(url)))
    .then(results => {
      return results.map((result) => {
        if (result.status == "fulfilled") {
          return parserRss(result.value)
          // new Promise(() => { return parserRss(result.value) })
          //   .then((value) => console.log(value));
        }
      })
    })
    .then((result) => Promise.allSettled(result.map(({feed,posts}) =>{
      console.log(feed,posts)
    }))
    );
  setTimeout(() => update(), 2000)
}
// 'https://buzzfeed.com/world.xml'
//https://thecipherbrief.com/feed

// https://aljazeera.com/xml/rss/all.xml