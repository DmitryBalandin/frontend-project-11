import onChange from 'on-change'
import state from './state'
import renderErrors from './view'

export const watchedObject = onChange(state, function (path, value, previousValue, applyData) {
  console.log('watcher', path);
  
    renderErrors(state)
 
})

// https://rt.com/rss/news