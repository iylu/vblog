const fs = require('fs')
const path = require('path')

let config = {
  app: {
    port: process.env.PORT || 3010
  },
  mongodb: {
    url: 'mongodb://localhost:27017/vblog'
    //url: 'mongodb://user:password@sample.com:port/dbname'
  }
  /*mongodbSecret: {
    user: '',
    pwd: ''
  },
  jwt: {
    secret: 'secret'
  },
  admin: {
    email: '',
    pwd: ''
  }*/
}

if (fs.existsSync(path.join(__dirname, './private.js'))) {
  config = Object.assign(config, require('./private.js'))
}

module.exports = config
