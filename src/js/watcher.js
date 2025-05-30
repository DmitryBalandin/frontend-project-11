import onChange from 'on-change'
import state from './state'
import { renderErrors, renderMain } from './view'

export const watchedObject = onChange(state, function (path) {
  console.log('watcher', path)
  renderErrors(state)
  renderMain(Object.values(state.listAddRssNews), state.posts, state.uiPost)
})
