import Vue from 'vue'
import Router from 'vue-router'
import routerConfig from './config.js'
import store from '../vuex' // get vuex store config
import { sync } from 'vuex-router-sync'

Vue.use(Router)

const router = new Router({
  base: __dirname,
  mode: 'history',
  routes: routerConfig,
  scrollBehavior(to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

// 验证 token
// 确保要调用 next 方法，否则钩子就不会被 resolved
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token')
  //admin权限认证
  if (to.matched[0].meta.requireAuth) {
    // 判断该路由是否需要登录权限
    if (token) {
      next() // 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed （确认的）
    } else {
      // 重定向
      next({
        path: '/auth',
        query: {
          redirect: to.fullPath
        } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})

// sync the router with the vuex store.
// this registers `store.state.route`
sync(store, router)

export default router
