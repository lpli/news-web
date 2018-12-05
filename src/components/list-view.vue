<template>
  <div class="list-view">
    <div class="left">
      <div class="list-item" v-for="item in list" :key="item.id">
        <div class="item-left">
          <img :src="item.img">
        </div>
        <div class="item-right">
          <p>{{item.title}}</p>
        </div>
      </div>
      <div class="list-pager">
        <el-pagination
          background
          layout="total,prev, pager, next"
          :page-count="pageCount"
          @next-click="nextClick"
          @current-change="currentChange"
          :total="100"
        ></el-pagination>
      </div>
      <div class="right"></div>
    </div>
  </div>
</template>
<style scoped>
.list-view {
  width: 100%;
  overflow-x: hidden;
}
.left {
  width: 80%;
  float: left;
}

.list-item {
  width: 100%;
  float: left;
}
.item-left {
  width: 30%;
  float: left;
}

.list-pager {
  width: 100%;
  float: left;
  padding-top: 40px;
  text-align: center;
}

.item-right {
  width: 70%;
  float: left;
}
</style>

<script>
export default {
  name: "list-view",
  data() {
    return {
      list: [{}],
      pageCount: 10,
      pageNo: 1
    };
  },
  mounted() {
    this.getData(this.pageNo);
  },
  methods: {
    getData(pageNo) {
      this.$http.post("/news/list", { page: pageNo }).then(data => {
        this.list = data.list;
        this.pageCount = data.totalPage;
        this.pageNo = data.pageNo;
      });
    },
    nextClick(pageNo) {
      this.getData(pageNo);
    },
    currentChange(pageNo) {
      this.getData(pageNo);
    }
  }
};
</script>

