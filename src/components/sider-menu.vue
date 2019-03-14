<template>
  <div class="sidebar-container">
    <el-scrollbar class="sider-scrollbar">
      <el-menu class="el-menu-vertical-demo" :collapse="collapse" router>
        <sider-menu-item v-for="menu in menuList" :key="menu.id" :item="menu"></sider-menu-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<style lang="less" >
.sidebar-container {
  height:100%;
  .sider-scrollbar {
    width: 100%;
    height: 100%;
    .el-scrollbar__wrap {
      overflow-x: hidden;
      
    }
  }
}
</style>

<script>
import SiderMenuItem from "@/components/sider-menu-item";
export default {
  name: "SiderMenu",
  components: { SiderMenuItem },
  props: {
    menuList: {
      type: Array,
      required: true
    },
    collapse: {
      type: Boolean,
      required: true
    }
  }
};
</script>

