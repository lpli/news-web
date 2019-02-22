 <template>
  <div>
    <table-list :columns="columns" :showIndex="showIndex" ref="demoTable" :url="url">
      <el-table-column slot="append" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="edit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
      <div slot="phone">
        <template slot-scope="scope">xxx {{scope.row['phone']}}</template>
      </div>
    </table-list>
    <el-dialog :title="title" :visible.sync="showDialog">
      <el-form ref="userForm" :model="userForm" size="medium" label-width="100px">
        <el-form-item prop="id" v-show="false">
          <el-input v-model="userForm.id"></el-input>
        </el-form-item>
        <el-form-item prop="userName" label="用户名">
          <el-input v-model="userForm.userName"></el-input>
        </el-form-item>
        <el-form-item prop="nickName" label="昵称">
          <el-input v-model="userForm.nickName"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import TableList from "@/components/table-list";
export default {
  name: "UserList",
  components: { TableList },
  data() {
    return {
      title:'编辑',
      showDialog:false,
      userForm: {
        id: "",
        userName: "",
        nickName: ""
      },
      url: "/user/pageList",
      columns: [
        {
          label: "ID",
          prop: "id",
          hidden: true
        },
        {
          label: "用户名",
          prop: "userName"
        },
        {
          label: "昵称",
          prop: "nickName"
        },
        {
          label: "电话",
          prop: "phone"
        }
      ],
      showIndex: false
    };
  },
  methods: {
    edit(row) {
      this.showDialog = true;
      this.userForm = row;
    }
  }
};
</script>

 
