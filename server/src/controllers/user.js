import mongoose from 'mongoose'
const User = mongoose.model('User')
import config from '../config/default'
import { createToken } from '../middlewares/token.js'

class userController {
  static async signup(ctx, next) {
    try {
      const { email, password } = ctx.request.body
      const user = new User({
        email,
        password,
        token: email
      })
      /*const count = await User.find({}).count()
      if(count === 1) {
        ctx.throw(400, '单用户系统中已存在用户该')
      }*/
      const doc = await User.findOne({
        email: user.email.toLowerCase()
      })
      if (doc) {
        // 用户名已存在，不能注册
        ctx.throw(400, 'email is existent')
      } else {
        // 用户注册
        const userdoc = await user.save()
        ctx.status = 200
        ctx.body = {
          success: true,
          data: {
            id: userdoc._id,
            email: userdoc.email,
            created_at: userdoc.meta.created_at,
            token: userdoc.token
          }
        }
        console.log('注册成功')
      }
    } catch (err) {
      ctx.throw(500, err) // 'user signup failed'
    }

    await next()
  }

  static async signin(ctx, next) {
    try {
      const { email, password } = ctx.request.body
      const user = new User({
        email,
        password,
        token: email
      })
      const doc = await User.findOne({
        email: user.email.toLowerCase()
      })
      if (!doc) {
        // ctx.status = 404
        ctx.body = {
          info: 'email is inexistent!'
        }
        return
      }
      doc.comparePassword(user.password, function(isMatch) {
        if (isMatch) {
          ctx.status = 200
          ctx.body = {
            success: true,
            data: {
              id: doc._id,
              email: doc.email,
              updated_at: doc.meta.updated_at,
              token: doc.token
            }
          }
          console.log('登录成功')
        } else {
          // ctx.status = 403
          ctx.body = {
            success: false,
            msg: 'password is wrong!'
          }
        }
      })
    } catch (err) {
      ctx.throw(500, err) // 'user signin failed'
    }

    await next()
  }

  static async initUser(ctx, next) {
    // find []
    // findOne doc
    let user = await User.find({})
    if (user.length === 0) {
      user = new User({
        email: config.admin.email,
        password: config.admin.pwd,
        token: config.admin.email
      })
      await user.save()
      console.log(`初始化用户成功: ${user}`)
    } else {
      // just for update token(expires)
      // 只能更新 token, 防止配置的默认密码 覆盖 修改后的密码
      await User.findOneAndUpdate(
        {},
        {
          token: createToken(config.admin.email)
        },
        { new: true }
      )
    }
    await next()
  }

  /**
   * Get user
   * @static
   * @param {any} ctx
   * @param {any} next
   */
  static async getUser(ctx, next) {
    try {
      const id = ctx.params.id
      const doc = await User.findById(id)
      if (!doc) {
        ctx.throw(404, 'user id is invalid')
      }
      ctx.status = 200
      ctx.body = {
        success: true,
        data: {
          id: doc._id,
          email: doc.email,
          updated_at: doc.meta.updated_at,
          token: doc.token
        }
      }
    } catch (err) {
      ctx.throw(500, err)
    }

    await next()
  }

  /**
   * Update user
   * @static
   * @param {any} ctx
   * @param {any} next
   */
  static async updateUser(ctx, next) {
    try {
      const id = ctx.params.id
      const { email, password } = ctx.request.body
      const userInfo = {
        email,
        password,
        token: email
      }
      const doc = await User.findById(id)
      if (doc) {
        // patch update 'password'
        doc.password = password
        doc.token = email || doc.email

        await doc.save()
        ctx.status = 200
        ctx.body = {
          success: true,
          data: {
            id: doc._id,
            email: doc.email,
            updated_at: doc.meta.updated_at,
            token: doc.token
          }
        }
      } else {
        ctx.status = 400
        ctx.body = {
          success: false,
          msg: 'password update failed!'
        }
      }
    } catch (err) {
      if (err.name === 'CastError') {
        ctx.throw(404, 'user id is invalid')
      }
      ctx.throw(500, err)
    }

    await next()
  }

  /**
   * delete user
   * @static
   * @param {any} ctx
   * @param {any} next
   */
  static async deleteUser(ctx, next) {
    try {
      const id = ctx.params.id
      const doc = await User.findByIdAndRemove(id)
      ctx.status = 200
      ctx.body = {
        success: true,
        data: {
          id: doc._id,
          email: doc.email
        }
      }
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        ctx.throw(404, 'deleteUser: user id is invalid')
      }
      ctx.throw(500, err)
    }

    await next()
  }
}

export default userController
