<template>
  <div class="header-container">
    <el-row class="header-top">
      <el-col :span="20">
         
      </el-col>
    </el-row>
    <el-row class="header-search">
      <el-col :span="2" :offset="4">
        <img :src="logo" height="40">
      </el-col>
      <el-col :span="8">
        <el-input placeholder="请输入内容" class="input-search" type="text">
          <el-button slot="append" >搜索</el-button>
        </el-input>
      </el-col>
    </el-row>
    <el-row class="tab-div">
      <el-menu :default-active="activeIndex" class="el-menu-tab" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">首页</el-menu-item>
      <el-menu-item index="2">
        EV观
      </el-menu-item>
      <el-menu-item index="3" >E车讯</el-menu-item>
      <el-menu-item index="4">科技苑</el-menu-item>
      <el-menu-item index="5">精选文章</el-menu-item>
      <el-menu-item index="6">燃漫</el-menu-item>
      <el-menu-item index="7">精彩热点</el-menu-item>
    </el-menu>
    </el-row>
  </div>
</template>
<style lang="css" scoped>
.header-top {
  background-color: #585858;
  height: 39px;
  line-height: 39px;
}
.tab-div{
    border-bottom: 1px solid #fff;
    height: 50px;
    box-shadow: 0 5px 10px rgba(0,0,0,.1);
}

 .el-menu-tab{
    color: #000;
    font-weight: 700;
    width: 1000px;
    margin: 0 auto
}

.el-menu--horizontal{
    border-bottom:0px;
}

.el-menu--horizontal>.el-menu-item{
    height: 50px;
    line-height: 50px;
}

.header-search {
  padding-top:30px;
  padding-bottom: 30px;
}

.el-input__inner {
  border-radius: 0;
}

.el-input-group__append{
  border-radius:0;
}
.el-button{
  border-radius:0;
}



</style>

<script>
import Logo from "../assets/logo_one.png";
export default {
  name: "l-header",
  data() {
    return {
      logo: Logo,
      activeIndex: '1'
    };
  },
  mounted() {},
  computed: {},
  methods: {
    handleSelect(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>
