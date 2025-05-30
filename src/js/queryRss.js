import axios from "axios";
import { ValidationError } from "yup";
const getProxyUrl = (url) => {
  const proxyUrl = new URL('https://allorigins.hexlet.app/get');
  proxyUrl.searchParams.set('disableCache', 'true');
  proxyUrl.searchParams.set('url', url);
  return proxyUrl.toString();
};
export default (url) => {
  // const urlWithSettings = `https://allorigins.hexlet.app/disableCache=true&get?url=${encodeURIComponent(url)}`;
  const urlWithSettings = getProxyUrl(url)
  
  return axios.get(urlWithSettings)
    .then(response => {
      if (response.status === 200 ) return response.data.contents
      throw new Error('Network response was not ok.')
    })
    .catch(e => {
      throw new ValidationError({ key: 'errors.network'});
    })
    
   
};

// https://thecipherbrief.com/feed

// https://buzzfeed.com/world.xml

// https://aljazeera.com/xml/rss/all.xml