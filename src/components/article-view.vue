<template>
  <div class="article-view">
    <h1 class="article-title">{{article.title}}</h1>
    <h4 class="article-time">作者：{{article.authorId}}&nbsp;&nbsp;&nbsp;&nbsp;更新时间：{{article.updateTime}} </h4>
    <div v-html="content" class="mce-content-body "></div>
  </div>
</template>
<style lang="less" scoped>
    .article-view{
      .article-title{
        font-size: 1.8rem;
      }
      .article-time{
        font-size: 0.8rem;
        color:#999;
      }
    }
</style>
<script>
export default {
  name: "ArticleView",
  data() {
    return {
      article: {
        title:'',
        content:'',
        updateTime:'',
        authorId:''
      }
    };
  },
  mounted() {
    this.getArticle();
  },
  computed:{
    content(){
      return this.$util.toHtml(this.article.content);
    }
  },
  methods: {
    getArticle() {
      this.$http.get("/article/" + this.$route.params.id).then(json => {
        if (json.code == 1) {
          this.article = json.data;
        }
      });
    }
  }
};
</script>
