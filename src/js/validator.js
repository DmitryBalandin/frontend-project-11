import { object, string, setLocale } from 'yup'
import { watchedObject } from './watcher'


const validator = (inputValue, listAddRssNews, i18) => {
  setLocale({
    string: {
      url: () => ({ key: 'errors.url' }),
    },
    mixed: {
      notOneOf: () => ({ key: 'errors.existOnList' }),
      required: () => ({ key: 'errors.empty' }),
    },
  });

  const urlShema = object({
    url: string()
      .trim()
      .required()
      .url()
      .notOneOf(listAddRssNews),
  })
  return urlShema.validate({ url: inputValue }, { abortEarly: false })
    .then((e) => {

      watchedObject.listAddRssNews.push(e.url)
      watchedObject.erorrLinkRss = []
      watchedObject.rssIsValid = true
      watchedObject.inputValue = ''
    })
    .catch((e) => {
     
      const message = i18.t(e.message.key);
      watchedObject.inputValue = inputValue;
      watchedObject.erorrLinkRss = message;
      watchedObject.rssIsValid = false;
    })

}

export default validator
