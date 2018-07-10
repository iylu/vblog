### nodemon

```
nodemon -h
nodemon [your node app]
nodemon ./server.js localhost 8080

nodemon 支持本地和全局配置文件。配置文件名为 nodemon.json，可以将其放在当前工作目录或者你的 home 目录

如果没有指定启动脚本，nodemon 将检查 package.json 文件，并运行 main 属性指定的文件，如果没有发现 main 属性，nodemon 将检查 scripts.start 属性指定的启动命令。因此如果同时指定了 mian 和 scripts.start 属性，那么 nodemon 将使用 main 属性指定的文件作为启动脚本。

配置文件 nodemon.json(配置文件可以接受任何命令行中支持的参数，启动 nodemon 时命令行中的参数将覆盖配置文件的设置)
```

nodemon.json 示例

```
{
    // 手动重启对应的命令，默认为 rs，你可以按照自己的习惯做对应的修改，
    // 比如修改为 rb，那么 rb 将作为新的手动重启命令。
    "restartable": "rs",
    // verbose mode
    "verbose": false,
    "env": {
        "NODE_ENV": "development",
        // 端口
        "PORT": "4000"
    },
    // 后缀名和对应的运行命令
    "execMap": {
        // 空后缀名是为了支持 ./bin/www 这样无后缀的文件。
        "": "node --debug",
        // js 文件的启动命令
        "js": "node --debug"
    },
    // 监视的文件和文件夹
    "watch": [
        "app/",
        "bin/",
        "routes/",
        "views/",
        "app.js"
    ],
    // 忽略的文件和文件夹
    "ignore": [
        ".git",
        ".idea",
        "node_modules"
    ],
    // 监视指定后缀名的文件
    "ext": "js json pug"
}
```

### pm2

```bash
# 运维 pm2 进程守护工具,生产环境下自动重启、日志记录、错误预警
npm install pm2 -g
npm install pm2@latest -g #also pm2 update

pm2 start app.js [--name myapp]  # 启动应用并命名进程; 应用启动成功后, status:online
pm2 start pm2.json
pm2 start app.js [-x]  # 用fork模式启动 app.js 而不是使用 cluster, -x 不加也可以
pm2 start app.js -i 0
# 默认使用 fork_mode 模式, 使用 -i 变成 cluster_mode 负载均衡模式, -i 后面的數字代表启动几个应用进程
pm2 start app.js -i max # 根据机器CPU核数，开启对应数目的进程
# 集群(开发环境中多以fork的方式启动，生产环境中多用cluster方式启动)
pm2 start app.js -i 2 --name test #启动2个并命名为test的应用，在后台以cluster方式运行

# 使用 watching 模式启动应用(监控代码变动,服务自动重启)
pm2 start --watch app.js

pm2 list # 查看进程状态
pm2 restart <app_name|id|'all'|json_conf>  # 重启应用
pm2 stop <app_name|id|'all'|json_conf> # 停止应用
pm2 delete <app_name|id|'all'|json_conf>  # 删除应用
pm2 start|restart|stop|delete processes.json # 通过配置文件启动
pm2 startup # 自动生成并配置开机启动脚本, 让服务器在重启的时候可以保持应用在线(auto-detect platform)
$ pm2 startup [platform]
# render startup-script for a specific platform, the [platform] could be one of:
# [ubuntu | ubuntu14 | ubuntu12 | centos | centos6 | arch | oracle | amazon | macos | darwin | freesd | systemd | systemv | upstart | launchd | rcd | openrc]
pm2 reload all|app_name| app_id # 0秒停机重载进程(用于 NETWORKED 进程)
pm2 describe <id|app_name> #查看进程详情

#环境变量
pm2 start app.js --env <env|env_production|other> # 传入不同的环境变量来启动 pm2

pm2 show [app_name]
pm2 logs ['all'|app_name|id]
pm2 logs --json ['all'|app_name|id]  # JSON output
pm2 logs --format ['all'|app_name|id]  # Formated output
#日志存储的默认地址是~/.pm2/logs/<app-name>-out-<number>.log（标准输出） 和~/.pm2/logs/<app-name>-error<number>.log（错误输出）
pm2 flush # Flush all logs

pm2 monit  # cpu/内存监控
pm2 ecosystem | pm2 generate # 生成一个简单的配置文件 ecosystem.config.js or ecosystem.json
pm2 interact your-secret-key your-public-key # 配合 pm2可视化在线监控平台(https://keymetrics.io/) 使用

# 配置文件
pm2.json | ecosystem.json #一般命名
# http://pm2.keymetrics.io/docs/usage/application-declaration/

# PM2 内嵌一个模块系统
pm2 install <module_name>
pm2-logrotate 日志管理及分割模块
pm2-webshell 浏览器模拟终端
pm2-auto-pull 持续集成，自动拉取代码

# forever 和 pm2 区别: 在监控欠缺，进程和集群管理有限
```

### nginx

```bash
nginx -c nginx配置文件地址
nginx -t -c /usr/local/etc/nginx/nginx.conf(brew install -- default location) # 可以用来确定配置文件的位置
#自己的应用配置中应该不存在 http directives, 仅仅存在 upstream 和 server
#测试自己应用配置应该在 the main configuration /usr/local/etc/nginx/nginx.conf(/etc/nginx/nginx.conf) 中 includes 自己的应用配置
ps -ef | grep nginx
nginx -s [stop, quit, reopen, reload]
/usr/local/Cellar/nginx/1.12.0_1/bin/nginx -s [stop, quit, reopen, reload]
# 正则表达式: ~ 开头表示大小写敏感    ~* 开头表示大小写不敏感    = 开头表示完全匹配且优先级最高    . 要写成 \.
# 通配符(*) 只能在开头或结尾，而且只能与一个 . 相邻

#error   [emerg]: bind() to 0.0.0.0:80 failed (13: Permission denied)
#套接字API()绑定到端口不足1024, 使用 root 启动(sudo)
ps -ax | grep nginx #查看正在运行的nginx进程
killall -9 nginx #遇到nginx无法启动，很有可能是已经在运行了，用命令killall
```

### redis

- redis-server
- redis-cli

### babel

#### 预设(presets)(一堆 plugins 的预设集合)

```
env
react
stage-x(stage-0/1/2/3/4)
```

#### 插件(plugins)

```
transform-runtime
自定义插件
```

#### plugins/presets 排序(处理相同功能时的编译顺序)

- plugins 优先于 presets 进行编译
- plugins 按照数组的 index 增序(从数组第一个到最后一个)进行编译。
- presets 按照数组的 index 倒序(从数组最后一个到第一个)进行编译。大部分会把 presets 写成["env", "stage-0"]

#### babel-polyfill vs babel-runtime

Babel 默认只转换转各种 ES2015 语法，而不转换新的 API，比如 Iterator、Generator、Set、Maps、Promise 等全局对象，以及一些定义在全局对象上的新方法 Object.assign、Array.from，这时我们需要提供一些 ployfill 来模拟出这样一个提供原生支持功能的浏览器环境。
主要有两种方式：babel-runtime 和 babel-polyfill
babel-runtime 和 babel-polyfill 这两个模块功能几乎相同，就是转码新增 api，模拟 es6 环境，但实现方法完全不同。

#### babel-polyfill

```
# babel-polyfill 是针对全局环境的
# 调用 babel-polyfill 就会往 global 对象挂上 Promise 对象等，会污染模块的使用环境
"foobar".includes("foo")
```

#### babel-runtime + babel-plugin-transform-runtime

```
# babel-runtime 是 模拟 ES2015 环境，包含各种分散的 polyfill 模块。
# eg: 在自己的模块里单独引入 promise(自己手动引入 helper 函数)
import 'babel-runtime/core-js/promise'

问题：1. 不方便。 2. 在代码中中直接引入 helper 函数，意味着不能共享，造成最终打包出来的文件里有很多重复的 helper 代码(编译后的代码体积变大)
解决：使用 babel-plugin-transform-runtime 模块

# babel-runtime 不能转码实例方法, 如'hello'.includes('h') 只能通过 babel-polyfill 来转码
```

#### 总结

```
# 实际项目还是需要使用 babel-polyfill (babel-runtime 不能转码实例方法)
# 自己写的 js 库(模块)可以使用 babel-runtime，在实际项目中使用这些库和工具，需要该项目本身提供 polyfill
```

### node debug

```
V8 Inspector 集成允许将 Chrome 开发工具通过 Chrome Debugging Protocol 连接到 Node.js 实例以进行调试和分析。

V8 Inspector 可以通过在启动 Node.js 应用程序时传递 --inspect 标志来启用。 也可以提供具有该标志的自定义端口，例如， --inspect=9222 将接受端口9222上的 DevTools 连接。

如需在应用的第一行代码添加断点，在 --inspect 之外增加 --debug-brk 标志。

`node --debug-brk --inspect app.js`

所有代码都运行在模块作用域，不会污染全局作用域。
模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存。
模块加载的顺序，按照其在代码中出现的顺序。
```

### mongoose

```
// model 调用 Schema.statics = {}
// docment(实例，即 find --> doc) 调用 Schema.methods={}

String, Number, Buffer, and ObjectId are supported _id types for ref.

Schema对应着表定义，instance对应着表记录，Model是干啥的？
可将Model理解成Schema和instance之间的粘合剂，Schema生Model，Model生instance。然而从日常用途来看，主要是通过Model来增删改查。
一个instance就是一条数据，也就是collection中的一个document。

Schema中如果定义了虚拟属性，那么该属性将不写入数据库。写入数据库的还是原来的属性

数据库实际存储的是 null, 不是"null"
db.tags.find({"name":"null"}) ==> null (typeof null "object")
db.tags.find({"name":null}) ==> doc
```

#### mongo shell

```
db.help()
db.resetError() # 清除错误记录
show dbs
use vblog #创建或切换数据库
db.stats() # 当前 db 状态
db.dropDatabase() # return { "dropped" : "blog", "ok" : 1 }
db.repairDatabase() # 修复当前数据库
db.copyDatabase("mydb", "temp", "127.0.0.1") # 将本机的mydb的数据复制到temp数据库中
show tables(show collections)
db.tags.help()
db.tags.drop()
db.tags.insert({})
db.tags.save(<document>) #插入文档(不指定_id), 更新文档(指定_id)
db.tags.update(<query>, <update>, {multi:true})
db.tags.find({}).pretty()
db.tags.find().sort({name: 1}).skip(10).limit(5)

执行 db.tags.remove({}) 输出: WriteResult({ "nRemoved" : 2 }) //删除了两个 doc
> db.tags.remove({"name": "43"})
WriteResult({ "nRemoved" : 1 }) 删了一个
> db.tags.remove({"name": "43"})
WriteResult({ "nRemoved" : 0 }) 删了0个

db.createCollection("tags") #创建 tags 集合

#用户管理
show users
use admin
db.createUser({user: "adminUser", pwd: "adminPass", roles: [{role: "userAdminAnyDatabase", db: "admin"}]}) #超级管理员
db.auth("adminUser", "adminPass") # 测试登录, 输出 1 表示验证成功
db.removeUser("userName")

use vblog
db.createUser({user: "admin", pwd: " admin123456", roles:[{role: "readWrite", db: "vblog"}]})
# 在客户端连接时，指定用户名，密码，db名称
> mongo --port 27017 -u "adminUser" -p "adminPass" --authenticationDatabase "admin"

which mongod
/usr/local/bin/mongod

brew update
brew install mongodb --with-openssl # with TLS/SSL Support
sudo mkdir -p /data/db #mongodb默认存放数据库的目录为/data/db
sudo chmod -R 777 /data/db #赋予目录读写权限
mongod --config /usr/local/etc/mongod.conf # 默认的启动命令
# 推荐的做法，先添加MongoDB服务的PATH (解决 PATH 配置问题)
vim ~/.bash_profile
#添加如下两行代码,注意brew安装的路径
export MONGO_PATH=/usr/local/Cellar/mongodb/3.4.4/;
export PATH=$PATH:$MONGO_PATH/bin;
#通过自定义数据库路径和日志路径启动MongoDB
mongod --dbpath projectpath/data/db --logpath projectpath/log/mongo.log

#监控
mongostat #mongodb 状态检测工具
mongotop

# 关系型数据库遵循的ACID原则
# (Atomicity) 原子性  (Consistency) 一致性  (Isolation) 独立性  (Durability) 持久性
```

#### mongodb date

```
mongoose 中 created_at 字段的默认值 Date.now (默认: 都是格林威治时间)
mongo中的date类型以UTC（Coordinated Universal Time）存储，就等于GMT（格林尼治标准时）时间。而系统时间使用的是GMT+0800时间，两者正好相差8个小时。并且日期类型使用ISO格式, 如 ISODate("2017-06-02T07:48:51.718Z")
Date.now只是一个函数，每次他调用的时候才会生成一个时间，Date.now()是传递的一个时间，一直都是这个. ISODate("2017-05-19T15:40:37.948Z")
now()方法返回自1970年1月1日 00:00:00 UTC到当前时间的毫秒数，类型为Number

Using Date.now method :  we get current timestamp as expected.
Using new Date() constructor : maybe bring unexpected results

new Date()
Sat May 20 2017 10:10:20 GMT+0800 (CST)

new Date().toString()
"Sat May 20 2017 10:11:13 GMT+0800 (CST)"

new Date().toUTCString()
"Sat, 20 May 2017 02:10:39 GMT"

+new Date()
1495246324725

Date.now()
1495247783610

- schema 增加选项 timestamps: true (mongoose assigns createdAt and updatedAt fields to your schema, the type assigned is Date)
- timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } (specify the timestamp fileds' names)
```

### curl(Client URL Library)

```bash
curl -i www.baidu.com #Include protocol headers in the output
curl -H "Accept: application/json" -H "Content-Type: application/json" www.baidu.com #Pass custom header LINE to server
curl www.baidu.com -o baidu.html #Write to FILE instead of stdout, 文件保存在 root(~)目录下
curl -O https://www.baidu.com/search/error.html #文件保存到本地并命名为 error.html
curl -X POST --data "name=Toy%20story&year=1995" https://example/movies #post 数据
curl -u username:password URL #访问授权页面
```

#### tree

```bash
tree -L 2 #层级数量
tree -a #显示所有层级
tree -d #只显示目录
tree -C #颜色显示
```

### Other

[patch 和 put 区别](https://segmentfault.com/q/1010000005685904)
PUT 是幂等的，而 PATCH 不是幂等的。幂等是一个数学和计算机学概念，在计算机范畴内表示一个操作执行任意次对系统的影响跟一次是相同。

默认状态 ctx.status = 200

#### node 版本管理

```
#版本格式：主版本号.次版本号.修订号
#版本号递增规则如下： 主版本号：当你做了不兼容的API 修改， 次版本号：当你做了向下兼容的功能性新增， 修订号：当你做了向下兼容的问题修正。
*: 任意版本
1.1.0: 指定版本
~1.1.0: >=1.1.0 && < 1.2.0
^1.1.0: >=1.1.0 && < 2.0.0

npm i package #默认安装 ~, 升级新特性并兼容 API
```

#### mac 检查端口占用

```bash
# 第一种方式
netstat -an | grep port_id
# 第二种方式
lsof -i:port_id
#-i参数表示网络链接，该命令会同时列出PID，方便kill
#sudo lsof -i tcp:port
#sudo kill -9 PID
```

#### jwt

```
Payload(载荷)
iss: 该JWT的签发者
sub: 该JWT所面向的用户
aud: 接收该JWT的一方
exp(expires): 什么时候过期，这里是一个Unix时间戳
iat(issued at): 在什么时候签发的

expiresIn, notBefore, audience, subject, issuer
exp, nbf, aud, sub, iss
```

### favicon

对图标文件 favicon.ico 的请求是由浏览器发起的, 无法过滤,可通过自定义响应处理或 koa-favicon 中间件出理
