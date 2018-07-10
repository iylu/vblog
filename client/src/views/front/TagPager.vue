<template>
  <section id="page-tagPager">
    <h1 class="intro">标签
      <a href="javascript:void(0)" style="color:pink;">{{$route.params.name}}</a>下的文章</h1>
    <div v-if="tagPager.length === 0">该标签下暂无文章</div>
    <div v-else>
      <article-summary v-for="(shortArticle, index) in tagPager" :article="shortArticle" :key="index"></article-summary>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import ArticleSummary from '@/components/front/ArticleSummary'

export default {
  name: 'TagPager',
  metaInfo() {
    return {
      title: `标签 ${this.$route.params.name}`
    }
  },
  components: {
    ArticleSummary
  },
  computed: {
    ...mapState({
      tagPager: state => state.front.tagPager
    })
  },
  created() {
    this.getItems(this.$store, this.$route)
  },
  methods: {
    getItems(store, { params }) {
      let tagName = params.name
      return store.dispatch('getListByTag', tagName)
    }
  }
}
</script>
