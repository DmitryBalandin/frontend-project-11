
export const renderErrors = (state) => {
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
    feedback.innerHTML = state.feedbackRss;
    feedback.classList.remove('text-danger')
    feedback.classList.add('text-success')
    //class text-success
  };
  input.value = state.inputValue;
}

export const renderFeeds = (feeds) => {
  if(feeds.length === 0) return;
  const body = document.querySelector('body'); 
  const sectionMain = document.createElement('section');
  sectionMain.classList.add(...['container-fluid', 'container-xxl', 'p-5']);
  sectionMain.innerHTML = "asdasdasda";
  body.append(sectionMain);
  console.log(feeds);
}

{/* <section class='container-fluid container-xxl p-5'>
  <div class='row'>
    <div class='col-md-10 col-lg-8 order-1 mx-auto posts'>
      <div class='card border-0'>
        <div class="card-body">
          <h2 class="card-title h4">
            Посты
          </h2>
        </div>
        <ul class="list-group border-0 rounded-0">
          <li class="list-group-item d-flex justify-content-between align-items-start border-0 border-end-0">
            <a href="https://www.thecipherbrief.com/trumps-saudi-wish-list-1-trillion-in-deals-and-mideast-security" class="fw-bold" data-id="12" target="_blank" rel="noopener noreferrer">
              Trump’s Mideast Wish List: $1+ Trillion in Investments – and Some Diplomacy Too
            </a>
            <button type="button" class="btn btn-outline-primary btn-sm" data-id="12" data-bs-toggle="modal" data-bs-target="#modal">
              Просмотр
            </button>
          </li>
        </ul>
      </div>
    </div>
    <div class="col-md-10 col-lg-4 mx-auto order-0 order-lg-1 feeds">
      <div class="card border-0">
        <div class="card-body">
          <h2 class="card-title h4">Фиды</h2>
        </div>
        <ul class="list-group border-0 rounded-0">
          <li class="list-group-item border-0 border-end-0">
            <h3 class="h6 m-0">The Cipher Brief</h3>
            <p class="m-0 small text-black-50">Your Trusted Source for National Security News &amp; Analysis</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section> */}

{/* */ }


