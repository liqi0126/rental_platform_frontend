// writen by xyh
<template>
  <div>
    <el-card class='card'>
      <el-form class="form"
               label-width="100px">
        <el-form-item label='描述'>
          <el-input v-model="data.description"
                    type='textarea'></el-input>
        </el-form-item>
      </el-form>
      <el-button class='button'
                 type="primary"
                 @click="createReleaseApplication">提交</el-button>
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
// import qs from 'qs'
export default {
  props: {
    id: Number
  },
  data: function () {
    return {
      diseditable: true,
      data: {
        equipment: this.id,
        description: ''
      }
    }
  },
  methods: {
    createReleaseApplication: function () {
      axios.post('/api/v1/release-application', this.data)
        .then((response) => {
          console.log(response)
          this.$message(response.data.equipment + '创建成功！')
        })
        .catch((error) => {
          console.log(error.response)
          alert(error)
        })
    }
  }
}
</script>
