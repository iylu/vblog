import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
import pangu from 'pangu' //中英文数字符号之间加空格

// schema表 ref model
const ArticleSchema = new Schema(
  {
    title: String,
    abstract: String,
    content: String,
    // tags: [{ type: ObjectId, ref: 'Tag' }],
    tags: [], // [{"name": "koa2"}]
    meta: {
      created_at: {
        type: Date,
        default: Date.now()
      },
      updated_at: {
        type: Date,
        default: Date.now()
      }
    }
  },
  {
    versionKey: false
    // timestamps: true
  }
)
ArticleSchema.set('toObject', { getters: true })

ArticleSchema.pre('save', function(next) {
  this.title = pangu.spacing(this.title)
  if (this.isNew) {
    this.meta.created_at = this.meta.updated_at = Date.now()
  } else {
    this.meta.updated_at = Date.now() // donot use Date.now
  }

  next()
})

export default ArticleSchema
