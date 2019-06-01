 <template>
  <el-row :gutter="20" class="car-category">
    <el-col :span="6">
      <car-selector @select="selectCategory"></car-selector>
    </el-col>
    <el-col :span="18">
      <table-list :columns="columns" :showIndex="showIndex" ref="categoryTable" :url="url" :showPage="false" >
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
    </el-col>
    
    <el-dialog :title="title" :visible.sync="showDialog">
      <el-form
        ref="categoryForm"
        :model="categoryForm"
        size="medium"
        :rules="rules"
        label-width="100px"
        :show-message="false"
      >
        <el-form-item prop="id" v-show="false">
          <el-input v-model="categoryForm.id"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="车型">
          <el-input v-model="categoryForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="price" label="价格(万元)">
          <el-input v-model="categoryForm.price" ></el-input>
        </el-form-item>
        <el-form-item prop="category" label="车系">
          <car-selector v-model="categoryForm.category" @select="select"></car-selector>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button @click="showDialog = false">关闭</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>
<style lang="less" scoped>
.car-category{
  width:100%;
  height:100%;
}

</style>

<script>
import TableList from "@/components/table-list";
import CarSelector from "@/components/car-selector";
import moment from "moment";
export default {
  name: "OpsList",
  components: { TableList,CarSelector},
  data() {
    let check = (rule, value, callback) => {
      let param = Object.assign({},this.categoryForm);
      param.price = null;
      this.$http
        .post("/carClass/check", param)
        .then(json => {
          if (json.code == "1") {
            callback();
          } else {
            this.$message({
              type:'error',
              message:json.msg
            });
            callback();
          }
        });
    };
    return {
      title: "编辑",
      showDialog: false,
      options: [],
      categoryForm: {
        id: "",
        name: '',
        price: null,
        letter: "",
        brand: "",
        model: 1,
        company:'',
        category:null
      },
      url: "/carClass/list",
      columns: [
        {
          label: "ID",
          prop: "id",
          hidden: true
        },
         {
          label: "品牌",
          prop: "brand"
        },
        {
          label: "车型",
          prop: "name"
        },
        {
          label: "价格（万）",
          prop: "price"
        }
      ],
      showIndex: false,
      rules: {
        name: [
          {
            required: true,
            message: "请输入车型",
            trigger: ["blur", "change"]
          },
          {
            max: 100,
            min: 2,
            message: "长度为2~100",
            trigger: ["blur", "change"]
          },
          {
            validator: check,
            trigger: ["blur", "change"]
          }
        ],
        price: [
          {
            required: true,
            message: "请输入价格",
            trigger: ["blur", "change"]
          },
          {
            pattern: /^[0-9]+([.]{1}[0-9]{0,2}){0,1}$/,
            message: "格式####.##",
            trigger: ["blur", "change"]
          }
        ],
        category: [
          {
            validator: (rule, value, callback)=>{
               if(typeof value == 'undefined'){
                 callback(new Error("请选择车型"));
               }
               callback();
            },
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  methods: {
    selectCategory(item){
      if(item){
        this.$refs.categoryTable.reload({
          model:item.model
        });
      }else{
        this.$refs.categoryTable.reload();
      }

    },
    edit(row) {
      this.categoryForm = Object.assign({}, row);
      this.categoryForm.category = {};
      this.categoryForm.category.model = this.categoryForm.model;
      this.categoryForm.category.letter = this.categoryForm.letter;
      this.categoryForm.category.brand = this.categoryForm.brand;
      this.categoryForm.category.company = this.categoryForm.company;
      this.showDialog = true;
    },
    select(item){
      this.categoryForm.category = item;
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
        name: '',
        price: null,
        letter: "",
        brand: "",
        model: 1,
        company:'',
        category:null
      };
    },
    del(row) {
      this.$confirm("确认删除么?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http.delete("/carClass/" + row.id ).then(json => {
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
        this.categoryForm = Object.assign(this.categoryForm,this.categoryForm.category);
        if (this.categoryForm.id) {
          this.$http.post("/carClass/update", this.categoryForm).then(json => {
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
                type: "error"
              });
            }
          });
        } else {
          this.$http.post("/carClass/add", this.categoryForm).then(json => {
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
                type: "error"
              });
            }
          });
        }
      });
    }
  }
};
</script>

 
