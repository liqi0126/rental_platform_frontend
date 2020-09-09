// writen by ms
<template>
  <div v-if="hasLogin">
    <div class="line"></div>
    <el-menu :default-active="activeIndex2"
             class="el-menu-demo"
             mode="horizontal"
             @select="handleSelect"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b">
      <el-menu-item index="1"
                    style="margin-left:100px;"
                    @click="goRouter('/equipment')">设备列表</el-menu-item>
      <el-menu-item index="2"
                    @click="goRouter('/users')">用户列表</el-menu-item>
      <el-submenu index="3"
                  style="float:right;margin-right:100px;">
        <template slot="title"
                  @click="goRouter('/myindex')">
          <div>
            <img src="../assets/user.png"
                 style="background-color:white;width: 40px;height: 40px;border-radius: 50%;float: left;margin-top: 10px;" />
          </div>
        </template>
        <el-menu-item index="2-1"
                      @click="goRouter('/myindex')">个人中心</el-menu-item>
        <el-menu-item index="2-2"
                      @click="goRouter('/myindex')">我的申请</el-menu-item>
        <el-menu-item index="2-3"
                      @click="logout">退出登录</el-menu-item>
      </el-submenu>
      <el-menu-item index="4"
                    style="float:right;margin-right:300px;">
        <el-input placeholder="我要搜索"
                  autosize
                  suffix-icon="el-icon-search"
                  v-model="search_input">
        </el-input>
      </el-menu-item>
    </el-menu>
  </div>
</template>


<style scoped>
</style>

<script>
export default {
  data () {
    return {
      hasLogin: true,
      activeIndex: '1',
      activeIndex2: '1'
    };
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath);
    },
    goRouter (path) {
      this.$router.go(path)
    },
    logout () {
      console.log("logout")
    }
  }
}
</script>
