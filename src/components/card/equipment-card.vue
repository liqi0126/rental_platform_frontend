// writen by xyh
<template>
  <div>
    <el-card class="card">
      设备详情页
    </el-card>
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
        <el-form-item label='拥有者ID'>
          <el-input v-model="data.owner"
                    :disabled="diseditable"
                    style="width:80%;"></el-input>
          <el-button type="primary"
                     style="margin-left:20px;"
                     @click="enterUser(row)">查看拥有者</el-button>
        </el-form-item>
        <el-form-item label='创建时间'>
          <el-input v-model="data.created_at"
                    :disabled="diseditable"></el-input>
        </el-form-item>
        <el-form-item label='地址'>
          <el-input v-model="data.address"
                    :disabled="diseditable"></el-input>
        </el-form-item>
        <el-form-item label='状态'>
          <el-input v-model="data.status"
                    :disabled="diseditable"></el-input>
        </el-form-item>
        <el-form-item label='租期'>
          <el-input v-model="data.lease_term_begin"
                    :disabled="diseditable"
                    style="width:48%"></el-input>
          到
          <el-input v-model="data.lease_term_end"
                    :disabled="diseditable"
                    style="width:48%"></el-input>
        </el-form-item>
        <el-form-item label='Email'>
          <el-input v-model="data.email"
                    :disabled="diseditable"></el-input>
        </el-form-item>
        <el-form-item label='电话号码'>
          <el-input v-model="data.phone"
                    :disabled="diseditable"></el-input>
        </el-form-item>
      </el-form>
      <change-button :id="id"
                     :data="data"
                     target="equipment"></change-button>
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
import changeButton from '../button/change-button'
export default {
  components: {
    'change-button': changeButton
  },
  props: {
    id: Number
  },
  data: function () {
    return {
      diseditable: false,
      data: {
        id: 0,
        name: '',
        created_at: '',
        address: '',
        email: '',
        phone: null,
        description: '',
        status: 'UNR',
        lease_term_begin: null,
        lease_term_end: null,
        user_comments: null,
        owner: 0,
        current_tenant: null
      }
    }
  },
  created: function () {
    if (this.id === -1) return
    axios.get('/api/v1/equipment/' + this.id, {})
      .then((response) => {
        this.data = response.data
      })
      .catch((error) => {
        alert(error)
      })
  },
  methods: {
    enterUser: function () {
      this.$router.push({ name: 'user', params: { userId: this.data.owner } })
    }
  }
}
</script>
