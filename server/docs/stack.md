## vblog-server

### scripts

```
npm i koa koa-router@7 koa-bodyparser koa-static(koa-send) koa-compress kcors@2 koa-logger mongoose bluebird pangu sha1 jsonwebtoken --save

npm i babel-core babel-polyfill babel-preset-env babel-preset-stage-0 babel-plugin-transform-runtime cross-env --save-dev

sudo npm i -g nodemon pm2
```

### npm packages

```
[babel related]
babel-core
babel-polyfill
babel-preset-env
babel-preset-stage-0
babel-plugin-transform-runtime

koa
koa-router@7
koa-bodyparser
koa-static(koa-send)
koa-compress
kcors@2(koa2-cors)
koa-onerror //an error handler for koa, hack ctx.onerror.
koa-logger
mongoose
bluebird
config-lite
pangu
jsonwebtoken
sha1
ioredis

monment(objectid-to-timestamp)
Path-to-RegExp: Turn an Express-style path string such as /user/:name into a regular expression.
sequelize: a promise-based Node.js/io.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server.
koa-convert: Convert koa legacy ( 0.x & 1.x ) generator middleware to modern promise middleware ( 2.x )

cross-env
chalk：Terminal string styling done right

[全局安装]
nodemon
pm2
```

### related

```
[restc](https://elemefe.github.io/restc/intro/) 可视化展示请求，调试 RESTful 接口, 建议在Nginx中配置

中间件串联: koa-compose
模版引擎使用: koa-views pug/handlebars/art-template
发送静态文件: koa-send
网站favicon: koa-favicon
文件上传: koa-multer
基于cookie的session: koa-session
基于缓存的session: koa-generic-session(koa-generic-session-mongo,koa-redis)
Flash messages: koa-flash
用户认证: koa-http-auth(basic-auth)
防止CSRF攻击: koa-csrf
IP过滤: koa-ip-filter(总有刁民想害朕)
api访问测试: request,superagent,axios
反向代理: [http-proxy](https://github.com/nodejitsu/node-http-proxy) 没有 nginx 性能好
虚拟主机: koa-sub-domain (一台主机扩展出多个地址,需要提前做 ip 映射)
ps: forever 没有集群和负载均衡功能, pm2可以多进程执行,自带负载均衡
日志: tracer(stack-trace 跟踪错误栈), log4.js winston
调试: debug(根据不同环境变量,打印不同信息)

#生成 uuid (自增 算法随机)
node-uuid
shortid 推荐
crypto

# 测试相关
chai(assert 断言库) mocha(单元测试框架) nyc supertest babel-plugin-istanbul
持续集成: .travis.yml
```
