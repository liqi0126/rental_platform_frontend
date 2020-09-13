// writen by xyh
<template>
  <div>
    <el-card class="title-card">所有租借申请</el-card>
    <search-filter :options="options"
                   @search="searchAndFilter"></search-filter>
    <el-card class="table-card">
      <el-table :data="rentApplicationList"
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
    userId: Number,
    pageSize: Number,
    height: Number
  },
  data: function () {
    return {
      rentApplicationList: [],
      options: [
        { value: 'search', label: '全部搜索' },
        { value: 'equipment', label: '筛选：描述' },
        { value: 'address', label: '筛选：评价' }
      ],
      select: 'search',
      input: '',
      data: { count: 0 }
    }
  },
  created: function () {
    this.changePage()
  },
  methods: {
    enter: function (row) {
      this.$router.push({ name: 'rent-application', params: { rentApplicationId: row.id } })
    },
    searchAndFilter: function (select, input) {
      this.select = select
      this.input = input
      this.changePage(1)
    },
    changePage: function () {
      Axios.get('/api/v1/user/' + this.userId + '/', {
        headers: {
          Authorization: 'Token ' + this.$store.getters.getUserKey
        }
      })
        .then((response) => {
          console.log(response)
          this.rentApplicationList = response.data.received_rent_applications
          this.data = response.data
        }).catch((error) => {
          // alert('error:' + error)
          console.log(error)
        })
    }
  }
}
</script>
