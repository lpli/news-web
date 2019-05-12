<template>
  <el-popover
    placement="bottom-end"
    width="100"
    class="user-profile"
    popper-class="user-profile-popper"
  >
    <ul class="user-ul">
      <li class="user-li">{{userName}}</li>
      <li class="user-seprator"></li>
      <li class="user-li" @click="logout">退出</li>
    </ul>
    <div class="icon-wrapper" slot="reference">
      <i class="el-icon-third-user"></i>
    </div>
  </el-popover>
</template>
<style>
.user-profile-popper {
  min-width: unset;
  padding: 0;
}
</style>

<style scoped l>
.user-profile {
  display: inline-block;
  padding: 5px 10px;
  cursor: pointer;
  float: right;
}

.icon-wrapper {
  height: 50px;
  width: 50px;
  border: 1px solid transparent;
  border-radius: 50px;
  overflow: hidden;
}

.icon-wrapper i {
  font-size: 30px;
}

.user-ul {
  padding: 5px 0px;
}
.user-li {
  line-height: 30px;
  padding: 0 17px;
  font-size: 14px;
  cursor: pointer;
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
export default {
  name: "user-profile",
  data() {
    return {
      userName:''
    };
  },
  props: {
  },
  mounted(){
    this.userName = this.$storage.getObj("userInfo").userName;
  },
  methods:{
    logout(){
      this.$http.post('/logout').then(()=>{
          this.$router.push('/login');
      });
    }
  }
};
</script>
