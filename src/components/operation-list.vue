 <template>
  <div>
    <table-list :columns="columns" :showIndex="showIndex" ref="opsTable" :url="url">
      <template slot="opsbar">
        <el-row>
          <el-button size="mini" type="success" @click="add">新增</el-button>
        </el-row>
      </template>
      <el-table-column slot="append" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="edit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </table-list>
    <el-dialog :title="title" :visible.sync="showDialog">
      <el-form ref="opsForm" :model="opsForm" size="medium" label-width="100px" :rules="rules">
        <el-form-item prop="id" v-show="false">
          <el-input v-model="opsForm.id"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="操作名">
          <el-input v-model="opsForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="code" label="编码">
          <el-input v-model="opsForm.code"></el-input>
        </el-form-item>
        <el-form-item prop="url" label="URL">
          <el-input v-model="opsForm.url"></el-input>
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
  name: "OpsList",
  components: { TableList },
  data() {
    let checkName = (rule,value,callback)=>{
       if(!value){
          callback(new Error("名称不能为空"));
          return;
       }
       this.$http.get("/operation/check",{id:this.opsForm.id,name:this.opsForm.name}).then((json)=>{
          if(json.code == '1'){
            callback();
          }else{
            callback(new Error(json.msg));
          }
       })
    };
    let checkCode = (rule,value,callback)=>{
       if(!value){
          callback(new Error("编码不能为空"));
          return;
       }
       this.$http.get("/operation/check",{id:this.opsForm.id,code:this.opsForm.code}).then((json)=>{
          if(json.code == '1'){
            callback();
          }else{
            callback(new Error(json.msg));
          }
       })
    };
    let checkUrl = (rule,value,callback)=>{
       if(!value){
          callback(new Error("URL不能为空"));
          return;
       }
       this.$http.get("/operation/check",{id:this.opsForm.id,url:this.opsForm.url}).then((json)=>{
          if(json.code == '1'){
            callback();
          }else{
            callback(new Error(json.msg));
          }
       })
    };
    return {
      title: "编辑",
      showDialog: false,
      opsForm: {
        id: "",
        name: "",
        code: "",
        url: "",
        pid: null
      },
      url: "/operation/pageList",
      columns: [
        {
          label: "ID",
          prop: "id",
          hidden: true
        },
        {
          label: "操作名",
          prop: "name"
        },
        {
          label: "编码",
          prop: "code"
        },
        {
          label: "URL",
          prop: "url"
        }
      ],
      showIndex: false,
      rules: {
        name: [
          {
            required: true,
            message: "请输入操作名",
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
            pattern: /^[a-zA-Z0-9]{6,20}$/,
            message: "英文字母加数字的6~20位字符串",
            trigger: ["blur", "change"]
          },
           {
            validator: checkCode,
            trigger: ["blur", "change"]
          }
        ],
        url: [
          {
            required: true,
            message: "请输入URL",
            trigger: ["blur", "change"]
          },
          {
            type: "string",
            pattern: /^\/[A-Za-z0-9]+(\/[A-Za-z0-9]+)*$/,
            message: "URL格式不正确",
            trigger: ["blur", "change"]
          },
           {
            validator: checkUrl,
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  methods: {
    edit(row) {
      this.showDialog = true;
      this.opsForm = Object.assign({}, row);
    },
    add() {
      this.showDialog = true;
      this.opsForm = {
        id: "",
        name: "",
        code: "",
        url: ""
      };
    },
    del(row) {
      this.$confirm("确认删除么?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http.delete("/operation/" + row.id + "/delete").then(json => {
          if (json.code == "1") {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.$refs.opsTable.getData();
          }
        });
      });
    },
    submit() {
      this.$refs.opsForm.validate(valid => {
        if (!valid) {
          return;
        }
        if (this.opsForm.id) {
          this.$http.put("/operation/update", this.opsForm).then(json => {
            this.showDialog = false;
            if (json.code == "1") {
              this.$message({
                message: "操作成功",
                type: "success"
              });
              this.$refs.opsTable.getData();
            } else {
              this.$message({
                message: "操作失败",
                type: "success"
              });
            }
          });
        } else {
          this.$http.post("/operation/create", this.opsForm).then(json => {
            this.showDialog = false;
            if (json.code == "1") {
              this.$message({
                message: "操作成功",
                type: "success"
              });
              this.$refs.opsTable.getData();
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

 
