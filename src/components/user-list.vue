 <template>
  <div>
    <table-list :columns="columns" :showIndex="showIndex" ref="userTable" :url="url">
      <template slot="opsbar">
        <el-row>
          <el-button size="mini" type="success" @click="add">新增</el-button>
        </el-row>
      </template>
      <el-table-column slot="append" label="操作">
        <template slot-scope="scope">
          <el-row align="center">
            <el-button
              size="mini"
              type="text"
              @click="edit(scope.row)"
              icon="el-icon-third-edit-fill"
              title="编辑"
            ></el-button>
            <el-button
              size="mini"
              type="text"
              @click="edit(scope.row)"
              icon="el-icon-third-key"
              title="修改密码"
            ></el-button>
          </el-row>
        </template>
      </el-table-column>
      <template slot="status" slot-scope="scope">
        <el-tag :type="scope.row.enable?'success':'danger'">{{scope.row.enable?'已启用':'已禁用'}}</el-tag>
      </template>
    </table-list>
    <el-dialog :title="title" :visible.sync="showDialog">
      <el-form
        ref="userForm"
        :model="userForm"
        size="medium"
        label-width="100px"
        :rules="rules"
        status-icon
      >
        <el-form-item prop="id" v-show="false">
          <el-input v-model="userForm.id"></el-input>
        </el-form-item>
        <el-form-item prop="userName" label="用户名">
          <el-input v-model.trim="userForm.userName"></el-input>
        </el-form-item>
        <el-form-item prop="nickName" label="昵称">
          <el-input v-model.trim="userForm.nickName"></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="手机">
          <el-input v-model.trim="userForm.phone"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input v-model.trim="userForm.email" type="email"></el-input>
        </el-form-item>
        <el-form-item prop="enable" label="启用">
          <el-switch v-model="userForm.enable" active-color="#13ce66"></el-switch>
        </el-form-item>
        <el-form-item prop="groupId" label="组">
          <tree-select v-model="userForm.groupId" :list="groupList" @select="selectGroup"></tree-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button @click="close">关闭</el-button>
      </div>
    </el-dialog>

    <el-dialog></el-dialog>
  </div>
</template>

<script>
import TableList from "@/components/table-list";
import TreeSelect from "@/components/tree-select";
import moment from "moment";
export default {
  name: "UserList",
  components: { TableList, TreeSelect },
  data() {
    return {
      title: "编辑",
      showDialog: false,
      groupList: [],
      userForm: {
        id: "",
        userName: "",
        nickName: "",
        phone: "",
        email: "",
        enable: true,
        groupId: ""
      },
      rules: {
        userName: [
          {
            required: true,
            message: "请输入用户名",
            trigger: ["blur", "change"]
          },
          {
            min: 8,
            max: 20,
            message: "长度为8~20",
            trigger: ["blur", "change"]
          }
        ],
        nickName: [
          {
            required: true,
            message: "请输入昵称",
            trigger: ["blur", "change"]
          },
          {
            max: 80,
            message: "最大长度80",
            trigger: ["blur", "change"]
          }
        ],
        phone: [
          {
            required: true,
            message: "请输入手机号",
            trigger: ["blur", "change"]
          },
          {
            type: "string",
            pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
            message: "手机号格式不正确",
            trigger: ["blur", "change"]
          }
        ],
        email: [
          {
            required: true,
            message: "请输入邮箱",
            trigger: ["blur", "change"]
          },
          {
            type: "email",
            message: "邮箱格式不正确",
            trigger: ["blur", "change"]
          }
        ],
        enable: [
          {
            required: true,
            message: "请选择是否启用",
            trigger: ["blur", "change"]
          }
        ],
        groupId: [
          {
            required: true,
            message: "组不能为空",
            trigger: ["blur", "change"]
          }
        ]
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
          label: "手机",
          prop: "phone"
        },
        {
          label: "邮箱",
          prop: "email"
        },
        {
          label: "状态",
          prop: "enable",
          slotName: "status"
        },
        {
          label: "创建时间",
          prop: "createTime",
          formatter: (row, opts, val) => {
            return moment(val).format("YYYY-MM-DD");
          }
        },
        {
          label: "更新时间",
          prop: "updateTime",
          formatter: (row, opts, val) => {
            if (!val) {
              return "--";
            }
            return moment(val).format("YYYY-MM-DD");
          }
        }
      ],
      showIndex: false
    };
  },
  methods: {
    edit(row) {
      this.showDialog = true;
      this.title = "编辑";
      this.userForm = Object.assign(this.userForm, row);
      this.$http.get("/user/"+row.userName+"/group").then((json)=>{
        if(json.code == '1' && json.data){
          this.userForm.groupId = ''+json.data.id;
        }
      })
      this.$http.get('/group/list').then(json => {
        if (json.code == "1") {
          this.groupList = json.data;
        }
      });
    },
    selectGroup:function(group){
      this.userForm.groupId = ''+group.id;
    },
    add() {
      this.userForm = {
        id: "",
        userName: "",
        nickName: "",
        phone: "",
        email: "",
        enable: true,
        groupId: ''
      };
      this.showDialog = true;
      this.title = "新增";
    },
    close() {
      this.showDialog = false;
    },
    submit() {
      this.$refs.userForm.validate(valid => {
        console.log(this.userForm);
        if (!valid) {
          return;
        }
        if (this.userForm.id) {
          this.$http.put("/user/update", this.userForm).then(json => {
            this.showDialog = false;
            if (json.code == "1") {
              this.$message({
                message: "操作成功",
                type: "success"
              });
              this.$refs.userTable.getData();
            } else {
              this.$message({
                message: "操作失败:" + json.msg,
                type: "error"
              });
            }
          });
        } else {
          this.$http.post("/user/create", this.userForm).then(json => {
            this.showDialog = false;
            if (json.code == "1") {
              this.$message({
                message: "操作成功。新增用户密码为默认密码，请尽快修改",
                type: "success"
              });
              this.$refs.userTable.getData();
            } else {
              this.$message({
                message: "操作失败:" + json.msg,
                type: "error"
              });
            }
          });
        }
      });
    },
    changePwd(row) {}
  }
};
</script>

 
