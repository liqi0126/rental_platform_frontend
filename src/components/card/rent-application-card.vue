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
        <el-form-item label='ID'>
          <el-input v-model="id"
                    :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label='创建时间'>
          <el-input v-model="data.created_at"
                    :disabled="diseditable"></el-input>
        </el-form-item>
        <el-form-item label='描述'>
          <el-input v-model="data.description"
                    type='textarea'
                    :disabled="diseditable"></el-input>
        </el-form-item>
        <el-form-item label='是否正在执行'>
          <el-checkbox v-model="data.applying"
                       :disabled="diseditable"></el-checkbox>
        </el-form-item>
        <el-form-item label='评价'>
          <el-input v-model="data.comments"
                    type='textarea'
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
        <el-form-item label='设备ID'>
          <el-input v-model="data.equipment"
                    :disabled="diseditable"
                    style="width:80%;"></el-input>
          <el-button type='primary'
                     @click="enterEquipment(data.equipment)"
                     style="margin-left:20px;">查看设备</el-button>
        </el-form-item>
        <el-form-item label='拥有者ID'>
          <el-input v-model="data.renter"
                    :disabled="diseditable"
                    style="width:80%;"></el-input>
          <el-button type='primary'
                     @click="enterUser(data.renter)"
                     style="margin-left:20px;">查看拥有者</el-button>
        </el-form-item>
        <el-form-item label='租借者ID'>
          <el-input v-model="data.hirer"
                    :disabled="diseditable"
                    style="width:80%;"></el-input>
          <el-button type='primary'
                     @click="enterUser(data.hirer)"
                     style="margin-left:20px;">查看租借者</el-button>
        </el-form-item>
      </el-form>
      <change-button :id="id"
                     :data="data"
                     class="button"
                     target="rent-application"></change-button>
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
      diseditable: true,
      data: {
        created_at: '2020-09-09T10:05:27.845480+08:00',
        description: 'wdjq',
        status: 'REJ',
        comments: '',
        applying: false,
        lease_term_begin: null,
        lease_term_end: null,
        user_comments: null,
        equipment: 2,
        renter: 1,
        hirer: 3
      }
    }
  },
  created: function () {
    if (this.id === -1) return
    axios.get('/api/v1/rent-application/' + this.id, {})
      .then((response) => {
        this.data = response.data
      })
      .catch((error) => {
        alert(error)
      })
  },
  methods: {
    enterEquipment: function (id) {
      this.$router.push({ name: 'equipment', params: { equipmentId: id } })
    },
    enterUser: function (id) {
      this.$router.push({ name: 'user', params: { userId: id } })
    }
  }
}
</script>
