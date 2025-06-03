import onChange from 'on-change'
import state from './state'
import { renderErrors, renderMain } from './view'

export const watchedObject = onChange(state, function () {
  renderErrors(state)
  renderMain(Object.values(state.listAddRssNews), state.posts, state.uiState.posts)
})
