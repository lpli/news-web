<template>
  <div class="article-list">
    <div class="filter">
      <el-cascader
        :props="props"
        v-model="articleCategory"
        size="small"
        @change="search"
        clearable
        placeholder="文章分类"
      ></el-cascader>
      <el-select v-model="queryType" size="small" class="query-type">
        <el-option
          v-for="type in queryTypes"
          :key="type.value"
          :label="type.label"
          :value="type.value"
        ></el-option>
      </el-select>
      <el-input
        v-model="queryValue"
        size="small"
        class="query-val"
        suffix-icon="el-icon-third-search"
        @change="search"
      ></el-input>
      <div v-if="name == 'myArticle'" class="status-count">
        <el-badge class="item" type="primary" @click.native="switchStatus()">
          <el-button size="small">全部</el-button>
        </el-badge>
        <el-badge
          class="item"
          v-for="item in statusCount"
          :key="item.status"
          :value="item.count"
          :type="getStatusType(item.status)"
          @click.native="switchStatus(item.status)"
        >
          <el-button size="small">{{item.desc}}</el-button>
        </el-badge>
      </div>
    </div>
    <ul v-if="list.length>0">
      <li v-for="item in list" :key="item.id">
        <router-link :to="'/article/view/'+item.id" class="article-link">
          <div class="article-item">
            <div class="article-title">
              <label class="category-label">{{item.categoryName||'未分类'}}</label>
              {{item.title}}
            </div>
            <div class="article-time">
              <p>
                <span>更新时间：{{item.updateTime}}</span>
              </p>
            </div>
            <div class="article-author">
              <span>作者：{{item.authorId}}</span>
              <el-tag type="info" v-if="item.status == 0" size="mini">草稿</el-tag>
              <el-tag type="warning" v-else-if="item.status == 1" size="mini">审核中</el-tag>
              <el-tag type="success" v-else-if="item.status == 2" size="mini">已发布</el-tag>
              <el-tag type="danger" v-else size="mini" @click="showComment($event,item)">
                审核未通过
                <i class="el-icon-third-question-circle-fill"></i>
              </el-tag>
            </div>
          </div>
          <div class="cover" v-if="item.coverList != null && item.coverList.length > 0">
            <img v-for="cover in item.coverList" :key="cover.imgUrl" :src="cover.imgUrl">
          </div>
        </router-link>
        <div class="op-btn">
          <el-button type="text" v-if="item.status == 0" size="mini" @click="toApprove(item)">提交审核</el-button>
          <el-button
            type="text"
            v-if="(name=='myArticle'&&item.status == 1 )|| item.status == 2"
            size="mini"
            @click="revert(item)"
          >撤回</el-button>
          <el-button type="text" size="mini" @click="del(item)">删除</el-button>
          <el-button
            type="text"
            v-if="item.status == 3 || item.status == 0"
            size="mini"
            @click="edit(item)"
          >修改</el-button>
          <el-button
            type="text"
            v-if="item.status == 1 && $route.name != 'myArticle'"
            size="mini"
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
      :current-page.sync="pageNo"
      @current-change="changePage"
    ></el-pagination>
  </div>
</template>
<style lang="less" scoped>
@coverW: 160px;
.article-list {
  .filter {
    padding: 10px 10px;
    .status-count {
      display: inline-block;
      .item {
        margin-right: 15px;
      }
    }

    .query-type {
      width: 80px;
    }
    .query-val {
      width: 200px;
    }
  }
  ul {
    padding: 5px 10px;
    list-style: none;
    margin: 0;
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
        left: 12px;
        bottom: 10px;
      }

      .cover {
        float: right;
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
          position: relative;
          .category-label {
            position: absolute;
            font-size: 10px;
            line-height: 12px;
            right: -50px;
            border: 1px solid @hbgcolor;
            color:@hbgcolor;
            border-radius: 2px;
            padding: 2px 3px;
          }
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
    let that = this;
    return {
      list: [],
      pageNo: 1,
      pageSize: 10,
      total: 0,
      name: "",
      status: "",
      articleCategory: "",
      props: {
        checkStrictly: true,
        emitPath: false,
        label: "name",
        value: "id",
        lazy: true,
        lazyLoad(node, resolve) {
          const { level, value } = node;
          that.getCategory(level, value ? value : "", resolve);
        }
      },
      statusCount: [],
      queryType: 1,
      queryTypes: [
        {
          label: "标题",
          value: 1
        },
        {
          label: "作者",
          value: 2
        }
      ],
      queryValue: ""
    };
  },
  mounted() {
    this.getStatusCount();
    this.loadData(this.$route.name);
  },
  methods: {
    getCategory(level, id, callback) {
      this.$http
        .get("/category/list", {
          level: level + 1,
          id: id
        })
        .then(json => {
          if (json.code == 1) {
            callback && callback(json.data);
          }
        });
    },
    search() {
      this.pageNo = 1;
      this.loadData(this.$route.name);
      this.getStatusCount();
    },
    getStatusType(status) {
      let type = "info";
      switch (status) {
        case 0:
          type = "info";
          break;
        case 1:
          type = "warning";
          break;
        case 2:
          type = "success";
          break;
        case 3:
          type = "danger";
          break;
      }
      return type;
    },
    switchStatus(status) {
      this.status = status;
      this.pageNo = 1;
      this.loadData(this.$route.name);
    },
    getStatusCount() {
      this.$http
        .get("/article/statusCount", {
          queryType: this.queryType,
          queryValue: this.queryValue,
          articleCategory: this.articleCategory
        })
        .then(json => {
          if (json.code == 1) {
            this.statusCount = json.data;
          }
        });
    },
    loadData(name) {
      this.name = name;
      let url = "";
      if (name == "myArticle") {
        url = "/article/myList";
      } else {
        url = "/article/approveList";
      }
      this.$http
        .get(url, {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          status: this.status,
          queryType: this.queryType,
          queryValue: this.queryValue,
          articleCategory: this.articleCategory
        })
        .then(json => {
          if (json.code == 1) {
            this.total = json.data.total;
            this.list = json.data.records;
            this.pageNo = json.data.current;
          }
        });
    },
    changePage(pageNo) {
      this.pageNo = pageNo;
      this.loadData(this.$route.name);
    },
    toApprove(article) {
      this.$confirm("确认提交审核《" + article.title + "》？", "提示", {
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
        path: "/article/approve/" + article.id
      });
    },
    showComment(event, article) {
      event.stopPropagation();
      event.preventDefault();
      this.$http.get("/article/" + article.id + "/comment").then(json => {
        if (json.code === 1) {
          this.$alert(
            "《" +
              json.data.articleTitle +
              "》审核未通过，<strong>【" +
              json.data.operator +
              '】</strong>：<span style="color:#fe6c6f">' +
              json.data.comment +
              "</span>",
            "审核意见",
            {
              dangerouslyUseHTMLString: true
            }
          );
        }
      });
    },
    revert(article) {
      this.$confirm("确认撤回《" + article.title + "》？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http.get("/article/" + article.id + "/revert").then(json => {
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
    del(article) {
      this.$confirm("确认删除《" + article.title + "》？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http.delete("/article/" + article.id).then(json => {
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
    }
  },
  watch: {
    $route(to, from) {
      this.loadData(to.name);
    }
  }
};
</script>
