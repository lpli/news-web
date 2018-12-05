<template>
  <div class="list-view">
    <div class="list-item" v-for="item in list" >
        <div class="item-left">
            <img :src="item.img">
        </div>
        <div class="item-right">
            <p>{{item.title}}</p>
        </div>
    </div>
    <el-pagination background layout="prev, pager, next" :page-count="pageCount" @next-click="nextClick" @current-change="currentChange"></el-pagination>
  </div>
</template>
<style scoped>
   
   .list-view{
       width:100%;
       overflow: hidden;
   }
   
   .list-item{
       width:100%;
       float:left;
   }
   .item-left{
       width:30%;
       float:left;
   }

   .item-right{
       width:70%;
       float:left;
   }
</style>

<script>
export default {
  name: "list-view",
  data() {
    return {
      list: [{}],
      pageCount: 10,
      pageNo:1
    };
  },
  mounted(){
      this.getData(this.pageNo);
  },
  methods: {
    getData(pageNo) {
      this.$http.post("/news/list", {page:pageNo}).then(data => {
        this.list = data.list;
        this.pageCount = data.totalPage;
        this.pageNo = data.pageNo;
      });
    },
    nextClick(pageNo){
        this.getData(pageNo);
    },
    currentChange(pageNo){
        this.getData(pageNo);
    }
  }
};
</script>

