



const render = (state) => {
  const input = document.querySelector('#url-input');
  const feedback = document.querySelector('p.feedback');
  console.log(state.rssIsValid);
  if (!state.rssIsValid) {
    input.classList.add('is-invalid');
    console.log(state)
    feedback.innerHTML = state.erorrLinkRss.join('');
  };
  if (state.rssIsValid) {
    input.classList.remove('is-invalid');
    feedback.innerHTML ='';
  };
  console.log(state);
}
export default render;