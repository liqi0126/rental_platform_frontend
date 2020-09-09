// writen by xyh
<template>
  <div>
    <div class="line"></div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <div class="logo" aria-disabled="true">
        <a href="/login">
          <h3 style="float:left;color:white;margin-left:100px;">
            设备租赁平台
          </h3>
        </a>
      </div>
      <!-- <div  v-if="hasLogin"> -->
        <el-menu-item index="1" style="margin-left:100px;" v-if="hasLogin">设备列表</el-menu-item>
        <el-menu-item index="2" v-if="hasLogin">用户列表</el-menu-item>
        <el-submenu index="3" style="float:right;margin-right:100px;" v-if="hasLogin">
          <template slot="title" >
            <div>
              <img src="../assets/user.png" style="background-color:white;width: 40px;height: 40px;border-radius: 50%;float: left;margin-top: 10px;"/>
            </div>
          </template>
          <el-menu-item index="3-1" >个人中心</el-menu-item>
          <el-menu-item index="3-2" >我的申请</el-menu-item>
          <el-menu-item index="3-3" @click="logout">退出登录</el-menu-item>
        </el-submenu>

        <el-menu-item style="float:right;margin-right:200px;" v-if="hasLogin"> 
          <div>
            <el-input placeholder="请输入搜索内容" v-model="inputSearch" class="input-with-select" style="width:430px;" size="medium">
              <el-select v-model="select" slot="prepend" placeholder="设备" style="width:90px;">
                <el-option label="设备" value="1"></el-option>
                <el-option label="用户" value="2"></el-option>
              </el-select>
              <el-button index= "4" slot="append" icon="el-icon-search" size="mini" @click="search"></el-button>
            </el-input>
          </div>
        </el-menu-item>
        <el-menu-item style="margin-right:100px;float:right;font-size:19px;" v-if="!hasLogin"><a href="/login">未登录</a></el-menu-item>
      <!-- </div> -->
    </el-menu>
  </div>
</template>


<style scoped>

</style>

<script>
export default {
  data() {
    return {
      hasLogin: false,
      activeIndex: '',
      inputSearch: '',
      select: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      if (key === null) return 
      console.log(key, keyPath);
    },
    goRouter(path) {
      this.$router.go(path)
    },
    logout(){
      console.log("logout")
    },
    search(){
      console.log("search")
      console.log(this.select)
      console.log(this.inputSearch)
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