import onChange from 'on-change'
import state from './state'
import { renderErrors,  renderMain } from './view'

export const watchedObject = onChange(state, function (path, value, previousValue, applyData) {
  console.log('watcher', path);
  
  renderErrors(state)
  if (path === 'listAddRssNews' || path === 'posts' || path === 'uiPost') {
    console.log('Hello')
    renderMain(Object.values(state.listAddRssNews), state.posts,state.uiPost)
  }
})

// https://rt.com/rss/news