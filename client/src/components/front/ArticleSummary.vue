<template>
  <article class="blog">
    <article-header :article="article" :isCenter="isCenter" :enableClick="enableClick"></article-header>
    <div class="content" v-html="article.abstract"></div>
    <div style="text-align:right;">
      <router-link :to="{path: `/articles/${article._id}`}">阅读全文>></router-link>
    </div>
  </article>
</template>

<script>
import ArticleHeader from './ArticleHeader.vue'

export default {
  name: 'article-summary',
  props: {
    article: Object
  },
  data() {
    // 文章摘要(标题非居中,标题可点击)
    return {
      isCenter: false,
      enableClick: true
    }
  },
  components: {
    ArticleHeader
  }
}
</script>
