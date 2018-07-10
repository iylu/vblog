import mongoose from 'mongoose'
const Article = mongoose.model('Article')
const Tag = mongoose.model('Tag')

class tagController {
  /**
   * Get all tags('name' field to return)
   * @static
   * @param {any} ctx
   * @param {any} next
   */
  static async getTags(ctx, next) {
    const tagNameList = await Tag.find({}).select('name')
    ctx.status = 200
    ctx.body = { success: true, data: tagNameList }

    await next()
  }

  /**
   * Create tag
   * @static
   * @param {any} ctx
   * @param {any} next
   * Content-Type: application/x-www-form-urlencoded
   * Content-Type: application/json; charset=utf-8
   */
  static async createTag(ctx, next) {
    try {
      const tagName = ctx.request.body.name
      if (!tagName || !tagName.length) {
        ctx.throw(400, 'tagName is required')
      }
      // doc may be null if no document matched
      const tag = await Tag.findOne({ name: tagName })
      if (tag) {
        ctx.status = 200
        ctx.body = {
          success: true,
          data: { id: tag._id, name: tag.name }
        }
      } else {
        // create a new tag
        const newTag = new Tag({
          name: tagName
          // articles: [ObjectId]
        })
        const result = await newTag.save()
        ctx.status = 200
        ctx.body = {
          success: true,
          data: {
            id: result._id,
            name: result.name
          }
        }
      }
    } catch (err) {
      ctx.throw(422, err) // 请求格式正确，但是由于含有语义错误，无法响应
    }

    await next()
  }

  /**
   * Get articles by tag
   * @static
   * @param {any} ctx
   * @param {any} next
   * The method is equivalent to articleController.articleList
   */
  static async getArticlesByTag(ctx, next) {
    try {
      const tagName = ctx.params.name
      let postsList = []
      const tags = await Tag.findOne({ name: tagName }).populate({
        path: 'articles',
        select: '_id title meta abstract tags',
        options: {
          limit: 20
        }
      })
      // const tags = await Tag.findOne({ name: tagName })
      // [] or [doc]
      // if (tags[0] && Array.isArray(tags[0])) {
      tags.articles.forEach(article => {
        postsList.push({
          _id: article._id,
          title: article.title,
          abstract: article.abstract,
          meta: article.meta,
          tags: article.tags
        })
      })
      // }
      ctx.status = 200
      ctx.body = { success: true, data: postsList }
    } catch (err) {
      ctx.throw(500, err)
    }

    await next()
  }

  /**
   * Update tag name
   * @static
   * @param {any} ctx
   * @param {any} next
   */
  static async updateTag(ctx, next) {
    try {
      const tagName = ctx.params.name
      const newName = ctx.request.body.name
      // new tagName 不与已存在的 tagName 重名
      let tag = await Tag.findOne({ name: newName })

      if (!tag) {
        // update 返回文档的更新结果
        // findOneAndUpdate: return the found document
        tag = await Tag.findOneAndUpdate(
          { name: tagName },
          {
            $set: {
              name: newName
            }
          }
        )
        // cannot act on two things of the same "path" in the same update operation.  $pull $push $addToSet
        await Promise.all([
          tag && tag.save(), // update_at
          Article.updateMany(
            { tags: { $elemMatch: { name: tagName } } },
            {
              $push: { tags: { name: newName } }
            }
          ),
          Article.updateMany(
            { tags: { $elemMatch: { name: tagName } } },
            {
              $pull: { tags: { name: tagName } }
            }
          )
        ])
      }
      ctx.status = 200
      ctx.body = { success: true, data: tag }
    } catch (err) {
      ctx.throw(500, err)
    }

    await next()
  }

  /**
   * Delete tag
   * @static
   * @param {any} ctx
   * @param {any} next
   */
  static async deleteTag(ctx, next) {
    try {
      const tagName = ctx.params.name
      const doc = await Tag.findOne({ name: tagName })
      if (doc) {
        // update data of article before deleting the tag in batabse
        await Promise.all([
          Article.updateMany({}, { $pull: { tags: { name: tagName } } }),
          Tag.remove({ _id: doc._id }).exec()
        ])
      }
      ctx.status = 200
      ctx.body = { success: true }
    } catch (err) {
      // ctx.throw(404, 'tag name is invalid') // 404 err.name===NotFoundError
      ctx.throw(500, err) // 500 err.name===TypeError: Cannot read property '_id' of null
    }

    await next()
  }
}

export default tagController
