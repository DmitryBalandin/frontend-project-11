import i18next from 'i18next'


export const renderErrors = (state) => {
  const input = document.querySelector('#url-input')
  const feedback = document.querySelector('p.feedback')
  const button = document.querySelector('button[type=submit]')
  handleProcessState(button, state.uiState.processState)
  if (state.conditionForm === 'failed') {
    input.classList.add('is-invalid')
    feedback.classList.remove('text-success')
    feedback.classList.add('text-danger')
    feedback.innerHTML = i18next.t(state.feedbackRss)
  }
  if (state.conditionForm === 'success') {
    input.classList.remove('is-invalid')
    feedback.innerHTML = i18next.t(state.feedbackRss)
    feedback.classList.remove('text-danger')
    feedback.classList.add('text-success')
    input.value = ''
  }
}
function createFeeds(feeds) {
  const feedsElements = feeds.map((feed) => {
    
    return `<li class="list-group-item border-0 border-end-0">
              <h3 class="h6 m-0">${feed.title}</h3>
              <p class="m-0 small text-black-50">${feed.description}</p>
            </li>`
  })
  return feedsElements.reverse().join('')
}

function createPosts(posts, seenPosts) {
  const postsElements = posts.map((post) => {
    return `<li class="list-group-item d-flex justify-content-between align-items-start border-0 border-end-0">
            <a href="${post.link}" 
            class="${seenPosts.has(post.postID) ? 'fw-normal link-secondary' : 'fw-bold'}"
            data-id="${post.postID}" target="_blank" rel="noopener noreferrer">
              ${post.title}
            </a>
            <button type="button" class="btn btn-outline-primary btn-sm" data-id="${post.postID}" data-bs-toggle="modal" data-bs-target="#modal" >
              Просмотр
            </button>
          </li>`
  })
  //  class="${uiPosts[post.postID].status === 'viewed' ? 'fw-normal link-secondary' : 'fw-bold'}"
  return postsElements.join('')
}

export const renderMain = (feeds, posts, seenPosts) => {
  if (feeds.length === 0) return
  const body = document.querySelector('body')
  let sectionMain = body.querySelector('section.container-fluid.container-xxl.p-5')
  if (!sectionMain) {
    sectionMain = document.createElement('section')
    sectionMain.classList.add(...['container-fluid', 'container-xxl', 'p-5'])
    body.append(sectionMain)
  }
  sectionMain.innerHTML = ` <div class='row'>
    <div class='col-md-10 col-lg-8 order-1 mx-auto posts'>
      <div class='card border-0'>
        <div class="card-body">
          <h2 class="card-title h4">
            Посты
          </h2>
        </div>
        <ul class="list-group border-0 rounded-0">
          ${createPosts(posts, seenPosts)}
        </ul>
      </div>
    </div>
    <div class="col-md-10 col-lg-4 mx-auto order-0 order-lg-1 feeds">
      <div class="card border-0">
        <div class="card-body">
          <h2 class="card-title h4">Фиды</h2>
        </div>
        <ul class="list-group border-0 rounded-0">
          ${createFeeds(feeds)}
        </ul>
      </div>
    </div>
  </div>`
}
function handleProcessState(element, processState) {
  switch (processState) {
    case 'received':
      element.classList.remove('disabled')
      break

    case 'error':
      element.classList.remove('disabled')
      break

    case 'sending':
      element.classList.add('disabled')
      break

    case 'filling':
      element.classList.remove('disabled')
      break
    default:
      break
  }
}

