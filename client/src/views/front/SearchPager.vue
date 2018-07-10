<template>
  <section id="page-searchPager">
    <h1 class="intro">搜索
      <a href="javascript:void(0)">{{$route.query.q}}</a>的相关内容</h1>
    <article-summary v-for="(shortArticle, index) in articleList" :article="shortArticle" :key="index"></article-summary>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ArticleSummary from '@/components/front/ArticleSummary'

export default {
  name: 'SearchPager',
  metaInfo() {
    return {
      title: '搜索'
    }
  },
  components: {
    ArticleSummary
  },
  computed: {
    ...mapGetters([
      'articleList',
    ])
  },
  created() {
    // this.getListBySearch(this.$route.query.q)
    this.$store.dispatch('getListBySearch', this.$route.query.q)
  },
  methods: { ...mapActions(['getListBySearch']) }
}
</script>
