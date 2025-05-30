import { object, string, setLocale } from 'yup'

const validator = (inputValue, listAddRssNews) => {
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
    .then(() => {
      return inputValue;
    })
}

export default validator
