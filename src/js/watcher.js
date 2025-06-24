import onChange from 'on-change'
import state from './state'
import { renderErrors, renderMain } from './view'

export const watchedObject = onChange(state, function () {
  // renderErrors(state)
  // renderMain(Object.values(state.feeds), state.posts, state.ui.seenPosts)
  renderErrors(watchedObject)
  renderMain(Object.values(watchedObject.feeds), watchedObject.posts, watchedObject.ui.seenPosts)
})
