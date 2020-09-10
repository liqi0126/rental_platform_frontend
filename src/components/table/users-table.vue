// writen by xyh
<template>
  <div>
    <el-card class="title-card">所有用户</el-card>
    <search-filter :options="options"
                   @search="searchAndFilter"></search-filter>
    <el-table :data="userList"
              @row-click='enterUser'
              stripe
              id="users-table"
              class="table"
              :height="height">
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
    <el-pagination background
                   layout="prev, pager, next"
                   :total="data.count*10/pageSize"
                   class="page-chooser"
                   @current-change="changePage">
    </el-pagination>

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
  props: {
    pageSize: Number,
    height: Number
  },
  components: {
    'search-filter': searchAndFilter
  },
  data: function () {
    return {
      data: { count: 0 },
      userList: [],
      select: 'search',
      input: '',
      options: [
        { value: 'search', label: '全部搜索' },
        { value: 'first_name', label: '筛选：名' },
        { value: 'last_name', label: '筛选：姓' },
        { value: 'address', label: '筛选：地址' },
        { value: 'email', label: '筛选：邮箱' },
        { value: 'phone', label: '筛选：电话' }
      ]
    }
  },
  created: function () {
    this.changePage(1)
  },
  methods: {
    enterUser: function (row) {
      this.$router.push({ name: 'user', params: { userId: row.id } })
    },
    searchAndFilter: function (select, input) {
      this.select = select
      this.input = input
      this.changePage(1)
    },
    changePage: function (page) {
      Axios.get('/api/v1/user', { params: { [this.select]: this.input, offset: (page - 1) * this.pageSize, limit: this.pageSize } })
        .then((response) => {
          this.userList = response.data.results
          this.data = response.data
          console.log(this.userList)
        })
        .catch((error) => {
          console.log(error.response)
          alert('error:' + error)
        })
    }
  }
}
</script>
