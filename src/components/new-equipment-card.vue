// writen by xyh
<template>
  <div>
    <el-card class='card'>
      <el-form class="form"
               label-width="100px">
        <el-form-item label='设备名'>
          <el-input v-model="data.name"
                    :disabled="diseditable"></el-input>
        </el-form-item>
        <el-form-item label='地址'>
          <el-input v-model="data.address"
                    :disabled="diseditable"></el-input>
        </el-form-item>
        <el-form-item label='Email'>
          <el-input v-model="data.email"
                    :disabled="diseditable"></el-input>
        </el-form-item>
        <el-form-item label='电话号码'>
          <el-input v-model="data.phone"
                    :disabled="true"></el-input>
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
        owner: 0
      }
    }
  },
  methods: {
    enterUser: function () {
      this.$router.push({ name: 'user', params: { userId: this.data.owner } })
    },
    createEquipment: function () {
      axios.post('/api/v1/equipment', this.data)
        .then((response) => {
          this.$message(response.data.equipment + '创建成功！')
        })
        .catch((error) => {
          alert(error)
        })
    }
  }
}
</script>
