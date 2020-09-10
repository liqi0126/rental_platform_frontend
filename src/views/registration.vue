<template>
  <div>
    <div class="register-wrapper">
      <div id="register">
        <p class="title">注册</p>
        <el-form :model="UserData"
                 status-icon
                 :rules="rules"
                 ref="UserData"
                 label-width="0"
                 class="demo-ruleForm">
          <el-form-item prop="email">
            <el-input v-model="UserData.email"
                      placeholder="请输入电子邮箱"></el-input>
          </el-form-item>
          <el-form-item prop="pass">
            <el-input type="password"
                      v-model="UserData.pass"
                      placeholder="输入密码"></el-input>
          </el-form-item>
          <el-form-item prop="checkPass">
            <el-input type="password"
                      v-model="UserData.checkPass"
                      placeholder="确认密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="submitForm"
                       style="width:100%;">注册</el-button>
            <p class="login"
               @click="gotoLogin">已有账号？立即登录</p>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from 'axios'

export default {
  name: 'Register',
  data () {
    // <!--电子邮箱是否为空-->
    const checkEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入电子邮箱'))
      } else {
        callback()
      }
    }
    // <!--验证密码-->
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      }
      callback()
    }
    // <!--二次验证密码-->
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.UserData.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }

    return {
      UserData: {
        email: '',
        pass: '',
        checkPass: ''
      },
      rules: {
        pass: [{ validator: validatePass, trigger: 'change' }],
        checkPass: [{ validator: validatePass2, trigger: 'change' }],
        email: [{ validator: checkEmail, trigger: 'change' }]
      },
      flag: true
    }
  },
  methods: {
    // <!--提交注册-->
    submitForm () {
      const userData = {
        password1: this.UserData.pass,
        password2: this.UserData.checkPass,
        email: this.UserData.email
      }
      Axios({
        url: 'api/v1/rest-auth/registration/',
        method: 'post',
        data: userData
      })
        .then((response) => {
          this.$message('确认邮箱已发送')
          this.$router.push('/login')
          // console.log(response)
        })
        .catch((error) => {
          this.$alert(error.request.response, '注册失败！')
          console.log(error.request)
        })
    },

    // <!--进入登录页-->
    gotoLogin () {
      this.$router.push({
        path: '/login'
      })
    },
    // 验证手机号
    checkMobile (str) {
      const re = /^1\d{10}$/
      if (re.test(str)) {
        return true
      } else {
        return false
      }
    }
  }
}
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
  top: 100px;
  right: 0;
  left: 0;
  bottom: 0;
}
#register {
  max-width: 340px;
  margin: 60px auto;
  background: rgb(228, 226, 226);
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
  background: #409eff;
  border-color: #409eff;
  color: #fff;
}
</style>
