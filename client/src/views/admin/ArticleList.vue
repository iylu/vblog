<template>
  <el-row>
    <el-row class="newPost">
      <el-col :span="24">
        <el-button size="small" type="primary" @click="add">创建文章</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span='24'>
        <el-table :data="articleList" style='width:100%' align="center" stripe v-loading="loading" element-loading-text="拼命加载中">
          <el-table-column type="index" width="90" label="序号"></el-table-column>
          <el-table-column prop="meta.created_at" min-width="140" label="创建时间"></el-table-column>
          <el-table-column prop="tags" min-width="140" label="标签信息"></el-table-column>
          <el-table-column prop="title" min-width="180" label="文章标题"></el-table-column>
          <el-table-column min-width="180" label="操作">
            <template slot-scope='scope'>
              <el-button size="small" @click="view(scope.row._id)">查看</el-button>
              <el-button size="small" type='primary' @click="modify(scope.row._id)">编辑</el-button>
              <el-button size="small" type='danger' @click="remove(scope.row._id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row v-show="pagination.totalPage > 1">
      <el-col :span="24" class="pagination">
        <!-- page-size 每页显示条目个数; total 总条目数; page-count 总页数; current-page 当前页数 -->
        <el-pagination layout="prev,pager,next" @current-change="switchPage" :total="pagination.totalNumber" :page-size="pagination.limit" style="float:right"></el-pagination>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      loading: false,
      orderPage: 1 // 导航当前的页数
    }
  },
  created() {
    // console.log(this.$route)
    this.loading = true
    this.getArticles({ pageNum: 1, pageSize: 10 }).then(() => { this.loading = false })
  },
  computed: {
    ...mapState({
      articleList: state => state.admin.articleList,
      pagination: state => state.admin.pagination
    })
  },
  methods: {
    ...mapActions(['getArticles', 'deleteArticle']),
    add() {
      this.$router.push({ path: '/admin/articles/editor' })
    },
    view(code) {
      this.$router.push({ path: `/admin/articles/editor/${code}` })
    },
    modify(code) {
      this.$router.push({ path: `/admin/articles/editor/${code}` })
    },
    remove(code) {
      this.$confirm('确认要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'waring'
      }).then(() => {
        this.deleteArticle(code).then((res) => {
          if (res.success) {
            this.$message.success('删除成功')
          } else {
            this.$message.error('删除失败')
          }
        }).then(() => {
          this.getArticles({ pageNum: this.orderPage })
        })
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    switchPage(val) {
      const currentPage = ~~val || 1
      this.orderPage = currentPage
      this.loading = true
      this.getArticles({ pageNum: currentPage }).then(() => { this.loading = false })
    },
  }
}
</script>

<style>
.newPost {
  padding: 10px 15px;
  background: #fff;
}

.pagination {
  padding: 10px;
  background: #fff;
}
</style>
