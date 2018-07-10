<template>
  <div id="page-article">
    <article class="detail">
      <article-header :article="article"></article-header>
      <div class="detail-content" v-html="markedContent"></div>
    </article>
    <template v-if="shouldShow">
      <p>本文链接：
        <a :href="`${siteURL}'/article/${article._id}`">{{siteURL}}/article/{{article._id}}</a>
      </p>
      <p>--
        <abbr title="End of File">EOF</abbr>--</p>
      <div class="article-info">
        <p>
          <span>发表于
            <i>{{article.meta.created_at}}</i>
          </span>
          <router-link v-for="tag in article.tags" :to="{name:'tagPager', params: { tagName: tag }}" :data-tag="tag" :key="tag.name">
            <code class="notebook">{{tag}}</code>
          </router-link>
          <span>最后修改于
            <i>{{article.meta.updated_at}}</i>
          </span>
        </p>
      </div>
      <nav class="pagination">
        <router-link v-if="typeof prev._id !== 'undefined'" :to="{name:'article', params: {code: prev._id }}" class="prev">&laquo {{ prev.title }}

        </router-link>
        <router-link v-if="typeof next._id !== 'undefined'" :to="{name:'article', params: {code: next._id }}" class="next">{{ next.title }} &raquo

        </router-link>
      </nav>
      <div class="comments" v-if="article.allowComment === true && commentName !== ''">
        <disqus :shortname="commentName"></disqus>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import config from '@/config'
import marked from 'marked';
import hlj from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
import mixin from '@/utils/disqus'
import Disqus from '@/components/front/Disqus'
import ArticleHeader from '@/components/front/ArticleHeader.vue'

export default {
  name: 'Article',
  metaInfo: {
    title: '文章'
  },
  components: {
    Disqus,
    ArticleHeader
  },
  // 详见 https://router.vuejs.org/en/advanced/data-fetching.html
  // 组件内的钩子
  // beforeRouteEnter(to, from, next) {
  //   // vm.fetchArticle(vm)
  //   // axios
  //   //   .get(`/api/articles/${code}`)
  //   //   .then(response => response.data)
  //   next(vm => {
  //     vm.fetchArticle(vm)
  //   })
  // },
  // beforeRouteUpdate(to, from, next) {
  //   this.$store.commit('SET_ARTICLE', null)
  //   next()
  // },
  created() {
    this.fetchArticle(this)
  },
  data() {
    return {
      shouldShow: false,
      siteURL: config.app.siteURL
    }
  },
  computed: {
    ...mapGetters([
      'article', 'prev', 'next'
    ]),
    markedContent() {
      marked.setOptions({
        highlight: function (code) {
          return hlj.highlightAuto(code).value;
        }
      })
      const markedString = marked(
        this.article.content || '',
        { sanitize: true }
      )
      return markedString
    }
  },
  methods: {
    fetchArticle(vm) {
      let _id = vm.$route.params.code
      return vm.$store.dispatch('getArticleById', _id)
    }
  }
}
</script>

<style>
.detail-content {
  overflow-y: auto
}
</style>
