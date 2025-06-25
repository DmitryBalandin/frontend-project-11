const initialState = {
  posts: [],
  feeds: {},
  processSending: {
    status: '',
    error: '',
  },
  statusForm: {
    isValid: false,
    error: null,
  },
  ui: {
    seenPosts: new Set(),
  },
}
export default initialState
