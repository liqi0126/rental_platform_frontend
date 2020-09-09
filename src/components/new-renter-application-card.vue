// writen by xyh
<template>
  <div>
    <el-card class='card'>
      <el-form class="form"
               label-width="100px">
        <el-form-item label='申请理由'>
          <el-input v-model="data.description"
                    type="textarea"></el-input>
        </el-form-item>
        <el-button class='button'
                   type="primary"
                   @click="createRenterApplication">提交申请</el-button>
      </el-form>
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
  width: 60%;
  position: relative;
  margin: auto;
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
export default {
  data: function () {
    return {
      diseditable: true,
      data: {
        id: 3,
        description: ''
      }
    }
  },
  methods: {
    createRenterApplication: function () {
      axios.post('/api/v1/renter-application', this.data)
        .then(() => {
          this.$message('申请成功，请等待管理员审批。')
        })
        .catch((error) => {
          alert(error)
          console.log(error.response)
        })
    }
  }
}
</script>
