<template>
  <div class="article-list">
    <ul v-if="list.length>0">
      <li v-for="item in list" :key="item.id">
        <router-link :to="'/article/view/'+item.id" class="article-link">
          <div class="cover" v-if="item.coverList != null && item.coverList.length > 0">
            <img v-for="cover in item.coverList" :key="cover.imgUrl" :src="cover.imgUrl">
          </div>
          <div class="article-item">
            <div class="article-title">{{item.title}}</div>
            <div class="article-time">
              <p>
                <span>更新时间：{{item.updateTime}}</span>
              </p>
            </div>
            <div class="article-author">
              <span>作者：{{item.authorId}}</span>
              <el-tag type="info" v-if="item.status == 0" size="small">草稿</el-tag>
              <el-tag type="warning" v-else-if="item.status == 1" size="small">审核中</el-tag>
              <el-tag type="success" v-else-if="item.status == 2" size="small">已发布</el-tag>
              <el-tag type="error" v-else size="small">审核未通过</el-tag>
            </div>
          </div>
        </router-link>
        <div class="op-btn">
          <el-button v-if="item.status == 0" size="small" @click="toApprove(item)">提交审核</el-button>
          <el-button v-if="item.status == 3 || item.status == 0" size="small" @click="edit(item)">修改</el-button>
          <el-button
            v-if="item.status == 1 && $route.name != 'myArticle'"
            size="small"
            @click="approve(item)"
          >审核</el-button>
        </div>
      </li>
    </ul>
    <div v-else class="no-records">
      <i class="el-icon-third-file-image-fill"></i>
    </div>
    <el-pagination
      v-if="list.length>0"
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      @current-change="changePage"
    ></el-pagination>
  </div>
</template>
<style lang="less" scoped>
@coverW: 160px;
.article-list {
  ul {
    padding: 5px 10px;
    list-style: none;
    li {
      margin: 0;
      padding: 20px 15px;
      height: 180px;
      overflow: hidden;
      display: block;
      width: 100%;
      box-sizing: border-box;
      box-shadow: 0px 1px #e4e4e4;
      position: relative;
      .article-link {
        color: #000;
      }
      .op-btn {
        position: absolute;
        right: 10px;
        bottom: 10px;
      }

      .cover {
        float: left;
        img {
          width: @coverW;
          height: @coverW*3 / 4;
          padding-right: 15px;
          transition: all 0.4s;
          -moz-transition: all 0.4s;
          -webkit-transition: all 0.4s;
          -o-transition: all 0.4s;
        }
        img:hover {
          transform: scale(1.1);
        }
      }
      .article-item {
        float: left;
        .article-title {
          font-size: 22px;
          line-height: 22px;
          margin-bottom: 5px;
        }
        .article-time {
          color: #999;
          font-size: 12px;
          p span:nth-child(2) {
            padding-left: 10px;
          }
        }
        .article-author {
          font-size: 15px;
          span {
            margin-right: 14px;
          }
        }
      }
    }
  }
  .no-records {
    text-align: center;
    background-color: #f5f7fa;
    padding: 15px 0;
    height: 220px;
    i {
      margin-top: 30px;
      font-size: 100px;
      color: #ccc;
    }
    i::after {
      content: "无数据";
      display: block;
      font-size: 15px;
      margin-top: 15px;
    }
  }
}
</style>

<script>
import ArticleView from "@/components/article-view";
export default {
  name: "ArticleList",
  components: { ArticleView },
  data() {
    return {
      list: [],
      pageNo: 1,
      pageSize: 10,
      total: 0
    };
  },
  props: {
    name: String
  },
  mounted() {
    this.loadData(this.$route.name);
  },
  methods: {
    loadData(name) {
      let url = "";
      if (name == "myArticle") {
        url = "/article/myList";
      } else {
        url = "/article/approveList";
      }
      this.$http
        .get(url, {
          pageNo: this.pageNo,
          pageSize: this.pageSize
        })
        .then(json => {
          if (json.code == 1) {
            this.total = json.data.total;
            this.list = json.data.records;
          }
        });
    },
    changePage(pageNo) {
      this.pageNo = pageNo;
      this.loadData(this.$route.name);
    },
    toApprove(article) {
      this.$confirm("确认提交审核稿件《" + article.title + "》？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http.post("/article/toApprove", article).then(json => {
          if (json.code == 1) {
            this.loadData(this.$route.name);
          } else {
            this.$message({
              type: "error",
              message: json.msg
            });
          }
        });
      });
    },
    edit(article) {
      this.$router.push({
        path: "/article/edit/" + article.id
      });
    },
    approve(article) {
       this.$router.push({
        path: "/article/approve/"+article.id
      });
    },
    showLog(article){

    }
  },
  watch: {
    $route(to, from) {
      this.loadData(to.name);
    }
  }
};
</script>
