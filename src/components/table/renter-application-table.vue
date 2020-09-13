// writen by xyh
<template>
  <div>
    <el-card class="title-card">所有成为出租者申请</el-card>
    <search-filter :options="options"
                   @search="searchAndFilter"></search-filter>
    <el-card class="table-card">
      <el-table :data="renterApplicationList"
                stripe
                id="users-table"
                class="table"
                @row-click="enter"
                :height="height">
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
      <el-pagination background
                     layout="prev, pager, next"
                     :total="data.count*10/pageSize"
                     class="page-chooser"
                     @current-change="changePage">
      </el-pagination>
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
}
.page-chooser {
  position: relative;
  margin: 10px auto;
  left: 40%;
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
    id: Number,
    pageSize: Number,
    height: Number
  },
  data: function () {
    return {
      data: { count: 0 },
      renterApplicationList: [],
      options: [
        { value: 'search', label: '全部搜索' }
      ]
    }
  },
  created: function () {
    // 获取用户列表
    // if (this.id === -1) {
    //   Axios.get('api/v1/renter-application', {})
    //     .then((response) => {
    //       this.renterApplicationList = response.data.results
    //     })
    //     .catch((error) => {
    //       alert('error:' + error)
    //     })
    // } else {
    //   Axios.get('api/v1/renter-application/userId/' + this.id, {})
    //     .then((response) => {
    //       this.renterApplicationList = response.data.results
    //     })
    //     .catch((error) => {
    //       alert('error:' + error)
    //     })
    // }
    this.changePage(1)
  },
  methods: {
    enter: function (row) {
      this.$router.push({ name: 'renter-application', params: { renterApplicationId: row.id } })
    },
    searchAndFilter: function (select, input) {
      this.select = select
      this.input = input
      this.changePage(1)
    },
    changePage: function (page) {
      if (this.$store.getters.getUserKey === 'null') {
        return
      }

      if (this.id === -1) {
        Axios.get('/api/v1/renter-application/', {
          params: {
            [this.select]: this.input,
            offset: (page - 1) * this.pageSize,
            limit: this.pageSize
          },
          headers: {
            Authorization: this.$store.getters.getUserKey
          }
        })
          .then((response) => {
            this.renterApplicationList = response.data.results
            this.data = response.data
            console.log(response)
          }).catch((error) => {
            // alert('error:' + error)
            console.log(error)
            this.$alert(error.response.data)
          })
      } else {
        Axios.get('/api/v1/renter-application/', {
          params: {
            [this.select]: this.input,
            offset: (page - 1) * this.pageSize,
            limit: this.pageSize,
            applicant: this.id
          },
          headers: {
            Authorization: 'Token ' + this.$store.getters.getUserKey
          }
        })
          .then((response) => {
            this.renterApplicationList = response.data.results
            this.data = response.data
          }).catch((error) => {
            console.log(error.response)
            this.$alert(error.response.data)
            // alert('error:' + error)
          })
      }
    }
  }
}
</script>
