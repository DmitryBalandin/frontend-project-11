import { watchedObject } from './watcher.js'
import validator from './validator.js'
import state from './state.js'
import queryRss from './queryRss.js'
import parserRss from './parser.js'
import uniqueId from 'lodash.uniqueid'

export default () => {
  const form = document.querySelector('form')
  const inputElement = form.elements.url
  form.addEventListener('submit', (e) => {
    const formData = new FormData(form)
    const inputValue = formData.get('url')
    e.preventDefault()
    validator(inputValue, Object.values(state.listAddRssNews).map(value => value.linkFeed))
      .then((value) => {
        return queryRss(value)
      })
      .then((value) => {
        console.log('parse')
        return parserRss(value)
      })
      .then((data) => {
        console.log('success')
        const message = 'success'
        const id = uniqueId()
        const posts = data.posts.map((post) => {
          const id = uniqueId()
          return { ...post, id }
        })
        watchedObject.listAddRssNews = { [id]: { ...data.feed, linkFeed: inputValue, id }, ...state.listAddRssNews }
        watchedObject.feedbackRss = message
        watchedObject.rssIsValid = true
        inputElement.value = ''
        watchedObject.posts = [...posts, ...state.posts]
        const arrayRss = Object.values(watchedObject.listAddRssNews).map(value => value.linkFeed)
        if (arrayRss.length === 1) {
          update()
        }
      })
      .catch((e) => {
        console.log('catch', e.message.key)
        const message = e.message.key
        console.log(message)
        watchedObject.feedbackRss = message
        watchedObject.rssIsValid = false
      })
  })
}

function update() {
  const arrayUrslRss = Object.values(watchedObject.listAddRssNews).map(value => value.linkFeed)
  Promise.allSettled(arrayUrslRss.map(url => queryRss(url)))
    .then((results) => {
      return results.map((result) => {
        if (result.status == 'fulfilled') {
          return parserRss(result.value)
        }
      })
    })
    .then(result => Promise.allSettled(result.map(({ posts }) => {
      const postsLinks = state.posts.map(({ link }) => link)
      const newPosts = posts.filter(({ link }) => !postsLinks.includes(link))
      if (newPosts.length !== 0) {
        const postsWithId = newPosts.map((post) => {
          const id = uniqueId()
          return { ...post, id }
        })
        watchedObject.posts = [...postsWithId, ...state.posts]
      }
    })),
    )
  setTimeout(() => update(), 3000)
}

// 'https://buzzfeed.com/world.xml'
// https://thecipherbrief.com/feed

// https://aljazeera.com/xml/rss/all.xml
