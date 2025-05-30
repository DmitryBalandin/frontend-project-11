import { ValidationError } from "yup";

const parserRss = (data) => {
  const parser = new DOMParser();
  const resultParse = parser.parseFromString(data, "text/xml");
  const rss = resultParse.querySelector('rss')
  if(!rss) throw new ValidationError({key:'errors.rssIsNotValid'});
  const title = resultParse.querySelector('title').textContent;
  const description = resultParse.querySelector('description').textContent;
  const items = resultParse.querySelectorAll('item');
  
  const posts = Object.values(items).map((element) => {
    return {
      title: element.querySelector('title').textContent,
      link: element.querySelector('link').textContent,
      description: element.querySelector('description').textContent
    }
  })
  return {
    feed: {
      title,
      description
    },
    posts
  };
}

export default parserRss;