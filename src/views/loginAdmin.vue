<template>
  <div>
    <div class="register-wrapper">
      <div id="register">
        <p class="title">管理员登录</p>
        <el-form :model="userData"
                 ref="userData"
                 label-width="0"
                 class="demo-userData">
          <el-form-item prop="name">
            <el-input v-model="userData.username"
                      placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item prop="pass">
            <el-input type="password"
                      v-model="userData.pass"
                      placeholder="输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="submitForm(userData)"
                       style="width:100%;">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  name: 'Login',
  data () {
    return {
      userData: {
        username: '',
        pass: '',
        token: ''
      }
    }
  },
  methods: {
    // <!--登陆-->
    submitForm () {
      const data = {
        email: this.userData.username,
        password: this.userData.pass
      }
      Axios({
        url: 'api/v1/rest-auth/login/',
        method: 'post',
        data: data
      })
        .then((response) => {
          console.log(response.data)
          this.$store.commit('setUserKey', response.data.key)
          this.getCurrentUserData()
        })
        .catch((error) => {
          this.$alert(error.request.response, '登录失败！')
          console.log(error.request)
        })
    },
    getCurrentUserData () {
      Axios({
        url: 'api/v1/rest-auth/user',
        method: 'get',
        headers: {
          Authorization: 'Token ' + this.$store.getters.getUserKey
        }
      })
        .then((response) => {
          if (response.data.is_staff === false) {
            this.$alert('抱歉，您没有管理员权限')
            this.logout()
          } else {
            this.$store.commit('setCurrentUser', { user: response.data, isAdmin: true })
            location.reload()
            setTimeout(function () {
              this.$router.push('/index')
            }, '1000')
          }
        })
        .catch((error) => {
          this.$alert(error.request.response, '登录失败！')
          console.log(error.request)
        })
    },
    logout () {
      console.log('logout')
      Axios({
        url: 'api/v1/rest-auth/logout/',
        method: 'post',
        headers: {
          Authorization: 'Token ' + this.$store.getters.getUserKey
        }
      })
        .then(() => {
          this.$store.commit('resetState')
          this.$router.push('/login')
        })
        .catch((error) => {
          this.$alert(error.request.response, '登出失败！')
          console.log(error.request)
        })
    },
    // <!--进入注册页-->
    gotoLogon () {
      this.$router.push({
        path: '/registration'
      })
    },
    gotoAdminLogin () {
      this.$router.push({
        path: '/adminLogin'
      })
    }
  },
  created () {
    if (this.$store.getters.getUserKey !== 'null') {
      this.$router.push('/index')
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
