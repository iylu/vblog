import * as types from './mutation-types'

export default {
  [types.SET_ARTICLE_LIST](state, articleList) {
    state.articleList = articleList
  },

  [types.SET_NUMBER]: (state, { totalNumber, totalPage, limit, page }) => {
    // totalPage = Math.ceil(totalNumber / limit)
    state.pageNum = page
    state.pageSize = limit
    state.totalNum = totalNumber
  },

  [types.SET_ARTICLE](state, article) {
    state.article = article
  },

  [types.SET_PREV](state, { shortInfo }) {
    state.prev = shortInfo
  },

  [types.SET_NEXT](state, { shortInfo }) {
    state.next = shortInfo
  },

  [types.SET_TAGS](state, tags) {
    state.tags = tags
  },

  [types.SET_TAG_PAGER_LIST](state, { articles, tagName }) {
    state.tagPager = articles
    state.tagName = tagName
  },

  [types.SET_ARCHIVE](state, sortedItem) {
    state.archives = sortedItem
  },

  [types.SEARCH_CONTENT](state, words) {
    state.words = words
  }
}
