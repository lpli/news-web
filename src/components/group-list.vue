 <template>
  <div>
    <div class="btn-bar">
      <el-button @click="show" type="primary" size="mini">新增</el-button>
    </div>
    <el-tree
      :data="groupList"
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
      ref="groupTree"
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
      <el-form :model="groupForm" label-width="100px" :rules="rules" status-icon ref="groupForm" >
        <el-form-item prop="id" v-show="false">
          <el-input v-model.number="groupForm.id"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="名称">
          <el-input v-model="groupForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="desc" label="说明">
          <el-input v-model="groupForm.desc" type="textarea"></el-input>
        </el-form-item>
        <el-form-item prop="pid" label="父id" v-show="false">
          <el-input v-model.number="groupForm.pid"></el-input>
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
  name: "GroupList",
  components: { TableList },
  data() {
    let checkName = (rule,value,callback)=>{
       if(!value){
          callback(new Error("名称不能为空"));
          return;
       }
       this.$http.get("/group/check",{id:this.groupForm.id,name:this.groupForm.name}).then((json)=>{
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
      groupList: [],
      groupForm: {
        id: "",
        name: "",
        desc: '',
        pid: 0
      },
      showDialog: false,
      dialogTitle: "",
      rules: {
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
            validator:checkName,
            trigger: ["blur", "change"]
          }
        ],
        desc: [
          {
            type: "string",
            range: { max: 500, min: 0 },
            message: "长度1~500",
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
    show() {
      this.showDialog = true;
      this.dialogTitle = "新增";
      this.groupForm = {
        id: "",
        name:'',
        desc:"",
        pid: 0
      };
    },
    append(node, data) {
      this.showDialog = true;
      this.groupForm = {
        id: "",
        name:'',
        desc:"",
        pid: data.id
      };
    },
    edit(node, data) {
      this.showDialog = true;
      this.dialogTitle = "编辑";
      let d = Object.assign({}, data);
      this.groupForm = d;
    },
    add() {
      this.$refs["groupForm"].validate(valid => {
        if (!valid) {
          return;
        }
        this.$http.post("/group/create", this.groupForm).then(json => {
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
      this.$http.get("/group/list").then(json => (this.groupList = json.data));
    },
    remove(node, data) {
      if (!node.isLeaf) {
        this.$message.warning({
          message: "有子分组，不能直接删除"
        });
        return;
      }

      this.$confirm("确认删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http.delete("/group/" + data.id + "/delete").then(json => {
          if (json.code == "1") {
            this.$refs["groupTree"].remove(node);
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

 
