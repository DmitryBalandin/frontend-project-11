import { object, string } from 'yup'

import { watchedObject } from './watcher'


const validator = (inputValue,listAddRssNews) =>{
  const urlShema = object({
    url:string()
    .trim()
    .url('url must be a valid URL')
    .required('url is a required field')
    .notOneOf(listAddRssNews, `'url must not be one of the following values'${inputValue}` ),
  })
  return urlShema.validate({ url:inputValue }, { abortEarly: false })
  .then((e) => {
    
    watchedObject.listAddRssNews.push(e.url)
    watchedObject.erorrLinkRss = []
    watchedObject.rssIsValid = true
    watchedObject.inputValue = ''
  })
  .catch((e) => {
    watchedObject.inputValue = inputValue;
    watchedObject.erorrLinkRss = e.errors
    watchedObject.rssIsValid = false
  })

}

export default validator
