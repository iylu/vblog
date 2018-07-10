import Router from 'koa-router'

const router = new Router({
  prefix: '/api'
})
require('./routes')(router)

export default router
