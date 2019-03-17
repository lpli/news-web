<template>
  <div class="sidebar-container">
    <el-scrollbar class="sider-scrollbar">
      <div class="sidebar-title">
        <i class="el-icon el-icon-third-bank"></i><span class="sidebar-title-text">后台管理</span>
      </div>
      <el-menu class="el-menu-vertical-demo" :collapse="collapse" router>
        <sider-menu-item v-for="menu in menuList" :key="menu.id" :item="menu"></sider-menu-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

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

