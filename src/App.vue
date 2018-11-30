<template>
  <div id="app">
    <el-container>
      <el-header class="header" :height="480">
         <l-header></l-header>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
      <el-footer>
        尾页
      </el-footer>
    </el-container>
    
  </div>
</template>
<style lang="less" scoped>
  .header{
    padding:0;
    height:auto;
  }
</style>

<script>
import Header from './components/header';
export default {
  name: 'App',
  components:{'l-header':Header}
  
}
</script>

<style>
  body{
    margin:0;
    padding:0;
  }
</style>
