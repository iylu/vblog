<template>
  <el-row>
    <el-col style="height:30px;">
      <span>密码修改</span>
    </el-col>
    <el-col :span="10" :offset="7">
      <el-form :model="accountValidateForm" :rules="rules" ref="accountValidateForm" label-width="100px">
        <el-form-item label="邮箱" prop="email">
          <el-input type="text" v-model="accountValidateForm.email" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="accountValidateForm.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="accountValidateForm.checkPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('accountValidateForm')">提交</el-button>
          <el-button @click="resetForm('accountValidateForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import axios from '@/vuex/admin/axios'
import { mapMutations } from 'vuex'
export default {
  metaInfo: {
    title: '账户管理'
  },
  data() {
    var validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户邮箱地址'));
      } else {
        if (this.accountValidateForm.password !== '') {
          this.$refs.accountValidateForm.validateField('password');
        }
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.accountValidateForm.checkPass !== '') {
          this.$refs.accountValidateForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.accountValidateForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      accountValidateForm: {
        email: localStorage.getItem('useremail'),
        password: '',
        checkPass: ''
      },
      rules: {
        email: [
          { required: true, validator: validateEmail, trigger: 'blur' }
        ],
        password: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    ...mapMutations(['LOGIN']),
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const user_id = localStorage.getItem('userid')
          axios.patch(`/api/users/${user_id}`, this.accountValidateForm)
            .then((response) => {
              let data = response.data

              if (response.success) {
                this.$message({
                  type: 'success',
                  message: '密码修改成功'
                })

                // 密码修改成功直接登录，没有选择 跳转到 /auth 再次登录这种实现方式
                this.LOGIN(data)

                let redirect = decodeURIComponent(this.$route.query.redirect || '/admin')
                this.$router.push({
                  path: redirect
                })
              } else {
                this.$message({
                  type: 'info',
                  message: '密码修改失败'
                })
              }

            })
            .catch((err) => {
              console.error(err)
              return false
            })
        } else {
          console.log('error submit!!');
          return false
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
