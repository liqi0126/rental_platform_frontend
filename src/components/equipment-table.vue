// writen by xyh
<template>
  <div>
    <el-card class='title-card'>所有设备</el-card>
    <el-table :data="equipmentList"
              stripe
              @row-click="enterEquipment"
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
      equipmentList: []
    }
  },
  created: function () {
    // 获取设备列表
    Axios.get('api/v1/equipment', {})
      .then((response) => {
        this.equipmentList = response.data
      }).catch((error) => {
        alert('error:' + error)
      })
  },
  methods: {
    enterEquipment: function (row) {
      this.$router.push({ name: 'equipment', params: { equipmentId: row.id } })
    }
  }
}
</script>
