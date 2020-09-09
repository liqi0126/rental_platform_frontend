// writen by xyh
<template>
  <div>
    <el-card class="title-card">所有归还申请</el-card>
    <el-table :data="rentApplicationList"
              stripe
              id="users-table"
              class="table"
              height=600>
      <el-table-column prop="id"
                       label="ID"
                       width="40">
      </el-table-column>
      <el-table-column prop="created_at"
                       label="创建时间"
                       width="180">
      </el-table-column>
      <el-table-column prop="description"
                       label="描述"
                       width="180">
      </el-table-column>
      <el-table-column prop="comments"
                       label="评价"
                       width="180">
      </el-table-column>
      <el-table-column prop="status"
                       label="状态"
                       width="180">
      </el-table-column>
      <el-table-column prop="equipment"
                       label="设备ID"
                       width="180">
      </el-table-column>
      <el-table-column prop="renter"
                       label="设备持有者ID"
                       width="180">
      </el-table-column>
      <el-table-column prop="hirer"
                       label="租借者"
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
  props: {
    id: Number
  },
  data: function () {
    return {
      rentApplicationList: []
    }
  },
  created: function () {
    // 获取用户列表
    if (this.id === -1) {
      Axios.get('api/v1/release-application', {})
        .then((response) => {
          this.rentApplicationList = response.data
        })
        .catch((error) => {
          alert('error:' + error)
        })
    } else {
      Axios.get('api/v1/release-application/userId/' + this.id, {})
        .then((response) => {
          this.rentApplicationList = response.data
        })
        .catch((error) => {
          alert('error:' + error)
        })
    }
  }
}
</script>
