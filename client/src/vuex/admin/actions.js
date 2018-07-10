import axios from './axios'

export default {
  getArticles({ commit }, { pageNum = 1, pageSize = 10 }) {
    return axios
      .get('/api/list', {
        params: { pageNum, pageSize }
      })
      .then(response => response.data)
      .then(data => {
        const tagStringList = data.articleList.map(article => {
          let tagString = ''
          article.tags.forEach(obj => (tagString += `${obj.name} `))
          return tagString
        })
        for (let i = 0, len = data.articleList.length; i < len; i++) {
          data.articleList[i].tags = tagStringList[i]
        }
        commit('SET_ARTICLES', data.articleList)
        commit('SET_NUMBER', data)
      })
  },
  getArticle({ commit }, code) {
    return axios.get(`/api/articles/${code}`).then(response => response.data)
  },
  createArticle({ state, commit }, payload) {
    return axios.post('/api/articles', payload)
  },
  updateArticle({ state, commit }, { code, payload }) {
    return axios.patch(`/api/articles/${code}`, payload)
  },
  deleteArticle({ commit }, code) {
    return axios.delete(`/api/articles/${code}`)
  },
  getTags({ commit }) {
    return axios
      .get('/api/tags')
      .then(response => response.data)
      .then(tags => {
        commit('SET_TAG_LIST', tags)
      })
  },
  createTag({ commit, dispatch }, name) {
    return axios
      .post(`/api/tags`, {
        name
      })
      .then(() => {
        dispatch('getTags')
      })
  },
  updateTag({ commit, dispatch }, { oldName, newName }) {
    return axios.patch(`/api/tags/${oldName}`, { name: newName }).then(() => {
      dispatch('getTags')
    })
  },
  deleteTag({ commit }, name) {
    return axios.delete(`/api/tags/${name}`)
  }
}
