<template>
  <div>
    <el-container>
      <el-header class="header" :height="height">
         <l-header></l-header>
      </el-header>
      <el-main class="main">
        <router-view/>
      </el-main>
      <el-footer class="footer" :height="height">
        <l-footer></l-footer>
      </el-footer>
    </el-container>
  </div>
</template>
<style lang="css" scoped>
  .header{
    padding:0;
    height:auto;
  }
  .footer{
        text-align: center;
        background-color: #110f13;
        border-top: 1px solid #110f13;
        margin-top: 30px;
        cursor: pointer;
        padding: 0;
        height: auto;
    }
    .main{
      width:1000px;
      margin:0 auto;
      padding-left:0;
      padding-right:0;
    }
</style>

<script>
import Header from '@/components/header';
import Footer from '@/components/footer';
export default {
  name: 'Main',
  components:{'l-header':Header,"l-footer":Footer},
  data(){
    return {
      height:'150'
    };
  }
}
</script>

<style>
  body{
    margin:0;
    padding:0;
  }
</style>
