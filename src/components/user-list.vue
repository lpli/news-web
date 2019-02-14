 <template>
  <table-list :columns="columns" :showIndex="showIndex" ref="demoTable" :url="url">
    <el-table-column slot="append" label="操作">
      <template slot-scope="scope">
        <el-button size="mini">编辑</el-button>
        <el-button size="mini" type="danger">删除</el-button>
      </template>
    </el-table-column>
  </table-list>
</template>

<script>
import TableList from "@/components/table-list";
export default {
  name: "UserList",
  components: { TableList },
  data() {
    return {
      url:'/list' ,
      columns: [
        {
          label: "ID",
          prop: "id"
        },
        {
          label: "标题",
          prop: "title"
        }
      ],
      showIndex: true
    };
  }
};
</script>

 
