<template>
  <div class="title-bar" :style="barStyle">
    <span class="title" :style="titleStyle">{{title}}</span>
    <router-link :to="url" class="link" v-if="more == 1">More</router-link>
  </div>
</template>
<style scoped>
  .title-bar {
    height: 30px;
    position: relative;
  }

  .title {
    padding: 4px 12px;
    color: #fff;
    display: inline-block;
    font-size:14px;
    line-height: 24px;
  }

  .link {
   font-size: 12px;
    text-decoration: none;
    color: #c0c4cc;
    font-weight: 400;
    float: right;
    position: absolute;
    line-height: 20px;
    bottom: 0;
    right:5px;
  }

</style>
<script>
  export default {
    name: 'title-bar',
    data() {
      return {

      };
    },
    created(){
    },
    computed: {
      barStyle() {
        return {
          'border-bottom': '2px solid ' + this.color
        };
      },
      titleStyle() {
        return {
          'background-color': this.color
        };
      }
    },
    props: {
      title: String,
      url: String,
      color: String,
      more: {
         type:Number,
         default:1
      }
    }
  }

</script>
