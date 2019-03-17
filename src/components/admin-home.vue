<template>
  <el-container :class="isCollapse?'collaspe':''">
    <el-aside>
      <sider-menu :menuList="menuList" :collapse="isCollapse"></sider-menu>
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

      <el-scrollbar class="main-scrollbar">
        <el-main>
          <router-view/>
        </el-main>
      </el-scrollbar>
    </el-container>
  </el-container>
</template>
<style lang="less">
@hbgcolor:#409EFF;
@bgcolor: #409EFF;
@tcolor: #fff;
.aside-op {
  line-height: 60px;
  font-size: 30px;
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
      .sidebar-title-text {
        display: none;
      }
    }
  }
}
.el-aside {
  box-shadow: -1px 0px 2px 2px #f5f7fa;
  transition: width 0.3s;
  -webkit-transition: width 0.3s;
  transition-timing-function: ease-in-out;
  -webkit-transition-timing-function: ease-in-out;
  width: 200px !important;
  .sidebar-container {
    .sidebar-title {
      .sidebar-title-text {
        display: inline;
      }
    }
  }
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

.user-ul {
  list-style: none;
  margin: 0;
  padding: 0;
  text-align: center;
}
.main-scrollbar {
  height: 100%;
  .el-scrollbar__wrap {
    overflow-x: hidden;
    .el-main {
      height: 100%;
    }
  }
}

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

.sidebar-container {
  height: 100%;
  .sider-scrollbar {
    width: 100%;
    height: 100%;
    .sidebar-title {
      background: @hbgcolor;
      color: @tcolor;
      height: 60px;
      line-height: 60px;
      text-align: center;
      font-size: 22px;
      .el-icon {
        font-size: 22px;
      }
      .sidebar-title-text {
        padding: 10px;
      }
    }
    .el-scrollbar__wrap {
      overflow-x: hidden;
    }
  }
}

.el-menu-vertical-demo {
  .el-submenu__title:hover {
    background: @bgcolor;
    color: @tcolor;
    i {
      color: @tcolor;
    }
  }
  .el-menu-item:focus, .el-menu-item:hover,.el-menu-item.is-active{
    background: @bgcolor;
    color: @tcolor;
    i {
      color: @tcolor;
    }
  }
  
}
</style>

<script>
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
