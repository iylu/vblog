import sha1 from 'sha1'
import { createToken } from '../middlewares/token.js'
import mongoose from 'mongoose'
const Schema = mongoose.Schema

const UserSchema = new Schema(
  {
    email: {
      unique: true,
      type: String
    },
    password: String,
    token: String,
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

UserSchema.pre('save', function(next) {
  // this ==> document
  this.password = sha1(this.password)
  this.token = createToken(this.token)

  if (this.isNew) {
    this.meta.created_at = this.meta.updated_at = Date.now()
  } else {
    this.meta.updated_at = Date.now()
  }
  next()
})

UserSchema.methods = {
  comparePassword: function(candidatePassword, cb) {
    if (sha1(candidatePassword) === this.password) {
      cb(true)
    } else {
      cb(false)
    }
  }
}

export default UserSchema
