<template>
  <el-row :gutter="20">
    <el-col :span="12">
      <div class="permission-title">菜单权限</div>
      <el-tree
        :data="menuList"
        node-key="id"
        default-expand-all
        :props="treeProp"
        show-checkbox
        ref="groupTree"
      ></el-tree>
    </el-col>
    <el-col :span="12">
      <div class="permission-title">操作权限</div>
      <el-checkbox
        :indeterminate="isIndeterminate"
        v-model="checkAll"
        @change="handleCheckAllChange"
      >全选</el-checkbox>
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group v-model="checkOps">
        <el-checkbox
          v-for="operation in operationList"
          :label="operation.permissionId"
          :key="operation.id"
        >{{operation.name}}</el-checkbox>
      </el-checkbox-group>
    </el-col>
  </el-row>
</template>
<style scoped>
.permission-title {
  line-height: 20px;
  padding: 5px;
  margin-bottom: 10px;
}
</style>

<script>
export default {
  name: "RolePermission",
  data() {
    return {
      treeProp: {
        label: "name"
      },
      checkAll: false,
      menuList: [],
      operationList: [],
      checkOps: [], //
      isIndeterminate: true
    };
  },
  props: {
    roleId: {
      type: Number,
      default: null
    }
  },
  mounted() {
    this.initData();
  },
  computed: {
    checkedPermission() {
      let arr = [];
      arr = arr.concat(
        this.$refs.groupTree.getCheckedNodes().map(v => v.permissionId)
      );
      arr = arr.concat(
        this.$refs.groupTree.getHalfCheckedNodes().map(v => v.permissionId)
      );
      return arr;
    }
  },
  methods: {
    initData() {
      this.getMenu();
      this.getOps();
    },
    authorization(cb) {
      let tips = "";
      if (this.checkedPermission.length == 0) {
        tips = "菜单权限未选中";
      }
      if (this.checkOps.length == 0) {
        tips = "操作权限未选中";
      }
      if (tips) {
        this.$confirm(tips + ",确认提交吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "info"
        })
          .then(() => {
            this.auth(cb);
          })
          .catch(() => {});
      } else {
        this.auth(cb);
      }
    },
    auth(cb) {
      let permissionIds = this.checkedPermission.concat(this.checkOps);
      this.$http
        .post("/role/authorization", {
          permissionIds: permissionIds,
          roleId: this.roleId
        })
        .then(json => {
          if (json.code) {
            this.$message({
              type: "success",
              message: "分配成功"
            });
          } else {
            this.$message({
              type: "error",
              message: "分配失败:" + json.msg
            });
          }
          cb && cb();
        });
    },
    handleCheckAllChange(val) {
      this.checkOps = val
        ? this.operationList.map(v => {
            return v.permissionId;
          })
        : [];
      this.isIndeterminate = false;
    },
    getMenu() {
      this.$http.get("/menu/" + this.roleId + "/tree").then(json => {
        if (json.code) {
          this.menuList = json.data.allMenu;
          this.$nextTick(() => {
            let arr = json.data.checkedMenu.filter(v => {
              let node = this.$refs.groupTree.getNode(v.id);
              return node.isLeaf;
            });
            this.$refs.groupTree.setCheckedKeys(arr.map(v => v.id));
          });
        }
      });
    },
    getOps() {
      this.$http.get("/operation/" + this.roleId + "/list").then(json => {
        if (json.code) {
          this.operationList = json.data.allOps;
          this.checkOps = json.data.checkedOps.map(v => v.permissionId);
        }
      });
    }
  }
};
</script>
