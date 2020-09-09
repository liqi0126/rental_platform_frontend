// writen by xyh
<template>
  <div>
    <el-card class="title-card">所有租借者申请</el-card>
    <el-table :data="renterApplicationList"
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
      <el-table-column prop="applicant"
                       label="applicant"
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
      renterApplicationList: []
    }
  },
  created: function () {
    // 获取用户列表
    Axios.get('api/v1/renter-application', {})
      .then((response) => {
        this.renterApplicationList = response.data
      })
      .catch((error) => {
        alert('error:' + error)
      })
  }
}
</script>
