import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
// NodeJS中的基本数据类型都属于Schema.Type

// The ref option is what tells Mongoose which model to use during population(填充)
const TagSchema = new Schema(
  {
    name: { type: String, unique: true },
    articles: [{ type: ObjectId, ref: 'Article' }],
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
  { versionKey: false }
)

TagSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.created_at = this.meta.updated_at = Date.now()
  } else {
    this.meta.updated_at = Date.now()
  }
  next()
})

// TagSchema.index({ name: 1 }, { unique: 1 }) // schema索引, 1是正序，-1是倒序

export default TagSchema
