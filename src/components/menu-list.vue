 <template>
  <div>
    <el-button @click="show" type="primary">新增</el-button>
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
    ></el-tree>
    <el-dialog :visible.sync="showDialog" title="新增">
      <el-form :model="menuForm" label-width="100px">
        <el-form-item prop="id">
          <el-input v-model="menuForm.id" type="hidden"></el-input>
        </el-form-item>
        <el-form-item prop="seq" label="编号">
          <el-input v-model="menuForm.seq"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="名称">
          <el-input v-model="menuForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="url" label="URL">
          <el-input v-model="menuForm.url"></el-input>
        </el-form-item>
        <el-form-item prop="pid" label="父id">
          <el-input v-model="menuForm.pid"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="add" type="primary">提交</el-button>
        <el-button @click="close">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TableList from "@/components/table-list";
export default {
  name: "MenuList",
  components: { TableList },
  data() {
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
        pid: ""
      },
      showDialog: false
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
    },
    add() {
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
    },
    getData() {
      this.$http
        .get("/menu/list")
        .then(json => (this.menuList = json.data));
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

 
