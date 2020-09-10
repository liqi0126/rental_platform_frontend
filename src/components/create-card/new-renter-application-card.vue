// writen by xyh
<template>
  <div>
    <el-card class="card"
             style="font-size:24px;">
      申请成为租借者
    </el-card>
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
import Axios from 'axios'
import qs from 'qs'
export default {
  data: function () {
    return {
      diseditable: true,
      data: {
        applicant: this.$store.state.user.id,
        description: ''
      }
    }
  },
  methods: {
    createRenterApplication: function () {
      // axios.post('/api/v1/renter-application', this.data)
      Axios({
        url: 'api/v1/renter-application',
        method: 'post',
        // data: 'applicant=3&description=123',
        data: qs.stringify(this.data),
        headers: {
          // 'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then((response) => {
          console.log(response)
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
