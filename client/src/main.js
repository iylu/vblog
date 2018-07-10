import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex' // get vuex store config
import VueMeta from 'vue-meta' // get head meta
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import * as filters from './utils/filters'

Vue.config.productionTip = false

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.use(ElementUI)

Vue.use(VueMeta, {
  keyName: 'metaInfo', // the component option name that vue-meta looks for meta info on.
  attribute: 'data-vue-meta', // the attribute name vue-meta adds to the tags it observes
  ssrAttribute: 'data-vue-meta-server-rendered', // the attribute name that lets vue-meta know that meta info has already been server-rendered
  tagIDKeyName: 'vmid' // the property name that vue-meta uses to determine whether to overwrite or append a tag
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
