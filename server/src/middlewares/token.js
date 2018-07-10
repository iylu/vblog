import jwt from 'jsonwebtoken'
import config from '../config/default'

export const createToken = name => {
  const token = jwt.sign(
    {
      name: name
    },
    config.jwt.secret,
    {
      expiresIn: '100000s'
    }
  )
  return token
}

export const verifyToken = async (ctx, next) => {
  const authorization = ctx.get('Authorization') //ctx.request.headers['Authorization']

  if (!authorization) {
    ctx.throw(
      401,
      "Unauthorized: no token detected in http header 'Authorization'"
    )
  }
  const token = authorization.split(' ')[1]
  let tokenContent = null
  try {
    tokenContent = await jwt.verify(token, config.jwt.secret)
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      // token 过期处理
      // ctx.throw(401, 'the token is expired')
      ctx.status = 401
      ctx.body = {
        msg: 'the token is expired'
      }
      return
    }
    // ctx.throw(401, 'Unauthorized: invalid token')
    ctx.status = 401
    ctx.body = {
      msg: 'Unauthorized: invalid token'
    }
    return
  }

  console.log('鉴权成功...')
  await next()
}
