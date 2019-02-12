<template>
  <el-container>
    <el-aside :width="asideWidth">
      <el-scrollbar class="default-scrollbar">
        <el-menu
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
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
    </el-aside>
    <el-container>
      <el-header>
        <el-row class="header-bar">
          <div class="header-title">
            <i :class="['aside-op',iconName]" @click="collapseClick"></i>
          </div>
          <user-profile
            imgSrc="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
          ></user-profile>
        </el-row>
      </el-header>
      <el-main>
        <table-list :columns="columns" :showIndex="showIndex"></table-list>
      </el-main>
    </el-container>
  </el-container>
</template>
<style lang="css">
.aside-op {
  line-height: 60px;
  font-size: 40px;
  display: inline-block;
  padding: 0px 15px;
  color:#409EFF;
}



.header-bar {
  height: 60px;
  line-height: 60px;
  margin-left: -20px;
  margin-right: -20px;
  box-shadow: 5px 0px 2px 2px #f5f7fa;
}
.header-title {
  line-height: 60px;
  height: 60px;
  display: inline-block;
}
.header-title-text {
  display: inline-block;
  text-decoration: none;
}

.el-container {
  height: 100%;
}

.el-menu {
  border: none;
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
      iconName: "el-icon-third-outdent",
      asideWidth: "200px",
      columns: [
        {
          label: "ID",
          prop: "id"
        },
        {
          label: "标题",
          prop: "title",
        }
      ],
      showIndex:true
    };
  },
  methods: {
    collapseClick: function() {
      this.isCollapse = !this.isCollapse;
      this.iconName = this.isCollapse
        ? "el-icon-third-indent"
        : "el-icon-third-outdent";
      this.asideWidth = this.isCollapse ? "65px" : "200px";
    }
  }
};
</script>
