import mongoose from 'mongoose'
import config from '../config/default'

mongoose.Promise = global.Promise = require('bluebird')
mongoose.connect(
  config.mongodb.url,
  { useNewUrlParser: true }
)

mongoose.connection.on('connected', function() {
  console.info('Mongoose connection open to ' + config.mongodb.url)
})
mongoose.connection.on('error', function(err) {
  console.error('Mongoose connection error: ' + err)
})
mongoose.connection.on('disconnected', function() {
  console.info('Mongoose connection disconnected')
})

import UserSchema from './user'
import ArticleSchema from './article'
import TagSchema from './tag'

// Mongoose by default produces a collection name by passing the model name to the utils.toCollectionName method.
const Models = {
  User: mongoose.model('User', UserSchema),
  Article: mongoose.model('Article', ArticleSchema),
  Tag: mongoose.model('Tag', TagSchema)
}

export default Models

// mongo: 进入repl交互环境 mongodb shell
// cd /usr/local/Cellar/mongodb/4.0.0/bin && ./mongod  启动mongodb   27017
