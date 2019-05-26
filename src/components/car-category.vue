 <template>
  <div>
    <table-list :columns="columns" :showIndex="showIndex" ref="categoryTable" :url="url" :showPage="false">
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
      <el-form
        ref="categoryForm"
        :model="categoryForm"
        size="medium"
        label-width="100px"
      >
        <el-form-item prop="id" v-show="false">
          <el-input v-model="categoryForm.id"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="车型">
          <el-input v-model="categoryForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="price" label="价格">
          <el-input v-model.number="categoryForm.price" ></el-input>
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
    return {
      title: "编辑",
      showDialog: false,
      options: [],
      categoryForm: {
        id: "",
        letter: "",
        band: "",
        model: 1,
        name: 1,
        price: 0
      },
      url: "/carCategory/list",
      columns: [
        {
          label: "ID",
          prop: "id",
          hidden: true
        },
        {
          label: "车型",
          prop: "name"
        },
        {
          label: "价格",
          prop: "price"
        }
      ],
      showIndex: false,
      // rules: {
      //   name: [
      //     {
      //       required: true,
      //       message: "请输入栏目名称",
      //       trigger: ["blur", "change"]
      //     },
      //     {
      //       max: 100,
      //       min: 2,
      //       message: "长度为2~100",
      //       trigger: ["blur", "change"]
      //     },
      //     {
      //       validator: checkName,
      //       trigger: ["blur", "change"]
      //     }
      //   ],
      //   code: [
      //     {
      //       required: true,
      //       message: "请输入编码",
      //       trigger: ["blur", "change"]
      //     },
      //     {
      //       pattern: /^[0-9]{2,10}$/,
      //       message: "2~10位数字",
      //       trigger: ["blur", "change"]
      //     },
      //     {
      //       validator: checkCode,
      //       trigger: ["blur", "change"]
      //     }
      //   ],
      //   pid: [
      //     {
      //       validator: checkPid,
      //       trigger: ["blur", "change"]
      //     }
      //   ]
      // }
    };
  },
  methods: {
    edit(row) {
      this.showDialog = true;
      this.categoryForm = Object.assign({}, row);
    },
    remoteMethod(query) {
      if (query) {
        this.$http.get("/category/nameList").then(json => {
          if (json.code == 1) {
            this.options = json.data.filter((item)=>{
                return item.name.toLowerCase().indexOf(query.toLowerCase())>-1;
            });
          }
        });
      }
    },
    change(val){
        this.categoryForm.pid = val;
    },
    add() {
      this.showDialog = true;
      this.categoryForm = {
        id: "",
        name: "",
        code: "",
        level: 1,
        seq: 1,
        pid: null
      };
    },
    del(row) {
      this.$confirm("确认删除么?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http.delete("/carCategory/" + row.id ).then(json => {
          if (json.code == "1") {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.$refs.categoryTable.getData();
          }
        });
      });
    },
    submit() {
      this.$refs.categoryForm.validate(valid => {
        if (!valid) {
          return;
        }
        if (this.categoryForm.id) {
          this.$http.post("/carCategory/update", this.categoryForm).then(json => {
            this.showDialog = false;
            if (json.code == "1") {
              this.$message({
                message: "操作成功",
                type: "success"
              });
              this.$refs.categoryTable.getData();
            } else {
              this.$message({
                message: "操作失败",
                type: "success"
              });
            }
          });
        } else {
          this.$http.post("/carCategory/add", this.categoryForm).then(json => {
            this.showDialog = false;
            if (json.code == "1") {
              this.$message({
                message: "操作成功",
                type: "success"
              });
              this.$refs.categoryTable.getData();
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

 
