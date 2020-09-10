// writen by xyh
<template>
  <div>
    <el-card class="title-card">所有上架申请</el-card>
    <search-filter :options="options"
                   @search="searchAndFilter"></search-filter>
    <el-card class="table-card">
      <el-table :data="rentApplicationList"
                stripe
                id="users-table"
                class="table"
                @row-click="enter"
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
    </el-card>
  </div>
</template>

<style scoped>
.title-card {
  margin: auto;
  margin-top: 20px;
  position: relative;
}
.table {
  position: relative;
  margin: 0 auto;
  max-height: 600px;
}
</style>

<script>
import Axios from 'axios'
import searchAndFilter from '../search&filter'
export default {
  components: {
    'search-filter': searchAndFilter
  },
  props: {
    id: Number
  },
  data: function () {
    return {
      rentApplicationList: [],
      options: [
        { value: 'search', label: '全部搜索' },
        { value: 'description', label: '筛选：描述' }
      ]
    }
  },
  created: function () {
    // 获取用户列表
    if (this.id === -1) {
      Axios.get('api/v1/release-application', {})
        .then((response) => {
          this.rentApplicationList = response.data.results
        })
        .catch((error) => {
          alert('error:' + error)
        })
    } else {
      Axios.get('api/v1/release-application/userId/' + this.id, {})
        .then((response) => {
          this.rentApplicationList = response.data.results
        })
        .catch((error) => {
          alert('error:' + error)
        })
    }
  },
  methods: {
    enter: function (row) {
      this.$router.push({ name: 'release-application', params: { releaseApplicationId: row.id } })
    },
    searchAndFilter: function (select, input) {
      if (this.id === -1) {
        Axios.get('api/v1/release-application', { params: { [select]: input } })
          .then((response) => {
            this.rentApplicationList = response.data.results
          }).catch((error) => {
            alert('error:' + error)
          })
      } else {
        Axios.get('/api/v1/release-application/userId/' + this.id, { params: { [select]: input } })
          .then((response) => {
            this.rentApplicationList = response.data.results
          }).catch((error) => {
            console.log(error.response)
            alert('error:' + error)
          })
      }
    }
  }
}
</script>
