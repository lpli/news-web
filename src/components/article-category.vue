 <template>
  <div>
    <table-list
      :columns="columns"
      :showIndex="showIndex"
      ref="categoryTable"
      :url="url"
      :showPage="false"
      @loadComplete="complete"
    >
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
        :rules="rules"
      >
        <el-form-item prop="id" v-show="false">
          <el-input v-model="categoryForm.id"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="栏目名称">
          <el-input v-model="categoryForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="code" label="编码">
          <el-input v-model="categoryForm.code"></el-input>
        </el-form-item>
        <el-form-item prop="level" label="级别">
          <el-input-number v-model="categoryForm.level" :min="1" @change="changeLevel"></el-input-number>
        </el-form-item>
        <el-form-item prop="pid" label="上级栏目">
          <el-select
            v-model="categoryForm.pid"
            clearable
            placeholder="请选择"
            filterable
            :filter-method="remoteMethod"
            @change="change"
            :disabled="categoryForm.level == 1"
          >
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="seq" label="排序">
          <el-input-number v-model="categoryForm.seq" :min="1"></el-input-number>
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
    let checkName = (rule, value, callback) => {
      if (!value) {
        callback(new Error("名称不能为空"));
        return;
      }
      this.$http
        .get("/category/check", {
          id: this.categoryForm.id,
          name: this.categoryForm.name
        })
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
        .get("/category/check", {
          id: this.categoryForm.id,
          code: this.categoryForm.code
        })
        .then(json => {
          if (json.code == "1") {
            callback();
          } else {
            callback(new Error(json.msg));
          }
        });
    };
    let checkPid = (rule, value, callback) => {
      this.$http
        .get("/category/check", {
          id: this.categoryForm.id,
          pid: this.categoryForm.pid,
          level: this.categoryForm.level
        })
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
      showDialog: false,
      options: [],
      categoryForm: {
        id: "",
        name: "",
        code: "",
        level: 1,
        seq: 1,
        pid: null
      },
      url: "/category/list",
      columns: [
        {
          label: "ID",
          prop: "id",
          hidden: true
        },
        {
          label: "栏目名",
          prop: "name"
        },
        {
          label: "编码",
          prop: "code"
        },
        {
          label: "栏目级别",
          prop: "level"
        },
        {
          label: "上级栏目",
          prop: "pid",
          hidden: true
        },
        {
          label: "排序",
          prop: "seq"
        }
      ],
      showIndex: false,
      rules: {
        name: [
          {
            required: true,
            message: "请输入栏目名称",
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
            pattern: /^[0-9]{2,10}$/,
            message: "2~10位数字",
            trigger: ["blur", "change"]
          },
          {
            validator: checkCode,
            trigger: ["blur", "change"]
          }
        ],
        pid: [
          {
            validator: checkPid,
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  methods: {
    edit(row) {
      this.showDialog = true;
      this.categoryForm = Object.assign({}, row);
    },
    complete(){
        this.options = this.$refs.categoryTable.rows;
    },
    changeLevel(){
      this.options = this.$refs.categoryTable.rows.filter(item=>{
        return item.level == this.categoryForm.level -1;
      })
    },
    remoteMethod(query) {
      if (query) {
          this.options = this.options.filter(item => {
            return item.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
      }
    },
    change(val) {
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
        this.$http.delete("/category/" + row.id).then(json => {
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
          this.$http.post("/category/update", this.categoryForm).then(json => {
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
          this.$http.post("/category/add", this.categoryForm).then(json => {
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

 
