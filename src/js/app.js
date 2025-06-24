import { watchedObject } from './watcher.js'
import validator from './validator.js'
import state from './state.js'
import queryRss from './queryRss.js'
import parserRss from './parser.js'
import uniqueId from 'lodash.uniqueid'
import i18next from 'i18next'
import resources from '../js/locales/index'
import * as bootstrap from 'bootstrap'

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
    validator(inputValue, Object.values(watchedObject.feeds).map(value => value.linkFeed))
      .then((value) => {
        watchedObject.processState = 'sending'
        return queryRss(value)
      })
      .then((value) => {
        return parserRss(value)
      })
      .then((data) => {
        const message = 'success'
        const feedID = uniqueId()
        const posts = data.posts.map((post) => {
          const postID = uniqueId()
          return { ...post, postID, feedID }
        })
        watchedObject.feeds = { [feedID]: { ...data.feed, linkFeed: inputValue, feedID }, ...watchedObject.feeds }
        watchedObject.feedbackRss = message
        watchedObject.uiState.processState = 'received'
        watchedObject.conditionForm = 'success'
        watchedObject.posts = [...posts, ...watchedObject.posts]
      })
      .catch((e) => {
        const message = e.message.key
        watchedObject.uiState.processState = 'error'
        watchedObject.conditionForm = 'failed'
        watchedObject.feedbackRss = message
      })
  })
}

function findNewPosts(posts, feedID, existPosts) {
  const postsLinks = existPosts.filter((value) => value.feedID === feedID)
    .map(({ link }) => link)
  const newPosts = posts.filter(({ link }) => !postsLinks.includes(link))
  return newPosts.length === 0 ? null : newPosts.map((post) => {
    const postID = uniqueId()
    return { ...post, postID, feedID }
  })
}

function update() {
  const arrayUrslRss = Object.values(watchedObject.feeds).map(value => {
    return {
      url: value.linkFeed, feedID: value.feedID,
    }
  })
  
  Promise.allSettled(arrayUrslRss.map(({ url, feedID }) => queryRss(url, feedID)))
    .then((results) => {
      return results.map((result) => {
        if (result.status == 'fulfilled') {
          const feedID = result.value.id
          const { posts } = parserRss(result.value.data)
          const newPosts = findNewPosts(posts, feedID, watchedObject.posts)
          if (newPosts) {
            watchedObject.posts = [...newPosts, ...watchedObject.posts]
          }
        }
        if (result.status == 'rejected') {
          return null
        }
      })
    })
    .catch((e) => console.log(e))
    .finally(setTimeout(() => update(), 5000))
}

const exampleModal = document.getElementById('modal')
new bootstrap.Modal(exampleModal)
exampleModal.addEventListener('show.bs.modal', function (event) {
  const button = event.relatedTarget
  const buttonId = button.dataset.id
  const [post] = watchedObject.posts.filter(({ postID }) => buttonId === postID)
  const modalTitle = exampleModal.querySelector('.modal-title')
  const modalDescription = exampleModal.querySelector('.modal-body')
  const modalLink = exampleModal.querySelector('.btn.btn-primary.full-article')
  modalTitle.textContent = post.title
  modalDescription.textContent = post.description
  modalLink.setAttribute('href', post.link)
  watchedObject.ui.seenPosts.add(post.postID)
})
// https://aljazeera.com/xml/rss/all.xml

// https://buzzfeed.com/world.xml

// https://thecipherbrief.com/feed
