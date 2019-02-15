<template>
  <el-popover
    placement="bottom-end"
    width="100"
    class="user-profile"
    popper-class="user-profile-popper"
  >
    <ul class="user-ul">
      <li class="user-li">设置</li>
      <li class="user-seprator"></li>
      <li class="user-li"><router-link to="/login">退出</router-link></li>
    </ul>
    <div class="img-wrapper" slot="reference">
      <img :src="imgSrc">
    </div>
  </el-popover>
</template>
<style>
.user-profile-popper {
  min-width: unset;
  padding: 0;
}
</style>

<style scoped>
.user-profile {
  display: inline-block;
  padding: 5px 10px;
  cursor: pointer;
  float: right;
}

.img-wrapper {
  height: 50px;
  width: 50px;
  border: 1px solid transparent;
  border-radius: 50px;
  overflow: hidden;
}

.user-profile img {
  height: 50px;
  width: 50px;
}

.user-ul {
  padding: 5px 0px;
}
.user-li {
  line-height: 30px;
  padding: 0 17px;
  font-size: 14px;
}

.user-li:hover,
.user-li:active,
.user-li:focus {
  background-color: #ecf5ff;
  color: #66b1ff;
}

.user-seprator {
  border-top: 1px solid #ebeef5;
}
</style>

<script>
import img from "@/assets/logo.png";
export default {
  name: "user-profile",
  data() {
    return {};
  },
  props: {
    imgSrc: {
      type: String,
      default: img
    }
  }
};
</script>
