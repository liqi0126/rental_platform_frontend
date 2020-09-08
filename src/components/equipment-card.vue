// writen by xyh
<template>
  <div>
    <el-card class='card'>
      <el-form class="form"
               label-width="100px">
        <el-form-item label='ID'>
          <el-input v-model="id"
                    :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label='设备名'>
          <el-input v-model="data.name"
                    :disabled="diseditable"></el-input>
        </el-form-item>
        <el-form-item label='密码'
                      v-if="!diseditable">
          <el-input v-model="data.password"></el-input>
        </el-form-item>
        <el-form-item label='创建时间'>
          <el-input v-model="data.created_at"
                    :disabled="diseditable"></el-input>
        </el-form-item>
        <el-form-item label='上次登陆时间'>
          <el-input v-model="data.last_login"
                    :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label='地址'>
          <el-input v-model="data.address"
                    :disabled="diseditable"></el-input>
        </el-form-item>
        <el-form-item label='租期'>
          <el-input v-model="data.email"
                    :disabled="diseditable"></el-input>
          <p>到</p>
          <el-input v-model="data.email"
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
                 type="primary">提交修改</el-button>
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
  props: {
    id: Number
  },
  data: function () {
    return {
      diseditable: true,
      data: {
        id: 2,
        name: '1234s',
        created_at: '2020-09-08T23:23:22.182122+08:00',
        address: '1234dwedsw',
        email: '1243@gmail.com',
        phone: null,
        description: '12344s222',
        status: 'UNR',
        lease_term_begin: null,
        lease_term_end: null,
        user_comments: null,
        owner: 2,
        current_tenant: null
      }
    }
  },
  created: function () {
    axios.get('/api/v1/equipment/' + this.id, {})
      .then((response) => {
        this.data = response.data
      })
      .catch((error) => {
        alert(error)
      })
  }
}
</script>
