<template>
  <el-container>
    <el-collapse-transition>
      <el-aside :width="asideWidth">
        <el-scrollbar class="default-scrollbar">
          <el-menu
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
            text-color="#fff"
            background-color="#545c64"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">导航一</span>
              </template>
              <el-menu-item-group>
                <span slot="title">分组一</span>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <span slot="title">选项4</span>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">导航二</span>
              </template>
              <el-menu-item-group>
                <span slot="title">分组一</span>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="2-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="2-4">
                <span slot="title">选项4</span>
                <el-menu-item index="2-4-1">选项1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="3" disabled>
              <i class="el-icon-document"></i>
              <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">导航四</span>
            </el-menu-item>
          </el-menu>
        </el-scrollbar>
        <div :class="['aside-op',isCollapse?'':'active']" @click="collapseClick">
          <i :class="iconName"></i>
        </div>
      </el-aside>
    </el-collapse-transition>
    <el-container>
      <el-header>
        <el-row class="header-bar">
          <el-col class="header-title" :span="3">后台管理</el-col>
          <user-profile
            imgSrc="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
          ></user-profile>
        </el-row>
      </el-header>
      <el-main>
        <table-list :columns="columns"></table-list>
      </el-main>
      
    </el-container>
  </el-container>
</template>
<style lang="css">
.aside-op {
  position: absolute;
  top: 50%;
  z-index: 100;
  height: 60px;
  left: 65px;
  line-height: 60px;
  box-sizing: border-box;
  border: 1px solid #e6e6e6;
  border-left: none;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  cursor: pointer;
  width: 20px;
  text-align: center;
  background-color: #545c64;
  color: #fff;
}

.aside-op.active {
  left: 200px;
}

.aside-op:hover,
.aside-op:focus,
.aside-op:active {
  box-shadow: 2px 0px 1px 1px #e6e6e6;
}

.el-aside {
  background-color: #545c64;
}

.header-bar {
  height: 60px;
  line-height: 60px;
  margin-left: -20px;
  margin-right: -20px;
  box-shadow: 2px 0px 2px 2px #f5f7fa;
}
.header-title {
  padding: 0px 20px;
  font-size: 15px;
}

.el-container {
  height: 100%;
}

.el-menu {
  border: none;
  background-color: transparent;
}

.el-submenu__title:hover,
.el-menu-item:focus,
.el-menu-item:hover {
  background-color: #909399;
}

body {
  padding: 0;
  margin: 0;
  height: 100%;
}

html {
  height: 100%;
}

.default-scrollbar {
  width: 100%;
  height: 100%;
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}

.user-ul {
  list-style: none;
  margin: 0;
  padding: 0;
  text-align: center;
}


</style>

<script>
import UserProfile from "@/components/user-profile";
import TableList from "@/components/table-list";
export default {
  name: "Admin",
  components: { UserProfile, TableList },
  data() {
    return {
      isCollapse: false,
      iconName: "el-icon-d-arrow-left",
      asideWidth: "200px",
      columns: [
        {
          label: "ID",
          prop: "id"
        },
        {
          label: "名称",
          prop: "name"
        }
      ]
    };
  },
  methods: {
    collapseClick: function() {
      this.isCollapse = !this.isCollapse;
      this.iconName = this.isCollapse
        ? "el-icon-d-arrow-right"
        : "el-icon-d-arrow-left";
      this.asideWidth = this.isCollapse ? "65px" : "200px";
    }
  }
};
</script>
