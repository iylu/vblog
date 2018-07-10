<template>
  <header class="header">
    <nav class="navigation" style="max-width:840px">
      <router-link to="/">
        <span class="logo">Blog</span>
      </router-link>
      <ul class="menu">
        <li v-for="(menu, index) in menus" :key="index" class="listItem">
          <router-link class="menuLink" :to="`/${menu.href}`" exact>{{menu.name}}</router-link>
        </li>
      </ul>
      <div class="search" :class="[search.searchInput ? 'active': '']">
        <input class="searchInput" ref="input" v-model="search.searchContent" v-on:keyup.enter="handleKeyDown" v-on:blur="handleBlur" placeholder="搜索标题或关键词" />
        <a href="javascript:;" @click="handleSearch">
          <i class="fa fa-search" aria-hidden="true"></i>
        </a>
      </div>
    </nav>
  </header>
</template>

<script>

export default {
  name: 'header',
  // data 属性, 计算属性, method函数, watcher函数, 选项/生命周期函数 不使用箭头函数
  data() {
    return {
      menus: [
        { href: '', name: '首页' },
        { href: 'tags', name: '标签' },
        { href: 'archive', name: '归档' },
        { href: 'about', name: '关于' },
        { href: 'auth', name: '管理' }
      ],
      search: {
        searchInput: false,
        searchContent: ''
      }
    }
  },
  methods: {
    handleKeyDown(e) {
      if (this.search.searchContent !== '') {
        this.doSearch();
      }
    },

    doSearch() {
      this.$router.push(`/search?q=${this.search.searchContent}`)
      this.$store.dispatch('getListBySearch', this.search.searchContent)
      // this.$router.push({ path: 'search', query: { q: this.search.searchContent }})
    },

    handleBlur(e) {
      setTimeout(() => { this.search.searchInput = false }, 300)
    },

    handleSearch(e) {
      if (!this.search.searchInput) {
        this.search.searchInput = true
        this.$refs.input.focus();
      } else {
        if (this.search.searchContent) {
          this.doSearch();
          setTimeout(() => { this.search.searchContent = '' }, 500);
        } else {
          this.search.searchInput = false
        }
      }
    }
  }
}

</script>

<style lang="scss" scoped>
.header {
  height: 64px;
  display: flex;
  align-items: center;
  border-bottom: 1px #e3e3e3 solid;

  @media (max-width: 480px) {
    height: 84px;
  }
}

.navigation {
  box-sizing: border-box;
  padding: 0 10px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  align-items: baseline;
  position: relative;

  @media (max-width: 480px) {
    display: block;
    padding: 0 20px;
  }
}

.logo {
  font-size: 24px;
  margin-right: 40px;
  color: #333;
  color: rgba(66, 165, 245, 0.67);
  transition: color 0.4s cubic-bezier(0.22, 0.61, 0.36, 1);
  &:hover {
    color: #42a5f5;
  }
}

.menu {
  padding: 0;
  margin: 0;
  display: flex;
  align-items: baseline;

  @media (max-width: 480px) {
    margin-top: 18px;
    justify-content: space-between;
    .listItem {
      margin: 0;
    }
  }

  .active {
    .menuLink {
      color: #42a5f5;
    }
  }
}

.listItem {
  list-style: none;
  margin-right: 20px;
}

.router-link-active {
  color: rgba(66, 165, 245, 0.67);
}

.search {
  right: 10px;
  bottom: 0;
  position: absolute;

  @media (max-width: 480px) {
    top: 6px;
    right: 22px;
  }

  >.searchInput {
    padding: 4px 0;
    outline: none;
    border: none;
    border-bottom: 1px #42a5f6 solid;
    transition: width 0.4s cubic-bezier(0.22, 0.61, 0.36, 1);
    width: 0;
  }

  &.active>.searchInput {
    padding-right: 20px;
    width: 120px;
  }
}
</style>
