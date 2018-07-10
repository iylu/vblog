<template>
  <el-row>
    <el-row class="newTag">
      <el-col :span="24">
        <el-button size="small" type="primary" @click="add">添加标签</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span='24'>
        <el-table style="width:100%" align="center" :data="tagList" v-loading="loading" element-loading-text="拼命加载中">
          <el-table-column type='index' width="120" label="序号"></el-table-column>
          <el-table-column prop="name" min-width="150" label="标签名称"></el-table-column>
          <el-table-column min-width="170" label="操作">
            <template slot-scope='scope'>
              <el-button size="small" type='primary' @click="modify(scope.row)">编辑</el-button>
              <el-button size="small" type='danger' @click="remove(scope.row.name)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-dialog :title="dialogFromTitle" :visible.sync="dialogFormVisible">
          <el-form :model="tagForm" :rules="formRule" ref="tagForm" label-width="80px">
            <el-form-item label="标签名称" prop="name">
              <!-- prop 属性设置为需校验的字段名 -->
              <el-input v-model="tagForm.name" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm">{{btnText}}</el-button>
          </div>
        </el-dialog>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      loading: false,
      dialogFromTitle: '',
      dialogFormVisible: false,
      tagForm: {
        name: '',
        oldName: ''
      },
      formRule: {
        name: [
          { required: true, message: '请输入标签名称', trigger: 'blur' }
        ]
      },
      btnText: '提交'
    }
  },
  created() {
    this.init()
  },
  computed: {
    tagList() {
      return this.$store.state.admin.tagList
    }
  },
  methods: {
    ...mapActions(['getTags', 'createTag', 'updateTag', 'deleteTag']),
    init() {
      this.loading = true
      this.getTags().then(() => { this.loading = false })
    },
    add() {
      this.dialogFormVisible = true
      this.dialogFromTitle = '新增'
      this.tagForm.name = ''
    },
    modify(row) {
      this.dialogFormVisible = true
      this.dialogFromTitle = '编辑'
      this.tagForm.name = row.name
      this.tagForm.oldName = row.name
    },
    remove(name) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'waring'
      }).then(() => {
        this.deleteTag(name).then((res) => {
          if (res.success) {
            this.$message.success('删除成功')
          } else {
            this.$message.error('删除失败')
          }
        }).then(() => {
          this.init()
          this.dialogFormVisible = false
        })
      })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    },
    submitForm() {
      this.$refs.tagForm.validate(valid => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {})
            .then(() => {
              this.btnText = '提交中'
              if (this.dialogFromTitle === '新增') {
                this.createTag(this.tagForm.name)
              } else {
                this.updateTag({
                  oldName: this.tagForm.oldName,
                  newName: this.tagForm.name
                })
              }
            }).then(() => {
              this.dialogFormVisible = false
              this.btnText = '提交'
            })
        }
      })
    }
  }
}
</script>

<style>
.newTag {
  padding: 10px 15px;
  background: #fff;
}
</style>

