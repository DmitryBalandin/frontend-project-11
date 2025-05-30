import axios from "axios";
import { ValidationError } from "yup";
export default (url) => {
  const urlWithSettings = `https://allorigins.hexlet.app/disableCache=true&get?url=${encodeURIComponent(url)}`;
  //  fetch(`https://allorigins.hexlet.app/?url=${encodeURIComponent(url)}`)
  return axios.get(urlWithSettings)
    .then(response => {
      if (response.status === 200 ) return response.data.contents
      throw new Error('Network response was not ok.')
    })
    .catch(e => {
      throw new ValidationError({ key: 'errors.network'});
    })
    .catch(e =>{
      
    })
   
};

// https://thecipherbrief.com/feed

// https://buzzfeed.com/world.xml

// https://aljazeera.com/xml/rss/all.xml