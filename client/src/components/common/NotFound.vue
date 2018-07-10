<template>
  <div class="NotFound">
    <div class="wrap">
      <h2>The page you are looking is not found or removed. Please try again later.</h2>
      <div>
        <a @click="goHome" href="javascript:;">主页</a>
        <p>请开始你的表演</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goHome() {
      this.$router.replace({ path: '/home' });
    }
  }
}
</script>

<style scoped>
.NotFound {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

.wrap div {
  margin-top: 4rem;
  text-align: center;
}

.wrap div a {
  padding: 1rem;
  font-size: 2rem;
}

.wrap div a:hover {
  opacity: 0.8;
}
</style>
