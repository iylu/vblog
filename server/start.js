const isProd = process.env.NODE_ENV === 'production'

if (!isProd) {
  // 开发环境使用 babel/register 更快地在运行时编译
  require('babel-core/register')({
    presets: ['env', 'stage-0']
  })
}
require('babel-polyfill')

module.exports = require('./src/app')
