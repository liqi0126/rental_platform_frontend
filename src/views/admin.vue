// write by xyh
<template>
  <div>
    <el-card class="title-card">所有用户</el-card>
    <el-table :data="userLists"
              stripe
              id="users-table"
              class="table">
      <el-table-column prop="id"
                       label="ID"
                       width="40">
      </el-table-column>
      <el-table-column prop="username"
                       label="用户名"
                       width="180">
      </el-table-column>
      <el-table-column prop="created_at"
                       label="创建时间"
                       width="180">
      </el-table-column>
      <el-table-column prop="address"
                       label="地址"
                       width="180">
      </el-table-column>
      <el-table-column prop="email"
                       label="Email"
                       width="180">
      </el-table-column>
      <el-table-column prop="phone"
                       label="电话号码"
                       width="180">
      </el-table-column>
      <el-table-column prop="is_renter"
                       label="是否是租借者"
                       width="180">
      </el-table-column>
    </el-table>
    <el-card class='title-card'>所有设备</el-card>
    <el-table :data="equipmentList"
              stripe
              id="equipment-table"
              class="table">
      <el-table-column prop="id"
                       label="ID"
                       width="40">
      </el-table-column>
      <el-table-column prop="name"
                       label="设备名"
                       width="180">
      </el-table-column>
      <el-table-column prop="created_at"
                       label="上架时间"
                       width="180">
      </el-table-column>
      <el-table-column prop="address"
                       label="地址"
                       width="180">
      </el-table-column>
      <el-table-column prop="email"
                       label="Email"
                       width="180">
      </el-table-column>
      <el-table-column prop="phone"
                       label="电话号码"
                       width="180">
      </el-table-column>
      <el-table-column prop="status"
                       label="状态"
                       width="180">
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>
.title-card {
  width: 60%;
  margin: auto;
  margin-top: 20px;
  position: relative;
}
.table {
  position: relative;
  margin: 0 auto;
  width: 60%;
  max-height: 600px;
}
</style>

<script>
import Axios from 'axios'
export default {
  data: function () {
    return {
      userLists: [],
      equipmentList: []
    }
  },
  created: function () {
    // 获取用户列表
    Axios.get('api/v1/users', {})
      .then((response) => {
        this.userLists = response.data
        console.log(this.userLists)
      })
      .catch((error) => {
        alert('error:' + error)
      })
    // 获取设备列表
    Axios.get('api/v1/equipment', {})
      .then((response) => {
        this.equipmentList = response.data
      }).catch((error) => {
        alert('error:' + error)
      })
  }
}
</script>
