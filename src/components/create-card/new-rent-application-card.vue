// writen by xyh
<template>
  <div>
    <el-card class="card"
             style="font-size:24px;">
      申请租借设备
    </el-card>
    <el-card class='card'>
      <el-form class="form"
               label-width="100px">
        <el-form-item label='描述'>
          <el-input v-model="data.description"
                    type='textarea'></el-input>
        </el-form-item>
        <el-form-item label="租期">
          <el-date-picker v-model="date"
                          type="datetimerange"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <el-button class='button'
                 type="primary"
                 @click="createRentApplication">提交申请</el-button>
    </el-card>
  </div>
</template>

<style scoped>
.button {
  margin-top: 30px;
  left: 10%;
  position: relative;
}
.card {
  margin-top: 40px;
  width: 60%;
  position: relative;
  margin: 20px auto;
}
.form {
  position: relative;
  margin: auto;
  width: 90%;
}
</style>

<script>
/* eslint-disable @typescript-eslint/camelcase */
import axios from 'axios'
import qs from 'qs'
export default {
  props: {
    equipmentId: Number
  },
  data: function () {
    return {
      diseditable: true,
      date: [],
      data: {
        description: '',
        borrower: this.$store.state.user.id,
        equipment: this.equipmentId,
        lease_term_begin: '',
        lease_term_end: ''
      }
    }
  },
  methods: {
    createRentApplication: function () {
      this.data.lease_term_begin = this.date[0]
      this.data.lease_term_end = this.date[1]
      console.log(this.date)
      console.log(this.data)
      axios.post('/api/v1/rent-application/', qs.stringify(this.data), {
        headers: {
          Authorization: 'Token ' + this.$store.getters.getUserKey
        }
      })
        .then((response) => {
          this.$router.push({ name: 'index' })
          console.log(response)
          this.$message('申请成功！')
        })
        .catch((error) => {
          console.log(error.response)
          alert(error)
        })
    }
  }
}
</script>
