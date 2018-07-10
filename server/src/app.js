import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import cors from 'kcors'
import compress from 'koa-compress'
import serve from 'koa-static'
import onerror from 'koa-onerror'
import logger from 'koa-logger'

import './models'
import router from './routes'
import path from 'path'
import config from './config/default'
const PORT = process.env.PORT || config.app.port

const app = new Koa()

// error
onerror(app)

// logger
app.use(logger())

// middlewares
app.use(
  compress({
    filter: function(content_type) {
      return /text/i.test(content_type)
    },
    threshold: 2048,
    flush: require('zlib').Z_SYNC_FLUSH
  })
)
app.use(bodyParser())
app.use(
  serve(path.join(__dirname, '../public'), {
    maxage: 1000 * 60 * 60 * 24 * 365, // 1年，默认为0
    hidden: false, // 能否返回隐藏文件（以`.`打头），默认false不返回
    index: 'index.js', // 默认文件名
    gzip: true
    // 允许传输gzip，如静态文件夹下有两个文件，index.js和index.js.gz，
    // 会优先传输index.js.gz，默认开启
  })
)
app.use(cors())

// // router.use([path], middleware, [...]) ⇒ Router 返回路由实例  为路由配置相应中间件
// // router.url(name, params)  Generate URL for route. Takes the route name and a map of named params
// // router.routes ⇒ function  Returns router middleware which dispatches a route matching the request.
app.use(router.routes()).use(router.allowedMethods())

app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`)
})

export default app
