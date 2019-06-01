<template>
  <el-container :class="isCollapse?'collaspe':''  ">
    
    <el-aside>
      <sider-menu :menuList="menuList" :collapse="isCollapse"></sider-menu>
    </el-aside>
    <el-container>
      <el-header >
        <el-row class="header-bar">
          <div class="header-title">
            <i :class="['aside-op',iconName]" @click="collapseClick"></i>
            EV网后台管理系统
          </div>
          <user-profile></user-profile>
        </el-row>
      </el-header>

      <el-scrollbar class="main-scrollbar">
        <el-main>
          <router-view/>
        </el-main>
      </el-scrollbar>
       
    </el-container>
    <el-backtop target=".main-scrollbar .el-scrollbar__wrap" :bottom="100" :right="100">up</el-backtop>
  </el-container>
</template>


<script>
import "@/assets/style/variables.less"
import UserProfile from "@/components/user-profile";
import SiderMenu from "@/components/sider-menu";
export default {
  name: "admin-home",
  components: { UserProfile, SiderMenu },
  data() {
    return {
      isCollapse: false,
      iconName: "el-icon-third-outdent",
      menuList: []
    };
  },
  mounted() {
    this.$http.get("/menu/list").then(json => {
      if (json.code) {
        this.menuList = json.data;
      }
    });
  },
  methods: {
    collapseClick: function() {
      this.isCollapse = !this.isCollapse;
      this.iconName = this.isCollapse
        ? "el-icon-third-indent"
        : "el-icon-third-outdent";
    }
  }
};
</script>

<style lang="less">
.aside-op {
  line-height: @hheight;
  display: inline;
  padding: 0px 15px;
  cursor: pointer;
}

.el-container.collaspe {
  .el-aside {
    width: 65px !important;
    .el-menu {
      .el-submenu__title {
        span[slot="title"] {
          display: none;
        }
        .el-submenu__icon-arrow {
          display: none;
        }
      }
    }
  }
  .sidebar-container {
    .sidebar-title {
      width:65px;
      .sidebar-title-text {
        display: none;
      }
    }
  }
}
.el-aside {
  box-shadow: -1px 0px 2px 2px #f5f7fa;
  transition: width 0.4s;
  -webkit-transition: width 0.4s;
  transition-timing-function: ease;
  -webkit-transition-timing-function: ease;
  width: 210px !important;
  background-color: @hbgcolor;
  color:@tcolor;
  .sidebar-container {
    .sidebar-title {
      .sidebar-title-text {
        display: inline;
      }
    }
  }
}

.header-bar {
  height: @hheight;
  line-height: @hheight;
  margin-left: -20px;
  margin-right: -20px;
  box-shadow: 5px 0px 2px 2px #f5f7fa;
}
.header-title {
  line-height: @hheight;
  height: @hheight;
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
  padding-right:17px;
  background-color: #000c17;
  .el-menu-item{
    width: 210px;
    color:inherit;
    i{
      color:inherit;
    }
  }
  .el-submenu{
    width: 210px;
    .el-icon-info{
      color:inherit;
    }
    .el-submenu__title{
      color:inherit;
      i{
        color:inherit;
      }
    }
  }
  background-color: inherit;
  color:inherit;
  
}
.el-menu--collapse.el-menu{
  .el-menu-item{
    width: auto;
  }
  .el-submenu{
    width: auto;
  }
}

.el-menu--vertical{
  background-color: @hbgcolor;
  color:@tcolor;
}
.el-menu--popup.el-menu{
  padding-right:0px;
  .el-menu-item{
    &:hover,&:focus{
      background: @abgcolor;
      color:@tcolor;
      &>i{
        color:@tcolor;
      }
    }
  }
  .el-submenu__title{
    &:hover,&:focus{
      background: @abgcolor;
      color:@tcolor;
      &>i{
        color:@tcolor;
      }
    }
  }
}

body {
  padding: 0;
  margin: 0;
  height: 100%;
}

html {
  height: 100%;
}

.user-ul {
  list-style: none;
  margin: 0;
  padding: 0;
  text-align: center;
}
.main-scrollbar {
  height: 100%;
  background-color: @mbgcolor;
  padding:10px 0px 10px 10px;
  .el-scrollbar__wrap {
    overflow: auto;
    .el-scrollbar__view {
      height: 100%;
      .el-main {
        background-color: #fff;
      }
    }
  }
}

.el-tree-node__content {
  height: 40px;
  line-height: 40px;
  .custom-tree-node {
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

.sidebar-container {
  background: inherit;
  color: inherit;
  height:100%;
  .sider-scrollbar {
    height: 100%;
    .sidebar-title {
      height: @hheight;
      line-height: @hheight;
      text-align: center;
      font-size: 16px;
      .el-icon {
        font-size: 22px;
      }
      .sidebar-title-text {
        padding: 10px;
      }
    }
    .el-scrollbar__wrap {
      overflow: auto;
    }
  }
}

.el-menu-vertical-demo {
  .el-submenu__title:hover {
    background: @abgcolor;
    color: @tcolor;
    i {
      color: @tcolor;
    }
  }
  .el-menu-item:focus,
  .el-menu-item:hover,
  .el-menu-item.is-active {
    background: @abgcolor;
    color: @tcolor;
    i {
      color: @tcolor;
    }
  }
}
</style>
