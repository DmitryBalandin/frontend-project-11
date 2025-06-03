import { watchedObject } from './watcher.js'
import validator from './validator.js'
import state from './state.js'
import queryRss from './queryRss.js'
import parserRss from './parser.js'
import uniqueId from 'lodash.uniqueid'
import i18next from 'i18next'
import resources from '../js/locales/index'

export default () => {
  i18next.init({
    lng: 'ru',
    resources: resources,
  })
  update()
  const form = document.querySelector('form')
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData(form)
    const inputValue = formData.get('url')
    watchedObject.uiState.processState = 'filling'
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
        const uiPosts = posts.reduce((acc, { id }) => {
          return {
            ...acc, [id]: { status: 'not view' },
          }
        }, {})
        watchedObject.listAddRssNews = { [id]: { ...data.feed, linkFeed: inputValue, id }, ...state.listAddRssNews }
        watchedObject.feedbackRss = message
        watchedObject.uiState.processState = 'received'
        watchedObject.conditionForm = 'success'
        watchedObject.uiState.posts = { ...uiPosts, ...state.uiState.posts }
        watchedObject.posts = [...posts, ...state.posts]
      })
      .catch((e) => {
        const message = e.message.key
        watchedObject.uiState.processState = 'error'
        watchedObject.conditionForm = 'failed'
        watchedObject.feedbackRss = message
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
        watchedObject.uiState.posts = {
          ...state.uiState.posts,
          ...postsWithId.reduce((acc, { id }) => {
            return { ...acc, [id]: { status: 'not view' } }
          }, {}),
        }
        watchedObject.posts = [...postsWithId, ...state.posts]
      }
    })),
    )
  setTimeout(() => update(), 5000)
}
