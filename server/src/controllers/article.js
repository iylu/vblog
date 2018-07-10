import mongoose from 'mongoose'
const Article = mongoose.model('Article')
const Tag = mongoose.model('Tag')
import { truncate } from '../helpers/util'

class articleController {
  /**
   * Get all articles(optional condition)
   * @static
   * @param {any} ctx
   * @param {any} next
   */
  static async articleList(ctx, next) {
    try {
      const tagName = ctx.query.tag // 单个标签名查询
      const limit = ~~ctx.query.pageSize || 10 // number of posts per page
      const page = ~~ctx.query.pageNum || ~~ctx.params.number || 1
      const skip = limit * (page - 1)
      let findOpt = {}

      if (tagName) {
        const doc = await Tag.findOne({ name: tagName })
        const tagId = doc._id
        Object.assign(findOpt, {
          tags: {
            $all: [tagId]
          }
        })
      }
      // 文章列表 文章总数
      const { articleList, totalNumber } = {
        articleList: await Article.find(findOpt)
          .select('-content')
          .sort({ 'meta.created_at': -1 })
          .limit(limit)
          .skip(skip),
        totalNumber: await Article.find(findOpt).count()
      }

      const totalPage = Math.ceil(totalNumber / limit) // 文章页数

      ctx.status = 200
      ctx.body = {
        success: true,
        data: {
          articleList,
          totalNumber,
          limit,
          totalPage,
          page
        }
      }
    } catch (err) {
      ctx.throw(500, err)
    }

    await next()
  }

  /**
   * Get article
   * @static
   * @param {any} ctx
   * @param {any} next
   */
  static async getArticle(ctx, next) {
    const id = ctx.params.code
    // const article = await Article.findById(id).populate('tags', 'name')
    const article = await Article.findById(id)
    if (article) {
      ctx.status = 200
      ctx.body = {
        success: true,
        data: article
      }
    }

    await next()
  }

  // title content abstract 重复性判断
  /**
   * Create article
   * @static
   * @param {any} ctx
   * @param {any} next
   */
  static async createArticle(ctx, next) {
    try {
      const { title, content } = ctx.request.body
      if (!title || !content) {
        ctx.throw(400, 'title, content are required')
      }
      let abstract = ctx.request.body.abstract || truncate(content) || null
      let tags = ctx.request.body.tags // array [{"name": "koa2"}]

      const article = new Article({
        title,
        content,
        abstract,
        tags
      })
      const createResult = await article.save()

      tags.forEach(async tag => {
        let doc = await Tag.findOne({ name: tag.name })
        if (doc) {
          doc.articles.push(article._id)
        } else {
          // create new tag
          doc = new Tag({ name: tag.name, articles: [article._id] })
        }
        await doc.save()
      })

      console.log('文章创建成功')
      ctx.body = {
        success: true,
        data: createResult
      }
    } catch (err) {
      console.error(err)
      ctx.throw(500)
    }

    await next()
  }

  /**
   * Update article
   * @static
   * @param {any} ctx
   * @param {any} next
   */
  static async updateArticle(ctx, next) {
    try {
      const id = ctx.params.code
      const { title, content } = ctx.request.body
      if (!title || !content) {
        ctx.throw(400, 'title, content are required')
      }
      let abstract = ctx.request.body.abstract || truncate(content) || null
      let tags = ctx.request.body.tags // array [{"name": "koa2"}]
      // tags unique
      // return the modified document rather than the original.
      const resultDoc = await Article.findByIdAndUpdate(
        id,
        {
          $set: {
            title,
            content,
            abstract,
            tags
          }
        },
        {
          new: true
        }
      )
      // 数据库中已经存在更新后的文档, 调用 save 后的方法仅仅为了更新 update_at 字段
      await resultDoc.save() // Call the middleware to update the field of meta.update_at

      // 暴力 删除 原来 tag.articles 下引用的该文章 id
      await Tag.updateMany({}, { $pull: { articles: resultDoc._id } })
      tags.forEach(async tag => {
        let doc = await Tag.findOne({ name: tag.name })
        if (doc) {
          doc.articles.push(resultDoc._id)
        } else {
          doc = new Tag({ name: tag.name, articles: [resultDoc._id] })
        }
        await doc.save()
      })

      ctx.status = 200
      ctx.body = {
        success: true,
        data: resultDoc
      }
    } catch (err) {
      ctx.throw(500, err)
    }

    await next()
  }

  /**
   * Delete article
   * @static
   * @param {any} ctx
   * @param {any} next
   */
  static async deleteArticle(ctx, next) {
    try {
      const id = ctx.params.code
      // const article = await Article.findByIdAndRemove(id)
      const doc = await Article.findById(id)
      await Promise.all([
        Tag.updateMany({}, { $pull: { articles: doc._id } }),
        Article.remove({ _id: doc._id }).exec()
      ])
      ctx.status = 200
      ctx.body = { success: true }
    } catch (err) {
      if (err.name === 'CastError') {
        ctx.throw(404)
      }
      console.error(err)
      ctx.throw(500)
    }

    await next()
  }

  /**
   * Get article list(@articleList)
   * @static
   * @param {any} ctx
   * @param {any} next
   */
  static async getTimeLine(ctx, next) {
    const articleTimeLine = await Article.find(
      {},
      { _id: 1, title: 1, 'meta.created_at': 1 }
    ).sort({ 'meta.created_at': -1 })
    ctx.status = 200
    ctx.body = {
      success: true,
      data: articleTimeLine
    }

    await next()
  }

  /**
   * search article(According to the title)
   * @static
   * @param {any} ctx
   * @param {any} next
   */
  static async searchHandle(ctx, next) {
    try {
      const queryContent = ctx.query.q
      const words = new RegExp(queryContent, 'i')
      const articleEntities = await Article.find({})
      let filtedArticles = articleEntities.filter(article => {
        let post = article.toObject()
        return (
          post['title'].search(words) !== -1 ||
          post['abstract'].replace(/<.*?>/g, '').search(words) !== -1 ||
          post['content'].replace(/<.*?>/g, '').search(words) !== -1
        )
      })
      ctx.status = 200
      ctx.body = {
        success: true,
        data: filtedArticles
      }
    } catch (err) {
      ctx.throw(500, err)
    }

    await next()
  }
}

export default articleController
