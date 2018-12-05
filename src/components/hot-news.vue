<template>
  <el-row class="hot-news" :gutter="20">
      <div class="big-item">
        <img :src="big.img" class="article-img">
      </div>
      <el-row v-for="item in items" :key="item.title" class="article-li" :gutter="10">
        <el-col class="article-title-left">
          <img :src="item.img" class="article-img">
        </el-col>
        <el-col class="article-title-right">
          <div class="title">{{item.title}}</div>
          <div class="date">{{item.date}}</div>
        </el-col>
      </el-row>
  </el-row>
</template>

<style lang="less" scoped>
.hot-news {
  padding: 15px 10px;
}

.big-item{
  margin-bottom: 15px;
}

.article-li {
  display: block;
  width: 100%;
  margin-bottom: 10px;
}

.article-title-left {
  width: 30%;
  float: left;
}

.article-title-right {
  width: 70%;
  float: left;
  font-size: 12px;
}

.article-img {
  width: 100%;
}

.title {
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: keep-all;
}

.date {
  margin-top: 4px;
  color: #6e6a6a;
}

.big-title{
  font-size:20px;
  margin-top:10px;
}
.big-date{
  margin-top:10px;
  font-size:12px;
}
</style>

<script>
export default {
  name: "hot-news",
  components: {},
  data() {
    return {
      big: {
        title: "xx",
        img: ""
      },
      items: [
        {
          title: "xx",
          img: ""
        }
      ]
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$http.post("/news/index", {}).then(data => {
        this.items = data.list;
        this.big = data.big;
      });
    }
  }
};
</script>
