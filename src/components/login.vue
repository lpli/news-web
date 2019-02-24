<template>
  <el-container>
    <el-header>
      <el-col :span="2" class="band">
        <img :src="logo">
      </el-col>
    </el-header>
    <el-main>
      <el-carousel arrow="never" height="600px" indicator-position="outside">
        <el-carousel-item v-for="item in images" :key="item.src">
          <img :src="item.src" class="img-item">
        </el-carousel-item>
      </el-carousel>
      <el-card class="box-card login">
        <el-form
          class="login-form"
          ref="login-form"
          :model="loginForm"
          size="medium"
          :rules="rules"
          status-icon
        >
          <el-form-item prop="username">
            <el-input
              type="text"
              v-model="loginForm.username"
              prefix-icon="el-icon-third-user"
              placeholder="用户名"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="loginForm.password"
              prefix-icon="el-icon-third-lock-fill"
              placeholder="密码"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="login-btn" @click="login">登录</el-button>
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
.band {
  padding: 10px;
  height: 60px;
  img {
    height: 40px;
  }
}
.login {
  width: 300px;
  height: 200px;
  position: absolute;
  left: 65%;
  top: 30%;
  padding: 20px 0px;
  z-index: 9999;
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

.img-item {
  width: 100%;
}
</style>

<script>
import Logo from "@/assets/logo_one.png";
import bg from "@/assets/bg.jpg";
import bg1 from "@/assets/bg1.jpg";
export default {
  name: "login",
  data() {
    return {
      logo: Logo,
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          }
        ]
      },
      images: [{ src: bg }, { src: bg1 }]
    };
  },
  mounted() {
    let component = this;
    document.onkeydown = function(e) {
      if (e.keyCode == 13) {
        component.login();
      }
    };
  },
  methods: {
    login() {
      this.$refs["login-form"].validate(valid => {
        if (valid) {
          this.$http.post("/login", this.loginForm).then(json => {
            this.$storage.put("token", json.data);
            this.$router.push("/admin");
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>
