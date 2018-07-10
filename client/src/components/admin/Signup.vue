<template >
  <el-form :model="registerValidateForm" :rules="rules" label-width="100px" ref="registerValidateForm">
    <el-form-item prop="email" label="邮箱">
      <el-input v-model="registerValidateForm.email"></el-input>
    </el-form-item>
    <el-form-item prop="password" label="密码">
      <el-input type="password" v-model="registerValidateForm.password"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass" label="再次输入">
      <el-input type="password" v-model="registerValidateForm.checkPass"></el-input>
    </el-form-item>
    <el-button type="primary" @click="submitForm('registerValidateForm')">注册</el-button>
    <el-button @click="resetForm('registerValidateForm')">重置</el-button>
  </el-form>
</template>

<script>
import axios from '@/vuex/admin/axios'
export default {
  name: 'signup',
  data() {
    // 密码安全性要求
    let validatePass1 = (rule, value, callback) => {
      // 6-16位, 数字, 字母, 字符至少包含两种, 同时不能包含中文和空格
      let reg = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^[^\s\u4e00-\u9fa5]{6,16}$/;
      if (!reg.test(value)) {
        callback(new Error('密码长度需6-16位，且包含字母和字符'))
      } else {
        callback()
      }
    };
    // 监测两次密码是否相同
    let validatePass2 = (rule, value, callback) => {
      value === '' ? callback(new Error('请再次输入密码')) :
        value !== this.registerValidateForm.password ? callback(new Error('两次输入密码不一致!')) :
          callback()
    };
    return {
      registerValidateForm: {
        email: '',
        password: '',
        checkPass: ''
      },
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
        password: [{
          required: true,
          message: '密码不能为空',
          trigger: 'blur'
        },
        {
          validator: validatePass1,
          trigger: 'blur'
        }
        ],
        checkPass: [{
          required: true,
          message: '请再次输入密码',
          trigger: 'blur'
        },
        {
          validator: validatePass2,
          trigger: 'blur'
        }
        ]
      }
    }
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const userInfo = { email: this.registerValidateForm.email, password: this.registerValidateForm.password, checkPass: this.registerValidateForm.password }

          axios.post('/api/users/signup', userInfo)
            .then((response) => {
              //arrow function, bind this. if not, 'this' is equal to undefined
              if (response.success) {
                // 消息提示
                this.$message({
                  type: 'success',
                  message: `注册成功，请登录`
                })
                // 注册成功跳转到刷新 admin 主页面
                this.$router.go(0)
                this.$router.push('/admin')
              } else {
                this.$message({
                  type: 'info',
                  message: '此账户已存在'
                })
              }

            })
            .catch((err) => {
              console.error(err)
            })

        } else {
          console.log('Error Submit!')
          return false
        }
      });
    }
  }
}
</script>
