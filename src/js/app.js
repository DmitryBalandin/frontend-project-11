import { watchedObject } from './watcher.js'
import validator from './validator.js'
import queryRss from './queryRss.js'
import parserRss from './parser.js'
import uniqueId from 'lodash.uniqueid'
import i18next from 'i18next'
import resources from '../js/locales/index'
import * as bootstrap from 'bootstrap'

export const elements = {
  form: document.querySelector('form'),
  input: document.querySelector('#url-input'),
  button: document.querySelector('button[type=submit]'),
  feedback: document.querySelector('p.feedback'),
  body: document.querySelector('body')
}

export default () => {
  i18next.init({
    lng: 'ru',
    resources: resources,
  })
  update()
  const form = elements.form
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData(form)
    const inputValue = formData.get('url')
    watchedObject.processSending.status = 'filling'
    validator(inputValue, Object.values(watchedObject.feeds).map(value => value.linkFeed))
      .then((erorr) => {
        if (erorr) {
          watchedObject.feedbackRss = erorr.key
          watchedObject.statusForm = { isValid: false, error: erorr.key }
          return
        }
        watchedObject.statusForm ={ isValid: true, error: null }
        loadDate(inputValue)
      })
      .catch((e) => {
        console.log(e)
      })
  })
}

function loadDate(url) {
  watchedObject.processSending.status = 'loading'
  return queryRss(url)
    .then((data) => {
      const normalizeData = parserRss(data)
      const feedID = uniqueId()
      const posts = normalizeData.posts.map((post) => {
        const postID = uniqueId()
        return { ...post, postID, feedID }
      })
      watchedObject.feeds = { [feedID]: { ...normalizeData.feed, linkFeed: url, feedID }, ...watchedObject.feeds }
      watchedObject.posts = [...posts, ...watchedObject.posts]
      watchedObject.processSending = { error: null, status: 'sucess' }
    })
    .catch((e) => {
      if (e.message.key === 'errors.rssIsNotValid' || e.message.key === 'errors.network') {
        watchedObject.processSending = { error: e.message.key, status: 'fail' }
      } else { 
        watchedObject.processSending = { error: 'errors.unknow', status: 'fail' }
      }
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
