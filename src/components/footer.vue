<template>
       <img :src="img" class="footer-bg">
  
</template>
<style lang="css" scoped>
    
    .footer-bg{
        
    }
</style>
<script >
import img from "../assets/bottom_g.png";
export default {
   name:'l-footer',
   data(){
       return {
           img:img
       };
   }
}
</script>