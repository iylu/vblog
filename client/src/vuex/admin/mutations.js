const mutations = {
  SET_ARTICLES(state, articles) {
    state.articleList = articles
  },
  SET_NUMBER(state, { totalNumber, limit, totalPage }) {
    state.pagination = { totalNumber, limit, totalPage }
  },
  SET_TAG_LIST(state, tags) {
    state.tagList = tags
  },
  LOGIN(state, data) {
    localStorage.setItem('userid', data.id)
    state.user.id = data.id
    localStorage.setItem('useremail', data.email)
    state.user.email = data.email
    localStorage.setItem('token', data.token)
    state.user.token = data.token
  },
  LOGOUT(state) {
    localStorage.removeItem('userid')
    state.user.id = null
    localStorage.removeItem('useremail')
    state.user.email = ''
    localStorage.removeItem('token')
    state.user.token = null
  }
}
export default mutations
