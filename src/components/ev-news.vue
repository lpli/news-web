<template>
  <el-row>
    <el-col :span="12">
        
    </el-col>
    <el-col :span="12">
        <el-row v-for="item in items" class="article-li" :gutter="10">
          <el-col class="article-title-left">
            <img :src="item.thumbnail_pic_s" class="article-img">
          </el-col>
          <el-col  class="article-title-right">
            <span>{{item.title}}</span>
          </el-col>
        </el-row>
    </el-col>
  </el-row>


</template>

<style lang="less">
  ul {
    list-style: none;
  }

  .article-li {
    display: block;
    width: 100%;
  }

  .article-title-left {
    width:30%;
    float:left;
  }

  .article-title-right {
    width:70%;
    float:left;
    font-size:14px;
  }

  .article-img {
    width: 98%;
  }

</style>

<script>
  export default {
    name: "ev-news",
    components: {},
    data() {
      return {
        items: [{
          title: "xx",
          thumbnail_pic_s: ""
        }]
      };
    },
    created() {
      this.getData();
    },
    methods: {
      getData() {
        this.$http.post("/news/index", {}).then(data => {
          this.items = data;
        });
      }
    }
  };

</script>
