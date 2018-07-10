<template>
  <div class="front">
    <app-header></app-header>
    <div class="main">
      <transition name="fade" mode="out-in">
        <router-view keep-alive></router-view>
      </transition>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppHeader from '@/components/front/Header.vue'
import AppFooter from '@/components/front/Footer.vue'

export default {
  components: {
    AppHeader,
    AppFooter
  },
  name: 'front-entry',
  metaInfo() {
    // const {
    //   title: { value: title },
    //   description: { value: description },
    //   keywords: { value: keywords },
    //   logoUrl: { value: logoUrl },
    //   faviconUrl: { value: favicon }
    // } = this.siteInfo
    return {
      // if no subcomponents specify a metaInfo.title, this title will be used
      title: 'front',
      // all titles will be injected into this template
      titleTemplate: "%s | lu's Programming Blog",
      htmlAttrs: {
        lang: 'zh-CN'
      },
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no'
        },
        { vmid: 'keywords', name: 'keywords', content: 'vue2 blog' },
        { vmid: 'description', name: 'description', content: 'vue2博客项目' }
      ],
      link: [
        { rel: 'shortcut icon', href: '/static/favicon.png' },
        { rel: 'apple-touch-icon', href: '/static/favicon.png' },
      ],
      bodyAttrs: {
        'data-mode': 'blog'
      },
      noscript: [
        { innerHTML: 'This website requires JavaScript.' }
      ]
    }
  }
}
</script>

<style lang="scss">
// get base css
@import '../../assets/style/normalize.css';
@import '../../assets/style/font-awesome.css';
@import '../../assets/style/global.scss';

.container {
  position: relative;
}

.main {
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0 10px;
  max-width: 800px;
  position: relative;
  min-height: 400px;
}
</style>
