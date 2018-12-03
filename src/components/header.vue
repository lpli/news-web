<template>
  <div class="header-container">
    <el-row class="header-top">
      <el-col :span="20"></el-col>
    </el-row>
    <el-row class="header-search">
      <el-col :span="3" :offset="5">
        <img :src="logo" height="40">
      </el-col>
      <el-col :span="8">
        <el-input placeholder="请输入内容" class="input-search" type="text">
          <el-button slot="append" type="primary">搜索</el-button>
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10" :offset="5">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
          <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
          <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
          <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>
<style lang="less" scoped>
.header-top {
  background-color: #585858;
  height: 39px;
  line-height: 39px;
}

.el-button--primary {
  color: #fff !important;
  background-color: #409eff !important;
  border-color: #409eff !important;
  border-radius: 0;
}

.header-search {
  padding-top: 50px;
  padding-bottom: 50px;
}

.el-input__inner {
  border-radius: 0;
}
.el-tabs {
}
</style>

<script>
import Logo from "../assets/logo_one.png";
export default {
  name: "l-header",
  data() {
    return {
      logo: Logo,
      activeName: "second"
    };
  },
  mounted() {},
  computed: {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>
