<template>
  <div class="table-list">
    <slot name="opsbar"></slot>
    <el-table :data="rows" stripe v-loading="loading" tooltip-effect="light">
      <el-table-column type="selection" width="55" v-if="select"></el-table-column>
      <el-table-column type="index" v-if="showIndex"></el-table-column>
      <slot name="prepend"/>
      <el-table-column
        v-for="(column, columnIndex) in visibleColumns"
        :key="columnIndex"
        :prop="column.prop"
        :label="column.label"
        :fixed="column.fixed"
        :formatter="column.formatter"
        :width="column.width"
      >
        <template slot-scope="scope">
          <span v-if="column.slotName">
            <slot :name="column.slotName" :row="scope.row" :$index="scope.$index">插槽{{scope.$index}}</slot>
          </span>
          <span v-else-if="column.render && column.html" v-html="column.render(scope.row)"></span>
          <span v-else-if="column.render">{{column.render(scope.row)}}</span>
          <span
            v-else-if="column.formatter"
          >{{ column.formatter(scope.row, scope.column, scope.row[column.prop], scope.$index) }}</span>
          <span v-else>{{ scope.row[column.prop] }}</span>
        </template>
      </el-table-column>
      <slot name="append"/>
    </el-table>
    <div class="table-list-pg" v-if="showPage">
      <el-pagination
        layout="sizes,prev, pager, next, jumper, total"
        :current-page="pageNo"
        :total="total"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        @size-change="sizeChange"
        @current-change="currentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<style scoped>
.table-list {
  width: 100%;
}
.table-list-pg {
  margin-top: 20px;
  float: right;
}
</style>

<script>
export default {
  name: "table-list",
  data() {
    return {
      pageNo: 1,
      total: 0,
      pageSize: 10,
      rows: [],
      loading: false
    };
  },
  props: {
    url: {
      type: String,
      default: ""
    },
    showPage: {
      type: Boolean,
      default: true
    },
    method: {
      type: String,
      default: "get"
    },
    param: {
      type: Object,
      default: () => {
        return {};
      }
    },
    select: {
      type: Boolean,
      default: true
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
    pageSizes: {
      type: Array,
      default: () => {
        return [10, 20, 50];
      }
    }
  },
  mounted() {
    this.getData();
  },
  computed: {
    visibleColumns: function() {
      return this.columns.filter(val => {
        return typeof val.hidden != "undefined" ? !val.hidden : true;
      });
    }
  },
  methods: {
    getData() {
      if (this.showPage) {
        this.param["pageNo"] = this.pageNo;
        this.param["pageSize"] = this.pageSize;
      }
      this.loading = true;
      this.$http[this.method](this.url, this.param)
        .then(json => {
          this.loading = false;
          if (json.code == "1") {
            if (this.showPage) {
              this.total = json.data.total;
              this.rows = json.data.records;
            }else{
              this.rows = json.data;
            }
          } else {
            this.$message.warning({
              message: "数据加载异常"
            });
          }
          this.$emit('loadComplete');
        })
        .catch(() => {
          this.loading = false;
        });
    },
    reload(param) {
      this.param = Object.assign(this.param, param);
      this.getData();
    },
    //分页事件回调函数
    sizeChange(size) {
      //每页大小
      console.log("size", size);
      this.pageSize = size;
      this.getData();
    },
    currentChange(page) {
      //页面变更
      console.log("current", page);
      this.pageNo = page;
      this.getData();
    }
  }
};
</script>
