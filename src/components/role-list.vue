 <template>
  <div>
    <table-list :columns="columns" :showIndex="showIndex" ref="roleTable" :url="url">
      <template slot="opsbar">
        <el-row>
          <el-button size="mini" type="success" @click="add">新增</el-button>
        </el-row>
      </template>
      <el-table-column slot="append" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="edit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </table-list>
    <el-dialog :title="title" :visible.sync="showDialog">
      <el-form ref="roleForm" :model="roleForm" size="medium" label-width="100px" :rules="rules">
        <el-form-item prop="id" v-show="false">
          <el-input v-model="roleForm.id"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="角色名">
          <el-input v-model="roleForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="code" label="编码">
          <el-input v-model="roleForm.code"></el-input>
        </el-form-item>
        <el-form-item prop="creator" v-show="false">
          <el-input v-model="roleForm.creator"></el-input>
        </el-form-item>
        <el-form-item prop="createTime" v-show="false">
          <el-input v-model="roleForm.createTime"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button @click="showDialog = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TableList from "@/components/table-list";
import moment from "moment";
export default {
  name: "RoleList",
  components: { TableList },
  data() {
    return {
      title: "编辑",
      showDialog: false,
      roleForm: {
        id: "",
        name: "",
        code: "",
        creator: "",
        createTime: null
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
        },
        {
          label: "创建人",
          prop: "creator",
          hidden: true
        },
        {
          label: "创建时间",
          prop: "createTime",
         formatter: (row, opts, val) => {
            return moment(val).format("YYYY-MM-DD HH:mm:ss");
          }
        }
      ],
      showIndex: false,
      rules: {
        name: [
          {
            required: true,
            message: "请输入角色名",
            trigger: ["blur", "change"]
          },
          {
            max: 100,
            min: 2,
            message: "长度为2~100",
            trigger: ["blur", "change"]
          }
        ],
        code: [
          {
            required: true,
            message: "请输入编码",
            trigger: ["blur", "change"]
          },
          {
            pattern: /^[a-zA-Z0-9]{6,20}$/,
            message: "英文字母加数字的6~20位字符串",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  methods: {
    edit(row) {
      this.showDialog = true;
      this.roleForm = Object.assign({}, row);
    },
    add() {
      this.showDialog = true;
      this.roleForm = {
        id: "",
        name: "",
        code: "",
        creator: "",
        createTime: null
      };
    },
    submit() {
      this.$refs.roleForm.validate(valid => {
        if (!valid) {
          return;
        }
        if (this.roleForm.id) {
          this.$http.put("/role/update", this.roleForm).then(json => {
            this.showDialog = false;
            if (json.code == "1") {
              this.$message({
                message: "操作成功",
                type: "success"
              });
              this.$refs.roleTable.getData();
            } else {
              this.$message({
                message: "操作失败",
                type: "success"
              });
            }
          });
        } else {
          this.$http.post("/role/create", this.roleForm).then(json => {
            this.showDialog = false;
            if (json.code == "1") {
              this.$message({
                message: "操作成功",
                type: "success"
              });
              this.$refs.roleTable.getData();
            } else {
              this.$message({
                message: "操作失败",
                type: "success"
              });
            }
          });
        }
      });
    }
  }
};
</script>

 
