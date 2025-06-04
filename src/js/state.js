const state = {
  conditionForm: 'empty',
  posts: [],
  feeds:{},
  feedbackRss: '',
  uiState: {
    processState: 'filling',
    posts: [],
  },
  ui:{
    seenPosts: new Set()
  }
}
export default state
