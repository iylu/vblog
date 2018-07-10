<template>
  <!--时间线-->
  <!--<h1 class="title">{{title}}</h1> 年份时间-->
  <div id="page-archive">
    <div v-for="(item, key, index) in archives">
      <h3>{{ key }} ({{item.length}})</h3>
      <ul>
        <li class="sub-item" v-for="subItem in item" :key="subItem.title">
          <router-link :to="`/articles/${subItem._id}`" :title="subItem.title">{{subItem.title}}
          </router-link>&nbsp;&nbsp;
          <span class="date">{{ (new Date(subItem.meta? subItem.meta.created_at: null)) | timeFormat }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Archive',
  metaInfo: {
    title: '归档'
  },
  computed: {
    ...mapState({
      archives: state => state.front.archives
    })
  },
  created: function () {
    this.fetchAchieves(this.$store)
  },
  methods: {
    fetchAchieves(store) {
      return store.dispatch('getArchive')
    }
  }
}
</script>

<style>
.sub-item {
  line-height: 30px;
}
</style>
