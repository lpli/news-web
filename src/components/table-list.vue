<template>
  <div class="table-list">
    <el-table :data="rows" border stripe>
      <el-table-column type="index" v-if="showIndex"></el-table-column>
      <el-table-column
        v-for="item in columns"
        :key="item.id"
        :prop="item.prop"
        :label="item.label"
        :fixed="item.fixed"
        :formatter="item.formatter"
      >
      </el-table-column>
    </el-table>
    <div class="table-list-pg">
      <el-pagination  layout="sizes,prev, pager, next, jumper, total" :current-page="pageNo" :total="total" :page-sizes="pageSizes" :page-size="pageSize"
      @size-change="sizeChange" @current-change="currentChange" ></el-pagination>
    </div>
  </div>
</template>

<style scoped>
.table-list {
  width: 100%;
}
.table-list-pg{
  margin-top:20px;
  float:right;
}
</style>

<script>
export default {
  name: "table-list",
  data() {
    return {
      pageNo:1,
      total:0,
      pageSize:10,
      rows: []
    };
  },
  props: {
    url: {
      type: String,
      default: ""
    },
    showIndex: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Array,
      default: () => {
        return [];
      }
    },
    pageSizes:{
      type:Array,
      default:()=>{
        return [10,20,50]
      }
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$http.post('/list',{pageNo:this.pageNo,pageSize:this.pageSize}).then((data)=>{
          this.total = data.total;
          this.rows = data.rows;
      })
    },
    //分页事件回调函数
    sizeChange(size){
      //每页大小
      console.log('size',size);
      this.pageSize = size;
      this.getData();
    },
    currentChange(page){
      //页面变更
      console.log('current',page);
      this.pageNo = page;
      this.getData();
    }

  }
};
</script>
