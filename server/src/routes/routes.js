import Article from '../controllers/article'
import Tag from '../controllers/tag'
import User from '../controllers/user'
import mw from '../middlewares'

// prefix /api
module.exports = function(router) {
  // index(article)
  router
    .get('/articles', Article.articleList)
    .post('/articles', mw.verifyToken, Article.createArticle)
    .get('/articles/:code', Article.getArticle)
    .patch('/articles/:code', mw.verifyToken, Article.updateArticle)
    .delete('/articles/:code', mw.verifyToken, Article.deleteArticle)
    .get('/', Article.articleList)
    .get('/list', Article.articleList) //pageNum=1&pageSize=8
    .get('/page/:number', Article.articleList) // 分页接口

  // user 目前是单用户
  router
    // .post('/users/signup', User.signup) // 注册 yes
    .post('/users/signin', User.initUser, User.signin) // 登录 yes
    // .get('/users/:id', mw.verifyToken, User.getUser) //yes
    .patch('/users/:id', mw.verifyToken, User.updateUser) //yes
  // .del('/users/:id', mw.verifyToken, User.deleteUser) //yes

  // tag
  router
    .get('/tags', Tag.getTags)
    .post('/tags', mw.verifyToken, Tag.createTag)
    .get('/tags/:name', Tag.getArticlesByTag) //The method is equivalent to articleController.articleList(tag=vue)
    .patch('/tags/:name', mw.verifyToken, Tag.updateTag)
    .delete('/tags/:name', mw.verifyToken, Tag.deleteTag)

  // archive
  router.get('/archive', Article.getTimeLine)
  // search
  router.get('/search', Article.searchHandle) //q=node.js
}
