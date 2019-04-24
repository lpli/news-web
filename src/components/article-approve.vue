<template>
  <div class="article-approve">
    <div class="op-btn">
      <el-button type="primary" @click="approve">审核</el-button>
    </div>
    <article-view ref="view"></article-view>
    <el-dialog title="审核" :visible.sync="showDialog" :close-on-click-modal="closeOnModel">
      <el-input
        type="textarea"
        :rows="4"
        placeholder="输入你的审核意见,最长800个字符"
        v-model="comment"
        maxlength="800"
      ></el-input>
      <div slot="footer">
        <el-button type="success" size="small" @click="pass">通过</el-button>
        <el-button type="danger" size="small" @click="reject">打回修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style lang="less" scoped>
.article-approve {
  .op-btn {
    position: fixed;
    right: 40px;
  }
}
</style>

<script>
import ArticleView from "@/components/article-view";
export default {
  name: "ArticleApprove",
  components: { ArticleView },
  data() {
    return {
      showDialog: false,
      closeOnModel: false,
      comment: "",
      articleId: ""
    };
  },
  mounted() {
    this.articleId = this.$route.params.id;
    this.loadArticle();
  },
  methods: {
    loadArticle() {
      this.$refs.view.getArticle(this.$route.params.id);
    },
    approve() {
      this.showDialog = true;
    },
    pass() {
      this.$http
        .get("/article/approve/" + this.articleId + "/pass", {
          comment: this.comment
        })
        .then(json => {
          if (json.code == 1) {
            this.$router.push({
              path: "/article/approveList"
            });
          } else {
            this.$message({
              type: "error",
              message: json.msg
            });
          }
        });
    },
    reject() {
      if (this.comment.length == 0) {
        $.message({
          type: "error",
          message: "请输入审批意见"
        });
      }else{
           this.$http
        .get("/article/approve/" + this.articleId + "/reject", {
          comment: this.comment
        })
        .then(json => {
          if (json.code == 1) {
            this.$router.push({
              path: "/article/approveList"
            });
          } else {
            this.$message({
              type: "error",
              message: json.msg
            });
          }
        });
      }
    }
  }
};
</script>
