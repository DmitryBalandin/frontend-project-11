import { watchedObject } from './watcher.js'
import validator from './validator.js'
import state from './state.js'
import queryRss from './queryRss.js'
import parserRss from './parser.js'
import uniqueId from 'lodash.uniqueid'

export default () => {
  const form = document.querySelector('form')
  form.addEventListener('submit', (e) => {
    const formData = new FormData(form)
    const inputValue = formData.get('url')
    e.preventDefault()
    watchedObject.processState = 'filling'
    validator(inputValue, Object.values(state.listAddRssNews).map(value => value.linkFeed))
      .then((value) => {
        watchedObject.processState = 'sending'
        return queryRss(value)
      })
      .then((value) => {
        return parserRss(value)
      })
      .then((data) => {
        const message = 'success'
        const id = uniqueId()
        const posts = data.posts.map((post) => {
          const id = uniqueId()
          return { ...post, id }
        })
        watchedObject.listAddRssNews = { [id]: { ...data.feed, linkFeed: inputValue, id }, ...state.listAddRssNews }
        watchedObject.feedbackRss = message
        watchedObject.processState = 'received'
        watchedObject.conditionForm = 'success'
        watchedObject.rssIsValid = true
        watchedObject.posts = [...posts, ...state.posts]
      })
      .catch((e) => {
        const message = e.message.key
        watchedObject.processState = 'error'
        watchedObject.conditionForm = 'error'
        watchedObject.feedbackRss = message
        watchedObject.rssIsValid = false
      })
  })
  update()
}

function update() {
  const arrayUrslRss = Object.values(watchedObject.listAddRssNews).map(value => value.linkFeed)
  Promise.allSettled(arrayUrslRss.map(url => queryRss(url)))
    .then((results) => {
      return results.map((result) => {
        if (result.status == 'fulfilled') {
          return parserRss(result.value)
        }
        if (result.status == 'rejected') {
          return null
        }
      })
    })
    .then(results => results.filter(value => value != null))
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
  setTimeout(() => update(), 5000)
}
