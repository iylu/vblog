<template>
  <section id="page-index">
    <article-summary v-for="(shortArticle, index) in articleList" :article="shortArticle" :key="index"></article-summary>
    <pagination :totalNum="totalNum" :currentPage="pageNum" :showPage="showPage" :perPage="pageSize" @changePage='changePage'></pagination>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import ArticleSummary from '@/components/front/ArticleSummary'
import Pagination from '@/components/front/Pagination'

export default {
  name: 'Home',
  metaInfo() {
    return {
      title: '首页'
    }
  },
  components: {
    ArticleSummary,
    Pagination
  },
  computed: {
    ...mapState({
      articleList: state => state.front.articleList,
      showPage: state => state.front.showPage,
      pageNum: state => state.front.pageNum,
      pageSize: state => state.front.pageSize,
      totalNum: state => state.front.totalNum,
    })
  },
  created() {
    this.fetchArticleList(this.$store, this.$route)
  },
  methods: {
    changePage(cur) {
      this.$router.push('/page/' + cur)
      this.fetchArticleList(this.$store, this.$route)
    },
    fetchArticleList(store, { query, params }) {
      let pageNum = ~~query.pageNum || ~~params.number || 1
      let pageSize = ~~query.pageSize || 10
      return store.dispatch('getArticleList', { pageNum, pageSize })
    }
  }
}

</script>
