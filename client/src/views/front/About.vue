<template>
  <div id="page-about">
    <div>
      <h2>vblog</h2>
      <p>一个全栈项目</p>
      <h2>技术栈</h2>
      <p>本站客户端采用 Vue2 全家桶, 服务端采用 koa2 + mongoDB 搭建</p>
      <p>主要功能包括: 后台登录, 注册, 管理, 标签, 文章, 支持 markdown 语法编辑, 支持代码高亮</p>
      <p>主要技术栈: vue2, vue-router, vuex2, axios, element ui, koa2, mongoose, pm2, nginx</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  metaInfo: {
    // title Property Maps to the inner-text value of the <title> element.
    // The value of title will be injected into the %s placeholder in titleTemplate before being rendered
    // title will be injected into parent titleTemplate
    title: '关于',
    meta: [
      { vmid: 'keywords', name: 'keywords', content: 'technology stack' },
      { vmid: 'description', name: 'description', content: '关于' }
    ]
  }
}
</script>
