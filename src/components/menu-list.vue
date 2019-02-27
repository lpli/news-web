 <template>
  <div>
    <div class="btn-bar">
      <el-button @click="show" type="primary" size="mini">新增</el-button>
    </div>
    <el-tree
      :data="menuList"
      node-key="id"
      default-expand-all
      @node-drag-start="handleDragStart"
      @node-drag-enter="handleDragEnter"
      @node-drag-leave="handleDragLeave"
      @node-drag-over="handleDragOver"
      @node-drag-end="handleDragEnd"
      @node-drop="handleDrop"
      :props="treeProp"
      draggable
      :allow-drop="allowDrop"
      :allow-drag="allowDrag"
      ref="menuTree"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span class="tree-node-label">{{ node.label }}</span>
        <span class="tree-node-ops">
          <el-button type="text" @click.stop="append(node,data)">
            <i class="el-icon-circle-plus"></i>
          </el-button>
          <el-button type="text" @click.stop="edit(node,data)">
            <i class="el-icon-edit"></i>
          </el-button>
          <el-button type="text" @click.stop="remove(node,data)">
            <i class="el-icon-delete"></i>
          </el-button>
        </span>
      </span>
    </el-tree>
    <el-dialog :visible.sync="showDialog" :title="dialogTitle" :modal="false">
      <el-form :model="menuForm" label-width="100px" :rules="rules" status-icon ref="menuForm" >
        <el-form-item prop="id" v-show="false">
          <el-input v-model="menuForm.id"></el-input>
        </el-form-item>
        <el-form-item prop="seq" label="编号">
          <el-input v-model.number="menuForm.seq"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="名称">
          <el-input v-model="menuForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="url" label="URL">
          <el-input v-model="menuForm.url"></el-input>
        </el-form-item>
        <el-form-item prop="pid" label="父id" v-show="false">
          <el-input v-model.number="menuForm.pid"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="add" type="primary">提交</el-button>
        <el-button @click="close">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style lang="less" >
.el-tree-node__content {
  height: 40px;
  line-height: 40px;
  .custom-tree-node {
    width: 100%;
    padding-left: 10px;
    .tree-node-ops {
      padding-left: 100px;
      > button {
        display: none;
      }
    }
  }
}

.el-tree-node__content:hover {
  .custom-tree-node {
    .tree-node-ops {
      > button {
        display: inline-block;
      }
    }
  }
}
</style>

<style lang="less" scoped>
.btn-bar {
  margin-bottom: 10px;
}
</style>


<script>
import TableList from "@/components/table-list";
export default {
  name: "MenuList",
  components: { TableList },
  data() {
     let checkName = (rule,value,callback)=>{
       if(!value){
          callback(new Error("名称不能为空"));
          return;
       }
       this.$http.get("/menu/check",{id:this.menuForm.id,name:this.menuForm.name}).then((json)=>{
          if(json.code == '1'){
            callback();
          }else{
            callback(new Error(json.msg));
          }
       })
    };
    let checkSeq = (rule,value,callback)=>{
       if(!value){
          callback(new Error("编号不能为空"));
          return;
       }
       this.$http.get("/menu/check",{id:this.menuForm.id,seq:this.menuForm.seq}).then((json)=>{
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
       this.$http.get("/menu/check",{id:this.menuForm.id,url:this.menuForm.url}).then((json)=>{
          if(json.code == '1'){
            callback();
          }else{
            callback(new Error(json.msg));
          }
       })
    };
    return {
      treeProp: {
        label: "name"
      },
      menuList: [],
      menuForm: {
        id: "",
        seq: "",
        name: "",
        url: "",
        pid: 0
      },
      showDialog: false,
      dialogTitle: "",
      rules: {
        seq: [
          { required: true, message: "请输入数字编号", trigger: "blur" },
          {
            type: "integer",
            range: {
              max: 9999999,
              min: 0
            },
            message: "数字编号最大8位",
            trigger: ["blur", "change"]
          },
           {
            validator: checkSeq,
            trigger: ["blur", "change"]
          }
        ],
        pid: [{ type: "integer", message: "输入数字父id", trigger: "blur" }],
        name: [
          {
            required: true,
            message: "请输入名称",
            trigger: "blur"
          },
          {
            type: "string",
            range: { max: 60, min: 1 },
            message: "长度1~60",
            trigger: ["blur", "change"]
          },
           {
            validator: checkName,
            trigger: ["blur", "change"]
          }
        ],
        url: [
          {
            type: "string",
            pattern: /\/[\w\-_]+(\.[\w\-_]+)/,
            message: "url格式不正确",
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
  mounted() {
    this.getData();
  },
  methods: {
    close() {
      this.showDialog = false;
    },
    showTips() {
      this.$message({
        message: "亲！编号会决定菜单顺序哦~",
        type:'warning'
      });
    },
    show() {
      this.showDialog = true;
      this.showTips();
      this.dialogTitle = "新增";
      this.menuForm = {
        id: "",
        seq: "",
        name: "",
        url: "",
        pid: 0
      };
    },
    append(node, data) {
      this.showDialog = true;
      this.showTips();
      this.menuForm = {
        id: "",
        seq: data.seq,
        name: "",
        url: "",
        pid: data.id
      };
    },
    edit(node, data) {
      this.showDialog = true;
      this.showTips();
      this.dialogTitle = "编辑";
      let d = Object.assign({}, data);
      this.menuForm = d;
    },
    add() {
      this.$refs["menuForm"].validate(valid => {
        if (!valid) {
          return;
        }
        this.$http.post("/menu/create", this.menuForm).then(json => {
          if (json.code) {
            this.$message({
              message: "创建成功",
              type: "success"
            });
            this.getData();
            this.showDialog = false;
          }
        });
      });
    },
    getData() {
      this.$http.get("/menu/list").then(json => (this.menuList = json.data));
    },
    remove(node, data) {
      if (!node.isLeaf) {
        this.$message.warning({
          message: "有子菜单，不能直接删除"
        });
        return;
      }

      this.$confirm("确认删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http.delete("/menu/" + data.id + "/delete").then(json => {
          if (json.code == "1") {
            this.$refs["menuTree"].remove(node);
          } else {
            this.$message.error({
              message: json.msg
            });
          }
        });
      });
    },
    handleDragStart(node, ev) {
      console.log("drag start", node);
    },
    handleDragEnter(draggingNode, dropNode, ev) {
      console.log("tree drag enter: ", dropNode.label);
    },
    handleDragLeave(draggingNode, dropNode, ev) {
      console.log("tree drag leave: ", dropNode.label);
    },
    handleDragOver(draggingNode, dropNode, ev) {
      console.log("tree drag over: ", dropNode.label);
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      console.log("tree drag end: ", dropNode && dropNode.label, dropType);
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      console.log("tree drop: ", dropNode.label, dropType);
    },
    allowDrop(draggingNode, dropNode, type) {
      return dropNode.data.pid == draggingNode.data.pid && type !== "inner";
    },
    allowDrag(draggingNode) {
      return true;
    }
  }
};
</script>

 
