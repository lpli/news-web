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
    <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize" @current-change="changePage"></el-pagination>
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
        img {
          width: @coverW;
          height: @coverW*3 / 4;
          padding-right:15px;
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
          font-size:12px;
          p span:nth-child(2) {
            padding-left: 10px;
          }
        }
        .article-author{
          font-size:15px;
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
    },
    changePage(pageNo){
      this.pageNo = pageNo;
      this.loadData();
    }
  }
};
</script>
