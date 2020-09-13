// writen by xyh
<template>
  <div>
    <el-card class="card"
             style="font-size:24px;">
      申请添加设备
    </el-card>
    <el-card class='card'>
      <el-form class="form"
               label-width="100px">
        <el-form-item label='设备名'>
          <el-input v-model="data.name"></el-input>
        </el-form-item>
        <el-form-item label='描述'>
          <el-input v-model="data.description"
                    type='textarea'></el-input>
        </el-form-item>
        <el-form-item label='地址'>
          <el-input v-model="data.address"></el-input>
        </el-form-item>
        <el-form-item label='Email'>
          <el-input v-model="data.email"></el-input>
        </el-form-item>
        <el-form-item label='电话号码'>
          <el-input v-model="data.phone"></el-input>
        </el-form-item>
      </el-form>
      <el-button class='button'
                 type="primary"
                 @click="createEquipment">提交</el-button>
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
        name: '',
        address: '',
        email: '',
        phone: null,
        description: '',
        owner: this.$store.getters.getCurrentUser.id
      }
    }
  },
  methods: {
    enterUser: function () {
      this.$router.push({ name: 'user', params: { userId: this.data.owner } })
    },
    createEquipment: function () {
      console.log(this.$store.getters.getCurrentUser.id)
      axios.post('/api/v1/equipment/', this.data, {
        headers: {
          Authorization: 'Token ' + this.$store.getters.getUserKey
        }
      })
        .then((response) => {
          this.$router.push({ name: 'index' })
          console.log(response)
          this.$message('创建成功！')
        })
        .catch((error) => {
          console.log(error.response)
          this.$alert(error.response.data)
        })
    }
  }
}
</script>
