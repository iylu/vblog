<template>
  <div class="admin">
    <el-row class="container">
      <el-row class="top">
        <el-col :span="19" :offset="1" class="top-left">
          <span>VBlog-ADMIN</span>
        </el-col>
        <el-col :span='4' class='top-right'>
          <el-dropdown menu-align='start'>
            <span class="el-dropdown-link" style="color:#c0ccda;cursor:pointer;font-weight:700">
              更多操作
              <i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="goHome">博客首页</el-dropdown-item>
              <el-dropdown-item @click.native="logout" divided>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
      <el-row class="center">
        <el-col :span="4" class="center-left">
          <el-menu theme="dark" router :default-active="curPath">
            <template v-for="(item,index) in routes">
              <el-submenu :key="`${index}`" :index="`${index}`">
                <template slot="title">
                  <i class="el-icon-menu"></i>{{item.meta.title}}</template>
                <el-menu-item v-for="(child, idx) in item.children" :index="`${item.path}/${child.path}`" :key="idx" v-if="child.meta.show || false">{{child.meta.title}}
                </el-menu-item>
              </el-submenu>
            </template>
          </el-menu>
        </el-col>
        <el-col :span='20' class="center-right">
          <el-row>
            <el-col :span='24' class="breadcrumb">
              <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{path:'/admin'}">{{rootPathName}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{curPathName}}</el-breadcrumb-item>
              </el-breadcrumb>
            </el-col>
          </el-row>
          <transition name="fade" mode="out-in">
            <router-view keep-alive></router-view>
          </transition>
        </el-col>
      </el-row>
    </el-row>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import routerConfig from '@/router/config'
export default {
  metaInfo() {
    return {
      // if no subcomponents specify a metaInfo.title, this title will be used
      title: 'admin',
      // all titles will be injected into this template
      titleTemplate: "%s | lu's Programming Blog",
      htmlAttrs: {
        lang: 'zh-CN'
      },
      meta: [
        { charset: 'utf-8' }
      ],
      noscript: [
        { innerHTML: 'This website requires JavaScript.' }
      ]
    }
  },
  data() {
    return {
      rootPathName: '内容管理',
      curPath: '/admin',
      curPathName: '文章列表',
      routes: []
    }
  },
  methods: {
    ...mapMutations(['LOGOUT']),
    goHome() {
      this.$router.push({ path: '/' });
    },
    logout() {
      this.$confirm('确认退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          //this.$store.commit('LOGOUT')
          this.LOGOUT()
          this.$router.push('/auth')
        })
    },
    loadMenuData() {
      this.routes = routerConfig.filter(route => {
        return route.meta ? (route.meta.show || false) : false
      })
    }
  },
  created() {
    this.loadMenuData()
    // console.log(this.$route) // 当前路径信息
  },
  watch: {
    '$route'(to, from) {
      this.curPath = to.path
      this.curPathName = to.meta.title
    }
  }
}
</script>

<style lang="css" scoped>
.container {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  background: #1f2d3d;
}

.top {
  height: 60px;
  line-height: 60px;
  color: #c0ccda;
  background: #1f2d3d;
}

.top-right {
  padding-right: 70px;
  text-align: right;
}

.center {
  position: absolute;
  top: 60px;
  right: 0;
  bottom: 0;
  left: 0;
  background: #324057;
}

.center-right {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  padding: 30px;
  overflow-y: scroll;
  background: #f1f2f7;
}

.breadcrumb {
  margin-bottom: 15px;
}
</style>
