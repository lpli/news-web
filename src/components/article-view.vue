<template>
  <div class="article-view">
    <div v-html="article.content"></div>
  </div>
</template>
<style lang="less" scoped>
</style>
<script>
export default {
  name: "ArticleView",
  data() {
    return {
      article: {
        content:''
      }
    };
  },
  mounted() {
    this.getArticle();
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
