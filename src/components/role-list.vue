 <template>
  <div>
    <table-list :columns="columns" :showIndex="showIndex" ref="roleTable" :url="url">
      <el-table-column slot="append" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="edit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </table-list>
    <el-dialog :title="title" :visible.sync="showDialog">
      <el-form ref="roleForm" :model="roleForm" size="medium" label-width="100px">
        <el-form-item prop="id" v-show="false">
          <el-input v-model="roleForm.id"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="角色名">
          <el-input v-model="roleForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="code" label="编码">
          <el-input v-model="roleForm.code"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import TableList from "@/components/table-list";
export default {
  name: "RoleList",
  components: { TableList },
  data() {
    return {
      title:'编辑',
      showDialog:false,
      roleForm: {
        id: "",
        name: "",
        code: ""
      },
      url: "/role/pageList",
      columns: [
        {
          label: "ID",
          prop: "id",
          hidden: true
        },
        {
          label: "角色名",
          prop: "name"
        },
        {
          label: "编码",
          prop: "code"
        }
      ],
      showIndex: false
    };
  },
  methods: {
    edit(row) {
      this.showDialog = true;
      this.roleForm = row;
    }
  }
};
</script>

 
