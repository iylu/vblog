<template>
  <footer class="footer">
    <div class="container">
      <div class="left">
        <div>Copyright &copy; 2017. All Rights Reserved.</div>
        <div>ICP备号</div>
      </div>
      <div class="right">
        <div class="link-item" v-for="(infoItem, index) in linkInfo" :key="index">
          <div class="pop">
            <a :href="infoItem.url">{{infoItem.info}}</a>
          </div>
          <a target="_blank" :href="infoItem.url">
            <img :src="infoItem.img" />
            <!-- image base64 code -->
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'footer',
  data() {
    return {
      linkInfo: [{
        info: '@github',
        url: "#",
        img: require('@/assets/img/github.png')
      }, {
        info: '@weibo',
        url: "#",
        img: require('@/assets/img/weibo.png')
      }, {
        info: '@email',
        url: "mailto:iylu0804@gmail.com",
        img: require('@/assets/img/mail.png')
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
.footer {
  box-sizing: border-box;
  margin-top: 100px;
  padding: 50px 40px;
  background-color: #333;
  color: #fff;
  font-size: 12px;
  font-weight: 300;
  height: 160px;

  @media (max-width: 480px) {
    height: 200px;
    padding: 40px 20px;
  }
}

.container {
  max-width: 760px;
  margin: 0 auto;
  position: relative;
  @media (max-width: 480px) {
    text-align: center;
  }
}

.left {
  @media (min-width: 481px) {
    position: absolute;
    left: 0;
  }

  >div {
    margin: 15px 0;
  }
}

.right {
  @media (min-width: 481px) {
    position: absolute;
    right: 0;
    top: 15px;
  }
}

.link-item {
  display: inline-block;
  margin: 15px;
  position: relative;

  >a>img {
    max-width: 24px;
  }

  @media (min-width: 481px) {
    &:hover {
      .pop {
        visibility: visible;
        opacity: 1;
      }
    }
  }
}

.pop {
  visibility: hidden;
  opacity: 0;
  background-color: #fff;
  position: absolute;
  top: -51px;
  left: -52px;
  text-align: center;
  width: 120px;
  padding: 4px;
  border-radius: 5px;
  height: 30px;
  line-height: 30px;
  color: #333;
  transition: opacity 1s cubic-bezier(0.22, 0.61, 0.36, 1);

  a {
    color: #333;
  }

  &::after {
    border-color: #fff transparent transparent;
    border-style: solid;
    border-width: 9px;
    content: " ";
    left: 50%;
    margin-left: -9px;
    position: absolute;
    bottom: -18px;
  }
}
</style>
