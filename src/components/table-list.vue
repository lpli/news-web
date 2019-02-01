<template>
  <div class="table-list">
    <el-table :data="rows" border stripe >
      <el-table-column type="index" v-show="showIndex"></el-table-column>
      <el-table-column
        v-for="(item,index) in columns"
        :prop="item.prop"
        :label="item.label"
        :fixed="item.fixed"
        :formatter="item.formatter"
      ></el-table-column>
    </el-table>
  </div>
</template>

<style scoped>
    .table-list{
        width:100%;
    }
</style>

<script>
export default {
  name: "table-list",
  data() {
    return {
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
      default: ()=>{}
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.rows = [
        {
          id: 1,
          name: "lee"
        },
        {
          id: 2,
          name: "li"
        },
         {
          id: 3,
          name: "li"
        }, {
          id: 4,
          name: "li"
        }, {
          id: 5,
          name: "li"
        },, {
          id: 6,
          name: "li"
        },, {
          id: 7,
          name: "li"
        },, {
          id: 8,
          name: "li"
        }
      ];
    }
  }
};
</script>
