<template>
  <div id="page-tag" class="container">
    <div v-for="(name, index) in tags" class="tag" style="font-size:14px" :key="index">
      <router-link :to="`/tags/${name}`" :data-tag="name">{{name}}</router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Tag',
  metaInfo() {
    return {
      title: '标签'
    }
  },
  computed: {
    ...mapGetters([
      'tags'
    ]),
  },
  created() {
    this.getTagList()
  },
  methods: { ...mapActions(['getTagList']) }
}

</script>

<style scoped>
.container {
  display: flex;
  max-width: 600px;
  margin: 40px auto;

  align-items: baseline;
  flex-wrap: wrap;
}

.tag {
  display: block;
  margin: 14px 8px;
}
</style>
