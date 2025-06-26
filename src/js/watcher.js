import onChange from 'on-change'
import initialState from './initial-state'
import { renderErrors, renderMain } from './view'

export const watchedObject = onChange(initialState, function () {
  renderErrors(watchedObject)
  renderMain(Object.values(watchedObject.feeds), watchedObject.posts, watchedObject.ui.seenPosts)
})
