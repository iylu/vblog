### vue-router

```
// 结合 Vue 的 异步组件 和 Webpack 的 code splitting feature, 轻松实现路由组件的懒加载。
// require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
// alias @ 代表 src 根目录, 在 webpack.base.conf.js 可以查到
{
  path: '/tag/:name',
  name: 'tagPager',
  component(resolve) {
    require.ensure(['@/views/front/TagPager.vue'], () => {
      resolve(require('@/views/front/TagPager.vue'))
    })
  }
}
```

### vuex

```
count # 映射 this.count 为 store.state.count

doneCount: 'doneTodosCount' # 映射 this.doneCount 为 store.getters.doneTodosCount

Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象 # 即 {state, commit, dispatch, getters}
# context -> {state, commit, dispatch, getters}

mutations 非常类似于事件( 事件类型 (type) 回调函数 (handler) )   payload载荷通常为对象
add: 'increment' # 映射 this.add() 为 this.$store.commit('increment')
```

#### module

```
每个模块拥有自己的 state、action、mutation、getters
对于模块内部的 action，context.state 是局部状态，根节点的状态是 context.rootState
对于模块内部的 mutation 和 getters，接收的第一个参数是模块的局部状态
模块内部的 action、mutation 和 getters 仍然注册在全局命名空间，这样保证了多个模块能够响应同一 mutation 或 action。
可以通过添加前缀或后缀的方式隔离各模块，以避免名称冲突。

#使用缩写形式,无法对应模块,出现 undefined(完整形式: articleList: state => state.admin.articleList,)
mapState
#可以使用缩写形式,仍然对应模块内部字段
mapActions
mapGetters
mapMutations
```

### Other

v-for 遍历两层数组 template

先获取 post、patch、delete 请求返回的状态(不能直接修改 vuex 的 state); 若 success, 则修改 vuex state
(目前实现方式是 修改了数据之后 重新 get 一次数据，整体覆盖原来，浪费一次请求。万一请求失败，请求的数据要保存一份)

#### vue 项目中使用第三方 npm 包

支持服务端渲染, 避免在打包文件中多次复制相同的库文件

```js
// main.js(entry.js)
import moment from 'moment'
Object.definePrototype(Vue.prototype, '$moment', { value: moment })
// components
this.$moment().format('HH:mm')
```
