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
.aside-op {
  line-height: 60px;
  font-size: 40px;
  display: inline-block;
  padding: 0px 15px;
  color: #999;
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
}
.el-aside {
  box-shadow: -1px 0px 2px 2px #f5f7fa;
  transition: width 0.3s;
  -webkit-transition: width 0.3s;
  transition-timing-function: ease-in-out;
  -webkit-transition-timing-function: ease-in-out;
  width: 200px !important;
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
  .el-scrollbar__wrap {
    overflow-x: hidden;
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
