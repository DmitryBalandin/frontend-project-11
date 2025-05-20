import { object, string, setLocale, ValidationError } from 'yup'
import { watchedObject } from './watcher'
import state from './state';

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
      
      // const message = i18.t('success')
      // watchedObject.listAddRssNews.push(e.url)
      // watchedObject.feedbackRss = message;
      // watchedObject.rssIsValid = true
      // watchedObject.inputValue = '';
      return inputValue;
    })
    // .catch((e) => {
    //   const message = i18.t(e.message.key);
    //   watchedObject.feedbackRss = message;
    //   watchedObject.rssIsValid = false;
    //   watchedObject.inputValue = inputValue;
    //   throw new Error('not validn url');
    // })

}

export default validator
