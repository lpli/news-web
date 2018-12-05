<template>
  <el-row class="tech-news" :gutter="20">
    <el-col :span="6" class="big-item" v-for="item in list" :key="item.title">
      <div>
        <img :src="item.img" class="article-img">
        <div class="big-title">{{item.title}}</div>
      </div>
    </el-col>
  </el-row>
</template>

<style lang="less" scoped>
.tech-news {
  padding: 15px 0;
}

.article-img {
  width: 100%;
}

.big-title {
  font-size: 20px;
  margin-top: 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.big-date {
  margin-top: 10px;
  font-size: 12px;
}

.big-item{
  margin-bottom: 15px;
}
</style>

<script>
export default {
  name: "tech-news",
  components: {},
  data() {
    return {
      list: [
        {
          title: "x",
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
        this.list = data.list;
      });
    }
  }
};
</script>
