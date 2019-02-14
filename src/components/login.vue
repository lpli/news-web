<template>
  <el-container>
    <el-header></el-header>
    <el-main>
      <el-carousel  arrow="never" height="480px" indicator-position="outside">
        <el-carousel-item v-for="item in images" :key="item">
            <img :src="item.src"  class="img-item"/>
        </el-carousel-item>
      </el-carousel>
      <el-card class="box-card login">
        <el-form class="login-form" ref="login-form" v-model="user" size="medium">
          <el-form-item required>
            <el-input
              type="text"
              v-model="user.username"
              prefix-icon="el-icon-third-user"
              placeholder="用户名"
            ></el-input>
          </el-form-item>
          <el-form-item required>
            <el-input
              type="password"
              v-model="user.password"
              prefix-icon="el-icon-third-lock-fill"
              placeholder="密码"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="login-btn">登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-main>
  </el-container>
</template>
<style lang="less" scoped>
.el-container {
  height: 100%;
}
.el-main {
  height: calc(~"100% - 60px");
  padding: 0px;
}
.login {
  width: 300px;
  height: 200px;
  position: absolute;
  left: 65%;
  top: 30%;
  padding: 20px 0px;
  z-index:9999;
}
.login-btn {
  width: 100%;
}
.el-carousel {
  height: 100%;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.img-item{
    width:100%;
}
</style>

<script>
import bg from '@/assets/bg.jpg';
import bg1 from '@/assets/bg1.jpg';
export default {
  name: "login",
  data() {
    return {
      user: {
        username: "",
        password: ""
      },
      images:[{src:bg},{src:bg1}]
    };
  }
};
</script>
