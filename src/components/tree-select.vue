<template>
  <div class="tree-select" v-loading="loading">
    <input :value="value" type="hidden" @input="$emit('input',$event.target.value)" ref="groupId">
    <el-row>
      <el-tag
        v-show="tagshow"
        size="medium"
        closable
        :disable-transitions="false"
        @close="close"
      >{{selected.name}}</el-tag>
      <el-button type="text" icon="el-icon-third-organization" @click="show = true">选择</el-button>
    </el-row>

    <el-dialog :title="title" :visible.sync="show" :append-to-body="true">
      <el-tree
        :data="list"
        :props="treeProps"
        node-key="id"
        ref="tree"
        show-checkbox
        :check-strictly="true"
        :expand-on-click-node="false"
        :modal-append-to-body="false"
        @node-click="click"
        @check-change="checkChange"
      >
        <span class="custom-tree-node" slot-scope="{ node }">
          <span class="tree-node-label">{{ node.label }}</span>
        </span>
      </el-tree>
      <div slot="footer">
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button @click="show = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="less" scoped>
</style>
<script>
export default {
  name: "treeSelect",
  data() {
    return {
      selected: {
        id: "",
        name: ""
      },
      show: false,
      loading: false,
      treeProps: {
        label: "name"
      }
    };
  },
  model: {
    prop: "value",
    event: "input"
  },
  props: {
    title: {
      type: String,
      default: "提示"
    },
    value: {
      type: String,
      default: ""
    },
    list: {
      type: Array,
      default: []
    }
  },
  computed: {
    tagshow: function() {
      return this.selected.id ? true : false;
    }
  },
  methods: {
    submit() {
      let arr = this.$refs.tree.getCheckedNodes();
      if (arr.length > 0) {
        this.show = false;
        this.selected = arr[0];
        this.$emit("select", arr[0]);
      }
    },
    click(data, node) {
      if (node.checked) {
        this.$refs.tree.setCheckedKeys([]);
      } else {
        this.$refs.tree.setCheckedKeys([data.id]);
      }
    },
    checkChange(data, isChecked) {
      if (isChecked) {
        this.$refs.tree.setCheckedKeys([data.id]);
      }
    },
    close() {
      this.$emit("select", { id: "" });
    }
  },
  mounted() {
    this.$watch("value", (nVal, oVal) => {
      if (nVal == "") {
        this.selected = {
          id: "",
          name: ""
        };
      } else {
        let arr = this.list.filter(val => {
          return val.id == nVal;
        });
        if (arr.length > 0) {
          this.selected = arr[0];
        }
      }
    });
    this.$watch("list", (nVal, oVal) => {
      let currentVal = this.value;
      let arr = this.list.filter(val => {
        return val.id == currentVal;
      });
      if (arr.length > 0) {
        this.selected = arr[0];
      }
    });
  }
};
</script>
