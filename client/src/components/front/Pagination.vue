<template>
  <div v-if="showObj.totalPage > 1" class="pager">
    <a v-if="showObj.prev" class="linkPrev" @click="switchPage(currentPage - 1)">&lt; Prev</a>
    <div class="wrap">
      <ul class="numberGroup">
        <li v-for="(page, index) in showObj.pageNumber" :key="index" :class="{'active': (index+1) === currentPage}">
          <a @click="switchPage(page)">{{page}}</a>
        </li>
      </ul>
    </div>
    <a v-if="showObj.next" class="linkNext" @click="switchPage(currentPage + 1)">Next &gt;</a>
  </div>
</template>

<script>
export default {
  props: {
    totalNum: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    },
    showPage: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      required: true
    }
  },
  computed: {
    showObj() {
      const totalPage = Math.ceil(this.totalNum / this.perPage)
      const pageNumber = []
      const showObj = {
        prev: this.currentPage !== 1,
        next: this.currentPage !== totalPage,
        start: this.currentPage - Math.floor(this.showPage / 2),
        end: this.currentPage + Math.floor(this.showPage / 2),
        totalPage: totalPage
      }
      if (showObj.start < 1) {
        showObj.start = 1
      }
      if (showObj.end > totalPage) {
        showObj.end = totalPage
      }
      for (let i = showObj.start; i <= showObj.end; i++) {
        pageNumber.push(i)
      }
      showObj.pageNumber = pageNumber
      return showObj
    }
  },
  methods: {
    switchPage(page) {
      this.$emit('changePage', page)
    }
  }
}
</script>

<style lang="scss" scoped>
.pager {
  margin: 40px 0;
  height: 30px;
}

.wrap {
  float: left;
  position: relative;
  left: 50%;
}

.numberGroup {
  float: left;
  padding: 0;
  margin: 0;
  position: relative;
  left: -50%;

  li {
    margin: 0 10px;
    display: inline-block;

    &.active,
    &:hover {
      background-color: #888;
      a {
        color: #fff;
      }
    }

    a {
      display: block;
      padding: 6px 10px;
      &:hover {
        cursor: pointer;
      }
    }
  }
}

.linkPrev {
  position: absolute;
  line-height: 30px;
}

.linkNext {
  float: right;
  line-height: 30px;
}
</style>
