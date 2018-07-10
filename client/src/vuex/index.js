import Vue from 'vue'
import Vuex from 'vuex'
import front from './front'
import admin from './admin'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    front: front,
    admin: admin
  },
  strict: debug
})

// store.state.front // -> front 的状态
// store.state.admin // -> admin 的状态
