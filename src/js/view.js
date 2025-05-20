

const renderErrors = (state) => {
  const input = document.querySelector('#url-input');
  const feedback = document.querySelector('p.feedback');
  if (!state.rssIsValid) {
    input.classList.add('is-invalid');
    feedback.classList.remove('text-success')
    feedback.classList.add('text-danger')
    feedback.innerHTML = state.feedbackRss;
    // class text-danger
  };
  if (state.rssIsValid) {
    input.classList.remove('is-invalid');
    feedback.innerHTML =state.feedbackRss;
    feedback.classList.remove('text-danger')
    feedback.classList.add('text-success')
    //class text-success
  };
  input.value = state.inputValue;
}
export default renderErrors;