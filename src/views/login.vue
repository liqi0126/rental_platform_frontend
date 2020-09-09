<template>
  <div>
    <div class="register-wrapper">
      <div id="register">
        <p class="title">登录</p>
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          label-width="0"
          class="demo-ruleForm"
        >
        <el-form-item prop="name">
            <el-input v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="pass">
            <el-input type="password" v-model="ruleForm.pass" placeholder="输入密码"></el-input>
        </el-form-item>
        <el-form-item>
        <el-button type="primary" @click="submitForm(ruleForm)" style="width:100%;">登录</el-button>
        <p class="login" @click="gotoLogon">还没有账号？立即注册</p>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>


<script>
import Axios from 'axios'
export default {
  name: "Login",
  data() {
    return {
      ruleForm: {
        username: "",
        pass: ""
      },
    }
  },
  methods: {
<<<<<<< Updated upstream
    // <!--提交注册-->
    submitForm(formName) {
        console.log(formName)
        Axios.post('api/v1/login', {
            data: {
                username: this.ruleForm.username,
                password: this.ruleForm.pass,
            }
        })
=======
    // <!--登陆-->
    submitForm (formName) {
      console.log(formName)
      Axios.post('api/v1/login/', {
        data: {
          email: this.ruleForm.username,
          password: this.ruleForm.pass
        }
      })
>>>>>>> Stashed changes
        .then((response) => {
            console.log(response.data)
            setTimeout(() => {
                alert('注册成功')
            }, 400);
        })
        .catch((error) => {
            alert('error:' + error)
        })
    },
    // <!--进入注册页-->
    gotoLogon() {
      this.$router.push({
        path: "/logon"
      });
    }
  }
};
</script>

<style scoped>
.loading-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: #aedff8;
  display: flex;
  align-items: center;
  justify-content: center;
}
.register-wrapper img {
  position: absolute;
  z-index: 1;
}
.register-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}
#register {
  max-width: 340px;
  margin: 60px auto;
  background: #fff;
  padding: 20px 40px;
  border-radius: 10px;
  position: relative;
  z-index: 9;
}
.title {
  font-size: 26px;
  line-height: 50px;
  font-weight: bold;
  margin: 10px;
  text-align: center;
}
.el-form-item {
  text-align: center;
}
.login {
  margin-top: 10px;
  font-size: 14px;
  line-height: 22px;
  color: #1ab2ff;
  cursor: pointer;
  text-align: left;
  text-indent: 8px;
  width: 160px;
}
.login:hover {
  color: #2c2fd6;
}
.code >>> .el-form-item__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.code button {
  margin-left: 20px;
  width: 140px;
  text-align: center;
}
.el-button--primary:focus {
  background: #409EFF;
  border-color: #409EFF;
  color: #fff;
}
</style>
