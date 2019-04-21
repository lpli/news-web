<template>
  <div class="article-list">
    <ul v-if="list.length>0">
      <li v-for="item in list" :key="item.id">
        <router-link :to="'/article/'+item.id" class="article-link">
          <div class="cover">
            <img
              src="http://localhost:9000/img/2019/04/21/067e1cd7-80b4-4e8b-a4e3-0ac08cbd4852.png"
            >
          </div>
          <div class="article-item">
            <div class="article-title">{{item.title}}</div>
            <div class="article-time">
              <p>
                <span>创建时间：{{item.createTime}}</span>
                <span>更新时间：{{item.updateTime}}</span>
              </p>
            </div>
            <div class="article-author">
              <span>作者：{{item.authorId}}</span>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
    <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize"></el-pagination>
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
      .article-link {
        color: #000;
      }
      .cover {
        float: left;
        width: @coverW;
      }
      .article-item {
        width: calc(100% - @coverW - 30px);
        float: left;
        .article-title {
          font-size: 22px;
          line-height: 22px;
          margin-bottom: 5px;
        }
        .article-time {
          color:#999;
          p span:nth-child(2) {
            padding-left: 10px;
          }
        }
      }
    }
  }
}
</style>

<script>
export default {
  name: "ArticleList",
  data() {
    return {
      list: [],
      pageNo: 1,
      pageSize: 10,
      total: 0
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.$http
        .get("/article/myList", {
          pageNo: this.pageNo,
          pageSize: this.pageSize
        })
        .then(json => {
          if (json.code == 1) {
            this.total = json.data.total;
            this.list = json.data.records;
          }
        });
    }
  }
};
</script>
