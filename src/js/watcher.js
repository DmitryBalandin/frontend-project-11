import onChange from 'on-change'
import state from './state'
import { renderErrors, renderFeeds } from './view'

export const watchedObject = onChange(state, function (path, value, previousValue, applyData) {
  console.log('watcher', path);

  renderErrors(state)
  if (path === 'listAddRssNews') {
    renderFeeds(Object.values(state.listAddRssNews))
  }
})

// https://rt.com/rss/news