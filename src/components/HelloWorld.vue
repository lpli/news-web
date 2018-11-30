<template>
  <ul>
    <li v-for="item in items" class="article-li">
        <div class="article-title-left">
          <img :src="item.thumbnail_pic_s" class="article-img">
        </div>
        <div class="article-title-right">
          <span>{{item.title}}</span>
        </div>
    </li>
  </ul>
</template>
<style lang="less">
    ul{
        list-style: none;
    }
    .article-li{
        height:200px;
    }
    .article-title-left{
        width:200px;
        display: inline-block;
    }
    .article-title-right{
        display: inline-block;
    }
    .article-img{
        width:98%;
    }
    
</style>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      items: [
        {
          title: "xx",
          thumbnail_pic_s: ""
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
        this.items = data;
      });
    }
  }
};
</script>
