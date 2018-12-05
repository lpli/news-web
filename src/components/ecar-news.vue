<template>
  <el-row class="ecar-news" :gutter="20">
    <el-col :span="12" class="big-item" v-for="item in bigList" :key="item.title">
      <div>
        <img :src="item.img" class="article-img">
        <div class="big-title">{{item.title}}</div>
        <div class="big-date">{{item.date}}</div>
      </div>
    </el-col>
    <el-row :gutter="20">
      <el-col class="little-item" v-for="item in littleList" :key="item.title" :span="12">
        <el-row :gutter="15">
          <el-col :span="8" class="article-title-left">
            <img :src="item.img" class="article-img">
          </el-col>
          <el-col :span="16" class="article-title-right">
            <div class="title">{{item.title}}</div>
            <div class="date">{{item.date}}</div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-row>
</template>

<style lang="less" scoped>
.ecar-news {
  padding: 15px 0;
}

.article-li {
  display: block;
  width: 100%;
  margin-bottom: 10px;
}

.article-title-left {
}

.article-title-right {
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
  name: "ecar-news",
  components: {},
  data() {
    return {
      bigList: [
        {
          title: "x",
          img: ""
        }
      ],
      littleList: [
        {
          title: "y",
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
      this.$http.post("/news/ecars", {}).then(data => {
        this.littleList = data.littleList;
        this.bigList = data.bigList;
      });
    }
  }
};
</script>
