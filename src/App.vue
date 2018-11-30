<template>
  <div id="app">
    <el-container>
      <el-header>
        头部
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

<script>
export default {
  name: 'App'
}
</script>

<style>
  body{
    margin:0;
    padding:0;
  }
</style>
