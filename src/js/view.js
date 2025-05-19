

const renderErrors = (state) => {
  const input = document.querySelector('#url-input');
  const feedback = document.querySelector('p.feedback');
  if (!state.rssIsValid) {
    input.classList.add('is-invalid');
    feedback.innerHTML = state.erorrLinkRss;
  };
  if (state.rssIsValid) {
    input.classList.remove('is-invalid');
    feedback.innerHTML ='';
  };
  input.value = state.inputValue;
}
export default renderErrors;