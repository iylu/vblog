import actions from './actions'
import mutations from './mutations'

const state = {
  user: {
    id: null,
    email: '',
    token: null
  },
  articleList: [],
  pagination: {
    totalNumber: 0,
    limit: 0
  },
  tagList: []
}
// 模块内部的 mutation 和 getter，接收的第一个参数是模块的局部状态
// mapState mapActions mapMutations mapGetters

export default {
  state,
  actions,
  mutations
}
