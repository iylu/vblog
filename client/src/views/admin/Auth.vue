<template>
  <div class="auth">
    <auth-canvas></auth-canvas>
    <el-row class="auth-item">
      <el-col :span="10" :offset="7">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="用户登录">
            <signin></signin>
          </el-tab-pane>
          <!--<el-tab-pane label="用户注册">
                <signup></signup>
              </el-tab-pane>-->
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Canvas from '@/components/common/Canvas.vue';
import Signin from '@/components/admin/Signin.vue'
// import Signup from '@/components/admin/Signup.vue'

export default {
  name: 'entry',
  metaInfo: {
    title: '登录'
  },
  components: {
    'auth-canvas': Canvas,
    Signin,
    // Signup
  },
  data() {
    return {
      activeName: this.$store.state.activeName
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}

</script>

<style>
.auth {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.auth-item {
  position: absolute;
  top: 36%;
  transform: translateY(-50%);
}
</style>

