<template>
  <el-row>
    <el-row>
      <el-col :span="10">
        <el-form :model="userForm" label-width="100px" size="small" :rules="rules" ref="userForm">
          <el-form-item prop="userName" label="用户名">
            <el-input v-model.trim="userForm.userName" :readonly="true"></el-input>
          </el-form-item>
          <el-form-item prop="nickName" label="昵称">
            <el-input v-model.trim="userForm.nickName"></el-input>
          </el-form-item>
          <el-form-item prop="email" label="邮箱">
            <el-input v-model.trim="userForm.email" type="email"></el-input>
          </el-form-item>
          <el-form-item prop="phone" label="手机">
            <el-input v-model.trim="userForm.phone"></el-input>
          </el-form-item>
          <el-form-item prop="password" label="旧密码">
            <el-input v-model.trim="userForm.password" type="password"></el-input>
          </el-form-item>
          <el-form-item prop="npass" label="新密码">
            <el-input v-model.trim="userForm.npass" type="password"></el-input>
          </el-form-item>
          <el-form-item prop="cpass" label="密码确认">
            <el-input v-model.trim="userForm.cpass" type="password"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10" :offset="1">
        <el-button size="small" type="primary" @click="save">保存</el-button>
        <el-button size="small" type="info" @click="goBack">返回</el-button>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      userForm: {
        id: null,
        userName: "",
        nickName: "",
        email: "",
        phone: "",
        password: "",
        npass: "",
        cpass: ""
      },
      rules: {
        roleId: [
          {
            required: true,
            message: "请选择角色",
            trigger: ["blur", "change"]
          }
        ],
        nickName: [
          {
            required: true,
            message: "请输入昵称",
            trigger: ["blur", "change"]
          },
          {
            max: 80,
            message: "最大长度80",
            trigger: ["blur", "change"]
          },
          {
            validator: this.checkNickName,
            trigger: ["blur"]
          }
        ],
        phone: [
          {
            required: true,
            message: "请输入手机号",
            trigger: ["blur", "change"]
          },
          {
            type: "string",
            pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
            message: "手机号格式不正确",
            trigger: ["blur", "change"]
          },
          {
            validator: this.checkPhone,
            trigger: ["blur"]
          }
        ],
        email: [
          {
            required: true,
            message: "请输入邮箱",
            trigger: ["blur", "change"]
          },
          {
            type: "email",
            message: "邮箱格式不正确",
            trigger: ["blur", "change"]
          },
          {
            validator: this.checkEmail,
            trigger: ["blur"]
          }
        ],
        password:[
             {
            required: true,
            message: "请输入旧密码",
            trigger: ["blur", "change"]
          },
          {
            validator: this.checkPwd,
            trigger: ["blur"]
          }
        ],
        npass:[
             {
            required: true,
            message: "请输入新密码",
            trigger: ["blur", "change"]
          },
         {
            type: "string",
            pattern: /^[A-Za-z0-9]{8,20}$/,
            message: "由8~20位英文字母、数字、下划线组成",
            trigger: ["blur", "change"]
          },
          {
            validator: this.checknpass,
            trigger: ["blur", "change"]
          },
          {
            validator: this.confirmPwd,
            trigger: ["blur", "change"]
          }
        ],
        cpass:[
            {
            required: true,
            message: "请确认密码",
            trigger: ["blur", "change"]
          },
           {
            validator: this.confirmPwd,
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  mounted() {
    let userInfo = this.$storage.getObj("userInfo");
    this.userForm.id = userInfo.id;
    this.userForm.userName = userInfo.userName;
    this.userForm.nickName = userInfo.nickName;
    this.userForm.email = userInfo.email;
    this.userForm.phone = userInfo.phone;
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    checkName(rule, value, callback) {
      if (!value) {
        callback(new Error("用户名不能为空"));
      }
      this.$http
        .get("/user/check", {
          id: this.userForm.id,
          userName: this.userForm.userName
        })
        .then(json => {
          if (json.code == "1") {
            callback();
          } else {
            callback(new Error(json.msg));
          }
        });
    },
    checkNickName(rule, value, callback) {
      if (!value) {
        callback(new Error("昵称不能为空"));
      }
      this.$http
        .get("/user/check", {
          id: this.userForm.id,
          nickName: this.userForm.nickName
        })
        .then(json => {
          if (json.code == "1") {
            callback();
          } else {
            callback(new Error(json.msg));
          }
        });
    },
    checkPhone(rule, value, callback) {
      if (!value) {
        callback(new Error("手机号不能为空"));
      }
      this.$http
        .get("/user/check", {
          id: this.userForm.id,
          phone: this.userForm.phone
        })
        .then(json => {
          if (json.code == "1") {
            callback();
          } else {
            callback(new Error(json.msg));
          }
        });
    },
    checkEmail(rule, value, callback) {
      if (!value) {
        callback(new Error("邮箱不能为空"));
      }
      this.$http
        .get("/user/check", {
          id: this.userForm.id,
          email: this.userForm.email
        })
        .then(json => {
          if (json.code == "1") {
            callback();
          } else {
            callback(new Error(json.msg));
          }
        });
    },
    checkPwd(rule,value,callback){
        if (!value) {
        callback(new Error("旧密码不能"));
      }
      this.$http
        .get("/user/check", {
          id: this.userForm.id,
          password: this.userForm.password
        })
        .then(json => {
          if (json.code == "1") {
            callback();
          } else {
            callback(new Error(json.msg));
          }
        });
    },
    checknpass(rule,value,callback){
        if (!value) {
         callback(new Error("请确认密码"));
       }
       if(this.userForm.password == this.userForm.npass){
          callback(new Error('新密码不能与旧密码一样'));
      }else{
          callback();
      }
    },
    confirmPwd(rule,value,callback){
        if (!value) {
        callback(new Error("请确认密码"));
      }
      if(this.userForm.npass !== this.userForm.cpass){
          callback(new Error('密码不一致'));
      }else{
          callback();
      }
      
    },
    save() {
      this.$refs.userForm.validate(valid => {
        if (!valid) {
          return;
        }
        this.$http.post('/user/account',this.userForm).then(json=>{
            if(json.code ==1){
                this.$router.go(-1);
            }else{
                this.$message({
                    type:'error',
                    message:json.msg
                })
            }
        })
      });
    }
  }
};
</script>

