<template>
  <!-- 文章摘要 isCenter:false; enableClick:true -->
  <!-- 文章页 isCenter:true; enableClick:false -->
  <div :class="['header', isCenter ? 'center' : '' ]">
    <h1 class="title" v-if="enableClick">
      <router-link :to="`/articles/${article._id}`">{{article.title}}</router-link>
    </h1>
    <h1 class="title" v-else>{{article.title}}</h1>
    <div class="info">
      <span class="col">
        <i class="fa fa-calendar"></i>
        {{ (new Date(article.meta? article.meta.created_at: null)) | dateFormat }}
      </span>
      <span class="col">
        <i class="fa fa-tags"></i>
        <span v-for="(tagObj, index) in article.tags" class="tag" :key="index">
          &nbsp;
          <router-link class="tag underline" :to="`/tags/${tagObj.name}`">{{tagObj.name}}</router-link>
        </span>
      </span>
    </div>
  </div>
</template>

<script>
// isCenter enableClick 默认是文章页面的样式
export default {
  name: 'article-header',
  props: {
    article: Object,
    isCenter: {
      type: Boolean,
      default: true
    },
    enableClick: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  margin: 40px 10px 20px 10px;

  @media (max-width: 480px) {
    margin-top: 30px;
  }
}

.title {
  margin: 10px 0;
  color: #333;
  font-size: 24px;
  font-weight: normal;
}

.info {
  color: #888;
  font-size: 12px;
  line-height: 2.0;
}

.col>i {
  margin-right: 8px;
}

.col+.col::before {
  margin: 0 8px;
  content: '|';
}

.tag a {
  white-space: nowrap;
}

.tag:not(:last-child)::after {
  content: '、';
}

@media (min-width: 768px) {
  .center {
    text-align: center;
  }
}
</style>
