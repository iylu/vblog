import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

const state = {
  articleList: [
    /*{
      _id(code),
      title,
      abstract,
      tags: ['node.js', 'vue'],
      meta: {
        created_at,
        updated_at
      }
    }*/
  ],

  showPage: 3, //固定值(多页时只展示 3页)

  pageNum: 1, //当前页数
  pageSize: 10, //分页大小
  totalNum: 0, //文章总数量

  archives: [
    /*{
      _id(code),
      title,
      meta: {
        created_at
      }
    }*/
  ],

  article: {
    /*_id(code),
    title,
    content,
    abstract,
    tags: ['node.js', 'vue'],
    meta: {
      created_at,
      updated_at
    }*/
  },
  prev: {
    /*title,
     _id(code)
     */
  },
  next: {
    /*title,
     _id(code)
     */
  },

  tags: [
    /*{
     name
     }*/
  ],

  // tagPager: 'node.js'
  tagPager: [
    /*{
      _id(code),
      title,
      abstract,
      tags: ['node.js', 'vue'],
      meta: {
        created_at,
        updated_at
      }
    }*/
  ],

  tagName: '' // 查看标签下的文章
}
// 模块内部的 mutation 和 getter，接收的第一个参数是模块的局部状态

export default {
  state,
  actions,
  getters,
  mutations
}
