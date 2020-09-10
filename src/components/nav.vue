// writen by ms
<template>
  <div>
    <div class="line"></div>
    <el-menu :default-active="activeIndex"
             class="el-menu-demo"
             mode="horizontal"
             @select="handleSelect"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b">
      <div class="logo"
           aria-disabled="true">
        <a href="/login">
          <h3 style="float:left;color:white;margin-left:100px;">
            设备租赁平台
          </h3>
        </a>
      </div>
      <el-menu-item index="1"
                    style="margin-left:30px;"
                    v-if="hasLogin === true">设备列表</el-menu-item>
      <el-menu-item index="2"
                    v-if="hasLogin === true">用户列表</el-menu-item>
      <el-submenu index="6"
                  v-if="hasLogin === true && isAdmin === true">
        <template slot="title">申请列表</template>
        <el-menu-item index="6-1">租借者申请</el-menu-item>
        <el-menu-item index="6-2">租借申请</el-menu-item>
        <el-menu-item index="6-3">上架申请</el-menu-item>
      </el-submenu>
      <el-menu-item index="3"
                    v-if="hasLogin === true && isAdmin === true">平台信息</el-menu-item>
      <el-submenu index="4"
                  style="float:right;margin-right:100px;"
                  v-if="hasLogin">
        <template slot="title">
          <div>
            <img src="../assets/user.png"
                 style="background-color:white;width: 40px;height: 40px;border-radius: 50%;float: left;margin-top: 10px;" />
          </div>
        </template>
        <el-menu-item index="4-1">个人中心</el-menu-item>
        <el-menu-item index="4-3"
                      @click="logout">退出登录</el-menu-item>
      </el-submenu>
      <el-submenu index="5"
                  style="float:right;"
                  v-if="hasLogin">
        <template slot="title">发布申请</template>
        <el-menu-item index="5-1">申请添加设备</el-menu-item>
        <el-menu-item index="5-4">申请成为租赁者</el-menu-item>
      </el-submenu>
      <el-menu-item style="margin-right:100px;float:right;font-size:19px;"
                    v-if="!hasLogin"><a href="/login">未登录</a></el-menu-item>
    </el-menu>
  </div>
</template>

<style scoped>
</style>

<script>
import Axios from 'axios'
export default {
  data () {
    return {
      hasLogin: false,
      activeIndex: '1',
      inputSearch: '',
      select: '1',
      isAdmin: false
    }
  },
  methods: {
    handleSelect (key) {
      if (key === null) return
      console.log(key)
      switch (key) {
        case '1': {
          this.activeIndex = '1'
          this.$router.push('/index')
          break
        }
        case '2': {
          this.activeIndex = '2'
          this.$router.push('/userList')
          break
        }
        case '3': {
          this.activeIndex = '3'
          this.$router.push('/analysis')
          break
        }
        case '4-1': {
          // console.log('here')
          // console.log(String(this.$store.getters.getCurrentUser.id))
          const path = '/user/' + String(this.$store.getters.getCurrentUser.id)
          this.$router.push(path)
          // console.log(path)
          break
        }
        case '5-1': {
          this.activeIndex = '5'
          this.$router.push('/create-equipment')
          break
        }
        case '5-4': {
          this.activeIndex = '5'
          this.$router.push('/create-renter-application')
          break
        }
        case '6-1': {
          this.activeIndex = '6'
          this.$router.push('/renter-application-list')
          break
        }
        case '6-2': {
          this.activeIndex = '6'
          this.$router.push('/rent-application-list')
          break
        }
        case '6-3': {
          this.activeIndex = '6'
          this.$router.push('/release-application-list')
          break
        }
      }
    },
    goRouter (path) {
      this.$router.go(path)
    },
    logout () {
      console.log('logout')
      console.log(this.$store.getters.getUserKey)
      Axios({
        url: '/api/v1/rest-auth/logout/',
        method: 'post',
        headers: {
          Authorization: 'Token ' + this.$store.getters.getUserKey
        }
      })
        .then(() => {
          this.$store.commit('resetState')
          location.reload()
          this.$router.push('/login')
        })
        .catch((error) => {
          // this.$alert(error.response.statusText, '登出失败！')
          this.$store.commit('resetState')
          location.reload()
          this.$router.push('/login')
          console.log(error.request)
        })
    },
    search () {
      console.log('search')
      console.log(this.select)
      console.log(this.inputSearch)
    }
  },
  mounted () {
    if (this.$store.getters.getUserKey !== 'null') {
      this.hasLogin = true
      this.isAdmin = this.$store.getters.isAdmin
    }
  }
}
</script>
<style scoped>
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
