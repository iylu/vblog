<template>
  <el-form :model="dynamicValidateForm" :rules="rules" label-width="100px" ref="dynamicValidateForm">
    <!-- prop: (rules)需校验的字段名 -->
    <el-form-item prop="email" label="邮箱">
      <el-input v-model="dynamicValidateForm.email"></el-input>
    </el-form-item>
    <el-form-item prop="password" label="密码">
      <el-input type="password" v-model="dynamicValidateForm.password" auto-complete="off"></el-input>
    </el-form-item>
    <el-button type="primary" @click="submitForm('dynamicValidateForm')">登录</el-button>
    <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
    <!-- ref -->
  </el-form>
</template>

<script>
import axios from '@/vuex/admin/axios'
import { mapMutations } from 'vuex'
export default {
  name: 'signin',
  data() {
    return {
      dynamicValidateForm: {
        email: '',
        password: ''
      },
      // 表单验证规则
      rules: {
        email: [{
          required: true,
          message: '邮箱地址不能为空',
          trigger: 'blur'
        },
        {
          type: 'email',
          message: '请输入正确的邮箱地址',
          trigger: 'blur'
        }
        ],
        password: {
          required: true,
          message: '密码不能为空',
          trigger: 'blur'
        }
      }
    }
  },
  methods: {
    ...mapMutations(['LOGIN']),
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 登录
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const userInfo = { email: this.dynamicValidateForm.email, password: this.dynamicValidateForm.password }
          axios.post('/api/users/signin', userInfo)
            .then((response) => {
              //arrow function, bind this. if not, 'this' is equal to undefined
              let data = response.data
              if (response.info) {
                this.$message({
                  type: 'info',
                  message: '账号不存在'
                })
                return
              }

              if (response.success) {
                this.$message({
                  type: 'success',
                  message: '登录成功'
                })

                //this.$store.commit('LOGIN', data)
                this.LOGIN(data)

                let redirect = decodeURIComponent(this.$route.query.redirect || '/admin')
                this.$router.push({
                  path: redirect
                })
              } else {
                this.$message({
                  type: 'info',
                  message: '密码错误'
                })
              }

            })
            .catch((err) => {
              console.log(1)
              console.error(err)
              return false
            })
        } else {
          console.log('Error Submit!')
          return false
        }
      })
    }
  }
}
</script>
