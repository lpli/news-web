 <template>
  <div>
    <table-list
      :columns="columns"
      :showIndex="showIndex"
      ref="roleTable"
      :url="url"
      :select="select"
    >
      <template slot="opsbar">
        <el-row>
          <el-button size="mini" type="success" @click="add">新增</el-button>
        </el-row>
      </template>
      <el-table-column slot="append" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="edit(scope.row)" icon="el-icon-third-edit" type="text">编辑</el-button>
          <!-- <el-button size="mini" @click="edit(scope.row)" icon="el-icon-third-eye" type="text">查看</el-button> -->
          <el-button size="mini" @click="del(scope.row)" icon="el-icon-third-delete" type="text">删除</el-button>
          <el-button size="mini" @click="auth(scope.row)" icon="el-icon-third-plus" type="text">权限</el-button>
        </template>
      </el-table-column>
    </table-list>
    <el-dialog :title="title" :visible.sync="showDialog" width="900px">
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

    <el-dialog title="分配权限" :visible.sync="permissionDialog">
      <role-permission :roleId="roleId" ref="rolePer"></role-permission>
      <div slot="footer">
        <el-button type="primary" @click="authorization">提交</el-button>
        <el-button @click="permissionDialog = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TableList from "@/components/table-list";
import RolePermission from "@/components/role-permission";
import moment from "moment";
export default {
  name: "RoleList",
  components: { TableList, RolePermission },
  data() {
    let checkName = (rule, value, callback) => {
      if (!value) {
        callback(new Error("名称不能为空"));
        return;
      }
      this.$http
        .get("/role/check", { id: this.roleForm.id, name: this.roleForm.name })
        .then(json => {
          if (json.code == "1") {
            callback();
          } else {
            callback(new Error(json.msg));
          }
        });
    };
    let checkCode = (rule, value, callback) => {
      if (!value) {
        callback(new Error("编码不能为空"));
        return;
      }
      this.$http
        .get("/role/check", { id: this.roleForm.id, code: this.roleForm.code })
        .then(json => {
          if (json.code == "1") {
            callback();
          } else {
            callback(new Error(json.msg));
          }
        });
    };
    return {
      title: "编辑",
      select: false,
      showDialog: false,
      permissionDialog: false,
      roleId: null,
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
          },
          {
            validator: checkName,
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
            pattern: /^[a-zA-Z0-9_]{6,20}$/,
            message: "英文字母、下划线、数字的6~20位字符串",
            trigger: ["blur", "change"]
          },
          {
            validator: checkCode,
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  methods: {
    authorization() {
      this.$refs.rolePer.authorization(() => {
        this.permissionDialog = false;
        this.$refs.roleTable.reload();
      });
    },
    edit(row) {
      this.showDialog = true;
      this.roleForm = Object.assign({}, row);
    },
    auth(row) {
      this.roleId = row.id;
      this.permissionDialog = true;
      this.$nextTick(() => {
        this.$refs.rolePer.initData();
      });
    },
    del(row) {
      this.$confirm("确认删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http.delete("/role/" + row.id + "/delete").then(json => {
          if (json.code) {
            this.$refs.roleTable.reload();
          } else {
            this.$message.error({
              message: json.msg
            });
          }
        });
      });
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
              this.$refs.roleTable.reload();
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
              this.$refs.roleTable.reload();
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

 
