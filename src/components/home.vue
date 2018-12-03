<template>
  <div>
    <img-news>
    </img-news>
    <ul>
      <li v-for="item in items" class="article-li" >
          <div class="article-title-left">
            <img :src="item.thumbnail_pic_s" class="article-img">
          </div>
          <div class="article-title-right">
            <span>{{item.title}}</span>
          </div>
      </li>
    </ul>
  </div>
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
import ImgNews from '@/components/img-news';
export default {
  name: "Home",
  components:{
    'img-news':ImgNews
  },
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
