<template>
   <el-row class="img-news" :gutter="10">
       <el-col :span="12">
          <img :src="bigImg" class="img">
       </el-col>
       <el-col :span="12">
          <el-row :gutter="10">
             <el-col :span="12">
               <img :src="bigImg" class="img">
             </el-col>
             <el-col :span="12">
               <img :src="bigImg" class="img">
             </el-col>
          </el-row>
           <el-row :gutter="10">
             <el-col :span="12">
               <img :src="bigImg" class="img">
             </el-col>
             <el-col :span="12">
               <img :src="bigImg" class="img">
             </el-col>
          </el-row>
       </el-col>
   </el-row>
</template>
<style lang="css" scoped>
   .img{
      width:100%;
   }
</style>
<script>
   import img from '../assets/data.png';
   export default{
      name:'img-news',
      data(){
         return {
            bigImg:img
         };
      }
   }
</script>
