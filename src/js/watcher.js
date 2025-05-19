import onChange from 'on-change';
import state from './state';
import validator from './validator';
import render from './view';


export const watchedObject = onChange(state, function (path, value, previousValue, applyData) {
	validator(watchedObject.inputValue)
		.then((e) => {
			// onChange.target(watchedObject).inputValue = '';
			// watchedObject.rssIsValid = true;

			onChange.target(watchedObject).listAddRssNews.push(e.url);
			onChange.target(watchedObject).erorrLinkRss = '';
			watchedObject.rssIsValid = true;
		})
		.catch((e) => {
			
				onChange.target(watchedObject).erorrLinkRss = e.errors;
				watchedObject.rssIsValid = false;
			
		});
	render(watchedObject);
});