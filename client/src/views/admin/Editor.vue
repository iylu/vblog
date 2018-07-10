<template>
  <el-row>
    <el-col :span="24">
      <el-form ref="addArticle" :model="article" :rules="createRules" v-loading="loading">
        <el-row style="margin-top:20px">
          <el-col :span='10' :push="1">
            <el-form-item label="文章标题" label-width="90px" prop="title">
              <el-input v-model="article.title" style="width:260px" placeholder="请在此处输入标题"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" :push="1">
            <el-form-item label="标签" label-width="90px">
              <el-tag style="margin-right:10px;" v-for="tag in article.tags" :key="tag.name" :closable="true" :close-transition="false" @close="handleClose(tag)">
                {{tag.name}}
              </el-tag>
              <el-input class="input-new-tag" v-if="tagInputVisible" v-model="tagInputValue" ref="saveTagInput" size="mini" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="margin-top:20px">
          <el-col :span='12'>
            <el-form-item class="show" prop="content">
              <el-input type="textarea" v-model="article.content" :rows="25" placeholder="请在此处编辑文章"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='12'>
            <div class="markedBox" v-html="markedContent"></div>
          </el-col>
        </el-row>
        <el-form-item style="padding:20px 20px 0 0">
          <el-button type="primary" style="float:right;" size='small' @click="save">保存</el-button>
          <el-button style="float:right;margin-right:10px" size='small' @click="cancle">返回</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import { mapActions } from 'vuex'
import marked from 'marked';
import hlj from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
export default {
  metaInfo: {
    title: '编辑查看'
  },
  data() {
    return {
      loading: false,
      tagInputVisible: false,
      tagInputValue: '',
      article: {
        title: '',
        tags: [],
        content: ''
      },
      createRules: {
        title: [
          { required: true, message: '请填写标题', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    markedContent() {
      marked.setOptions({
        highlight: function (code) {
          return hlj.highlightAuto(code).value
        }
      })
      const markedString = marked(
        this.article.content || '',
        { sanitize: true }
      )
      return markedString
    }
  },
  created() {
    const code = this.$route.params.code
    if (code) {
      this.loading = true
      return this.getArticle(code).then((article) => {
        this.article = article
        this.loading = false
      })
    }
  },
  // beforeRouteEnter(to, from, next) {
  //   if (to.name === 'newPost') {
  //   } else {
  //     next(vm => {
  //       // 通过 `vm` 访问组件实例
  //       vm.getArticle(this.$route.params.code).then((article) => { this.article = article })
  //     })
  //   }
  // }
  methods: {
    ...mapActions(['getArticle', 'createArticle', 'updateArticle']),
    handleClose(tag) {
      const tagNames = this.article.tags.map(tag => tag.name)
      this.article.tags.splice(this.article.tags.indexOf(tag), 1);
    },

    showInput() {
      this.tagInputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.tagInputValue.toString().trim();
      if (inputValue) {
        // unique
        let ret = []
        this.article.tags.forEach(function (item) {
          if (!ret.includes(item.name)) {
            ret.push(item.name)
          }
        })
        if (!ret.includes(inputValue)) {
          this.article.tags.push({ name: inputValue });
        }
      }
      this.tagInputVisible = false;
      this.tagInputValue = '';
    },
    save() {
      this.$refs.addArticle.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗?", "提示", {})
            .then(() => {
              const postData = this.article
              const code = this.$route.params.code
              if (code) {
                this.updateArticle({ code, payload: postData }).then((res) => {
                  if (res.success) {
                    this.$message.success('保存成功')
                  } else {
                    this.$message.error('保存失败')
                  }
                })
              } else {
                this.createArticle(postData).then((res) => {
                  if (res.success) {
                    this.$message.success('保存成功')
                    this.$router.push({ name: 'articles' })
                  } else {
                    this.$message.error('保存失败')
                  }
                })
              }
            }).catch(() => {
              console.log('cacel submit!!')
              return false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    cancle() {
      this.$router.push({ path: '/admin/articles' })
    }
  }
}
</script>


<style>
.markedBox {
  background: #fff;
  margin: 0 0 0 20px;
  height: 526px;
  overflow-y: auto;
}
</style>
