import axios from 'axios'
import { ValidationError } from 'yup'

const TIMEOUT = 10000

const getProxyUrl = (url) => {
  const proxyUrl = new URL('https://allorigins.hexlet.app/get')
  proxyUrl.searchParams.set('disableCache', 'true')
  proxyUrl.searchParams.set('url', url)
  return proxyUrl.toString()
}
export default (url, id = null) => {
  const urlWithSettings = getProxyUrl(url)
  return axios.get(urlWithSettings, {
    timeout: TIMEOUT,
  })
    .then((response) => {
      if (response.status === 200) return id ? { id, data: response.data.contents } : response.data.contents
      throw new Error('Network response was not ok.')
    })
    .catch(() => {
      throw new ValidationError({ key: 'errors.network' })
    })
}
