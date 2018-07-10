import axios from './axios'

export const getArticleList = ({ commit }, { pageNum, pageSize }) => {
  return axios
    .get(`/api/list`, {
      params: { pageNum, pageSize }
    })
    .then(response => response.data)
    .then(data => {
      commit('SET_ARTICLE_LIST', data.articleList)
      commit('SET_NUMBER', data) // 获取全部的文章数量信息
    })
}

// 获取文章
export const getArticleById = ({ commit }, code) => {
  return axios
    .get(`/api/articles/${code}`)
    .then(response => response.data)
    .then(article => {
      commit('SET_ARTICLE', article)
    })
}

// 获取标签集
export const getTagList = ({ commit }) => {
  return axios
    .get(`/api/tags`)
    .then(response => response.data)
    .then(tags => {
      commit('SET_TAGS', tags)
    })
}

// 通过标签获取文章列表(需要跨表查询)
export const getListByTag = ({ commit }, tagName) => {
  return axios
    .get(`/api/tags/${tagName}`)
    .then(response => response.data)
    .then(articles => {
      commit('SET_TAG_PAGER_LIST', {
        articles: articles,
        tagName
      })
    })
}

// 前端按照年份月份分类
export const getArchive = ({ commit }) => {
  return axios
    .get(`/api/archive`)
    .then(response => response.data)
    .then(articles => {
      let sortedItem = articles.reduce((prev, curr) => {
        let time = curr.meta.created_at.slice(0, 7).replace('-', '年') + '月'
        if (typeof prev[time] === 'undefined') {
          prev[time] = [curr]
        } else {
          prev[time].push(curr)
        }
        return prev
      }, {})
      commit('SET_ARCHIVE', sortedItem)
    })
}

export const getListBySearch = ({ commit }, words) => {
  if (!words) return false
  return axios
    .get(`/api/search`, {
      params: {
        q: words
      }
    })
    .then(response => response.data)
    .then(articles => {
      commit('SEARCH_CONTENT', words)
      commit('SET_ARTICLE_LIST', articles)
    })
}
